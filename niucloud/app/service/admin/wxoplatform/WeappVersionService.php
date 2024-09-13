<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\wxoplatform;

use app\dict\sys\CloudDict;
use app\dict\sys\WxOplatform;
use app\job\wxoplatform\GetVersionUploadResult;
use app\job\wxoplatform\SiteWeappCommit;
use app\job\wxoplatform\SubmitAudit;
use app\job\wxoplatform\VersionUploadSuccess;
use app\job\wxoplatform\WeappCommit;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysConfig;
use app\model\sys\WxOplatfromWeappVersion;
use app\model\weapp\WeappVersion;
use app\service\admin\site\SiteGroupService;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappCloudService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wxoplatform\CoreOplatformConfigService;
use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Cache;

/**
 */
class WeappVersionService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new WxOplatfromWeappVersion();
    }

    /**
     * 添加小程序版本
     * @param array $data
     */
    public function add(array $data = [])
    {
        $site_group = (new SiteGroup())->field("group_id, group_name, group_desc, create_time, update_time, app")->order('create_time asc')->select()->toArray();
        if (empty($site_group)) throw new CommonException('PLEASE_ADD_FIRST_SITE_GROUP');

        $site_group_id = $data['site_group_id'] ?? $site_group[0]['group_id'];
        $base_url = $data['base_url'] ?? cache_remember('base_url', function (){
            return (string)url('/', [], '', true);
        });

        $uploading = $this->model->where([ ['site_group_id', '=', $site_group_id ], ['status', '=', 0] ])->field('id')->findOrEmpty();
        if (!$uploading->isEmpty()) throw new CommonException('WEAPP_UPLOADING');

        $version_no = $this->model->where([ ['site_group_id', '=', $site_group_id ] ])->order('id desc')->field('version_no')->findOrEmpty()->toArray()['version_no'] ?? 0;
        $version_no += 1;
        $version = "1.{$site_group_id}.{$version_no}";

        $upload_res = (new CoreWeappCloudService())->setConfig(function () use ($site_group_id, $base_url) {
            $config = (new CoreOplatformConfigService())->getConfig();
            $group_info = (new SiteGroupService())->getInfo($site_group_id);
            return [
                'app_id' => $config['develop_app_id'],
                'upload_private_key' => public_path() . $config['develop_upload_private_key'],
                'addon' => array_merge($group_info['app'], $group_info['addon']),
                'base_url' => $base_url
            ];
        })->uploadWeapp([
            'site_id' => $this->site_id,
            'version' => $version,
            'desc' => $data['desc'] ?? ''
        ]);

        $res = $this->model->create([
            'site_group_id' => $site_group_id,
            'user_version' => $version,
            'user_desc' => $data['desc'] ?? '',
            'version_no' => $version_no,
            'create_time' => time(),
            'task_key' => $upload_res['key'],
        ]);

        // 获取小程序版本提交结果
        GetVersionUploadResult::dispatch(['task_key' => $upload_res['key']], secs: 10);
        return $res->id;
    }

    /**
     * 获取最后一次提交记录
     * @return WxOplatfromWeappVersion|array|mixed|\think\Model
     */
    public function getLastCommitRecord() {
        return $this->model->order('id desc')->findOrEmpty();
    }

    /**
     * 查询提交记录
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage() {
        $search_model = $this->model->field('*')->append(['status_name'])
            ->order('id desc')
            ->with('site_group');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取小程序版本提交结果
     * @param string $task_key
     * @return void
     */
    public static function getVersionUploadResult(string $task_key) {
        $build_log = (new CoreWeappCloudService())->getWeappCompileLog($task_key);

        if (isset($build_log['data']) && isset($build_log['data'][0]) && is_array($build_log['data'][0])) {
            $last = end($build_log['data'][0]);
            if ($last['code'] == 0) {
                (new WxOplatfromWeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_FAIL, 'fail_reason' => $last['msg'] ?? '', 'update_time' => time() ], ['task_key' => $task_key]);
                return true;
            }
            if ($last['percent'] == 100) {
                (new WxOplatfromWeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_SUCCESS, 'update_time' => time() ], ['task_key' => $task_key]);
                VersionUploadSuccess::dispatch(['task_key' => $task_key]);
                return true;
            }
            GetVersionUploadResult::dispatch(['task_key' => $task_key], secs: 10);
        }
    }

    /**
     * 小程序模板上传成功之后
     * @param $task
     * @return void
     */
    public static function uploadSuccess(string $task_key) {
        $version = (new WxOplatfromWeappVersion())->where(['task_key' => $task_key])->findOrEmpty();
        if ($version->isEmpty()) return true;

        $draft_list = CoreOplatformService::getTemplateDraftList()['draft_list'] ?? [];

        if (!empty($draft_list)) {
            foreach ($draft_list as $draft_item) {
                if ($draft_item['user_version'] == $version['user_version']) {
                    // 添加草稿到模板库
                    CoreOplatformService::addToTemplate(['draft_id' => $draft_item['draft_id']]);
                    // 获取模板列表
                    $template_list = CoreOplatformService::getTemplateList()['template_list'] ?? [];

                    if (!empty($template_list)) {
                        foreach ($template_list as $template_item) {
                            if ($template_item['user_version'] == $version['user_version']) {
                                (new WxOplatfromWeappVersion())->update(['template_id' => $template_item['template_id'] ], ['task_key' => $task_key]);

                                (new self())->getSiteGroupAuthWeapp($version['site_group_id']);

                                // 删除之前的模板
                                $prev = (new WxOplatfromWeappVersion())->where([ [ 'site_group_id', '=', $version['site_group_id'] ], ['id', '<', $version['id'] ] ])->order('id desc')->findOrEmpty();
                                if (!$prev->isEmpty() && !empty($prev['template_id'])) {
                                    CoreOplatformService::deleteTemplate($prev['template_id']);
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }

        $site_group = (new SiteGroup())->where([ ['group_id', '>', $version['site_group_id'] ] ])->order('group_id asc')->findOrEmpty();
        if (!$site_group->isEmpty()) {
            WeappCommit::dispatch(['data' => ['site_group_id' => $site_group['group_id'], 'base_url' => Cache::get('base_url') ] ]);
        }
    }

    /**
     * 查询站点下是否存在已授权的小程序
     * @param $site_group_id
     * @return void
     */
    private function getSiteGroupAuthWeapp($site_group_id) {
        $site_ids = (new Site())->where([ ['group_id', '=', $site_group_id] ])->column('site_id');
        if (!empty($site_ids)) {
            $auth_site_ids = (new SysConfig())->where([ ['site_id', 'in', $site_ids ], ['config_key', '=', 'weapp_authorization_info'] ])->column('site_id');
            if (!empty($auth_site_ids)) {
                foreach ($auth_site_ids as $site_id) {
                    SiteWeappCommit::dispatch(['site_id' => $site_id, 'site_group_id' => $site_group_id]);
                }
            }
        }
    }

    /**
     * 站点提交
     * @return true
     */
    public function siteWeappCommit() {
        $site_info = (new CoreSiteService())->getSiteCache($this->site_id);
        self::weappCommit($this->site_id, $site_info['group_id']);
        return true;
    }

    /**
     * 小程序提交版本
     * @param $site_id
     * @param $site_group_id
     * @return void
     */
    public static function weappCommit($site_id, $site_group_id) {
        $version = (new WxOplatfromWeappVersion())->where([ ['site_group_id', '=', $site_group_id], ['template_id', '<>', '' ] ])->order('id desc')->findOrEmpty();
        if ($version->isEmpty()) return true;

        $is_exist = (new WeappVersion())->where(['site_id' => $site_id, 'status' => CloudDict::APPLET_AUDITING ])->findOrEmpty();
        if (!$is_exist->isEmpty()) throw new CommonException('EXIST_AUDITING_VERSION');

        $weapp_config = (new CoreWeappConfigService())->getWeappConfig($site_id);

        CoreOplatformService::commitWeapp($site_id, [
            'template_id' => $version['template_id'],
            'user_version' => $version['user_version'],
            'user_desc' => $version['user_desc'],
            'ext_json' => json_encode([
                'extAppid' => $weapp_config['app_id'],
                'entryPagePath' => 'app/pages/index/index',
                'ext' => [
                    'site_id' => $site_id
                ],
                'directCommit' => true
            ])
        ]);

        (new WeappVersion())->where(['site_id' => $site_id, 'version' => $version['user_version'] ])->delete();

        $create_res = (new WeappVersion())->create([
            'site_id' => $site_id,
            'version' => $version['user_version'],
            'version_no' => $version['version_no'],
            'desc' => $version['user_desc'],
            'status' => CloudDict::APPLET_AUDITING,
            'create_time' => time(),
            'from_type' => 'open_platform'
        ]);

        SubmitAudit::dispatch(['site_id' => $site_id, 'id' => $create_res->id], secs: 120);

        return true;
    }

    /**
     * 提交审核
     * @param $site_id
     * @param $id
     * @return true
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function submitCommit($site_id, $id) {
        $privacy_info = CoreOplatformService::getCodePrivacyInfo($site_id);

        if ($privacy_info['errcode'] == 0) {
            $audit_res = CoreOplatformService::submitAudit($site_id, [
                'item_list' => [

                ]
            ]);
            $update_data =  [
                'status' => $audit_res['errcode'] == 0 ? CloudDict::APPLET_AUDITING : CloudDict::APPLET_AUDIT_FAIL,
                'fail_reason' => $audit_res['errcode'] == 0 ? '' : $audit_res['errmsg'],
                'auditid' => $audit_res['auditid'] ?? ''
            ];
        } else {
            if ($privacy_info['errcode'] == 61039) {
                SubmitAudit::dispatch(['site_id' => $site_id, 'id' => $id], secs: 120);
                return true;
            }
            $update_data =  [
                'status' => CloudDict::APPLET_AUDIT_FAIL,
                'fail_reason' => $privacy_info['errmsg'],
            ];
        }

        (new WeappVersion())->update($update_data, [ 'id' => $id ]);
        return true;
    }

    /**
     * 设置小程序隐私协议
     * @return void
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function setPrivacySetting() {
        CoreOplatformService::setPrivacySetting($this->site_id, [
            'setting_list' => WxOplatform::DEFAULT_SETTING_LIST,
            'owner_setting' => [
                'contact_qq' => '1515828903',
                'notice_method' => '弹窗'
            ]
        ]);
        return true;
    }

    public function setDomain() {
        $domain = CoreOplatformService::getDomain($this->site_id);

        $requestdomain = $domain['requestdomain'] ?? [];
        $wsrequestdomain = $domain['wsrequestdomain'] ?? [];
        $uploaddomain = $domain['uploaddomain'] ?? [];
        $downloaddomain = $domain['downloaddomain'] ?? [];
        $udpdomain = $domain['udpdomain'] ?? [];
        $tcpdomain = $domain['tcpdomain'] ?? [];

        $requestdomain = array_filter(array_unique(array_merge($requestdomain, [ (string)url('/', [], '', true) ])));

        CoreOplatformService::setDomain($this->site_id, [
            'requestdomain' => $requestdomain,
            'wsrequestdomain' => $wsrequestdomain,
            'uploaddomain' => $uploaddomain,
            'downloaddomain' => $downloaddomain,
            'udpdomain' => $udpdomain,
            'tcpdomain' => $tcpdomain,
        ]);
        return true;
    }
}

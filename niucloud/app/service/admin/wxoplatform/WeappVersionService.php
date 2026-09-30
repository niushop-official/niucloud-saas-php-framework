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
use app\job\wxoplatform\SiteWeappCommit;
use app\job\wxoplatform\SubmitAudit;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysConfig;
use app\model\sys\WxOplatfromWeappVersion;
use app\model\weapp\WeappVersion;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseAdminService;
use core\exception\CommonException;

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
     * 同步模板库已改为统一任务执行（WeappCommitTaskHandler）
     *
     * 原 add() 只负责「发起上传」，后续编译轮询、草稿入模板库、逐套餐串联
     * 都依赖队列 job 链；任务化后这些环节由任务处理器的步骤 / 子步骤驱动。
     * 本方法仅保留「是否存在上传中版本」的互斥判断供复用。
     *
     * @param int $site_group_id
     * @return void
     * @throws CommonException
     */
    public function checkUploading(int $site_group_id)
    {
        $uploading = $this->model->where([ [ 'site_group_id', '=', $site_group_id ], [ 'status', '=', 0 ] ])->field('id')->findOrEmpty();
        if (!$uploading->isEmpty()) throw new CommonException('WEAPP_UPLOADING');
    }

    /**
     * 获取小程序提交记录
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getSiteGroupCommitRecord($where = []) {
        $field = 'group_id, group_name';
        $search_model = (new SiteGroup())->withSearch([ 'keywords' ], $where)->field($field)->order('create_time desc');
        $site_group = $this->pageQuery($search_model);
        if (!empty($site_group['data'])) {
            foreach ($site_group['data'] as $key => $item) {
                $site_group['data'][$key]['commit_record'] = $this->model->where([ ['site_group_id', '=', $item['group_id'] ], ['template_id', '<>', ''] ])->order('id desc')->field('id, user_version, user_desc, status, fail_reason, create_time, update_time, template_id')->append(['status_name'])->findOrEmpty()->toArray();
            }
        }
        return $site_group;
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
    public function getPage($data = []) {
        $search_model = $this->model->field('*')->append(['status_name'])->withSearch([ 'site_group_id' ], $data)
            ->order('id desc');
        return $this->pageQuery($search_model);
    }

    /**
     * 同步站点套餐中已授权的小程序
     * @param $site_group_id
     * @return void
     */
    public function syncSiteGroupAuthWeapp($site_group_id) {
        $version = (new WxOplatfromWeappVersion())->where([ ['site_group_id', '=', $site_group_id], ['template_id', '<>', ''] ])->order('id desc')->findOrEmpty();
        if ($version->isEmpty()) throw new CommonException('NOT_YET_PRESENT_TEMPLATE_LIBRARY');

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
     * 删除版本
     * @param $id
     * @return void
     */
    public function delVersion($id) {
        $version = (new WxOplatfromWeappVersion())->where([ ['id', '=', $id] ])->findOrEmpty();
        if ($version->isEmpty()) throw new CommonException('NOT_YET_PRESENT_TEMPLATE_LIBRARY');

        (new WxOplatfromWeappVersion())->where([ ['id', '=', $id] ])->delete();
    }

    /**
     * 直接同步模板库（已上传成功、无模板ID 的记录补跑）
     *
     * 不经过任务，直接走：草稿箱匹配 -> 添加到模板库 -> 取模板ID -> 回写 -> 清理旧模板。
     *
     * @param int $versionId 小程序版本记录 id
     * @return string 同步得到的模板ID
     * @throws CommonException
     */
    public function syncTemplate(int $versionId): string
    {
        $record = ( new WxOplatfromWeappVersion() )->where([ [ 'id', '=', $versionId ] ])->findOrEmpty();
        if ($record->isEmpty()) throw new CommonException('NOT_YET_PRESENT_TEMPLATE_LIBRARY');

        $tid = (string) ( $record->template_id ?? '' );
        if ($tid !== '' && $tid !== '0') throw new CommonException('该版本已同步到模板库');

        $userVersion = (string) ( $record->user_version ?? '' );

        // 草稿箱匹配本次上传版本
        $draftList = CoreOplatformService::getTemplateDraftList()[ 'draft_list' ] ?? [];
        $draftId   = 0;
        foreach ((array) $draftList as $item) {
            if ((string) ( $item[ 'user_version' ] ?? '' ) === $userVersion) {
                $draftId = (int) ( $item[ 'draft_id' ] ?? 0 );
                break;
            }
        }
        if ($draftId <= 0) throw new CommonException('草稿箱中未找到本次上传的版本');

        // 添加到模板库
        CoreOplatformService::addToTemplate([ 'draft_id' => $draftId ]);

        // 取模板ID
        $templateList = CoreOplatformService::getTemplateList()[ 'template_list' ] ?? [];
        $templateId   = '';
        foreach ((array) $templateList as $item) {
            if ((string) ( $item[ 'user_version' ] ?? '' ) === $userVersion) {
                $templateId = (string) ( $item[ 'template_id' ] ?? '' );
                break;
            }
        }
        if ($templateId === '') throw new CommonException('模板库中未找到本次添加的版本');

        // 回写模板ID
        ( new WxOplatfromWeappVersion() )->update(
            [ 'template_id' => $templateId, 'update_time' => time() ],
            [ 'id' => $versionId ]
        );

        // 清理旧模板
        $this->cleanOldTemplate((int) $record->site_group_id, $versionId);

        return $templateId;
    }

    /**
     * 清理旧模板（保留最新一条，模板库有数量上限）
     * @param int $groupId
     * @param int $versionId
     */
    protected function cleanOldTemplate(int $groupId, int $versionId): void
    {
        if ($versionId <= 0) return;
        $prev = ( new WxOplatfromWeappVersion() )
            ->where([ [ 'site_group_id', '=', $groupId ], [ 'id', '<', $versionId ] ])
            ->order('id desc')->findOrEmpty();

        if ($prev->isEmpty() || empty($prev[ 'template_id' ])) return;

        try {
            CoreOplatformService::deleteTemplate($prev[ 'template_id' ]);
        } catch (\Throwable $e) {
            // 旧模板清理失败不影响本次同步结果
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
     * @return true
     */
    public static function weappCommit($site_id, $site_group_id) {
        $version = (new WxOplatfromWeappVersion())->where([ ['site_group_id', '=', $site_group_id], ['template_id', '<>', '' ] ])->order('id desc')->findOrEmpty();
        if ($version->isEmpty()) throw new CommonException('NOT_YET_PRESENT_TEMPLATE_LIBRARY');

        $is_exist = (new WeappVersion())->where(['site_id' => $site_id, 'status' => CloudDict::APPLET_AUDITING ])->findOrEmpty();
        if (!$is_exist->isEmpty()) throw new CommonException('EXIST_AUDITING_VERSION');

        $weapp_config = (new CoreWeappConfigService())->getWeappConfig($site_id);

        $commit_result = CoreOplatformService::commitWeapp($site_id, [
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
        if (isset($commit_result['errcode']) && $commit_result['errcode'] != 0) {
            throw new CommonException($commit_result['errmsg']);
        }

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
     * @return true
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

    /**
     * 撤销审核
     * @return true
     */
    public function undoAudit($id) {
        $model = new WeappVersion();
        $version = $model->where([ ['site_id', '=', $this->site_id], ['id', '=', $id] ])->findOrEmpty();
        if ($version->isEmpty()) throw new CommonException('WEAPP_VERSION_NOT_EXIST');
        if ($version->status != CloudDict::APPLET_AUDITING) throw new CommonException('NOT_ALLOWED_CANCEL_AUDIT');

        $result = CoreOplatformService::undocodeAudit($this->site_id);
        if (isset($result['errcode']) && $result['errcode'] != 0) throw new CommonException($result['errmsg']);

        $update_data = [
            'status' => CloudDict::APPLET_AUDIT_UNDO,
            'update_time' => time()
        ];
        (new WeappVersion())->update($update_data, [ 'id' => $id ]);
        return true;
    }

}

<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\admin\weapp;

use app\dict\sys\CloudDict;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappCloudService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\weapp\CoreWeappService;
use core\base\BaseAdminService;
use app\model\weapp\WeappVersion;
use core\exception\CommonException;

/**
 * 小程序包版本发布
 */
class WeappVersionService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new WeappVersion();
    }

    /**
     * 添加小程序版本
     * @param array $data
     */
    public function add(array $data)
    {
        $uploading = $this->model->where([ ['site_id', '=', $this->site_id], ['status', '=', 0] ])->field('id')->findOrEmpty();
        if (!$uploading->isEmpty()) throw new CommonException('WEAPP_UPLOADING');

        $version_no = $this->model->where([ ['site_id', '=', $this->site_id] ])->order('version_no desc')->field('version_no')->findOrEmpty()->toArray()['version_no'] ?? 0;
        $version_no += 1;
        $version = "1.0.{$version_no}";

        $upload_res = (new CoreWeappCloudService())->setConfig(function () {
            $config = (new CoreWeappConfigService())->getWeappConfig($this->site_id);
            return [
                'app_id' => $config['app_id'],
                'upload_private_key' => $config['upload_private_key'],
                'addon' => (new CoreSiteService())->getAddonKeysBySiteId($this->site_id)
            ];
        })->uploadWeapp([
            'site_id' => $this->site_id,
            'version' => $version,
            'desc' => $data['desc'] ?? ''
        ]);

        $res = $this->model->create([
            'site_id' => $this->site_id,
            'version' => $version,
            'version_no' => $version_no,
            'desc' => $data['desc'] ?? '',
            'create_time' => time(),
            'task_key' => $upload_res['key']
        ]);
        return $res->id;
    }

    public function getPreviewImage() {
        try {
            $version = $this->model->where([ ['site_id', '=', $this->site_id] ])->order('id desc')->findOrEmpty();
            if (!$version->isEmpty() || in_array($version['status'], [CloudDict::APPLET_UPLOAD_SUCCESS, CloudDict::APPLET_AUDITING])) {
                if ($version['from_type'] == 'cloud_build') {
                    return (new CoreWeappCloudService())->getWeappPreviewImage();
                } else {
                    return image_to_base64((new CoreWeappService())->getWeappPreviewImage($this->site_id), true);
                }
            }
        } catch (\Exception $e) {
            return '';
        }
    }

    /**
     * 获取小程序版本列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, version, version_no, desc, create_time, status, fail_reason, task_key';
        $order = 'create_time desc';
        $where[] = ['site_id', '=', $this->site_id];
        $search_model = $this->model->where($where)->field($field)->order($order)->append(['status_name']);
        return $this->pageQuery($search_model);
    }

    /**
     * 编辑
     * @param int $id
     * @param array $data
     * @return true
     */
    public function edit(int $id, array $data)
    {
        $data['status'] = 0;
        $data['update_time'] = time();
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id] ])->create($data);
        return true;
    }

    /**
     * 删除
     * @param int $id
     * @return true
     */
    public function del(int $id){
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return true;
    }

    /**
     * 获取小程序上传日志
     * @param string $key
     * @return null
     */
    public function getUploadLog(string $key) {
        $build_log = (new CoreWeappCloudService())->getWeappCompileLog($key);

        if (isset($build_log['data']) && isset($build_log['data'][0]) && is_array($build_log['data'][0])) {
            $last = end($build_log['data'][0]);
            if ($last['code'] == 0) {
                (new WeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_FAIL, 'fail_reason' => $last['msg'] ?? '', 'update_time' => time() ], ['task_key' => $key]);
                return $build_log;
            }
            if ($last['percent'] == 100) {
                (new WeappVersion())->update(['status' => CloudDict::APPLET_UPLOAD_SUCCESS, 'update_time' => time() ], ['task_key' => $key]);
            }
        }
        return $build_log;
    }
}

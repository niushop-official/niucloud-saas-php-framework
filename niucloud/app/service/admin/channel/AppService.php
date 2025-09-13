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

namespace app\service\admin\channel;

use app\dict\channel\AppDict;
use app\dict\sys\ConfigKeyDict;
use app\model\sys\AppVersion;
use app\service\core\channel\CoreAppCloudService;
use app\service\core\channel\CoreAppService;
use app\service\core\channel\CoreH5Service;
use app\service\core\niucloud\CoreNiucloudConfigService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class AppService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new AppVersion();
    }

    /**
     * 设置app信息
     * @param array $value
     * @return bool
     */
    public function setConfig(array $value)
    {
        return (new CoreAppService())->setConfig($this->site_id, $value);
    }

    /**
     * 获取app配置
     * @return mixed
     */
    public function getConfig(){
        return (new CoreAppService())->getConfig($this->site_id);
    }

    /**
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getVersionPage(array $where = [])
    {
        $order = 'id desc';
        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["platform"], $where)->append(['platform_name', 'status_name'])->field("*")->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * @param $id
     * @return AppVersion|array|mixed|\think\Model
     */
    public function getVersionInfo($id) {
        return $this->model->where([ [ 'site_id' ,"=", $this->site_id ], ['id', '=', $id] ])->findOrEmpty()->toArray();
    }

    /**
     * 添加版本
     * @param array $data
     * @return mixed
     */
    public function addVersion(array $data) {
        $not_release = $this->model->where([['site_id', '=', $this->site_id], ['release_time', '=', 0]])->findOrEmpty();
        if (!$not_release->isEmpty()) throw new CommonException("当前已存在未发布的版本");

        $last_version = $this->model->where([['site_id', '=', $this->site_id]])->order('id desc')->findOrEmpty();
        if (!$last_version->isEmpty() && $data['version_code'] <= $last_version['version_code']) throw new CommonException("版本号必须高于上一版本设置的值");

        $data['site_id'] = $this->site_id;

        $model = [
            'site_id' => $this->site_id,
            'version_code' => $data['version_code'],
            'version_name' => $data['version_name'],
            'version_desc' => $data['version_desc'],
            'platform' => $data['platform'],
            'is_forced_upgrade' => $data['is_forced_upgrade'],
            'package_path' => $data['package_path'],
            'upgrade_type' => $data['upgrade_type'],
        ];

        if ($data['package_type'] == 'cloud') {
            $task_key = (new CoreAppCloudService())->appCloudBuid($data);
            $model['task_key'] = $task_key['key'];
            $model['status'] = AppDict::STATUS_CREATING;
        } else {
            $model['status'] = AppDict::STATUS_UPLOAD_SUCCESS;
        }

        $res = $this->model->create($model);
        return $res->id;
    }

    /**
     * 编辑版本
     * @param int $id
     * @param array $data
     * @return true
     */
    public function editVersion(int $id, array $data)
    {
        $last_version = $this->model->where([['site_id', '=', $this->site_id], ['id', '<>', $id]])->order('id desc')->findOrEmpty();
        if (!$last_version->isEmpty() && $data['version_code'] <= $last_version['version_code']) throw new CommonException("版本号必须高于上一版本设置的值");

        $data['site_id'] = $this->site_id;

        $model = [
            'version_code' => $data['version_code'],
            'version_name' => $data['version_name'],
            'version_desc' => $data['version_desc'],
            'platform' => $data['platform'],
            'is_forced_upgrade' => $data['is_forced_upgrade'],
            'package_path' => $data['package_path'],
            'upgrade_type' => $data['upgrade_type'],
        ];

        if ($data['package_type'] == 'cloud') {
            $task_key = (new CoreAppCloudService())->appCloudBuid($data);
            $model['task_key'] = $task_key['key'];
            $model['status'] = AppDict::STATUS_CREATING;
        } else {
            $model['status'] = AppDict::STATUS_UPLOAD_SUCCESS;
        }
        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($model);
        return true;
    }

    /**
     * 删除app版本
     * @param int $id
     * @return bool
     */
    public function delVersion(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

    public function getBuildLog(string $key) {
        $result = (new CoreAppCloudService())->getAppCompileLog($key);
        if ($result['status'] == 'fail') {
            $this->model->update(['status' => AppDict::STATUS_CREATE_FAIL, 'fail_reason' => $result['fail_reason'], 'update_time' => time() ], ['task_key' => $key, 'site_id' => $this->site_id]);
        }
        if ($result['status'] == 'success') {
            $this->model->update(['status' => AppDict::STATUS_UPLOAD_SUCCESS, 'package_path' => $result['file_path'], 'update_time' => time() ], ['task_key' => $key, 'site_id' => $this->site_id]);
        }
        return $result;
    }

    /**
     * 发布
     * @param string $key
     * @return void
     */
    public function release(int $id) {
        $version = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->findOrEmpty();
        if ($version->isEmpty()) throw new CommonException("版本不存在");
        if ($version['status'] != AppDict::STATUS_UPLOAD_SUCCESS) throw new CommonException("版本未上传成功");

        $this->model->update(['release_time' => time(), 'status' => AppDict::STATUS_PUBLISHED], ['id' => $id]);
    }

    public function generateSingCert($data) {
        return (new CoreAppCloudService())->generateSingCert($data);
    }
}

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

namespace app\adminapi\controller\upload;

use app\dict\sys\StorageDict;
use app\service\admin\upload\StorageConfigService;
use core\base\BaseAdminController;
use core\exception\AdminException;
use think\Response;

/**
 * 存储管理
 * Class Storage
 * @description 存储管理
 * @package app\adminapi\controller\upload
 */
class Storage extends BaseAdminController
{

    /**
     * 云存储配置列表
     * @description 云存储配置列表
     */
    public function storageList()
    {
        $res = (new StorageConfigService())->getStorageList();
        return success($res);
    }

    /**
     * 站点存储配置列表（多套）
     * @description 站点存储配置列表
     */
    public function storageConfigList()
    {
        $res = (new StorageConfigService())->getStorageConfigList();
        return success($res);
    }

    /**
     * 存储配置详情
     * @description 存储配置详情
     * @param $storage_type  存储驱动类型
     * @return Response
     */
    public function storageConfig($storage_type)
    {
        $res = (new StorageConfigService())->getStorageConfig($storage_type);
        return success($res);
    }

    /**
     * 新增存储配置
     * @description 新增存储配置
     * @return Response
     */
    public function addStorageConfig()
    {
        $storage_type = $this->request->param('storage_type', '');
        $data = $this->getStorageParams($storage_type);
        $data['storage_type'] = $storage_type;
        (new StorageConfigService())->addStorageConfig($data);
        return success('ADD_SUCCESS');
    }

    /**
     * 编辑存储配置
     * @description 编辑存储配置
     * @param $id  存储配置id
     * @return Response
     */
    public function editStorageConfig($id)
    {
        $config = (new StorageConfigService())->getStorageConfigById($id);
        $data = $this->getStorageParams($config['storage_type']);
        (new StorageConfigService())->editStorageConfig($id, $data);
        return success('SET_SUCCESS');
    }

    /**
     * 启用存储配置
     * @description 启用存储配置
     * @param $id  存储配置id（local 表示本地（默认）存储）
     * @return Response
     */
    public function useStorageConfig($id)
    {
        (new StorageConfigService())->useStorageConfig($id);
        return success('SET_SUCCESS');
    }

    /**
     * 删除存储配置
     * @description 删除存储配置
     * @param $id  存储配置id
     * @return Response
     */
    public function deleteStorageConfig($id)
    {
        (new StorageConfigService())->deleteStorageConfig($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 存储设置修改
     * @description 存储设置修改
     * @return Response
     */
    public function editStorage($storage_type)
    {
        //参数获取
        $data = $this->getStorageParams($storage_type, true);
        (new StorageConfigService())->setStorageConfig($storage_type, $data);
        return success('SET_SUCCESS');
    }

    /**
     * 按存储方式获取请求参数
     * @param string $storage_type 存储驱动类型
     * @param bool $with_is_use 是否包含启用状态
     * @return array
     */
    private function getStorageParams(string $storage_type, bool $with_is_use = false)
    {
        $storage_type_list = StorageDict::getType();
        if (!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        $field_list = [
            ['name', '']
        ];
        if ($with_is_use) $field_list[] = ['is_use', 0];
        foreach ($storage_type_list[$storage_type]['params'] as $k_param => $v_param) {
            $field_list[] = [$k_param, ''];
        }
        return $this->request->params($field_list);
    }

}

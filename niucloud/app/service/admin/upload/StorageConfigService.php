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

namespace app\service\admin\upload;

use app\dict\common\CommonDict;
use app\dict\sys\FileDict;
use app\dict\sys\StorageDict;
use app\service\core\upload\CoreStorageService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\Response;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class StorageConfigService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * 获取云存储列表
     * @return array
     */
    public function getStorageList()
    {
        $config_type = (new CoreStorageService())->getStorageConfig($this->site_id);
        $storage_type_list = StorageDict::getType();
        $list = [];
        foreach ($storage_type_list as $k => $v) {
            $data = [];
            $data['storage_type'] = $k;
            $data['is_use'] = $k == $config_type['default'] ? StorageDict::ON : StorageDict::OFF;
            $data['name'] = $v['name'];
            $data['component'] = $v['component'];
            foreach ($v['params'] as $k_param => $v_param) {
                $value = $config_type[$k][$k_param] ?? '';
                $encrypt_params = $v['encrypt_params'] ?? [];
                if ($value !== '' && in_array($k_param, $encrypt_params)) $value = CommonDict::ENCRYPT_STR;
                $data['params'][$k_param] = [
                    'name' => $v_param,
                    'value' => $value
                ];
            }
            $list[] = $data;
        }
        return $list;
    }

    /**
     * 获取存储配置
     * @param string $storage_type
     * @return array
     */
    public function getStorageConfig(string $storage_type)
    {
        $storage_type_list = StorageDict::getType();
        if(!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        $info = (new CoreConfigService())->getConfig($this->site_id, 'STORAGE');
        if(empty($info))
        {
            $config_type = ['default' => StorageDict::LOCAL];//初始化
        }else
            $config_type = $info['value'];

        $data = [
            'storage_type' => $storage_type,
            'is_use' => $storage_type == $config_type['default'] ? StorageDict::ON : StorageDict::OFF,
            'name'   => $storage_type_list[$storage_type]['name'],
        ];
        foreach ($storage_type_list[$storage_type]['params'] as $k_param => $v_param)
        {
            $value = $config_type[$storage_type][$k_param] ?? '';
            $encrypt_params = $storage_type_list[$storage_type]['encrypt_params'] ?? [];
            if ($value !== '' && in_array($k_param, $encrypt_params)) $value = CommonDict::ENCRYPT_STR;
            $data['params'][$k_param] = [
                'name' => $v_param,
                'value' => $value
            ];
        }
        return $data;

    }

    /**
     * 云存储配置
     * @param string $storage_type
     * @param array $data
     * @return bool
     */
    public function setStorageConfig(string $storage_type, array $data)
    {
        $storage_type_list = StorageDict::getType();
        if(!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        if($storage_type != FileDict::LOCAL){
            $domain = $data['domain'];
            if (!str_contains($domain, 'http://') && !str_contains($domain, 'https://')){
                throw new AdminException('STORAGE_NOT_HAS_HTTP_OR_HTTPS');
            }
        }
        $info = (new CoreConfigService())->getConfig($this->site_id, 'STORAGE');
        if(empty($info))
        {
            $config['default'] = '';

        }else{
            $config = $info['value'];
        }
        //初始化数据
        if($data['is_use'])
        {
            $config['default'] = $storage_type;
        }else if ($config['default'] == $storage_type) {
            $config['default'] = '';
        }
        foreach ($storage_type_list[$storage_type]['params'] as $k_param => $v_param)
        {
            $value = $data[$k_param] ?? '';
            if ($value == CommonDict::ENCRYPT_STR) $value = isset($config[$storage_type]) ? ($config[$storage_type][$k_param] ?? '') : '';
            $config[$storage_type][$k_param] = $value;
        }
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }



}

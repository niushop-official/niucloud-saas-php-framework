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
use app\dict\sys\StorageDict;
use app\service\core\upload\CoreStorageService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\AdminException;

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
     * 获取云存储列表（按存储方式聚合，供选择存储方式与动态渲染配置表单）
     * @return array
     */
    public function getStorageList()
    {
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $storage_type_list = StorageDict::getType();
        //按存储方式分组
        $group_list = [];
        foreach ($config['list'] as $item) {
            $group_list[$item['storage_type']][] = $item;
        }
        $list = [];
        foreach ($storage_type_list as $k => $v) {
            $data = [];
            $data['storage_type'] = $k;
            $data['is_use'] = StorageDict::OFF;
            $data['name'] = ($this->site_id != 0 && $k == StorageDict::LOCAL) ? ($v['site_name'] ?? $v['name']) : $v['name'];
            $data['component'] = $v['component'];
            $items = $group_list[$k] ?? [];
            $matched = null;
            foreach ($items as $item) {
                if ($item['id'] === $config['default']) {
                    $matched = $item;
                    break;
                }
                if ($matched === null) $matched = $item;
            }
            if ($k == StorageDict::LOCAL) {
                $data['is_use'] = $config['default'] === StorageDict::LOCAL ? StorageDict::ON : StorageDict::OFF;
            } else {
                $data['is_use'] = ($matched && $matched['id'] === $config['default']) ? StorageDict::ON : StorageDict::OFF;
            }
            $params = $matched['params'] ?? [];
            foreach ($v['params'] as $k_param => $v_param) {
                $value = $params[$k_param] ?? '';
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
     * 获取存储配置（按存储方式获取，同一存储方式有多套时取启用的一套或第一套）
     * @param string $storage_type
     * @return array
     */
    public function getStorageConfig(string $storage_type)
    {
        $storage_type_list = StorageDict::getType();
        if(!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $matched = null;
        foreach ($config['list'] as $item) {
            if ($item['storage_type'] != $storage_type) continue;
            if ($item['id'] === $config['default']) {
                $matched = $item;
                break;
            }
            if ($matched === null) $matched = $item;
        }
        $data = [
            'storage_type' => $storage_type,
            'is_use' => $storage_type == StorageDict::LOCAL
                ? ($config['default'] === StorageDict::LOCAL ? StorageDict::ON : StorageDict::OFF)
                : (($matched && $matched['id'] === $config['default']) ? StorageDict::ON : StorageDict::OFF),
            'name'   => $storage_type_list[$storage_type]['name'],
        ];
        $params = $matched['params'] ?? [];
        foreach ($storage_type_list[$storage_type]['params'] as $k_param => $v_param)
        {
            $value = $params[$k_param] ?? '';
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
     * 云存储配置（按存储方式写入，平台端与站点端统一使用多套配置结构）
     * @param string $storage_type
     * @param array $data
     * @return bool
     */
    public function setStorageConfig(string $storage_type, array $data)
    {
        $storage_type_list = StorageDict::getType();
        if(!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        $this->checkStorageDomain($storage_type, $data);
        return $this->setStorageConfigByType($storage_type, $data);
    }

    /**
     * 按id获取单套存储配置
     * @param mixed $id
     * @return array
     */
    public function getStorageConfigById($id)
    {
        $item = (new CoreStorageService())->getStorageConfigById($this->site_id, $id);
        if (empty($item)) throw new AdminException('OSS_CONFIG_NOT_EXIST');
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        return $this->formatStorageConfigItem($item, $config['default'], StorageDict::getType());
    }

    /**
     * 站点多套存储配置列表
     * @return array
     */
    public function getStorageConfigList()
    {
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $storage_type_list = StorageDict::getType();
        $list = [];
        //本地存储为固定项，暂不纳入多套配置管理
        $local_info = $storage_type_list[StorageDict::LOCAL] ?? [];
        $list[] = [
            'id' => StorageDict::LOCAL,
            'name' => ($this->site_id != 0 && isset($local_info['site_name'])) ? $local_info['site_name'] : ($local_info['name'] ?? '本地存储'),
            'storage_type' => StorageDict::LOCAL,
            'storage_type_name' => $local_info['name'] ?? '本地存储',
            'component' => $local_info['component'] ?? '',
            'is_use' => $config['default'] === StorageDict::LOCAL ? StorageDict::ON : StorageDict::OFF,
            'is_local' => 1,
            'is_complete' => 1,
            'params' => [],
            'create_time' => 0,
            'update_time' => 0,
        ];
        foreach ($config['list'] as $item) {
            $list[] = $this->formatStorageConfigItem($item, $config['default'], $storage_type_list);
        }
        return $list;
    }

    /**
     * 新增一套存储配置
     * @param array $data
     * @return bool
     */
    public function addStorageConfig(array $data)
    {
        $storage_type = $data['storage_type'] ?? '';
        $storage_type_list = StorageDict::getType();
        if (!array_key_exists($storage_type, $storage_type_list)) throw new AdminException('OSS_TYPE_NOT_EXIST');
        if ($storage_type == StorageDict::LOCAL) throw new AdminException('OSS_TYPE_NOT_EXIST');
        $this->checkStorageDomain($storage_type, $data);
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $config['list'][] = [
            'id' => (string)$this->getNextStorageConfigId($config),
            'storage_type' => $storage_type,
            'name' => $this->buildStorageName($storage_type, $data, $storage_type_list),
            'params' => $this->buildStorageParams($storage_type, $data, []),
            'create_time' => time(),
            'update_time' => time(),
        ];
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }

    /**
     * 编辑一套存储配置
     * @param mixed $id
     * @param array $data
     * @return bool
     */
    public function editStorageConfig($id, array $data)
    {
        $storage_type_list = StorageDict::getType();
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $index = null;
        foreach ($config['list'] as $k => $item) {
            if ($item['id'] === (string)$id) {
                $index = $k;
                break;
            }
        }
        if ($index === null) throw new AdminException('OSS_CONFIG_NOT_EXIST');
        $storage_type = $config['list'][$index]['storage_type'];
        $this->checkStorageDomain($storage_type, $data);
        if (!empty($data['name'])) {
            $config['list'][$index]['name'] = $this->buildStorageName($storage_type, $data, $storage_type_list);
        }
        $config['list'][$index]['params'] = $this->buildStorageParams($storage_type, $data, $config['list'][$index]['params'] ?? []);
        $config['list'][$index]['update_time'] = time();
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }

    /**
     * 启用某一套存储配置（全局唯一启用，local 表示使用本地（默认）存储）
     * @param mixed $id
     * @return bool
     */
    public function useStorageConfig($id)
    {
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        if ((string)$id === StorageDict::LOCAL) {
            $config['default'] = StorageDict::LOCAL;
            return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
        }
        $matched = null;
        foreach ($config['list'] as $item) {
            if ($item['id'] === (string)$id) {
                $matched = $item;
                break;
            }
        }
        if ($matched === null) throw new AdminException('OSS_CONFIG_NOT_EXIST');
        //未完善的配置不允许启用，避免上传时报错
        if (!$this->isStorageConfigComplete($matched['storage_type'], $matched['params'] ?? [])) {
            throw new AdminException('OSS_CONFIG_NOT_COMPLETE');
        }
        $config['default'] = (string)$id;
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }

    /**
     * 删除一套存储配置（启用中的配置不允许删除）
     * @param mixed $id
     * @return bool
     */
    public function deleteStorageConfig($id)
    {
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        if ((string)$id === StorageDict::LOCAL) throw new AdminException('OSS_CONFIG_NOT_ALLOW_DELETE');
        if ($config['default'] === (string)$id) throw new AdminException('OSS_CONFIG_IS_USING');
        $new_list = [];
        $exist = false;
        foreach ($config['list'] as $item) {
            if ($item['id'] === (string)$id) {
                $exist = true;
                continue;
            }
            $new_list[] = $item;
        }
        if (!$exist) throw new AdminException('OSS_CONFIG_NOT_EXIST');
        $config['list'] = $new_list;
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }

    /**
     * 按存储方式写入配置
     * 平台端与站点端统一使用多套配置结构；同一存储方式存在多套配置时，写入启用的一套或第一套
     * @param string $storage_type
     * @param array $data
     * @return bool
     */
    private function setStorageConfigByType(string $storage_type, array $data)
    {
        $storage_type_list = StorageDict::getType();
        $config = (new CoreStorageService())->getStorageConfig($this->site_id);
        $all_close_error = $this->site_id == 0 ? 'SUPER_UPLOAD_STORAGE_TYPE_ALL_CLOSE' : 'UPLOAD_STORAGE_TYPE_ALL_CLOSE';
        //本地存储不参与多套配置，仅切换启用状态
        if ($storage_type == StorageDict::LOCAL) {
            if (!empty($data['is_use'])) {
                $config['default'] = StorageDict::LOCAL;
            } else if ($config['default'] === StorageDict::LOCAL) {
                throw new AdminException($all_close_error);
            }
            return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
        }
        //查找该存储方式的配置项（优先启用项）
        $index = null;
        foreach ($config['list'] as $k => $item) {
            if ($item['storage_type'] != $storage_type) continue;
            if ($item['id'] === $config['default']) {
                $index = $k;
                break;
            }
            if ($index === null) $index = $k;
        }
        //不存在则创建一套
        if ($index === null) {
            $config['list'][] = [
                'id' => (string)$this->getNextStorageConfigId($config),
                'storage_type' => $storage_type,
                'name' => $storage_type_list[$storage_type]['name'] ?? $storage_type,
                'params' => [],
                'create_time' => time(),
                'update_time' => time(),
            ];
            $index = count($config['list']) - 1;
        }
        $config['list'][$index]['params'] = $this->buildStorageParams($storage_type, $data, $config['list'][$index]['params'] ?? []);
        $config['list'][$index]['update_time'] = time();
        if (!empty($data['is_use'])) {
            //未完善的配置不允许启用，避免上传时报错（与新接口保持一致的校验）
            if (!$this->isStorageConfigComplete($storage_type, $config['list'][$index]['params'])) {
                throw new AdminException('OSS_CONFIG_NOT_COMPLETE');
            }
            $config['default'] = (string)$config['list'][$index]['id'];
        } else if ($config['default'] === (string)$config['list'][$index]['id']) {
            throw new AdminException($all_close_error);
        }
        return (new CoreConfigService())->setConfig($this->site_id, 'STORAGE', $config);
    }

    /**
     * 格式化单套配置输出（敏感参数打码）
     * @param array $item
     * @param string $default
     * @param array $storage_type_list
     * @return array
     */
    private function formatStorageConfigItem(array $item, string $default, array $storage_type_list)
    {
        $type_info = $storage_type_list[$item['storage_type']] ?? [];
        $params = $item['params'] ?? [];
        $missing_params = $this->getMissingStorageParams($item['storage_type'], $params);
        $data = [
            'id' => $item['id'],
            'name' => ($item['name'] ?? '') !== '' ? $item['name'] : ($type_info['name'] ?? $item['storage_type']),
            'storage_type' => $item['storage_type'],
            'storage_type_name' => $type_info['name'] ?? $item['storage_type'],
            'component' => $type_info['component'] ?? '',
            'is_use' => $item['id'] === (string)$default ? StorageDict::ON : StorageDict::OFF,
            'is_local' => 0,
            'is_complete' => empty($missing_params) ? 1 : 0,
            'missing_params' => array_values($missing_params),
            'create_time' => $item['create_time'] ?? 0,
            'update_time' => $item['update_time'] ?? 0,
        ];
        foreach ($type_info['params'] ?? [] as $k_param => $v_param) {
            $value = $params[$k_param] ?? '';
            if ($value !== '' && in_array($k_param, $type_info['encrypt_params'] ?? [])) $value = CommonDict::ENCRYPT_STR;
            $data['params'][$k_param] = [
                'name' => $v_param,
                'value' => $value
            ];
        }
        return $data;
    }

    /**
     * 判断存储配置是否已完善（该存储方式的全部参数均已填写）
     * @param string $storage_type
     * @param array $params
     * @return bool
     */
    private function isStorageConfigComplete(string $storage_type, array $params): bool
    {
        return empty($this->getMissingStorageParams($storage_type, $params));
    }

    /**
     * 获取未填写的配置项名称
     * @param string $storage_type
     * @param array $params
     * @return array
     */
    private function getMissingStorageParams(string $storage_type, array $params): array
    {
        $storage_type_list = StorageDict::getType();
        $param_fields = $storage_type_list[$storage_type]['params'] ?? [];
        $missing = [];
        foreach ($param_fields as $k_param => $v_param) {
            $value = $params[$k_param] ?? '';
            if ($value === '' || $value === null) $missing[] = $v_param;
        }
        return $missing;
    }

    /**
     * 校验空间域名
     * @param string $storage_type
     * @param array $data
     * @return void
     */
    private function checkStorageDomain(string $storage_type, array $data)
    {
        if ($storage_type == StorageDict::LOCAL) return;
        $domain = $data['domain'] ?? '';
        if (!str_contains($domain, 'http://') && !str_contains($domain, 'https://')) {
            throw new AdminException('STORAGE_NOT_HAS_HTTP_OR_HTTPS');
        }
    }

    /**
     * 装配存储参数（敏感参数为打码值时回填原值）
     * @param string $storage_type
     * @param array $data
     * @param array $origin_params
     * @return array
     */
    private function buildStorageParams(string $storage_type, array $data, array $origin_params = []): array
    {
        $storage_type_list = StorageDict::getType();
        $params = [];
        foreach ($storage_type_list[$storage_type]['params'] ?? [] as $k_param => $v_param) {
            $value = $data[$k_param] ?? '';
            if ($value == CommonDict::ENCRYPT_STR) $value = $origin_params[$k_param] ?? '';
            $params[$k_param] = $value;
        }
        return $params;
    }

    /**
     * 生成配置名称（为空时取存储方式名称）
     * @param string $storage_type
     * @param array $data
     * @param array $storage_type_list
     * @return string
     */
    private function buildStorageName(string $storage_type, array $data, array $storage_type_list = []): string
    {
        if (empty($storage_type_list)) $storage_type_list = StorageDict::getType();
        $name = trim((string)($data['name'] ?? ''));
        if ($name === '') $name = $storage_type_list[$storage_type]['name'] ?? $storage_type;
        return $name;
    }

    /**
     * 获取下一个配置id
     * @param array $config
     * @return int
     */
    private function getNextStorageConfigId(array $config): int
    {
        $max = 0;
        foreach ($config['list'] as $item) {
            $max = max($max, (int)$item['id']);
        }
        return $max + 1;
    }

}

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

namespace app\service\core\upload;

use app\dict\sys\StorageDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 上传服务层
 */
class CoreStorageService extends BaseCoreService
{

    /**
     * 获取存储配置（已归一化为多套配置结构）
     * @param int $site_id
     * @return array ['default' => 'local'|'1', 'list' => [['id','storage_type','name','params','create_time','update_time']], 'local' => []]
     */
    public function getStorageConfig(int $site_id)
    {
        return $this->normalizeConfig($this->getRawStorageConfig($site_id));
    }

    /**
     * 获取原始存储配置（保持数据库存储的原始结构，未做归一化）
     * @param int $site_id
     * @return array
     */
    public function getRawStorageConfig(int $site_id): array
    {
        $info = (new CoreConfigService())->getConfig($site_id, 'STORAGE')['value'] ?? [];
        return is_array($info) ? $info : [];
    }

    /**
     * 存储配置结构归一化
     * 兼容旧结构（按存储方式分层，每种方式仅一套配置）与多套配置新结构
     * @param array $config
     * @return array
     */
    public function normalizeConfig(array $config): array
    {
        //新结构：已包含 list 多套配置
        if (array_key_exists('list', $config) && is_array($config['list'])) {
            $list = [];
            foreach ($config['list'] as $item) {
                if (empty($item['storage_type'])) continue;
                $list[] = [
                    'id' => (string)($item['id'] ?? ''),
                    'storage_type' => $item['storage_type'],
                    'name' => (string)($item['name'] ?? ''),
                    'params' => $item['params'] ?? [],
                    'create_time' => $item['create_time'] ?? 0,
                    'update_time' => $item['update_time'] ?? 0,
                ];
            }
            $default = $config['default'] ?? StorageDict::LOCAL;
            if ($default === null) $default = '';
            return [
                'default' => (string)$default,
                'list' => $list,
                'local' => $config['local'] ?? [],
            ];
        }
        //旧结构：{ default: 'qiniu', local: {}, qiniu: {...}, ... } 转换为多套配置结构
        $storage_type_list = StorageDict::getType();
        $old_default = $config['default'] ?? StorageDict::LOCAL;
        $list = [];
        $default = '';
        $id = 0;
        foreach ($config as $storage_type => $params) {
            if ($storage_type === 'default' || !is_array($params)) continue;
            if ($storage_type === StorageDict::LOCAL) continue;//本地存储不纳入多套配置
            if (!array_key_exists($storage_type, $storage_type_list)) continue;
            $is_default = ($old_default === $storage_type);
            //未填写过参数且非当前启用项，不生成配置项
            $has_value = false;
            foreach ($params as $param_value) {
                if ($param_value !== '' && $param_value !== null) {
                    $has_value = true;
                    break;
                }
            }
            if (!$has_value && !$is_default) continue;
            $id++;
            $list[] = [
                'id' => (string)$id,
                'storage_type' => $storage_type,
                'name' => $storage_type_list[$storage_type]['name'] ?? $storage_type,
                'params' => $params,
                'create_time' => 0,
                'update_time' => 0,
            ];
            if ($is_default) $default = (string)$id;
        }
        //旧结构默认值指向本地存储或无法识别时，回退为本地存储；默认为空则是异常态（无启用项）
        if ($default === '') {
            $default = !empty($old_default) ? StorageDict::LOCAL : '';
        }
        return [
            'default' => $default,
            'list' => $list,
            'local' => $config['local'] ?? [],
        ];
    }

    /**
     * 获取当前启用的存储方式以及配置
     * @param int $site_id
     * @return array|null
     */
    public function getDefaultStorage(int $site_id = 0)
    {
        $config = $this->getStorageConfig($site_id);
        $default = $config['default'];
        //无启用项，返回空由调用方处理
        if ($default === '' || $default === null) return null;
        //当前启用的是本地存储
        if ($default === StorageDict::LOCAL) {
            return ['storage_type' => StorageDict::LOCAL];
        }
        foreach ($config['list'] as $item) {
            if ($item['id'] === (string)$default) {
                $item_storage = $item['params'] ?? [];
                $item_storage['storage_type'] = $item['storage_type'];
                return $item_storage;
            }
        }
        //启用的配置不存在（脏数据），回退本地存储
        return ['storage_type' => StorageDict::LOCAL];
    }

    /**
     * 通过存储方式获取配置（同一存储方式存在多套配置时，优先取启用的那套，否则取第一套）
     * @param int $site_id
     * @param string $type
     * @return array
     */
    public function getStorageByType(int $site_id, string $type)
    {
        $config = $this->getStorageConfig($site_id);
        $matched = null;
        foreach ($config['list'] as $item) {
            if ($item['storage_type'] != $type) continue;
            if ($item['id'] === (string)$config['default']) {
                $matched = $item;
                break;
            }
            if ($matched === null) $matched = $item;
        }
        if ($matched === null) return ['storage_type' => $type];
        $item_storage = $matched['params'] ?? [];
        $item_storage['storage_type'] = $matched['storage_type'];
        return $item_storage;
    }

    /**
     * 通过配置id获取单套配置
     * @param int $site_id
     * @param mixed $id
     * @return array|null
     */
    public function getStorageConfigById(int $site_id, $id)
    {
        $config = $this->getStorageConfig($site_id);
        foreach ($config['list'] as $item) {
            if ($item['id'] === (string)$id) return $item;
        }
        return null;
    }

    /**
     * 生成站点默认存储配置
     * 默认启用本地存储，各云存储方式（含插件扩展的存储方式）各预置一条空参数配置
     * @return array
     */
    public function buildDefaultStorageConfig(): array
    {
        $storage_type_list = StorageDict::getType();
        $list = [];
        $id = 0;
        foreach ($storage_type_list as $storage_type => $type_info) {
            //本地存储不参与多套配置
            if ($storage_type === StorageDict::LOCAL) continue;
            $id++;
            $params = [];
            foreach ($type_info['params'] ?? [] as $k_param => $v_param) {
                $params[$k_param] = '';
            }
            $list[] = [
                'id' => (string)$id,
                'storage_type' => $storage_type,
                'name' => $type_info['name'] ?? $storage_type,
                'params' => $params,
                'create_time' => 0,
                'update_time' => 0,
            ];
        }
        return [
            'default' => StorageDict::LOCAL,
            'list' => $list,
            'local' => [],
        ];
    }

    /**
     * 初始化默认存储配置（仅当该端尚无存储配置时写入，幂等）
     * 站点端：新建站点、安装站点时调用；平台端：系统安装时调用（site_id = 0）
     * 注意：站点更新等场景不应调用，避免影响已有配置
     * @param int $site_id
     * @return void
     */
    public function initStorageConfig(int $site_id)
    {
        $config_service = new CoreConfigService();
        if (!empty($config_service->getConfig($site_id, 'STORAGE'))) return;
        $config_service->setConfig($site_id, 'STORAGE', $this->buildDefaultStorageConfig());
    }

    /**
     * 获取云存储列表（按存储方式聚合，每种方式返回启用的一套或第一套）
     * @param int $site_id
     * @return array
     */
    public function getStorageList(int $site_id = 0)
    {
        $config = $this->getStorageConfig($site_id);
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
            $data['name'] = $v['name'];
            $data['component'] = $v['component'];
            $items = $group_list[$k] ?? [];
            $matched = null;
            foreach ($items as $item) {
                if ($item['id'] === (string)$config['default']) {
                    $matched = $item;
                    break;
                }
                if ($matched === null) $matched = $item;
            }
            if ($k === StorageDict::LOCAL) {
                $data['is_use'] = $config['default'] === StorageDict::LOCAL ? StorageDict::ON : StorageDict::OFF;
            } else {
                $data['is_use'] = ($matched && $matched['id'] === (string)$config['default']) ? StorageDict::ON : StorageDict::OFF;
            }
            $params = $matched['params'] ?? [];
            foreach ($v['params'] as $k_param => $v_param) {
                $data['params'][$k_param] = [
                    'name' => $v_param,
                    'value' => $params[$k_param] ?? ''
                ];
            }
            $list[] = $data;
        }
        return $list;
    }

    /**
     * 获取配置列表（返回全部配置项，含启用状态，供内部按存储方式/域名匹配使用）
     * @param int $site_id
     * @return array
     */
    public function getStorageConfigList(int $site_id = 0)
    {
        $config = $this->getStorageConfig($site_id);
        $list = [];
        foreach ($config['list'] as $item) {
            $list[] = [
                'id' => $item['id'],
                'storage_type' => $item['storage_type'],
                'name' => $item['name'],
                'is_use' => $item['id'] === (string)$config['default'] ? StorageDict::ON : StorageDict::OFF,
                'params' => $item['params'] ?? [],
            ];
        }
        return $list;
    }
}

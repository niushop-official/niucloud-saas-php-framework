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

namespace app\upgrade\v210;

use app\model\sys\SysConfig;
use app\service\core\upload\CoreStorageService;
use app\service\core\sys\CoreConfigService;
use think\facade\Db;

/**
 * 存储配置升级为多套配置结构（平台端与站点端统一）
 */
class Upgrade
{

    public function handle()
    {
        $this->handleStorageConfig();
    }

    /**
     * 存储配置结构升级（平台端与站点端统一；幂等，已是多套结构则跳过）
     * @return void
     */
    private function handleStorageConfig()
    {
        $list = (new SysConfig())->where([
            ['config_key', '=', 'STORAGE']
        ])->select()->toArray();
        if (empty($list)) return;
        $config_service = new CoreConfigService();
        $core_storage_service = new CoreStorageService();
        foreach ($list as $item) {
            $value = $item['value'] ?? [];
            if (!is_array($value) || empty($value)) continue;
            //已经是多套配置结构，跳过
            if (array_key_exists('list', $value) && is_array($value['list'])) continue;
            //归一化为多套配置结构
            $new_value = $core_storage_service->normalizeConfig($value);
            //setConfig 内部会清理 sys_config 缓存
            $config_service->setConfig($item['site_id'], 'STORAGE', $new_value);
        }
    }
}

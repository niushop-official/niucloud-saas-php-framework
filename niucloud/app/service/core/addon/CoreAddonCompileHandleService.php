<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\addon;

use think\facade\Log;

/**
 * 插件编译产物处理服务层
 *
 * 背景：info.json 中声明了 compile（项目部署模式）的插件，安装时会将插件自带的
 * 前端编译产物整体覆盖 public/{port}，覆盖前由 backupFrontend() 把原编译产物
 * 备份到 runtime/backup/frontend/{port}；本服务负责卸载（及安装回滚）时把备份还原回去。
 *
 * Class CoreAddonCompileHandleService
 * @package app\service\core\addon
 */
class CoreAddonCompileHandleService extends CoreAddonBaseService
{
    /**
     * 编译产物备份目录（与 CoreAddonInstallService::backupFrontend() 保持一致）
     * @var string
     */
    protected $backup_dir;

    public function __construct()
    {
        parent::__construct();
        $this->backup_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR;
    }

    /**
     * 还原编译产物备份（卸载 compile 插件时调用）
     *
     * 采用覆盖式还原（不先清空目标目录），同名文件恢复为覆盖前版本，
     * 备份中不存在的新文件（其他插件后续产物）不受影响。
     *
     * @param array $ports 待还原端口（admin/web/wap），为空时还原备份目录下全部端口
     * @return true
     */
    public function revertBackup(array $ports = [])
    {
        $port_list = !empty($ports) ? $ports : $this->backupPorts();
        foreach ($port_list as $port) {
            $port = (string) $port;
            $from_dir = $this->backup_dir . $port;
            $to_dir = public_path() . $port;
            if (!is_dir($from_dir) || !is_dir($to_dir)) continue;

            dir_copy($from_dir, $to_dir);

            // 还原完成后清理该端口的备份，避免残留过期备份被后续误还原
            del_target_dir($from_dir, true);
        }

        // 备份目录为空时顺带清理空目录
        if (is_dir($this->backup_dir) && count(@scandir($this->backup_dir)) <= 2) {
            @rmdir($this->backup_dir);
        }

        Log::write('CoreAddonCompileHandleService revertBackup done, ports=' . implode(',', (array) $port_list));
        return true;
    }

    /**
     * 已备份的端口列表
     * @return array
     */
    public function backupPorts(): array
    {
        if (!is_dir($this->backup_dir)) return [];
        $ports = [];
        foreach (scandir($this->backup_dir) as $item) {
            if (in_array($item, [ '.', '..' ], true)) continue;
            if (is_dir($this->backup_dir . $item)) $ports[] = $item;
        }
        return $ports;
    }

    /**
     * 是否存在可还原的备份
     * @param array $ports
     * @return bool
     */
    public function hasBackup(array $ports = []): bool
    {
        $port_list = !empty($ports) ? $ports : $this->backupPorts();
        foreach ($port_list as $port) {
            if (is_dir($this->backup_dir . $port)) return true;
        }
        return false;
    }
}

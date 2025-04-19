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

namespace app\service\admin\upgrade;

use core\util\DbBackup;
use think\facade\Db;

/**
 * 框架及插件升级备份
 * @package app\service\core\upgrade
 */
class BackupService extends UpgradeService
{
    /**
     * 备份代码
     * @return void
     */
    public function backupCode()
    {
        $backup_dir = $this->upgrade_dir . $this->upgrade_task[ 'key' ] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;

        // 创建目录
        dir_mkdir($backup_dir);

        // 备份admin
        dir_copy($this->root_path . 'admin', $backup_dir . 'admin', exclude_dirs: [ '.vscode', 'node_modules', 'dist' ]);

        // 备份uni-app
        dir_copy($this->root_path . 'uni-app', $backup_dir . 'uni-app', exclude_dirs: [ 'node_modules', 'dist' ]);

        // 备份web
        dir_copy($this->root_path . 'web', $backup_dir . 'web', exclude_dirs: [ 'node_modules', '.nuxt', '.output', 'dist' ]);

        // 备份niucloud全部代码
        $niucloud_dir = $backup_dir . 'niucloud' . DIRECTORY_SEPARATOR;

        dir_copy($this->root_path . 'niucloud', $niucloud_dir, exclude_dirs: [ 'runtime', 'upload' ]);

        return true;
    }

    /**
     * 备份数据库
     * @return void
     */
    public function backupSql()
    {
        $backup_dir = $this->upgrade_dir . $this->upgrade_task[ 'key' ] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR;
        // 创建目录
        dir_mkdir($backup_dir);

        $db = new DbBackup($backup_dir, 1024 * 1024 * 2);

        $prefix = config('database.connections.' . config('database.default'))[ 'prefix' ];

        // 不需要备份的表
        $not_need_backup = [
            "{$prefix}sys_schedule_log",
            "{$prefix}sys_user_log",
            "{$prefix}jobs",
            "{$prefix}jobs_failed",
            "{$prefix}sys_upgrade_records",
            "{$prefix}sys_backup_records"
        ];
        $db->setExcludeTables($not_need_backup)->backupDatabaseSegment();

        return true;
    }
}

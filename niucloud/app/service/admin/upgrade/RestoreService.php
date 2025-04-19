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


use app\dict\sys\AppTypeDict;
use app\model\site\Site;
use core\util\DbBackup;

/**
 * 框架及插件升级恢复备份
 * @package app\service\core\upgrade
 */
class RestoreService extends UpgradeService
{
    /**
     * 恢复代码备份
     * @return true
     */
    public function restoreCode()
    {
        $backup_dir = $this->upgrade_dir . $this->upgrade_task[ 'key' ] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'code' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) {
            // 删除前端文件
//            if (is_dir(public_path() . 'admin')) del_target_dir(public_path() . 'admin', true);
//            if (is_dir(public_path() . 'wap')) del_target_dir(public_path() . 'wap', true);
//            if (is_dir(public_path() . 'web')) del_target_dir(public_path() . 'web', true);
            dir_copy($backup_dir, rtrim($this->root_path, DIRECTORY_SEPARATOR));
        }
        return true;
    }

    /**
     * 恢复数据库备份
     * @return true
     */
    public function restoreSql()
    {
        $backup_dir = $this->upgrade_dir . $this->upgrade_task[ 'key' ] . DIRECTORY_SEPARATOR . 'backup' . DIRECTORY_SEPARATOR . 'sql' . DIRECTORY_SEPARATOR;
        if (is_dir($backup_dir)) {
            $db = new DbBackup($backup_dir);
            $db->restoreDatabase();

            $site_model = new Site();
            $site_model->where([
                [ 'site_id', '<>', 0 ],
                [ 'app_type', '=', AppTypeDict::ADMIN ]
            ])->update([ 'site_id' => 0 ]);
        }
        return true;
    }

}

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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;


/**
 * 路由
 */
Route::group('', function () {

    // 获取正在进行的升级任务
    Route::get('upgrade/task', 'addon.Upgrade/getUpgradeTask');

    // 执行升级
    Route::post('upgrade/execute', 'addon.Upgrade/execute');

    // 清除升级任务
    Route::post('upgrade/clear', 'addon.Upgrade/clearUpgradeTask');

    // 升级环境校验已统一到通用校验（sys/check，scene=upgrade），此处不再单独提供

    // 升级
    Route::post('upgrade/[:addon]', 'addon.Upgrade/upgrade')->pattern(['addon' => '[\w,-]+']);

    // 获取升级内容
    Route::get('upgrade/[:addon]', 'addon.Upgrade/getUpgradeContent')->pattern(['addon' => '[\w,-]+']);

    Route::post('upgrade/operate/:operate', 'addon.Upgrade/operate');

    // 升级记录分页列表
    Route::get('upgrade/records', 'addon.Upgrade/getRecords');

    // 删除升级记录
    Route::delete('upgrade/records', 'addon.Upgrade/delRecords');

    // 删除升级记录对应的备份（备份记录 + 归档目录），升级记录保留
    Route::post('upgrade/backup/delete', 'addon.Upgrade/delBackup');

    // 备份记录分页列表
    Route::get('backup/records', 'addon.Backup/getRecords');

    // 修改备注
    Route::put('backup/remark', 'addon.Backup/modifyRemark');

    // 框架补丁列表
    Route::get('framework_patch', 'addon.FrameworkPatch/lists');

    // 框架补丁详情
    Route::get('framework_patch/:id', 'addon.FrameworkPatch/info')->pattern([ 'id' => '\d+' ]);

    // 立即同步云端补丁（入库 + 新补丁推送消息）
    Route::post('framework_patch/sync', 'addon.FrameworkPatch/sync');

    // 标记 / 取消标记补丁已解决
    Route::put('framework_patch/resolve/:id', 'addon.FrameworkPatch/resolve')->pattern([ 'id' => '\d+' ]);

    // 恢复前检测文件是否存在，备份
    Route::post('backup/check_dir', 'addon.Backup/checkDirExist');

    // 备份目录权限校验已统一到通用校验（sys/check，scene=backup），此处不再单独提供

    // 恢复升级备份
    Route::post('backup/restore', 'addon.Backup/restoreBackup');

    // 删除升级记录
    Route::post('backup/delete', 'addon.Backup/deleteRecords');

    // 手动备份
    Route::post('backup/manual', 'addon.Backup/manualBackup');

    // 获取进行中的恢复
    Route::get('backup/restore_task', 'addon.Backup/getRestoreTask');

    // 获取进行中的备份
    Route::get('backup/task', 'addon.Backup/getBackupTask');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

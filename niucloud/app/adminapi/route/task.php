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
 * 统一任务路由
 * 注意：静态路由需声明在 :task_key 动态路由之前，避免被动态段捕获
 */
Route::group('', function () {

    // 当前进行中的任务（全局互斥查询）
    Route::get('task/active', 'task.Task/getActiveTask');

    // 任务筛选配置（类型 / 状态选项，避免前端写死）
    Route::get('task/config', 'task.Task/getConfig');

    // 创建任务
    Route::post('task/create/:task_type', 'task.Task/create')->pattern([ 'task_type' => '[\w]+' ]);

    // 任务记录分页列表 / 删除（选择性清理）
    Route::get('task/records', 'task.Task/getRecords');
    Route::delete('task/records', 'task.Task/delRecords');

    // 任务详情
    Route::get('task/:task_key', 'task.Task/detail')->pattern([ 'task_key' => '[\w\-]+' ]);

    // 节点审计 / 终端事件回放
    Route::get('task/:task_key/steps', 'task.Task/getSteps')->pattern([ 'task_key' => '[\w\-]+' ]);
    Route::get('task/:task_key/events', 'task.Task/getEvents')->pattern([ 'task_key' => '[\w\-]+' ]);

    // 产物（目录树 / 下载）
    Route::get('task/:task_key/artifact', 'task.Task/getArtifacts')->pattern([ 'task_key' => '[\w\-]+' ]);
    Route::get('task/:task_key/artifact/download', 'task.Task/downloadArtifact')->pattern([ 'task_key' => '[\w\-]+' ]);

    // 驱动 / 用户操作 / 取消
    Route::post('task/:task_key/run', 'task.Task/run')->pattern([ 'task_key' => '[\w\-]+' ]);
    Route::post('task/:task_key/operate', 'task.Task/operate')->pattern([ 'task_key' => '[\w\-]+' ]);
    Route::post('task/:task_key/cancel', 'task.Task/cancel')->pattern([ 'task_key' => '[\w\-]+' ]);

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

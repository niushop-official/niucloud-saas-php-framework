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
 * 代码完整性检测路由
 *
 * 本文件位于 app/adminapi/route/ 下，框架会自动 glob 加载，无需改动 route.php。
 */
Route::group('sys/integrity', function () {
    // 目标列表（含版本与清单状态）
    Route::get('targets', 'sys.Integrity/targets');
    // 可选算法
    Route::get('algorithms', 'sys.Integrity/algorithms');
    // 页面配置
    Route::get('config', 'sys.Integrity/config');
    // 单个目标的清单状态
    Route::get('baseline_status', 'sys.Integrity/baselineStatus');
    // 分片检测
    Route::post('check', 'sys.Integrity/check');
    // 单个文件的文本比对（官方 vs 本地）
    Route::get('file_diff', 'sys.Integrity/fileDiff');
    // 用官方内容写回本地文件（覆盖前逐文件备份）
    Route::post('restore', 'sys.Integrity/restore');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

/**
 * 实时检测流：单独分组，只做 token 校验
 *
 * 与 notice/message/stream 同一套路：
 *   - 不挂 AdminCheckRole（避免每次连接重复加载全量菜单接口清单）
 *   - 不挂 AdminLog（避免为一次流式请求写操作日志）
 *   - EventSource 不能自定义请求头，token / site-id 通过 query 传递
 */
Route::group('sys/integrity', function () {
    // 流式检测（首选，前端连不上会自动降级到上面的 check）
    Route::get('stream', 'sys.Integrity/stream');
})->middleware([
    AdminCheckToken::class,
]);

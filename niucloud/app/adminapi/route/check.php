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

use app\adminapi\middleware\AdminCheckToken;
use think\facade\Route;

/**
 * 通用校验（场景化）
 * 单独分组、只做 token 校验：
 * - 不挂 AdminCheckRole（避免每次 SSE 连接重复加载全量菜单接口清单）
 * - 不挂 AdminLog（避免高频校验写操作日志）
 * - EventSource 不能自定义请求头，token / site-id 通过 query 传递
 */
Route::group('sys/check', function () {

    // 校验清单（仅下发待检测项，不执行检测）
    Route::get('meta', 'sys.Check/meta');

    // SSE 流式校验（实时推送各项校验过程）
    Route::get('stream', 'sys.Check/stream');

    // 一次性校验（SSE 不可用时的降级通道）
    Route::get('run', 'sys.Check/run');

})->middleware([
    AdminCheckToken::class
]);

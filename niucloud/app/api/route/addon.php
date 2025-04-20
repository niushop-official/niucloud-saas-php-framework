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

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;


/**
 * 路由
 */
Route::group('addon', function () {

    //获取已安装插件列表
    Route::get('list/install', 'addon.Addon/getInstallList');

})->middleware(ApiLog::class)
    ->middleware(ApiCheckToken::class, false);
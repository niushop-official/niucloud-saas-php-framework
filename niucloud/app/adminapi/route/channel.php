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
Route::group('channel', function () {
    /***************************************************** H5信息 ****************************************************/
    Route::get('h5/config', 'channel.H5/get');
    //设置微信配置
    Route::put('h5/config', 'channel.H5/set');

    /***************************************************** pc信息 ****************************************************/
    Route::get('pc/config', 'channel.Pc/get');
    //设置微信配置
    Route::put('pc/config', 'channel.Pc/set');

    /***************************************************** app端 ****************************************************/
    Route::get('app/config', 'channel.App/get');
    //设置手机端配置
    Route::put('app/config', 'channel.App/set');
    // 获取app版本列表
    Route::get('app/version', 'channel.App/versionList');
    // 获取app版本详情
    Route::get('app/version/:id', 'channel.App/versionInfo');
    // 添加app版本
    Route::post('app/version', 'channel.App/add');
    // 编辑app版本
    Route::put('app/version/:id', 'channel.App/edit');
    // 删除app版本
    Route::delete('app/version/:id', 'channel.App/del');
    // 获取app平台
    Route::get('app/platfrom', 'channel.App/appPlatform');
    // 获取app生成日志
    Route::get('app/build/log/:key', 'channel.App/buildLog');
    // 发布
    Route::put('app/version/:id/release', 'channel.App/release');
    // 生成证书
    Route::post('app/generate_sing_cert', 'channel.App/generateSingCert');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

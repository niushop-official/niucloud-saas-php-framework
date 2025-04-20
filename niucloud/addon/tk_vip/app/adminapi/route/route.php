<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 付费会员
 */
Route::group('tk_vip', function () {

     /***************************************************** adminapi 接口 ****************************************************/
    //获取配置
    Route::get('config/getconfig', 'addon\tk_vip\app\adminapi\controller\config\Config@getConfig');
    //设置配置
    Route::post('config/setconfig', 'addon\tk_vip\app\adminapi\controller\config\Config@setConfig');
    //获取实名配置
    Route::get('config/getrealconfig', 'addon\tk_vip\app\adminapi\controller\config\Config@getRealConfig');
    //设置实名配置
    Route::post('config/setrealconfig', 'addon\tk_vip\app\adminapi\controller\config\Config@setRealConfig');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_BEGIN -- tkvip_order

Route::group('tk_vip', function () {

    //VIP订单列表
    Route::get('order', 'addon\tk_vip\app\adminapi\controller\order\Order@lists');
    //VIP订单详情
    Route::get('order/:id', 'addon\tk_vip\app\adminapi\controller\order\Order@info');
    //添加VIP订单
    Route::post('order', 'addon\tk_vip\app\adminapi\controller\order\Order@add');
    //编辑VIP订单
    Route::put('order/:id', 'addon\tk_vip\app\adminapi\controller\order\Order@edit');
    //删除VIP订单
    Route::delete('order/:id', 'addon\tk_vip\app\adminapi\controller\order\Order@del');
    
    Route::get('member_all','addon\tk_vip\app\adminapi\controller\order\Order@getMemberAll');

    Route::get('member_level_all','addon\tk_vip\app\adminapi\controller\order\Order@getMemberLevelAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- tkvip_order

// USER_CODE_BEGIN -- tkvip_vip

Route::group('tk_vip', function () {

    //会员VIP管理列表
    Route::get('vip', 'addon\tk_vip\app\adminapi\controller\vip\Vip@lists');
    //会员VIP管理详情
    Route::get('vip/:id', 'addon\tk_vip\app\adminapi\controller\vip\Vip@info');
    //添加会员VIP管理
    Route::post('vip', 'addon\tk_vip\app\adminapi\controller\vip\Vip@add');
    //编辑会员VIP管理
    Route::put('vip/:id', 'addon\tk_vip\app\adminapi\controller\vip\Vip@edit');
    //删除会员VIP管理
    Route::delete('vip/:id', 'addon\tk_vip\app\adminapi\controller\vip\Vip@del');
    Route::get('member_level_all','addon\tk_vip\app\adminapi\controller\vip\Vip@getMemberLevelAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- tkvip_vip

// USER_CODE_BEGIN -- tkvip_vip_log

Route::group('tk_vip', function () {

    //会员日志列表
    Route::get('log', 'addon\tk_vip\app\adminapi\controller\log\Log@lists');
    //会员日志详情
    Route::get('log/:id', 'addon\tk_vip\app\adminapi\controller\log\Log@info');
    //添加会员日志
    Route::post('log', 'addon\tk_vip\app\adminapi\controller\log\Log@add');
    //编辑会员日志
    Route::put('log/:id', 'addon\tk_vip\app\adminapi\controller\log\Log@edit');
    //删除会员日志
    Route::delete('log/:id', 'addon\tk_vip\app\adminapi\controller\log\Log@del');
    
    Route::get('member_all','addon\tk_vip\app\adminapi\controller\log\Log@getMemberAll');

    Route::get('member_level_all','addon\tk_vip\app\adminapi\controller\log\Log@getMemberLevelAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- tkvip_vip_log

// USER_CODE_BEGIN -- tkvip_real

Route::group('tk_vip', function () {

    //实名认证列表
    Route::get('real', 'addon\tk_vip\app\adminapi\controller\real\Real@lists');
    //实名认证详情
    Route::get('real/:id', 'addon\tk_vip\app\adminapi\controller\real\Real@info');
    //添加实名认证
    Route::post('real', 'addon\tk_vip\app\adminapi\controller\real\Real@add');
    //编辑实名认证
    Route::put('real/:id', 'addon\tk_vip\app\adminapi\controller\real\Real@edit');
    //删除实名认证
    Route::delete('real/:id', 'addon\tk_vip\app\adminapi\controller\real\Real@del');
    //获取实名认证审核状态
    Route::get('real/status', 'addon\tk_vip\app\adminapi\controller\real\Real@getRealStatus');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- tkvip_real

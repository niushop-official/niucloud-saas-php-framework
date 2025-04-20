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
 * 充值赠送
 */
Route::group('qiankun_recharge', function () {

     /***************************************************** hello world ****************************************************/
    Route::get('hello_world', 'addon\qiankun_recharge\app\adminapi\controller\hello_world\Index@index');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

// USER_CODE_BEGIN -- qiankun_recharge_config

Route::group('qiankun_recharge', function () {
    //充值设置详情
    Route::get('config', 'addon\qiankun_recharge\app\adminapi\controller\config\Config@info');
    //添加充值设置
    Route::post('config', 'addon\qiankun_recharge\app\adminapi\controller\config\Config@add');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_recharge_config


// USER_CODE_BEGIN -- qiankun_recharge_options

Route::group('qiankun_recharge', function () {

    //充值项列列表
    Route::get('options', 'addon\qiankun_recharge\app\adminapi\controller\options\Options@lists');
    //充值项列详情
    Route::get('options/:id', 'addon\qiankun_recharge\app\adminapi\controller\options\Options@info');
    //添加充值项列
    Route::post('options', 'addon\qiankun_recharge\app\adminapi\controller\options\Options@add');
    //编辑充值项列
    Route::put('options/:id', 'addon\qiankun_recharge\app\adminapi\controller\options\Options@edit');
    //删除充值项列
    Route::delete('options/:id', 'addon\qiankun_recharge\app\adminapi\controller\options\Options@del');
    
    Route::get('coupon_all','addon\qiankun_recharge\app\adminapi\controller\options\Options@getCouponAll');

    Route::get('member_level_all','addon\qiankun_recharge\app\adminapi\controller\options\Options@getMemberLevelAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_recharge_options

// USER_CODE_BEGIN -- qiankun_recharge_order

Route::group('qiankun_recharge', function () {

    //充值订单列表
    Route::get('order', 'addon\qiankun_recharge\app\adminapi\controller\order\Order@lists');
    //充值订单详情
    Route::get('order/:id', 'addon\qiankun_recharge\app\adminapi\controller\order\Order@info');
    //添加充值订单
    Route::post('order', 'addon\qiankun_recharge\app\adminapi\controller\order\Order@add');
    //编辑充值订单
    Route::put('order/:id', 'addon\qiankun_recharge\app\adminapi\controller\order\Order@edit');
    //删除充值订单
    Route::delete('order/:id', 'addon\qiankun_recharge\app\adminapi\controller\order\Order@del');
    
    Route::get('member_all','addon\qiankun_recharge\app\adminapi\controller\order\Order@getMemberAll');

    Route::get('options_all','addon\qiankun_recharge\app\adminapi\controller\order\Order@getOptionsAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_recharge_order

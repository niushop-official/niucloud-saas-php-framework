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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;

/**
 * 商城代客下单系统
 */
Route::group('shop_replace_buy', function() {

    /************************************************** 代客下单 *****************************************************/
    //已选商品计算
    Route::get('select/calculate', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@selectGoodsCalculate');

    //创建订单
    Route::post('create', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@create');

    //计算
    Route::get('calculate', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@calculate');

    //检测订单支付
    Route::get('check', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@checkPay');

    //查询优惠券
    Route::get('coupon', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@getCoupon');

    // 查询自提点
    Route::get('store', 'addon\shop_replace_buy\app\adminapi\controller\OrderCreate@getStore');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

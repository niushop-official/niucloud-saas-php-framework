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

use addon\qiankun_cashier\middleware\CashierCheckToken;
use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use think\facade\Route;
use app\adminapi\middleware\AdminLog;

/**
 * 收银台
 */
Route::group('qiankun_cashier', function () {
    Route::get('addons', 'addon\qiankun_cashier\app\adminapi\controller\index\Index@addons');
    Route::get('goods/index', 'addon\qiankun_cashier\app\adminapi\controller\goods\Goods@index');
    Route::get('goods/category', 'addon\qiankun_cashier\app\adminapi\controller\goods\Goods@category');
    Route::get('user/list', 'addon\qiankun_cashier\app\adminapi\controller\user\User@index');
    Route::get('user/coupon_list', 'addon\qiankun_cashier\app\adminapi\controller\user\User@couponList');
    // 扫码支付
    Route::post('confirm', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@confirm');
    // 退款
    Route::post('refund', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@refund');
    // 计算
    Route::get('calculate', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@calculate');
    Route::post('scan_pay', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@scan_pay');
    Route::post('close_order/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@close_order');
    Route::get('get_order_status/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@get_order_status');
    Route::get('timeout/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@timeout');

    // 获取订单列表
    Route::get('get_order_list', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@get_order_list');

    // 测试
    Route::get('test_pay', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@pay');
})->middleware([
    CashierCheckToken::class,
    AdminLog::class,
]);

/**
 * 无需授权
 */
Route::group('qiankun_cashier', function () {
    Route::post('auth/login', 'addon\qiankun_cashier\app\adminapi\controller\index\Auth@login');
    Route::get('public/site_info', 'addon\qiankun_cashier\app\adminapi\controller\index\Publics@siteInfo');
})->middleware([
    AdminLog::class,
]);
// USER_CODE_BEGIN -- qiankun_cashier_list
/**
 * 后台
 */
Route::group('qiankun_cashier', function () {

    //收银员列表
    Route::get('cashier', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@lists');
    //收银员详情
    Route::get('cashier/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@info');
    //添加收银员
    Route::post('cashier', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@add');
    //编辑收银员
    Route::put('cashier/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@edit');
    //删除收银员
    Route::delete('cashier/:id', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@del');

    Route::get('member_all', 'addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class,
]);
// USER_CODE_END -- qiankun_cashier_list

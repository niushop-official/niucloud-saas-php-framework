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
 * 订单相关路由
 */
Route::group('yk_recharge', function() {

    /***************************************************** 充值订单 *************************************************/
    //订单列表

    Route::get('order', 'addon\yk_recharge\app\adminapi\controller\Order@lists');

    //订单详情
    Route::get('order/:order_id', 'addon\yk_recharge\app\adminapi\controller\Order@detail');

    //订单状态
    Route::get('order/status', 'addon\yk_recharge\app\adminapi\controller\Order@status');

    //订单统计
    Route::get('order/stat', 'addon\yk_recharge\app\adminapi\controller\Order@stat');

    // 订单发起退款
    Route::put('refund/:order_id', 'addon\yk_recharge\app\adminapi\controller\Order@refund');

    //退款订单列表
    Route::get('refund', 'addon\yk_recharge\app\adminapi\controller\Order@refundLists');

    //退款订单详情
    Route::get('refund/:refund_id', 'addon\yk_recharge\app\adminapi\controller\Order@refundDetail');

    //退款订单状态
    Route::get('refund/status', 'addon\yk_recharge\app\adminapi\controller\Order@refundStatus');

    //退款订单统计
    Route::get('refund/stat', 'addon\yk_recharge\app\adminapi\controller\Order@refundStat');

    //余额设置列表
    Route::get('setting/show', 'addon\yk_recharge\app\adminapi\controller\Setting@show');
    Route::get('setting/save', 'addon\yk_recharge\app\adminapi\controller\Setting@save');

     //文章分类详情
     Route::get('setting/:id', 'addon\yk_recharge\app\adminapi\controller\Setting@info');

     //添加文章分类
     Route::post('setting', 'addon\yk_recharge\app\adminapi\controller\Setting@add');
 
     //编辑文章分类
     Route::put('setting/:id', 'addon\yk_recharge\app\adminapi\controller\Setting@edit');
 
     //删除文章分类
     Route::delete('setting/:setting_id', 'addon\yk_recharge\app\adminapi\controller\Setting@del');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

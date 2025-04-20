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
 * 会员充值相关路由
 */
Route::group('recharge', function() {
    /***************************************************** 充值套餐相关 *************************************************/
    // 充值套餐配置
    Route::post('package/config', 'addon\recharge\app\adminapi\controller\Recharge@setRechargeConfig');

    // 获取充值套餐配置
    Route::get('package/config', 'addon\recharge\app\adminapi\controller\Recharge@getRechargeConfig');

    // 充值套餐列表
    Route::get('package', 'addon\recharge\app\adminapi\controller\Recharge@lists');

    // 添加充值套餐
    Route::post('package', 'addon\recharge\app\adminapi\controller\Recharge@add');

    // 添加充值套餐
    Route::post('package', 'addon\recharge\app\adminapi\controller\Recharge@add');

    // 编辑充值套餐
    Route::put('package/:id', 'addon\recharge\app\adminapi\controller\Recharge@edit');

    // 获取充值详情
    Route::get('package/init', 'addon\recharge\app\adminapi\controller\Recharge@init');

    // 删除套餐
    Route::delete('package/:id', 'addon\recharge\app\adminapi\controller\Recharge@del');

    // 修改套餐状态
    Route::put('package/status', 'addon\recharge\app\adminapi\controller\Recharge@modifyStatus');

    // 修改排序
    Route::put('package/sort', 'addon\recharge\app\adminapi\controller\Recharge@editSort');

    // 获取套餐赠送规则字典
    Route::get('dict/package_gift', 'addon\recharge\app\adminapi\controller\Recharge@getPackageGiftDict');

    /***************************************************** 充值订单 *************************************************/
    // 订单列表

    Route::get('order', 'addon\recharge\app\adminapi\controller\Order@lists');

    // 订单详情
    Route::get('order/:order_id', 'addon\recharge\app\adminapi\controller\Order@detail');

    // 订单状态
    Route::get('order/status', 'addon\recharge\app\adminapi\controller\Order@status');

    // 订单统计
    Route::get('order/stat', 'addon\recharge\app\adminapi\controller\Order@stat');

    // 订单发起退款
    Route::put('refund/:order_id', 'addon\recharge\app\adminapi\controller\Order@refund');

    // 退款订单列表
    Route::get('refund', 'addon\recharge\app\adminapi\controller\Order@refundLists');

    // 退款订单详情
    Route::get('refund/:refund_id', 'addon\recharge\app\adminapi\controller\Order@refundDetail');

    // 退款订单状态
    Route::get('refund/status', 'addon\recharge\app\adminapi\controller\Order@refundStatus');

    // 退款订单统计
    Route::get('refund/stat', 'addon\recharge\app\adminapi\controller\Order@refundStat');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

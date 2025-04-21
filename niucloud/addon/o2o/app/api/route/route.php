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
use app\api\middleware\ApiChannel;
use think\facade\Route;

/**
 * 无需验证登录
 */
Route::group('o2o', function() {

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);

/**
 * 验证登录!!!
 */
Route::group('o2o', function() {
    /*****************************************************  订单相关接口 ****************************************************/
    // 订单列表
    Route::get('order', 'addon\o2o\app\api\controller\Order@lists');
    // 订单数量
    Route::get('order/num', 'addon\o2o\app\api\controller\Order@getNum');
    // 订单状态
    Route::get('order/status', 'addon\o2o\app\api\controller\Order@status');
    // 订单详情
    Route::get('order/:order_id', 'addon\o2o\app\api\controller\Order@detail');
//    // 订单确认
//    Route::get('order/confirm', 'addon\o2o\app\api\controller\Order@confirm');
    // 订单创建
    Route::post('order/create', 'addon\o2o\app\api\controller\Order@create');
    // 订单计算
    Route::post('order/calculate', 'addon\o2o\app\api\controller\Order@calculate');
    // 订单取消
    Route::put('order/cancel/:order_id', 'addon\o2o\app\api\controller\Order@cancel');
    // 删除订单
    Route::delete('order/:order_id', 'addon\o2o\app\api\controller\Order@delete');

    /*****************************************************  订单维权相关接口 ****************************************************/
    // 申请退款
    Route::post('refund/apply', 'addon\o2o\app\api\controller\Refund@apply');
    // 取消维权申请
    Route::put('refund/cancel/:refund_id', 'addon\o2o\app\api\controller\Refund@cancel');
    // 维权详情
    Route::get('refund/:refund_no', 'addon\o2o\app\api\controller\Refund@detail');
    //退款状态
    Route::get('refund/status', 'addon\o2o\app\api\controller\Refund@status');
    //退款列表
    Route::get('refund/lists', 'addon\o2o\app\api\controller\Refund@lists');
    //退款原因
    Route::get('refund/reason', 'addon\o2o\app\api\controller\Refund@reason');
    // 维权详情(维权订单号)
    Route::get('refund/orderRefund/:refund_no', 'addon\o2o\app\api\controller\Refund@orderDetail');

    /*****************************************************  技师操作 ****************************************************/
    // 验证是否是技师
    Route::get('checktechnician', 'addon\o2o\app\api\controller\Technician@checkTechnician');
    // 技师订单状态
    Route::get('technician/order/status', 'addon\o2o\app\api\controller\TechnicianOrder@status');
    // 技师订单
    Route::get('technician/order', 'addon\o2o\app\api\controller\TechnicianOrder@lists');
    //技师订单详情
    Route::get('technician/order/:id', 'addon\o2o\app\api\controller\TechnicianOrder@detail');
    //转单
    Route::post('technician/order/transfer', 'addon\o2o\app\api\controller\TechnicianOrder@transfer');
    //开始服务
    Route::post('technician/order/service', 'addon\o2o\app\api\controller\TechnicianOrder@orderService');
    //添加服务项
    Route::post('technician/order/item', 'addon\o2o\app\api\controller\TechnicianOrder@addItem');
    //删除服务项
    Route::delete('technician/order/item/:id', 'addon\o2o\app\api\controller\TechnicianOrder@delItem');
    //编辑服务项
    Route::put('technician/order/item', 'addon\o2o\app\api\controller\TechnicianOrder@editItem');
    //服务完成
    Route::post('technician/order/finish', 'addon\o2o\app\api\controller\TechnicianOrder@finish');
    //技师订单统计
    Route::get('technician/order/stat', 'addon\o2o\app\api\controller\TechnicianOrder@stat');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)  //true表示要验证登录
    ->middleware(ApiLog::class);
/**
 * 不验证登录!!!
 */
Route::group('o2o', function() {
    /*****************************************************  分类相关接口 ****************************************************/
    // 分类列表
    Route::get('category', 'addon\o2o\app\api\controller\goods\Category@tree');
    /*****************************************************  项目相关接口 ****************************************************/
    // 项目列表
    Route::get('goods', 'addon\o2o\app\api\controller\goods\Goods@pages');
    Route::get('goods/list', 'addon\o2o\app\api\controller\goods\Goods@lists');
    // 项目详情
    Route::get('goods/detail', 'addon\o2o\app\api\controller\goods\Goods@detail');
    // 获取商品列表供组件调用
    Route::get('goods/components', 'addon\o2o\app\api\controller\goods\Goods@components');
    //预约设置
    Route::get('config/reserve', 'addon\o2o\app\api\controller\Config@getReserveConfig');

    /*****************************************************  技师列表 ****************************************************/
    //技师 列表
    Route::get('technician', 'addon\o2o\app\api\controller\Technician@pages');
    //列表，不分页
    Route::get('technician/list', 'addon\o2o\app\api\controller\Technician@lists');

    //支持商品的技师
    Route::get('technician/goods/:id', 'addon\o2o\app\api\controller\Technician@goodsTechnician');

    //技师详情
    Route::get('technician/:id', 'addon\o2o\app\api\controller\Technician@info');


})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false)  //true表示要验证登录
    ->middleware(ApiLog::class);

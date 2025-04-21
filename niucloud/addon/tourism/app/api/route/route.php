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
 * 旅游端路由 无需验证登录
 */
Route::group('tourism', function() {

    /***************************************************** 酒店相关接口 ****************************************************/
    //酒店列表
    Route::get('hotel', 'addon\tourism\app\api\controller\hotel\Hotel@lists');
    //酒店详情
    Route::get('hotel/:hotel_id', 'addon\tourism\app\api\controller\hotel\Hotel@info');
    //酒店房型列表
    Route::get('room/hotel/:hotel_id', 'addon\tourism\app\api\controller\hotel\Room@lists');
    //房型详情
    Route::get('room/:room_id', 'addon\tourism\app\api\controller\hotel\Room@info');
    //获取房型价格日历
    Route::get('room/goodsday/:hotel_id', 'addon\tourism\app\api\controller\hotel\Room@goodsDay');
    // 推荐酒店
    Route::get('hotel/recommend', 'addon\tourism\app\api\controller\hotel\Hotel@recommend');

    /*****************************************************  线路相关接口 ****************************************************/

    //线路列表
    Route::get('way', 'addon\tourism\app\api\controller\way\Way@lists');
    //线路详情
    Route::get('way/:way_id', 'addon\tourism\app\api\controller\way\Way@info');
    //获取线路标签
    Route::get('way/label', 'addon\tourism\app\api\controller\way\Way@getLabel');
    //获取线路价格日历
    Route::get('way/goodsday/:way_id', 'addon\tourism\app\api\controller\way\Way@goodsDay');
    // 推荐线路
    Route::get('way/recommend', 'addon\tourism\app\api\controller\way\Way@recommend');
    /*****************************************************  景点相关接口 ****************************************************/

    //景点列表
    Route::get('scenic', 'addon\tourism\app\api\controller\scenic\Scenic@lists');
    //景点详情
    Route::get('scenic/:scenic_id', 'addon\tourism\app\api\controller\scenic\Scenic@info');
    // 景点门票列表
    Route::get('ticket/:scenic_id', 'addon\tourism\app\api\controller\scenic\Scenic@ticket');
    //获取门票价格日历
    Route::get('ticket/goodsday/:goods_id', 'addon\tourism\app\api\controller\scenic\Scenic@goodsDay');
    // 推荐景点
    Route::get('scenic/recommend', 'addon\tourism\app\api\controller\scenic\Scenic@recommend');

    /***************************************************** 设置相关接口 ****************************************************/
    //酒店设置
    Route::get('hotel/config', 'addon\tourism\app\api\controller\hotel\Config@getConfig');
    //景点设置
    Route::get('scenic/config', 'addon\tourism\app\api\controller\scenic\Config@getConfig');
    //线路设置
    Route::get('way/config', 'addon\tourism\app\api\controller\way\Config@getConfig');

    // 订单状态
    Route::get('order/status', 'addon\tourism\app\api\controller\Order@status');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);

/**
 * 旅游端路由  验证登录!!!
 */
Route::group('tourism', function() {

    /***************************************************** 酒店相关接口 ****************************************************/

    // 酒店订单确认
    Route::get('hotel/order/confirm', 'addon\tourism\app\api\controller\hotel\Order@confirm');
    // 酒店订单创建
    Route::post('hotel/order/create', 'addon\tourism\app\api\controller\hotel\Order@create');
    // 酒店订单计算
    Route::get('hotel/order/calculate', 'addon\tourism\app\api\controller\hotel\Order@calculate');

    /***************************************************** 景点相关接口 ****************************************************/

    // 景点门票订单确认
    Route::get('scenic/order/confirm', 'addon\tourism\app\api\controller\scenic\Order@confirm');
    // 景点订单创建
    Route::post('scenic/order/create', 'addon\tourism\app\api\controller\scenic\Order@create');
    // 景点订单计算
    Route::get('scenic/order/calculate', 'addon\tourism\app\api\controller\scenic\Order@calculate');
    /*****************************************************  线路相关接口 ****************************************************/

    // 路线订单确认
    Route::get('way/order/confirm', 'addon\tourism\app\api\controller\way\Order@confirm');
    // 路线订单创建
    Route::post('way/order/create', 'addon\tourism\app\api\controller\way\Order@create');
    // 路线订单计算
    Route::get('way/order/calculate', 'addon\tourism\app\api\controller\way\Order@calculate');


    /*****************************************************  景点相关接口 ****************************************************/

    /*****************************************************  游客信息相关接口 ****************************************************/
    Route::get('tourist', 'addon\tourism\app\api\controller\Tourist@lists');
    // 获取游客信息
    Route::get('tourist/:id', 'addon\tourism\app\api\controller\Tourist@detail');
    // 添加游客
    Route::post('tourist', 'addon\tourism\app\api\controller\Tourist@add');
    // 修改游客信息
    Route::put('tourist/:id', 'addon\tourism\app\api\controller\Tourist@edit');
    // 删除游客信息
    Route::delete('tourist/:id', 'addon\tourism\app\api\controller\Tourist@del');

    /*****************************************************  订单相关接口 ****************************************************/

    // 订单列表
    Route::get('order', 'addon\tourism\app\api\controller\Order@lists');
    // 订单详情
    Route::get('order/:order_id', 'addon\tourism\app\api\controller\Order@detail');
    // 取消订单
    Route::put('order/cancel/:order_id', 'addon\tourism\app\api\controller\Order@cancel');
    // 删除订单
    Route::delete('order/:order_id', 'addon\tourism\app\api\controller\Order@delete');
    /*****************************************************  订单维权相关接口 ****************************************************/
    // 申请退款
    Route::post('refund/apply', 'addon\tourism\app\api\controller\Refund@apply');
    // 取消维权申请
    Route::put('refund/cancel/:refund_id', 'addon\tourism\app\api\controller\Refund@cancel');
    // 维权详情
    Route::get('refund/:refund_id', 'addon\tourism\app\api\controller\Refund@detail');
    /*****************************************************  核销相关接口 ****************************************************/
    // 订单核销记录
    Route::get('verify/record', 'addon\tourism\app\api\controller\Verify@lists');
    // 订单核销记录详情
    Route::get('verify/:verify_code', 'addon\tourism\app\api\controller\Verify@detail');
    // 订单核销
    Route::post('verify/:verify_code', 'addon\tourism\app\api\controller\Verify@verify');
    // 查询是否是核销员
    Route::get('verify/verifier/check', 'addon\tourism\app\api\controller\Verify@checkIsVerifier');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)  //true表示要验证登录
    ->middleware(ApiLog::class);

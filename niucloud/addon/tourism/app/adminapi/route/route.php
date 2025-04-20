<?php
// +----------------------------------------------------------------------
// | Niushop商城系统 - 团队十年电商经验汇集巨献!
// +----------------------------------------------------------------------
// | Copyright (c) 2022~2025 https://www.niushop.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Niushop并不是自由软件，未经许可不能去掉Niushop相关版权
// +----------------------------------------------------------------------
// | Author: Niushop Team <niucloud@outlook.com>
// +----------------------------------------------------------------------

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 旅游功能插件定义
 */
Route::group('tourism', function () {

    /***************************************************** 酒店相关接口 ****************************************************/
    //酒店列表
    Route::get('hotel', 'addon\tourism\app\adminapi\controller\hotel\Hotel@lists');
    //选择酒店
    Route::get('hotel/select', 'addon\tourism\app\adminapi\controller\hotel\Hotel@select');
    //酒店详情
    Route::get('hotel/:hotel_id', 'addon\tourism\app\adminapi\controller\hotel\Hotel@info');
    //添加酒店
    Route::post('hotel', 'addon\tourism\app\adminapi\controller\hotel\Hotel@add');
    //编辑酒店
    Route::put('hotel/:hotel_id', 'addon\tourism\app\adminapi\controller\hotel\Hotel@edit');
    //删除酒店
    Route::delete('hotel/:hotel_id', 'addon\tourism\app\adminapi\controller\hotel\Hotel@del');
    //获取酒店状态
    Route::get('hotel/status', 'addon\tourism\app\adminapi\controller\hotel\Hotel@getHotelStatus');
    //修改酒店状态
    Route::put('hotel/status/:hotel_id', 'addon\tourism\app\adminapi\controller\hotel\Hotel@editStatus');

    //房型列表
    Route::get('room', 'addon\tourism\app\adminapi\controller\hotel\Room@lists');
    //房型详情
    Route::get('room/:room_id', 'addon\tourism\app\adminapi\controller\hotel\Room@info');
    //添加房型
    Route::post('room', 'addon\tourism\app\adminapi\controller\hotel\Room@add');
    //编辑房型
    Route::put('room/:room_id', 'addon\tourism\app\adminapi\controller\hotel\Room@edit');
    //删除房型
    Route::delete('room/:room_id', 'addon\tourism\app\adminapi\controller\hotel\Room@del');
    //修改房型排序号
    Route::put('room/sort/:id', 'addon\tourism\app\adminapi\controller\hotel\Room@editSort');
    //修改房型状态
    Route::put('room/status/:id', 'addon\tourism\app\adminapi\controller\hotel\Room@editStatus');
    //获取房型数
    Route::get('room/count/:hotel_id', 'addon\tourism\app\adminapi\controller\hotel\Room@getRoomCount');

    //添加房型价格日历
    Route::post('room/calendar', 'addon\tourism\app\adminapi\controller\hotel\Room@addDatePrice');
    //房型日历列表
    Route::get('room/calendar', 'addon\tourism\app\adminapi\controller\hotel\Room@datePriceLists');

    //酒店订单列表
    Route::get('hotel/order', 'addon\tourism\app\adminapi\controller\hotel\Order@lists');
    //酒店订单详情
    Route::get('hotel/order/:order_id', 'addon\tourism\app\adminapi\controller\hotel\Order@detail');
    //酒店订单状态
    Route::get('hotel/order/status', 'addon\tourism\app\adminapi\controller\hotel\Order@status');

    //获取酒店周边、基础设施
    Route::get('hotel/facilities', 'addon\tourism\app\adminapi\controller\hotel\Hotel@getPeriphery');
    //获取房型基础设施
    Route::get('room/facilities', 'addon\tourism\app\adminapi\controller\hotel\Room@getPeriphery');
    //酒店设置
    Route::get('hotel/config', 'addon\tourism\app\adminapi\controller\hotel\Config@getConfig');

    Route::put('hotel/config', 'addon\tourism\app\adminapi\controller\hotel\Config@setConfig');
    /*****************************************************  景点相关接口 ****************************************************/

    //景点列表
    Route::get('scenic', 'addon\tourism\app\adminapi\controller\scenic\Scenic@lists');
    Route::get('scenic/select', 'addon\tourism\app\adminapi\controller\scenic\Scenic@select');
    //景点详情
    Route::get('scenic/:scenic_id', 'addon\tourism\app\adminapi\controller\scenic\Scenic@info');
    //添加景点
    Route::post('scenic', 'addon\tourism\app\adminapi\controller\scenic\Scenic@add');
    //编辑景点
    Route::put('scenic/:scenic_id', 'addon\tourism\app\adminapi\controller\scenic\Scenic@edit');
    //删除景点
    Route::delete('scenic/:scenic_id', 'addon\tourism\app\adminapi\controller\scenic\Scenic@del');
    //修改景点状态
    Route::put('scenic/status/:id', 'addon\tourism\app\adminapi\controller\scenic\Scenic@editStatus');

    //景点订单列表
    Route::get('scenic/order', 'addon\tourism\app\adminapi\controller\scenic\Order@lists');
    //景点订单详情
    Route::get('scenic/order/:order_id', 'addon\tourism\app\adminapi\controller\scenic\Order@detail');
    //景点订单状态
    Route::get('scenic/order/status', 'addon\tourism\app\adminapi\controller\scenic\Order@status');

    //添加门票
    Route::post('ticket', 'addon\tourism\app\adminapi\controller\scenic\Ticket@add');
    //编辑门票
    Route::put('ticket/:goods_id', 'addon\tourism\app\adminapi\controller\scenic\Ticket@edit');
    //门票详情
    Route::get('ticket/:goods_id', 'addon\tourism\app\adminapi\controller\scenic\Ticket@info');
    //删除门票
    Route::delete('ticket/:goods_id', 'addon\tourism\app\adminapi\controller\scenic\Ticket@del');
    //门票列表
    Route::get('ticket', 'addon\tourism\app\adminapi\controller\scenic\Ticket@lists');
    //修改门票状态
    Route::put('ticket/status/:id', 'addon\tourism\app\adminapi\controller\scenic\Ticket@editStatus');
    //添加门票价格日历
    Route::post('ticket/calendar', 'addon\tourism\app\adminapi\controller\scenic\Ticket@addDatePrice');
    //门票价格日历列表
    Route::get('ticket/calendar', 'addon\tourism\app\adminapi\controller\scenic\Ticket@datePriceLists');

    //景点设置
    Route::get('scenic/config', 'addon\tourism\app\adminapi\controller\scenic\Config@getConfig');

    Route::put('scenic/config', 'addon\tourism\app\adminapi\controller\scenic\Config@setConfig');

    /*****************************************************  线路相关接口 ****************************************************/

    //线路列表
    Route::get('way', 'addon\tourism\app\adminapi\controller\way\Way@lists');
    Route::get('way/select', 'addon\tourism\app\adminapi\controller\way\Way@select');
    //线路详情
    Route::get('way/:way_id', 'addon\tourism\app\adminapi\controller\way\Way@info');
    //添加线路
    Route::post('way', 'addon\tourism\app\adminapi\controller\way\Way@add');
    //编辑线路
    Route::put('way/:way_id', 'addon\tourism\app\adminapi\controller\way\Way@edit');
    //删除线路
    Route::delete('way/:way_id', 'addon\tourism\app\adminapi\controller\way\Way@del');
    //修改线路状态
    Route::put('way/status/:way_id', 'addon\tourism\app\adminapi\controller\way\Way@editStatus');

    //线路订单列表
    Route::get('way/order', 'addon\tourism\app\adminapi\controller\way\Order@lists');
    //线路订单详情
    Route::get('way/order/:order_id', 'addon\tourism\app\adminapi\controller\way\Order@detail');
    //线路订单状态
    Route::get('way/order/status', 'addon\tourism\app\adminapi\controller\way\Order@status');

    //线路设置
    Route::get('way/config', 'addon\tourism\app\adminapi\controller\way\Config@getConfig');
    //获取线路标签
    Route::get('way/label', 'addon\tourism\app\adminapi\controller\way\Way@getLabel');
    //添加线路价格日历
    Route::post('way/calendar', 'addon\tourism\app\adminapi\controller\way\Way@addDatePrice');
    //门票线路日历列表
    Route::get('way/calendar', 'addon\tourism\app\adminapi\controller\way\Way@datePriceLists');


    Route::put('way/config', 'addon\tourism\app\adminapi\controller\way\Config@setConfig');

    //会员折扣
    Route::put('goods/memberprice', 'addon\tourism\app\adminapi\controller\Goods@editGoodsMemberPrice');
    //日历会员折扣是否参与
    Route::put('goods/daymemberprice', 'addon\tourism\app\adminapi\controller\Goods@editGoodsDayMemberPrice');

    /*****************************************************  统计相关接口 ****************************************************/
    // 全部统计
    Route::get('stat/total', 'addon\tourism\app\adminapi\controller\Stat@total');
    // 订单统计
    Route::get('stat/order', 'addon\tourism\app\adminapi\controller\Stat@order');
    // 当日统计
    Route::get('stat/today', 'addon\tourism\app\adminapi\controller\Stat@today');
    // 昨日统计
    Route::get('stat/yesterday', 'addon\tourism\app\adminapi\controller\Stat@yesterday');
    // 天统计数据
    Route::get('stat/stat', 'addon\tourism\app\adminapi\controller\Stat@stat');
    // 按时统计数据
    Route::get('stat/hour', 'addon\tourism\app\adminapi\controller\Stat@hourStat');

    /*****************************************************  核销相关接口 ****************************************************/
    // 订单核销记录
    Route::get('verify/record', 'addon\tourism\app\adminapi\controller\Verify@lists');
    // 订单核销记录详情
    Route::get('verify/:verify_code', 'addon\tourism\app\adminapi\controller\Verify@detail');
    // 订单核销查询
    Route::get('verify/search/:type/:value', 'addon\tourism\app\adminapi\controller\Verify@search');
    // 订单核销
    Route::post('verify/:verify_code', 'addon\tourism\app\adminapi\controller\Verify@verify');

    /*****************************************************  维权相关接口 ****************************************************/
    //酒店订单维权记录
    Route::get('refund', 'addon\tourism\app\adminapi\controller\Refund@lists');
    //酒店订单维权详情
    Route::get('refund/:refund_id', 'addon\tourism\app\adminapi\controller\Refund@detail');
    // 拒绝
    Route::put('refund/refuse/:refund_id', 'addon\tourism\app\adminapi\controller\Refund@refuse');
    // 确认转账
    Route::put('refund/:refund_id', 'addon\tourism\app\adminapi\controller\Refund@refund');
    // 维权状态
    Route::get('refund/status', 'addon\tourism\app\adminapi\controller\Refund@status');

    /*****************************************************  旅游设置相关接口 ****************************************************/
    //设置旅游设置
    Route::post('setting', 'addon\tourism\app\adminapi\controller\Setting@setSetting');
    //获取旅游设置
    Route::get('setting', 'addon\tourism\app\adminapi\controller\Setting@getSetting');

    /*****************************************************  核销员相关接口 ****************************************************/
    // 添加核销员
    Route::post('verifier', 'addon\tourism\app\adminapi\controller\Verifier@add');
    // 获取核销员列表
    Route::get('verifier', 'addon\tourism\app\adminapi\controller\Verifier@lists');
    // 删除核销员
    Route::delete('verifier/:id', 'addon\tourism\app\adminapi\controller\Verifier@del');

    // 获取商品列表用于选择
    Route::get('goods_of_select', 'addon\tourism\app\adminapi\controller\hotel\Room@getListOfSelect');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

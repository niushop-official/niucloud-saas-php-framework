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
Route::group('vipcard', function() {
    // 预约设置
    Route::get('reserve/config', 'addon\vipcard\app\api\controller\reserve\Config@get');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);

/**
 * 验证登录!!!
 */
Route::group('vipcard', function() {
    /*****************************************************  订单相关接口 ****************************************************/
    // 订单列表
    Route::get('order', 'addon\vipcard\app\api\controller\Order@lists');
    // 订单状态
    Route::get('order/status', 'addon\vipcard\app\api\controller\Order@status');
    // 订单详情
    Route::get('order/:order_id', 'addon\vipcard\app\api\controller\Order@detail');
    // 订单确认
    Route::get('order/confirm', 'addon\vipcard\app\api\controller\Order@confirm');
    // 订单创建
    Route::post('order/create', 'addon\vipcard\app\api\controller\Order@create');
    // 订单计算
    Route::get('order/calculate', 'addon\vipcard\app\api\controller\Order@calculate');
    // 订单取消
    Route::put('order/cancel/:order_id', 'addon\vipcard\app\api\controller\Order@cancel');
    // 删除订单
    Route::delete('order/:order_id', 'addon\vipcard\app\api\controller\Order@delete');

    /*****************************************************  核销相关接口 ****************************************************/
    // 核销记录
    Route::get('verify', 'addon\vipcard\app\api\controller\Verify@lists');
    // 核销记录详情
    Route::get('verify/:id', 'addon\vipcard\app\api\controller\Verify@detail');
    // 核销
    Route::get('verify/search/:verify_code', 'addon\vipcard\app\api\controller\Verify@search');
    // 核销
    Route::post('verify/:verify_code', 'addon\vipcard\app\api\controller\Verify@verify');
    // 查询是否是核销员
    Route::get('verify/verifier/check', 'addon\vipcard\app\api\controller\Verify@checkIsVerifier');
    // 核销记录根据卡项id
    Route::get('verify/card/:card_id', 'addon\vipcard\app\api\controller\Verify@cardVerifyRecord');

    /***************************************************** 会员卡相关接口 ****************************************************/
    // 会员卡列表
    Route::get('membercard', 'addon\vipcard\app\api\controller\MemberCard@lists');
    // 会员卡详情
    Route::get('membercard/:card_id', 'addon\vipcard\app\api\controller\MemberCard@detail');

    /*****************************************************  订单维权相关接口 ****************************************************/
    // 申请退款
    Route::post('refund/apply', 'addon\vipcard\app\api\controller\Refund@apply');
    // 取消维权申请
    Route::put('refund/cancel/:refund_id', 'addon\vipcard\app\api\controller\Refund@cancel');
    // 维权详情
    Route::get('refund/:refund_id', 'addon\vipcard\app\api\controller\Refund@detail');

    /*****************************************************  项目预约 ****************************************************/
    // 预约申请
    Route::post('reserve/apply', 'addon\vipcard\app\api\controller\reserve\Reserve@apply');
    //预约列表
    Route::get('reserve/list', 'addon\vipcard\app\api\controller\reserve\Reserve@lists');
    //预约 详情
    Route::get('reserve/info/:id', 'addon\vipcard\app\api\controller\reserve\Reserve@info');
    //取消预约
    Route::put('reserve/remove/:id', 'addon\vipcard\app\api\controller\reserve\Reserve@remove');

    /***************************************************** 会员收藏 **************************************************/
    //收藏 添加
    Route::post('collect', 'addon\vipcard\app\api\controller\Collect@setMemberCollect');
    //收藏 查询(单条)
    Route::get('collect', 'addon\vipcard\app\api\controller\Collect@getCollect');
    //收藏 查询(全部)
    Route::get('collect/all', 'addon\vipcard\app\api\controller\Collect@getList');
    //收藏 取消
    Route::delete('collect/:id', 'addon\vipcard\app\api\controller\Collect@del');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)  //true表示要验证登录
    ->middleware(ApiLog::class);
/**
 * 不验证登录!!!
 */
Route::group('vipcard', function() {
    /*****************************************************  分类相关接口 ****************************************************/
    // 分类列表
    Route::get('category', 'addon\vipcard\app\api\controller\goods\Category@tree');
    /*****************************************************  项目相关接口 ****************************************************/
    // 项目列表
    Route::get('service', 'addon\vipcard\app\api\controller\goods\Service@pages');
    Route::get('service/list', 'addon\vipcard\app\api\controller\goods\Service@lists');
    // 项目详情
    Route::get('service/:id', 'addon\vipcard\app\api\controller\goods\Service@info');
    /*****************************************************  卡项相关接口 ****************************************************/
    // 卡项列表
    Route::get('card', 'addon\vipcard\app\api\controller\goods\Card@pages');
    Route::get('card/list', 'addon\vipcard\app\api\controller\goods\Card@lists');
    // 卡项详情
    Route::get('card/:id', 'addon\vipcard\app\api\controller\goods\Card@info');

    //获取预约状态
    Route::get('reserve/status', 'addon\vipcard\app\api\controller\reserve\Reserve@getStatus');

    // 技师列表
    Route::get('reserve/user/page', 'addon\vipcard\app\api\controller\reserve\User@page');
    // 技师列表不分页
    Route::get('reserve/user/list', 'addon\vipcard\app\api\controller\reserve\User@lists');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false)  //true表示要验证登录
    ->middleware(ApiLog::class);

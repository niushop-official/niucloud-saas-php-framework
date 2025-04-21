<?php

// +----------------------------------------------------------------------
// | Author: TK
// +----------------------------------------------------------------------

use addon\tk_vip\app\api\middleware\ApiCheckRole;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;

Route::group('tk_vip', function() {
    /***************************************************** vip 登录接口 ****************************************************/
    //获取开启等级权益的会员等级
    Route::get('member/level', 'addon\tk_vip\app\api\controller\member\Level@lists');
    //创建订单
    Route::post('order/create', 'addon\tk_vip\app\api\controller\order\Order@add');
    //获取会员等级信息
    Route::get('vip/levelinfo', 'addon\tk_vip\app\api\controller\member\Level@getInfo');
    //购买订单记录
    Route::get('order/lists', 'addon\tk_vip\app\api\controller\order\Order@lists');
    /***************************************************** vip 实名认证接口 ****************************************************/
    //获取实名认证配置
    Route::get('real/getrealconfig', 'addon\tk_vip\app\api\controller\real\Real@getRealConfig');
    //检查实名
    Route::get('real/checkreal', 'addon\tk_vip\app\api\controller\real\Real@checkReal');
    //提交实名
    Route::post('real/submitreal', 'addon\tk_vip\app\api\controller\real\Real@submitReal');
    //获取实名信息
    Route::get('real/getrealinfo', 'addon\tk_vip\app\api\controller\real\Real@getRealInfo');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);

Route::group('tk_vip', function() {
    /***************************************************** 手机管理接口 ****************************************************/
    //获取会员列表
    Route::get('member/list', 'addon\tk_vip\app\api\controller\member\Member@getMemberLists');
    //获取会员信息
    Route::get('member/info/:id', 'addon\tk_vip\app\api\controller\member\Member@getMemberInfo');
    //调整积分
    Route::post('member/adjustpoint', 'addon\tk_vip\app\api\controller\member\Member@adjustPoint');
    //调整积分
    Route::post('member/adjustbalance', 'addon\tk_vip\app\api\controller\member\Member@adjustBalance');
    //调整会员等级
    Route::get('member/edit/:id', 'addon\tk_vip\app\api\controller\member\Member@edit');
    //编辑实名
    Route::get('member/editreal/:id', 'addon\tk_vip\app\api\controller\member\Member@editReal');
    //新增实名
    Route::post('member/addreal', 'addon\tk_vip\app\api\controller\member\Member@addReal');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiCheckRole::class)
    ->middleware(ApiLog::class);

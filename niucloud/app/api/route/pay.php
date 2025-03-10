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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;

//支付异步回调
Route::any('pay/notify/:site_id/:channel/:type/:action', 'pay.Pay/notify')
    ->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);
/**
 * 路由
 */
Route::group('pay',function () {
    //找朋友帮忙付支付信息
    Route::get('friendspay/info/:trade_type/:trade_id', 'pay.Pay/friendspayInfo');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class)
    ->middleware(ApiLog::class);

Route::group('pay',function () {
    //去支付
    Route::post('', 'pay.Pay/pay');
    //支付信息
    Route::get('info/:trade_type/:trade_id', 'pay.Pay/info');
    //获取支付类型
    Route::get('type/:trade_type', 'pay.Pay/getPayType');
    //支付关闭
    Route::post('close', 'pay.Pay/close');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)//表示验证登录
    ->middleware(ApiLog::class);


Route::group('transfer',function () {
    //去支付
    Route::post('confirm/:transfer_no', 'pay.Pay/pay');


})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true)//表示验证登录
    ->middleware(ApiLog::class);
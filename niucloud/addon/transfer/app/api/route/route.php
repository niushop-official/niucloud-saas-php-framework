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

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 会员资产转赠
 */
Route::group('transfer', function() {

    Route::get('config', 'addon\transfer\app\api\controller\Index@config');
    Route::get('checkmember', 'addon\transfer\app\api\controller\Transfer@checkmember');
    Route::get('transfer_balance', 'addon\transfer\app\api\controller\Transfer@transfer_balance');
    Route::get('transfer_point', 'addon\transfer\app\api\controller\Transfer@transfer_point');
    Route::get('transfer_coupon', 'addon\transfer\app\api\controller\Transfer@transfer_coupon');
    Route::get('transfer_commission', 'addon\transfer\app\api\controller\Transfer@transfer_commission');

    Route::get('duihuan/point_balance', 'addon\transfer\app\api\controller\Duihuan@point_balance');
    Route::get('duihuan/commission_balance', 'addon\transfer\app\api\controller\Duihuan@commission_balance');
    Route::get('duihuan/balance_point', 'addon\transfer\app\api\controller\Duihuan@balance_point');



})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



Route::group('transfer', function() {

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);


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
 * 幸运抽奖
 */
Route::group('turntable', function() {
    Route::get('info', 'addon\turntable\app\api\controller\turntable\Turntable@info');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



Route::group('turntable', function() {
    Route::post('lottery', 'addon\turntable\app\api\controller\turntable\Turntable@lottery');
    Route::get('gameDrawRecord', 'addon\turntable\app\api\controller\turntable\Turntable@gameDrawRecord');
    Route::post('saveAddress', 'addon\turntable\app\api\controller\turntable\Turntable@saveAddress');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);


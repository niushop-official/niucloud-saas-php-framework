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
 * 充值赠送
 */
Route::group('qiankun_recharge', function() {
    /***************************************************** hello world ****************************************************/
    Route::get('hello_world', 'addon\qiankun_recharge\app\api\controller\hello_world\Index@index');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



Route::group('qiankun_recharge', function() {
    Route::get('config', 'addon\qiankun_recharge\app\api\controller\recharge\Index@config');
    Route::get('package_list', 'addon\qiankun_recharge\app\api\controller\recharge\Index@package_list');
    Route::post('recharge', 'addon\qiankun_recharge\app\api\controller\recharge\Index@recharge');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);


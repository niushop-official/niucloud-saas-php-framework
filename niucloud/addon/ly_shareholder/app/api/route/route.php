<?php

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 股东合伙人
 */
Route::group('ly_shareholder', function() {
    /***************************************************** config ****************************************************/
    //获取股东设置
    Route::get('config', 'addon\ly_shareholder\app\api\controller\Config@getShareholderConfig');
    //股东等级
    Route::get('level', 'addon\ly_shareholder\app\api\controller\ShareholderLevel@lists');
    //股东等级详情
    Route::get('level/:id', 'addon\ly_shareholder\app\api\controller\ShareholderLevel@info');


     //股东信息
     Route::get('shareholder/info', 'addon\ly_shareholder\app\api\controller\Shareholder@info');
     //股东详情
     Route::get('shareholder/detail', 'addon\ly_shareholder\app\api\controller\Shareholder@detail');
     //股东账户信息
     Route::get('shareholder/account', 'addon\ly_shareholder\app\api\controller\Shareholder@account');
     //股东订单相关统计
     Route::get('shareholder/stat', 'addon\ly_shareholder\app\api\controller\Shareholder@orderStat');
     //股东账户明细
     Route::get('shareholder/accountdetail', 'addon\ly_shareholder\app\api\controller\Shareholder@accountDetail');


})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);




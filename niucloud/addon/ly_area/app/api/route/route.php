<?php

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 区域分红
 */
Route::group('ly_area', function() {


    /***************************************************** area_agent ****************************************************/
    Route::get('agent/info', 'addon\ly_area\app\api\controller\AreaAgent@info');

    Route::get('agent/lower_list', 'addon\ly_area\app\api\controller\AreaAgent@lowerAgentList');

    //代理详情
    Route::get('agent/detail', 'addon\ly_area\app\api\controller\AreaAgent@detail');
    //代理账户信息
    Route::get('agent/account', 'addon\ly_area\app\api\controller\AreaAgent@account');
    //代理订单相关统计
    Route::get('agent/stat', 'addon\ly_area\app\api\controller\AreaAgent@orderStat');
    //代理账户明细
    Route::get('agent/accountdetail', 'addon\ly_area\app\api\controller\AreaAgent@accountDetail');
    //代理所在区域订单统计
    Route::get('agent/area_order_stat', 'addon\ly_area\app\api\controller\AreaAgent@orderStatByArea');
    //代理所在区域下属代理列表统计
    Route::get('agent/lowerAgentList', 'addon\ly_area\app\api\controller\AreaAgent@lowerAgentList');
    Route::get('agent/reward', 'addon\ly_area\app\api\controller\AreaAgent@reward');

    Route::get('agent/teamAgent', 'addon\ly_area\app\api\controller\AreaAgent@teamAgent');


    /***************************************************** area_level ****************************************************/
    Route::get('level/lists', 'addon\ly_area\app\api\controller\AreaLevel@lists');
    Route::get('level/:id', 'addon\ly_area\app\api\controller\AreaLevel@info');


    /***************************************************** area_apply ****************************************************/
    Route::post('apply', 'addon\ly_area\app\api\controller\AreaApply@add');

    Route::put('apply/:id', 'addon\ly_area\app\api\controller\AreaApply@edit');

    Route::delete('apply/:id', 'addon\ly_area\app\api\controller\AreaApply@del');

    Route::get('apply/applyInfo', 'addon\ly_area\app\api\controller\AreaApply@applyInfo');


    Route::get('config', 'addon\ly_area\app\api\controller\Config@getAreaConfig');



})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);



// Route::group('ly_area', function() {

// })->middleware(ApiChannel::class)
//     ->middleware(ApiCheckToken::class, true) //表示验证登录
//     ->middleware(ApiLog::class);


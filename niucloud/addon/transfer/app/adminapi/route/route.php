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

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 会员资产转赠
 */
Route::group('transfer', function () {

    //获取配置
    Route::get('config/getconfig', 'addon\transfer\app\adminapi\controller\config\Config@getConfig');
    //设置配置
    Route::post('config/setconfig', 'addon\transfer\app\adminapi\controller\config\Config@setConfig');


    //资产转赠记录列表
    Route::get('log', 'addon\transfer\app\adminapi\controller\log\Log@lists');
    //资产转赠记录详情
    Route::get('log/:id', 'addon\transfer\app\adminapi\controller\log\Log@info');
    //添加资产转赠记录
    Route::post('log', 'addon\transfer\app\adminapi\controller\log\Log@add');
    //编辑资产转赠记录
    Route::put('log/:id', 'addon\transfer\app\adminapi\controller\log\Log@edit');
    //删除资产转赠记录
    Route::delete('log/:id', 'addon\transfer\app\adminapi\controller\log\Log@del');
    
    Route::get('member_all','addon\transfer\app\adminapi\controller\log\Log@getMemberAll');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- transfer_log

// USER_CODE_BEGIN -- transfer_order

Route::group('transfer', function () {

    //转赠支付订单列表
    Route::get('order', 'addon\transfer\app\adminapi\controller\order\Order@lists');
    //转赠支付订单详情
    Route::get('order/:id', 'addon\transfer\app\adminapi\controller\order\Order@info');
    //添加转赠支付订单
    Route::post('order', 'addon\transfer\app\adminapi\controller\order\Order@add');
    //编辑转赠支付订单
    Route::put('order/:id', 'addon\transfer\app\adminapi\controller\order\Order@edit');
    //删除转赠支付订单
    Route::delete('order/:id', 'addon\transfer\app\adminapi\controller\order\Order@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- transfer_order

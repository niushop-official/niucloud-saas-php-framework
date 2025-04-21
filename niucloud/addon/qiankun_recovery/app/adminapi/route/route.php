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
 * 推N返本
 */
Route::group('qiankun_recovery', function () {

     /***************************************************** hello world ****************************************************/
    Route::get('config', 'addon\qiankun_recovery\app\adminapi\controller\config\Index@index');
    Route::post('config', 'addon\qiankun_recovery\app\adminapi\controller\config\Index@save');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_BEGIN -- qiankun_recovery_order

Route::group('qiankun_recovery', function () {

    //推N返本订单列表
    Route::get('order', 'addon\qiankun_recovery\app\adminapi\controller\order\Order@lists');
    //推N返本订单详情
    Route::get('order/:id', 'addon\qiankun_recovery\app\adminapi\controller\order\Order@info');
    //添加推N返本订单
    Route::post('order', 'addon\qiankun_recovery\app\adminapi\controller\order\Order@add');
    //编辑推N返本订单
    Route::put('order/:id', 'addon\qiankun_recovery\app\adminapi\controller\order\Order@edit');
    //删除推N返本订单
    Route::delete('order/:id', 'addon\qiankun_recovery\app\adminapi\controller\order\Order@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_recovery_order

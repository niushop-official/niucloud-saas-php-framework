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
 * 智享小票打印
 */

// USER_CODE_BEGIN -- zx_print

Route::group('zxprint', function () {

    Route::post('getsetting', 'addon\zxprint\app\adminapi\controller\zx_print\ZxPrint@getsetting');
    
    Route::post('setting', 'addon\zxprint\app\adminapi\controller\zx_print\ZxPrint@setting');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- zx_print

// USER_CODE_BEGIN -- zx_printlog

Route::group('zxprint', function () {

    //小票打印记录列表
    Route::get('zx_printlog', 'addon\zxprint\app\adminapi\controller\zx_printlog\ZxPrintlog@lists');
    
    //删除小票打印记录
    Route::delete('zx_printlog/:id', 'addon\zxprint\app\adminapi\controller\zx_printlog\ZxPrintlog@del');
    
    //进行小票打印
    Route::post('print/:order_id', 'addon\zxprint\app\adminapi\controller\zx_printlog\ZxPrintlog@print');
    
    Route::get('order_all','addon\zxprint\app\adminapi\controller\zx_printlog\ZxPrintlog@getOrderAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- zx_printlog

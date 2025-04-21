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
 * 幸运抽奖
 */
Route::group('turntable', function () {
    Route::get('search', 'addon\turntable\app\adminapi\controller\turntable\Turntable@search');
    Route::post('create', 'addon\turntable\app\adminapi\controller\turntable\Turntable@create');
    Route::get('init', 'addon\turntable\app\adminapi\controller\turntable\Turntable@init');
    Route::post('update', 'addon\turntable\app\adminapi\controller\turntable\Turntable@update');
    Route::post('delete', 'addon\turntable\app\adminapi\controller\turntable\Turntable@delete');
    Route::get('detail', 'addon\turntable\app\adminapi\controller\turntable\Turntable@detail');
    Route::post('close', 'addon\turntable\app\adminapi\controller\turntable\Turntable@close');
    Route::post('open', 'addon\turntable\app\adminapi\controller\turntable\Turntable@open');
    Route::post('calculate', 'addon\turntable\app\adminapi\controller\turntable\Turntable@calculate');
    Route::put('settings', 'addon\turntable\app\adminapi\controller\settings\Settings@settings');
    Route::get('settings', 'addon\turntable\app\adminapi\controller\settings\Settings@getSettings');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
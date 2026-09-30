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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;


/**
 * 站点相关（平台0）
 */
Route::group('stat', function () {

    /***************************************************** 统计 ****************************************************/
    //控制台
    Route::get('index', 'stat.Stat/index');
    //站点控制台
    Route::get('siteindex', 'stat.SiteStat/index');

    /***************************************************** 插件运营面板 ****************************************************/
    //插件卡片列表
    Route::get('addon_panel', 'stat.AddonPanel/index');
    //插件统计详情
    Route::get('addon_panel/:key', 'stat.AddonPanel/detail');
    //插件关联站点（即将到期 / 会员数排行）
    Route::get('addon_panel/:key/sites', 'stat.AddonPanel/sites');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
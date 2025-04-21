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
 * 路由
 */
Route::group('user', function () {
    /***************************************************** 用户 ****************************************************/
    //用户列表
    Route::get('user', 'user.User/lists');
    //全部用户列表
    Route::get('user_all', 'user.User/getUserAll');
    //添加站点可选用户列表
    Route::get('user_select', 'user.User/getUserSelect');
    //用户详情
    Route::get('user/:uid', 'user.User/info');
    // 删除用户
    Route::delete('user/:uid', 'user.User/del');
    // 查询账号是否存在
    Route::get('isexist', 'user.User/checkUserIsExist');
    //添加用户
    Route::post('user', 'user.User/add');
    // 编辑用户
    Route::put('user/:uid', 'user.User/edit');
    // 获取用户站点创建限制
    Route::get('user/create_site_limit/:uid', 'user.User/getUserCreateSiteLimit');
    // 获取用户站点创建限制
    Route::get('user/create_site_limit/info/:id', 'user.User/getUserCreateSiteLimitInfo');
    // 增加用户站点创建限制
    Route::post('user/create_site_limit', 'user.User/addUserCreateSiteLimit');
    // 编辑用户站点创建限制
    Route::put('user/create_site_limit/:id', 'user.User/editUserCreateSiteLimit');
    // 删除用户站点创建限制
    Route::delete('user/create_site_limit/:id', 'user.User/delUserCreateSiteLimit');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

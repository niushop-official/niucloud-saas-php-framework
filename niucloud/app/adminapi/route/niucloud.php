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
 * 应用插件相关路由
 */
Route::group('niucloud', function() {
    //设置 授权信息
    Route::post('authinfo', 'niucloud.Module/setAuthorize');
    //获取 授权设置
    Route::get('admin/authinfo', 'niucloud.Module/getAuthorize');

    //获取授权信息
    Route::get('authinfo', 'niucloud.Module/authorize');


    //获取应用插件列表
    Route::get('module', 'addon.Addon/getLocalAddonList');
    //获取应用详情
    Route::get('module', 'addon.Addon/getLocalAddonList');
    //获取插件插件列表
    Route::get('module/version', 'addon.Addon/lists');
    //下载
    Route::get('module/download/:version_id', 'addon.Addon/info');
    //更新
    Route::put('addon/status/:version_id', 'addon.Addon/setStatus');
    // 获取框架最新版本
    Route::get('framework/newversion', 'niucloud.Module/getFrameworkLastVersion');
    // 获取框架版本更新记录
    Route::get('framework/version/list', 'niucloud.Module/getFrameworkVersionList');

    // 获取应用/插件的版本更新记录
    Route::get('app_version/list', 'niucloud.Module/getAppVersionList');

    // 官网账号（内嵌授权）
    // 获取官网内嵌页地址
    Route::get('account/embed_url', 'niucloud.Account/embedUrl');
    // 获取账号与当前授权信息
    Route::get('account/info', 'niucloud.Account/info');
    // 保存官网账号登录态（用于下次进入免登录）
    Route::post('account/token', 'niucloud.Account/saveToken');
    // 选用授权（仅保存所选授权的授权码，不做绑定）
    Route::post('account/select', 'niucloud.Account/select');
    // 绑定授权（官网 embed 页回传授权凭据）
    Route::post('account/bind', 'niucloud.Account/bind');
    // 退出官网账号会话（不解除本地授权）
    Route::post('account/logout', 'niucloud.Account/logout');
    // 同步当前授权状态
    Route::get('account/sync_state', 'niucloud.Account/syncState');

    // 云编译
    Route::post('build', 'niucloud.Cloud/build');
    // 获取编译任务
    Route::get('build', 'niucloud.Cloud/getBuildTask');
    // 获取云编译
    Route::get('build/log', 'niucloud.Cloud/getBuildLog');
    // 清除编译任务
    Route::post('build/clear', 'niucloud.Cloud/clearBuildTask');
    // 编译前校验已统一到通用校验（sys/check，scene=cloud_build），此处不再单独提供
    // 获取编译命令配置
    Route::get('build/command', 'niucloud.Cloud/buildCommand');
    // 编译端口列表（含说明与最近发版记录）
    Route::get('build/ports', 'niucloud.Cloud/getBuildPorts');
    // 发版记录：分页 / 发布状态 / 删除
    Route::get('build/version', 'niucloud.Cloud/getVersionList');
    Route::post('build/version/release', 'niucloud.Cloud/setVersionRelease');
    Route::delete('build/version', 'niucloud.Cloud/delVersion');
    //连通测试
    Route::post('build/connect_test', 'niucloud.Cloud/connectTest');
    //保存本地服务器地址
    Route::post('build/set_local_url', 'niucloud.Cloud/setLocalCloudCompileConfig');
    //获取本地服务器地址
    Route::get('build/get_local_url', 'niucloud.Cloud/getLocalCloudCompileConfig');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

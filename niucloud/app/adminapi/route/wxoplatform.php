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
Route::group('wxoplatform', function () {

    /***************************************************** 微信配置 ****************************************************/
    Route::get('config', 'wxoplatform.Config/get');
    //设置微信配置
    Route::put('config', 'wxoplatform.Config/set');
    //微信设置的静态信息
    Route::get('static', 'wxoplatform.Config/static');
    // 获取授权页地址
    Route::get('authorizationUrl', 'wxoplatform.Oplatform/getAuthorizationUrl');
    // 确认授权
    Route::get('authorization', 'wxoplatform.Oplatform/authorization');
    // 授权记录
    Route::get('authorization/record', 'wxoplatform.Oplatform/getAuthRecord');
    // 平台提交小程序版本
    Route::post('weapp/version/commit', 'wxoplatform.WeappVersion/weappCommit');
    // 获取最后一次提交记录
    Route::get('weapp/commit/last', 'wxoplatform.WeappVersion/lastCommitRecord');
    // 获取小程序提交记录
    Route::get('weapp/commit', 'wxoplatform.WeappVersion/commitRecord');
    // 站点小程序提交审核
    Route::post('site/weapp/commit', 'wxoplatform.WeappVersion/siteWeappCommit');
    // 按站点套餐获取提交记录
    Route::get('sitegroup/commit', 'wxoplatform.WeappVersion/getSiteGroupCommitRecord');
    // 撤销审核
    Route::put('undo/weappaudit', 'wxoplatform.WeappVersion/undoAudit');
    // 同步套餐下站点小程序
    Route::post('async/siteweapp', 'wxoplatform.WeappVersion/syncSiteWeapp');
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

Route::group('wxoplatform', function () {
    // 第三方平台授权事件接收
    Route::post('server', 'wxoplatform.Server/server');
    // 第三方平台消息与事件接收
    Route::post('message/:appid', 'wxoplatform.Server/message');
});

//系统环境（不效验登录状态）
Route::group('sys', function() {
    Route::get('wxoplatform/config', 'wxoplatform.Config/get');
});

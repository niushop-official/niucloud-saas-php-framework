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

use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use app\api\middleware\ApiChannel;
use think\facade\Route;


/**
 * 微官网
 */
Route::group('cms', function() {

    /***************************************************** 文章管理 ****************************************************/

    //文章列表
    Route::get('article', 'addon\cms\app\api\controller\article\Article@lists');

    //文章详情
    Route::get('article/:id', 'addon\cms\app\api\controller\article\Article@info');
    //浏览文章
    Route::put('article/visit/:id', 'addon\cms\app\api\controller\article\Article@visit');

    //文章
    Route::get('article/all', 'addon\cms\app\api\controller\article\Article@all');

    /***************************************************** 文章分类管理 ****************************************************/

    //文章分类列表
    Route::get('category', 'addon\cms\app\api\controller\article\ArticleCategory@lists');

    //文章分类详情
    Route::get('category/:id', 'addon\cms\app\api\controller\article\ArticleCategory@info');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);

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
 * 微官网
 */
Route::group('cms', function() {

    /***************************************************** 文章管理 ****************************************************/

    //文章列表
    Route::get('article', 'addon\cms\app\adminapi\controller\article\Article@lists');

    //文章详情
    Route::get('article/:id', 'addon\cms\app\adminapi\controller\article\Article@info');

    //添加文章
    Route::post('article', 'addon\cms\app\adminapi\controller\article\Article@add');

    //编辑文章
    Route::put('article/:id', 'addon\cms\app\adminapi\controller\article\Article@edit');

    //删除文章
    Route::delete('article/:id', 'addon\cms\app\adminapi\controller\article\Article@del');

    /***************************************************** 文章分类管理 ****************************************************/

    //文章分类列表
    Route::get('category', 'addon\cms\app\adminapi\controller\article\ArticleCategory@lists');

    //所有文章分类
    Route::get('category/all', 'addon\cms\app\adminapi\controller\article\ArticleCategory@all');

    //文章分类详情
    Route::get('category/:id', 'addon\cms\app\adminapi\controller\article\ArticleCategory@info');

    //添加文章分类
    Route::post('category', 'addon\cms\app\adminapi\controller\article\ArticleCategory@add');

    //编辑文章分类
    Route::put('category/:id', 'addon\cms\app\adminapi\controller\article\ArticleCategory@edit');

    //删除文章分类
    Route::delete('category/:category_id', 'addon\cms\app\adminapi\controller\article\ArticleCategory@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

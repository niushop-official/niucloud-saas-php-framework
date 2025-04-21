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
 * 素材中心
 */
// USER_CODE_BEGIN -- qiankun_source_category

Route::group('qiankun_source', function () {

    //乾坤素材分类列表
    Route::get('category', 'addon\qiankun_source\app\adminapi\controller\category\Category@lists');
    //乾坤素材分类详情
    Route::get('category/:id', 'addon\qiankun_source\app\adminapi\controller\category\Category@info');
    //添加乾坤素材分类
    Route::post('category', 'addon\qiankun_source\app\adminapi\controller\category\Category@add');
    //编辑乾坤素材分类
    Route::put('category/:id', 'addon\qiankun_source\app\adminapi\controller\category\Category@edit');
    //删除乾坤素材分类
    Route::delete('category/:id', 'addon\qiankun_source\app\adminapi\controller\category\Category@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_source_category

// USER_CODE_BEGIN -- qiankun_source_list

Route::group('qiankun_source', function () {

    //素材管理列表
    Route::get('source_list', 'addon\qiankun_source\app\adminapi\controller\source_list\SourceList@lists');
    //素材管理详情
    Route::get('source_list/:id', 'addon\qiankun_source\app\adminapi\controller\source_list\SourceList@info');
    //添加素材管理
    Route::post('source_list', 'addon\qiankun_source\app\adminapi\controller\source_list\SourceList@add');
    //编辑素材管理
    Route::put('source_list/:id', 'addon\qiankun_source\app\adminapi\controller\source_list\SourceList@edit');
    //删除素材管理
    Route::delete('source_list/:id', 'addon\qiankun_source\app\adminapi\controller\source_list\SourceList@del');
    
    Route::get('category_all','addon\qiankun_source\app\adminapi\controller\source_list\SourceList@getCategoryAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- qiankun_source_list

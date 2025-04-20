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

Route::group('shortvideo', function () {

    //标签列表
    Route::post('getset', 'addon\shortvideo\app\adminapi\controller\config\Config@getset');
    Route::post('saveset', 'addon\shortvideo\app\adminapi\controller\config\Config@saveset');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);


Route::group('shortvideo', function () {

    //分类列表
    Route::get('comment', 'addon\shortvideo\app\adminapi\controller\comment\Comment@lists');
    //分类详情
    Route::get('comment/:id', 'addon\shortvideo\app\adminapi\controller\comment\Comment@info');
    //添加分类
    Route::post('comment', 'addon\shortvideo\app\adminapi\controller\comment\Comment@add');
    //编辑分类
    Route::put('comment/:id', 'addon\shortvideo\app\adminapi\controller\comment\Comment@edit');
    //删除分类
    Route::delete('comment/:id', 'addon\shortvideo\app\adminapi\controller\comment\Comment@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

Route::group('shortvideo', function () {

    //分类列表
    Route::get('comment_reply', 'addon\shortvideo\app\adminapi\controller\comment\CommentReply@lists');
    //分类详情
    Route::get('comment_reply/:id', 'addon\shortvideo\app\adminapi\controller\comment\CommentReply@info');
    //添加分类
    Route::post('comment_reply', 'addon\shortvideo\app\adminapi\controller\comment\CommentReply@add');
    //编辑分类
    Route::put('comment_reply/:id', 'addon\shortvideo\app\adminapi\controller\comment\CommentReply@edit');
    //删除分类
    Route::delete('comment_reply/:id', 'addon\shortvideo\app\adminapi\controller\comment\CommentReply@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
Route::group('shortvideo', function () {

    //分类列表
    Route::get('cate', 'addon\shortvideo\app\adminapi\controller\cate\Cate@lists');
    //分类详情
    Route::get('cate/:id', 'addon\shortvideo\app\adminapi\controller\cate\Cate@info');
    //添加分类
    Route::post('cate', 'addon\shortvideo\app\adminapi\controller\cate\Cate@add');
    //编辑分类
    Route::put('cate/:id', 'addon\shortvideo\app\adminapi\controller\cate\Cate@edit');
    //删除分类
    Route::delete('cate/:id', 'addon\shortvideo\app\adminapi\controller\cate\Cate@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- shortvideo_video_cate

// USER_CODE_BEGIN -- shortvideo_comments

Route::group('shortvideo', function () {

    //评价列表
    Route::get('comments', 'addon\shortvideo\app\adminapi\controller\comments\Comments@lists');
    //评价详情
    Route::get('comments/:id', 'addon\shortvideo\app\adminapi\controller\comments\Comments@info');
    //添加评价
    Route::post('comments', 'addon\shortvideo\app\adminapi\controller\comments\Comments@add');
    //编辑评价
    Route::put('comments/:id', 'addon\shortvideo\app\adminapi\controller\comments\Comments@edit');
    //删除评价
    Route::delete('comments/:id', 'addon\shortvideo\app\adminapi\controller\comments\Comments@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- shortvideo_comments



// USER_CODE_BEGIN -- shortvideo_video

Route::group('shortvideo', function () {

    //帖子列表
    Route::get('video', 'addon\shortvideo\app\adminapi\controller\video\Video@lists');
    //帖子详情
    Route::get('video/:id', 'addon\shortvideo\app\adminapi\controller\video\Video@info');
    //添加帖子
    Route::post('video', 'addon\shortvideo\app\adminapi\controller\video\Video@add');
    //编辑帖子
    Route::put('video/:id', 'addon\shortvideo\app\adminapi\controller\video\Video@edit');
    //删除帖子
    Route::delete('video/:id', 'addon\shortvideo\app\adminapi\controller\video\Video@del');

    Route::get('cate_all','addon\shortvideo\app\adminapi\controller\video\Video@getCateAll');

    Route::get('member_all','addon\shortvideo\app\adminapi\controller\video\Video@getMemberAll');
    Route::get('video_all','addon\shortvideo\app\adminapi\controller\video\Video@getVideoAll');
    Route::get('goods_all','addon\shortvideo\app\adminapi\controller\video\Video@getGoodsAll');
    Route::get('label_all','addon\shortvideo\app\adminapi\controller\video\Video@getLabelAll');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- shortvideo_video

// USER_CODE_BEGIN -- shortvideo_label

Route::group('shortvideo', function () {

    //话题管理列表
    Route::get('label', 'addon\shortvideo\app\adminapi\controller\label\Label@lists');
    //话题管理详情
    Route::get('label/:id', 'addon\shortvideo\app\adminapi\controller\label\Label@info');
    //添加话题管理
    Route::post('label', 'addon\shortvideo\app\adminapi\controller\label\Label@add');
    //编辑话题管理
    Route::put('label/:id', 'addon\shortvideo\app\adminapi\controller\label\Label@edit');
    //删除话题管理
    Route::delete('label/:id', 'addon\shortvideo\app\adminapi\controller\label\Label@del');
    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- shortvideo_label

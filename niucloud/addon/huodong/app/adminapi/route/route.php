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
 * 活动报名
 */


Route::group('huodong', function () {

    //标签列表
    Route::get('banner', 'addon\huodong\app\adminapi\controller\banner\Banner@lists');
    //标签详情
    Route::get('banner/:id', 'addon\huodong\app\adminapi\controller\banner\Banner@info');
    //添加标签
    Route::post('banner', 'addon\huodong\app\adminapi\controller\banner\Banner@add');
    //编辑标签
    Route::put('banner/:id', 'addon\huodong\app\adminapi\controller\banner\Banner@edit');
    //删除标签
    Route::delete('banner/:id', 'addon\huodong\app\adminapi\controller\banner\Banner@del');

    //获取配置
    Route::get('config/getconfig', 'addon\huodong\app\adminapi\controller\config\Config@getConfig');
    //设置配置
    Route::post('config/setconfig', 'addon\huodong\app\adminapi\controller\config\Config@setConfig');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
 

// USER_CODE_BEGIN -- huodong

Route::group('huodong', function () {

    //活动列列表
    Route::get('act', 'addon\huodong\app\adminapi\controller\act\Act@lists');
    //活动列详情
    Route::get('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@info');
    //添加活动列
    Route::post('act', 'addon\huodong\app\adminapi\controller\act\Act@add');
    //编辑活动列
    Route::put('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@edit');
    //删除活动列
    Route::delete('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@del');
    
    Route::get('huodong_cate_all','addon\huodong\app\adminapi\controller\act\Act@getHuodongCateAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong


// USER_CODE_BEGIN -- huodong_act

Route::group('huodong', function () {

    //活动列列表
    Route::get('act', 'addon\huodong\app\adminapi\controller\act\Act@lists');
    //活动列详情
    Route::get('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@info');
    //添加活动列
    Route::post('act', 'addon\huodong\app\adminapi\controller\act\Act@add');
    //编辑活动列
    Route::put('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@edit');
    //删除活动列
    Route::delete('act/:id', 'addon\huodong\app\adminapi\controller\act\Act@del');
    
    Route::get('cate_all','addon\huodong\app\adminapi\controller\act\Act@getCateAll');



    //报名记录列表
    Route::get('order', 'addon\huodong\app\adminapi\controller\order\Order@lists');
    //报名记录详情
    Route::get('order/:id', 'addon\huodong\app\adminapi\controller\order\Order@info');
    //添加报名记录
    Route::post('order', 'addon\huodong\app\adminapi\controller\order\Order@add');
    //编辑报名记录
    Route::put('order/:id', 'addon\huodong\app\adminapi\controller\order\Order@edit');
    //删除报名记录
    Route::delete('order/:id', 'addon\huodong\app\adminapi\controller\order\Order@del');
    Route::get('order/status', 'addon\huodong\app\adminapi\controller\order\Order@status');

    Route::get('member_all','addon\huodong\app\adminapi\controller\order\Order@getMemberAll');

    Route::post('order/hexiao', 'addon\huodong\app\adminapi\controller\order\Order@hexiao');


    //活动分类列表
    Route::get('cate', 'addon\huodong\app\adminapi\controller\cate\Cate@lists');
    //活动分类详情
    Route::get('cate/:id', 'addon\huodong\app\adminapi\controller\cate\Cate@info');
    //添加活动分类
    Route::post('cate', 'addon\huodong\app\adminapi\controller\cate\Cate@add');
    //编辑活动分类
    Route::put('cate/:id', 'addon\huodong\app\adminapi\controller\cate\Cate@edit');
    //删除活动分类
    Route::delete('cate/:id', 'addon\huodong\app\adminapi\controller\cate\Cate@del');



    
})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong_cate

// USER_CODE_BEGIN -- huodong_fxuser

Route::group('huodong', function () {

    //推广员列表
    Route::get('fxuser', 'addon\huodong\app\adminapi\controller\fxuser\Fxuser@lists');
    //推广员详情
    Route::get('fxuser/:id', 'addon\huodong\app\adminapi\controller\fxuser\Fxuser@info');
    //添加推广员
    Route::post('fxuser', 'addon\huodong\app\adminapi\controller\fxuser\Fxuser@add');
    //编辑推广员
    Route::put('fxuser/:id', 'addon\huodong\app\adminapi\controller\fxuser\Fxuser@edit');
    //删除推广员
    Route::delete('fxuser/:id', 'addon\huodong\app\adminapi\controller\fxuser\Fxuser@del');
    
    Route::get('member_all','addon\huodong\app\adminapi\controller\fxuser\Fxuser@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong_fxuser

// USER_CODE_BEGIN -- huodong_relation

Route::group('huodong', function () {

    //推广关系列表
    Route::get('relation', 'addon\huodong\app\adminapi\controller\relation\Relation@lists');
    //推广关系详情
    Route::get('relation/:id', 'addon\huodong\app\adminapi\controller\relation\Relation@info');
    //添加推广关系
    Route::post('relation', 'addon\huodong\app\adminapi\controller\relation\Relation@add');
    //编辑推广关系
    Route::put('relation/:id', 'addon\huodong\app\adminapi\controller\relation\Relation@edit');
    //删除推广关系
    Route::delete('relation/:id', 'addon\huodong\app\adminapi\controller\relation\Relation@del');
    
    Route::get('member_all','addon\huodong\app\adminapi\controller\relation\Relation@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong_relation

// USER_CODE_BEGIN -- huodong_fxbill

Route::group('huodong', function () {

    //活动佣金明细列表
    Route::get('fxbill', 'addon\huodong\app\adminapi\controller\fxbill\Fxbill@lists');
    //活动佣金明细详情
    Route::get('fxbill/:id', 'addon\huodong\app\adminapi\controller\fxbill\Fxbill@info');
    //添加活动佣金明细
    Route::post('fxbill', 'addon\huodong\app\adminapi\controller\fxbill\Fxbill@add');
    //编辑活动佣金明细
    Route::put('fxbill/:id', 'addon\huodong\app\adminapi\controller\fxbill\Fxbill@edit');
    //删除活动佣金明细
    Route::delete('fxbill/:id', 'addon\huodong\app\adminapi\controller\fxbill\Fxbill@del');
    
    Route::get('member_all','addon\huodong\app\adminapi\controller\fxbill\Fxbill@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong_fxbill

// USER_CODE_BEGIN -- huodong_user

Route::group('huodong', function () {

    //报名者信息列表
    Route::get('user', 'addon\huodong\app\adminapi\controller\user\User@lists');
    //报名者信息详情
    Route::get('user/:id', 'addon\huodong\app\adminapi\controller\user\User@info');
    //添加报名者信息
    Route::post('user', 'addon\huodong\app\adminapi\controller\user\User@add');
    //编辑报名者信息
    Route::put('user/:id', 'addon\huodong\app\adminapi\controller\user\User@edit');
    //删除报名者信息
    Route::delete('user/:id', 'addon\huodong\app\adminapi\controller\user\User@del');
    
    Route::get('member_all','addon\huodong\app\adminapi\controller\user\User@getMemberAll');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
// USER_CODE_END -- huodong_user

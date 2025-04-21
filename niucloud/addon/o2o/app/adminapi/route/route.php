<?php
// +----------------------------------------------------------------------
// | Niushop商城系统 - 团队十年电商经验汇集巨献!
// +----------------------------------------------------------------------
// | Copyright (c) 2022~2025 https://www.niushop.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Niushop并不是自由软件，未经许可不能去掉Niushop相关版权
// +----------------------------------------------------------------------
// | Author: Niushop Team <niucloud@outlook.com>
// +----------------------------------------------------------------------

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 上门服务功能插件定义
 */
Route::group('o2o', function () {
    /***************************************************** 技师 ****************************************************/
    //技师 列表
    Route::get('technician', 'addon\o2o\app\adminapi\controller\technician\Technician@pages');
    //技师 列表
    Route::get('technician/list', 'addon\o2o\app\adminapi\controller\technician\Technician@lists');
    //技师 列表（用于弹框选择）
    Route::get('technician/select', 'addon\o2o\app\adminapi\controller\technician\Technician@select');
    //技师 添加
    Route::post('technician/edit', 'addon\o2o\app\adminapi\controller\technician\Technician@add');
    //技师 编辑
    Route::put('technician/edit/:id', 'addon\o2o\app\adminapi\controller\technician\Technician@edit');
    //技师 详情
    Route::get('technician/info/:id', 'addon\o2o\app\adminapi\controller\technician\Technician@info');
    //技师 删除
    Route::delete('technician/:id', 'addon\o2o\app\adminapi\controller\technician\Technician@del');
    //技师 状态
    Route::put('technician/status/:id', 'addon\o2o\app\adminapi\controller\technician\Technician@status');
    //会员
    Route::get('technician/member', 'addon\o2o\app\adminapi\controller\technician\Technician@getMember');
    //支持商品的技师
    Route::get('technician/goods/:id', 'addon\o2o\app\adminapi\controller\technician\Technician@goodsTechnician');

    /***************************************************** 岗位 ****************************************************/
    //岗位列表
    Route::get('position', 'addon\o2o\app\adminapi\controller\technician\Position@pages');

    Route::get('position/list', 'addon\o2o\app\adminapi\controller\technician\Position@lists');
    //岗位详情
    Route::get('position/:id', 'addon\o2o\app\adminapi\controller\technician\Position@info');
    //岗位添加
    Route::post('position/edit', 'addon\o2o\app\adminapi\controller\technician\Position@add');
    //岗位编辑
    Route::put('position/edit/:id', 'addon\o2o\app\adminapi\controller\technician\Position@edit');
    //岗位删除
    Route::delete('position/:id', 'addon\o2o\app\adminapi\controller\technician\Position@del');

    /*****************************************************  商品分类管理 ****************************************************/
    // 项目分类列表
    Route::get('category', 'addon\o2o\app\adminapi\controller\category\Category@lists');
    // 项目分类列表
    Route::get('category/list', 'addon\o2o\app\adminapi\controller\category\Category@getCategoryList');
    // 项目分类树
    Route::get('category/tree', 'addon\o2o\app\adminapi\controller\category\Category@tree');
    // 项目分类详情
    Route::get('category/:id', 'addon\o2o\app\adminapi\controller\category\Category@info');
    //添加 项目分类
    Route::post('category', 'addon\o2o\app\adminapi\controller\category\Category@add');
    //编辑 项目分类
    Route::put('category/:id', 'addon\o2o\app\adminapi\controller\category\Category@edit');
    //删除 项目分类
    Route::delete('category/:id', 'addon\o2o\app\adminapi\controller\category\Category@del');

    /*****************************************************  服务管理 ****************************************************/
    // 项目列表
    Route::get('goods', 'addon\o2o\app\adminapi\controller\goods\Goods@lists');
    // 获取商品选择分页列表
    Route::get('goods/select', 'addon\o2o\app\adminapi\controller\goods\Goods@select');
    // 项目列表
    Route::get('goods/list', 'addon\o2o\app\adminapi\controller\goods\Goods@getLists');
    // 项目详情
    Route::get('goods/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@info');
    //添加 项目
    Route::post('goods', 'addon\o2o\app\adminapi\controller\goods\Goods@add');
    //编辑 详情
    Route::get('goods/init', 'addon\o2o\app\adminapi\controller\goods\Goods@init');
    //编辑 项目
    Route::put('goods/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@edit');
    //商品sku
    Route::get('goods/sku', 'addon\o2o\app\adminapi\controller\goods\Goods@sku');
    // 编辑商品规格列表会员价格
    Route::put('goods/member_price', 'addon\o2o\app\adminapi\controller\goods\Goods@editGoodsListMemberPrice');
    // 复制项目
    Route::put('goods/copy/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@copy');
    //删除 项目
    Route::delete('goods/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@del');
    //编辑 项目状态
    Route::put('goods/status/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@editStatus');
    //修改排序
    Route::put('goods/sort/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@editSort');
    //删除
    Route::delete('goods/:id', 'addon\o2o\app\adminapi\controller\goods\Goods@del');

    //预约配置
    Route::post('goods/reserve', 'addon\o2o\app\adminapi\controller\Config@setReserveConfig');
    Route::get('goods/reserve', 'addon\o2o\app\adminapi\controller\Config@getReserveConfig');

    /*****************************************************  统计相关接口 ****************************************************/
    // 全部统计
    Route::get('stat/total', 'addon\o2o\app\adminapi\controller\Stat@total');
    // 当日统计
    Route::get('stat/today', 'addon\o2o\app\adminapi\controller\Stat@today');
    // 昨日统计
    Route::get('stat/yesterday', 'addon\o2o\app\adminapi\controller\Stat@yesterday');
    // 月统计
    Route::get('stat/month', 'addon\o2o\app\adminapi\controller\Stat@month');

    /***************************************************** 订单管理管理 ****************************************************/
    // 订单列表
    Route::get('order', 'addon\o2o\app\adminapi\controller\Order@lists');
    // 订单详情
    Route::get('order/:order_id', 'addon\o2o\app\adminapi\controller\Order@detail');
    // 订单状态
    Route::get('order/status', 'addon\o2o\app\adminapi\controller\Order@status');
    // 订单派单
    Route::post('order/dispatch', 'addon\o2o\app\adminapi\controller\Order@dispatch');
    // 订单看板
    Route::get('order/board', 'addon\o2o\app\adminapi\controller\Order@reserveByWeek');

    //交易配置
    Route::post('order/config', 'addon\o2o\app\adminapi\controller\Config@setConfig');
    Route::get('order/config', 'addon\o2o\app\adminapi\controller\Config@getConfig');

    /*****************************************************  维权相关接口 ****************************************************/
    // 订单维权记录
    Route::get('refund', 'addon\o2o\app\adminapi\controller\Refund@lists');
    // 订单维权详情
    Route::get('refund/:refund_no', 'addon\o2o\app\adminapi\controller\Refund@detail');
    // 拒绝
    Route::put('refund/refuse/:refund_id', 'addon\o2o\app\adminapi\controller\Refund@refuse');
    // 确认转账
    Route::put('refund/:refund_id', 'addon\o2o\app\adminapi\controller\Refund@refund');
    // 维权状态
    Route::get('refund/status', 'addon\o2o\app\adminapi\controller\Refund@status');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

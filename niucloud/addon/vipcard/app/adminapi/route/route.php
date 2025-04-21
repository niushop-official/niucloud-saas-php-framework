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
 * 卡项功能插件定义
 */
Route::group('vipcard', function () {

    /*****************************************************  商品分类管理 ****************************************************/
    // 项目分类列表
    Route::get('category', 'addon\vipcard\app\adminapi\controller\category\Category@lists');
    // 项目分类列表
    Route::get('category/list', 'addon\vipcard\app\adminapi\controller\category\Category@getCategoryList');
    // 项目分类树
    Route::get('category/tree', 'addon\vipcard\app\adminapi\controller\category\Category@tree');
    // 项目分类详情
    Route::get('category/:id', 'addon\vipcard\app\adminapi\controller\category\Category@info');
    //添加 项目分类
    Route::post('category', 'addon\vipcard\app\adminapi\controller\category\Category@add');
    //编辑 项目分类
    Route::put('category/:id', 'addon\vipcard\app\adminapi\controller\category\Category@edit');
    //删除 项目分类
    Route::delete('category/:id', 'addon\vipcard\app\adminapi\controller\category\Category@del');

    /*****************************************************  项目管理 ****************************************************/
    // 项目列表
    Route::get('service', 'addon\vipcard\app\adminapi\controller\goods\Service@lists');

    // 项目列表 搜索使用
    Route::get('service/select', 'addon\vipcard\app\adminapi\controller\goods\Service@select');
    // 项目列表
    Route::get('service/list', 'addon\vipcard\app\adminapi\controller\goods\Service@getLists');
    // 项目详情
    Route::get('service/:id', 'addon\vipcard\app\adminapi\controller\goods\Service@info');
    //添加 项目
    Route::post('service', 'addon\vipcard\app\adminapi\controller\goods\Service@add');
    //编辑 项目
    Route::put('service/:id', 'addon\vipcard\app\adminapi\controller\goods\Service@edit');
    //删除 项目
    Route::delete('service/:id', 'addon\vipcard\app\adminapi\controller\goods\Service@del');
    //编辑 项目状态
    Route::put('service/status/:id', 'addon\vipcard\app\adminapi\controller\goods\Service@editStatus');
    //修改排序
    Route::put('service/sort/:id', 'addon\vipcard\app\adminapi\controller\goods\Service@editSort');

    /*****************************************************  卡项管理 ****************************************************/
    // 卡项列表
    Route::get('card', 'addon\vipcard\app\adminapi\controller\goods\Card@lists');
    // 卡项详情
    Route::get('card/:id', 'addon\vipcard\app\adminapi\controller\goods\Card@info');
    //添加 卡项
    Route::post('card', 'addon\vipcard\app\adminapi\controller\goods\Card@add');
    //编辑 卡项
    Route::put('card/:id', 'addon\vipcard\app\adminapi\controller\goods\Card@edit');
    //删除 卡项
    Route::delete('card/:id', 'addon\vipcard\app\adminapi\controller\goods\Card@del');
    //获取卡项类型
    Route::get('card/type', 'addon\vipcard\app\adminapi\controller\goods\Card@getCardType');
    //获取卡项核销类型
    Route::get('card/verifytype', 'addon\vipcard\app\adminapi\controller\goods\Card@getVerifytype');
    //修改排序
    Route::put('card/sort/:id', 'addon\vipcard\app\adminapi\controller\goods\Card@editSort');
    //编辑 卡项状态
    Route::put('card/status/:id', 'addon\vipcard\app\adminapi\controller\goods\Card@editStatus');

    /***************************************************** 预约管理 ****************************************************/
    //预约列表
    Route::get('reserve', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@lists');
    //预约详情
    Route::get('reserve/:id', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@info');
    //添加预约
    Route::post('reserve', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@add');
    //编辑预约
    Route::put('reserve/:id', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@edit');
    //删除预约
    Route::delete('reserve/:id', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@del');
    //预约设置获取
    Route::get('reserve/config', 'addon\vipcard\app\adminapi\controller\reserve\Config@get');
    //预约设置配置
    Route::put('reserve/config', 'addon\vipcard\app\adminapi\controller\reserve\Config@set');
    //预约看板
    Route::get('reserve/board', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@reserveByWeek');
    //获取会员
    Route::get('reserve/member', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@getMember');
    //获取状态
    Route::get('reserve/status', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@getStatus');
    //变更预约状态
    Route::put('reserve/status/:id', 'addon\vipcard\app\adminapi\controller\reserve\Reserve@status');

    //技师 列表
    Route::get('reserve/user', 'addon\vipcard\app\adminapi\controller\reserve\User@pages');

    Route::get('reserve/user/list', 'addon\vipcard\app\adminapi\controller\reserve\User@lists');
    //技师 添加
    Route::post('reserve/user', 'addon\vipcard\app\adminapi\controller\reserve\User@add');
    //技师 详情
    Route::get('reserve/user/:id', 'addon\vipcard\app\adminapi\controller\reserve\User@info');
    //技师 删除
    Route::delete('reserve/user/:id', 'addon\vipcard\app\adminapi\controller\reserve\User@del');
    //技师 编辑
    Route::put('reserve/user/:id', 'addon\vipcard\app\adminapi\controller\reserve\User@edit');
    //技师 状态
    Route::put('reserve/user/status/:id', 'addon\vipcard\app\adminapi\controller\reserve\User@status');

    /***************************************************** 领取记录 ****************************************************/
    //购买记录状态
    Route::get('member/service/status', 'addon\vipcard\app\adminapi\controller\goods\MemberCard@getStatus');
    //领取记录
    Route::get('member/service/record', 'addon\vipcard\app\adminapi\controller\goods\MemberCard@servicePage');
    //记录详情
    Route::get('member/service/record/:id', 'addon\vipcard\app\adminapi\controller\goods\MemberCard@serviceinfo');
    //领取记录
    Route::get('member/card/record', 'addon\vipcard\app\adminapi\controller\goods\MemberCard@cardPage');
    //记录详情
    Route::get('member/card/record/:id', 'addon\vipcard\app\adminapi\controller\goods\MemberCard@cardInfo');

    /*****************************************************  统计相关接口 ****************************************************/
    // 全部统计
    Route::get('stat/total', 'addon\vipcard\app\adminapi\controller\Stat@total');
    // 当日统计
    Route::get('stat/today', 'addon\vipcard\app\adminapi\controller\Stat@today');
    // 昨日统计
    Route::get('stat/yesterday', 'addon\vipcard\app\adminapi\controller\Stat@yesterday');
    // 月统计
    Route::get('stat/month', 'addon\vipcard\app\adminapi\controller\Stat@month');

    /***************************************************** 订单管理管理 ****************************************************/
    // 订单列表
    Route::get('order', 'addon\vipcard\app\adminapi\controller\Order@lists');
    // 订单详情
    Route::get('order/:order_id', 'addon\vipcard\app\adminapi\controller\Order@detail');
    // 订单状态
    Route::get('order/status', 'addon\vipcard\app\adminapi\controller\Order@status');

    /*****************************************************  核销员相关接口 ****************************************************/
    // 添加核销员
    Route::post('verifier', 'addon\vipcard\app\adminapi\controller\Verifier@add');
    // 获取核销员列表
    Route::get('verifier', 'addon\vipcard\app\adminapi\controller\Verifier@lists');
    // 删除核销员
    Route::delete('verifier/:id', 'addon\vipcard\app\adminapi\controller\Verifier@del');

    /*****************************************************  核销相关接口 ****************************************************/
    // 订单核销记录
    Route::get('verify/record', 'addon\vipcard\app\adminapi\controller\Verify@lists');
    // 订单核销记录详情
    Route::get('verify/:verify_code', 'addon\vipcard\app\adminapi\controller\Verify@detail');
    // 订单核销
    Route::post('verify/:verify_code', 'addon\vipcard\app\adminapi\controller\Verify@verify');

    /*****************************************************  维权相关接口 ****************************************************/
    // 订单维权记录
    Route::get('refund', 'addon\vipcard\app\adminapi\controller\Refund@lists');
    // 订单维权详情
    Route::get('refund/:refund_id', 'addon\vipcard\app\adminapi\controller\Refund@detail');
    // 拒绝
    Route::put('refund/refuse/:refund_id', 'addon\vipcard\app\adminapi\controller\Refund@refuse');
    // 确认转账
    Route::put('refund/:refund_id', 'addon\vipcard\app\adminapi\controller\Refund@refund');
    // 维权状态
    Route::get('refund/status', 'addon\vipcard\app\adminapi\controller\Refund@status');

    /*****************************************************  商品相关接口 ****************************************************/
    Route::get('goods_of_select', 'addon\vipcard\app\adminapi\controller\goods\Card@getGoodsPageOfSelect');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

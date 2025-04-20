<?php

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 股东合伙人
 */
Route::group('ly_shareholder', function () {


    /***************************************************** 股东分红记录 ****************************************************/
    //股东分红记录列表
    Route::get('shareholder_log', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLog@lists');
    //股东分红记录详情
    Route::get('shareholder_log/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLog@info');
    //添加股东分红记录
    Route::post('shareholder_log', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLog@add');
    //编辑股东分红记录
    Route::put('shareholder_log/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLog@edit');
    //删除股东分红记录
    Route::delete('shareholder_log/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLog@del');
    
    Route::get('shareholderLevel','addon\ly_shareholder\app\adminapi\controller\ShareholderLog@getShareholderLevelAll');

    /***************************************************** shareholder_set ****************************************************/
    //获取投东设置
    Route::get('config', 'addon\ly_shareholder\app\adminapi\controller\Config@getShareholderConfig');
    //股东设置
    Route::put('config', 'addon\ly_shareholder\app\adminapi\controller\Config@setShareholderConfig');

    Route::get('memberLevel','addon\ly_shareholder\app\adminapi\controller\Config@getMemberLevelAll');

    Route::get('shareholderLevel','addon\ly_shareholder\app\adminapi\controller\Config@getShareholderLevelAll');


    /*****************************************************shareholder_lists *************************************************** */
    //股东分红统计列表
    Route::get('shareholder', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@lists');
    //股东分红统计详情
    Route::get('shareholder/:member_id', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@info');
    //添加股东分红统计
    Route::post('shareholder', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@add');
    //编辑股东分红统计
    Route::put('shareholder/:member_id', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@edit');
    //删除股东分红统计
    Route::delete('shareholder/:member_id', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@del');
    //冻结股东
    Route::put('shareholder_invalid/:member_id', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@invalid');


    Route::get('member_of_select', 'addon\ly_shareholder\app\adminapi\controller\Shareholder@getMemberListOfSelect');


    /*****************************************************shareholder_level *************************************************** */
    //股东等级列表
    Route::get('shareholder_level', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@lists');
    //股东等级详情
    Route::get('shareholder_level/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@info');
    //添加股东等级
    Route::post('shareholder_level', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@add');
    //编辑股东等级
    Route::put('shareholder_level/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@edit');
    //删除股东等级
    Route::delete('shareholder_level/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@del');
    //股东等级权重
    Route::get('shareholder_level_num', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@getLevelNumList');
    //股东等级卡片
    Route::get('shareholder_level_card', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@getShareholderCard');
    //股东等级选择列表
    Route::get('shareholder_level_select', 'addon\ly_shareholder\app\adminapi\controller\ShareholderLevel@getListOfSelect');


     /*****************************************************shareholder_goods *************************************************** */
    //股东分红商品列表
    Route::get('shareholder_goods', 'addon\ly_shareholder\app\adminapi\controller\ShareholderGoods@lists');
    //股东商品详情
    Route::get('shareholder_goods/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderGoods@info');
    //编辑股东商品
    Route::put('shareholder_goods/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderGoods@setGoodsConfig');
    //设置商品是否参与股东分红
    Route::put('shareholder_goods/is_shareholder', 'addon\ly_shareholder\app\adminapi\controller\ShareholderGoods@modifyIsShareholder');
    //股东商品比率
    Route::get('shareholder_goods_config/:id', 'addon\ly_shareholder\app\adminapi\controller\ShareholderGoods@goodsCommission');


    /***************************************************** 股东统计相关 ****************************************************/
    Route::get('stat_shareholder_week', 'addon\ly_shareholder\app\adminapi\controller\Stat@shareholderWeekStat');
    //佣金统计
    Route::get('stat_commission', 'addon\ly_shareholder\app\adminapi\controller\Stat@commissionStat');
    //股东统计
    Route::get('stat_shareholder_member', 'addon\ly_shareholder\app\adminapi\controller\Stat@shareholderStat');
    //账户统计
    Route::get('stat_account', 'addon\ly_shareholder\app\adminapi\controller\Stat@accountStat');
    //股东升级订单相关统计
    // Route::get('stat_shareholder', 'addon\ly_shareholder\app\adminapi\controller\Stat@shareholderOrderStat');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
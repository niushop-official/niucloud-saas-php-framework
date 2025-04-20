<?php

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 区域分红
 */
Route::group('ly_area', function () {

     /***************************************************** area agent ****************************************************/

    //区域代理列表
    Route::get('agent', 'addon\ly_area\app\adminapi\controller\AreaAgent/lists');
    //区域代理详情
    Route::get('agent/:id', 'addon\ly_area\app\adminapi\controller\AreaAgent/info');
    //添加区域代理
    Route::post('agent', 'addon\ly_area\app\adminapi\controller\AreaAgent/add');
    //编辑区域代理
    Route::put('agent/:id', 'addon\ly_area\app\adminapi\controller\AreaAgent/edit');
    //删除区域代理
    Route::delete('agent/:id', 'addon\ly_area\app\adminapi\controller\AreaAgent/del');

    Route::get('member_of_select', 'addon\ly_area\app\adminapi\controller\AreaAgent@getMemberListOfSelect');



    /*****************************************************area level **************************************************** */
    //区域代理等级列表
    Route::get('level', 'addon\ly_area\app\adminapi\controller\AreaLevel/lists');
    //区域代理等级详情
    Route::get('level/:id', 'addon\ly_area\app\adminapi\controller\AreaLevel/info');
    //添加区域代理等级
    Route::post('level', 'addon\ly_area\app\adminapi\controller\AreaLevel/add');
    //编辑区域代理等级
    Route::put('level/:id', 'addon\ly_area\app\adminapi\controller\AreaLevel/edit');
    //删除区域代理等级
    Route::delete('level/:id', 'addon\ly_area\app\adminapi\controller\AreaLevel/del');
    //区域代理等级权重
    Route::get('level_num', 'addon\ly_area\app\adminapi\controller\AreaLevel/getLevelNumList');
    //修改区域代理等级状态
    Route::put('level_status', 'addon\ly_area\app\adminapi\controller\AreaLevel/modifyLevelStatus');


    /*****************************************************area config **************************************************** */
    Route::get('config', 'addon\ly_area\app\adminapi\controller\AreaConfig@getAreaConfig');
    //设置
    Route::put('config', 'addon\ly_area\app\adminapi\controller\AreaConfig@setAreaConfig');



     /*****************************************************area goods **************************************************** */
     //区域分红商品列表
     Route::get('area_goods', 'addon\ly_area\app\adminapi\controller\AreaGoods@lists');
     //区域分红商品详情
     Route::get('area_goods/:id', 'addon\ly_area\app\adminapi\controller\AreaGoods@info');
     //编辑区域分红商品
     Route::put('area_goods/:id', 'addon\ly_area\app\adminapi\controller\AreaGoods@setGoodsConfig');
     //设置商品是否参与区域分红
     Route::put('area_goods/is_area', 'addon\ly_area\app\adminapi\controller\AreaGoods@modifyIsArea');
     //区域分红商品比率
     Route::get('area_goods_config/:id', 'addon\ly_area\app\adminapi\controller\AreaGoods@goodsCommission');


     /*****************************************************area reward **************************************************** */
     //区域代理分红记录列表
    Route::get('area_reward', 'addon\ly_area\app\adminapi\controller\AreaReward@lists');
    //区域代理分红记录详情
    Route::get('area_reward/:id', 'addon\ly_area\app\adminapi\controller\AreaReward@info');
    //添加区域代理分红记录
    Route::post('area_reward', 'addon\ly_area\app\adminapi\controller\AreaReward@add');
    //编辑区域代理分红记录
    Route::put('area_reward/:id', 'addon\ly_area\app\adminapi\controller\AreaReward@edit');
    //删除区域代理分红记录
    Route::delete('area_reward/:id', 'addon\ly_area\app\adminapi\controller\AreaReward@del');


    /*****************************************************area apply **************************************************** */
    //区域代理申请记录列表
    Route::get('area_apply', 'addon\ly_area\app\adminapi\controller\AreaApply@lists');
    //区域代理申请记录详情
    Route::get('area_apply/:id', 'addon\ly_area\app\adminapi\controller\AreaApply@info');
    //添加区域代理申请记录
    Route::post('area_apply', 'addon\ly_area\app\adminapi\controller\AreaApply@add');
    //编辑区域代理申请记录
    Route::put('area_apply/:id', 'addon\ly_area\app\adminapi\controller\AreaApply@edit');
    //删除区域代理申请记录
    Route::delete('area_apply/:id', 'addon\ly_area\app\adminapi\controller\AreaApply@del');

    //代理审核通过
    Route::put('area_apply_audit/agree/:apply_id', 'addon\ly_area\app\adminapi\controller\AreaApply@agree');
    //代理审核拒绝
    Route::put('area_apply_audit/refuse/:apply_id', 'addon\ly_area\app\adminapi\controller\AreaApply@refuse');
    //代理申请状态
    Route::get('area_apply_status', 'addon\ly_area\app\adminapi\controller\AreaApply@getStatus');


     /***************************************************** 代理统计相关 ****************************************************/
     Route::get('stat_area_agent_week', 'addon\ly_area\app\adminapi\controller\AreaStat@areaAgentWeekStat');
     //佣金统计
     Route::get('stat_commission', 'addon\ly_area\app\adminapi\controller\AreaStat@commissionStat');
     //代理统计
     Route::get('stat_area_agent_member', 'addon\ly_area\app\adminapi\controller\AreaStat@areaAgentStat');
     //分红统计
     Route::get('stat_account', 'addon\ly_area\app\adminapi\controller\AreaStat@accountStat');


})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
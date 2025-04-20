<?php

use think\facade\Route;

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;

/**
 * 链动2+1
 */
Route::group('ly_lian', function () {

    // 获取链动2+1配置信息

    /***************************************************** lian config ****************************************************/
    Route::get('config', 'addon\ly_lian\app\adminapi\controller\Config@getLianConfig');
    //设置
    Route::put('config', 'addon\ly_lian\app\adminapi\controller\Config@setLianConfig');


    /***************************************************** lian member ****************************************************/
    //链动2+1会员列表
    Route::get('member', 'addon\ly_lian\app\adminapi\controller\LianMember@lists');
    //链动2+1会员详情
    Route::get('member/:id', 'addon\ly_lian\app\adminapi\controller\LianMember@info');
    //添加链动2+1会员
    Route::post('member', 'addon\ly_lian\app\adminapi\controller\LianMember@add');
    //编辑链动2+1会员
    Route::put('member/:id', 'addon\ly_lian\app\adminapi\controller\LianMember@edit');
    //删除链动2+1会员
    Route::delete('member/:id', 'addon\ly_lian\app\adminapi\controller\LianMember@del');


    /***************************************************** lian level ****************************************************/
    //链动2+1等级列表
    Route::get('level', 'addon\ly_lian\app\adminapi\controller\Level@lists');
    //链动2+1等级详情
    Route::get('level/:id', 'addon\ly_lian\app\adminapi\controller\Level@info');
    //添加链动2+1等级
    Route::post('level', 'addon\ly_lian\app\adminapi\controller\Level@add');
    //编辑链动2+1等级
    Route::put('level/:id', 'addon\ly_lian\app\adminapi\controller\Level@edit');
    //删除链动2+1等级
    Route::delete('level/:id', 'addon\ly_lian\app\adminapi\controller\Level@del');
    //链动等级权重
    Route::get('level_num', 'addon\ly_lian\app\adminapi\controller\Level@getLevelNumList');
    //链动等级卡片
    Route::get('level_card', 'addon\ly_lian\app\adminapi\controller\Level@getLevelCard');
    //链动等级选择列表
    Route::get('lian_level_select', 'addon\ly_shareholder\app\adminapi\controller\Level@getListOfSelect');


    /***************************************************** lian goods ****************************************************/
    //链动2+1商品列表
    Route::get('lian_goods', 'addon\ly_lian\app\adminapi\controller\Goods@lists');
    //链动2+1商品详情
    Route::get('lian_goods/:id', 'addon\ly_lian\app\adminapi\controller\Goods@info');
    //编辑链动2+1商品
    Route::put('lian_goods/:id', 'addon\ly_lian\app\adminapi\controller\Goods@setGoodsConfig');
    //设置商品是否参与2+1
    Route::put('lian_goods/is_lian', 'addon\ly_lian\app\adminapi\controller\Goods@modifyIsLian');
    //2+1商品比率
    Route::get('lian_goods_config/:id', 'addon\ly_lian\app\adminapi\controller\Goods@goodsCommission');

    
    /***************************************************** lian reward ****************************************************/
    //链动2+1奖励列表
    Route::get('lian_reward', 'addon\ly_lian\app\adminapi\controller\LianReward@lists');
    //链动2+1奖励详情
    Route::get('lian_reward/:id', 'addon\ly_lian\app\adminapi\controller\\LianReward@info');
    //添加链动2+1奖励
    Route::post('lian_reward', 'addon\ly_lian\app\adminapi\controller\LianReward@add');
    //编辑链动2+1奖励
    Route::put('lian_reward/:id', 'addon\ly_lian\app\adminapi\controller\LianReward@edit');
    //删除链动2+1奖励
    Route::delete('lian_reward/:id', 'addon\ly_lian\app\adminapi\controller\LianReward@del');


    /***************************************************** lian change ****************************************************/
    //链动2+1关系变动列表
    Route::get('lian_change', 'addon\ly_lian\app\adminapi\controller\LianChange@lists');
    //链动2+1关系变动详情
    Route::get('lian_change/:id', 'addon\ly_lian\app\adminapi\controller\LianChange@info');
    //添加链动2+1关系变动
    Route::post('lian_change', 'addon\ly_lian\app\adminapi\controller\LianChange@add');
    //编辑链动2+1关系变动
    Route::put('lian_change/:id', 'addon\ly_lian\app\adminapi\controller\LianChange@edit');
    //删除链动2+1关系变动
    Route::delete('lian_change/:id', 'addon\ly_lian\app\adminapi\controller\LianChange@del');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);
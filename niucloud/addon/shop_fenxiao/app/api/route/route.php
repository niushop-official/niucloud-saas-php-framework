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

use app\api\middleware\ApiChannel;
use app\api\middleware\ApiCheckToken;
use app\api\middleware\ApiLog;
use think\facade\Route;


/**
 * 分销
 */
Route::group('shop_fenxiao', function () {

    // 获取分销设置
    Route::get('config', 'addon\shop_fenxiao\app\api\controller\fenxiao\Config@getFenxiaoConfig');
    //分销商等级
    Route::get('level', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoLevel@lists');
    //分销商等级详情
    Route::get('level/:id', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoLevel@info');
    //代理商等级列表
    Route::get('agent_level', 'addon\shop_fenxiao\app\api\controller\agent\Level@getList');

    // 获取商品列表
    Route::get('goods/pages_of_share', 'addon\shop_fenxiao\app\api\controller\fenxiao\Goods@getPageOfShare');

    // 获取商品列表供组件调用
    Route::get('goods/components', 'addon\shop_fenxiao\app\api\controller\fenxiao\Goods@components');
})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, false) //false表示不验证登录
    ->middleware(ApiLog::class);


Route::group('shop_fenxiao', function () {

    //检测分销申请
    Route::get('apply/check', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoApply@checkFenxiaoApply');

    //获取分销申请条件
    Route::get('apply/get_check', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoApply@getCheckFenxiaoApply');
    //分销商申请信息
    Route::get('apply/info', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoApply@info');
    //分销商申请
    Route::post('apply', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoApply@apply');
    //分销信息
    Route::get('fenxiao/info', 'addon\shop_fenxiao\app\api\controller\fenxiao\Fenxiao@info');
    //分销详情
    Route::get('fenxiao/detail', 'addon\shop_fenxiao\app\api\controller\fenxiao\Fenxiao@detail');
    //分销账户信息
    Route::get('fenxiao/account', 'addon\shop_fenxiao\app\api\controller\fenxiao\Fenxiao@account');
    //我的团队
    Route::get('fenxiao/team', 'addon\shop_fenxiao\app\api\controller\fenxiao\Fenxiao@getTeam');
    //我的下级分销商1
    Route::get('fenxiao/child_fenxiao', 'addon\shop_fenxiao\app\api\controller\fenxiao\Fenxiao@getChildFenxiao');
    /********************************************************** 分销会员信息 *************************************************/
    Route::get('fenxiao_member', 'addon\shop_fenxiao\app\api\controller\fenxiao\FenxiaoMember@info');


    /********************************************************** 订单 *************************************************/
    //分销订单
    Route::get('order/fenxiao', 'addon\shop_fenxiao\app\api\controller\fenxiao\Order@lists');
    //分销佣金统计
    Route::get('order/fenxiao/stat', 'addon\shop_fenxiao\app\api\controller\fenxiao\Order@stat');
    //代理商订单
    Route::get('order/agent', 'addon\shop_fenxiao\app\api\controller\agent\Order@lists');
    //代理佣金统计
    Route::get('order/agent/stat', 'addon\shop_fenxiao\app\api\controller\agent\Order@stat');
    //代理商配置
    Route::get('order/agent/config', 'addon\shop_fenxiao\app\api\controller\agent\Config@getConfig');
    //团队分红订单
    Route::get('order/team', 'addon\shop_fenxiao\app\api\controller\team\Order@lists');
    //团队分红佣金统计
    Route::get('order/team/stat', 'addon\shop_fenxiao\app\api\controller\team\Order@stat');
    //团队分红配置
    Route::get('order/team/config', 'addon\shop_fenxiao\app\api\controller\team\Config@getConfig');
    /********************************************************** 任务奖励 *************************************************/
    //任务列表
    Route::get('task/lists', 'addon\shop_fenxiao\app\api\controller\task\Task@lists');
    //任务详情
    Route::get('task/detail/:task_id', 'addon\shop_fenxiao\app\api\controller\task\Task@info');
    //任务奖励记录
    Route::get('task_reward_list/:task_id', 'addon\shop_fenxiao\app\api\controller\task\Task@getRewardList');
    //任务配置
    Route::get('task/config', 'addon\shop_fenxiao\app\api\controller\task\Config@getConfig');
    /********************************************************** 销售奖励 *************************************************/
    //销售周期列表
    Route::get('sale', 'addon\shop_fenxiao\app\api\controller\sale\Sale@lists');
    //销售奖励列表
    Route::get('sale_member', 'addon\shop_fenxiao\app\api\controller\sale\SaleMember@lists');
    //销售奖励详情
    Route::get('sale_member/:period_id', 'addon\shop_fenxiao\app\api\controller\sale\SaleMember@detail');
    //销售奖励佣金数据
    Route::get('sale_member_commission', 'addon\shop_fenxiao\app\api\controller\sale\SaleMember@getCommissionData');
    //销售奖励佣金数据
    Route::get('sale_ranking/:period_id', 'addon\shop_fenxiao\app\api\controller\sale\SaleMember@getRanking');

    //最新的销售周期
    Route::get('sale_ranking_now', 'addon\shop_fenxiao\app\api\controller\sale\Sale@getNowSalePeriod');
    //销售奖励配置
    Route::get('sale/config', 'addon\shop_fenxiao\app\api\controller\sale\Config@getConfig');

})->middleware(ApiChannel::class)
    ->middleware(ApiCheckToken::class, true) //表示验证登录
    ->middleware(ApiLog::class);


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

use app\adminapi\middleware\AdminCheckRole;
use app\adminapi\middleware\AdminCheckToken;
use app\adminapi\middleware\AdminLog;
use think\facade\Route;

/**
 * 分销
 */
Route::group('shop_fenxiao', function () {

    //分销等级列表
    Route::get('fenxiao_level', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@lists');
    //分销等级详情
    Route::get('fenxiao_level/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@info');
    //添加分销等级
    Route::post('fenxiao_level', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@add');
    //编辑分销等级
    Route::put('fenxiao_level/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@edit');
    //删除分销等级
    Route::delete('fenxiao_level/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@del');
    //分销等级权重
    Route::get('fenxiao_level_num', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@getLevelNumList');
    //分销等级卡片
    Route::get('fenxiao_level_card', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@getFenxiaoCard');
    //分销等级选择列表
    Route::get('fenxiao_level_select', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoLevel@getListOfSelect');

    /***************************************************** 分销商 ****************************************************/
    //分销商列表
    Route::get('fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@lists');
    //分销商详情
    Route::get('fenxiao/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@info');
    //编辑分销商
    Route::put('fenxiao/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@edit');
    //添加分销商
    Route::post('fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@add');
    //冻结分销商
    Route::put('fenxiao_invalid/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@invalid');

    //获取分销设置
    Route::get('config/fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Config@getFenxiaoConfig');
    //分销设置
    Route::put('config/fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Config@setFenxiaoConfig');

    //获取分销海报设置
    Route::get('config/fenxiao_poster', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Config@getFenxiaoPosterConfig');
    //分销海报设置
    Route::put('config/fenxiao_poster', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Config@setFenxiaoPosterConfig');
    //分销商品列表
    Route::get('fenxiao_goods', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoGoods@pages');
    //分销商品详情
    Route::get('fenxiao_goods/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoGoods@info');
    //编辑分销等级
    Route::put('fenxiao_goods/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoGoods@setGoodsConfig');
    //设置商品是否分销
    Route::put('fenxiao_goods/is_fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoGoods@modifyIsFenxiao');
    //分销商品比率
    Route::get('fenxiao_goods_config/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoGoods@goodsCommission');
    //分销会员关系
    Route::get('fenxiao_member', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoMember@lists');

    //会员列表用于选择
    Route::get('member_of_select', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoMember@getMemberListOfSelect');
    //换绑会员所属分销商
    Route::put('fenxiao_member/modify_fenxiao', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoMember@modifyBindFenxiao');

    //分销商团队信息
    Route::get('fenxiao/team/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@team');
    //分销商账户流水信息
    Route::get('fenxiao/account/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@account');
    //分销商订单信息
    Route::get('fenxiao/order/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@order');

    //分销商账户流水信息
    /***************************************************** 分销申请 ****************************************************/

    //分销商列表
    Route::get('fenxiao_apply', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoApply@lists');
    //分销详情
    Route::get('fenxiao_apply/:apply_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoApply@info');


    //分销商审核通过
    Route::put('fenxiao_apply_audit/agree/:apply_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoApply@agree');
    //分销商审核拒绝
    Route::put('fenxiao_apply_audit/refuse/:apply_id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoApply@refuse');
    //分销商申请状态
    Route::get('fenxiao_apply_status', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\FenxiaoApply@getStatus');
    /***************************************************** 分销订单 ****************************************************/
    //分销订单分页列表
    Route::get('order', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Order@pages');
    //分销订单详情
    Route::get('order/:id', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Order@info');


    //代理订单分页列表
    Route::get('agent_order', 'addon\shop_fenxiao\app\adminapi\controller\agent\Order@pages');
    //团队订单分页列表
    Route::get('team_order', 'addon\shop_fenxiao\app\adminapi\controller\team\Order@pages');
    /***************************************************** 代理商 ****************************************************/
    //代理商列表
    Route::get('agent', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@pages');
    //代理商详情
    Route::get('agent/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@info');
    //添加代理商
    Route::post('agent', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@add');
    //设置代理商
    Route::put('agent/:member_id', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@edit');
    //修改代理商状态
    Route::put('agent_status/:member_id/:status', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@modifyStatus');
    //获取代理商状态静态数据
    Route::get('agent_status', 'addon\shop_fenxiao\app\adminapi\controller\agent\Agent@getStatus');

    //获取代理商配置
    Route::put('agent_config', 'addon\shop_fenxiao\app\adminapi\controller\agent\Config@setConfig');
    //获取代理商配置
    Route::get('agent_config', 'addon\shop_fenxiao\app\adminapi\controller\agent\Config@getConfig');
    /***************************************************** 代理商等级 ****************************************************/
    //代理商等级分页列表
    Route::get('agent_level', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@pages');
    //代理商等级列表
    Route::get('agent_level_list', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@getList');
    //代理商等级详情
    Route::get('agent_level/:level_id', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@info');
    //添加代理商等级
    Route::post('agent_level', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@add');
    //编辑代理商等级
    Route::put('agent_level/:level_id', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@edit');
    //删除代理商等级
    Route::delete('agent_level/:level_id', 'addon\shop_fenxiao\app\adminapi\controller\agent\Level@del');
    /***************************************************** 分销商列表(用于分销商弹框选择) ****************************************************/
    Route::get('fenxiao_of_select', 'addon\shop_fenxiao\app\adminapi\controller\fenxiao\Fenxiao@getListOfSelect');

    /***************************************************** 任务奖励 ****************************************************/
    //任务分页列表
    Route::get('task', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@pages');
    //任务详情
    Route::get('task/:id', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@info');
    //添加任务
    Route::post('task', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@add');
    //编辑任务
    Route::put('task/:id', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@edit');
    //删除任务
    Route::delete('task/:id', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@del');
    //任务失效
    Route::put('task_finish/:id', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@finish');
    //任务状态
    Route::get('task_status', 'addon\shop_fenxiao\app\adminapi\controller\task\Task@getStatus');
    //获取任务奖励配置
    Route::put('task_config', 'addon\shop_fenxiao\app\adminapi\controller\task\Config@setConfig');
    //获取任务奖励配置
    Route::get('task_config', 'addon\shop_fenxiao\app\adminapi\controller\task\Config@getConfig');
    /***************************************************** 任务奖励 ****************************************************/
    //任务分页列表
    Route::get('task_member', 'addon\shop_fenxiao\app\adminapi\controller\task\TaskMember@lists');
    //任务详情
    Route::get('task_member/:id', 'addon\shop_fenxiao\app\adminapi\controller\task\TaskMember@info');
    /***************************************************** 团队奖励 ****************************************************/
    //获取团队分红配置
    Route::put('team_config', 'addon\shop_fenxiao\app\adminapi\controller\team\Config@setConfig');
    //获取团队分红配置
    Route::get('team_config', 'addon\shop_fenxiao\app\adminapi\controller\team\Config@getConfig');
    /***************************************************** 销售奖励 ****************************************************/
    //获取销售奖励配置
    Route::put('sale_config', 'addon\shop_fenxiao\app\adminapi\controller\sale\Config@setConfig');
    //获取销售奖励配置
    Route::get('sale_config', 'addon\shop_fenxiao\app\adminapi\controller\sale\Config@getConfig');
    //获取结算周期类型
    Route::get('sale_period_type', 'addon\shop_fenxiao\app\adminapi\controller\sale\Config@getPeriodType');
    //获取发放方式
    Route::get('sale_send_type', 'addon\shop_fenxiao\app\adminapi\controller\sale\Config@getSendType');
    //销售周期列表
    Route::get('sale', 'addon\shop_fenxiao\app\adminapi\controller\sale\Sale@lists');
    //销售周期明细
    Route::get('sale/:id', 'addon\shop_fenxiao\app\adminapi\controller\sale\Sale@info');
    //发放奖励
    Route::post('sale_send/:period_id', 'addon\shop_fenxiao\app\adminapi\controller\sale\Sale@send');
    //销售奖励列表
    Route::get('sale_member', 'addon\shop_fenxiao\app\adminapi\controller\sale\SaleMember@lists');
    /***************************************************** 分销统计相关 ****************************************************/
    Route::get('stat_fenxiao_week', 'addon\shop_fenxiao\app\adminapi\controller\Stat@fenxiaoWeekStat');
    //佣金统计
    Route::get('stat_commission', 'addon\shop_fenxiao\app\adminapi\controller\Stat@commissionStat');
    //分销会员统计
    Route::get('stat_fenxiao_member', 'addon\shop_fenxiao\app\adminapi\controller\Stat@fenxiaoMemberStat');
    //账户统计
    Route::get('stat_account', 'addon\shop_fenxiao\app\adminapi\controller\Stat@accountStat');

})->middleware([
    AdminCheckToken::class,
    AdminCheckRole::class,
    AdminLog::class
]);

<?php

namespace addon\ly_area\app\api\controller;

use addon\ly_area\app\service\api\AreaAgentService;
use addon\ly_area\app\service\api\ShareholderService;
use core\base\BaseApiController;
use think\Response;

class AreaAgent extends BaseApiController
{

    /**
     * 代理详情
     * @return Response
     */
    public function info()
    {
        return success((new AreaAgentService())->getAgentInfo());
    }

    /**
     * 代理详情
     * @return Response
     */
    public function detail()
    {
        return success((new AreaAgentService())->getAccountDetail());
    }

    /**
     * 获取代理账户信息
     */
    public function account()
    {
        return success((new AreaAgentService())->getAccountDetail());
    }

    /**
     * 获取代理奖励记录
     */
    public function reward(){
        return success((new AreaAgentService())->getRewardLog());
    }

    //获取代理订单统计
    public function OrderStat(){
        return success((new AreaAgentService())->getAgentOrderStat());
    }


    //获取代理所在区域订单统计
    public function OrderStatByArea(){
        return success((new AreaAgentService())->getAgentAreaOrder());
    }

    public function accountDetail(){
        return success((new AreaAgentService())->getAccountDetail());
    }


    public function lowerAgentList(){
        $agent = $this->info();
        return success((new AreaAgentService())->getAgentList());
    }

    //区域内所有代理
    public function teamAgent(){
        return success((new AreaAgentService())->getTeamAgentList());
    }

}

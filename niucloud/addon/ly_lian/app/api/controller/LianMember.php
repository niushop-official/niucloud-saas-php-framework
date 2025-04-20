<?php

namespace addon\ly_lian\app\api\controller;

use addon\ly_lian\app\service\api\LianMemberService;
use core\base\BaseApiController;
use think\Response;

class LianMember extends BaseApiController
{

    /**
     * 链动会员详情
     * @return Response
     */
    public function info()
    {
        return success((new LianMemberService())->getInfo());
    }

    /**
     * 链动会员详情
     * @return Response
     */
    public function detail()
    {
        return success((new LianMemberService())->getDetail());
    }

    /**
     * 获取链动会员账户信息
     */
    public function account()
    {
        return success((new LianMemberService())->getAccount());
    }


    //获取会员奖励记录
    public function reward(){
        $data = [
            ['create_time', []], 
        ];
        return success((new LianMemberService())->getReward($data));
    }


    //获取会员直推下级
    public function recommendChild(){
        return success((new LianMemberService())->getRecommendChild());
    }

    //获取会员团队
    public function team(){
        return success((new LianMemberService())->getTeam());
    }

    //获取会员直推boss
    public function recommendBossChild(){
        return success((new LianMemberService())->getRecommendBossChild());
    }


    //获取会员前2直推
    public function firstRecommend(){
        return success((new LianMemberService())->getFirstRecommend());
    }


    //获取会员绩效任务期限
    public function taskLimitDays(){
        return success((new LianMemberService())->getTaskLimitDays());
    }

}

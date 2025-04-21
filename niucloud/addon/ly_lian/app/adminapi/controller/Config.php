<?php

namespace addon\ly_lian\app\adminapi\controller;

use addon\ly_lian\app\dict\lian\LianDict;
use addon\ly_lian\app\service\admin\ConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 链动配置
     * @return response
     */
    public function setLianConfig(){
        $data = $this->request->params([
            ["is_open",0], //开关状态，0=关闭，1=开启
            ["up_register", 0], //注册升级：0否，1是
            ["up_way", LianDict::ORDERPAY], //升级触发方式，0=支付后，1=完成后
            ["take_type", LianDict::BALANCE], //提成类型：0余额，1佣金，2积分，3数字积分
            ["settle_way", LianDict::ORDERPAY], //结算方式：0订单支付后，1订单完成后
            ["settle_cycle",0], //结算周期：按天
            ["count_type", LianDict::ORDERMONEY], //计算方式：0支付金额，1商品现价，2商品原价
            ["first_reward_frozen",0], //直推奖励冻结：0否，1是
            ['create_time', '0'],//创建时间
            ['update_time', '0'],//更新时间
        ]);

        (new ConfigService())->setLianConfig($data);
        return success('保存成功');
    }

    //获取结算方式
    public function getSettleType(){
        return success(LianDict::getSettleType());
    }

    //获取结算时间
    public function getSettleTime(){
        return success(LianDict::getSettleTime());
    }

    //获取提现方式
    public function getTakeType(){
        return success(LianDict::getTakeType());
    }

    //获取链动2+1设置
    public function getLianConfig(){
        return success((new ConfigService())->getLianConfig());
    }

    public function getMemberLevelAll(){
        return success(( new ConfigService())->getMemberLevelAll());
   }

   public function getLianLevelAll(){
        return success(( new ConfigService())->getLianLevelAll());
   }
}
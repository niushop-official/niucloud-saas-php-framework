<?php

namespace addon\transfer\app\adminapi\controller\config;
use core\base\BaseAdminController;
use addon\transfer\app\service\core\ConfigService;


class Config extends BaseAdminController
{ 
    /**
     * @Notes:获取配置
     * @Interface getConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/6/25   上午12:00
     */
    public function getConfig()
    {
        return success("操作成功",(new ConfigService())->getConfig());
    }

    /**
     * @Notes:保存配置
     * @Interface setConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/6/25   上午12:00
     */
    public function setConfig(){
        $data = $this->request->params([
            ["is_sms",0],
            ["is_password",0],
            ["is_transfer_coupon",1],
            ["is_transfer_point",1],
            ["is_transfer_balance",1],
            ["is_transfer_commission",1],
            ["transfer_point_fee",0],
            ["transfer_point_fee_type",1],
            ["transfer_point_fee_unit",1],

            ["transfer_commission_fee",0],

            ["transfer_balance_fee",0],
            ["is_point_balance",1],
            ["is_balance_point",1],
            ["point_balance_rate",1],
            ["commission_balance_rate",1],
            ["is_commission_balance",1],



        ]);
        (new ConfigService())->setConfig($data);
        return success('操作成功');
    }

}

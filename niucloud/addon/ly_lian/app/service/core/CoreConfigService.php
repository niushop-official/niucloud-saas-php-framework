<?php

namespace addon\ly_lian\app\service\core;

use core\base\BaseCoreService;
use app\service\core\sys\CoreConfigService as CoreSysConfigService;
use addon\ly_lian\app\dict\lian\LianDict;

class CoreConfigService extends BaseCoreService
{
    public $core_config_service;

    public function __construct(){
        // 初始化配置服务
        parent::__construct();
        $this->core_config_service = new CoreSysConfigService();
    }

    /**
     * 设置链动2+1配置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setLianConfig(int $site_id, array $data){
        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'up_register' => $data['up_register'] ?? '0',//是否开启注册升级，0否，1是
            'up_way' => $data['up_way'] ?? '0',//升级触发方式，0=支付后，1=完成后
            'take_type' => $data['take_type'] ?? '0',//提成类型：0余额，1佣金，2积分，3数字积分
            'settle_way' => $data['settle_way'] ?? '0',//结算方式：0订单支付后，1订单完成后
            'settle_cycle' => $data['settle_cycle'] ?? '0',//结算周期：按天
            'count_type' => $data['count_type'] ?? '0',//计算方式：0支付金额，1商品现价，2商品原价
            'first_reward_frozen' => $data['first_reward_frozen'] ?? '0',//直推奖励冻结：0否，1是
            'create_time' => time(),
            'update_time' => time(),
        ];
        $this->core_config_service->setConfig($site_id, 'LY_LIAN_CONFIG', $value);
        return true;
    }

    /**
     * 获取股东分红配置
     * @param int $site_id
     * @return array
     */
    public function getLianConfig(int $site_id){
        $data = $this->core_config_service->getConfigValue($site_id, 'LY_LIAN_CONFIG');

        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'up_register' => $data['up_register'] ?? '0',//是否开启注册升级，0否，1是
            'up_way' => $data['up_way'] ?? LianDict::ORDERPAY,//
            'take_type' => $data['take_type'] ?? LianDict::BALANCE,//
            'settle_way' => $data['settle_way'] ?? LianDict::ORDERPAY,//
            'settle_cycle' => $data['settle_cycle'] ?? '0',//
            'count_type' => $data['count_type'] ?? LianDict::ORDERMONEY,//
            'first_reward_frozen' => $data['first_reward_frozen'] ?? '0',//
            'create_time' => time(),
            'update_time' => time(),
        ];
        return $value;
    }
}
<?php

namespace addon\ly_shareholder\app\service\core;

use core\base\BaseCoreService;
use app\service\core\sys\CoreConfigService as CoreSysConfigService;
use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;

class CoreConfigService extends BaseCoreService
{
    public $core_config_service;

    public function __construct(){
        // 初始化配置服务
        parent::__construct();
        $this->core_config_service = new CoreSysConfigService();
    }

    /**
     * 设置股东分红配置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setShareholderConfig(int $site_id, array $data){
        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'is_max' => $data['is_max'] ?? '0',//封顶
            'is_commission' => $data['is_commission'] ?? '0',//是否开启分红条件
            'min_order' => $data['min_order'] ?? '',//最小订单数量
            'min_order_amount' => $data['min_order_amount'] ?? '',//最小消费金额
            // 'fenhong_ratio' => $data['fenhong_ratio'] ?? '',//等级分红比例
            'settle_type' => $data['settle_type'] ?? '0',//结算方式
            'take_type' => $data['take_type'] ?? '0',//提成方式
            'settle_time' => $data['settle_time'] ?? '0',//结算周期
            'settle_condision' => $data['settle_condision'] ?? '1',//结算条件(0:订单支付后，1：订单完成)
            'create_time' => time(),
            'update_time' => time(),
        ];
        $this->core_config_service->setConfig($site_id, 'LY_SHAREHOLDER_CONFIG', $value);
        return true;
    }

    /**
     * 获取股东分红配置
     * @param int $site_id
     * @return array
     */
    public function getShareholderConfig(int $site_id){
        $data = $this->core_config_service->getConfigValue($site_id, 'LY_SHAREHOLDER_CONFIG');

        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'is_max' => $data['is_max'] ?? '0',//封顶
            'is_commission' => $data['is_commission'] ?? '0',//是否开启分红条件
            'min_order' => $data['min_order'] ?? '',//最小订单数量
            'min_order_amount' => $data['min_order_amount'] ?? '',//最小消费金额
            'fenhong_ratio' => $data['fenhong_ratio'] ?? '',//分销等级分红比例
            'settle_type' => $data['settle_type'] ?? ShareholderDict::TURNOVER,//结算方式
            'take_type' => $data['take_type'] ?? ShareholderDict::BALANCE,//提成方式
            'settle_time' => $data['settle_time'] ?? ShareholderDict::DAY,//结算周期
            'settle_condision' => $data['settle_condision'] ?? ShareholderDict::ORDERFINISH,//结算条件(0:订单支付后，1：订单完成)
            'create_time' => time(),
            'update_time' => time(),
        ];
        return $value;
    }
}
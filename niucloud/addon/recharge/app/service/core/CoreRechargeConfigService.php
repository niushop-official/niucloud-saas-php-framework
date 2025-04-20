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

namespace addon\recharge\app\service\core;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 充值套餐配置
 * Class CoreRechargeConfigService
 * @package app\service\core\order
 */
class CoreRechargeConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置充值套餐配置
     * @param array $params
     * @return bool
     */
    public function setRechargeConfig($params)
    {
        $value = [
            "is_use" => $params['is_use'], //  是否开启 0：关闭 1：开启
            "recharge_explain" => $params['recharge_explain'], // 充值说明
            "min_price" => $params['min_price'], // 最小充值金额
            "close_length" => $params['close_length'], // 未支付取消订单时间 分钟
        ];

        $this->core_config_service->setConfig($params[ 'site_id' ], 'RECHARGE_CONFIG', $value);
        return true;
    }

    /**
     * 获取充值套餐配置
     * @param int $site_id
     * @return array
     */
    public function getRechargeConfig(int $site_id)
    {
        $res = ( new CoreConfigService() )->getConfig($site_id, 'RECHARGE_CONFIG');
        $data = [
            'is_use' => $res[ 'value' ][ 'is_use' ] ?? 1,
            'recharge_explain' => $res[ 'value' ][ 'recharge_explain' ] ?? '充值后帐户的金额不能提现，可用于商城消费使用账户充值出现问题可联系商城客服',
            'min_price' => $res[ 'value' ][ 'min_price' ] ?? 0.01,
            'close_length' => $res[ 'value' ][ 'close_length' ] ?? 10,
        ];
        return $data;
    }
}


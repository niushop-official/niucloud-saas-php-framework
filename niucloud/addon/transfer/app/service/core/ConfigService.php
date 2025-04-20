<?php

namespace addon\transfer\app\service\core;

use core\base\BaseAdminService;
use app\service\core\sys\CoreConfigService;
use addon\transfer\app\dict\config\ConfigDict;

/**
 * 配置信息服务层
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 获取配置信息
     */
    public function getConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getConfigType());
        $info['value']['is_sms'] =  $info['value']['is_sms']??0;
        $info['value']['is_password'] =  $info['value']['is_password']??0;
        $info['value']['is_transfer_coupon'] =  $info['value']['is_transfer_coupon']??1;
        $info['value']['is_transfer_point'] =  $info['value']['is_transfer_point']??1;
        $info['value']['is_transfer_balance'] =  $info['value']['is_transfer_balance']??1;
        $info['value']['is_transfer_commission'] =  $info['value']['is_transfer_commission']??1;
        $info['value']['transfer_point_fee'] =  $info['value']['transfer_point_fee']??'';
        $info['value']['transfer_point_fee_type'] =  $info['value']['transfer_point_fee_type']??1;
        $info['value']['transfer_point_fee_unit'] =  $info['value']['transfer_point_fee_unit']??1;
        $info['value']['transfer_commission_fee'] =  $info['value']['transfer_commission_fee']??'';
        $info['value']['transfer_balance_fee'] =  $info['value']['transfer_balance_fee']??'';

        $info['value']['is_point_balance'] =  $info['value']['is_point_balance']??1;
        $info['value']['is_balance_point'] =  $info['value']['is_balance_point']??1;
        $info['value']['point_balance_rate'] =  $info['value']['point_balance_rate']??1;

        $info['value']['is_commission_balance'] =  $info['value']['is_commission_balance']??1;
        $info['value']['commission_balance_rate'] =  $info['value']['commission_balance_rate']??1;


        return $info['value'];
    }

    /**
     * 设置配置信息
     * @param $site_id
     * @param string $config_key
     * @return string|null
     */
    public function setConfig($value)
    {

        (new CoreConfigService())->setConfig($this->site_id, ConfigDict::getConfigType(), $value);

        return true;
    }

}
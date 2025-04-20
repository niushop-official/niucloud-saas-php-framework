<?php

namespace addon\ly_area\app\service\core;

use addon\ly_area\app\dict\area\AreaDict;
use core\base\BaseCoreService;
use app\service\core\sys\CoreConfigService as CoreSysConfigService;

class CoreAreaConfigService extends BaseCoreService
{
    public $core_config_service;

    public function __construct(){
        // 初始化配置服务
        parent::__construct();
        $this->core_config_service = new CoreSysConfigService();
    }

    /**
     * 设置区域分红配置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setAreaConfig(int $site_id, array $data){
        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'is_street' => $data['is_street'] ?? '0',
            'is_become' => $data['is_become'] ?? '0',
            'can_apply_again' => $data['can_apply_again'] ?? '0',
            'become_many' => $data['become_many'] ?? '0',
            'count_type' => $data['count_type'] ?? AreaDict::ORDERMONEY,
            'count_way' => $data['count_way'] ?? AreaDict::ORDERPAY,
            'take_type' => $data['take_type'] ?? AreaDict::BALANCE,
            'is_avg' => $data['is_avg'] ?? '0',
            'is_level' => $data['is_level'] ?? '0',
            'province_rate' => $data['rewards_province_rate'] ?? '0.00',
            'city_rate' => $data['city_rate'] ?? 0.00,
            'district_rate' => $data['district_rate'] ?? 0.00,
            'street_rate' => $data['street_rate'] ?? 0.00,
            'settle_cycle' => $data['settl_cycle'] ?? '0',
            'settle_type' => $data['settle_type'] ?? '0',
            'is_agreement' => $data['is_agreement'] ?? '0',
            'agreement_content' => $data['agreement_content'] ?? '',
            'background_image' => $data['background_image'] ?? '',
            'apply_backimg' => $data['apply_backimg'] ?? '',
            'create_time' => time(),
            'update_time' => time(),
        ];
        $this->core_config_service->setConfig($site_id, 'LY_AREA_CONFIG', $value);
        return true;
    }

    /**
     * 获取股东分红配置
     * @param int $site_id
     * @return array
     */
    public function getAreaConfig(int $site_id){
        $data = $this->core_config_service->getConfigValue($site_id, 'LY_AREA_CONFIG');

        $value = [
            'site_id' => $data['site_id'] ?? $site_id,
            'is_open' => $data['is_open'] ?? '1',
            'is_street' => $data['is_street'] ?? '0',
            'is_become' => $data['is_become'] ?? '0',
            'can_apply_again' => $data['can_apply_again'] ?? '0',
            'become_many' => $data['become_many'] ?? '0',
            'count_type' => $data['count_type'] ?? AreaDict::ORDERMONEY,
            'take_type' => $data['take_type'] ?? AreaDict::BALANCE,
            'count_way' => $data['count_way'] ?? AreaDict::ORDERPAY,
            'is_avg' => $data['is_avg'] ?? '0',
            'is_level' => $data['is_level'] ?? '0',
            'province_rate' => $data['rewards_province_rate'] ?? '0.00',
            'city_rate' => $data['city_rate'] ?? 0.00,
            'district_rate' => $data['district_rate'] ?? 0.00,
            'street_rate' => $data['street_rate'] ?? 0.00,
            'settle_cycle' => $data['settl_cycle'] ?? '0',
            'settle_type' => $data['settle_type'] ?? '0',
            'is_agreement' => $data['is_agreement'] ?? '0',
            'agreement_content' => $data['agreement_content'] ?? '',
            'background_image' => $data['background_image'] ?? '',
            'apply_backimg' => $data['apply_backimg'] ?? '',
            'create_time' => time(),
            'update_time' => time(),
        ];
        return $value;
    }
}
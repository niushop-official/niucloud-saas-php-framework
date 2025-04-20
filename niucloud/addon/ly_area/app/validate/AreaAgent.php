<?php

namespace addon\ly_area\app\validate;

use core\base\BaseValidate;
/**
 * 区域代理验证器
 * Class Agent
 * @package addon\app\validate\area
 */
class AreaAgent extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'province_name', 'city_name', 'district_name', 'street_name', 'status', 'agent_level', 'rate'],
            "edit" => ['member_id', 'province_name', 'city_name', 'district_name', 'street_name', 'status', 'agent_level', 'rate']
        ];


}
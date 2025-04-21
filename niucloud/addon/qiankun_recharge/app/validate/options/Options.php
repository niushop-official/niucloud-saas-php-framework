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

namespace addon\qiankun_recharge\app\validate\options;
use core\base\BaseValidate;
/**
 * 充值项列验证器
 * Class Options
 * @package addon\qiankun_recharge\app\validate\options
 */
class Options extends BaseValidate
{

       protected $rule = [
            'recharge' => 'between:0,100000',
            'give_price' => 'between:0,100000',
            'give_integral' => 'between:0,100000'
        ];

       protected $message = [
            'recharge.between' => ['common_validate.between', ['recharge','0','100000']],
            'give_price.between' => ['common_validate.between', ['give_price','0','100000']],
            'give_integral.between' => ['common_validate.between', ['give_integral','0','100000']]
        ];

       protected $scene = [
            "add" => ['title', 'recharge', 'give_price', 'give_integral', 'give_coupon', 'give_level', 'status', 'sort'],
            "edit" => ['title', 'recharge', 'give_price', 'give_integral', 'give_coupon', 'give_level', 'status', 'sort']
        ];

}

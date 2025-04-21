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

namespace addon\qiankun_recovery\app\validate\order;
use core\base\BaseValidate;
/**
 * 推N返本订单验证器
 * Class Order
 * @package addon\qiankun_recovery\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['order_no', 'member_id', 'goods_id', 'sku_id', 'goods_price', 'rules', 'after', 'type', 'is_full', 'current'],
            "edit" => ['order_no', 'member_id', 'goods_id', 'sku_id', 'goods_price', 'rules', 'after', 'type', 'is_full', 'current']
        ];

}

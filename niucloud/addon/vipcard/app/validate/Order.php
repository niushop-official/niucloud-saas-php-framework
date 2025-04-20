<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\validate;

use think\validate\ValidateRule;

/**
 * 订单验证器
 */
class Order extends \think\Validate
{

    protected $rule = [
        'goods' => 'checkGoods',
    ];

    protected $message = [

    ];

    protected $scene = [
        "create" => ['goods'],
        "confirm" => ['goods'],
        "calculate" => ['goods']
    ];

    protected function checkGoods($value, $rule, $data = []) {
        if (!count($value)) return get_lang('validate_vipcard_order.goods_require');
        foreach ($value as $item) {
            if (!isset($item['goods_id']) || empty($item['goods_id'])) return get_lang('validate_vipcard_order.goods_error');
            if (!isset($item['num']) || empty($item['num'])) return get_lang('validate_vipcard_order.goods_error');
            ValidateRule::isNumber($item['num'], get_lang('validate_vipcard_order.goods_error'));
            if ($item['num'] < 1) return get_lang('validate_vipcard_order.goods_error');
        }
        return true;
    }
}
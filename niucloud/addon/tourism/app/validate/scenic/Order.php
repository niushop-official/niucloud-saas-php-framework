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

namespace addon\tourism\app\validate\scenic;

/**
 * 酒店订单验证器
 * Class TourismHotel
 * @package app\validate\tourism_hotel
 */
class Order extends \think\Validate
{
    protected $rule = [
        'ticket_id' => 'require|number',
        'reserve_time' => 'require|date|checkReserveTime',
        'num' => 'number|min:1',
        'buyer_info' => 'checkBuyerInfo',
        'mobile' => 'require|mobile'
    ];

    protected $message = [
        'ticket_id.require' => 'validate_tourism_scenic_order.ticket_id_require',
        'ticket_id.number' => 'validate_tourism_scenic_order.ticket_id_number',
        'reserve_time.require' => 'validate_tourism_scenic_order.reserve_time_require',
        'reserve_time.date' => 'validate_tourism_scenic_order.reserve_time_date',
        'num.require' => 'validate_tourism_scenic_order.num_require',
        'num.min' => 'validate_tourism_scenic_order.num_min'
    ];

    protected $scene = [
        "confirm" => ['ticket_id','reserve_time','num'],
        "calculate" => ['ticket_id','reserve_time','num'],
        "create" => ['ticket_id','reserve_time','num', 'buyer_info', 'mobile'],
    ];

    protected function checkBuyerInfo($value, $rule, $data = []) {
        if (!count($value)) return get_lang('validate_tourism_scenic_order.buyer_info_require');
        for ($i = 0; $i < $data['num']; $i++) {
            $item = $value[$i] ?? [];
            if (!isset($item['name']) || empty($item['name'])) return get_lang('validate_tourism_scenic_order.tourist'). ($data['num'] > 1 ? $i + 1 : '') .get_lang('validate_tourism_scenic_order.buyer_info_name_require');
            if (!isset($item['id_card']) || empty($item['id_card'])) return get_lang('validate_tourism_scenic_order.tourist'). ($data['num'] > 1 ? $i + 1 : '') . get_lang('validate_tourism_scenic_order.buyer_info_id_card_require');
        }
        return true;
    }

    public function checkReserveTime($value, $rule, $data = []) {
        if (strtotime($value) < strtotime(date('Y-m-d', time()))) {
            return get_lang('validate_tourism_scenic_order.reserve_time_not_lt_today');
        }
        return true;
    }
}
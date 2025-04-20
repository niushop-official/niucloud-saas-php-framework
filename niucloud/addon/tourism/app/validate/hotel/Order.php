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

namespace addon\tourism\app\validate\hotel;

/**
 * 酒店订单验证器
 * Class TourismHotel
 * @package app\validate\tourism_hotel
 */
class Order extends \think\Validate
{
    protected $rule = [
        'room_id' => 'require|number',
        'start_time' => 'require|date|checkStartTime',
        'end_time' => 'require|date|checkStartTime',
        'num' => 'number|min:1',
        'buyer_info' => 'checkBuyerInfo',
        'mobile' => 'require|mobile'
    ];

    protected $message = [
        'room_id.require' => 'validate_tourism_hotel_order.room_id_require',
        'room_id.number' => 'validate_tourism_hotel_order.room_id_number',
        'start_time.require' => 'validate_tourism_hotel_order.start_time_require',
        'end_time.require' => 'validate_tourism_hotel_order.end_time_require',
        'num.require' => 'validate_tourism_hotel_order.num_require',
        'num.min' => 'validate_tourism_hotel_order.num_min'
    ];

    protected $scene = [
        "confirm" => ['room_id','start_time','end_time','num'],
        "calculate" => ['room_id','start_time','end_time','num'],
        "create" => ['room_id','start_time','end_time','num', 'buyer_info', 'mobile'],
    ];

    protected function checkBuyerInfo($value, $rule, $data = []) {
        if (!count($value)) return get_lang('validate_tourism_hotel_order.buyer_info_require');
        for ($i = 0; $i < $data['num']; $i++) {
            $item = $value[$i] ?? [];
            if (!isset($item['name']) || empty($item['name'])) return get_lang('validate_tourism_hotel_order.room') . ($i + 1) . get_lang('validate_tourism_hotel_order.buyer_info_name_require');
        }
        return true;
    }

    public function checkStartTime($value, $rule, $data = []) {
        if (strtotime($value) < strtotime(date('Y-m-d', time()))) {
            return get_lang('validate_tourism_hotel_order.start_time_not_lt_today');
        }
        return true;
    }

    public function checkEndTime($value, $rule, $data = []) {
        if (!strtotime($data['end_time']) > strtotime($value)) {
            return get_lang('validate_tourism_hotel_order.end_time_need_gt_start_time');
        }
        return true;
    }
}
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

namespace addon\tourism\app\validate\way;

/**
 * 酒店订单验证器
 * Class TourismHotel
 * @package app\validate\tourism_hotel
 */
class Order extends \think\Validate
{
    protected $rule = [
        'way_id' => 'require|number',
        'reserve_time' => 'require|date|checkReserveTime',
        'num' => 'number|min:1',
        'buyer_info' => 'checkBuyerInfo',
        'mobile' => 'require|mobile'
    ];

    protected $message = [
        'way_id.require' => 'validate_tourism_way_order.way_id_require',
        'way_id.number' => 'validate_tourism_way_order.way_id_number',
        'reserve_time.require' => 'validate_tourism_way_order.reserve_time_require',
        'reserve_time.date' => 'validate_tourism_way_order.reserve_time_date',
        'num.require' => 'validate_tourism_way_order.num_require',
        'num.min' => 'validate_tourism_way_order.num_min'
    ];

    protected $scene = [
        "confirm" => ['way_id','reserve_time','num'],
        "calculate" => ['way_id','reserve_time','num'],
        "create" => ['way_id','reserve_time','num', 'buyer_info', 'mobile'],
    ];

    protected function checkBuyerInfo($value, $rule, $data = []) {
        if (!count($value)) return get_lang('validate_tourism_way_order.buyer_info_require');
        if (!isset($value['name']) || empty($value['name'])) return get_lang('validate_tourism_way_order.tourist') .get_lang('validate_tourism_way_order.buyer_info_name_require');
        if (!isset($value['id_card']) || empty($value['id_card'])) return get_lang('validate_tourism_way_order.tourist'). get_lang('validate_tourism_way_order.buyer_info_id_card_require');
        return true;
    }

    public function checkReserveTime($value, $rule, $data = []) {
        if (strtotime($value) < strtotime(date('Y-m-d', time()))) {
            return get_lang('validate_tourism_way_order.reserve_time_not_lt_today');
        }
        return true;
    }
}
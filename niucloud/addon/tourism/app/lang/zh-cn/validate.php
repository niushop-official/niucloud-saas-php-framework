<?php

return [
    'validate_tourism_hotel_order' => [
        'room_id_require' => '缺少参数room_id',
        'room_id_number' => 'room_id格式错误',
        'start_time_require' => '开始时间必填',
        'start_time_date' => '开始时间格式错误',
        'end_time_require' => '结束时间必填',
        'end_time_date' => '结束时间格式错误',
        'num_number' => '房间数必须是正整数',
        'num_min' => '房间数不能小于1',
        'buyer_info_require' => '住客信息必须填写',
        'room' => '房间',
        'buyer_info_name_require' => '住客姓名没有填写',
        'start_time_not_lt_today' => '不能预订今天之前的时间',
        'end_time_need_gt_start_time' => '预订结束时间需要大于开始时间'
    ],
    'validate_tourism_scenic_order' => [
        'ticket_id_require' => '缺少参数ticket_id',
        'ticket_id_number' => 'ticket_id格式错误',
        'reserve_time_require' => '订票日期必填',
        'reserve_time_date' => '订票日期格式错误',
        'num_number' => '购票数必须是正整数',
        'num_min' => '购票数不能小于1',
        'tourist' => '游客',
        'buyer_info_require' => '游客信息必须填写',
        'buyer_info_name_require' => '姓名必须填写',
        'buyer_info_id_card_require' => '身份证号必须填写',
        'reserve_time_not_lt_today' => '不能预订今天之前的时间',
    ],
    'validate_tourism_way_order' => [
        'way_id_require' => '缺少参数way_id',
        'way_id_number' => 'way_id格式错误',
        'reserve_time_require' => '预订日期必填',
        'reserve_time_date' => '预订日期格式错误',
        'num_number' => '购买数必须是正整数',
        'num_min' => '购买数不能小于1',
        'tourist' => '游客',
        'buyer_info_require' => '游客信息必须填写',
        'buyer_info_name_require' => '姓名必须填写',
        'buyer_info_id_card_require' => '身份证号必须填写',
        'reserve_time_not_lt_today' => '不能预订今天之前的时间',
    ],
    'validate_tourism_hotel_config' => [
        'is_allow_refund_in' => '是否退款必须是0或1',
        'refund_rate_between' => '退款比率必须介于0和100之间'
    ],
    'validate_tourism_scenic_config' => [
        'is_allow_refund_in' => '是否退款必须是0或1',
        'refund_rate_between' => '退款比率必须介于0和100之间'
    ],
    'validate_tourism_way_config' => [
        'is_allow_refund_in' => '是否退款必须是0或1',
        'refund_rate_between' => '退款比率必须介于0和100之间'
    ],
    'validate_tourism_edit_hotel' => [
        "hotel_name_require" => '酒店名称必填',
        "hotel_cover_require" => '酒店封面必填',
        "price_require" => '酒店最低价必填',
        "hotel_star_require" => '酒店星级必填'
    ],
    'validate_tourism_room' => [
        "goods_name_require" => '房型名称必填',
        "goods_cover_require" => '房型图片必填',
        "stock_require" => '房型数量必填',
    ],
    'validate_tourism_scenic' => [
        "scenic_name_require" => '景区名称必填',
        "province_id_require" => '景区地址（省）必填',
        "city_id_require" => '景区地址（市）必填',
        "district_id_require" => '景区地址（区/县）必填',
        "address_require" => '景区详细地址必填',
        "scenic_level_require" => '景区级别必填',
        "scenic_cover_require" => '景区图片必填',
    ],
    'validate_tourism_ticket' => [
        "goods_name_require" => '门票名称必填',
        "price_require" => '门票价格必填',
        "stock_require" => '门票数必填',
    ],

];
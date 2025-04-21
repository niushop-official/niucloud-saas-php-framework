<?php

return [
    'vipcard_service_category' => [
        'category_name_require' => '分类名称必填',
    ],
    'vipcard_service_goods' => [
        'goods_name_require' => '项目名称必填',
        'caregory_id_require' => '项目分类必填',
        'goods_cover_require' => '项目封面必填',
        'price_require' => '项目销售价必填'
    ],
    'vipcard_card_goods' => [
        'goods_name_require' => '卡项名称必填',
        'goods_cover_require' => '卡项封面必填',
        'price_require' => '卡项销售价必填'
    ],
    'validate_vipcard_order' => [
        'goods_require' => 'goods参数必填',
        'goods_error' => 'goods参数错误'
    ],
    'vipcard_reserve' => [
        'member_id_require' => '会员id必填',
        'reserve_name_require' => '会员名字必填',
        'reserve_time_require' => '预约时间必填',
        'goods_id_require' => '预约服务必填'
    ],
];
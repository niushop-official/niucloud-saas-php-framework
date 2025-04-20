<?php

return [
    'o2o_technician' => [
        'member_id_require' => '会员必须绑定',
        'name_require' => '技师名称必填',
        'age_number' => '年龄必须为数字',
        'mobile_require' => '手机号必填',
        'goods_ids_require' => '请设置技师项目'
    ],
    'o2o_service_category' => [
        'category_name_require' => '分类名称必填',
    ],
    'o2o_service_goods' => [
        'goods_name_require' => '项目名称必填',
        'goods_category_require' => '项目分类必填',
        'goods_cover_require' => '项目封面必填',
        'goods_image_require' => '项目图片必填',
        'price_require' => '项目销售价必填'
    ],
    'o2o_card_goods' => [
        'goods_name_require' => '卡项名称必填',
        'goods_cover_require' => '卡项封面必填',
        'price_require' => '卡项销售价必填'
    ],
    'validate_o2o_order' => [
        'goods_require' => 'goods参数必填',
        'goods_error' => 'goods参数错误'
    ],

];
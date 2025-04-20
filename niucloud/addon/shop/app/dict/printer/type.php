<?php

use addon\shop\app\service\core\delivery\CoreDeliveryService;

// 物流配送
$delivery_config_service = new CoreDeliveryService();
$delivery_list = $delivery_config_service->getDeliveryList(0);
$print_delivery_list = [];
foreach ($delivery_list as $k => $v) {
    $print_delivery_list[] = [
        'name' => $v[ 'name' ],
        'value' => $v[ 'key' ]
    ];
}

return [
    [
        'key' => 'shopGoodsOrder',
        'title' => '商品订单', // 模板类型名称
        'sort' => 10000,
        //  触发打印时机，定义何时触发调用
        'trigger' => [
            'pay_after' => '付款后',
            'take_delivery' => '收货后',
            'manual' => '手动'
        ],
        // 根据业务可自行扩展筛选条件
        'condition' => [
            [
                'key' => 'print_delivery_type',
                'title' => '配送方式',
                'type' => 'checkbox',
                'list' => $print_delivery_list
            ],
            // todo 后续如果需要商品类型、订单类型，可以扩展
        ],
        'path' => 'preview-goods-order', // 实时预览组件名称
        // 模板内容
        'template' => [
            [
                'key' => 'head_info',
                'title' => '票头',
                'list' => [
                    [
                        'key' => 'ticket_name',
                        'label' => '小票名称',
                        'value' => '小票名称', // 存储的初始值，可以是字符串、数组格式
                        'placeholder' => '', // 输入框占位符
                        'type' => 'input', // 类型，空：无需设置，input：输入框、checkbox：复选框，select：下拉框
                        'status' => 1, // 状态（1：显示，0：隐藏）
                        'disabled' => false, // 是否禁止操作显示隐藏
                        'fontSize' => 'normal', // 字号，normal：正常，small:，big：大
                        'fontWeight' => 'normal', // 粗细，normal：正常，weight：加粗
                        'remark' => '', // 说明
                    ],
                    [
                        'key' => 'shop_name',
                        'label' => '商城名称',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'big',
                        'fontWeight' => 'bold',
                        'remark' => '',
                    ],
                ]
            ],
            [
                'key' => 'order_info',
                'title' => '订单信息',
                'list' => [
                    [
                        'key' => 'order_item',
                        'label' => '',
                        'value' => [ 'order_no', 'order_from', 'pay_type', 'order_status', 'delivery_type', 'create_time', 'pay_time', 'goods_money', 'discount_money', 'delivery_money', 'order_money' ],
                        'type' => 'checkbox',
                        'status' => 1,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'disabled' => false,
                        'remark' => '',
                        'list' => [
                            'order_no' => '订单编号',
                            'order_from' => '订单来源',
                            'order_status' => '订单状态',
                            'pay_type' => '支付方式',
                            'delivery_type' => '配送方式',
                            'create_time' => '下单时间',
                            'pay_time' => '付款时间',
                            'goods_money' => '商品总额',
                            'delivery_money' => '配送金额',
                            'discount_money' => '优惠金额',
                        ]
                    ],
                    [
                        'key' => 'order_money',
                        'label' => '实付金额',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'fontSize' => 'big',
                        'fontWeight' => 'bold',
                        'remark' => '',
                    ],
                    [
                        'key' => 'shop_remark',
                        'label' => '商家备注',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'normal',
                        'fontWeight' => 'bold',
                        'remark' => '',
                    ],
                ]
            ],
            [
                'key' => 'goods_info',
                'title' => '商品信息',
                'list' => [
                    [
                        'key' => 'goods_name',
                        'label' => '商品名称',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => true,
                        'fontSize' => 'normal',
                        'fontWeight' => 'normal',
                        'remark' => '',
                    ],
                    [
                        'key' => 'goods_num',
                        'label' => '商品数量',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => true,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'remark' => '',
                    ],
                    [
                        'key' => 'goods_price',
                        'label' => '商品金额',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'normal',
                        'fontWeight' => 'normal',
                        'remark' => '',
                    ],
                ]
            ],
            [
                'key' => 'buyer_info',
                'title' => '买家/收货信息',
                'list' => [
                    [
                        'key' => 'member_basic_info',
                        'label' => '',
                        'value' => [ 'nickname', 'account_balance', 'account_point' ],
                        'type' => 'checkbox',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'remark' => '',
                        'list' => [
                            'nickname' => '买家昵称',
                            'account_balance' => '账户余额',
                            'account_point' => '账户积分',
                        ]
                    ],
                    [
                        'key' => 'buyer_mobile',
                        'label' => '买家手机号',
                        'value' => 'yes',
                        'type' => 'select',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'normal',
                        'fontWeight' => 'normal',
                        'remark' => '手机号脱敏可以有效保护用户隐私',
                        'text' => '脱敏',
                        'list' => [
                            'yes' => '是',
                            'no' => '否'
                        ]
                    ],
                    [
                        'key' => 'taker_name',
                        'label' => '收货人姓名',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'big',
                        'fontWeight' => 'bold',
                        'remark' => '',
                    ],
                    [
                        'key' => 'taker_mobile',
                        'label' => '收货人手机号',
                        'value' => 'yes',
                        'type' => 'select',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'big',
                        'fontWeight' => 'bold',
                        'remark' => '手机号脱敏可以有效保护用户隐私',
                        'text' => '脱敏',
                        'list' => [
                            'yes' => '是',
                            'no' => '否'
                        ]
                    ],
                    [
                        'key' => 'taker_full_address',
                        'label' => '收货人地址',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'big',
                        'fontWeight' => 'bold',
                        'remark' => '',
                    ],
                    [
                        'key' => 'member_remark',
                        'label' => '买家备注',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => 'normal',
                        'fontWeight' => 'normal',
                        'remark' => '',
                    ],
                ]
            ],
            [
                'key' => 'bottom_info',
                'title' => '底部信息',
                'list' => [
                    [
                        'key' => 'qrcode',
                        'label' => '二维码',
                        'placeholder' => '二维码内容',
                        'value' => '',
                        'type' => 'input',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'remark' => '',
                    ],
                    [
                        'key' => 'ticket_print_time',
                        'label' => '小票打印时间',
                        'value' => '',
                        'type' => '',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'remark' => '',
                    ],
                    [
                        'key' => 'bottom_remark',
                        'label' => '底部信息',
                        'value' => '谢谢惠顾，欢迎下次光临！',
                        'placeholder' => '',
                        'type' => 'input',
                        'status' => 1,
                        'disabled' => false,
                        'fontSize' => '',
                        'fontWeight' => '',
                        'remark' => '',
                    ],

                ]
            ]

        ],
    ],
];
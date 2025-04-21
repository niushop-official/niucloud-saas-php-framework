<?php

return [
    'dict_tourism_order' => [
        'order_type_hotel' => '酒店订单',
        'order_type_scenic' => '景点订单',
        'order_type_ticket' => '门票订单',
        'order_type_way' => '线路订单',
        'order_status_wait_pay' => '待支付',
        'order_status_wait_use' => '待使用',
        'order_status_finish' => '已完成',
        'order_status_close' => '已关闭',
        'action_pay' => '去支付',
        'action_cancel' => '取消订单',
        'action_delete' => '删除订单'
    ],
    'dict_tourism_order_log' => [
        'order_create' => '订单提交成功',
        'order_pay' => '订单支付成功',
        'order_overtime' => '订单超时未完成支付，已自动关闭',
        'order_cancel' => '订单已取消',
        'order_verify' => '订单核销成功，订单完成',
        'order_oversold' => '支付成功后扣库存，库存不足，系统主动进行退款'
    ],
    'dict_tourism_order_refund' => [
        'wait_audit' => '待审核',
        'wait_refund' => '待退款',
        'refunding' => '转账中',
        'refund_completed' => '退款完成',
        'refund_refuse' => '退款被拒',
        'refund_fail' => '转账失败',
        'cancel' => '已取消'
    ],
    'dict_tourism_order_refund_log' => [
        'apply' => '退款申请提交成功',
        'agree' => '退款申请商家已同意',
        'refuse' => '商家拒绝了此次退款申请',
        'cancel' => '用户已取消了退款申请',
        'completed' => '退款已到账，维权结束',
        'refund' => '商家确认退款，退款处理中'
    ],
    'dict_tourism_goods' => [
        'goods_type_hotel' => '酒店',
        'goods_type_ticket' => '门票',
        'goods_type_way' => '线路',
    ],
    'dict_site_index' => [
        'tourism' => '旅游系统',
    ],
    'dict_wap_index' => [
        'tourism' => '旅游系统',
        'tourism_desc' => '酒店预定，景点门票，团购线路',
    ],
    'dict_diy_poster' => [
        'tourism_hotel_component_type_basic' => '酒店组件',
        'tourism_scenic_component_type_basic' => '景点组件',
        'tourism_way_component_type_basic' => '线路组件',
    ],
    'dict_diy' => [
        'tourism_component_type_basic' => '旅游组件',
        'page_tourism_index' => '旅游首页',
        'tourism_title' => '旅游系统',
        'tourism_link' => '基础链接',
        'tourism_index' => '旅游首页',
        'tourism_way' => '线路',
        'tourism_way_select' => '选择线路',
        'tourism_scenic' => '景点',
        'tourism_scenic_select' => '选择景点',
        'tourism_hotel' => '酒店',
        'tourism_hotel_select' => '选择酒店',

        'tourism_order_list' => '旅游订单',
        'tourism_verify' => '核销',
        'tourism_verify_record' => '核销记录',
    ]
];

<?php

return [
    'dict_goods_type' => [
        'service' => '项目',
        'card' => '次卡'
    ],
    'dict_site_index' => [
        'vipcard' => '会员卡系统',
    ],
    'dict_wap_index' => [
        'vipcard' => '会员卡系统',
        'vipcard_desc' => '项目管理，卡项管理，会员预约',
    ],
    'dict_card_type' => [
        'oncecard' => '计次卡',
        'oncecard_desc' => '有效期内按照卡内项目设置次数使用',
        'timecard' => '计时卡',
        'timecard_desc' => '有效期内卡内项目使用次数不限',
        'commoncard' => '通用卡',
        'commoncard_desc' => '有效期内按照卡内项目总次数使用',
    ],
    'dict_vipcard_order' => [
        'order_status_wait_pay' => '待支付',
        'order_status_wait_use' => '待使用',
        'order_status_finish' => '已完成',
        'order_status_close' => '已关闭',
        'action_pay' => '去支付',
        'action_cancel' => '取消订单',
        'action_delete' => '删除订单'
    ],
    'dict_vipcard_order_log' => [
        'order_create' => '订单提交成功',
        'order_pay' => '订单支付成功',
        'order_overtime' => '订单超时未完成支付，已自动关闭',
        'order_cancel' => '订单已取消',
        'order_verify' => '订单核销成功，订单完成'
    ],
    'dict_vipcard_verify_validity_type' => [
        'permanent' => '永久有效',
        'fixed_days' => '购买后N天有效',
        'fixed_time' => '指定过期日期'
    ],
    'dict_vipcard_reserve_status_name' => [
        'remove' => '已取消',
        'treat_confury' => '待确认',
        'treat_to_store' => '待到店',
        'to_store' => '已到店',
        'comolete' => '已完成'
    ],
    'dict_vipcard_order_refund' => [
        'wait_audit' => '待审核',
        'wait_refund' => '待退款',
        'refunding' => '转账中',
        'refund_completed' => '退款完成',
        'refund_refuse' => '退款被拒',
        'refund_fail' => '转账失败',
        'cancel' => '已取消'
    ],
    'dict_vipcard_order_refund_log' => [
        'apply' => '退款申请提交成功',
        'agree' => '退款申请商家已同意',
        'refuse' => '商家拒绝了此次退款申请',
        'cancel' => '用户已取消了退款申请',
        'completed' => '退款已到账，维权结束',
        'refund' => '商家确认退款，退款处理中'
    ],
    'dict_vipcard_membercard_status' => [
        'wait_use' => '待使用',
        'used' => '已使用',
        'refunded' => '已退款'
    ],
    'dict_diy' => [
        'vipcard_component_type_basic' => '会员卡组件',
        'page_vipcard_index' => '会员卡首页',
        'vipcard_title' => '会员卡系统',
        'vipcard_link' => '基础链接',
        'vipcard_index' => '会员卡首页',
        'vipcard_card' => '卡项',
        'vipcard_select' => '选择卡项',
        'vipcard_service' => '项目',
        'vipcard_service_select' => '选择项目',
        'vipcard_verify' => '核销',
        'vipcard_verify_record' => '核销记录',
        'vipcard_order_list' => '订单列表',
        'vipcard_my_reserved' => '我的预约',
        'vipcard_my_card' => '我的卡项'
    ]
];

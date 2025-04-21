<?php

return [
    'dict_o2o_technician_status' => [
        'status_on' => '正常',
        'status_off' => '休息中',
        'status_depart' => '已离职'
    ],
    'dict_site_index' => [
        'o2o' => '上门服务系统',
    ],
    'dict_wap_index' => [
        'o2o' => '上门服务',
        'o2o_desc' => '项目管理，卡项管理，会员预约',
    ],

    'dict_o2o_order' => [
        'order_status_wait_pay' => '待支付',
        'order_status_dispatch' => '待派单',
        'order_status_wait_service' => '待服务',
        'order_status_in_service' => '服务中',
        'order_status_finish' => '已完成',
        'order_status_close' => '已关闭',
        'action_pay' => '去支付',
        'action_cancel' => '取消订单',
        'action_start' => '开始服务',
        'transfer_order' => '转单',
        'service_pay' => '师傅报单',
        'item_pay' => '去支付',
        'action_dispatch' => '派单',
        'again_action_dispatch' => '重新派单',
        'finish' => '完成订单',
        'action_delete' => '删除订单'
    ],

    'dict_o2o_order_log' => [
        'order_create' => '订单提交成功',
        'order_pay' => '订单支付成功',
        'order_overtime' => '订单超时未完成支付，已自动关闭',
        'order_cancel' => '订单已取消',
        'order_dispatch' => '订单派单',
        'order_service' => '订单开始服务',
        'order_transfer' => '订单转单',
        'order_add_pay' => '师傅报单',
        'order_del_pay' => '师傅删除报单',
        'order_edit_pay' => '师傅修改报单',
        'order_item_pay' => '客户服务项支付',
        'order_status_finish' => '订单完成',
        'order_refund' => '订单退款',
    ],

    'dict_o2o_order_refund' => [
        'wait_audit' => '待审核',
        'wait_refund' => '待退款',
        'refunding' => '转账中',
        'refund_completed' => '退款完成',
        'refund_refuse' => '退款被拒',
        'refund_fail' => '转账失败',
        'cancel' => '取消退款'
    ],
    'dict_o2o_order_refund_log' => [
        'apply' => '退款申请提交成功',
        'agree' => '退款申请商家已同意',
        'refuse' => '商家拒绝了此次退款申请',
        'cancel' => '已取消了退款申请',
        'completed' => '退款已到账，维权结束',
        'refund' => '商家确认退款，退款处理中'
    ],
    'dict_diy' => [
        'o2o_component_type_basic' => '上门服务组件',
        'page_o2o_index' => '上门服务首页',
        'page_o2o_member_index' => '上门服务个人中心',
        'o2o_index' => '上门服务首页',
        'o2o_category' => '项目分类',
        'o2o_title' => '基础链接',
        'o2o_link' => '上门服务',
        'o2o_link_index' => '上门服务首页',
        'o2o_link_goods_list' => '项目列表',
        'o2o_link_member_index' => '上门服务个人中心',
        'o2o_link_order_list' => '订单列表',
        'o2o_link_technician_list' => '技师列表',
        'o2o_link_order_refund_list' => '退款列表',
        'o2o_link_address_list' => '地址列表',
        'o2o_link_master_stat_index' => '技师中心',
        'o2o_goods_select'=>'服务项目',
        'o2o_goods_category_select'=>'项目分类',
        'o2o_technician_select'=>'选择技师',
    ],

    'dict_o2o_order_refund_reason' => [
        'delivery_timeout' => '未按约定时间上门',
        'buy_more_or_dislike' => '拍错/多拍/不喜欢',
        'negotiation_completed' => '协商一致退款',
        'other' => '其他',
    ],
    'dict_diy_poster' => [
        'o2o_goods_component_type_basic' => '上门服务组件',
    ],
    'dict_evaluate' => [
        'wait_evaluate' => '待评价',
        'wait_completed' => '已评价',
        'wait' => '待审核',
        'pass' => '已通过',
        'refuse' => '已拒绝',
    ]
];

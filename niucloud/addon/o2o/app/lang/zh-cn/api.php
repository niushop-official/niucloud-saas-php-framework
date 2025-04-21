<?php

return [
    'POSITION_NOT_EXIST' => '未获取到岗位信息',

    'O2O_GOODS_NOT_EXIST' => '未获取到项目信息',
    'O2O_GOODS_NOT_SET_MEMBER_PRICE' => '该项目不能设置会员价',
    'ORDER_NOT_ALLOW_CLOSE' => '订单不允许关闭',
    'ORDER_NOT_ALLOW_DELETE' => '订单不允许删除',
    'REFUND_MONEY_CANNOT_GT_PAYMONEY' => '退款金额不能大于订单实付金额',
    'REFUND_MONEY_NOT_GT_APPLY_MONEY' => '退款金额不能大于申请金额',
    'REFUND_MONEY_GT_ZERO' => '退款金额必须大于0',
    'MEMBER_NOT_EXIST' => '未获取到会员信息',
    'TECHNICIAN_MEMBER_EXIST' => '该会员已经绑定其他技师',

    /********************************************* 订单相关 start ****************************************************/
    'O2O_ORDER_HAS_REFUNDING_NOT_ALLOW_FINISH' => '订单中存在退款,无法收货',
    'O2O_ORDER_IS_PAY_FINISH' => '订单已支付',
    'O2O_ORDER_IS_CLOSED' => '订单已关闭',
    'O2O_NOT_SELECT_ADDRESS' => '请选择上门地址',
    'O2O_ONLY_WAIT_PAY_CAN_BE_PAY' => '只有待支付的订单可以支付',
    'O2O_ORDER_STATUS_NOT_SUPPORT_ACTION' => '当前的操作与订单状态不符',
    'O2O_ORDER_COUPON_EXPIRE_OR_NOT_FOUND' => '优惠券已使用或已过期',
    'O2O_ORDER_COUPON_NOT_SUPPORT_GOODS' => '当前优惠券在本单不可用',
    'O2O_ORDER_COUPON_NOT_SUPPORT_MIN_MONEY' => '未达到当前优惠券的最低使用条件',
    'O2O_ORDER_EXPIRE' => '数据已过期',
    'O2O_ORDER_BUYER_NOT_FOUND' => '找不到买家',
    'O2O_ORDER_COUPON_SUPPORT_GOODS' => '没有适用的项目',
    'O2O_ORDER_COUPON_NOT_CONDITION' => '未达到最低可使用金额',
    'O2O_ORDER_DELIVERY_SUCCESS' => '发货成功',
    'ORDER_ITEM_NOT_DEL' => '该服务项不能删除',
    'ORDER_ITEM_NOT_DEL_AUTHORITY' => '权限不足',
    'O2O_SELECT_TECHNICIAN_IN_SERVICE' => '当前技师已被预约或正在服务中,请选择其它技师或更换上门时间',
    /*********************************************  订单相关 end ****************************************************/
    /********************************************* 订单退款 start ****************************************************/
    'O2O_ORDER_REFUND_IS_INVALID' => '退款已失效',
    'O2O_ORDER_REFUND_IS_INVALID_OR_FINISH' => '退款已完成或已关闭',
    'O2O_ORDER_REFUND_IS_REFUND_FINISH' => '订单已退款或存在未完成的退款',
    'O2O_ORDER_REFUND_MONEY_GT_ORDER_MONEY' => '退款金额不能大于可退款总额',
    'O2O_ORDER_REFUND_STATUS_NOT_SUPPORT_ACTION' => '当前的操作与退款状态不符',
    'O2O_ORDER_IS_NOT_ENABLE_REFUND' => '订单不允许退款',
    'REFUND_APPLY_SUCCESS' => '退款申请已提交',
    'O2O_ORDER_REFUND_SELECT_ADDRESS' => '请选择退货地址',
    'O2O_ORDER_REFUND_IS_ONLY_WAIT_REFUND_GOODS' => '只有待确认退货请求才可以审核',
    'O2O_ORDER_REFUND_IS_ONLY_WAIT_REFUND' => '只有待确认退款请求才可以审核',
    'O2O_ORDER_BUYER_APPLY_REFUND' => '买家申请退款',
    'O2O_ORDER_STORE_ACTIVE_REFUND' => '卖家主动退款',
    'REFUND_NOT_EXIST' => '退款数据未找到',
    'REFUND_CANNOT_CANCEL' => '当前退款不能取消',
    'O2O_ORDER_REFUND_DELIVERY_NOT_ALLOW_REFUND_GOODS' => '待发货的项目项不允许退货退款',
    /*********************************************  订单退款 end ****************************************************/
    /*********************************************** 商品相关 start *************************************************************/
    'O2O_GOODS_CATEGORY_BE_USED'=>'商品分类已被使用，请查验后重新操作',
    /*********************************************** 商品相关 end*************************************************************/
];

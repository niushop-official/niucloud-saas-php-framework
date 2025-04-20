
DROP TABLE IF EXISTS `{{prefix}}yk_recharge_order`;
CREATE TABLE `{{prefix}}yk_recharge_order`  (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `order_no` varchar(50) NOT NULL DEFAULT '' COMMENT '订单编号',
  `order_from` varchar(55) NOT NULL DEFAULT '' COMMENT '订单来源',
  `order_type` varchar(50) NOT NULL DEFAULT '' COMMENT '订单类型',
  `out_trade_no` varchar(50) NOT NULL DEFAULT '' COMMENT '支付流水号',
  `order_status` int(11) NOT NULL DEFAULT 0 COMMENT '订单状态',
  `refund_status` int(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `ip` varchar(20) NOT NULL DEFAULT '' COMMENT '会员ip',
  `member_message` varchar(50) NOT NULL DEFAULT '' COMMENT '会员留言信息',
  `order_item_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单项目金额',
  `order_discount_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单优惠金额',
  `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  `add_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '赠送余额',
  `add_jifen` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '赠送积分',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单支付时间',
  `close_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
  `is_delete` int(11) NOT NULL DEFAULT 0 COMMENT '是否删除(针对后台)',
  `is_enable_refund` int(11) NOT NULL DEFAULT 0 COMMENT '是否允许退款',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '商家留言',
  `invoice_id` int(11) NOT NULL DEFAULT 0 COMMENT '发票id，0表示不开发票',
  `close_reason` varchar(255) NOT NULL DEFAULT '' COMMENT '关闭原因',
  `level_id` int(11) DEFAULT '0' COMMENT '会员等级ID',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}yk_recharge_order_item`;
CREATE TABLE `{{prefix}}yk_recharge_order_item`  (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '购买会员id',
  `item_id` int(11) NOT NULL DEFAULT 0 COMMENT '项目id',
  `item_type` varchar(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  `item_name` varchar(400) NOT NULL DEFAULT '' COMMENT '项目名称',
  `item_image` varchar(2000) NOT NULL DEFAULT '' COMMENT '项目图片',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目单价',
  `add_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '赠送余额',
  `add_jifen` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '赠送积分',
  `num` decimal(10, 3) NOT NULL DEFAULT 0.000 COMMENT '购买数量',
  `item_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目总价',
  `is_refund` int(11) NOT NULL DEFAULT 0 COMMENT '是否退款',
  `refund_no` varchar(255) NOT NULL DEFAULT '' COMMENT '退款编号',
  `refund_status` int(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `level_id` int(11) DEFAULT '0' COMMENT '会员等级ID',
  PRIMARY KEY (`order_item_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单商品表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}yk_recharge_order_item_refund`;
CREATE TABLE `{{prefix}}yk_recharge_order_item_refund`  (
  `refund_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_item_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `order_no` varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  `refund_no` varchar(255) NOT NULL DEFAULT '0' COMMENT '退款单号',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `num` decimal(10, 3) NOT NULL DEFAULT 0.000 COMMENT '退货数量',
  `money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总退款',
  `jifen` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退积分',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `audit_time` int(11) NOT NULL DEFAULT 0 COMMENT '审核时间',
  `transfer_time` int(11) NOT NULL DEFAULT 0 COMMENT '转账时间',
  `item_type` varchar(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  PRIMARY KEY (`refund_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单退款表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}yk_recharge_order_log`;
CREATE TABLE `{{prefix}}yk_recharge_order_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `action` varchar(255) NOT NULL DEFAULT '' COMMENT '操作内容',
  `uid` int(11) NOT NULL DEFAULT 0 COMMENT '操作人id',
  `nick_name` varchar(50) NOT NULL DEFAULT '' COMMENT '操作人名称',
  `order_status` int(11) NOT NULL DEFAULT 0 COMMENT '订单状态，操作后',
  `action_way` bigint(20) NOT NULL DEFAULT 2 COMMENT '操作类型1买家2卖家 3 系统任务',
  `order_status_name` varchar(255) NOT NULL DEFAULT '' COMMENT '订单状态名称，操作后',
  `action_time` int(11) NOT NULL DEFAULT 0 COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单操作记录表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}yk_recharge_setting`;
CREATE TABLE `{{prefix}}yk_recharge_setting`  (
  `setting_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `amount` int(11) NOT NULL DEFAULT 0 COMMENT '充值金额',
  `money` int(11) NOT NULL DEFAULT 0 COMMENT '赠送金额 为0不赠送',
  `jifen` int(11) NOT NULL DEFAULT 0 COMMENT '赠送积分 为0不赠送',
  `level_id` int(11) DEFAULT '0' COMMENT '会员等级ID',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`setting_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='余额设置表';
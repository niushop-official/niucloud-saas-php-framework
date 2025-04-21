
DROP TABLE IF EXISTS `{{prefix}}recharge`;
CREATE TABLE `{{prefix}}recharge` (
  `recharge_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点ID',
  `recharge_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '套餐名称',
  `face_value` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '面值',
  `buy_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '价格',
  `point` INT(11) NOT NULL DEFAULT 0 COMMENT '赠送积分',
  `growth` INT(11) NOT NULL DEFAULT 0 COMMENT '赠送成长值',
  `gift_json` TEXT DEFAULT NULL COMMENT '赠品json',
  `sale_num` INT(11) NOT NULL DEFAULT 0 COMMENT '发放数量',
  `sort` INT(11) NOT NULL DEFAULT 0 COMMENT '排序号',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态（0关闭 1开启）',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`recharge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='会员充值套餐';

DROP TABLE IF EXISTS `{{prefix}}recharge_order`;
CREATE TABLE `{{prefix}}recharge_order`  (
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
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单支付时间',
  `close_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
  `is_delete` int(11) NOT NULL DEFAULT 0 COMMENT '是否删除(针对后台)',
  `is_enable_refund` int(11) NOT NULL DEFAULT 0 COMMENT '是否允许退款',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '商家留言',
  `timeout` INT(11) NOT NULL DEFAULT 0 COMMENT '通用业务超时时间记录',
  `invoice_id` int(11) NOT NULL DEFAULT 0 COMMENT '发票id，0表示不开发票',
  `close_reason` varchar(255) NOT NULL DEFAULT '' COMMENT '关闭原因',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}recharge_order_item`;
CREATE TABLE `{{prefix}}recharge_order_item`  (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '购买会员id',
  `item_id` int(11) NOT NULL DEFAULT 0 COMMENT '项目id',
  `item_type` varchar(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  `item_name` varchar(400) NOT NULL DEFAULT '' COMMENT '项目名称',
  `item_image` varchar(2000) NOT NULL DEFAULT '' COMMENT '项目图片',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目单价',
  `num` decimal(10, 3) NOT NULL DEFAULT 0.000 COMMENT '购买数量',
  `item_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目总价',
  `is_refund` int(11) NOT NULL DEFAULT 0 COMMENT '是否退款',
  `refund_no` varchar(255) NOT NULL DEFAULT '' COMMENT '退款编号',
  `refund_status` int(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`order_item_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单商品表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}recharge_order_item_refund`;
CREATE TABLE `{{prefix}}recharge_order_item_refund`  (
  `refund_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_item_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `order_id` int(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `order_no` varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  `refund_no` varchar(255) NOT NULL DEFAULT '0' COMMENT '退款单号',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `num` decimal(10, 3) NOT NULL DEFAULT 0.000 COMMENT '退货数量',
  `money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总退款',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '退款状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `audit_time` int(11) NOT NULL DEFAULT 0 COMMENT '审核时间',
  `transfer_time` int(11) NOT NULL DEFAULT 0 COMMENT '转账时间',
  `item_type` varchar(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  PRIMARY KEY (`refund_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单退款表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}recharge_order_log`;
CREATE TABLE `{{prefix}}recharge_order_log`  (
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

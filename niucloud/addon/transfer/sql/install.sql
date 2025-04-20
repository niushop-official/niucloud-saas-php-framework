

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for {{prefix}}transfer_log
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}transfer_log`;
CREATE TABLE `{{prefix}}transfer_log`  (
                                     `id` int(11) NOT NULL AUTO_INCREMENT,
                                     `site_id` int(11) NULL DEFAULT 0 COMMENT '站点id',
                                     `account_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '资产类型',
                                     `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '编号',
                                     `order_from` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '渠道',
                                     `member_id` int(11) NULL DEFAULT 0 COMMENT '转移用户',
                                     `to_member_id` int(11) NULL DEFAULT NULL COMMENT '受赠用户',
                                     `zhuan_money` decimal(11, 2) NULL DEFAULT 0.00 COMMENT '转移金额',
                                     `give_money` decimal(11, 2) NULL DEFAULT NULL COMMENT '获得金额',
                                     `shouxufei` decimal(11, 2) NULL DEFAULT 0.00 COMMENT '手续费',
                                     `my_coupon_id` int(11) NULL DEFAULT NULL COMMENT '用户优惠券',
                                     `meno` varchar(2221) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注说明',
                                     `create_time` int(11) NULL DEFAULT 0 COMMENT '创建时间',
                                     `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '转赠类型',
                                     `status` int(1) NULL DEFAULT 1 COMMENT '状态 1待付款, 2 已成功',
                                     `give_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '赠予文字',
                                     PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 93 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '资产转赠记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}transfer_order
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}transfer_order`;
CREATE TABLE `{{prefix}}transfer_order`  (
                                       `order_id` int(11) NOT NULL AUTO_INCREMENT,
                                       `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
                                       `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单编号',
                                       `order_from` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单来源',
                                       `out_trade_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '支付流水号',
                                       `order_status` int(11) NOT NULL DEFAULT 0 COMMENT '订单状态',
                                       `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '会员id',
                                       `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员ip',
                                       `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
                                       `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
                                       `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单支付时间',
                                       `close_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
                                       `log_id` int(11) NULL DEFAULT NULL COMMENT '关联转赠记录',
                                       `order_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '订单类型',
                                       PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 95 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

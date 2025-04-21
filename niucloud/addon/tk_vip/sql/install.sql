-- ----------------------------
-- Table structure for {{prefix}}tkvip_order
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}tkvip_order`;
CREATE TABLE `{{prefix}}tkvip_order`
(
    `id`            int(13) UNSIGNED                                              NOT NULL AUTO_INCREMENT COMMENT '系统用户ID',
    `site_id`       int(11)                                                       NULL DEFAULT NULL COMMENT '站点id',
    `member_id`     int(13)                                                       NULL DEFAULT NULL COMMENT '用户id',
    `order_from`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '订单来源',
    `order_id`      varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NULL DEFAULT NULL COMMENT '订单id',
    `body`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '内容',
    `sku_info`      longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci     NULL COMMENT 'sku信息',
    `level_id`      int(11)                                                       NULL DEFAULT NULL COMMENT '会员等级',
    `sku_id`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'SKUID',
    `day`           int(13)                                                       NULL DEFAULT NULL COMMENT '天数',
    `status`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '状态',
    `type`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型',
    `over_time`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '到期时间',
    `out_trade_no`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '支付单号',
    `order_money`   decimal(10, 2)                                                NULL DEFAULT NULL COMMENT '订单金额',
    `pay_time`      int(13)                                                       NULL DEFAULT NULL COMMENT '支付时间',
    `close_time`    int(13)                                                       NULL DEFAULT NULL COMMENT '关闭时间',
    `close_reason`  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关闭原因',
    `remark`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
    `refund_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '退款状态',
    `create_time`   int(13) UNSIGNED                                              NULL DEFAULT 0 COMMENT '添加时间',
    `update_time`   int(13)                                                       NULL DEFAULT 0 COMMENT '更新时间',
    `delete_time`   int(13)                                                       NULL DEFAULT 0 COMMENT '删除时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 147
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT = 'VIP订单'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for {{prefix}}tkvip_vip
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}tkvip_vip`;
CREATE TABLE `{{prefix}}tkvip_vip`
(
    `id`          int(13) NOT NULL AUTO_INCREMENT COMMENT '流水id',
    `site_id`     int(13) NULL DEFAULT NULL COMMENT '站点ID',
    `member_id`   int(13) NULL DEFAULT NULL COMMENT '会员ID',
    `level_id`    int(11) NULL DEFAULT NULL COMMENT '等级ID',
    `over_time`   int(13) NULL DEFAULT NULL COMMENT '结束时间',
    `update_time` int(13) NULL DEFAULT NULL COMMENT '更新时间',
    `create_time` int(13) NULL DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 13
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT = '会员VIP管理'
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}tkvip_vip_log
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}tkvip_vip_log`;
CREATE TABLE `{{prefix}}tkvip_vip_log`
(
    `id`          int(13)                                                       NOT NULL AUTO_INCREMENT COMMENT '流水id',
    `site_id`     int(13)                                                       NULL DEFAULT NULL COMMENT '站点ID',
    `member_id`   int(13)                                                       NULL DEFAULT NULL COMMENT '会员ID',
    `level_id`    int(11)                                                       NULL DEFAULT NULL COMMENT '等级ID',
    `type`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '类型',
    `body`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '内容',
    `over_time`   int(13)                                                       NULL DEFAULT NULL COMMENT '结束时间',
    `update_time` int(13)                                                       NULL DEFAULT NULL COMMENT '更新时间',
    `create_time` int(13)                                                       NULL DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 39
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT = '会员日志'
  ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for {{prefix}}tkvip_real
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}tkvip_real`;
CREATE TABLE `{{prefix}}tkvip_real`
(
    `id`             int(13)                                                       NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `site_id`        int(13)                                                       NULL DEFAULT NULL COMMENT '站点ID',
    `member_id`      int(13)                                                       NULL DEFAULT NULL COMMENT '会员ID',
    `real_name`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '实名',
    `mobile`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
    `card_num`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证',
    `card_img_back`  varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证背面',
    `card_img_front` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证正面',
    `sex`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别',
    `birthday`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生日',
    `field`          longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci     NULL COMMENT '字段',
    `status`         int(2)                                                        NULL DEFAULT NULL COMMENT '认证状态',
    `over_time`      int(13)                                                       NULL DEFAULT NULL COMMENT '到期时间',
    `update_time`    int(13)                                                       NULL DEFAULT NULL COMMENT '更新时间',
    `create_time`    int(13)                                                       NULL DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 2
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_general_ci COMMENT = '实名列表'
  ROW_FORMAT = Dynamic;


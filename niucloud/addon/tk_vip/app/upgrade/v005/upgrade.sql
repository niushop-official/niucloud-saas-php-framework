DROP TABLE IF EXISTS `tkvip_real`;
CREATE TABLE `tkvip_real`
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
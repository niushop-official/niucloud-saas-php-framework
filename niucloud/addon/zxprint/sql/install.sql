DROP TABLE IF EXISTS `{{prefix}}zx_print`;
CREATE TABLE `{{prefix}}zx_print`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `site_id` int(11) NOT NULL COMMENT '站点ID',
  `value_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '参数名称',
  `value_code` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '参数内容',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '显示状态',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `delete_time` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '小票打印配置表' ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `{{prefix}}zx_printlog`;
CREATE TABLE `{{prefix}}zx_printlog` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点ID',
  `order_id` varchar(120) NOT NULL COMMENT '订单ID',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '打印状态：1-已打印；0-未打印',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `delete_time` int(11) NOT NULL DEFAULT 0 COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci COMMENT = '小票打印记录' ROW_FORMAT = DYNAMIC;
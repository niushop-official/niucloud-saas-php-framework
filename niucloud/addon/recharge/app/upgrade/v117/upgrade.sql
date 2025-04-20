
DROP TABLE IF EXISTS `recharge`;
CREATE TABLE `recharge` (
  `recharge_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点ID',
  `recharge_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '套餐名称',
  `face_value` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '面值',
  `buy_price` DECIMAL(10, 2) NOT NULL COMMENT '价格',
  `point` INT(11) NOT NULL DEFAULT 0 COMMENT '赠送积分',
  `growth` INT(11) NOT NULL DEFAULT 0 COMMENT '赠送成长值',
  `coupon_id` VARCHAR(500) NOT NULL DEFAULT '0' COMMENT '赠送优惠券ID',
  `sale_num` INT(11) NOT NULL DEFAULT 0 COMMENT '发放数量',
  `sort` INT(11) NOT NULL DEFAULT 0 COMMENT '排序号',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态（0关闭 1开启）',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`recharge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='会员充值套餐';

ALTER TABLE `recharge_order` ADD COLUMN timeout INT(11) NOT NULL DEFAULT 0 COMMENT '通用业务超时时间记录';

ALTER TABLE `recharge_order` MODIFY timeout INT(11) NOT NULL DEFAULT 0 COMMENT '通用业务超时时间记录' AFTER `remark`;

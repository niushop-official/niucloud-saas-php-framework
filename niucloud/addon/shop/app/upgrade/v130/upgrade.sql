
ALTER TABLE `shop_point_exchange` CHANGE COLUMN `product_detail` `product_detail` TEXT DEFAULT NULL COMMENT '兑换产品信息';

DROP TABLE IF EXISTS `shop_order_batch_delivery`;
CREATE TABLE `shop_order_batch_delivery` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `main_id` INT(11) NOT NULL DEFAULT 0 COMMENT '操作人id',
  `status` INT(11) NOT NULL DEFAULT 1 COMMENT '状态 进行中  已完成  已失败',
  `type` VARCHAR(255) NOT NULL DEFAULT '操作类型 批量发货  批量打单 ....' COMMENT '操作类型',
  `total_num` INT(11) NOT NULL DEFAULT 0 COMMENT '总发货单数',
  `success_num` INT(11) NOT NULL DEFAULT 0 COMMENT '成功发货单数',
  `fail_num` INT(11) NOT NULL DEFAULT 0 COMMENT '失败发货单数',
  `data` VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '导入文件的路径',
  `output` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '对外输出记录',
  `fail_output` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '失败记录',
  `fail_remark` VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '失败原因',
  `create_time` INT(11) NOT NULL COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '操作时间',
  PRIMARY KEY (`id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '订单批量发货表';


DROP TABLE IF EXISTS `shop_delivery_electronic_sheet`;
CREATE TABLE `shop_delivery_electronic_sheet` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `template_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板名称',
  `express_company_id` INT(11) NOT NULL DEFAULT 0 COMMENT '物流公司id',
  `customer_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '电子面单客户账号（CustomerName）',
  `customer_pwd` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '电子面单密码（CustomerPwd）',
  `send_site` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'SendSite',
  `send_staff` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'SendStaff',
  `month_code` VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'MonthCode',
  `pay_type` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '邮费支付方式（1：现付，2：到付，3：月结）',
  `is_notice` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '快递员上门揽件（0：否，1：是）',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态（1：开启，0：关闭）',
  `exp_type` INT(11) NOT NULL DEFAULT 0 COMMENT '物流公司业务类型',
  `print_style` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '电子面单打印模板样式',
  `is_default` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '是否默认（1：是，0：否）',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '电子面单';

ALTER TABLE `shop_delivery_company` CHANGE COLUMN `express_no` `express_no` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '物流公司编号(用于物流跟踪)';

ALTER TABLE `shop_delivery_company` ADD COLUMN `express_no_electronic_sheet` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '物流公司编号(用于电子面单)';

ALTER TABLE `shop_delivery_company` ADD COLUMN `electronic_sheet_switch` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '是否支持电子面单（0：不支持，1：支持）';

ALTER TABLE `shop_delivery_company` ADD COLUMN `print_style` VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '电子面单打印模板样式，json字符串';

ALTER TABLE `shop_delivery_company` ADD COLUMN `exp_type` VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '物流公司业务类型，json字符串';

ALTER TABLE `shop_delivery_company` MODIFY `create_time` INT(11) NOT NULL DEFAULT 0 AFTER `exp_type`;

ALTER TABLE `shop_delivery_company` MODIFY `update_time` INT(11) NOT NULL DEFAULT 0 AFTER `create_time`;

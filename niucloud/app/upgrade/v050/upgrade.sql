
ALTER TABLE `member_cash_out` CHANGE COLUMN `remark` `remark` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '备注';

ALTER TABLE `member_cash_out` CHANGE COLUMN `refuse_reason` `refuse_reason` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '拒绝理由';

DROP TABLE IF EXISTS `sys_printer`;
CREATE TABLE `sys_printer` (
  `printer_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `printer_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '打印机名称',
  `brand` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '设备品牌（易联云，365，飞鹅）',
  `printer_code` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '打印机编号',
  `printer_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '打印机秘钥',
  `open_id` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '开发者id',
  `apikey` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '开发者密钥',
  `template_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '小票打印模板类型，多个逗号隔开',
  `trigger` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '触发打印时机',
  `value` LONGTEXT DEFAULT NULL COMMENT '打印模板数据，json格式',
  `print_width` VARCHAR(255) NOT NULL DEFAULT '58mm' COMMENT '纸张宽度',
  `status` TINYINT(4) NOT NULL DEFAULT 1 COMMENT '状态（0，关闭，1：开启）',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`printer_id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '小票打印机';


DROP TABLE IF EXISTS `sys_printer_template`;
CREATE TABLE `sys_printer_template` (
  `template_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `template_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板名称',
  `template_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板类型',
  `value` LONGTEXT DEFAULT NULL COMMENT '模板数据，json格式',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`template_id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '小票打印模板';

ALTER TABLE `member` CHANGE COLUMN `nickname` `nickname` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '会员昵称';

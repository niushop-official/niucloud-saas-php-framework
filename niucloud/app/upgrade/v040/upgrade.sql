
ALTER TABLE `weapp_version` ADD COLUMN `from_type` VARCHAR(255) NOT NULL DEFAULT 'cloud_build';

ALTER TABLE `weapp_version` ADD COLUMN `auditid` VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE `member_address` DROP COLUMN `type`;

DROP TABLE IF EXISTS `wx_oplatfrom_weapp_version`;
CREATE TABLE `wx_oplatfrom_weapp_version` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_group_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点套餐id',
  `template_id` VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '代码模板 ID',
  `user_version` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '代码版本号',
  `user_desc` VARCHAR(255) DEFAULT '' COMMENT '代码描述',
  `task_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '上传任务key',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态',
  `fail_reason` TEXT DEFAULT NULL COMMENT '失败原因',
  `version_no` INT(11) NOT NULL DEFAULT 0,
  `create_time` INT(11) NOT NULL DEFAULT 0,
  `update_time` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

DROP TABLE IF EXISTS `user_create_site_limit`;
CREATE TABLE `user_create_site_limit` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `group_id` INT(11) NOT NULL DEFAULT 0,
  `uid` INT(11) NOT NULL DEFAULT 0,
  `num` INT(11) NOT NULL DEFAULT 0,
  `month` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;
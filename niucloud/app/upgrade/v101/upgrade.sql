
DROP TABLE IF EXISTS `diy_theme`;
CREATE TABLE `diy_theme` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '标题',
  `type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '插件类型app，addon',
  `addon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '所属应用，app：系统，shop：商城、o2o：上门服务',
  `mode` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模式，default：默认【跟随系统】，diy：自定义配色',
  `theme_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '配色类型，default：默认，diy：自定义',
  `default_theme` text DEFAULT NULL COMMENT '当前色调的默认值',
  `theme` text DEFAULT NULL COMMENT '当前色调',
  `new_theme` text DEFAULT NULL COMMENT '新增颜色集合',
  `is_selected` tinyint NOT NULL DEFAULT 0 COMMENT '已选色调，0：否，1.是',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='自定义主题配色表';

DROP TABLE IF EXISTS `pay_transfer_scene`;
CREATE TABLE `pay_transfer_scene` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '业务类型',
  `scene` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '场景',
  `infos` VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '转账报备背景',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `perception` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '转账收款感知',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '支付转账场景表' ROW_FORMAT = Dynamic;

ALTER TABLE `pay_transfer` ADD COLUMN `package_info` VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '跳转领取页面的package信息';

ALTER TABLE `pay_transfer` ADD COLUMN `extra` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '扩展信息';

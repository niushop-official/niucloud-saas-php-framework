
CREATE TABLE `verify` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `code` varchar(255) NOT NULL DEFAULT '' COMMENT '核销码',
  `data` varchar(255) NOT NULL DEFAULT '' COMMENT '核销参数',
  `type` varchar(30) NOT NULL DEFAULT '' COMMENT '核销类型',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '核销时间',
  `verifier_member_id` int(11) NOT NULL DEFAULT '0' COMMENT '核销会员id',
  `value` varchar(1000) NOT NULL DEFAULT '' COMMENT '核销内容',
  `body` varchar(500) NOT NULL DEFAULT '' COMMENT '描述',
  `relate_tag` varchar(255) NOT NULL DEFAULT '' COMMENT '业务标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='核销记录' ROW_FORMAT=DYNAMIC;

CREATE TABLE `verifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT '0' COMMENT '会员id',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '用户id',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `verify_type` varchar(255) NOT NULL DEFAULT '' COMMENT '核销类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='核销员表' ROW_FORMAT=DYNAMIC;

ALTER TABLE `sys_poster` ADD COLUMN `is_default` INT(11) NOT NULL DEFAULT 0 COMMENT '是否默认海报，1：是，0：否';

ALTER TABLE `sys_poster` MODIFY `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间' AFTER `is_default`;

ALTER TABLE `sys_poster` MODIFY `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间' AFTER `create_time`;

CREATE TABLE `sys_export` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点ID',
  `export_key` varchar(255) NOT NULL DEFAULT '' COMMENT '主题关键字',
  `export_num` int(11) NOT NULL DEFAULT '0' COMMENT '导出数据数量',
  `file_path` varchar(255) NOT NULL DEFAULT '' COMMENT '文件存储路径',
  `file_size` varchar(255) NOT NULL DEFAULT '' COMMENT '文件大小',
  `export_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '导出状态',
  `fail_reason` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '失败原因',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '导出时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='导出报表' ROW_FORMAT=DYNAMIC;

CREATE TABLE `stat_hour` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `addon` varchar(255) NOT NULL DEFAULT '' COMMENT '插件',
  `field` varchar(255) NOT NULL DEFAULT '' COMMENT '统计字段',
  `field_total` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总计',
  `year` int(11) NOT NULL DEFAULT '0' COMMENT '年',
  `month` int(11) NOT NULL DEFAULT '0' COMMENT '月',
  `day` int(11) NOT NULL DEFAULT '0' COMMENT '天',
  `start_time` int(11) NOT NULL DEFAULT '0' COMMENT '当日开始时间戳',
  `last_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后执行时间',
  `hour_0` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_1` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_2` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_3` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_4` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_5` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_6` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_7` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_8` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_9` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_10` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_11` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_12` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_13` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_14` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_15` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_16` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_17` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_18` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_19` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_20` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_21` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_22` decimal(10,2) NOT NULL DEFAULT '0.00',
  `hour_23` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='小时统计表' ROW_FORMAT=DYNAMIC;

ALTER TABLE `site` ADD COLUMN `front_end_icon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '前台icon';

ALTER TABLE `site` MODIFY `front_end_icon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '前台icon' AFTER `front_end_logo`;

CREATE TABLE `member_sign` (
  `sign_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `member_id` int(11) NOT NULL DEFAULT '0' COMMENT '会员id',
  `days` int(11) NOT NULL DEFAULT '0' COMMENT '连续签到天数',
  `day_award` varchar(255) NOT NULL DEFAULT '' COMMENT '日签奖励',
  `continue_award` varchar(255) NOT NULL DEFAULT '' COMMENT '连签奖励',
  `continue_tag` varchar(30) NOT NULL DEFAULT '' COMMENT '连签奖励标识',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '签到时间',
  `start_time` int(11) NOT NULL DEFAULT '0' COMMENT '签到周期开始时间',
  `is_sign` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否签到（0未签到 1已签到）',
  PRIMARY KEY (`sign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='会员签到表' ROW_FORMAT=DYNAMIC;

ALTER TABLE `member_level` CHANGE COLUMN `growth` `growth` INT NOT NULL DEFAULT 0 COMMENT '所需成长值';

ALTER TABLE `member_level` ADD COLUMN `level_benefits` TEXT DEFAULT NULL COMMENT '等级权益';

ALTER TABLE `member_level` ADD COLUMN `level_gifts` TEXT DEFAULT NULL COMMENT '等级礼包';

ALTER TABLE `diy_page` CHANGE COLUMN `title` `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面标题（用于前台展示）';

ALTER TABLE `diy_page` ADD COLUMN `page_title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面名称（用于后台展示）';

ALTER TABLE `diy_page` MODIFY `page_title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面名称（用于后台展示）' AFTER `site_id`;

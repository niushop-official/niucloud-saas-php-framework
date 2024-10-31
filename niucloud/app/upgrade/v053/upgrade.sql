
DROP TABLE IF EXISTS `sys_schedule_log`;
CREATE TABLE `sys_schedule_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '执行记录id',
  `schedule_id` int NOT NULL DEFAULT 0 COMMENT '任务id',
  `addon` varchar(255) NOT NULL DEFAULT '' COMMENT '所属插件',
  `key` varchar(255) NOT NULL DEFAULT '' COMMENT '计划任务模板key',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '计划任务名称',
  `execute_time` int NOT NULL COMMENT '执行时间',
  `execute_result` text DEFAULT NULL COMMENT '日志信息',
  `status` varchar(255) NOT NULL DEFAULT '' COMMENT '执行状态',
  `class` varchar(255) NOT NULL DEFAULT '',
  `job` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '计划任务执行记录' ROW_FORMAT = Dynamic;

ALTER TABLE `site` CHANGE COLUMN `front_end_logo` `front_end_logo` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '前台logo（长方形）';

ALTER TABLE `site` CHANGE COLUMN `front_end_icon` `front_end_icon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '前台icon（正方形）';

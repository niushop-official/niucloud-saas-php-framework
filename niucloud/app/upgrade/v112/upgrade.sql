
ALTER TABLE `sys_user_log` ADD COLUMN `operation` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '操作描述';

ALTER TABLE `sys_user_log` MODIFY `operation` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '操作描述' AFTER `uid`;

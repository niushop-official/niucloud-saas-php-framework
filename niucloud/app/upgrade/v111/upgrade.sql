
ALTER TABLE `sys_menu` ADD COLUMN `parent_select_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '上级key';

ALTER TABLE `member` CHANGE COLUMN `remark` `remark` VARCHAR(300) NOT NULL DEFAULT '' COMMENT '备注';

ALTER TABLE `member` ADD COLUMN `id_card` VARCHAR(30) DEFAULT '' COMMENT '身份证号';

ALTER TABLE `member` MODIFY `id_card` VARCHAR(30) DEFAULT '' COMMENT '身份证号' AFTER `birthday`;

ALTER TABLE `diy_page` CHANGE COLUMN `template` `template` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '页面模板名称';

ALTER TABLE `sys_user_log` CHANGE COLUMN `url` `url` VARCHAR(300) NOT NULL DEFAULT '' COMMENT '链接';

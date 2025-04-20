
ALTER TABLE `pay_transfer` CHANGE COLUMN `transfer_fail_reason` `transfer_fail_reason` VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '失败原因';

ALTER TABLE `pay_transfer` ADD COLUMN `transfer_payment_code` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '收款码图片';

ALTER TABLE `pay_transfer` ADD COLUMN `transfer_payee` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '在线转账数据(json)';

ALTER TABLE `pay_transfer` ADD COLUMN `out_batch_no` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '扩展数据,主要用于记录接收到线上打款的业务数据编号';

ALTER TABLE `pay_transfer` MODIFY COLUMN `remark` VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE `pay_transfer` MODIFY `transfer_payment_code` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '收款码图片' AFTER `transfer_remark`;

ALTER TABLE `member_cash_out_account` ADD COLUMN `transfer_payment_code` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '收款码';

ALTER TABLE `member_cash_out` ADD COLUMN `transfer_payee` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '转账收款方(json),主要用于对接在线的打款方式';

ALTER TABLE `member_cash_out` ADD COLUMN `transfer_payment_code` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '收款码图片';

ALTER TABLE `member_cash_out` MODIFY `transfer_payee` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '转账收款方(json),主要用于对接在线的打款方式' AFTER `transfer_account`;

ALTER TABLE `member_cash_out` MODIFY `transfer_payment_code` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '收款码图片' AFTER `transfer_payee`;


DROP TABLE IF EXISTS `diy_theme`;
CREATE TABLE `diy_theme` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '标题',
  `type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '插件类型app，addon',
  `addon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '所属应用，app：系统，shop：商城、o2o：上门服务',
  `color_mark` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '颜色标识',
  `color_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '颜色名称',
  `mode` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模式，default：默认【跟随系统】，diy：自定义配色',
  `value` TEXT DEFAULT NULL COMMENT '配色',
  `diy_value` TEXT DEFAULT NULL COMMENT '自定义配色',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='自定义主题配色表';


DROP TABLE IF EXISTS `diy_form_write_config`;
CREATE TABLE `diy_form_write_config` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '所属万能表单id',
  `write_way` VARCHAR(255) NOT NULL COMMENT '填写方式，no_limit：不限制，scan：仅限微信扫一扫，url：仅限链接进入',
  `join_member_type` VARCHAR(255) NOT NULL DEFAULT 'all_member' COMMENT '参与会员，all_member：所有会员参与，selected_member_level：指定会员等级，selected_member_label：指定会员标签',
  `level_ids` TEXT DEFAULT NULL COMMENT '会员等级id集合',
  `label_ids` TEXT DEFAULT NULL COMMENT '会员标签id集合',
  `member_write_type` VARCHAR(255) NOT NULL COMMENT '每人可填写次数，no_limit：不限制，diy：自定义',
  `member_write_rule` TEXT NOT NULL COMMENT '每人可填写次数自定义规则',
  `form_write_type` VARCHAR(255) NOT NULL COMMENT '表单可填写数量，no_limit：不限制，diy：自定义',
  `form_write_rule` TEXT NOT NULL COMMENT '表单可填写总数自定义规则',
  `time_limit_type` VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '填写时间限制类型，no_limit：不限制， specify_time：指定开始结束时间，open_day_time：设置每日开启时间',
  `time_limit_rule` TEXT NOT NULL COMMENT '填写时间限制规则',
  `is_allow_update_content` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '是否允许修改自己填写的内容，0：否，1：是',
  `write_instruction` TEXT DEFAULT NULL COMMENT '表单填写须知',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单填写配置表';


DROP TABLE IF EXISTS `diy_form_submit_config`;
CREATE TABLE `diy_form_submit_config` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '所属万能表单id',
  `submit_after_action` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '填表人提交后操作，text：文字信息，voucher：核销凭证',
  `tips_type` VARCHAR(255) NOT NULL COMMENT '提示内容类型，default：默认提示，diy：自定义提示',
  `tips_text` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '自定义提示内容',
  `time_limit_type` VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '核销凭证有效期限制类型，no_limit：不限制，specify_time：指定固定开始结束时间，submission_time：按提交时间设置有效期',
  `time_limit_rule` TEXT DEFAULT NULL COMMENT '核销凭证时间限制规则，json格式',
  `voucher_content_rule` TEXT DEFAULT NULL COMMENT '核销凭证内容，json格式',
  `success_after_action` TEXT DEFAULT NULL COMMENT '填写成功后续操作',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单提交页配置表';


DROP TABLE IF EXISTS `diy_form_records_fields`;
CREATE TABLE `diy_form_records_fields` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '所属万能表单id',
  `form_field_id` INT(11) NOT NULL DEFAULT 0 COMMENT '关联表单字段id',
  `record_id` INT(11) NOT NULL DEFAULT 0 COMMENT '关联表单填写记录id',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '填写会员id',
  `field_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段唯一标识',
  `field_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段类型',
  `field_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段名称',
  `field_value` LONGTEXT NOT NULL COMMENT '字段值，根据类型展示对应效果',
  `field_required` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段是否必填 0:否 1:是',
  `field_hidden` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段是否隐藏 0:否 1:是',
  `field_unique` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段内容防重复 0:否 1:是',
  `privacy_protection` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '隐私保护 0:关闭 1:开启',
  `update_num` INT(11) NOT NULL DEFAULT 0 COMMENT '字段修改次数',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单填写字段表';


DROP TABLE IF EXISTS `diy_form_records`;
CREATE TABLE `diy_form_records` (
  `record_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '表单填写记录id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '所属万能表单id',
  `value` LONGTEXT DEFAULT NULL COMMENT '填写的表单数据',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '填写人会员id',
  `relate_id` INT(11) NOT NULL DEFAULT 0 COMMENT '关联业务id',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单填写记录表';


DROP TABLE IF EXISTS `diy_form_fields`;
CREATE TABLE `diy_form_fields` (
  `field_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '字段id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '所属万能表单id',
  `field_key` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段唯一标识',
  `field_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段类型',
  `field_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段名称',
  `field_remark` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '字段说明',
  `field_default` TEXT DEFAULT NULL COMMENT '字段默认值',
  `write_num` INT(11) NOT NULL DEFAULT 0 COMMENT '字段填写总数量',
  `field_required` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段是否必填 0:否 1:是',
  `field_hidden` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段是否隐藏 0:否 1:是',
  `field_unique` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '字段内容防重复 0:否 1:是',
  `privacy_protection` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '隐私保护 0:关闭 1:开启',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单字段表';


DROP TABLE IF EXISTS `diy_form`;
CREATE TABLE `diy_form` (
  `form_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '表单id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `page_title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '表单名称（用于后台展示）',
  `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '表单名称（用于前台展示）',
  `type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '表单类型',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态（0，关闭，1：开启）',
  `template` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '模板名称',
  `value` LONGTEXT DEFAULT NULL COMMENT '表单数据，json格式，包含展示组件',
  `addon` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '所属插件标识',
  `share` VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '分享内容',
  `write_num` INT(11) NOT NULL DEFAULT 0 COMMENT '表单填写总数量',
  `remark` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='万能表单表';

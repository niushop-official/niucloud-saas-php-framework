ALTER TABLE `yk_recharge_setting` ADD COLUMN `level_id` int(11) NULL DEFAULT 0 COMMENT '会员等级ID' AFTER `jifen`;
ALTER TABLE `yk_recharge_order` ADD COLUMN `level_id` int(11) NULL DEFAULT 0 COMMENT '会员等级ID' AFTER `close_reason`;
ALTER TABLE `yk_recharge_order_item` ADD COLUMN `level_id` int(11) NULL DEFAULT 0 COMMENT '会员等级ID' AFTER `create_time`;
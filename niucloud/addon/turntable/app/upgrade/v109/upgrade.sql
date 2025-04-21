CREATE TABLE `promotion_turntable_games_settings` (
    `settings_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `is_shop` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否授权商城 0:未授权,1:已授权',
    `created_at` datetime DEFAULT NULL COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (`settings_id`),
    KEY `IDX_ns_promotion_games_settings_settings_id` (`settings_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='抽奖公共设置';
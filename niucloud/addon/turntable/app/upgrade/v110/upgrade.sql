ALTER TABLE `promotion_turntable_games_banner` ADD `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id' AFTER `banner_id`;
ALTER TABLE `promotion_turntable_games_settings` ADD `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id' AFTER `settings_id`;

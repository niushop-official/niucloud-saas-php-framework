DROP TABLE IF EXISTS `{{prefix}}promotion_turntable_games`;
CREATE TABLE `{{prefix}}promotion_turntable_games` (
    `game_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '游戏id',
    `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
    `template_name` varchar(255) NOT NULL DEFAULT '' COMMENT '模版名称',
    `game_name` varchar(255) NOT NULL DEFAULT '' COMMENT '游戏活动名称',
    `game_type` varchar(30) NOT NULL DEFAULT '1' COMMENT '游戏类型（插件名称）',
    `game_type_name` varchar(255) NOT NULL DEFAULT '' COMMENT '游戏类型名称',
    `level_id` tinyint(4) NOT NULL DEFAULT '0'  COMMENT '参与的会员等级0表示全部参与1:表示部分参与',
    `level_name` varchar(255) NOT NULL DEFAULT '' COMMENT '参与活动会员名称',
    `points` int(11) NOT NULL DEFAULT '0' COMMENT '参与一次扣除积分',
    `start_time`datetime DEFAULT NULL  COMMENT '活动开始时间',
    `end_time` datetime DEFAULT NULL COMMENT '活动结束时间',
    `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '活动状态 1未开始 2已开始 3已结束 4已关闭',
    `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '活动说明',
    `winning_rate` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '中奖率',
    `no_winning_img` varchar(255) NOT NULL DEFAULT '',
    `no_winning_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '未中奖说明',
    `is_show_winner` tinyint(4) NOT NULL DEFAULT '0' COMMENT '中奖名单是否显示 0显示 1不显示',
    `join_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '参加类型 0活动全过程 1每天 (节日礼 0节日前某天 1节日当天)',
    `banner_show` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否展示广告图0:不展示,1:展示',
    `join_frequency` int(11) NOT NULL DEFAULT '1' COMMENT '根据类型计算参加次数(节日礼的天数)',
    `join_num` int(11) NOT NULL DEFAULT '0' COMMENT '抽奖人数',
    `winning_num` int(11) NOT NULL DEFAULT '0' COMMENT '中奖人数',
    `created_at` datetime DEFAULT NULL COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    `push_time` datetime DEFAULT NULL COMMENT '节日有礼活动推送时间戳',
    PRIMARY KEY (`game_id`),
    KEY `IDX_ns_promotion_games_end_time` (`end_time`),
    KEY `IDX_ns_promotion_games_game_type` (`game_type`),
    KEY `IDX_ns_promotion_games_site_id` (`site_id`),
    KEY `IDX_ns_promotion_games_start_time` (`start_time`),
    KEY `IDX_ns_promotion_games_status` (`status`)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT='大转盘营销游戏（概率游戏）';

DROP TABLE IF EXISTS `{{prefix}}promotion_turntable_games_award`;
CREATE TABLE `{{prefix}}promotion_turntable_games_award` (
   `award_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
   `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
   `game_id` int(11) NOT NULL DEFAULT '0' COMMENT '游戏id',
   `award_name` varchar(255) NOT NULL DEFAULT '' COMMENT '奖品名称',
   `award_img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
   `award_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '奖品类型（1积分  2余额（不可提现）  3优惠券  4赠品）',
   `relate_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联id（根据奖品类型）',
   `relate_name` varchar(255) NOT NULL DEFAULT '' COMMENT '关联商品名称（优惠券或者赠品名称）',
   `point` int(11) NOT NULL DEFAULT '0' COMMENT '积分数',
   `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
   `award_num` int(11) NOT NULL DEFAULT '0' COMMENT '奖品数量',
   `award_winning_rate` int(11) NOT NULL DEFAULT '0' COMMENT '奖品中奖概率',
   `assign_crowd` varchar(255) NOT NULL DEFAULT '' COMMENT '内定用户集合',
   `remaining_num` int(11) NOT NULL DEFAULT '0' COMMENT '剩余数量',
   `receive_num` int(11) NOT NULL DEFAULT '0' COMMENT '已领取数量',
   `no_winning_img` varchar(255) NOT NULL DEFAULT '' COMMENT '未中奖图片',
   `created_at` datetime DEFAULT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
   PRIMARY KEY (`award_id`),
   KEY `IDX_ns_promotion_games_game_id` (`game_id`)
)ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT='抽奖游戏奖品';
DROP TABLE IF EXISTS `{{prefix}}promotion_turntable_games_draw_record`;
CREATE TABLE `{{prefix}}promotion_turntable_games_draw_record` (
    `record_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
    `game_id` int(11) NOT NULL DEFAULT '0' COMMENT '游戏id',
    `game_type` varchar(30) NOT NULL DEFAULT '' COMMENT '游戏类型（插件名称）',
    `member_id` int(11) NOT NULL DEFAULT '0' COMMENT '会员id',
    `member_nick_name` varchar(255) NOT NULL DEFAULT '' COMMENT '会员昵称',
    `points` int(11) NOT NULL DEFAULT '0' COMMENT '参与消耗积分',
    `is_winning` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否中奖（1未中  2中奖）',
    `award_id` int(11) NOT NULL DEFAULT '0' COMMENT '奖品id',
    `award_name` varchar(255) NOT NULL DEFAULT '' COMMENT '奖品名称',
    `award_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '奖品类型（1积分  2余额（不可提现）  3优惠券  4赠品）',
    `relate_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联id（根据奖品类型）',
    `relate_name` varchar(255) NOT NULL DEFAULT '' COMMENT '关联商品名称（优惠券或者赠品名称）',
    `is_receive` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否领取（0未兑换 1已兑换,）奖品为优惠券 赠品是使用',
    `point` int(11) NOT NULL DEFAULT '0' COMMENT '奖励积分数',
    `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '奖励余额',
    `address_name` varchar(255) NOT NULL DEFAULT '' COMMENT '收货人',
    `mobile` varchar(255) NOT NULL DEFAULT '' COMMENT '手机',
    `full_address` varchar(255) NOT NULL DEFAULT '' COMMENT '详细地址信息',
    `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '说明',
    `create_time`datetime DEFAULT NULL COMMENT '参与时间',
    `created_at` datetime DEFAULT NULL COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (`record_id`),
    KEY `IDX_ns_promotion_games_game_id` (`game_id`)
)ENGINE=InnoDB  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  COMMENT='抽奖记录';
DROP TABLE IF EXISTS `{{prefix}}promotion_turntable_games_banner`;
CREATE TABLE `{{prefix}}promotion_turntable_games_banner` (
     `banner_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
     `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
     `game_id` int(11) NOT NULL DEFAULT '0' COMMENT '游戏id',
     `banner_image` varchar(255) NOT NULL DEFAULT '' COMMENT 'banner图片地址',
     `banner_url`varchar(255) NOT NULL DEFAULT '' COMMENT 'banner跳转地址',
     `created_at` datetime DEFAULT NULL COMMENT '创建时间',
     `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
     PRIMARY KEY (`banner_id`),
     KEY `IDX_ns_promotion_games_game_id` (`game_id`)
) ENGINE=InnoDB  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT='banner';
DROP TABLE IF EXISTS `{{prefix}}promotion_turntable_games_settings`;
CREATE TABLE `{{prefix}}promotion_turntable_games_settings` (
    `settings_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
    `is_shop` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否授权商城 0:未授权,1:已授权',
    `created_at` datetime DEFAULT NULL COMMENT '创建时间',
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (`settings_id`),
    KEY `IDX_ns_promotion_games_settings_settings_id` (`settings_id`)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT='抽奖公共设置';

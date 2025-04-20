
DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao`;
CREATE TABLE `{{prefix}}shop_fenxiao` (
	`fenxiao_id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`fenxiao_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分销商编号',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员ID',
	`level_id` int NOT NULL DEFAULT 0 COMMENT '分销商等级id',
	`parent` int NOT NULL DEFAULT 0 COMMENT '上级ID',
	`fenxiao_order_num` int NOT NULL DEFAULT 0 COMMENT '一级分销订单总数',
	`fenxiao_total_order` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级分销订单总额',
	`fenxiao_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '分销佣金总额',
	`agent_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理佣金',
	`team_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队分红',
	`task_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '任务奖励',
	`sale_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售奖励',
	`child_num` int NOT NULL DEFAULT 0 COMMENT '一级下线人数',
	`child_fenxiao_num` int NOT NULL DEFAULT 0 COMMENT '一级下线分销商',
	`status` tinyint NOT NULL DEFAULT 1 COMMENT '状态（0待审核 1正常 -1已冻结 -2已拒绝）',
	`is_agent` int NOT NULL DEFAULT 0 COMMENT '是否是代理商',
	`agent_level` int NOT NULL DEFAULT 0 COMMENT '代理商等级',
	`agent_status` int NOT NULL DEFAULT 1 COMMENT '代理商状态 1正常  2冻结',
	`agent_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理商加盟费',
	`agent_time` int NOT NULL DEFAULT 0 COMMENT '代理商时间',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`lock_time` int NOT NULL DEFAULT 0 COMMENT '冻结时间',
	`delete_time` int NOT NULL DEFAULT 0 COMMENT '删除时间',
	PRIMARY KEY USING BTREE (`fenxiao_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销商表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_agent_level`;
CREATE TABLE `{{prefix}}shop_fenxiao_agent_level` (
	`level_id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '代理等级名称',
	`money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理等级费用',
	`discount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理等级折扣',
	`update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	PRIMARY KEY USING BTREE (`level_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '代理等级表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_apply`;
CREATE TABLE `{{prefix}}shop_fenxiao_apply` (
	`apply_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '申请id',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
	`status` tinyint NOT NULL DEFAULT 0 COMMENT '申请状态1申请中2已通过-1审核拒绝',
	`refuse_reason` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '拒绝原因',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '添加时间',
	`audit_time` int NOT NULL DEFAULT 0 COMMENT '审核通过时间',
	PRIMARY KEY USING BTREE (`apply_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci;


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_goods`;
CREATE TABLE `{{prefix}}shop_fenxiao_goods` (
	`fenxiao_goods_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
	`goods_id` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品ID',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`is_fenxiao` tinyint NOT NULL DEFAULT 1 COMMENT '是否参与分享（1=是，0=否）',
	`fenxiao_type` tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '佣金设置类型',
	`fenxiao_rule` text DEFAULT NULL COMMENT '单独设置规则信息',
	PRIMARY KEY USING BTREE (`fenxiao_goods_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销商品表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_goods_rule`;
CREATE TABLE `{{prefix}}shop_fenxiao_goods_rule` (
  `goods_rule_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_id` INT(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品id',
  `sku_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品sku_id',
  `level_id` INT(11) NOT NULL DEFAULT 0 COMMENT '分销等级id',
  `level_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '分销等级名称',
  `one_rate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级佣金比例',
  `two_rate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '二级佣金比例',
  `one_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级佣金金额',
  `two_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '二级佣金金额',
  `calculate_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '计算金额',
  PRIMARY KEY (`goods_rule_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销商品分佣规则表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_level`;
CREATE TABLE `{{prefix}}shop_fenxiao_level` (
	`level_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分销等级Id',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`level_num` int NOT NULL DEFAULT 0 COMMENT '等级权重',
	`level_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '等级名称',
	`one_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级佣金比例',
	`two_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '二级佣金比例',
	`team_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队分红佣金比率',
	`team_flat_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队平级奖励',
	`upgrade_type` tinyint NOT NULL DEFAULT 0 COMMENT '升级方式（0满足任意条件  1满足全部条件）',
	`fenxiao_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '分销佣金',
	`fenxiao_order_num` int NOT NULL DEFAULT 0 COMMENT '分销订单总数',
	`fenxiao_order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '分销订单总额',
	`order_num` int NOT NULL DEFAULT 0 COMMENT '自购订单总数',
	`order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '自购订单总额',
	`child_num` int NOT NULL DEFAULT 0 COMMENT '下线人数',
	`child_fenxiao_num` int NOT NULL DEFAULT 0 COMMENT '下线分销商人数',
	`status` tinyint NOT NULL DEFAULT 1 COMMENT '状态（0关闭 1启用）',
	`is_default` tinyint NOT NULL DEFAULT 0 COMMENT '是否默认等级1=是，0=否',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
	PRIMARY KEY USING BTREE (`level_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销等级配置表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_member`;
CREATE TABLE `{{prefix}}shop_fenxiao_member` (
	`member_id` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '会员id',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`pid` int NOT NULL DEFAULT 0 COMMENT '推荐会员id(分销)',
	`fenxiao_member_id` int NOT NULL DEFAULT 0 COMMENT '会员上级分销商会员id',
	`is_fenxiao` tinyint NOT NULL DEFAULT 0 COMMENT '是否是分销商',
	`bind_time` int NOT NULL DEFAULT 0 COMMENT '绑定时间',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	PRIMARY KEY USING BTREE (`member_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci;


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_order`;
CREATE TABLE `{{prefix}}shop_fenxiao_order` (
	`id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分销订单Id',
	`order_id` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '订单ID',
	`order_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单编号',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点ID',
	`commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总佣金',
	`commission_fenxiao` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '分销佣金',
	`commission_team` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队分红',
	`commission_agent` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '区域代理',
	`fenxiao_member_id1` int NOT NULL DEFAULT 0 COMMENT '分销商会员id1',
	`fenxiao_member_id2` int NOT NULL DEFAULT 0 COMMENT '分销商会员id2',
	`team_members` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '团队分红会员ids',
	`agent_members` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '区域代理会员ids',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`is_settlement` int NOT NULL DEFAULT 0 COMMENT '是否已结算',
	`settlement_time` int NOT NULL DEFAULT 0 COMMENT '结算时间',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销订单表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_order_goods`;
CREATE TABLE `{{prefix}}shop_fenxiao_order_goods` (
	`id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`order_id` int NOT NULL DEFAULT 0 COMMENT '订单id',
	`order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单编号',
	`order_goods_id` int NOT NULL DEFAULT 0 COMMENT '商品id',
	`order_goods_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品金额（分销计算）',
	`calculate_type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '计算方式1按照比率2固定金额',
	`commission_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'fenxiao' COMMENT '佣金类型',
	`commission_level` tinyint(1) NOT NULL DEFAULT 1 COMMENT '佣金层级',
	`commission_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '佣金百分比',
	`fenxiao_member_id` int NOT NULL DEFAULT 0 COMMENT '获取佣金的分销商会员id',
	`commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '获得的佣金',
	`is_refund` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否退款',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`is_settlement` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否结算',
	`order_original_goods_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品原价总额',
	`agent_discount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理商折扣',
	`team_flat_rate` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队平级比率',
	`settlement_time` int NOT NULL DEFAULT 0 COMMENT '结算时间',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销订单项表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_sale_period`;
CREATE TABLE `{{prefix}}shop_fenxiao_sale_period` (
	`id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`period_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '销售奖励类型   月度  季度  年度',
	`sale_start_time` int NOT NULL DEFAULT 0 COMMENT '结算开始日期',
	`sale_end_time` int NOT NULL DEFAULT 0 COMMENT '结算结束日期',
	`total_order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总销售额',
	`total_reward_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '结算总奖励',
	`send_reward_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '已发放金额',
	`is_settlement` int NOT NULL DEFAULT 0 COMMENT '是否已结算',
	`settlement_time` int NOT NULL DEFAULT 0 COMMENT '结算日期',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建日期',
	`is_send` int NOT NULL DEFAULT 0 COMMENT '是否发放',
	`send_time` int NOT NULL DEFAULT 0 COMMENT '发放时间',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '销售奖励周期表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_sale_period_member`;
CREATE TABLE `{{prefix}}shop_fenxiao_sale_period_member` (
	`id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`period_id` int NOT NULL DEFAULT 0 COMMENT '所属周期id',
	`period_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '销售奖励类型   月度  季度  年度',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
	`sale_start_time` int NOT NULL DEFAULT 0 COMMENT '结算开始日期',
	`sale_end_time` int NOT NULL DEFAULT 0 COMMENT '结算结束日期',
	`order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总销售额',
	`reward_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '结算总奖励',
	`is_settlement` int NOT NULL DEFAULT 0 COMMENT '是否已发放',
	`settlement_time` int NOT NULL DEFAULT 0 COMMENT '结算日期',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建日期',
	`is_send` int NOT NULL DEFAULT 0 COMMENT '是否已经发放',
	`send_time` int NOT NULL DEFAULT 0 COMMENT '发放',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '会员销售奖励周期表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_stat`;
CREATE TABLE `{{prefix}}shop_fenxiao_stat` (
	`id` int UNSIGNED NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
	`year` int NOT NULL DEFAULT 0 COMMENT '年',
	`month` int NOT NULL DEFAULT 0 COMMENT '月',
	`day` int NOT NULL DEFAULT 0 COMMENT '日',
	`order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售金额',
	`order_num` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售量',
	`child_num` int NOT NULL DEFAULT 0 COMMENT '推广会员数量',
	`refund_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
	`refund_num` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款数量',
	`team_order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队销售额',
	`team_order_num` int NOT NULL DEFAULT 0 COMMENT '团队销售量',
	`team_refund_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队退款金额',
	`team_refund_num` int NOT NULL DEFAULT 0 COMMENT '团队退款数量',
	`commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总佣金',
	`fenxiao_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '分销佣金',
	`agent_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '代理商佣金',
	`team_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队佣金',
	`task_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '任务奖励',
	`sale_commission` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售奖励',
	`child_fenxiao_num` int NOT NULL DEFAULT 0 COMMENT '推广分销商数量',
	PRIMARY KEY USING BTREE (`id`),
	INDEX `IDX_shop_fenxiao_stat_day` USING BTREE(`day` ASC),
	INDEX `IDX_shop_fenxiao_stat_month` USING BTREE(`month` ASC),
	INDEX `IDX_shop_fenxiao_stat_site_id` USING BTREE(`site_id` ASC),
	INDEX `IDX_shop_fenxiao_stat_year` USING BTREE(`year` ASC)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销统计表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_task`;
CREATE TABLE `{{prefix}}shop_fenxiao_task` (
	`id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`type` int NOT NULL DEFAULT 1 COMMENT '任务类型  1 循环任务  2 阶梯任务',
	`time_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
	`name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务名称',
	`cover` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务图片',
	`start_time` int NOT NULL DEFAULT 0 COMMENT '任务开始时间',
	`end_time` int NOT NULL DEFAULT 0 COMMENT '任务结束时间',
	`rules` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '任务规则 销售额、推广人数、团队订单数    数量  可参与的分销等级',
	`status` int NOT NULL DEFAULT 0 COMMENT '任务状态 1未开始  2进行中  3已结束',
	`remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务说明',
	`send_time_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '奖励发放时间类型',
	`send_time` int NOT NULL DEFAULT 0 COMMENT '奖励发放时间  1 任务完成后  2 活动结束后',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`level_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '等级条件',
	`level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '包含等级',
	`times` int NOT NULL DEFAULT 0 COMMENT '次数',
	`count` int NOT NULL DEFAULT 0 COMMENT '任务数',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销任务奖励';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_task_member`;
CREATE TABLE `{{prefix}}shop_fenxiao_task_member` (
	`id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`task_id` int NOT NULL DEFAULT 0 COMMENT '任务id',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
	`order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '团队销售额',
	`order_num` int NOT NULL DEFAULT 0 COMMENT '销售量',
	`child_num` int NOT NULL DEFAULT 0 COMMENT '推广人数',
	`total_reward_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '任务总奖励佣金',
	`is_complete` int NOT NULL DEFAULT 0 COMMENT '是否已完成',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`complete_num` int NOT NULL DEFAULT 0 COMMENT '完成次数',
	`send_num` int NOT NULL DEFAULT 0 COMMENT '已发放数量',
	`progress` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '进度',
	`next_index` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '下一个指标',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '任务进度表';


DROP TABLE IF EXISTS `{{prefix}}shop_fenxiao_task_member_reward`;
CREATE TABLE `{{prefix}}shop_fenxiao_task_member_reward` (
	`id` int NOT NULL AUTO_INCREMENT,
	`site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
	`task_id` int NOT NULL DEFAULT 0 COMMENT '任务id',
	`member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
	`from_id` int NOT NULL DEFAULT 0 COMMENT '会员任务参与id',
	`step` int NOT NULL DEFAULT 0 COMMENT '第几阶或第几次循环',
	`reward_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '任务总奖励佣金',
	`is_complete` int NOT NULL DEFAULT 0 COMMENT '是否已完成',
	`complete_time` int NOT NULL DEFAULT 0 COMMENT '完成时间',
	`is_send` int NOT NULL DEFAULT 0 COMMENT '是否发放',
	`send_time` int NOT NULL DEFAULT 0 COMMENT '发放时间',
	`create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
	`send_timer` int NOT NULL DEFAULT 0 COMMENT '预计发放时间',
	PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '会员任务奖励表';


DROP TABLE IF EXISTS `shop_goods_browse`;
CREATE TABLE `shop_goods_browse` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `member_id` int NOT NULL DEFAULT 0 COMMENT '浏览人',
  `sku_id` int NOT NULL DEFAULT 0 COMMENT 'sku_id',
  `goods_id` int NOT NULL DEFAULT 0 COMMENT '商品id',
  `browse_time` int NOT NULL DEFAULT 0 COMMENT '浏览时间',
  `goods_cover` varchar(2000) NOT NULL DEFAULT '' COMMENT '商品图片',
  `goods_name` varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='商品浏览历史';

ALTER TABLE `shop_order_goods` ADD COLUMN `shop_active_refund` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '商家主动退款（0否  1是）';

ALTER TABLE `shop_order_goods` ADD COLUMN `shop_active_refund_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商家主动退款金额';

ALTER TABLE `shop_goods` ADD COLUMN `is_limit` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '商品是否限购(0:否 1:是)';

ALTER TABLE `shop_goods` ADD COLUMN `limit_type` TINYINT(4) NOT NULL DEFAULT 1 COMMENT '限购类型，1：单次限购，2：单人限购';

ALTER TABLE `shop_goods` ADD COLUMN `max_buy` INT(11) NOT NULL DEFAULT 0 COMMENT '限购数';

ALTER TABLE `shop_goods` ADD COLUMN `min_buy` INT(11) NOT NULL DEFAULT 0 COMMENT '起购数';

ALTER TABLE `shop_goods` ADD COLUMN `is_gift` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '商品是否赠品(0:否 1:是)';

ALTER TABLE `shop_goods` ADD COLUMN `access_num` INT(11) NOT NULL DEFAULT 0 COMMENT '访问次数（浏览量）';

ALTER TABLE `shop_goods` ADD COLUMN `cart_num` INT(11) NOT NULL DEFAULT 0 COMMENT '加入购物车数量';

ALTER TABLE `shop_goods` ADD COLUMN `pay_num` INT(11) NOT NULL DEFAULT 0 COMMENT '支付件数';

ALTER TABLE `shop_goods` ADD COLUMN `pay_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付总金额';

ALTER TABLE `shop_goods` ADD COLUMN `collect_num` INT(11) NOT NULL DEFAULT 0 COMMENT '收藏数量';

ALTER TABLE `shop_goods` ADD COLUMN `evaluate_num` INT(11) NOT NULL DEFAULT 0 COMMENT '评论数量';

ALTER TABLE `shop_goods` ADD COLUMN `refund_num` INT(11) NOT NULL DEFAULT 0 COMMENT '退款件数';

ALTER TABLE `shop_goods` ADD COLUMN `refund_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款总额';

ALTER TABLE `shop_goods` MODIFY `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间' AFTER `refund_money`;

ALTER TABLE `shop_goods` MODIFY `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间' AFTER `create_time`;

ALTER TABLE `shop_goods` MODIFY `delete_time` INT(11) NOT NULL DEFAULT 0 COMMENT '删除时间' AFTER `update_time`;


DROP TABLE IF EXISTS `shop_manjian_give_records`;
CREATE TABLE `shop_manjian_give_records` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `manjian_id` INT(11) NOT NULL DEFAULT 0 COMMENT '满减送活动id',
  `goods_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `sku_id` INT(11) NOT NULL DEFAULT 0 COMMENT '规格id',
  `order_id` INT(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='满减送记录表';


DROP TABLE IF EXISTS `shop_manjian_goods`;
CREATE TABLE `shop_manjian_goods` (
  `manjian_goods_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '满减商品活动id',
  `manjian_id` INT(11) NOT NULL DEFAULT 0 COMMENT '满减活动id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `sku_id` INT(11) NOT NULL DEFAULT 0 COMMENT '规格id',
  `goods_type` VARCHAR(255) NOT NULL DEFAULT 'all_goods' COMMENT '参与商品 all_goods:全部商品参与  selected_goods:指定商品 selected_goods_not:指定商品不参与 ',
  `status` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '状态（0未开始1进行中2已结束-1已关闭）',
  `total_order_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '活动商品累计金额',
  `total_order_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动商品累计订单数',
  `total_member_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动商品参与会员数',
  PRIMARY KEY (`manjian_goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='满减商品表';


DROP TABLE IF EXISTS `shop_manjian`;
CREATE TABLE `shop_manjian` (
  `manjian_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '满减活动id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `manjian_name` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '名称',
  `condition_type` VARCHAR(255) NOT NULL DEFAULT 'over_n_yuan' COMMENT '条件类型 over_n_yuan:满N元  over_n_piece:满N件',
  `goods_type` VARCHAR(255) NOT NULL DEFAULT 'all_goods' COMMENT '参与商品 all_goods:全部商品参与  selected_goods:指定商品 selected_goods_not:指定商品不参与 ',
  `join_member_type` VARCHAR(255) NOT NULL DEFAULT 'all_member' COMMENT '参与会员 all_member:所有会员参与  selected_member_level:指定会员等级  selected_member_label:指定会员标签 ',
  `rule_type` VARCHAR(255) NOT NULL DEFAULT 'ladder' COMMENT '优惠规格 ladder:阶梯优惠  cycle:循环优惠',
  `rule_json` TEXT DEFAULT NULL COMMENT '优惠规则json',
  `goods_ids` TEXT DEFAULT NULL COMMENT '商品id集',
  `level_ids` TEXT DEFAULT NULL COMMENT '会员等级id集',
  `label_ids` TEXT DEFAULT NULL COMMENT '会员标签id集',
  `status` INT(11) NOT NULL DEFAULT 0 COMMENT '状态（0未开始1进行中2已结束-1已关闭）',
  `start_time` INT(11) NOT NULL DEFAULT 0 COMMENT '开始时间',
  `end_time` INT(11) NOT NULL DEFAULT 0 COMMENT '结束时间',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `remark` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '备注',
  `total_order_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '活动累计金额',
  `total_order_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动累计订单数',
  `total_member_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动参与会员数',
  `total_point` INT(11) NOT NULL DEFAULT 0 COMMENT '活动累计赠送积分',
  `total_balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '活动累计赠送余额',
  `total_coupon_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动累计赠送优惠券数',
  `total_goods_num` INT(11) NOT NULL DEFAULT 0 COMMENT '活动累计赠送商品数',
  PRIMARY KEY (`manjian_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='满减活动表';


DROP TABLE IF EXISTS `shop_goods_stat`;
CREATE TABLE `shop_goods_stat` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `date` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '日期',
  `date_time` INT(11) NOT NULL DEFAULT 0 COMMENT '时间戳',
  `goods_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品id',
  `cart_num` INT(11) NOT NULL DEFAULT 0 COMMENT '加入购物车数量',
  `sale_num` INT(11) NOT NULL DEFAULT 0 COMMENT '商品销量（下单数）',
  `pay_num` INT(11) NOT NULL DEFAULT 0 COMMENT '支付件数',
  `pay_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付总金额',
  `refund_num` INT(11) NOT NULL DEFAULT 0 COMMENT '退款件数',
  `refund_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款总额',
  `access_num` INT(11) NOT NULL DEFAULT 0 COMMENT '访问次数（浏览量）',
  `collect_num` INT(11) NOT NULL DEFAULT 0 COMMENT '收藏数量',
  `evaluate_num` INT(11) NOT NULL DEFAULT 0 COMMENT '评论数量',
  `goods_visit_member_count` INT(11) NOT NULL DEFAULT 0 COMMENT '商品访客数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='商品数据统计';


DROP TABLE IF EXISTS `shop_goods_rank`;
CREATE TABLE `shop_goods_rank` (
  `rank_id` INT(11) NOT NULL AUTO_INCREMENT,
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '榜单名称',
  `show_goods_num` INT(11) NOT NULL DEFAULT 0 COMMENT '显示商品数',
  `rank_type` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '排行周期 day=天，week=周，month=月, quarter=季度',
  `goods_source` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '来源类型 goods=指定商品，category=指定分类，brand=指定品牌, label=指定标签',
  `rule_type` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '排序规则 sale=按照销量，collect=按收藏数，evaluate=按评价数, access=按照浏览量',
  `goods_json` TEXT DEFAULT NULL COMMENT '商品信息',
  `category_ids` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '商品分类id',
  `brand_ids` VARCHAR(255) NOT NULL DEFAULT '0' COMMENT '商品品牌id',
  `label_ids` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '商品标签id，多个逗号隔开',
  `sort` INT(11) NOT NULL DEFAULT 0 COMMENT '排序号',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='商品排行榜';


CREATE TABLE `shop_point_exchange_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '兑换记录id',
  `order_no` varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  `out_trade_no` varchar(255) NOT NULL DEFAULT '' COMMENT '支付流水表',
  `site_id` int(11) NOT NULL COMMENT '站点id',
  `exchange_id` int(11) NOT NULL DEFAULT '0' COMMENT '兑换活动id',
  `exchange_name` varchar(255) NOT NULL DEFAULT '' COMMENT '兑换商品名称',
  `exchange_image` varchar(600) NOT NULL DEFAULT '' COMMENT '兑换商品图片	',
  `type` varchar(50) NOT NULL DEFAULT '' COMMENT '兑换类型',
  `member_id` int(11) NOT NULL DEFAULT '0' COMMENT '消费会员id',
  `member_address_id` int(11) NOT NULL DEFAULT '0' COMMENT '会员地址id',
  `relate_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联业务id',
  `relate_order_id` int(11) NOT NULL DEFAULT '0' COMMENT '关联订单id',
  `point` int(11) NOT NULL DEFAULT '0' COMMENT '使用积分',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '支付金额',
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '赠送余额',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `pay_time` int(11) NOT NULL DEFAULT '0' COMMENT '兑换时间',
  `close_time` int(11) NOT NULL DEFAULT '0' COMMENT '关闭时间',
  `delete_time` int(11) NOT NULL DEFAULT '0' COMMENT '订单删除',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '兑换数量',
  `status` varchar(50) NOT NULL DEFAULT '' COMMENT '订单状态',
  `order_money` decimal(10,2) NOT NULL COMMENT '订单金额',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='积分兑换订单表';


CREATE TABLE `shop_point_exchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '兑换活动主键id',
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `type` varchar(255) NOT NULL DEFAULT '' COMMENT '兑换类型（商品、优惠券、红包）',
  `names` varchar(255) NOT NULL DEFAULT '' COMMENT '兑换标题',
  `title` varchar(255) NOT NULL COMMENT '副标题',
  `image` text COMMENT '图片',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '兑换状态 0 下架  1上架  -1 删除',
  `product_detail` varchar(1000) NOT NULL DEFAULT '0' COMMENT '兑换产品信息',
  `point` int(11) NOT NULL DEFAULT '0' COMMENT '兑换所需积分',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '兑换所需金额',
  `limit_num` int(11) NOT NULL DEFAULT '0' COMMENT '限制数量',
  `content` text COMMENT '产品介绍',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `total_point_num` int(11) DEFAULT '0' COMMENT '积分消费总额',
  `total_price_num` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总支付金额',
  `total_order_num` int(11) DEFAULT '0' COMMENT '订单笔数',
  `total_member_num` int(11) DEFAULT '0' COMMENT '参与会员数',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '库存',
  `total_exchange_num` int(11) NOT NULL DEFAULT '0' COMMENT '兑换数量',
  PRIMARY KEY (`id`,`total_price_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='积分兑换表';


ALTER TABLE `shop_order_goods` ADD COLUMN `extend` VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '数据项扩展';

ALTER TABLE `shop_order_goods` ADD COLUMN `verify_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已核销次数';

ALTER TABLE `shop_order_goods` ADD COLUMN `verify_expire_time` INT(11) NOT NULL DEFAULT 0 COMMENT '过期时间 0 为永久';

ALTER TABLE `shop_order_goods` ADD COLUMN `is_verify` INT(11) NOT NULL DEFAULT 0 COMMENT '是否需要核销';

ALTER TABLE `shop_order` ADD COLUMN `relate_id` INT(11) NOT NULL DEFAULT 0 COMMENT '关联id';

ALTER TABLE `shop_order` ADD COLUMN `point` INT(11) NOT NULL DEFAULT 0 COMMENT '积分兑换';

ALTER TABLE `shop_order` ADD COLUMN `activity_type` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '营销类型';

ALTER TABLE `shop_goods_sku` ADD COLUMN `member_price` TEXT DEFAULT NULL COMMENT '会员价，json格式，指定会员价，数据结构为：{"level_1":"10.00","level_2":"10.00"}';

CREATE TABLE `shop_goods_attr` (
  `attr_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品参数id',
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `attr_name` varchar(255) NOT NULL DEFAULT '' COMMENT '参数名称',
  `attr_value_format` text COMMENT '参数值，json格式',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '参数排序号',
  PRIMARY KEY (`attr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='商品参数表';


ALTER TABLE `shop_goods` ADD COLUMN `virtual_auto_delivery` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '虚拟商品是否自动发货';

ALTER TABLE `shop_goods` ADD COLUMN `virtual_receive_type` VARCHAR(255) NOT NULL DEFAULT 'artificial' COMMENT '虚拟商品收货方式，auto：自动收货，artificial：买家确认收货，verify：到店核销';

ALTER TABLE `shop_goods` ADD COLUMN `virtual_verify_type` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '虚拟商品核销有效期类型，0：不限，1：购买后几日有效，2：指定过期日期';

ALTER TABLE `shop_goods` ADD COLUMN `virtual_indate` INT(11) NOT NULL DEFAULT 0 COMMENT '虚拟到期时间';

ALTER TABLE `shop_goods` ADD COLUMN `attr_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品参数id';

ALTER TABLE `shop_goods` ADD COLUMN `attr_format` TEXT DEFAULT NULL COMMENT '商品参数内容，json格式';

ALTER TABLE `shop_goods` ADD COLUMN `is_discount` INT(11) NOT NULL DEFAULT 0 COMMENT '是否参与限时折扣';

ALTER TABLE `shop_goods` ADD COLUMN `member_discount` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price';

ALTER TABLE `shop_goods` ADD COLUMN `poster_id` INT(11) NOT NULL DEFAULT 0 COMMENT '海报id';

ALTER TABLE `shop_goods` MODIFY `supplier_id` INT(11) NOT NULL DEFAULT 0 COMMENT '供应商id' AFTER `virtual_indate`;

ALTER TABLE `shop_goods` MODIFY `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间' AFTER `poster_id`;

ALTER TABLE `shop_goods` MODIFY `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间' AFTER `create_time`;

ALTER TABLE `shop_goods` MODIFY `delete_time` INT(11) NOT NULL DEFAULT 0 COMMENT '删除时间' AFTER `update_time`;


CREATE TABLE `shop_active` (
  `active_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动id',
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `active_name` varchar(255) NOT NULL DEFAULT '' COMMENT '活动名称',
  `active_desc` text COMMENT '活动说明',
  `active_type` varchar(255) NOT NULL DEFAULT '' COMMENT '活动类型(店铺活动，会员活动，商品活动)',
  `active_goods_type` varchar(255) NOT NULL DEFAULT '' COMMENT '商品活动类型（单品，独立商品，店铺整体商品）',
  `active_goods_info` text COMMENT '参与活动商品信息',
  `active_class` varchar(255) NOT NULL DEFAULT '' COMMENT '活动类别',
  `active_class_category` varchar(255) NOT NULL DEFAULT '' COMMENT '活动类别子分类（活动管理）',
  `relate_member` varchar(1000) NOT NULL DEFAULT '' COMMENT '参与会员条件(默认全部)',
  `active_value` text COMMENT '活动扩展信息数据',
  `start_time` int(11) NOT NULL DEFAULT '0' COMMENT '活动开始时间',
  `end_time` int(11) NOT NULL DEFAULT '0' COMMENT '活动结束时间',
  `active_status` varchar(50) NOT NULL DEFAULT '' COMMENT '活动状态',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `active_order_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '活动累计金额',
  `active_order_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动累计订单数',
  `active_member_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动参与会员数',
  `active_success_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动成功参与会员数',
  PRIMARY KEY (`active_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='店铺营销活动表（整体活动）';


CREATE TABLE `shop_active_goods` (
  `active_goods_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动商品id',
  `active_id` int(11) NOT NULL DEFAULT '0' COMMENT '活动id',
  `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
  `goods_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品id',
  `active_goods_type` varchar(255) NOT NULL DEFAULT '' COMMENT '商品活动类型（单品，独立商品，店铺整体商品）',
  `active_class` varchar(255) NOT NULL DEFAULT '' COMMENT '商品活动类别',
  `active_goods_label` varchar(1000) NOT NULL DEFAULT '' COMMENT '活动商品标签（针对活动有标签）',
  `active_goods_category` varchar(1000) NOT NULL DEFAULT '' COMMENT '活动商品分类（针对活动有分类）',
  `active_goods_value` text COMMENT '活动商品信息数据',
  `active_goods_status` varchar(50) NOT NULL DEFAULT '' COMMENT '活动状态',
  `active_goods_point` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '活动商品积分（展示，搜索）',
  `active_goods_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '活动商品价格（展示，搜索）',
  `active_goods_stock` int(11) NOT NULL DEFAULT '0' COMMENT '活动商品库存（针对参与库存）',
  `active_goods_order_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '活动累计金额',
  `active_goods_order_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动累计订单数',
  `active_goods_member_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动参与会员数',
  `active_goods_success_num` int(11) NOT NULL DEFAULT '0' COMMENT '活动成功参与会员数',
  PRIMARY KEY (`active_goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='店铺营销活动';

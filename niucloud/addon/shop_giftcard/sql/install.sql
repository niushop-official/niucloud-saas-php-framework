
DROP TABLE IF EXISTS `{{prefix}}shop_giftcard`;
CREATE TABLE `{{prefix}}shop_giftcard` (
  `giftcard_id` int NOT NULL AUTO_INCREMENT COMMENT '礼品卡活动id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡类型，virtual：电子卡，real：实体卡',
  `card_name` varchar(255) NOT NULL DEFAULT '' COMMENT '礼品卡名称',
  `category_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡分类',
  `cover` text NOT NULL COMMENT '礼品卡封面图，多个逗号隔开',
  `material_ids` varchar(255) NOT NULL DEFAULT '' COMMENT '礼品卡封面id，多个逗号隔开',
  `card_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '礼品卡价格',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '礼品卡状态，1：上架，0：下架',
  `is_give` tinyint NOT NULL DEFAULT '1' COMMENT '是否允许转赠，0：不允许，1：允许',
  `receive_validity_time` int NOT NULL DEFAULT 0 COMMENT '领取有效期（小时，范围：1~24）',
  `blessing_json` varchar(2000) NOT NULL DEFAULT '' COMMENT '祝福语，多个逗号隔开',
  `card_right_type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益类型，balance：储值余额，goods：商品',
  `balance_json` varchar(3000) NOT NULL DEFAULT '' COMMENT '储值余额面值，多个逗号隔开',
  `delivery_way` varchar(50) NOT NULL DEFAULT '' COMMENT '提货方式，all：全部提货，batch：分批提货',
  `card_goods_type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益商品类型，all：全部，diy：指定商品数量',
  `card_goods_count` int NOT NULL COMMENT '权益商品数量',
  `validity_type` varchar(50) NOT NULL DEFAULT '' COMMENT '有效期类型，forever：永久有效，day：购买后x天有效，date：指定过期日期',
  `validity_day` int NOT NULL DEFAULT '0' COMMENT '有效天数',
  `validity_time` int NOT NULL DEFAULT '0' COMMENT '有效时间',
  `card_key_way` varchar(100) NOT NULL DEFAULT '' COMMENT '卡密内容，0-9：数字，a-z：小写英文字母，,A-Z：大写英文字母，多个逗号隔开',
  `card_key_length` int NOT NULL DEFAULT '0' COMMENT '卡密位数',
  `card_no_length` int NOT NULL DEFAULT 0 COMMENT '卡号位数',
  `card_prefix` varchar(255) NOT NULL DEFAULT '' COMMENT '卡号前缀',
  `card_suffix` varchar(255) NOT NULL DEFAULT '' COMMENT '卡号后缀',
  `instruction` text DEFAULT NULL COMMENT '使用须知',
  `card_desc` text DEFAULT NULL COMMENT '礼品卡详情',
  `poster_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡海报id',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序号',
  `make_card_count` int NOT NULL DEFAULT '0' COMMENT '制卡数量',
  `sale_count` int NOT NULL DEFAULT '0' COMMENT '礼品卡销量，获取数量',
  `activate_count` int NOT NULL DEFAULT '0' COMMENT '实体卡激活数量',
  `use_count` int NOT NULL DEFAULT '0' COMMENT '使用量',
  `invalid_count` int NOT NULL DEFAULT '0' COMMENT '作废数量',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT '0' COMMENT '修改时间',
  `delete_time` int NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`giftcard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡活动表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_card`;
CREATE TABLE `{{prefix}}shop_giftcard_card` (
  `card_id` int NOT NULL AUTO_INCREMENT COMMENT '卡id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `order_id` int NOT NULL DEFAULT '0' COMMENT '订单id',
  `giftcard_id` varchar(255) NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `card_make_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡制卡关联id',
  `source` varchar(255) NOT NULL DEFAULT '' COMMENT '卡来源，generate：生成，order：购买，give：别人赠送',
  `card_no` varchar(255) NOT NULL DEFAULT '' COMMENT '卡编号',
  `card_key` varchar(255) NOT NULL DEFAULT '' COMMENT '卡密',
  `card_cover` varchar(500) NOT NULL DEFAULT '' COMMENT '卡封面',
  `balance` int NOT NULL DEFAULT '0' COMMENT '储值金额',
  `status` varchar(255) NOT NULL DEFAULT '' COMMENT '卡状态',
  `member_id` varchar(255) NOT NULL DEFAULT '0' COMMENT '会员id',
  `validity_time` int NOT NULL DEFAULT '0' COMMENT '有效期',
  `total_num` int NOT NULL DEFAULT '0' COMMENT '使用总数量',
  `use_num` int NOT NULL DEFAULT '0' COMMENT '已使用次数',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  `use_time` int NOT NULL DEFAULT '0' COMMENT '使用时间',
  `activate_time` int NOT NULL DEFAULT '0' COMMENT '激活时间',
  `invalid_time` int NOT NULL DEFAULT '0' COMMENT '失效时间',
  `card_bag_id` INT(11) NOT NULL DEFAULT 0 COMMENT '卡包id',
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡获取表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_card_goods`;
CREATE TABLE `{{prefix}}shop_giftcard_card_goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `card_id` int NOT NULL DEFAULT '0' COMMENT '卡id',
  `giftcard_id` varchar(255) NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '储值金额',
  `goods_id` int NOT NULL DEFAULT '0' COMMENT '商品id',
  `sku_id` int NOT NULL DEFAULT '0' COMMENT '商品规格id',
  `goods_name` varchar(400) NOT NULL DEFAULT '' COMMENT '商品名称',
  `sku_name` varchar(255) NOT NULL DEFAULT '' COMMENT '规格名称',
  `sku_image` varchar(255) NOT NULL DEFAULT '' COMMENT '商品图片',
  `sku_no` varchar(255) NOT NULL DEFAULT '' COMMENT '商品编码',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品销售价',
  `total_num` int NOT NULL DEFAULT '0' COMMENT '总数量',
  `use_num` int NOT NULL DEFAULT '0' COMMENT '已提货数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡获取权益表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_category`;
CREATE TABLE `{{prefix}}shop_giftcard_category` (
  `category_id` int NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `category_name` varchar(255) DEFAULT '' COMMENT '分类名称',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态（0，关闭，1：开启）',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序号',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡分类表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_give`;
CREATE TABLE `{{prefix}}shop_giftcard_give` (
  `give_id` int NOT NULL AUTO_INCREMENT COMMENT '赠予id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `card_id` int NOT NULL DEFAULT 0 COMMENT '卡id',
  `member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
  `blessing` text NOT NULL COMMENT '祝福语',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `validity_time` int NOT NULL DEFAULT 0 COMMENT '有效期',
  `give_num` int NOT NULL DEFAULT 1 COMMENT '本次赠送数量',
  `limit_num` int NOT NULL DEFAULT 0 COMMENT '限制每个会员的领取数量',
  `card_bag_id` int NOT NULL DEFAULT 0 COMMENT '卡包id',
  PRIMARY KEY (`give_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡赠予记录表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_goods`;
CREATE TABLE `{{prefix}}shop_giftcard_goods` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `giftcard_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `goods_id` int NOT NULL DEFAULT '0' COMMENT '关联商品id',
  `sku_id` int NOT NULL DEFAULT '0' COMMENT '关联商品规格id',
  `num` int NOT NULL DEFAULT '0' COMMENT '关联商品数量（实体卡商品数量）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡关联商品表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_log`;
CREATE TABLE `{{prefix}}shop_giftcard_log` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `giftcard_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `card_id` int NOT NULL DEFAULT '0' COMMENT '卡id',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '会员id',
  `type` varchar(50) NOT NULL DEFAULT '' COMMENT '操作类型',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '操作人名称',
  `remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '描述',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡操作日志表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_make`;
CREATE TABLE `{{prefix}}shop_giftcard_make` (
  `make_id` int NOT NULL AUTO_INCREMENT COMMENT '制卡记录id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `giftcard_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `card_right_type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益类型，balance：储值余额，goods：商品',
  `balance_json` mediumtext NOT NULL COMMENT '储值余额面值，多个逗号隔开',
  `make_card_way` varchar(50) NOT NULL DEFAULT '' COMMENT '制卡方式 auto：在线制卡，import：导入',
  `import_path` varchar(500) NOT NULL DEFAULT '' COMMENT '导入文件路径',
  `status` varchar(255) NOT NULL DEFAULT '' COMMENT '状态，wait：未开始，proceed：进行中，finish：完成，fail：失败',
  `total_count` int NOT NULL DEFAULT '0' COMMENT '总数量',
  `success_count` int NOT NULL DEFAULT '0' COMMENT '成功数量',
  `fail_count` int NOT NULL DEFAULT '0' COMMENT '失败数量',
  `fail_remark` varchar(1000) NOT NULL DEFAULT '' COMMENT '失败原因',
  `output` text DEFAULT NULL COMMENT '输出文件路径',
  `fail_output` text DEFAULT NULL COMMENT '失败记录',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`make_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡实体制作表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_material`;
CREATE TABLE `{{prefix}}shop_giftcard_material` (
  `material_id` int NOT NULL AUTO_INCREMENT COMMENT '素材id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `group_id` int NOT NULL DEFAULT '0' COMMENT '素材分组id',
  `url` varchar(500) NOT NULL DEFAULT '' COMMENT '图片地址',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT '0' COMMENT '修改时间',
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡素材表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_material_group`;
CREATE TABLE `{{prefix}}shop_giftcard_material_group` (
  `group_id` int NOT NULL AUTO_INCREMENT COMMENT '素材分组id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `group_name` varchar(255) NOT NULL DEFAULT '' COMMENT '分组名称',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序号',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡素材分组表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_member_card_bag`;
CREATE TABLE `{{prefix}}shop_giftcard_member_card_bag` (
  `card_bag_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '卡包id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `giftcard_id` INT(11) NOT NULL DEFAULT 0 COMMENT '礼品卡活动id',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `to_use_count` INT(11) NOT NULL DEFAULT 0 COMMENT '待使用数量',
  `can_use_count` INT(11) NOT NULL DEFAULT 0 COMMENT '可使用数量',
  `used_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已使用数量',
  `invalid_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已失效数量',
  `total_count` INT(11) NOT NULL DEFAULT 0 COMMENT '总数量',
  `card_right_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益类型，balance：储值余额，goods：商品',
  `balance` INT(11) NOT NULL DEFAULT 0 COMMENT '储值金额',
  `delivery_way` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '提货方式，all：全部提货，batch：分批提货',
  `card_goods_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益商品类型，all：全部，diy：指定商品数量',
  `validity_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '有效期类型，forever：永久有效，day：购买后x天有效，date：指定过期日期',
  `is_give` TINYINT(4) NOT NULL DEFAULT 1 COMMENT '是否允许转赠，0：不允许，1：允许',
  `card_cover` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '卡封面',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`card_bag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡会员卡包表';

DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_member_records`;
CREATE TABLE `{{prefix}}shop_giftcard_member_records` (
  `member_card_id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `card_id` int NOT NULL DEFAULT '0' COMMENT '卡id',
  `from_member_id` int NOT NULL DEFAULT '0' COMMENT '来源会员id',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '领取会员id',
  `to_member_id` int NOT NULL DEFAULT '0' COMMENT '赠予会员id',
  `give_id` int NOT NULL DEFAULT 0 COMMENT '赠予id',
  `is_give` int NOT NULL DEFAULT '0' COMMENT '是否已被转赠',
  `source` varchar(255) NOT NULL DEFAULT '' COMMENT '来源，order：购买，give：别人赠送',
  `get_time` int NOT NULL DEFAULT '0' COMMENT '获取时间',
  `give_time` int NOT NULL DEFAULT '0' COMMENT '赠予时间',
  PRIMARY KEY (`member_card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡会员领取记录表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_order`;
CREATE TABLE `{{prefix}}shop_giftcard_order` (
  `order_id` int NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `order_no` varchar(50) NOT NULL DEFAULT '' COMMENT '订单编号',
  `body` varchar(1000) NOT NULL DEFAULT '' COMMENT '订单内容',
  `order_from` varchar(55) NOT NULL DEFAULT '' COMMENT '订单来源',
  `out_trade_no` varchar(50) NOT NULL DEFAULT '' COMMENT '支付流水号',
  `status` varchar(55) NOT NULL DEFAULT '' COMMENT '订单状态',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '会员id',
  `balance` int NOT NULL DEFAULT '0' COMMENT '储值金额',
  `giftcard_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡id',
  `card_right_type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益类型，balance：储值余额，goods：商品',
  `card_cover` varchar(500) NOT NULL DEFAULT '' COMMENT '礼品卡封面',
  `material_id` int NOT NULL DEFAULT '0' COMMENT '素材id',
  `card_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '礼品卡储值价格',
  `num` int NOT NULL DEFAULT '0' COMMENT '购买数量',
  `delivery_way` varchar(50) NOT NULL DEFAULT '' COMMENT '提货方式，all：全部提货，batch：分批提货',
  `card_goods_type` varchar(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益商品类型，all：全部，diy：指定商品数量',
  `card_goods_count` int NOT NULL DEFAULT '0' COMMENT '权益商品数量',
  `validity_time` int NOT NULL DEFAULT '0' COMMENT '有效时间',
  `is_give` int NOT NULL DEFAULT '0' COMMENT '是否允许转赠',
  `order_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单合计金额',
  `goods_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品金额',
  `pay_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '支付金额',
  `member_remark` varchar(255) NOT NULL DEFAULT '' COMMENT '会员留言信息',
  `shop_remark` varchar(255) NOT NULL DEFAULT '' COMMENT '商家留言',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '下单时间',
  `pay_time` int NOT NULL DEFAULT '0' COMMENT '支付时间',
  `close_time` int NOT NULL DEFAULT '0' COMMENT '订单关闭时间',
  `close_remark` varchar(255) NOT NULL DEFAULT '' COMMENT '关闭原因',
  `delete_time` int NOT NULL DEFAULT '0' COMMENT '是否删除(针对后台)',
  `timeout` int NOT NULL DEFAULT '0' COMMENT '订单超时时间记录',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡订单表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_use_records`;
CREATE TABLE `{{prefix}}shop_giftcard_use_records` (
  `record_id` int NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `giftcard_id` int NOT NULL DEFAULT '0' COMMENT '礼品卡活动id',
  `card_id` int NOT NULL DEFAULT '0' COMMENT '卡id',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '会员id',
  `member_card_id` int NOT NULL DEFAULT '0' COMMENT '会员领取卡id',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡使用记录表';


DROP TABLE IF EXISTS `{{prefix}}shop_giftcard_use_records_goods`;
CREATE TABLE `{{prefix}}shop_giftcard_use_records_goods` (
  `record_goods_id` int NOT NULL AUTO_INCREMENT COMMENT '记录id',
  `records_id` int NOT NULL DEFAULT '0' COMMENT '使用记录id',
  `site_id` int NOT NULL DEFAULT '0' COMMENT '站点id',
  `card_id` int NOT NULL DEFAULT '0' COMMENT '卡id',
  `card_goods_id` int NOT NULL DEFAULT '0' COMMENT '关联礼品卡项权益id',
  `balance` int NOT NULL DEFAULT '0' COMMENT '储值余额',
  `goods_id` int NOT NULL DEFAULT '0' COMMENT '商品id',
  `sku_id` int NOT NULL DEFAULT '0' COMMENT '商品skuid',
  `goods_name` varchar(400) NOT NULL DEFAULT '' COMMENT '商品名称',
  `sku_name` varchar(255) NOT NULL DEFAULT '' COMMENT '规格名称',
  `sku_image` varchar(255) NOT NULL DEFAULT '' COMMENT '商品图片',
  `sku_no` varchar(255) NOT NULL DEFAULT '' COMMENT '商品编码',
  `use_num` int NOT NULL DEFAULT '0' COMMENT '使用数量',
  `order_id` int NOT NULL DEFAULT '0' COMMENT '订单id',
  `create_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`record_goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='礼品卡使用记录权益表';

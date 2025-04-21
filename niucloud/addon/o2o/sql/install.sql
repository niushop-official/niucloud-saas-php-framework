
DROP TABLE IF EXISTS `{{prefix}}o2o_goods`;
CREATE TABLE `{{prefix}}o2o_goods`  (
  `goods_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `goods_cover` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商品封面',
  `goods_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品图片',
  `buy_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '购买须知',
  `goods_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品详情',
  `goods_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '商品分类',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '商品状态（1.正常0下架）',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `sale_num` int NOT NULL DEFAULT 0 COMMENT '销量（总销量）',
  `virtually_sale` int NOT NULL DEFAULT 0 COMMENT '虚拟销量',
  `buy_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '购买类型 reservation-预约 buy-购买',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '售卖价格(最低,查询)',
  `after_sales` int NOT NULL DEFAULT 0 COMMENT '售后服务1-支持',
  `price_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '价目表',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '修改时间',
  `delete_time` int NOT NULL DEFAULT 0 COMMENT '删除时间',
  `is_delete` int NOT NULL DEFAULT 0 COMMENT '是否删除',
  `poster_id` int NOT NULL DEFAULT 0 COMMENT '海报id',
  `member_discount` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price',
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '项目表' ROW_FORMAT = Compact;


DROP TABLE IF EXISTS `{{prefix}}o2o_goods_category`;
CREATE TABLE `{{prefix}}o2o_goods_category`  (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL,
  `category_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `pid` int NOT NULL DEFAULT 0 COMMENT '分类上级',
  `level` int NOT NULL DEFAULT 0 COMMENT '层级',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类图片',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '添加时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = ' 商品分类' ROW_FORMAT = Compact;


DROP TABLE IF EXISTS `{{prefix}}o2o_goods_sku`;
CREATE TABLE `{{prefix}}o2o_goods_sku`  (
  `sku_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '商品sku_id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `sku_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商品sku名称',
  `sku_image` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'sku主图',
  `sku_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商品sku编码',
  `goods_id` int NOT NULL DEFAULT 0 COMMENT '商品id',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT 'sku单价',
  `market_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '划线价',
  `sale_num` int NOT NULL DEFAULT 0 COMMENT '销量',
  `sku_unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'sku单位名称',
  `min_buy` int NOT NULL DEFAULT 0 COMMENT '最小服务量',
  `is_default` tinyint NOT NULL DEFAULT 0 COMMENT '是否默认',
  `member_price` text COLLATE utf8mb4_general_ci COMMENT '会员价，json格式，指定会员价，数据结构为：{"level_1":"10.00","level_2":"10.00"}',
  PRIMARY KEY (`sku_id`) USING BTREE,
  INDEX `idx_goods_sku_is_default`(`is_default`) USING BTREE,
  INDEX `idx_goods_sku_price`(`price`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 AVG_ROW_LENGTH = 16384 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '项目规格表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `{{prefix}}o2o_hour_stat`;
CREATE TABLE `{{prefix}}o2o_hour_stat`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '年月日',
  `hour` int NOT NULL DEFAULT 0 COMMENT '时',
  `date_time` int NOT NULL DEFAULT 0 COMMENT '时间戳',
  `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收款金额',
  `order_num` int NOT NULL DEFAULT 0 COMMENT '订单数',
  `refund_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  `refund_num` int NOT NULL DEFAULT 0 COMMENT '退款数量',
  `item_order_num` int NOT NULL DEFAULT 0 COMMENT '报单数',
  `item_order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '报单金额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `{{prefix}}o2o_order`;
CREATE TABLE `{{prefix}}o2o_order`  (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `order_from` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单来源',
  `order_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单类型',
  `out_trade_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '支付流水号',
  `order_status` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单状态',
  `refund_status` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '退款状态',
  `member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
  `ip` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员ip',
  `member_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员留言信息',
  `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `pay_time` int NOT NULL DEFAULT 0 COMMENT '订单支付时间',
  `dispatch_time` int NULL DEFAULT NULL COMMENT '派单时间',
  `service_time` int NOT NULL DEFAULT 0 COMMENT '服务时间',
  `close_time` int NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
  `finish_time` int NOT NULL DEFAULT 0 COMMENT '订单完成时间',
  `auto_close_time` int NOT NULL DEFAULT 0,
  `delete_time` int NOT NULL DEFAULT 0 COMMENT '是否删除(针对后台)',
  `is_enable_refund` int NOT NULL DEFAULT 0 COMMENT '是否允许退款',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商家留言',
  `pay_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付金额',
  `order_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `is_evaluate` int NOT NULL DEFAULT 0 COMMENT '是否评论',
  `reserve_service_time` varchar(50) NOT NULL DEFAULT '' COMMENT '客户希望服务时间',
  `reserve_service_time_stamp` int(0) NOT NULL DEFAULT 0 COMMENT '客户希望服务时间时间戳',
  `technician_id` int NOT NULL DEFAULT 0 COMMENT '技师id',
  `taker_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货人',
  `taker_mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货人手机号',
  `taker_province` int NOT NULL DEFAULT 0 COMMENT '收货省',
  `taker_city` int NOT NULL DEFAULT 0 COMMENT '收货市',
  `taker_district` int NOT NULL DEFAULT 0 COMMENT '收货区县',
  `taker_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货地址',
  `taker_full_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货详细地址',
  `taker_longitude` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货地址经度',
  `taker_latitude` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收货详细纬度',
  `check_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '上门校验码',
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 146 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_order_item`;
CREATE TABLE `{{prefix}}o2o_order_item`  (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL DEFAULT 0 COMMENT '订单id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int NOT NULL DEFAULT 0 COMMENT '购买会员id',
  `item_id` int NOT NULL DEFAULT 0 COMMENT '项目id',
  `item_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目类型reservation-预约 buy-一口价 custom-自定义',
  `item_name` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目名称',
  `item_image` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目图片',
  `unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '单位',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目单价',
  `num` int NOT NULL DEFAULT 0 COMMENT '购买数量',
  `item_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目总价',
  `is_refund` int NOT NULL DEFAULT 0 COMMENT '是否退款',
  `refund_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '退款编号',
  `refund_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '退款状态',
  `out_trade_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '支付流水号',
  `pay_time` int NOT NULL DEFAULT 0 COMMENT '支付时间',
  `technician_id` int NOT NULL DEFAULT 0 COMMENT '技师id',
  `is_enable_refund` int NOT NULL DEFAULT 0 COMMENT '是否允许退款',
  `goods_id` int NOT NULL DEFAULT 0,
  `item_images` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '项目报单图片',
  PRIMARY KEY (`order_item_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 165 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '家政订单商品表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `{{prefix}}o2o_order_log`;
CREATE TABLE `{{prefix}}o2o_order_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL DEFAULT 0 COMMENT '订单id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作内容',
  `uid` int NOT NULL DEFAULT 0 COMMENT '操作人id',
  `nick_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作人名称',
  `order_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单状态，操作后',
  `action_way` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作类型 member 买家 user卖家  system系统任务',
  `order_status_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单状态名称，操作后',
  `action_time` int NOT NULL DEFAULT 0 COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 303 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单操作记录表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_order_refund`;
CREATE TABLE `{{prefix}}o2o_order_refund`  (
  `refund_id` int NOT NULL AUTO_INCREMENT,
  `order_item_id` int NOT NULL DEFAULT 0,
  `order_id` int NOT NULL DEFAULT 0 COMMENT '订单id',
  `refund_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '退款单号',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
  `money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总退款',
  `status` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '退款状态',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `audit_time` int NOT NULL DEFAULT 0 COMMENT '审核时间',
  `transfer_time` int NOT NULL DEFAULT 0 COMMENT '转账时间',
  `refuse_reason` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源 system 系统 member 会员',
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '退款原因 ',
  `apply_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '申请退款',
  `remark` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `voucher` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '凭证',
  PRIMARY KEY (`refund_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '家政订单退款表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_order_refund_log`;
CREATE TABLE `{{prefix}}o2o_order_refund_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `refund_id` int NOT NULL DEFAULT 0,
  `site_id` int NOT NULL DEFAULT 0,
  `action` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '操作内容',
  `action_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `uid` int NOT NULL DEFAULT 0,
  `action_way` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '操作类型 member 买家 use 卖家 system 系统',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 107 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单维权日志表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_position`;
CREATE TABLE `{{prefix}}o2o_position`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `create_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '技师岗位表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_stat`;
CREATE TABLE `{{prefix}}o2o_stat`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '年月日',
  `date_time` int NOT NULL DEFAULT 0 COMMENT '时间戳',
  `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收款金额',
  `order_num` int NOT NULL DEFAULT 0 COMMENT '订单数',
  `refund_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  `refund_num` int NOT NULL DEFAULT 0 COMMENT '退款数量',
  `item_order_num` int NOT NULL DEFAULT 0 COMMENT '报单数',
  `item_order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '报单金额',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_technician`;
CREATE TABLE `{{prefix}}o2o_technician`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `member_id` int NOT NULL DEFAULT 0,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int NOT NULL DEFAULT 0 COMMENT '年龄',
  `sex` tinyint NOT NULL DEFAULT 0 COMMENT '性别 0保密 1男 2女',
  `mobile` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `working_age` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '工龄/年',
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '状态1-正常 0-休息中 -1离职',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '标签,逗号分割',
  `position_id` int NOT NULL DEFAULT 0 COMMENT '岗位',
  `position_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '岗位名称',
  `order_num` int NOT NULL DEFAULT 0 COMMENT '订单数',
  `service_time` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '服务小时',
  `bad_evaluate` int NOT NULL DEFAULT 0 COMMENT '差评数量',
  `create_time` int NOT NULL DEFAULT 0,
  `delete_time` int NOT NULL DEFAULT 0 COMMENT '删除时间',
  `headimg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像',
  `images` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '简介',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '技师表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `{{prefix}}o2o_technician_evaluate`;
CREATE TABLE `{{prefix}}o2o_technician_evaluate`  (
  `evaluate_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `order_id` int NOT NULL DEFAULT 0 COMMENT '订单id',
  `order_item_id` int NOT NULL DEFAULT 0 COMMENT '订单项ID',
  `goods_id` int NOT NULL DEFAULT 0 COMMENT '商品ID',
  `technician_id` int NOT NULL DEFAULT 0 COMMENT '技师id',
  `member_id` int NOT NULL DEFAULT 0 COMMENT '会员ID',
  `member_head` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员头像',
  `member_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员名称',
  `content` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评价内容',
  `images` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '评价图片',
  `is_anonymous` tinyint NOT NULL DEFAULT 1 COMMENT '1匿名  2不匿名',
  `scores` tinyint NOT NULL DEFAULT 1 COMMENT '评论分数 1-5',
  `is_audit` tinyint NOT NULL DEFAULT 1 COMMENT '审核状态 1待审 2通过 3拒绝',
  `explain_first` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '解释内容',
  `topping` int NOT NULL DEFAULT 0 COMMENT '排序 置顶',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '评论时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`evaluate_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 AVG_ROW_LENGTH = 8192 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '技师评价表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `{{prefix}}o2o_technician_goods`;
CREATE TABLE `{{prefix}}o2o_technician_goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_id` int NOT NULL DEFAULT 0,
  `technician_id` int NOT NULL DEFAULT 0,
  `goods_id` int NOT NULL DEFAULT 0 COMMENT '项目id',
  `create_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 239 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '技师项目表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `{{prefix}}o2o_member_collect`;
CREATE TABLE `{{prefix}}o2o_member_collect`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL DEFAULT 0 COMMENT '会员id',
  `site_id` int NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_id` int NOT NULL DEFAULT 0 COMMENT '商品id',
  `create_time` int NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '收藏类型',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_member_collect_goods`(`goods_id`) USING BTREE,
  INDEX `IDX_member_collect_member`(`member_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

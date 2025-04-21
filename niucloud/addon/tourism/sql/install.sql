
DROP TABLE IF EXISTS `{{prefix}}tourism_way`;

CREATE TABLE {{prefix}}tourism_way (
  way_id int NOT NULL AUTO_INCREMENT COMMENT '线路id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  way_name varchar(255) DEFAULT '' COMMENT '线路名称',
  group_buy_type varchar(255) NOT NULL DEFAULT '' COMMENT '团购类型',
  way_theme varchar(255) NOT NULL DEFAULT '' COMMENT '线路主题',
  travel_type varchar(255) NOT NULL DEFAULT '' COMMENT '出游类型',
  way_traffic varchar(255) NOT NULL DEFAULT '' COMMENT '交通工具',
  way_status tinyint NOT NULL DEFAULT 1 COMMENT '线路状态',
  start_city varchar(255) NOT NULL COMMENT '出发城市',
  end_city varchar(255) NOT NULL COMMENT '目的地',
  way_character text DEFAULT NULL COMMENT '线路特点',
  fee_desc text DEFAULT NULL COMMENT '费用说明',
  way_cover varchar(255) NOT NULL DEFAULT '' COMMENT '线路封面',
  way_image text NOT NULL COMMENT '线路图片',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  update_time int NOT NULL DEFAULT 0 COMMENT '更新时间',
  poster_id int NOT NULL DEFAULT 0 COMMENT '海报id',
  PRIMARY KEY (way_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游线路';

DROP TABLE IF EXISTS `{{prefix}}tourism_verifier`;

CREATE TABLE {{prefix}}tourism_verifier (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  member_id int NOT NULL DEFAULT 0,
  create_time int NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '核销员表';

DROP TABLE IF EXISTS `{{prefix}}tourism_tourist`;

CREATE TABLE {{prefix}}tourism_tourist (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  member_id int NOT NULL DEFAULT 0,
  name varchar(10) NOT NULL DEFAULT '',
  id_card varchar(100) NOT NULL DEFAULT '',
  mobile varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '游客信息表';

DROP TABLE IF EXISTS `{{prefix}}tourism_stat`;

CREATE TABLE {{prefix}}tourism_stat (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  date varchar(20) NOT NULL DEFAULT '' COMMENT '年月日',
  date_time int NOT NULL DEFAULT 0 COMMENT '时间戳',
  hotel_order_num int NOT NULL DEFAULT 0 COMMENT '酒店订单下单数',
  hotel_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '酒店订单下单金额',
  scenic_order_num int NOT NULL DEFAULT 0 COMMENT '景点门票订单下单数',
  scenic_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '景点门票订单下单金额',
  way_order_num int NOT NULL DEFAULT 0 COMMENT '线路订单下单数',
  way_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '线路订单下单金额',
  refund_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  refund_num int NOT NULL DEFAULT 0 COMMENT '退款单数',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游统计信息';

DROP TABLE IF EXISTS `{{prefix}}tourism_scenic`;

CREATE TABLE {{prefix}}tourism_scenic (
  scenic_id int NOT NULL AUTO_INCREMENT COMMENT '景点id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  scenic_name varchar(255) NOT NULL DEFAULT '' COMMENT '景点名称',
  scenic_cover varchar(255) NOT NULL DEFAULT '' COMMENT '景点封面',
  scenic_images varchar(3000) NOT NULL DEFAULT '' COMMENT '景区图片',
  province_id int NOT NULL DEFAULT 0 COMMENT '所在省份',
  city_id int NOT NULL DEFAULT 0 COMMENT '所在市',
  district_id int NOT NULL DEFAULT 0 COMMENT '所在区县',
  address varchar(255) NOT NULL DEFAULT '' COMMENT '地址',
  full_address varchar(255) NOT NULL DEFAULT '' COMMENT '完整地址',
  longitude varchar(255) NOT NULL DEFAULT '' COMMENT '经度',
  latitude varchar(255) NOT NULL DEFAULT '' COMMENT '纬度',
  scenic_level tinyint NOT NULL DEFAULT 1 COMMENT '景区级别',
  open_time varchar(255) NOT NULL DEFAULT '' COMMENT '开放时间',
  telephone varchar(255) NOT NULL DEFAULT '' COMMENT '联系电话',
  scenic_desc text DEFAULT NULL COMMENT '景区介绍',
  surround text DEFAULT NULL COMMENT '景区周边',
  scenic_status tinyint NOT NULL DEFAULT 1 COMMENT '景点上架状态',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  update_time int NOT NULL DEFAULT 0 COMMENT '修改时间',
  poster_id int NOT NULL DEFAULT 0 COMMENT '海报id',
  PRIMARY KEY (scenic_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '景点管理';

DROP TABLE IF EXISTS `{{prefix}}tourism_order_refund_log`;

CREATE TABLE {{prefix}}tourism_order_refund_log (
  id int NOT NULL AUTO_INCREMENT,
  refund_id int NOT NULL DEFAULT 0,
  site_id int NOT NULL DEFAULT 0,
  action varchar(2000) NOT NULL DEFAULT '0' COMMENT '操作内容',
  action_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  uid int NOT NULL DEFAULT 0,
  action_way varchar(10) NOT NULL DEFAULT '' COMMENT '操作类型 member 买家 use 卖家 system 系统',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游订单维权日志表';

DROP TABLE IF EXISTS `{{prefix}}tourism_order_refund`;

CREATE TABLE {{prefix}}tourism_order_refund (
  refund_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  order_id int NOT NULL DEFAULT 0 COMMENT '订单id',
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  refund_no varchar(255) NOT NULL DEFAULT '' COMMENT '退款编号',
  money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  commission decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '手续费',
  status varchar(20) NOT NULL DEFAULT '' COMMENT '退款状态',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  audit_time int NOT NULL DEFAULT 0 COMMENT '审核时间',
  transfer_time int NOT NULL DEFAULT 0 COMMENT '退款转账完成时间',
  order_type varchar(255) NOT NULL DEFAULT '' COMMENT '退款订单类型',
  source varchar(10) NOT NULL DEFAULT '' COMMENT '来源 system 系统 member 会员',
  refuse_reason varchar(2000) NOT NULL DEFAULT '' COMMENT '拒绝原因',
  PRIMARY KEY (refund_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游订单退款记录表';

DROP TABLE IF EXISTS `{{prefix}}tourism_order_log`;

CREATE TABLE {{prefix}}tourism_order_log (
  id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL DEFAULT 0 COMMENT '订单id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  action varchar(255) NOT NULL DEFAULT '' COMMENT '操作内容',
  uid int NOT NULL DEFAULT 0 COMMENT '操作人id',
  nick_name varchar(50) NOT NULL DEFAULT '' COMMENT '操作人名称',
  order_status int NOT NULL DEFAULT 0 COMMENT '订单状态，操作后',
  action_way varchar(10) NOT NULL DEFAULT '' COMMENT '操作类型 member 买家 user卖家  system系统任务',
  order_status_name varchar(255) NOT NULL DEFAULT '' COMMENT '订单状态名称，操作后',
  action_time int NOT NULL DEFAULT 0 COMMENT '操作时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游订单操作记录表',
ROW_FORMAT = COMPACT;

DROP TABLE IF EXISTS `{{prefix}}tourism_order_item`;

CREATE TABLE {{prefix}}tourism_order_item (
  order_item_id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL DEFAULT 0,
  site_id int NOT NULL DEFAULT 0,
  member_id int NOT NULL DEFAULT 0,
  goods_id int NOT NULL DEFAULT 0,
  price decimal(10, 2) NOT NULL DEFAULT 0.00,
  goods_money decimal(10, 2) NOT NULL DEFAULT 0.00,
  num int NOT NULL DEFAULT 0 COMMENT '购买数量',
  year smallint NOT NULL DEFAULT 0 COMMENT '年',
  month smallint NOT NULL DEFAULT 0 COMMENT '月',
  day smallint NOT NULL DEFAULT 0 COMMENT '日',
  time int NOT NULL DEFAULT 0,
  goods_name varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  goods_image varchar(2000) NOT NULL DEFAULT '' COMMENT '商品图片',
  PRIMARY KEY (order_item_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游订单项表';

DROP TABLE IF EXISTS `{{prefix}}tourism_order`;

CREATE TABLE {{prefix}}tourism_order (
  order_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  member_id int NOT NULL DEFAULT 0 COMMENT '下单会员',
  order_from varchar(255) NOT NULL DEFAULT '' COMMENT '订单来源',
  order_type varchar(255) NOT NULL DEFAULT '' COMMENT '订单类型',
  order_no varchar(255) NOT NULL DEFAULT '' COMMENT '订单编号',
  out_trade_no varchar(255) NOT NULL DEFAULT '' COMMENT '订单交易号',
  order_status varchar(255) NOT NULL DEFAULT '' COMMENT '订单状态',
  refund_status varchar(255) NOT NULL DEFAULT '' COMMENT '维权状态',
  refund_no varchar(255) NOT NULL DEFAULT '' COMMENT '退款编号',
  ip varchar(255) NOT NULL DEFAULT '' COMMENT '下单地址',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  pay_time int NOT NULL DEFAULT 0 COMMENT '支付时间',
  close_time int NOT NULL DEFAULT 0 COMMENT '关闭时间',
  auto_close_time int NOT NULL DEFAULT 0 COMMENT '订单自动关闭时间',
  is_enable_refund int NOT NULL DEFAULT 0 COMMENT '是否允许申请退款',
  delete_time int NOT NULL DEFAULT 0 COMMENT '删除时间',
  order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  pay_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '实付金额',
  buyer_info text NOT NULL COMMENT '购买人信息',
  start_time varchar(255) NOT NULL DEFAULT '' COMMENT '开始时间',
  end_time varchar(255) NOT NULL DEFAULT '' COMMENT '结束时间',
  days int NOT NULL DEFAULT 0 COMMENT '购买天数',
  num int NOT NULL DEFAULT 0 COMMENT '购买数量',
  hotel_id int NOT NULL DEFAULT 0 COMMENT '酒店房型id',
  way_id int NOT NULL DEFAULT 0 COMMENT '路线id',
  scenic_id int NOT NULL DEFAULT 0 COMMENT '景点id',
  goods_id int NOT NULL DEFAULT 0 COMMENT '商品id',
  goods_name varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  full_goods_name varchar(255) NOT NULL DEFAULT '' COMMENT '酒店 景点 路线名称 加商品名称',
  goods_image varchar(255) NOT NULL DEFAULT '' COMMENT '商品图片',
  mobile varchar(255) NOT NULL DEFAULT '' COMMENT '联系方式',
  verify_code varchar(255) NOT NULL DEFAULT '' COMMENT '核销码',
  verify_time int NOT NULL DEFAULT 0 COMMENT '核销时间',
  verifier_id int NOT NULL DEFAULT 0 COMMENT '核销人',
  verifier_type varchar(10) NOT NULL DEFAULT '' COMMENT '核销人类型',
  PRIMARY KEY (order_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游订单表';

DROP TABLE IF EXISTS `{{prefix}}tourism_hour_stat`;

CREATE TABLE {{prefix}}tourism_hour_stat (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  date varchar(20) NOT NULL DEFAULT '' COMMENT '年月日',
  hour int NOT NULL DEFAULT 0 COMMENT '时',
  date_time int NOT NULL DEFAULT 0 COMMENT '时间戳',
  hotel_order_num int NOT NULL DEFAULT 0 COMMENT '酒店订单下单数',
  hotel_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '酒店订单下单金额',
  scenic_order_num int NOT NULL DEFAULT 0 COMMENT '景点门票订单下单数',
  scenic_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '景点门票订单下单金额',
  way_order_num int NOT NULL DEFAULT 0 COMMENT '线路订单下单数',
  way_order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '线路订单下单金额',
  refund_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  refund_num int NOT NULL DEFAULT 0 COMMENT '退款单数',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '旅游时统计信息';

DROP TABLE IF EXISTS `{{prefix}}tourism_hotel`;

CREATE TABLE {{prefix}}tourism_hotel (
  hotel_id int NOT NULL AUTO_INCREMENT COMMENT '酒店ID',
  hotel_star tinyint NOT NULL DEFAULT 0 COMMENT '酒店星级',
  hotel_tag VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '酒店标签，多个，隔开',
  hotel_desc text DEFAULT NULL COMMENT '酒店介绍',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  hotel_name varchar(255) NOT NULL DEFAULT '' COMMENT '酒店名称',
  hotel_cover varchar(1000) NOT NULL DEFAULT '' COMMENT '酒店封面',
  hotel_images text DEFAULT NULL COMMENT '酒店图片',
  hotel_attribute text DEFAULT NULL COMMENT '酒店参数',
  province_id int NOT NULL DEFAULT 0 COMMENT '省id',
  city_id int NOT NULL DEFAULT 0 COMMENT '市id',
  district_id int NOT NULL DEFAULT 0 COMMENT '区县id',
  address varchar(255) NOT NULL DEFAULT '' COMMENT '地址',
  full_address varchar(1000) NOT NULL DEFAULT '' COMMENT '完整地址',
  longitude varchar(255) NOT NULL DEFAULT '' COMMENT '经度',
  latitude varchar(255) NOT NULL DEFAULT '' COMMENT '纬度',
  hotel_status tinyint NOT NULL DEFAULT 1 COMMENT '酒店状态',
  around_traffic text DEFAULT NULL COMMENT '周边交通',
  around_food text DEFAULT NULL COMMENT '周边美食',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  is_delete tinyint NOT NULL DEFAULT 0 COMMENT '是否删除',
  delete_time int NOT NULL DEFAULT 0 COMMENT '删除时间',
  poster_id int NOT NULL DEFAULT 0 COMMENT '海报id',
  PRIMARY KEY (hotel_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '酒店表';

DROP TABLE IF EXISTS `{{prefix}}tourism_goods_day`;

CREATE TABLE {{prefix}}tourism_goods_day (
  id int NOT NULL AUTO_INCREMENT COMMENT '主键',
  goods_id int NOT NULL DEFAULT 0 COMMENT '商品id',
  price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售价格',
  sale_price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '实际卖价',
  stock_all int NOT NULL DEFAULT 0 COMMENT '总库存',
  stock int NOT NULL DEFAULT 0 COMMENT '库存（未使用）',
  sell_num int NOT NULL DEFAULT 0 COMMENT '销售数量',
  year int NOT NULL DEFAULT 2023 COMMENT '年份',
  month int NOT NULL DEFAULT 1 COMMENT '月份',
  day int NOT NULL DEFAULT 1 COMMENT '日期',
  is_set tinyint NOT NULL DEFAULT 0 COMMENT '是否单独设置',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  update_time int NOT NULL DEFAULT 0 COMMENT '修改时间',
  time int NOT NULL DEFAULT 0 COMMENT '当天开始时间',
  time_date varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  member_price int NOT NULL DEFAULT 0 COMMENT '会员价是否参与',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '商品单日信息（门票，酒店）';

DROP TABLE IF EXISTS `{{prefix}}tourism_goods_attr`;

CREATE TABLE {{prefix}}tourism_goods_attr (
  label_id int NOT NULL COMMENT '标签id',
  goods_type varchar(255) NOT NULL DEFAULT '' COMMENT '商品类型',
  attr_type varchar(255) NOT NULL DEFAULT '' COMMENT '参数类型',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  label_name varchar(255) NOT NULL DEFAULT '' COMMENT '标签名称',
  is_sys tinyint NOT NULL DEFAULT 0 COMMENT '是否是系统标签',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  PRIMARY KEY (label_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '商品参数';

DROP TABLE IF EXISTS `{{prefix}}tourism_goods`;

CREATE TABLE {{prefix}}tourism_goods (
  goods_id int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  goods_name varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  goods_type varchar(255) NOT NULL DEFAULT '' COMMENT '商品种类ticket,room,way',
  hotel_id int NOT NULL DEFAULT 0 COMMENT '商品种类对应id（酒店，房间）',
  way_id int NOT NULL DEFAULT 0 COMMENT '路线id',
  scenic_id int NOT NULL DEFAULT 0 COMMENT '景点id（景点）',
  goods_cover varchar(2000) NOT NULL DEFAULT '' COMMENT '商品封面',
  goods_image text DEFAULT NULL COMMENT '商品图片',
  goods_content text DEFAULT NULL COMMENT '商品详情',
  goods_attribute text DEFAULT NULL COMMENT '商品属性参数（json）',
  buy_info text NOT NULL COMMENT '购买须知',
  sale_num int NOT NULL DEFAULT 0 COMMENT '销量',
  status tinyint NOT NULL DEFAULT 1 COMMENT '商品状态（1.正常0下架）',
  sort int NOT NULL DEFAULT 0 COMMENT '排序',
  price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '商品单价',
  sale_price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '实际卖价（有活动显示活动价，默认原价）',
  cost_price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '成本价',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  stock int NOT NULL DEFAULT 0 COMMENT '库存（针对不按具体时间有效）',
  sell_type tinyint NOT NULL DEFAULT 1 COMMENT '销售方式（1.按照具体日期2.不限具体时间）',
  update_time int NOT NULL DEFAULT 0 COMMENT '更新时间',
  is_delete tinyint NOT NULL DEFAULT 0 COMMENT '是否已经删除',
  delete_time int NOT NULL DEFAULT 0 COMMENT '删除时间',
  room_bed varchar(255) NOT NULL DEFAULT '' COMMENT '床型大小（room）',
  room_area decimal(5, 2) NOT NULL DEFAULT 0.00 COMMENT '房间大小（room）',
  room_stay varchar(255) NOT NULL DEFAULT '' COMMENT '入住人数（room）',
  room_floor varchar(255) NOT NULL DEFAULT '' COMMENT '入住楼层（room）',
  is_default tinyint NOT NULL DEFAULT 0 COMMENT '是否默认',
  member_discount varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员等级折扣，不参与：空，会员折扣：discount',
  fixed_discount text COLLATE utf8mb4_general_ci COMMENT '等级折扣',
  PRIMARY KEY (goods_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '商品表';


DROP TABLE IF EXISTS {{prefix}}vipcard_verifier;

CREATE TABLE {{prefix}}vipcard_verifier (
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


DROP TABLE IF EXISTS {{prefix}}vipcard_stat;

CREATE TABLE {{prefix}}vipcard_stat (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  date varchar(20) NOT NULL DEFAULT '' COMMENT '年月日',
  date_time int NOT NULL DEFAULT 0 COMMENT '时间戳',
  order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收款金额',
  order_num int NOT NULL DEFAULT 0 COMMENT '订单数',
  refund_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  refund_num int NOT NULL DEFAULT 0 COMMENT '退款数量',
  reserve_num int NOT NULL DEFAULT 0 COMMENT '预约单数',
  buy_card_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '开卡订单金额',
  buy_card_num int NOT NULL DEFAULT 0 COMMENT '开卡订单数',
  buy_service_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '服务订单金额',
  buy_service_num int NOT NULL DEFAULT 0 COMMENT '服务订单数',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;


DROP TABLE IF EXISTS {{prefix}}vipcard_reserve_user;

CREATE TABLE {{prefix}}vipcard_reserve_user (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL DEFAULT '' COMMENT '会员ID',
  mobile varchar(255) NOT NULL DEFAULT '',
  seniority varchar(255) NOT NULL DEFAULT '' COMMENT '工龄',
  number int NOT NULL COMMENT '工号',
  position varchar(255) NOT NULL DEFAULT '' COMMENT '职位',
  headimg varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  site_id int NOT NULL,
  create_time int NOT NULL DEFAULT 0,
  status int NOT NULL DEFAULT 1 COMMENT '0 禁用 1 正常',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;


DROP TABLE IF EXISTS {{prefix}}vipcard_reserve;

CREATE TABLE {{prefix}}vipcard_reserve (
  reserve_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点',
  member_id int NOT NULL DEFAULT 0 COMMENT '预约会员',
  reserve_name varchar(255) NOT NULL DEFAULT '' COMMENT '预约人姓名',
  reserve_time int NOT NULL DEFAULT 0 COMMENT '预约时间',
  reserve_state varchar(255) NOT NULL DEFAULT '' COMMENT '预约状态',
  remark varchar(255) NOT NULL DEFAULT '' COMMENT '预约备注',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  complete_time int NOT NULL DEFAULT 0 COMMENT '完成时间',
  to_store_time int NOT NULL DEFAULT 0 COMMENT '到店时间',
  cancel_time int NOT NULL DEFAULT 0 COMMENT '取消时间',
  source tinyint NOT NULL DEFAULT 1 COMMENT '来源1客户预约2后台添加',
  goods_id int NOT NULL COMMENT '预约项目',
  reserve_date varchar(255) NOT NULL DEFAULT '' COMMENT '预约时间',
  order_id int NOT NULL DEFAULT 0 COMMENT '关联订单',
  is_need_pay int NOT NULL DEFAULT 0 COMMENT '是否需支付',
  pay_time int NOT NULL DEFAULT 0 COMMENT '支付时间',
  technician_id int NOT NULL DEFAULT 0 COMMENT '技师ID',
  mobile varchar(50) NOT NULL DEFAULT '' COMMENT '客户联系方式',
  PRIMARY KEY (reserve_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '预约表';


DROP TABLE IF EXISTS {{prefix}}vipcard_order_refund_log;

CREATE TABLE {{prefix}}vipcard_order_refund_log (
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
COMMENT = '卡项订单维权日志表';


DROP TABLE IF EXISTS {{prefix}}vipcard_order_refund;

CREATE TABLE {{prefix}}vipcard_order_refund (
  refund_id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL DEFAULT 0 COMMENT '订单id',
  refund_no varchar(255) NOT NULL DEFAULT '0' COMMENT '退款单号',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '总退款',
  status varchar(30) NOT NULL DEFAULT '0' COMMENT '退款状态',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  audit_time int NOT NULL DEFAULT 0 COMMENT '审核时间',
  transfer_time int NOT NULL DEFAULT 0 COMMENT '转账时间',
  refuse_reason varchar(2000) NOT NULL DEFAULT '',
  source varchar(255) NOT NULL DEFAULT '' COMMENT '来源 system 系统 member 会员',
  PRIMARY KEY (refund_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员卡订单退款表';


DROP TABLE IF EXISTS {{prefix}}vipcard_order_log;

CREATE TABLE {{prefix}}vipcard_order_log (
  id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL DEFAULT 0 COMMENT '订单id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  action varchar(255) NOT NULL DEFAULT '' COMMENT '操作内容',
  uid int NOT NULL DEFAULT 0 COMMENT '操作人id',
  nick_name varchar(50) NOT NULL DEFAULT '' COMMENT '操作人名称',
  order_status varchar(10) NOT NULL DEFAULT '' COMMENT '订单状态，操作后',
  action_way varchar(10) NOT NULL DEFAULT '' COMMENT '操作类型 member 买家 user卖家  system系统任务',
  order_status_name varchar(255) NOT NULL DEFAULT '' COMMENT '订单状态名称，操作后',
  action_time int NOT NULL DEFAULT 0 COMMENT '操作时间',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '订单操作记录表';


DROP TABLE IF EXISTS {{prefix}}vipcard_order_item;

CREATE TABLE {{prefix}}vipcard_order_item (
  order_item_id int NOT NULL AUTO_INCREMENT,
  order_id int NOT NULL DEFAULT 0 COMMENT '订单id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  member_id int NOT NULL DEFAULT 0 COMMENT '购买会员id',
  item_id int NOT NULL DEFAULT 0 COMMENT '项目id',
  item_type varchar(255) NOT NULL DEFAULT '' COMMENT '项目类型',
  item_name varchar(400) NOT NULL DEFAULT '' COMMENT '项目名称',
  item_image varchar(2000) NOT NULL DEFAULT '' COMMENT '项目图片',
  price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目单价',
  num int NOT NULL DEFAULT 0 COMMENT '购买数量',
  item_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '项目总价',
  is_refund int NOT NULL DEFAULT 0 COMMENT '是否退款',
  refund_no varchar(255) NOT NULL DEFAULT '' COMMENT '退款编号',
  refund_status int NOT NULL DEFAULT 0 COMMENT '退款状态',
  PRIMARY KEY (order_item_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员卡订单商品表';


DROP TABLE IF EXISTS {{prefix}}vipcard_order;

CREATE TABLE {{prefix}}vipcard_order (
  order_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  order_no varchar(50) NOT NULL DEFAULT '' COMMENT '订单编号',
  order_from varchar(55) NOT NULL DEFAULT '' COMMENT '订单来源',
  order_type varchar(50) NOT NULL DEFAULT '' COMMENT '订单类型',
  out_trade_no varchar(50) NOT NULL DEFAULT '' COMMENT '支付流水号',
  order_status varchar(30) NOT NULL DEFAULT '' COMMENT '订单状态',
  refund_status varchar(30) NOT NULL DEFAULT '' COMMENT '退款状态',
  refund_no varchar(255) NOT NULL DEFAULT '' COMMENT '退款单号',
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  ip varchar(20) NOT NULL DEFAULT '' COMMENT '会员ip',
  member_message varchar(50) NOT NULL DEFAULT '' COMMENT '会员留言信息',
  order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  pay_time int NOT NULL DEFAULT 0 COMMENT '订单支付时间',
  close_time int NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
  auto_close_time int NOT NULL DEFAULT 0,
  delete_time int NOT NULL DEFAULT 0 COMMENT '是否删除(针对后台)',
  is_enable_refund int NOT NULL DEFAULT 0 COMMENT '是否允许退款',
  remark varchar(255) NOT NULL DEFAULT '' COMMENT '商家留言',
  pay_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '支付金额',
  order_name varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (order_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '订单表';


DROP TABLE IF EXISTS {{prefix}}vipcard_member_card_verify;

CREATE TABLE {{prefix}}vipcard_member_card_verify (
  id int NOT NULL AUTO_INCREMENT,
  card_id int NOT NULL DEFAULT 0,
  site_id int NOT NULL DEFAULT 0,
  card_item_id int NOT NULL DEFAULT 0,
  verify_code varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '核销码',
  verifier_id int NOT NULL DEFAULT 0 COMMENT '核销员',
  verifier_type varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  num int NOT NULL DEFAULT 0,
  create_time int NOT NULL DEFAULT 0,
  member_id int NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员卡项核销使用记录';


DROP TABLE IF EXISTS {{prefix}}vipcard_member_card_item;

CREATE TABLE {{prefix}}vipcard_member_card_item (
  item_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  card_id int NOT NULL DEFAULT 0 COMMENT '会员卡项id',
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  goods_id int NOT NULL DEFAULT 0 COMMENT '项目id',
  num int NOT NULL DEFAULT 0 COMMENT '商品次数/数量',
  use_num int NOT NULL DEFAULT 0 COMMENT '使用次数/数量',
  expire_time int NOT NULL DEFAULT 0 COMMENT '有效期',
  verify_code varchar(255) NOT NULL DEFAULT '' COMMENT '核销码',
  PRIMARY KEY (item_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员卡项内容表';


DROP TABLE IF EXISTS {{prefix}}vipcard_member_card;

CREATE TABLE {{prefix}}vipcard_member_card (
  card_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  goods_id int NOT NULL DEFAULT 0 COMMENT '卡项商品id',
  card_no varchar(50) NOT NULL DEFAULT '' COMMENT '卡号',
  order_id int NOT NULL DEFAULT 0 COMMENT '关联订单id',
  total_num int NOT NULL DEFAULT 0 COMMENT '卡项总次数',
  total_use_num int NOT NULL DEFAULT 0 COMMENT '卡项使用次数',
  goods_type varchar(10) NOT NULL DEFAULT '' COMMENT '商品类型',
  card_type varchar(10) NOT NULL DEFAULT '' COMMENT '卡项类型',
  status varchar(20) NOT NULL DEFAULT '' COMMENT '状态',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  expire_time int NOT NULL DEFAULT 0 COMMENT '到期时间',
  PRIMARY KEY (card_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '会员卡项表';


DROP TABLE IF EXISTS {{prefix}}vipcard_hour_stat;

CREATE TABLE {{prefix}}vipcard_hour_stat (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0,
  date varchar(20) NOT NULL DEFAULT '' COMMENT '年月日',
  hour int NOT NULL DEFAULT 0 COMMENT '时',
  date_time int NOT NULL DEFAULT 0 COMMENT '时间戳',
  order_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '收款金额',
  order_num int NOT NULL DEFAULT 0 COMMENT '订单数',
  refund_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '退款金额',
  refund_num int NOT NULL DEFAULT 0 COMMENT '退款数量',
  reserve_num int NOT NULL DEFAULT 0 COMMENT '预约单数',
  buy_card_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '开卡金额',
  buy_card_num int NOT NULL DEFAULT 0 COMMENT '开卡单数',
  buy_service_money decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '服务订单金额',
  buy_service_num int NOT NULL DEFAULT 0 COMMENT '服务订单数',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;


DROP TABLE IF EXISTS {{prefix}}vipcard_goods_category;

CREATE TABLE {{prefix}}vipcard_goods_category (
  category_id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL,
  category_name varchar(50) NOT NULL DEFAULT '' COMMENT '分类名称',
  pid int NOT NULL DEFAULT 0 COMMENT '分类上级',
  level int NOT NULL DEFAULT 0 COMMENT '层级',
  sort int NOT NULL DEFAULT 0 COMMENT '排序',
  image varchar(255) NOT NULL DEFAULT '' COMMENT '分类图片',
  create_time int NOT NULL DEFAULT 0 COMMENT '添加时间',
  update_time int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (category_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = ' 商品分类',
ROW_FORMAT = COMPACT;


DROP TABLE IF EXISTS {{prefix}}vipcard_goods_card_item;

CREATE TABLE {{prefix}}vipcard_goods_card_item (
  id int NOT NULL AUTO_INCREMENT,
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  main_goods_id int NOT NULL DEFAULT 0 COMMENT '卡项商品id',
  relate_goods_id int NOT NULL DEFAULT 0 COMMENT '关联商品id',
  num int NOT NULL DEFAULT 0 COMMENT '次卡可用次数',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '卡项商品关联表';


DROP TABLE IF EXISTS {{prefix}}vipcard_goods;

CREATE TABLE {{prefix}}vipcard_goods (
  goods_id int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  goods_name varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  goods_type varchar(10) NOT NULL DEFAULT '' COMMENT '商品种类1.项目 2.次卡',
  keywords varchar(255) DEFAULT '' COMMENT '关键字',
  goods_cover varchar(2000) NOT NULL DEFAULT '' COMMENT '商品封面',
  goods_image text DEFAULT NULL COMMENT '商品图片',
  buy_info text DEFAULT NULL COMMENT '购买须知',
  goods_content text DEFAULT NULL COMMENT '商品详情',
  category_id int NOT NULL DEFAULT 0 COMMENT '商品分类',
  verify_validity_type int NOT NULL DEFAULT 0 COMMENT '核销有效期类型 0：永久有效 1：购买后N天有效 2：指定过期日期',
  verify_validity varchar(255) NOT NULL DEFAULT '' COMMENT '虚拟商品有效期',
  status tinyint NOT NULL DEFAULT 1 COMMENT '商品状态（1.正常0下架）',
  sort int NOT NULL DEFAULT 0 COMMENT '排序',
  sale_num int NOT NULL DEFAULT 0 COMMENT '销量',
  virtually_sale int NOT NULL DEFAULT 0 COMMENT '虚拟销量',
  card_type varchar(255) NOT NULL DEFAULT '' COMMENT '卡项类型1计次卡2计时卡3通卡',
  common_num int NOT NULL DEFAULT 0 COMMENT '通卡次数（通卡有效）',
  price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '售卖价格',
  renew_price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '续费价格',
  scribe_price decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '划线价',
  stock int NOT NULL DEFAULT 0 COMMENT '库存',
  is_reserve tinyint NOT NULL DEFAULT 0 COMMENT '是否需要预约',
  is_reserve_pay tinyint NOT NULL DEFAULT 0 COMMENT '是否预约支付',
  create_time int NOT NULL DEFAULT 0 COMMENT '创建时间',
  delete_time int NOT NULL DEFAULT 0 COMMENT '删除时间',
  update_time int NOT NULL DEFAULT 0 COMMENT '修改时间',
  reserve_record int NOT NULL DEFAULT 0 COMMENT '已预约人数',
  PRIMARY KEY (goods_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '商品表',
ROW_FORMAT = COMPACT;

DROP TABLE IF EXISTS {{prefix}}vipcard_member_collect;

CREATE TABLE {{prefix}}vipcard_member_collect (
  id int NOT NULL AUTO_INCREMENT,
  member_id int NOT NULL DEFAULT 0 COMMENT '会员id',
  site_id int NOT NULL DEFAULT 0 COMMENT '站点id',
  goods_id int NOT NULL DEFAULT 0 COMMENT '商品id',
  create_time int NOT NULL,
  type varchar(255) NOT NULL DEFAULT '' COMMENT '收藏类型',
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

ALTER TABLE {{prefix}}vipcard_member_collect
ADD INDEX IDX_member_collect_goods (goods_id);

ALTER TABLE {{prefix}}vipcard_member_collect
ADD INDEX IDX_member_collect_member (member_id);

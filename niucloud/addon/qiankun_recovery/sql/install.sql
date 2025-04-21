DROP TABLE IF EXISTS `{{prefix}}qiankun_recovery_config`;
CREATE TABLE `{{prefix}}qiankun_recovery_config`
(
    `id`      int(11) NOT NULL AUTO_INCREMENT,
    `site_id` int(11) DEFAULT '0' COMMENT '站点ID',
    `open`    tinyint(1) DEFAULT '0' COMMENT '是否开启',
    `rules`   text COMMENT '配置规则',
    `after`   float(10, 2
) DEFAULT '0.00' COMMENT '规则后续奖励',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='充值设置表';

DROP TABLE IF EXISTS `{{prefix}}qiankun_recovery_order`;
CREATE TABLE `{{prefix}}qiankun_recovery_order`
(
    `id`             int(11) NOT NULL AUTO_INCREMENT,
    `site_id`        int(11) DEFAULT '0' COMMENT '站点ID',
    `order_no`       varchar(50)    DEFAULT '' COMMENT '订单编号',
    `order_goods_id` int(11) DEFAULT '0' COMMENT '订单商品id',
    `member_id`      int(11) DEFAULT '0' COMMENT '用户',
    `goods_id`       int(11) DEFAULT '0' COMMENT '商品',
    `sku_id`         int(11) DEFAULT '0' COMMENT '规格',
    `goods_price`    decimal(10, 2) DEFAULT '0.00',
    `rules`          varchar(5000)  DEFAULT '' COMMENT '返本规则',
    `after`          float(10, 2
) DEFAULT '0.00' COMMENT '后续奖励',
  `type` tinyint(1) DEFAULT '0' COMMENT '返佣类型，0=按链接，1=按规格',
  `is_full` tinyint(1) DEFAULT '0' COMMENT '是否返完，进入后续奖励',
  `current` int(11) DEFAULT '0' COMMENT '当前返利到第几个',
  `create_time` int(11) DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COMMENT='推N返本订单';

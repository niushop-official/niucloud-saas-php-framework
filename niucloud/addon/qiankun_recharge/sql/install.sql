/*
 Navicat Premium Data Transfer

 Source Server         : 李强
 Source Server Type    : MySQL
 Source Server Version : 50744
 Source Host           : 139.199.178.147:3306
 Source Schema         : qiankun_saas_niucloud

 Target Server Type    : MySQL
 Target Server Version : 50744
 File Encoding         : 65001

 Date: 12/12/2024 12:08:05
*/

SET NAMES utf8mb4;
SET
FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for qk_qiankun_recharge_config
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}qiankun_recharge_config`;
CREATE TABLE `{{prefix}}qiankun_recharge_config`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `site_id`       int(11) DEFAULT NULL,
    `open`          tinyint(1) DEFAULT NULL,
    `min_recharge`  decimal(10, 2) DEFAULT NULL,
    `recharge_desc` varchar(255)   DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='充值设置表';

-- ----------------------------
-- Records of qk_qiankun_recharge_config
-- ----------------------------
BEGIN;
INSERT INTO `{{prefix}}qiankun_recharge_config`
VALUES (1, 100000, 1, 0.01, '测试充值哦，充了就不退了哦');
COMMIT;

-- ----------------------------
-- Table structure for qk_qiankun_recharge_options
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}qiankun_recharge_options`;
CREATE TABLE `{{prefix}}qiankun_recharge_options`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `site_id`       int(11) DEFAULT NULL COMMENT '站点ID',
    `title`         varchar(255)   DEFAULT '' COMMENT '标题',
    `recharge`      decimal(10, 2) DEFAULT '0.00' COMMENT '充值金额',
    `give_price`    decimal(10, 2) DEFAULT '0.00' COMMENT '赠送金额',
    `give_integral` int(10) DEFAULT '0' COMMENT '赠送积分',
    `give_coupon`   varchar(255)   DEFAULT '' COMMENT '赠送优惠券',
    `give_level`    varchar(255)   DEFAULT '' COMMENT '赠送等级',
    `status`        tinyint(1) DEFAULT '0' COMMENT '状态，0=禁用，1=启用',
    `sort`          int(10) DEFAULT '0' COMMENT '排序',
    `create_time`   int(11) DEFAULT '0' COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='充值项列表';

-- ----------------------------
-- Records of qk_qiankun_recharge_options
-- ----------------------------
BEGIN;
INSERT INTO `{{prefix}}qiankun_recharge_options`
VALUES (1, 100000, '充100送20', 100.00, 20.00, 50, '1,2', '1', 1, 0, 1733554589);
INSERT INTO `{{prefix}}qiankun_recharge_options`
VALUES (2, 100000, '充值就送大礼包', 200.00, 50.00, 120, '1', '1', 1, 10, 1733554666);
COMMIT;

-- ----------------------------
-- Table structure for qk_qiankun_recharge_order
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}qiankun_recharge_order`;
CREATE TABLE `{{prefix}}qiankun_recharge_order`
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `site_id`       int(11) DEFAULT '0' COMMENT '站点ID',
    `order_no`      varchar(50)    DEFAULT '' COMMENT '订单号',
    `order_from`    varchar(20)    DEFAULT '' COMMENT '订单来源',
    `order_type`    varchar(20)    DEFAULT '' COMMENT '订单类型',
    `out_trade_no`  varchar(0)     DEFAULT '' COMMENT '支付流水号',
    `member_id`     int(11) DEFAULT '0' COMMENT '会员',
    `order_money`   decimal(10, 2) DEFAULT '0.00' COMMENT '充值金额',
    `recharge_id`   int(11) DEFAULT '0' COMMENT '充值项',
    `give_coupon`   varchar(255)   DEFAULT '' COMMENT '赠送优惠券',
    `give_integral` int(10) DEFAULT '0' COMMENT '赠送积分',
    `give_price`    decimal(10, 2) DEFAULT '0.00' COMMENT '赠送金额',
    `give_level`    int(10) DEFAULT '0' COMMENT '赠送等级',
    `paid`          int(11) DEFAULT '0' COMMENT '是否已支付',
    `pay_time`      int(11) DEFAULT '0' COMMENT '支付时间',
    `refund_status` tinyint(1) DEFAULT '0' COMMENT '是否 已退款',
    `create_time`   int(11) DEFAULT '0' COMMENT '创建时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COMMENT='充值订单表';

SET
FOREIGN_KEY_CHECKS = 1;

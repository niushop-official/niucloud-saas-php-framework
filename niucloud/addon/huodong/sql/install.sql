/*
 Navicat MySQL Data Transfer

 Source Server         : 00  localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : niuaddon_com

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 20/03/2025 20:51:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for {{prefix}}huodong_act
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_act`;
CREATE TABLE `{{prefix}}huodong_act`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `site_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动标题',
  `cate_id` int(11) NOT NULL COMMENT '活动分类',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '报名费用',
  `image` varchar(2551) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '封面图',
  `images` varchar(2552) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '轮播图',
  `startime` datetime(0) NOT NULL COMMENT '开始时间',
  `endtime` datetime(0) NOT NULL COMMENT '结束时间',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动地址',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '活动详情',
  `sales` int(11) NULL DEFAULT 0 COMMENT '已报名人数',
  `status` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态 1开启 -2过期',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `views` int(1) NULL DEFAULT 0,
  `usertype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_tian` int(1) NULL DEFAULT 1,
  `is_pay` int(1) NULL DEFAULT 0,
  `is_hexiao` int(1) NULL DEFAULT 0,
  `num` int(11) NULL DEFAULT NULL COMMENT '人数限制',
  `is_zhouqi` int(1) NULL DEFAULT 0 COMMENT '是否周期性活动',
  `hexiao_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '核销方式',
  `zhouqi_from` int(11) NULL DEFAULT NULL COMMENT '周期性来源活动',
  `level_gifts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '活动奖励',
  `hxstartime` datetime(0) NULL DEFAULT NULL,
  `vip_mianfei` int(11) NULL DEFAULT 0 COMMENT '会员报名免费',
  `poster_id` int(11) NULL DEFAULT 0 COMMENT '海报id',
  `form_id` int(11) NULL DEFAULT NULL COMMENT '表单id',
  `hidecontent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '报名可见内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 282 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '活动列表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_banner
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_banner`;
CREATE TABLE `{{prefix}}huodong_banner`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT 1,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_cate
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_cate`;
CREATE TABLE `{{prefix}}huodong_cate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT NULL COMMENT '站点id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类名称',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '状态',
  `sort` int(11) NULL DEFAULT NULL COMMENT '排序',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '1' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_fxbill
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_fxbill`;
CREATE TABLE `{{prefix}}huodong_fxbill`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户id',
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `account_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'point' COMMENT '账户类型',
  `account_data` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '账户数据',
  `account_sum` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '变动后的账户余额',
  `from_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '来源类型',
  `related_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '关联Id',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `memo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注信息',
  `from_member_id` int(11) NULL DEFAULT NULL COMMENT '来源用户',
  `fxlevel` int(1) NULL DEFAULT 1 COMMENT '分销层级1,2',
  `status` int(1) NULL DEFAULT NULL COMMENT '佣金状态 1待发放 2已发放 -1已失效',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `account_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 305 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '活动佣金明细' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_fxuser
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_fxuser`;
CREATE TABLE `{{prefix}}huodong_fxuser`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT NULL COMMENT '站点',
  `member_id` int(11) NULL DEFAULT NULL COMMENT '用户信息',
  `type` int(1) NULL DEFAULT NULL COMMENT '身份类型 1企业 2用户',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号码',
  `sfz1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证正面',
  `sfz2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证反面',
  `ying_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '营业执照',
  `fail_msg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拒绝原因',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态2通过1待审核-1驳回',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '推广员' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_order
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_order`;
CREATE TABLE `{{prefix}}huodong_order`  (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `order_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单编号',
  `order_from` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '订单来源',
  `out_trade_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '支付流水号',
  `order_status` int(11) NOT NULL DEFAULT 0 COMMENT '订单状态',
  `member_id` int(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员ip',
  `order_money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `pay_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单支付时间',
  `close_time` int(11) NOT NULL DEFAULT 0 COMMENT '订单关闭时间',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `realname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `act_id` int(11) NULL DEFAULT NULL,
  `hexiao_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `order_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hx_member_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `hx_time` int(11) NULL DEFAULT NULL,
  `is_notice` int(11) NULL DEFAULT 0 COMMENT '消息通知:0= 未通知,1=已通知',
  `point` int(11) NULL DEFAULT NULL COMMENT '获得积分',
  `is_jiangli` int(1) NULL DEFAULT 0 COMMENT '是否已经发放奖励1=已发放,0=未发放',
  `pid` int(11) NULL DEFAULT 0 COMMENT '推广员',
  `pid2` int(11) NULL DEFAULT 0,
  `pid_price` decimal(10, 2) NULL DEFAULT 0.00,
  `pid2_price` decimal(10, 2) NULL DEFAULT 0.00,
  `yongjin_status` int(1) NULL DEFAULT 0 COMMENT '佣金状态0=不发放 1待发放 2=已发放',
  `douyin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jietu_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kuaishou_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `xiaohongshu_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `shipinhao_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `form_record_id` int(11) NULL DEFAULT NULL COMMENT '表单记录id',
  `form_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 188 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}huodong_relation
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_relation`;
CREATE TABLE `{{prefix}}huodong_relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT NULL COMMENT '站点',
  `member_id` int(11) NULL DEFAULT NULL COMMENT '用户',
  `pid` int(11) NULL DEFAULT NULL COMMENT '上级推广员',
  `pid2` int(11) NULL DEFAULT NULL COMMENT '上上级推广员',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '绑定时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for {{prefix}}huodong_user
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}huodong_user`;
CREATE TABLE `{{prefix}}huodong_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT NULL COMMENT '站点',
  `member_id` int(11) NULL DEFAULT NULL COMMENT '用户信息',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号码',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '活动用户' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

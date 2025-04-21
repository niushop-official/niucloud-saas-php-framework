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

 Date: 15/01/2025 21:22:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_cate
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_cate`;
CREATE TABLE `{{prefix}}shortvideo_cate`  (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `site_id` int(11) NULL DEFAULT NULL COMMENT '站点id',
                                        `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
                                        `status` int(1) NULL DEFAULT 1 COMMENT '状态',
                                        `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
                                        `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
                                        PRIMARY KEY (`id`) USING BTREE,
                                        INDEX `aid`(`site_id`) USING BTREE,
                                        INDEX `bid`(`site_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '视频分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_comment
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_comment`;
CREATE TABLE `{{prefix}}shortvideo_comment`  (
                                           `id` int(11) NOT NULL AUTO_INCREMENT,
                                           `site_id` int(11) NULL DEFAULT NULL,
                                           `video_id` int(11) NULL DEFAULT NULL,
                                           `member_id` int(11) NULL DEFAULT NULL,
                                           `headimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                                           `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
                                           `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                                           `status` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1',
                                           `like_num` int(11) NULL DEFAULT 0,
                                           `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                           PRIMARY KEY (`id`) USING BTREE,
                                           INDEX `aid`(`site_id`) USING BTREE,
                                           INDEX `sid`(`video_id`) USING BTREE,
                                           INDEX `mid`(`member_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_comment_like
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_comment_like`;
CREATE TABLE `{{prefix}}shortvideo_comment_like`  (
                                                `id` int(11) NOT NULL AUTO_INCREMENT,
                                                `site_id` int(11) NULL DEFAULT 0,
                                                `pid` int(11) NULL DEFAULT NULL,
                                                `member_id` int(11) NULL DEFAULT NULL,
                                                `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                                PRIMARY KEY (`id`) USING BTREE,
                                                INDEX `bid`(`site_id`) USING BTREE,
                                                INDEX `pid`(`pid`) USING BTREE,
                                                INDEX `mid`(`member_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_comment_reply`;
CREATE TABLE `{{prefix}}shortvideo_comment_reply`  (
                                                 `id` int(11) NOT NULL AUTO_INCREMENT,
                                                 `site_id` int(11) NULL DEFAULT NULL,
                                                 `video_id` int(11) NULL DEFAULT NULL,
                                                 `pid` int(11) NULL DEFAULT NULL,
                                                 `member_id` int(11) NULL DEFAULT NULL,
                                                 `headimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                                                 `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
                                                 `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
                                                 `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                                 `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
                                                 `like_num` int(11) NULL DEFAULT 0,
                                                 PRIMARY KEY (`id`) USING BTREE,
                                                 INDEX `aid`(`site_id`) USING BTREE,
                                                 INDEX `sid`(`video_id`) USING BTREE,
                                                 INDEX `pid`(`pid`) USING BTREE,
                                                 INDEX `mid`(`member_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_config
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_config`;
CREATE TABLE `{{prefix}}shortvideo_config`  (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `site_id` int(11) NULL DEFAULT NULL,
                                          `open_fabu` int(11) NULL DEFAULT 1,
                                          `open_ping` int(11) NULL DEFAULT 1,
                                          `open_pingshen` int(11) NULL DEFAULT 0,
                                          `mianze` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
                                          `index_type` int(1) NULL DEFAULT 1 COMMENT '首页显示方式:1=视频布局,2=瀑布流布局',
                                          PRIMARY KEY (`id`) USING BTREE,
                                          UNIQUE INDEX `aid`(`site_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_follow
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_follow`;
CREATE TABLE `{{prefix}}shortvideo_follow`  (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `member_id` int(11) NULL DEFAULT NULL,
                                          `to_member_id` int(11) NULL DEFAULT NULL,
                                          `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
                                          PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 274 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_label
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_label`;
CREATE TABLE `{{prefix}}shortvideo_label`  (
                                         `id` int(11) NOT NULL AUTO_INCREMENT,
                                         `site_id` int(11) NULL DEFAULT NULL COMMENT '站点id',
                                         `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名称',
                                         `status` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态',
                                         `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
                                         `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
                                         PRIMARY KEY (`id`) USING BTREE,
                                         INDEX `aid`(`site_id`) USING BTREE,
                                         INDEX `bid`(`site_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '话题管理' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_like
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_like`;
CREATE TABLE `{{prefix}}shortvideo_like`  (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `site_id` int(11) NULL DEFAULT NULL COMMENT '站点id',
                                        `member_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
                                        `video_id` int(11) NULL DEFAULT NULL COMMENT '视频id',
                                        `createtime` int(11) NULL DEFAULT NULL COMMENT '添加时间',
                                        PRIMARY KEY (`id`) USING BTREE,
                                        INDEX `aid`(`site_id`) USING BTREE,
                                        INDEX `stid`(`video_id`) USING BTREE,
                                        INDEX `mid`(`member_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '视频点赞' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_report
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_report`;
CREATE TABLE `{{prefix}}shortvideo_report`  (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `site_id` int(11) NULL DEFAULT NULL COMMENT '站点',
                                          `member_id` int(11) NULL DEFAULT NULL COMMENT '反馈用户',
                                          `video_id` int(11) NULL DEFAULT NULL COMMENT '举报视频',
                                          `content` varchar(2551) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '举报内容',
                                          `adddate` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '提交时间',
                                          PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '短视频举报反馈' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for {{prefix}}shortvideo_video
-- ----------------------------
DROP TABLE IF EXISTS `{{prefix}}shortvideo_video`;
CREATE TABLE `{{prefix}}shortvideo_video`  (
                                         `id` int(11) NOT NULL AUTO_INCREMENT,
                                         `site_id` int(11) NULL DEFAULT NULL COMMENT '站点ID',
                                         `member_id` int(11) NULL DEFAULT 0 COMMENT '发布人',
                                         `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频名称',
                                         `cate_id` int(11) NULL DEFAULT NULL COMMENT '视频分类',
                                         `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频链接',
                                         `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频封面',
                                         `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '视频描述',
                                         `view_num` int(11) NULL DEFAULT 0 COMMENT '播放量',
                                         `like_num` int(11) NULL DEFAULT 0 COMMENT '点赞量',
                                         `share_num` int(11) NULL DEFAULT 0 COMMENT '分享量',
                                         `status` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '状态:1=显示,0=隐藏',
                                         `failmsg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '审核失败原因',
                                         `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
                                         `is_show` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1',
                                         `goods_ids` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品id',
                                         `label_ids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '话题',
                                         PRIMARY KEY (`id`) USING BTREE,
                                         INDEX `aid`(`site_id`) USING BTREE,
                                         INDEX `bid`(`site_id`) USING BTREE,
                                         INDEX `cid`(`site_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 351 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '视频列表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

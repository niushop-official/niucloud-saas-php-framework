ALTER TABLE `huodong_order`
    ADD COLUMN `form_record_id` int(0) NULL COMMENT '表单记录id' AFTER `shipinhao_url`;
ALTER TABLE `huodong_act`
    ADD COLUMN `form_id` int(0) NULL COMMENT '表单id' AFTER `poster_id`;

ALTER TABLE `huodong_order`
    ADD COLUMN `form_id` int(0) NULL AFTER `form_record_id`;


CREATE TABLE `huodong_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site_id` int(11) NULL DEFAULT NULL COMMENT '站点',
  `member_id` int(11) NULL DEFAULT NULL COMMENT '用户信息',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号码',
  `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '活动用户' ROW_FORMAT = Dynamic;


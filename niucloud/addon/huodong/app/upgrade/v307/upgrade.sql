CREATE TABLE `huodong_fxuser`  (
                                   `id` int(11) NOT NULL AUTO_INCREMENT,
                                   `site_id` int(0) NULL COMMENT '站点',
                                   `member_id` int(11) NULL COMMENT '用户信息',
                                   `type` int(1) NULL COMMENT '身份类型 1企业 2用户',
                                   `name` varchar(255) NULL COMMENT '名称',
                                   `mobile` varchar(255) NULL COMMENT '联系电话',
                                   `idcard` varchar(255) NULL COMMENT '身份证号码',
                                   `sfz1` varchar(255) NULL COMMENT '身份证正面',
                                   `sfz2` varchar(255) NULL COMMENT '身份证反面',
                                   `ying_image` varchar(255) NULL COMMENT '营业执照',
                                   `status` varchar(255) NULL COMMENT '状态1通过0待审核',
                                   `fail_msg` varchar(255) NULL COMMENT '拒绝原因',
                                   `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
                                   PRIMARY KEY (`id`)
);
ALTER TABLE `huodong_order`
    ADD COLUMN `pid` int(11) NULL DEFAULT 0 COMMENT '推广员' AFTER `is_jiangli`;



CREATE TABLE `huodong_relation`  (
                                            `id` int(11) NOT NULL AUTO_INCREMENT,
                                            `site_id` int(0) NULL COMMENT '站点',
                                            `member_id` int(0) NULL COMMENT '用户',
                                            `pid` int(0) NULL COMMENT '上级推广员',
                                            `pid2` int(0) NULL COMMENT '上上级推广员',
                                            `adddate` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP COMMENT '绑定时间',
                                            PRIMARY KEY (`id`)
);
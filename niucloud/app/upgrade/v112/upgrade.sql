
DROP TABLE IF EXISTS `sys_user_log`;
CREATE TABLE `sys_user_log`
(
    `id`          int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '管理员操作记录ID',
    `ip`          varchar(50)  NOT NULL DEFAULT '' COMMENT '登录IP',
    `site_id`     int(11) NOT NULL DEFAULT 0 COMMENT '站点id',
    `uid`         int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '管理员id',
    `username`    varchar(64)  NOT NULL DEFAULT '' COMMENT '管理员姓名',
    `operation`   varchar(255) NOT NULL DEFAULT '' COMMENT '操作描述',
    `url`         varchar(300) NOT NULL DEFAULT '' COMMENT '链接',
    `params`      longtext              DEFAULT NULL COMMENT '参数',
    `type`        varchar(32)  NOT NULL DEFAULT '' COMMENT '请求方式',
    `create_time` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '操作时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '管理员操作记录表' ROW_FORMAT = Dynamic;

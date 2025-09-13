
DROP TABLE IF EXISTS `app_version`;
CREATE TABLE `app_version`
(
    `id`                INT(11) NOT NULL AUTO_INCREMENT,
    `site_id`           INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
    `version_code`      VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '版本号',
    `version_name`      VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '版本名称',
    `version_desc`      VARCHAR(1500) NOT NULL DEFAULT '' COMMENT '版本描述',
    `platform`          VARCHAR(255)  NOT NULL DEFAULT '' COMMENT 'app平台 Android Ios',
    `package_path`      VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '安装包路径',
    `status`            VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '状态',
    `is_forced_upgrade` INT(11) NOT NULL DEFAULT 0 COMMENT '是否需要强制升级',
    `task_key`          VARCHAR(255)  NOT NULL DEFAULT '',
    `fail_reason`       VARCHAR(255)  NOT NULL DEFAULT '',
    `upgrade_type`      VARCHAR(255)  NOT NULL DEFAULT 'app' COMMENT 'app 整包更新 hot 热更新 market 应用市场更新',
    `release_time`      INT(11) NOT NULL DEFAULT 0 COMMENT '发布时间',
    `create_time`       INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`       INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'app版本管理' ROW_FORMAT = Dynamic;

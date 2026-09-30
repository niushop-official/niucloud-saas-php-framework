DROP TABLE IF EXISTS `sys_framework_patch`;

-- 框架补丁表（幂等：已存在则跳过）
CREATE TABLE `sys_framework_patch`
(
    `id`                   int(11) NOT NULL AUTO_INCREMENT,
    `patch_id`             varchar(64)  NOT NULL DEFAULT '' COMMENT '云端补丁ID(唯一键，去重用)',
    `patch_no`             varchar(64)  NOT NULL DEFAULT '' COMMENT '补丁号',
    `app_key`              varchar(64)  NOT NULL DEFAULT '' COMMENT '所属应用标识(框架为 niucloud-admin)',
    `app_id`               int(11)      NOT NULL DEFAULT 0 COMMENT '云端应用ID',
    `app_version`          varchar(64)  NOT NULL DEFAULT '' COMMENT '所属应用版本',
    `title`                varchar(255) NOT NULL DEFAULT '' COMMENT '补丁标题',
    `description`          text                  DEFAULT NULL COMMENT '补丁说明(富文本)',
    `attach_url`           varchar(500) NOT NULL DEFAULT '' COMMENT '附件下载地址',
    `attach_name`          varchar(255) NOT NULL DEFAULT '' COMMENT '附件名称',
    `attach_size`          varchar(64)  NOT NULL DEFAULT '' COMMENT '附件大小',
    `release_time`         varchar(64)  NOT NULL DEFAULT '' COMMENT '发布时间(云端原文)',
    `framework_version_no` varchar(64)  NOT NULL DEFAULT '' COMMENT '适用框架版本号',
    `product_key`          varchar(64)  NOT NULL DEFAULT '' COMMENT '产品线',
    `status`               varchar(32)  NOT NULL DEFAULT '' COMMENT '云端补丁状态',
    `is_push`              tinyint(1)   NOT NULL DEFAULT 0 COMMENT '是否已推送站内信',
    `is_resolved`          tinyint(1)   NOT NULL DEFAULT 0 COMMENT '是否已解决(用户标记)',
    `resolved_time`        int(11)      NOT NULL DEFAULT 0 COMMENT '标记已解决时间',
    `cloud_resolved`       tinyint(1)   NOT NULL DEFAULT 0 COMMENT '云端标记的已解决(仅参考，不覆盖本地标记)',
    `create_time`          int(11)      NOT NULL DEFAULT 0,
    `update_time`          int(11)      NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_patch_id` (`patch_id`),
    KEY `idx_resolved` (`is_resolved`,`id`),
    KEY `idx_app_key` (`app_key`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '框架补丁' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task` (
   `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
   `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
   `task_key` varchar(64) NOT NULL DEFAULT '' COMMENT '任务标识',
   `parent_key` varchar(64) NOT NULL DEFAULT '' COMMENT '父任务标识(本期预留,恒为空)',
   `task_type` varchar(32) NOT NULL DEFAULT '' COMMENT '任务类型 cloud_build/upgrade',
   `title` text NOT NULL COMMENT '任务标题',
   `desc` text COMMENT '任务描述',
   `is_mutex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否互斥任务(1互斥：同站点同时只允许一个在执行)',
   `status` varchar(32) NOT NULL DEFAULT '' COMMENT '任务状态',
   `end_reason` varchar(32) NOT NULL DEFAULT '' COMMENT '结束原因',
   `progress` tinyint(3) NOT NULL DEFAULT '0' COMMENT '进度0-100',
   `stage` varchar(64) NOT NULL DEFAULT '' COMMENT '当前阶段',
   `cursor` varchar(255) NOT NULL DEFAULT '' COMMENT '续跑游标(幂等依据)',
   `params` text COMMENT '任务入参',
   `actions` text COMMENT '当前可用操作',
   `fail_reason` longtext COMMENT '失败原因',
   `log_size` int(11) NOT NULL DEFAULT '0' COMMENT '事件日志体积',
   `start_time` int(11) NOT NULL DEFAULT '0' COMMENT '开始时间',
   `end_time` int(11) NOT NULL DEFAULT '0' COMMENT '结束时间',
   `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
   PRIMARY KEY (`id`),
   UNIQUE KEY `uk_task_key` (`task_key`),
   KEY `idx_type_status_time` (`task_type`,`status`,`create_time`),
   KEY `idx_site_mutex_status` (`site_id`,`is_mutex`,`status`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COMMENT='统一任务表';

DROP TABLE IF EXISTS `sys_notice_message`;

-- 站内信表
CREATE TABLE IF NOT EXISTS `sys_notice_message`
(
    `id`           INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '站内信ID',
    `main_id`      INT(11)      NOT NULL DEFAULT 0 COMMENT '主体ID（平台端0，站点端site_id）',
    `main_type`    VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '主体类型 admin/site/member',
    `category`     VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '一级分类',
    `sub_category` VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '二级分类',
    `key`          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '消息模板标识',
    `message_key`  VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '消息标识（幂等去重用，空表示不去重）',
    `title`        VARCHAR(255) NOT NULL DEFAULT '' COMMENT '消息标题',
    `content`      TEXT                  DEFAULT NULL COMMENT '消息内容',
    `params`       TEXT                  DEFAULT NULL COMMENT '扩展参数JSON（跳转链接、业务id等）',
    `level`        VARCHAR(16)  NOT NULL DEFAULT 'info' COMMENT '消息等级 info/success/warning/error',
    `trade_id`     INT(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '业务id',
    `trade_type`   VARCHAR(255) NOT NULL DEFAULT '' COMMENT '业务类型',
    `is_read`      TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '是否已读 0未读 1已读',
    `read_time`    INT(11)      NOT NULL DEFAULT 0 COMMENT '阅读时间',
    `create_time`  INT(11)      NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`  INT(11)      NOT NULL DEFAULT 0 COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_main_read_time` (`main_type`, `main_id`, `is_read`, `create_time`),
    KEY `idx_main_category` (`main_type`, `main_id`, `category`, `is_read`),
    KEY `idx_main_sub_category` (`main_type`, `main_id`, `sub_category`, `is_read`),
    KEY `idx_main_message_key` (`main_type`, `main_id`, `message_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='站内信表';

-- 通知模板新增站内信开关
ALTER TABLE `sys_notice`
    ADD COLUMN `is_message` tinyint(4) NOT NULL DEFAULT 0 COMMENT '发送站内信（0：关闭，1：开启）' AFTER `is_sms`;

-- 任务步骤表（详情页分步骤展示）
DROP TABLE IF EXISTS `sys_task_step`;
CREATE TABLE `sys_task_step`
(
    `id`          INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
    `task_key`    VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '任务标识',
    `step_key`    VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '步骤标识（子步骤为 父标识:实例标识）',
    `parent_key`  VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '父步骤标识，顶层步骤为空',
    `name`        VARCHAR(100) NOT NULL DEFAULT '' COMMENT '步骤名称',
    `desc`        VARCHAR(255) NOT NULL DEFAULT '' COMMENT '步骤描述',
    `seq`         INT(11)      NOT NULL DEFAULT 0 COMMENT '排序',
    `weight`      INT(11)      NOT NULL DEFAULT 0 COMMENT '加权进度权重（同层步骤之和=100）',
    `is_show`     tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否展示（0=详情页不展示但该步骤仍会执行）',
    `need_execute` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否需要执行（0=仅用于展示）',
    `can_skip`    tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否允许跳过（1=仅在该步骤出错暂停时才可跳过）',
    `status`      VARCHAR(20)  NOT NULL DEFAULT 'pending' COMMENT '状态 pending/running/success/failed/skipped/canceled',
    `progress`    INT(11)      NOT NULL DEFAULT 0 COMMENT '步骤内进度 0-100',
    `start_at`    INT(11)      NOT NULL DEFAULT 0 COMMENT '开始时间',
    `end_at`      INT(11)      NOT NULL DEFAULT 0 COMMENT '结束时间',
    `duration`    INT(11)      NOT NULL DEFAULT 0 COMMENT '耗时（秒）',
    `error`       VARCHAR(500) NOT NULL DEFAULT '' COMMENT '失败原因',
    `create_time` INT(11)      NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time` INT(11)      NOT NULL DEFAULT 0 COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_task_seq` (`task_key`, `seq`),
    KEY `idx_task_parent` (`task_key`, `parent_key`),
    KEY `idx_task_status` (`task_key`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='任务步骤表';

-- 云编译发版记录（发版：发起云编译任务并在编译成功后落一条版本记录）
DROP TABLE IF EXISTS `sys_build_version`;
CREATE TABLE `sys_build_version`
(
    `id`             INT(11)      NOT NULL AUTO_INCREMENT COMMENT '主键id',
    `site_id` int(11) NOT NULL DEFAULT '0' COMMENT '站点id',
    `task_key`       VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '云编译任务标识（唯一，保证编译完成只落一条）',
    `port_key`       VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '端口标识 admin/h5/mp-weixin/web/自定义',
    `port_name`      VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '端口名称',
    `version`        VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '版本号',
    `remark`         VARCHAR(255) NOT NULL DEFAULT '' COMMENT '版本说明',
    `platform`       VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '平台',
    `browser`        VARCHAR(64)  NOT NULL DEFAULT '' COMMENT '浏览器',
    `scope`          VARCHAR(32)  NOT NULL DEFAULT '' COMMENT '编译范围 all/framework/plugin/custom',
    `release_status` TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '发布状态 0未发布 1已发布',
    `artifact_count` INT(11)      NOT NULL DEFAULT 0 COMMENT '产物文件数',
    `artifact_size`  INT(11)      NOT NULL DEFAULT 0 COMMENT '产物体积(字节)',
    `create_time`    INT(11)      NOT NULL DEFAULT 0 COMMENT '创建时间',
    `complete_time`  INT(11)      NOT NULL DEFAULT 0 COMMENT '编译完成时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_task_key` (`task_key`),
    KEY `idx_port_create` (`port_key`, `create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='云编译发版记录表';

-- 菜单支持打开新窗口
ALTER TABLE `sys_menu` ADD COLUMN `is_blank` tinyint NOT NULL DEFAULT 0 COMMENT '是否打开新的窗口';

ALTER TABLE `sys_upgrade_records`
    ADD COLUMN `backup_key` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '本次升级关联的备份标识' AFTER `fail_reason`,
  ADD KEY `idx_backup_key` (`backup_key`);

ALTER TABLE `weapp_version` ADD COLUMN `source_zip`  varchar(255)  NOT NULL DEFAULT '' COMMENT '上传源码包路径(成功版本保留，用于版本回退)';

-- 小程序版本记录新增「体验版预览码」字段：发布成功后回写云端生成的预览二维码
ALTER TABLE `weapp_version` ADD COLUMN `preview` text DEFAULT NULL COMMENT '体验版预览码(云端生成的预览二维码 base64)';

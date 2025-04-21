DROP TABLE IF EXISTS `qk_qiankun_source_category`;
CREATE TABLE `qk_qiankun_source_category`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `site_id`     int(11) DEFAULT NULL COMMENT '站点id',
    `title`       varchar(255) DEFAULT NULL COMMENT '标题',
    `icon`        varchar(255) DEFAULT NULL COMMENT '图标',
    `sort`        varchar(255) DEFAULT NULL COMMENT '排序',
    `status`      varchar(255) DEFAULT NULL COMMENT '状态：0=隐藏，1=显示',
    `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
    `delete_time` int(11) DEFAULT '0' COMMENT '删除时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='乾坤素材分类';

DROP TABLE IF EXISTS `qk_qiankun_source_list`;
CREATE TABLE `qk_qiankun_source_list`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `site_id`     int(11) DEFAULT '0' COMMENT '站点',
    `cate_id`     int(11) DEFAULT '0' COMMENT '分类',
    `user_id`     int(11) DEFAULT '0' COMMENT '用户',
    `text`        text COMMENT '文本',
    `image`       text COMMENT '媒体',
    `video`       text,
    `create_time` int(11) DEFAULT '0',
    `delete_time` int(11) DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COMMENT='素材列表';


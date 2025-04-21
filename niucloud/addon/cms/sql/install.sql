
DROP TABLE IF EXISTS `{{prefix}}cms_article`;
CREATE TABLE `{{prefix}}cms_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  site_id int NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL COMMENT '文章分类',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `intro` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `summary` varchar(255) NOT NULL DEFAULT '' COMMENT '文章摘要',
  `image` varchar(255) NOT NULL DEFAULT '' COMMENT '文章图片',
  `author` varchar(255) NOT NULL DEFAULT '' COMMENT '作者',
  `content` LONGTEXT DEFAULT NULL COMMENT '文章内容',
  `visit` int(11) NOT NULL DEFAULT '0' COMMENT '实际浏览量',
  `visit_virtual` int(11) NOT NULL DEFAULT '0' COMMENT '初始浏览量',
  `is_show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示:1-是.0-否',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `IDX_article_category_id` (`category_id`),
  KEY `IDX_article_create_time` (`create_time`),
  KEY `IDX_article_is_show` (`is_show`),
  KEY `IDX_ns_cms_article_sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='文章表';

DROP TABLE IF EXISTS `{{prefix}}cms_article_category`;
CREATE TABLE `{{prefix}}cms_article_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章分类id',
  site_id int NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `is_show` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否显示:1-是;0-否',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`category_id`),
  KEY `create_time` (`create_time`),
  KEY `is_show` (`is_show`),
  KEY `sort` (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='文章分类表';

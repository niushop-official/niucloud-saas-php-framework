
ALTER TABLE `cms_article` CHANGE COLUMN `image` `image` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '文章图片';

ALTER TABLE `cms_article` CHANGE COLUMN `content` `content` LONGTEXT DEFAULT NULL COMMENT '文章内容';

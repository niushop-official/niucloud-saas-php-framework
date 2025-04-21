
ALTER TABLE `shortvideo_config`
    ADD COLUMN `index_type` int(1) NULL DEFAULT 1 COMMENT '首页显示方式:1=视频布局,2=瀑布流布局' AFTER `mianze`;

CREATE TABLE `shortvideo_label`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `site_id` int(0) NULL COMMENT '站点',
  `member_id` int(0) NULL COMMENT '反馈用户',
  `video_id` int(11) NULL COMMENT '举报视频',
  `content` varchar(2551) NULL COMMENT '举报内容',
  `adddate` datetime(0) NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '提交时间',
  PRIMARY KEY (`id`)
) COMMENT = '短视频举报反馈';
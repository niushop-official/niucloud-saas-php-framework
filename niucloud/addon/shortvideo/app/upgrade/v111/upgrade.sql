ALTER TABLE `shortvideo_video`
    ADD COLUMN `goods_id` int(11) NULL COMMENT '商品id' AFTER `is_show`,
ADD COLUMN `label_ids` varchar(255) NULL COMMENT '话题' AFTER `goods_id`;
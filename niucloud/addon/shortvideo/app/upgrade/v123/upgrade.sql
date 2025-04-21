ALTER TABLE `shortvideo_video`
    CHANGE COLUMN `goods_id` `goods_ids` text NULL COMMENT '商品id' AFTER `is_show`;
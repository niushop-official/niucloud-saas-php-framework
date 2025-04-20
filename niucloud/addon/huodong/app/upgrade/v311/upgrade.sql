ALTER TABLE `huodong_order`
    CHANGE COLUMN `jietu_url` `douyin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL AFTER `jietu_pingtai`,
    ADD COLUMN `kuaishou_url` varchar(255) NULL AFTER `jietu_image`,
    ADD COLUMN `xiaohongshu_url` varchar(255) NULL AFTER `kuaishou_url`,
    ADD COLUMN `shipinhao_url` varchar(255) NULL AFTER `xiaohongshu_url`;

ALTER TABLE `huodong_order`
DROP COLUMN `jietu_pingtai`;
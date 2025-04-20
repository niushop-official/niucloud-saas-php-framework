ALTER TABLE `transfer_log`
    ADD COLUMN `type` varchar(255) NULL COMMENT '转赠类型' AFTER `create_time`,
ADD COLUMN `status` int(1) NULL DEFAULT 1 COMMENT '状态 1待付款, 2 已成功' AFTER `type`;
ALTER TABLE `transfer_log`
    ADD COLUMN `give_text` varchar(255) NULL COMMENT '赠予文字' AFTER `status`;
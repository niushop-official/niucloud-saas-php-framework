
ALTER TABLE `shortvideo_label`
    MODIFY COLUMN `status` varchar(11) NULL DEFAULT 1 COMMENT '状态' AFTER `name`;

ALTER TABLE `shop_coupon` ADD COLUMN `give_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已发放数量';

ALTER TABLE `shop_coupon` MODIFY `give_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已发放数量' AFTER `receive_count`;

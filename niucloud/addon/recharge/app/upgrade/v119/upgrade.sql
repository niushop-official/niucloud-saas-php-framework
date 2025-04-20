
ALTER TABLE `recharge` DROP COLUMN `coupon_id`;

ALTER TABLE `recharge` ADD COLUMN `gift_json` TEXT DEFAULT NULL COMMENT '赠品json';

ALTER TABLE `recharge` MODIFY `gift_json` TEXT DEFAULT NULL COMMENT '赠品json' AFTER `growth`;

ALTER TABLE `recharge` MODIFY COLUMN `buy_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '价格';

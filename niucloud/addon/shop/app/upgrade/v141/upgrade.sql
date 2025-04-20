
DROP TABLE IF EXISTS `shop_manjian_record`;

ALTER TABLE `shop_order_goods` ADD COLUMN `is_gift` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '是否是赠品（0否  1是）';

ALTER TABLE `shop_manjian_goods` DROP COLUMN `total_order_money`;

ALTER TABLE `shop_manjian_goods` DROP COLUMN `total_order_num`;

ALTER TABLE `shop_manjian_goods` DROP COLUMN `total_member_num`;

DROP TABLE IF EXISTS `shop_manjian_give_records`;
CREATE TABLE `shop_manjian_give_records` (
  `record_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '赠送记录id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `manjian_id` INT(11) NOT NULL DEFAULT 0 COMMENT '满减送活动id',
  `order_id` INT(11) NOT NULL DEFAULT 0 COMMENT '订单id',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `level` INT(11) NOT NULL DEFAULT 0 COMMENT '优惠层级',
  `point` INT(11) NOT NULL DEFAULT 0 COMMENT '赠送积分数量',
  `balance` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '赠送余额',
  `coupon_json` TEXT DEFAULT NULL COMMENT '赠送优惠券',
  `goods_json` TEXT DEFAULT NULL COMMENT '赠送商品',
  `sku_ids` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '满足条件的商品规格id',
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci COMMENT='满减送记录表';

ALTER TABLE `shop_goods_rank` DROP COLUMN `show_goods_num`;

ALTER TABLE `shop_goods_rank` ADD COLUMN `status` INT(11) NOT NULL DEFAULT 1 COMMENT '显示状态（0不显示 1显示）';

ALTER TABLE `shop_goods_rank` MODIFY `status` INT(11) NOT NULL DEFAULT 1 COMMENT '显示状态（0不显示 1显示）' AFTER `sort`;

ALTER TABLE `shop_goods` CHANGE COLUMN `is_gift` `is_gift` TINYINT NOT NULL DEFAULT 0 COMMENT '商品是否赠品(0:否 1:是)';

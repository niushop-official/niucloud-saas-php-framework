
ALTER TABLE `shop_giftcard_member_records` ADD COLUMN `give_id` INT(11) NOT NULL DEFAULT 0 COMMENT '赠予id';

ALTER TABLE `shop_giftcard_member_records` MODIFY `give_id` INT(11) NOT NULL DEFAULT 0 COMMENT '赠予id' AFTER `to_member_id`;

DROP TABLE IF EXISTS `shop_giftcard_member_card_bag`;
CREATE TABLE `shop_giftcard_member_card_bag` (
  `card_bag_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '卡包id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `giftcard_id` INT(11) NOT NULL DEFAULT 0 COMMENT '礼品卡活动id',
  `member_id` INT(11) NOT NULL DEFAULT 0 COMMENT '会员id',
  `to_use_count` INT(11) NOT NULL DEFAULT 0 COMMENT '待使用数量',
  `can_use_count` INT(11) NOT NULL DEFAULT 0 COMMENT '可使用数量',
  `used_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已使用数量',
  `invalid_count` INT(11) NOT NULL DEFAULT 0 COMMENT '已失效数量',
  `total_count` INT(11) NOT NULL DEFAULT 0 COMMENT '总数量',
  `card_right_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益类型，balance：储值余额，goods：商品',
  `balance` INT(11) NOT NULL DEFAULT 0 COMMENT '储值金额',
  `delivery_way` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '提货方式，all：全部提货，batch：分批提货',
  `card_goods_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '礼品卡权益商品类型，all：全部，diy：指定商品数量',
  `validity_type` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '有效期类型，forever：永久有效，day：购买后x天有效，date：指定过期日期',
  `is_give` TINYINT(4) NOT NULL DEFAULT 1 COMMENT '是否允许转赠，0：不允许，1：允许',
  `card_cover` VARCHAR(500) NOT NULL DEFAULT '' COMMENT '卡封面',
  `create_time` INT(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` INT(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  PRIMARY KEY (`card_bag_id`)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '礼品卡会员卡包表';

ALTER TABLE `shop_giftcard_make` MODIFY COLUMN `status` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '状态，wait：未开始，proceed：进行中，finish：完成，fail：失败';

ALTER TABLE `shop_giftcard_give` DROP COLUMN status;

ALTER TABLE `shop_giftcard_give` DROP COLUMN get_time;

ALTER TABLE `shop_giftcard_give` ADD COLUMN validity_time INT(11) NOT NULL DEFAULT 0 COMMENT '有效期';

ALTER TABLE `shop_giftcard_give` ADD COLUMN give_num INT(11) NOT NULL DEFAULT 1 COMMENT '本次赠送数量';

ALTER TABLE `shop_giftcard_give` ADD COLUMN limit_num INT(11) NOT NULL DEFAULT 0 COMMENT '限制每个会员的领取数量';

ALTER TABLE `shop_giftcard_give` ADD COLUMN card_bag_id INT(11) NOT NULL DEFAULT 0 COMMENT '卡包id';

ALTER TABLE `shop_giftcard_give` DROP COLUMN `member_card_id`;

ALTER TABLE `shop_giftcard_give` DROP COLUMN `to_member_id`;

ALTER TABLE `shop_giftcard_card` ADD COLUMN `card_bag_id` INT(11) NOT NULL DEFAULT 0 COMMENT '卡包id';

ALTER TABLE `shop_giftcard` CHANGE COLUMN `material_ids` `material_ids` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '礼品卡封面id，多个逗号隔开';

ALTER TABLE `shop_giftcard` ADD COLUMN `receive_validity_time` INT(11) NOT NULL DEFAULT 0 COMMENT '领取有效期（小时，范围：1~24）';

ALTER TABLE `shop_giftcard` MODIFY `receive_validity_time` INT(11) NOT NULL DEFAULT 0 COMMENT '领取有效期（小时，范围：1~24）' AFTER `is_give`;

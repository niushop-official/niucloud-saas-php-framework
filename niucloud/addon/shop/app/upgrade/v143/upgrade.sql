
ALTER TABLE `shop_order_goods` ADD COLUMN `form_record_id` INT(11) NOT NULL DEFAULT 0 COMMENT '万能表单记录id';

ALTER TABLE `shop_order` ADD COLUMN `form_record_id` INT(11) NOT NULL DEFAULT 0 COMMENT '万能表单记录id';

ALTER TABLE `shop_goods` ADD COLUMN `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '万能表单id';

ALTER TABLE `shop_goods` MODIFY `form_id` INT(11) NOT NULL DEFAULT 0 COMMENT '万能表单id' AFTER `poster_id`;

ALTER TABLE `shop_goods_brand` ADD COLUMN `color_json` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '自定义颜色（文字、背景、边框），json格式';

ALTER TABLE `shop_goods_brand` MODIFY `color_json` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '自定义颜色（文字、背景、边框），json格式' AFTER `desc`;

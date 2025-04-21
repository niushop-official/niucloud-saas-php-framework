
DROP TABLE IF EXISTS `shop_fenxiao_goods_rule`;
CREATE TABLE `shop_fenxiao_goods_rule` (
  `goods_rule_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `site_id` INT(11) NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_id` INT(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商品id',
  `sku_id` INT(11) NOT NULL DEFAULT 0 COMMENT '商品sku_id',
  `level_id` INT(11) NOT NULL DEFAULT 0 COMMENT '分销等级id',
  `level_name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '分销等级名称',
  `one_rate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级佣金比例',
  `two_rate` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '二级佣金比例',
  `one_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '一级佣金金额',
  `two_money` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '二级佣金金额',
  `calculate_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '计算金额',
  PRIMARY KEY (`goods_rule_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE utf8mb4_general_ci COMMENT '分销商品分佣规则表';

ALTER TABLE `shop_fenxiao_goods` CHANGE COLUMN `fenxiao_rule` `fenxiao_rule` TEXT DEFAULT NULL COMMENT '单独设置规则信息';

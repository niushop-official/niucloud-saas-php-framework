ALTER TABLE `o2o_goods` ADD COLUMN `poster_id` int NOT NULL DEFAULT 0 COMMENT '海报id';

ALTER TABLE `o2o_goods` ADD COLUMN `member_discount` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price';

ALTER TABLE `o2o_goods_sku` ADD COLUMN `member_price` text COLLATE utf8mb4_general_ci COMMENT '会员价，json格式，指定会员价，数据结构为：{"level_1":"10.00","level_2":"10.00"}';
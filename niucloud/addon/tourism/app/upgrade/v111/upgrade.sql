
ALTER TABLE `tourism_way` add poster_id int NOT NULL DEFAULT 0 COMMENT '海报id';

ALTER TABLE `tourism_scenic` add poster_id int NOT NULL DEFAULT 0 COMMENT '海报id';

ALTER TABLE `tourism_hotel` add poster_id int NOT NULL DEFAULT 0 COMMENT '海报id';

ALTER TABLE `tourism_goods` ADD COLUMN `member_discount` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '会员等级折扣，不参与：空，会员折扣：discount';

ALTER TABLE `tourism_goods` ADD COLUMN `fixed_discount` text COLLATE utf8mb4_general_ci COMMENT '等级折扣';

ALTER TABLE `tourism_goods_day` ADD COLUMN `member_price` int NOT NULL DEFAULT 0 COMMENT '会员价是否参与';
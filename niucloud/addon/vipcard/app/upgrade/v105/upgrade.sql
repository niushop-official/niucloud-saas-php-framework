ALTER TABLE `vipcard_goods` MODIFY COLUMN stock int NOT NULL DEFAULT 0 COMMENT '库存';

ALTER TABLE `vipcard_reserve` MODIFY COLUMN mobile varchar(50) NOT NULL DEFAULT '' COMMENT '客户联系方式';


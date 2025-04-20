
ALTER TABLE `shop_order` CHANGE COLUMN taker_name taker_name VARCHAR(500) NOT NULL DEFAULT '' COMMENT '收货人';

ALTER TABLE `shop_order` CHANGE COLUMN taker_address taker_address VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '收货地址';

ALTER TABLE `shop_order` CHANGE COLUMN taker_full_address taker_full_address VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '收货详细地址';

ALTER TABLE `shop_invoice` MODIFY COLUMN invoice_voucher VARCHAR(1000) NOT NULL DEFAULT '' COMMENT '发票凭证';

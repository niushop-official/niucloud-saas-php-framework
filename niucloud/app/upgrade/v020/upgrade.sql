
ALTER TABLE `sys_notice_sms_log` CHANGE COLUMN result result TEXT NULL COMMENT '短信结果';

ALTER TABLE `pay_refund` ADD COLUMN pay_refund_no VARCHAR(255) NOT NULL DEFAULT '' COMMENT '外部支付方式的退款单号';

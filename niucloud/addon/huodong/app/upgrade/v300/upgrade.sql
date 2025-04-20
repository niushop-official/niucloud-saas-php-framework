ALTER TABLE `huodong_order` ADD COLUMN `is_notice` int(11) NULL DEFAULT 0 COMMENT '消息通知:0= 未通知,1=已通知';
ALTER TABLE `huodong_act` ADD COLUMN `vip_mianfei` int(11) NULL DEFAULT 0 COMMENT '会员报名免费';
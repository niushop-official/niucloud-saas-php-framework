
ALTER TABLE wechat_reply MODIFY COLUMN reply_type varchar(30) NOT NULL DEFAULT '' COMMENT '回复类型 subscribe-关注回复 keyword-关键字回复 default-默认回复';

ALTER TABLE wechat_reply MODIFY COLUMN matching_type varchar(30) NOT NULL DEFAULT '1' COMMENT '匹配方式：full 全匹配；like-模糊匹配';

ALTER TABLE wechat_reply ADD COLUMN reply_method varchar(50) NOT NULL DEFAULT '' COMMENT '回复方式 all 全部 rand随机';

ALTER TABLE wechat_reply DROP COLUMN content_type;

ALTER TABLE wechat_reply DROP COLUMN status;

ALTER TABLE weapp_version MODIFY COLUMN fail_reason text DEFAULT NULL;

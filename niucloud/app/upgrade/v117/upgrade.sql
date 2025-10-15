ALTER TABLE activity_exchange_code
    CHANGE COLUMN activity_type activity_type VARCHAR(20) NOT NULL DEFAULT '' COMMENT '例seckill-秒杀活动';

ALTER TABLE activity_exchange_code
    ADD COLUMN type_item_id INT(11) NOT NULL DEFAULT 0 COMMENT '规格id';

ALTER TABLE member
    ADD COLUMN wxapp_openid VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信移动应用openid';

ALTER TABLE member
    MODIFY wxapp_openid VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信移动应用openid' AFTER weapp_openid;

ALTER TABLE sys_user
    ADD COLUMN mobile VARCHAR(20) NOT NULL DEFAULT '' COMMENT '手机号';
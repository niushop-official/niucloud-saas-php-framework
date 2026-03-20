DROP TABLE IF EXISTS `site_merchant_bind`;
CREATE TABLE `site_merchant_bind`
(
    id            int NOT NULL AUTO_INCREMENT,
    site_id       int NOT NULL DEFAULT 0 COMMENT '站点id',
    wechat_openid VARCHAR(255) NOT NULL DEFAULT '' COMMENT '微信openid',
    weapp_openid  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '小程序openid',
    mobile        VARCHAR(20)  NOT NULL DEFAULT '' COMMENT '手机号',
    extends       TEXT                  DEFAULT NULL COMMENT '扩展数据 微信用户信息/小程序用户信息',
    create_time   int NOT NULL DEFAULT 0 COMMENT '创建时间',
    update_time   int NOT NULL DEFAULT 0 COMMENT '更新时间',
    PRIMARY KEY (id)
) ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = '商户信息接收账号绑定表';
 DROP TABLE IF EXISTS `{{prefix}}ly_shareholder_goods`;
CREATE TABLE `{{prefix}}ly_shareholder_goods`
(
    `shareholder_goods_id`        int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `goods_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '商品id',
    `o2o_goods_id`                int                                                   NOT NULL DEFAULT 0 COMMENT 'o2o商品id',
    `is_shareholder`              tinyint(4)                                            NOT NULL DEFAULT 1 COMMENT '是否参与股东分红，0=否，1=是',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',
    
    PRIMARY KEY (`shareholder_goods_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东分红商品表';


DROP TABLE IF EXISTS `{{prefix}}ly_shareholder`;
CREATE TABLE `{{prefix}}ly_shareholder`
(
    `shareholder_id`        int                                                           NOT NULL AUTO_INCREMENT,
    `site_id`               int                                                           NOT NULL DEFAULT 0 COMMENT '站点id',
    `shareholder_no`        varchar(255)    CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '股东编号',
    `member_id`             int                                                           NOT NULL DEFAULT 0 COMMENT '会员id',    
    `level_id`              int                                                           NOT NULL DEFAULT 0 COMMENT '股东等级id',  
    `rate`                  decimal(10,2)                                                 NOT NULL DEFAULT 0 COMMENT '分红比例',
    `order_amount`          decimal(10, 2)                                                NOT NULL DEFAULT 0.00 COMMENT '结算金额,周期销售额或利润',
    `amount`                decimal(10, 2)                                                NOT NULL DEFAULT 0.00 COMMENT '可用分红金额(可提现)',
    `amount_get`            decimal(12, 2)                                                NOT NULL DEFAULT 0.00 COMMENT '已提现分红金额',
    `amount_cash_outing`    decimal(12, 2)                                                NOT NULL DEFAULT 0.00 COMMENT '提现中分红金额',
    `settle_time`           tinyint(4)                                                    NOT NULL DEFAULT 0 COMMENT '结算周期：0天，1周，2月，3季度，4年',
    `status`                tinyint(1)                                                    NOT NULL DEFAULT 1 COMMENT '状态，0=冻结，1=正常',
    `create_time`           int                                                           NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`           int                                                           NOT NULL DEFAULT 0 COMMENT '更新时间',
    `delete_time`           int                                                           NOT NULL DEFAULT 0 COMMENT '删除时间',
    `lock_time`             int                                                           NOT NULL DEFAULT 0 COMMENT '冻结时间',    
    
    PRIMARY KEY (`shareholder_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东分红统计表';


DROP TABLE IF EXISTS `{{prefix}}ly_shareholder_set`;
CREATE TABLE `{{prefix}}ly_shareholder_set`
(
    `id`                int                                                            NOT NULL AUTO_INCREMENT COMMENT '',
    `site_id`           int                                                            NOT NULL DEFAULT 0 COMMENT '站点id',
    `is_open`           tinyint(1)                                                     NULL DEFAULT 0 COMMENT '是否开启股东，0关闭，1开启',
    `is_max`            tinyint(1)                                                     NULL DEFAULT 0 COMMENT '是否开启封顶功能',
    `is_commission`     tinyint(1)                                                     NULL DEFAULT 0 COMMENT '是否开启股东分红条件',
    `is_o2o`            tinyint(1)                                                     NULL DEFAULT 0 COMMENT '是否开启o2o商品股东分红',
    `min_order`         int                                                            NULL  COMMENT '周期内最低消费单数',
    `min_order_amount`  decimal(12,2)                                                  NULL  COMMENT '周期内最低消费金额',
    `settle_type`       tinyint(2)                                                     NULL DEFAULT 0 COMMENT '结算方式：0营业额，1利润，周期内',
    `take_type`         tinyint(4)                                                     NOT NULL DEFAULT 0 COMMENT '提成类型：0余额，1佣金，2积分',
    `settle_time`       tinyint(4)                                                     NOT  NULL DEFAULT 0 COMMENT '结算周期：0天，1周，2月，3季度，4年',
    `settle_condition`  tinyint(4)                                                     NOT  NULL DEFAULT 0 COMMENT '结算条件：0订单支付后，1订单完成后',        
    `create_time`       int                                                            NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`       int                                                            NULL DEFAULT 0 COMMENT '更新时间',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东分红设置表';


DROP TABLE IF EXISTS `{{prefix}}ly_shareholder_log`;
CREATE TABLE `{{prefix}}ly_shareholder_log`
(
    `id`                 int                                                      UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
    `member_id`          int                                                      NOT NULL DEFAULT 0 COMMENT '会员ID',
    `shareholder_id`     int                                                      NOT NULL DEFAULT 0 COMMENT '股东ID',
    `site_id`            int                                                      NOT NULL DEFAULT 0 COMMENT '站点id',
    `order_amount`       decimal(12,2)                                            NOT NULL DEFAULT 1 COMMENT '结算金额',
    `rate`               decimal(10,2)                                            NULL DEFAULT 0 COMMENT '分红比例',
    `level_id`         int                                                      NOT NULL COMMENT '股东等级ID',
    `level_name`    varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '股东等级名称',
    `level_num`          int                                                      NOT NULL COMMENT '同等级人数',
    `amount`             decimal(10,2)                                            NULL DEFAULT 0 COMMENT '分红金额',
    `is_settlement`      tinyint(2)                                               NOT NULL DEFAULT 0 COMMENT '是否结算，0未结算，1已结算',
    `settle_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '结算时间',  
    `is_send`            tinyint(2)                                               NOT NULL DEFAULT 0 COMMENT '是否发放，0未发放，1已发放',
    `send_time`          int                                                      NOT NULL DEFAULT 0 COMMENT '发放时间',
    `create_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '更新时间',
    `delete_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '删除时间',

    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东分红记录表';


DROP TABLE IF EXISTS `{{prefix}}ly_shareholder_black`;
CREATE TABLE `{{prefix}}ly_shareholder_black`
(
    `id`                 int                                                      UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键id',
    `site_id`            int                                                      NOT NULL DEFAULT 0 COMMENT '站点id',
    `shareholder_id`     int                                                      NOT NULL DEFAULT 0 COMMENT '股东ID',
    `member_id`          int                                                      NOT NULL DEFAULT 0 COMMENT '会员ID',
    `create_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`        int                                                      NOT NULL DEFAULT 0 COMMENT '更新时间',

    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东黑名单表';


DROP TABLE IF EXISTS `{{prefix}}ly_shareholder_level`;
CREATE TABLE `{{prefix}}ly_shareholder_level`
    (
        `level_id`        int                                        UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '股东分红等级id',
        `site_id`                     int                                        NOT NULL DEFAULT 0 COMMENT '站点id',
        `level_name`                  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '等级名称',
        `level_num`                   int                                        NOT NULL DEFAULT 0 COMMENT '等级权重',
        `rate`                        decimal(10,2)                              NOT NULL DEFAULT 0.00 COMMENT '股东分红比例',
        `max_money`                   decimal(10,2)                              NULL DEFAULT 0.00 COMMENT '封顶金额',
        `upgrade_type`                tinyint                                    NOT NULL DEFAULT 0 COMMENT '升级方式（0满足任意条件,1满足所有条件）',
        `upgrade_order_num`           int                                        NOT NULL DEFAULT 0 COMMENT '升级订单数量',
        `order_num`                   int                                        NOT NULL DEFAULT 0 COMMENT '自购订单总数',
        `order_money`                 decimal(10, 2)                             NOT NULL DEFAULT 0.00 COMMENT '自购订单总额',
        `recharge_money`              decimal(10,2)                              NOT NULL DEFAULT 0.00 COMMENT '充值金额',
        `order_goods_id`              varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '购买指定商品id',
        `order_goods_category_id`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '购买指定商品分类id',
        `status`                      tinyint                                    NOT NULL DEFAULT 1 COMMENT '状态（0关闭 1启用）',
        `is_default`                  tinyint                                    NULL COMMENT '是否默认等级（0否 1是）',
        `create_time`                 int                                        NOT NULL DEFAULT 0 COMMENT '创建时间',
        `update_time`                 int                                        NOT NULL DEFAULT 0 COMMENT '更新时间',

        PRIMARY KEY (`level_id`) USING BTREE
    ) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '股东分红等级表';



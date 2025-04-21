DROP TABLE IF EXISTS `{{prefix}}ly_area_set`;
CREATE TABLE `{{prefix}}ly_area_set`
(
    `id`                          int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `is_open`                     tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '是否开启',
    `is_become`                   tinyint(1)                                            NOT NULL DEFAULT 1 COMMENT '申请是否需要审核,0否，1是',
    `can_apply_again`             tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '被拒是否可以再次申请,0否，1是',
    `become_many`                 tinyint(2)                                            NULL DEFAULT 0 COMMENT '可代理多区域,0否，1是',
    `count_type`                  tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '佣金计算方式,0实付金额，1利润，2商品现价',
    `take_type`                   tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '佣金类型,0余额，1佣金，2积分，3数字积分',
    `count_way`                   tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '计算方式,0支付后，1完成后',
    `is_avg`                      tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '是否开启平均奖励,0否，1是',
    `is_level`                    tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '是否开启级差奖励,0否，1是',
    `is_street`                   tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '是否开启街道奖励,0否，1是',
    `province_rate`               decimal(5,2)                                          NOT NULL DEFAULT 0 COMMENT '省的默认奖励',
    `city_rate`                   decimal(5,2)                                          NOT NULL DEFAULT 0 COMMENT '市的默认奖励',
    `district_rate`               decimal(5,2)                                          NOT NULL DEFAULT 0 COMMENT '区县的默认奖励',
    `street_rate`                 decimal(5,2)                                          NOT NULL DEFAULT 0 COMMENT '街道的默认奖励',
    `settle_cycle`                tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '结算周期按天',
    `settle_type`                 tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '结算类型,0自动结算，1手动结算',
    `notice`                      text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '代理公告通知',
    `is_agreement`                tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '申请协议开关',
    `agreement_content`           text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '申请协议的内容',
    `background_image`            text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '申请协议页背景图的路径',
    `apply_backimg`               text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '申请页顶部背景图的路径',
    `agent_auth`                  text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '代理权限',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',
    
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域分红设置表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_agent`;
CREATE TABLE `{{prefix}}ly_area_agent`
(
    `agent_id`                    int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `member_id`                   int                                                   NOT NULL DEFAULT 0 COMMENT '用户id',
    `province_id`                 int                                                   NULL  COMMENT '省id',  
    `city_id`                     int                                                   NULL COMMENT '市id',
    `district_id`                 int                                                   NULL COMMENT '区id',
    `street_id`                   int                                                   NULL COMMENT '街道id',
    `full_area`                   text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '代理区域',
    `status`                      tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '状态,0正常，1冻结',
    `agent_level`                 tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '0：无效；1：省代；2：市代；3：区代：4：街道代理',
    `level_id`                    int                                                   NULL  COMMENT '代理等级id',
    `rate`                        decimal(10,2)                                         NULL COMMENT '分红比例',
    `area_count_money`            decimal(10,2)                                         NULL COMMENT '累计分红金额',
    `settle_count_money`          decimal(12,2)                                         NULL COMMENT '累计结算分红金额',
    `already_settle_money`        decimal(10,2)                                         NULL COMMENT '已结算分红金额',
    `unsettled_money`             decimal(10,2)                                         NULL COMMENT '未结算分红金额',
    `amount_withdraw`             decimal(10,2)                                         NULL COMMENT '已提现金额',
    `login_name`                  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '登录账号',
    `login_pass`                  varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '登录密码',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',  
    `delete_time`                 int                                                   NULL COMMENT '删除时间',
    
    PRIMARY KEY (`agent_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域代理表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_log`;
CREATE TABLE `{{prefix}}ly_area_log`
(
     `id`                          int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
     `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
     `member_id`                   int                                                   NOT NULL DEFAULT 0 COMMENT '用户id',
     `buy_mid`                     int                                                   NOT NULL DEFAULT 0 COMMENT '下单用户id',
     `agent_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '代理id',
     `level_id`                    int(4)                                                NULL DEFAULT 0 COMMENT '区域代理等级',
     `agent_area`                  varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '代理区域',
     `order_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '订单id',
     `order_amount`                decimal(10,2)                                         NULL COMMENT '订单金额',
     `order_goods_id`              int                                                   NULL COMMENT '订单商品id',
     `amount`                      decimal(10,2)                                         NULL COMMENT '分红结算金额',
     `level_rate`                  decimal(10,2)                                         NOT NULL DEFAULT 0 COMMENT '等级分红比例',
     `level_money`                 decimal(10,2)                                         NOT NULL DEFAULT 0 COMMENT '等级分红金额',
     `lower_level_rate`            decimal(10,2)                                         NULL COMMENT '下级分红比例',   
     `level_agents`                int                                                   NULL COMMENT '同级人数',
     `dividend_amount`             decimal(10,2)                                         NULL COMMENT '分红金额',
     `status`                      tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '分红状态 0:未结算 1：已结算',
     `is_send`                     tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '是否发放 0：未发放 1：已发放',
     `send_time`                   int                                                   NULL COMMENT '发放时间',
     `create_month`                varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '结算月份',
     `recrive_at`                  int                                                   NULL COMMENT '收货时间',
     `settle_days`                 int                                                   NULL COMMENT '结算天数',
     `settle_time`                 int                                                   NULL COMMENT '结算时间',
     `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
     `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',
     `delete_time`                 int                                                   NULL COMMENT '删除时间',
     
     PRIMARY KEY (`id`) USING BTREE
				
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域代理分红记录表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_order`;
CREATE TABLE `{{prefix}}ly_area_order`
(
    `id`                          int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `member_id`                   int                                                   NOT NULL DEFAULT 0 COMMENT '会员id',
    `order_sn`                    varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '订单号',
    `order_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '订单id',
    `order_amount`                decimal(10,2)                                         NULL COMMENT '订单金额',
    `order_area`                  varchar(255)                                          NULL COMMENT '订单所属区域',
    `agent_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '代理id',
    `agent_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '代理名称',
    `agent_level`                 tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '代理等级',
    `agent_area`                  varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '代理区域',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',

    PRIMARY key(`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域代理订单表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_goods`;
CREATE TABLE `{{prefix}}ly_area_goods` (
  `id`                          int(11)                                                 NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `site_id`                     int(11)                                                 NOT NULL DEFAULT '0' COMMENT '站点id',
  `goods_id`                    int(11)                                                 NOT NULL DEFAULT 0 COMMENT '商品id',
  `is_area`                     tinyint(1)                                              NOT NULL DEFAULT 0 COMMENT '是否区域代理商品：0否，1是',
  `is_rule`                     tinyint(1)                                              NOT NULL DEFAULT 0 COMMENT '是否独立规则：0否，1是',
  `area_rule`                   text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci   NULL COMMENT '独立规则设置',
  `province_rate`               decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '省级代理费率',
  `city_rate`                   decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '市级代理费率',
  `district_rate`               decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '区级代理费率',
  `street_rate`                 decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '街道代理费率',
  `province_money`              decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '省级代理金额',
  `city_money`                  decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '市级代理金额',
  `district_money`              decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '区级代理金额',
  `street_money`                decimal(10,2)                                           NOT NULL DEFAULT 0.00 COMMENT '街道代理金额',
  `create_time`                 int                                                     NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time`                 int                                                     NOT NULL DEFAULT 0 COMMENT '更新时间',

  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='区域代理商品表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_level`;
CREATE TABLE `{{prefix}}ly_area_level`
(
    `level_id`                    int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `level_name`                  varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '等级名称',
    `level_num`                   int                                                   NOT NULL DEFAULT 0 COMMENT '等级权重',
    `level_area`                  tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '代理区域：0无，1省，2市，3区，4街道',
    `level_rate`                  decimal(10,2)                                         NULL COMMENT '分红比例',
    `level_money`                 decimal(10,2)                                         NULL COMMENT '分红金额',
    `up_type`                     tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '升级方式：0或，1与',
    `order_goods_id`              text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '购买指定商品之一',
    `order_money`                 decimal(10,2)                                         NULL COMMENT '自购订单金额',
    `status`                      tinyint                                               NOT NULL DEFAULT 1 COMMENT '状态（0关闭 1启用）',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',

    PRIMARY key(`level_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域代理等级表';


DROP TABLE IF EXISTS `{{prefix}}ly_area_apply`;
CREATE TABLE `{{prefix}}ly_area_apply`
(
    `apply_id`                    int                                                   NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                     int                                                   NOT NULL DEFAULT 0 COMMENT '站点id',
    `member_id`                   int                                                   NOT NULL DEFAULT 0 COMMENT '用户id',
    `agent_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '代理id',
    `level_area`                  tinyint(2)                                            NOT NULL DEFAULT 0 COMMENT '代理区域：0无，1省，2市，3区，4街道',
    `apply_area`                  varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '代理区域',
    `level_id`                    int                                                   NOT NULL DEFAULT 0 COMMENT '代理等级id',
    `province_id`                 int                                                   NULL COMMENT '省id',
    `city_id`                     int                                                   NULL COMMENT '市id',
    `district_id`                 int                                                   NULL COMMENT '区县id',
    `status`                      tinyint                                               NOT NULL DEFAULT 0 COMMENT '状态（0待审核, 1通过,2拒绝）',
    `reason`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '拒绝原因',
    `create_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '更新时间',
    `delete_time`                 int                                                   NOT NULL DEFAULT 0 COMMENT '删除时间',

    PRIMARY key(`apply_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域代理申请记录表';




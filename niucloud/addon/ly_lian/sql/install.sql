
  INSERT INTO `{{prefix}}sys_dict` (`name`, `key`, `dictionary`) VALUES ('开关：开启关闭，正常禁用', 'is_open', '"[{\"name\":\"\u5173\",\"value\":\"0\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u5f00\",\"value\":\"1\",\"sort\":0,\"memo\":\"\"}]"');
  INSERT INTO `{{prefix}}sys_dict` (`name`, `key`, `dictionary`) VALUES ('结算条件：支付后，完成后', 'settle_condition', '"[{\"name\":\"\u8ba2\u5355\u652f\u4ed8\u540e\",\"value\":\"0\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u8ba2\u5355\u5b8c\u6210\u540e\",\"value\":\"1\",\"sort\":0,\"memo\":\"\"}]"');
  INSERT INTO `{{prefix}}sys_dict` (`name`, `key`, `dictionary`) VALUES ('订单计算方式：支付金额，商品现价，原价', 'count_type', '"[{\"name\":\"\u8ba2\u5355\u652f\u4ed8\u91d1\u989d\",\"value\":\"0\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u5546\u54c1\u73b0\u4ef7\",\"value\":\"1\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u5546\u54c1\u539f\u4ef7\",\"value\":\"2\",\"sort\":0,\"memo\":\"\"}]"');
  INSERT INTO `{{prefix}}sys_dict` (`name`, `key`, `dictionary`) VALUES ('提成方式：余额，佣金、积分', 'take_type', '"[{\"name\":\"\u4f59\u989d\",\"value\":\"0\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u4f63\u91d1\",\"value\":\"1\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u79ef\u5206\",\"value\":\"2\",\"sort\":0,\"memo\":\"\"},{\"name\":\"\u6570\u5b57\u79ef\u5206\",\"value\":\"3\",\"sort\":0,\"memo\":\"\"}]"');


DROP TABLE IF EXISTS `{{prefix}}ly_lian_set`;
CREATE TABLE `{{prefix}}ly_lian_set`
(
    `id`                         int(11)                                               NOT NULL AUTO_INCREMENT COMMENT '主键Id',
    `site_id`                    int(11)                                               NOT NULL DEFAULT 0 COMMENT '站点id',
    `is_open`                    tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '是否开启应用',
    `up_register`                tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '注册升级：0否，1是',
    `up_way`                     tinyint(4)                                            NOT NULL DEFAULT 0 COMMENT '升级触发方式，0=支付后，1=完成后',
    `take_type`                  tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '提成类型：0余额，1佣金，2积分，3数字积分',
    `settle_way`                 tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '结算方式：0订单支付后，1订单完成后',
    `settle_cycle`               int(11)                                               NOT NULL DEFAULT 0 COMMENT '结算周期：按天',
    `count_type`                 tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '计算方式：0支付金额，1商品现价，2商品原价',
    `first_reward_frozen`        tinyint(1)                                            NOT NULL DEFAULT 0 COMMENT '直推奖励冻结：0否，1是',
    `create_time`                int(11)                                               NOT NULL DEFAULT 0 COMMENT '创建时间',
    `update_time`                int(11)                                               NOT NULL DEFAULT 0 COMMENT '更新时间',
    
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '链动2+1设置表';



DROP TABLE IF EXISTS `{{prefix}}ly_lian_level`;
CREATE TABLE `{{prefix}}ly_lian_level` 
(
  `level_id`                    int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `level_name`                  varchar(100)                                  NOT NULL DEFAULT 0 COMMENT '等级名称',
  `level_num`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '等级权重',
  `recommend_money`             decimal(10,2)                                 NOT NULL DEFAULT 0 COMMENT '直推奖固定金额',
  `recommend_rate`              decimal(10,2)                                 NOT NULL DEFAULT 0.00 COMMENT '直推奖比例',
  `see_money`                   decimal(10,2)                                 NOT NULL DEFAULT 0 COMMENT '见点奖固定金额',
  `see_rate`                    decimal(10,2)                                 NOT NULL DEFAULT 0.00 COMMENT '见点奖比例',
  `cultivate_money`             decimal(10,2)                                 NOT NULL DEFAULT 0 COMMENT '感恩奖固定金额',
  `cultivate_rate`              decimal(10,2)                                 NOT NULL DEFAULT 0.00 COMMENT '感恩奖比例',
  `equal_money`                 decimal(10,2)                                 NOT NULL DEFAULT 0 COMMENT '平级奖固定金额',
  `equal_rate`                  decimal(10,2)                                 NOT NULL DEFAULT 0.00 COMMENT '平级奖比例',
  `upgrade_type`                tinyint(1)                                    NOT NULL DEFAULT 0 COMMENT '升级方式（0满足任意条件,1满足所有条件）',
  `order_money`                 decimal(10, 2)                                NOT NULL DEFAULT 0.00 COMMENT '自购订单总额',
  `recharge_money`              decimal(10,2)                                 NOT NULL DEFAULT 0.00 COMMENT '充值金额',
  `recommend_num`               int                                           NOT NULL DEFAULT 0 COMMENT '直推人数',
  `up_goods_id`                 varchar(255)                                  NULL  COMMENT '购买指定商品之一',
  `up_goods_num`                int(11)                                       NULL DEFAULT 0  COMMENT '购买指定商品数量',
  `up_register`                 tinyint(1)                                    NOT NULL DEFAULT 0 COMMENT '注册升级（0关,1开）',
  `see_frozen`                  tinyint(1)                                    NULL DEFAULT 0 COMMENT '见点奖冻结：0否，1是',
  `cultivate_frozen`            tinyint(1)                                    NULL DEFAULT 0 COMMENT '感恩奖冻结：0否，1是',
  `frozen_rate`                 decimal(10,2)                                 NULL DEFAULT 0.00 COMMENT '冻结比例',
  `task_boss_num`               int(11)                                       NULL DEFAULT 0 COMMENT '直推代理升级为组长数量',
  `task_boss_first`             tinyint(1)                                    NULL DEFAULT 1 COMMENT '直推前二代理升级为组长：0否，1是',
  `task_limit_days`             int(11)                                       NULL DEFAULT 0 COMMENT '任务有效天数，为空为0不限制，超时则冻结奖励失效',
  `status`                      tinyint                                       NOT NULL DEFAULT 1 COMMENT '状态（0关闭 1启用）',
  `is_default`                  tinyint(1)                                    NULL COMMENT '是否默认等级：0否，1是',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',

  PRIMARY KEY (`level_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1等级表';


DROP TABLE IF EXISTS `{{prefix}}ly_lian_goods`;
CREATE TABLE `{{prefix}}ly_lian_goods` 
(
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `goods_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '商品id',
  `is_lian`                     tinyint(1)                                    NOT NULL DEFAULT 0 COMMENT '是否参与链动：0否，1是',
  `is_rule`                     tinyint(1)                                    NOT NULL DEFAULT 1 COMMENT '是否独立设置规则：1默认，2独立',
  `reward_set`                  text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci  NULL  COMMENT '单独奖励设置',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',

  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_ly_lian_goods_goods_id`  USING BTREE (`goods_id` ASC)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1商品表';


DROP TABLE IF EXISTS `{{prefix}}ly_lian_member`;
CREATE TABLE `{{prefix}}ly_lian_member` 
(
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id',
  `pid`                         int(11)                                       NOT NULL DEFAULT 0 COMMENT '直推上级会员ID',
  `lian_pid`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '有链动身份的上级会员ID',
  `level_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '等级ID',  
  `child_mid1`                  int(11)                                       NULL DEFAULT 0 COMMENT '前1个直推下级会员ID',
  `child_mid2`                  int(11)                                       NULL DEFAULT 0 COMMENT '前2个直推下级会员ID', 
  `child_num`                   int(11)                                       NULL DEFAULT 0 COMMENT '直推下级会员数量', 
  `commission`                  decimal(12,2)                                 NULL DEFAULT 0.00 COMMENT '总收益',
  `give_commission`             decimal(12,2)                                 NULL DEFAULT 0.00 COMMENT '已发放收益',
  `frozen_commission`           decimal(12,2)                                 NULL DEFAULT 0.00 COMMENT '冻结收益',  
  `status`                      tinyint(1)                                    NULL DEFAULT 0 COMMENT '状态：0正常，1冻结', 
  `thaw_status`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '解冻任务状态：0未完成，1已完成',  
  `up_time`                     int(11)                                       NULL DEFAULT 0 COMMENT '升级为老板时间',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间,成为代理时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',

  PRIMARY KEY (`id`) USING BTREE,  
  INDEX `IDX_ly_lian_member_member_id`  USING BTREE (`member_id` ASC),  
  INDEX `IDX_ly_lian_member_pid`  USING BTREE (`pid` ASC),  
  INDEX `IDX_ly_lian_member_lian_pid`  USING BTREE (`lian_pid` ASC)

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1会员表';


DROP TABLE IF EXISTS `{{prefix}}ly_lian_reward`;
CREATE TABLE `{{prefix}}ly_lian_reward` 
(  
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id',  
  `level_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '等级id',  
  `buy_mid`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '购买者会员ID',  
  `order_id`                    int(11)                                       NULL DEFAULT 0 COMMENT '订单号',
  `order_goods_id`              int(11)                                       NULL DEFAULT 0 COMMENT '订单商品ID',  
  `settle_cycle`                int(11)                                       NULL DEFAULT 0 COMMENT '结算周期，天数',  
  `settle_amount`               decimal(10,2)                                 NULL DEFAULT 0 COMMENT '奖励计算金额',  
  `give_rate`                   decimal(10,2)                                 NULL DEFAULT 0 COMMENT '奖励比例',  
  `give_amount`                 decimal(10,2)                                 NULL DEFAULT 0 COMMENT '奖励金额', 
  `frozen_rate`                 decimal(10,2)                                 NULL DEFAULT 0 COMMENT '冻结比例',  
  `frozen_amount`               decimal(10,2)                                 NULL DEFAULT 0 COMMENT '冻结金额',  
  `reward_type`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '奖励类型：0直推、1见点、2培育、3、平级奖、9解冻结算',
  `thaw_status`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '解冻状态: -1失效、0待解冻、1已解冻',
  `status`                      tinyint(1)                                    NULL DEFAULT 0 COMMENT '奖励状态：-1失效、0预计收益、1待结算、1已结算',
  `settle_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '结算时间',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',
  `unfrozen_time`               int(11)                                       NULL DEFAULT 0 COMMENT '解冻时间',

  PRIMARY KEY (`id`) USING BTREE,  
  INDEX `IDX_ly_lian_reward_member_id`  USING BTREE (`member_id` ASC),  
  INDEX `IDX_ly_lian_reward_buy_mid`  USING BTREE (`buy_mid` ASC),  
  INDEX `IDX_ly_lian_reward_order_id`  USING BTREE (`order_id` ASC),
  INDEX `IDX_ly_lian_reward_status`  USING BTREE (`status` ASC),  
  INDEX `IDX_ly_lian_reward_thaw_status`  USING BTREE (`thaw_status` ASC)

) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1奖励表';



DROP TABLE IF EXISTS `{{prefix}}ly_lian_thaw_task`;
CREATE TABLE `{{prefix}}ly_lian_thaw_task` 
(  
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id',  
  `need_num`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '解冻需要帮扶的人数',  
  `limit_day`                   int(11)                                       NULL DEFAULT 0  COMMENT '限制天数',  
  `need_mid`                    int(11)                                       NULL DEFAULT 0 COMMENT '需要帮扶的会员ID',
  `task_status`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '任务状态：-1失效、0未完成、1已完成',
  `expire_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '截止时间',  
  `complete_time`               int(11)                                       NULL DEFAULT 0 COMMENT '任务完成时间',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间，任务开始时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',

  PRIMARY KEY (`id`) USING BTREE,  
  INDEX `IDX_ly_lian_thaw_task_member_id`  USING BTREE (`member_id` ASC)

)ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1解冻任务表';


DROP TABLE IF EXISTS `{{prefix}}ly_lian_change`;
CREATE TABLE `{{prefix}}ly_lian_change`   (  

  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id',  
  `pid`                         int(11)                                       NOT NULL DEFAULT 0 COMMENT '直推上级会员ID',
  `lian_pid`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '有链动身份的上级会员ID',
  `new_lian_pid`                int(11)                                       NOT NULL DEFAULT 0 COMMENT '新链动上级会员ID',
  `level_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '等级ID',  
  `child_mid`                   int(11)                                       NULL DEFAULT 0 COMMENT '下级会员ID',  
  `child_type`                  tinyint(1)                                    NULL DEFAULT 0 COMMENT '下级类型：0直推、1继承、2离队、3老板',
  `remark`                      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL  COMMENT '备注',  
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',  

  PRIMARY KEY (`id`) USING BTREE

)ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1关系变动表';


DROP TABLE IF EXISTS `{{prefix}}ly_lian_thaw_log`;
CREATE TABLE `{{prefix}}ly_lian_thaw_log`  (  
  
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id',  
  `thaw_id`                     int(11)                                       NULL DEFAULT 0 COMMENT '解冻任务ID',  
  `need_mid`                    int(11)                                       NULL DEFAULT 0 COMMENT '需帮扶会员ID',  
  `status`                      tinyint(1)                                    NULL DEFAULT 0 COMMENT '任务状态：0未完成1已完成',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',  

  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_ly_lian_thaw_log_member_id`  USING BTREE (`member_id` ASC),  
  INDEX `IDX_ly_lian_thaw_log_thaw_id`  USING BTREE (`thaw_id` ASC),  
  INDEX `IDX_ly_lian_thaw_log_need_mid`  USING BTREE (`need_mid` ASC)

)ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1解冻进度表';



DROP TABLE IF EXISTS `{{prefix}}ly_lian_pingji_log`;
CREATE TABLE `{{prefix}}ly_lian_pingji_log`  (  
  
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `level_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '等级id',  
  `member_id`                   int(11)                                       NOT NULL DEFAULT 0 COMMENT '会员id', 
  `buy_mid`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '购买会员id',  
  `order_id`                    int(11)                                       NOT NULL DEFAULT 0 COMMENT '订单id',  
  `order_goods_id`              int(11)                                       NULL DEFAULT 0 COMMENT '订单商品id',  
  `reward_type`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '奖励类型：0直推奖，1平级奖', 
  `count_money`                 decimal(10, 2)                                NULL DEFAULT 0.00 COMMENT '奖励计算金额，平级会员获得的奖励金额',
  `commission`                  decimal(10,2)                                 NULL DEFAULT 0.00 COMMENT '平级奖金额',
  `status`                      tinyint(1)                                    NULL DEFAULT 0 COMMENT '发放状态：0结算中1已结算',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',  

  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_ly_lian_pingji_log_member_id`  USING BTREE (`member_id` ASC)

)ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1平级奖记录表';

DROP TABLE IF EXISTS `{{prefix}}ly_lian_pingji_set`;
CREATE TABLE `{{prefix}}ly_lian_pingji_set`  (  
  
  `id`                          int(11)                                       NOT NULL AUTO_INCREMENT COMMENT '主键Id',  
  `site_id`                     int(11)                                       NOT NULL DEFAULT 0 COMMENT '站点id',
  `is_open`                     tinyint(1)                                    NULL DEFAULT 0 COMMENT '是否开启：0关闭1开启',  
  `pingji_type`                 tinyint(1)                                    NULL DEFAULT 0 COMMENT '平级奖类型：0比例1固定金额',  
  `pingji_level`                int(11)                                       NULL DEFAULT 1 COMMENT '平级奖层级',  
  `pingji_rate`                 decimal(10, 2)                                NULL DEFAULT 0.00 COMMENT '平级奖比例/固定金额',
  `create_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '创建时间',  
  `update_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '更新时间',  
  `delete_time`                 int(11)                                       NULL DEFAULT 0 COMMENT '删除时间',  

  PRIMARY KEY (`id`) USING BTREE
)ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='链动2+1平级奖记录表';
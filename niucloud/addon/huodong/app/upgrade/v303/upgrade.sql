ALTER TABLE `huodong_order` ADD COLUMN `point` int(11) NULL COMMENT '获得积分';
ALTER TABLE `huodong_order` ADD COLUMN `is_jiangli` int(1) NULL DEFAULT 0 COMMENT '是否已经发放奖励1=已发放,0=未发放';
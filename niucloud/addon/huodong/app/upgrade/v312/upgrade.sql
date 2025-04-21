ALTER TABLE `huodong_order`
    ADD COLUMN `form_record_id` int(0) NULL COMMENT '表单记录id' AFTER `shipinhao_url`;
ALTER TABLE `huodong_act`
    ADD COLUMN `form_id` int(0) NULL COMMENT '表单id' AFTER `poster_id`;

ALTER TABLE `huodong_order`
    ADD COLUMN `form_id` int(0) NULL AFTER `form_record_id`;
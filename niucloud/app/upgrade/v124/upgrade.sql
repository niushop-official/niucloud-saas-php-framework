ALTER TABLE weapp_version
    CHANGE COLUMN task_key task_key varchar(255) NOT NULL DEFAULT '' COMMENT '上传任务key';

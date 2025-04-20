<?php

namespace addon\ly_shareholder\app\model;
use addon\ly_shareholder\app\model\ShareholderLevel;
use core\base\BaseModel;

class Config extends BaseModel
{
    protected $pk = 'id';

    protected $name = 'ly_shareholder_set';

    //获取股东等级列表
    public function ShareholderLevel(){//待确认
        return $this->hasOne(ShareholderLevel::class,'level_id','level_id')->joinType('LEFT')->withField('level_id,level_name')->bind(['level_id_name' => 'level_name']);
    }
}
<?php

namespace addon\ly_area\app\model;

use core\base\BaseModel;

class AreaConfig extends BaseModel
{
    protected $pk = 'id';

    protected $name = 'ly_area_set';

    public function getTakeTypeAttr($value){
         //0余额，1佣金，2积分
         $type = [
            '0' => 'balance',
            '1' => 'commission',
            '2' => 'point',
        ];
        return $type[$value];
    }

}
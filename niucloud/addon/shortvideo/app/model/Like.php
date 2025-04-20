<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shortvideo\app\model;

use core\base\BaseModel;

class Like extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shortvideo_like';

    public function searchAdddateAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
        }
    }


    /**
     * 搜索器:
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("name", "like", "%".$value."%");
        }
    }

    /**
     * 搜索器:
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value!=='') {
            $query->where("status", $value);
        }
    }
}



<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\o2o\app\model;

use core\base\BaseModel;

/**
 * 岗位模型
 * Class Technician
 * @package app\model\o2o_technician
 */
class Position extends BaseModel
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
    protected $name = 'o2o_position';


    public function searchNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where([ [ 'name', 'like', '%' . $value . '%' ] ]);
        }
    }
}

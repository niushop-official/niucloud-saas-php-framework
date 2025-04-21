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
use think\model\relation\HasOne;

/**
 * 技师项目模型
 * Class Technician
 * @package app\model\o2o_technician
 */
class TechnicianGoods extends BaseModel
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
    protected $name = 'o2o_technician_goods';


    /**
     * 关联项目
     * @return HasOne
     */
    public function goodsInfo()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')->with(['goodsSku']);
    }

}

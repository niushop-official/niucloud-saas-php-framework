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

namespace addon\tourism\app\model;

use core\base\BaseModel;

/**
 * 商品单日信息模型
 * Class GoodsDay
 * @package app\model\goods
 */
class GoodsDay extends BaseModel
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
    protected $name = 'tourism_goods_day';

    /**
     * 库存
     * @param $value
     * @return mixed
     */
    public function getStockAttr($value, $data)
    {
        if(isset($data['stock_all']) & isset($data['sell_num']))
        {
            $stock = $data['stock_all'] - $data['sell_num'];
            return $stock >= 0 ? $stock : 0;
        }
    }


    /**
     * 关联商品表
     * @return \think\model\relation\HasOne
     */
    public function goods() {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id');
    }
}

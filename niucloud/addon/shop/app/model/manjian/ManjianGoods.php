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

namespace addon\shop\app\model\manjian;


use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use core\base\BaseModel;

/**
 * 满减送活动商品模型
 */
class ManjianGoods extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'manjian_goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_manjian_goods';

    protected $type = [

    ];

    /**
     * 商品项
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id');
    }

    /**
     * 关联默认商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSku()
    {
        return $this->hasOne(GoodsSku::class, 'goods_id', 'goods_id');
    }

    /**
     * 关联默认商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSkuOne()
    {
        return $this->hasOne(GoodsSku::class, 'sku_id', 'sku_id');
    }

    /**
     * 关联满减活动
     * @return \think\model\relation\HasOne
     */
    public function manjian()
    {
        return $this->hasOne(Manjian::class, 'manjian_id', 'manjian_id');
    }
}

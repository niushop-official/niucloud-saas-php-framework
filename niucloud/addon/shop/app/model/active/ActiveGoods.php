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

namespace addon\shop\app\model\active;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use core\base\BaseModel;

/**
 * 营销活动商品模型
 */
class ActiveGoods extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'active_goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_active_goods';

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
     * 优惠券商品项
     * @return \think\model\relation\HasOne
     */
    public function active()
    {
        return $this->hasOne(Active::class, 'active_id', 'active_id');
    }

    /**
     * 活动状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getActiveGoodsStatusNameAttr($value, $data)
    {
        if (empty($data['active_goods_status']))
        {
            return '';
        }
        return ActiveDict::getStatus()[$data['active_goods_status']] ?? '';
    }
}

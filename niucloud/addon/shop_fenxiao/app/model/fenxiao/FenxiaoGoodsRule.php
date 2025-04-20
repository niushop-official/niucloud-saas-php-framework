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

namespace addon\shop_fenxiao\app\model\fenxiao;

use addon\shop\app\model\goods\GoodsSku;
use core\base\BaseModel;

/**
 * 分销商品
 */
class FenxiaoGoodsRule extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'goods_rule_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_goods_rule';

    /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function skuList()
    {
        return $this->hasMany(GoodsSku::class, 'sku_id', 'sku_id')
            ->withField('sku_id,sku_name,price,cost_price')
            ->bind([ 'sku_id', 'sku_name', 'price', 'cost_price' ]);
    }
}

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
class FenxiaoGoods extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'fenxiao_goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_goods';
    // 设置json类型字段
    protected $json = [ 'fenxiao_rule' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function skuList()
    {
        return $this->hasMany(GoodsSku::class, 'goods_id', 'goods_id')
            ->withField('sku_id,sku_name,price,cost_price')
            ->bind([ 'sku_id', 'sku_name', 'price', 'cost_price' ]);
    }

    /**
     * 关联分销商品分佣规则表
     * @return \think\model\relation\HasMany
     */
    public function goodsRule()
    {
        return $this->hasMany(FenxiaoGoodsRule::class, 'goods_id', 'goods_id')
            ->withField('sku_id,goods_id,level_id,one_rate,two_rate,one_money,two_money,calculate_price');
    }
}

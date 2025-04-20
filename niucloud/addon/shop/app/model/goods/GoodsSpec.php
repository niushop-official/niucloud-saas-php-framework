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

namespace addon\shop\app\model\goods;

use core\base\BaseModel;

/**
 * 商品规格值模型
 * Class GoodsSpec
 * @package addon\shop\app\model\goods_spec
 */
class GoodsSpec extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'spec_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_spec';


    /**
     * 搜索器:商品规格值规格id
     * @param $value
     * @param $data
     */
    public function searchSpecIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("spec_id", $value);
        }
    }

    /**
     * 搜索器:商品规格值关联商品id
     * @param $value
     * @param $data
     */
    public function searchGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_id", $value);
        }
    }

    /**
     * 搜索器:商品规格值规格项名称
     * @param $value
     * @param $data
     */
    public function searchSpecNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("spec_name", $value);
        }
    }

    /**
     * 搜索器:商品规格值规格值名称，多个逗号隔开
     * @param $value
     * @param $data
     */
    public function searchSpecValuesAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("spec_values", $value);
        }
    }

}

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
 * 商品品牌模型
 * Class Brand
 * @package addon\shop\app\model\goods
 */
class Brand extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'brand_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_brand';


    // 设置json类型字段
    protected $json = [ 'color_json' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 搜索器:商品品牌品牌名称
     * @param $value
     * @param $data
     */
    public function searchBrandNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("brand_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

}

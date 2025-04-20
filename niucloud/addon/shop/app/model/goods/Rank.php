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

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\dict\goods\RankDict;
use core\base\BaseModel;

/**
 * 商品排行版模型
 * Class Brand
 * @package addon\shop\app\model\goods
 */
class Rank extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'rank_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_rank';

    protected $json = [ 'goods_json', 'category_ids', 'brand_ids', 'label_ids'];

    protected $jsonAssoc = true;

    /**
     * 搜索器:排行榜名称
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

    /**
     * 搜索器:排行榜名称
     * @param $value
     * @param $data
     */
    public function searchRankTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("rank_type", '=', $value);
        }
    }

    /**
     * 排行周期
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getRankTypeNameAttr($value, $data)
    {
        if (empty($data['rank_type']))
        {
            return '';
        }
        return RankDict::getRankType()[$data['rank_type']] ?? '';
    }

    /**
     * 来源类型
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getGoodsSourceNameAttr($value, $data)
    {
        if (empty($data['goods_source']))
        {
            return '';
        }
        return RankDict::getGoodsSource()[$data['goods_source']] ?? '';
    }

    /**
     * 排序规则
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getRuleTypeNameAttr($value, $data)
    {
        if (empty($data['rule_type']))
        {
            return '';
        }
        return RankDict::getRuleType()[$data['rule_type']] ?? '';
    }

}

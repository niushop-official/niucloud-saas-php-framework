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

namespace addon\shop\app\validate\goods;

use addon\shop\app\dict\goods\RankDict;
use core\base\BaseValidate;

/**
 * 商品排行榜验证器
 * Class Brand
 * @package addon\shop\app\validate\goods
 */
class Rank extends BaseValidate
{

    protected $rule = [
        'name' => 'require',
        'banner' => 'require',
        'rank_type' => 'require|in:day,week,month,quarter',
        'goods_source' => 'require|in:goods,category,brand,label,all',
        'rule_type' => 'require|in:sale,collect,evaluate,access',
        'goods_json' => 'checkGoodsSource',
        'category_ids' => 'checkGoodsSource',
        'brand_ids' => 'checkGoodsSource',
        'label_ids' => 'checkGoodsSource',
    ];

    protected $message = [
        'name.require' => [ 'common_validate.require', [ 'name' ] ],
        'banner.require' => [ 'common_validate.require', [ 'banner' ] ],
        'rank_type.require' => [ 'common_validate.require', [ 'rank_type' ] ],
        'goods_source.require' => [ 'common_validate.require', [ 'goods_source' ] ],
        'rule_type.require' => [ 'common_validate.require', [ 'rule_type' ] ],
    ];

    protected $scene = [
        "add" => [ 'name', 'rank_type', 'goods_source', 'rule_type', 'goods_json', 'category_ids', 'brand_ids', 'label_ids', 'sort','status'],
        "edit" => [ 'name', 'rank_type', 'goods_source', 'rule_type', 'goods_json', 'category_ids', 'brand_ids', 'label_ids', 'sort','status']
    ];

    // 自定义验证规则
    protected function checkGoodsSource($value, $rule, $data=[])
    {
        if ($data['goods_source'] == RankDict::GOODS) {
            if (empty($data['goods_json'])) {
                return 'goods_json不能为空';
            }
            return true;
        }
        if ($data['goods_source'] == RankDict::CATEGORY) {
            if (empty($data['category_ids'])) {
                return 'category_ids不能为空';
            }
            return true;
        }
        if ($data['goods_source'] == RankDict::BRAND) {
            if (empty($data['brand_ids'])) {
                return 'brand_ids不能为空';
            }
            return true;
        }
        if ($data['goods_source'] == RankDict::LABEL) {
            if (empty($data['label_ids'])) {
                return 'label_ids不能为空';
            }
            return true;
        }
        if ($data['goods_source'] == RankDict::ALL) {
            return true;
        }
    }

}

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

namespace addon\shop_giftcard\app\model\giftcard;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use core\base\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;

/**
 * 礼品卡活动模型
 * Class Giftcard
 * @package addon\shop_giftcard\app\model\giftcard
 */
class Giftcard extends BaseModel
{

    use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'giftcard_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard';

    protected $type = [
        'validity_time' => 'timestamp'
    ];

    /**
     * 定义软删除标记字段.
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值.
     * @var int
     */
    protected $defaultSoftDelete = 0;

    // 设置json类型字段
    protected $json = [ 'material_ids', 'blessing_json', 'card_key_way', 'balance_json' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getTypeNameAttr($value, $data)
    {
        if (!empty($data[ 'type' ])) {
            return GiftcardDict::getType($data[ 'type' ])[ 'name' ] ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getCardRightTypeNameAttr($value, $data)
    {
        if (!empty($data[ 'card_right_type' ])) {
            return GiftcardDict::getCardRightType($data[ 'card_right_type' ])[ 'name' ] ?? '';
        }
        return '';
    }

    /**
     * 搜索器:礼品卡活动礼品卡活动id
     * @param $value
     * @param $data
     */
    public function searchGiftcardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("giftcard_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡类型，virtual：电子卡，real：实体卡
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("type", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡分类
     * @param $value
     * @param $data
     */
    public function searchCategoryIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("category_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡名称
     * @param $value
     * @param $data
     */
    public function searchCardNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_name", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡状态，1：上架，0：下架
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value !== '') {
            $query->where("status", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动是否允许转赠，0：不允许，1：允许
     * @param $value
     * @param $data
     */
    public function searchIsGiveAttr($query, $value, $data)
    {
        if ($value !== '') {
            $query->where("is_give", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡权益类型，balance：储值余额，goods：商品
     * @param $value
     * @param $data
     */
    public function searchCardRightTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_right_type", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动提货方式，all：全部提货，batch：分批提货
     * @param $value
     * @param $data
     */
    public function searchDeliveryWayAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("delivery_way", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动礼品卡权益商品类型，all：全部，diy：指定商品数量
     * @param $value
     * @param $data
     */
    public function searchCardGoodsTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_goods_type", $value);
        }
    }

    /**
     * 搜索器:礼品卡封面id，多个逗号隔开
     * @param $value
     * @param $data
     */
    public function searchMaterialIdsAttr(Query $query, $value, $data)
    {
        if ($value) {
            if (is_array($value)) {
                $temp_where = array_map(function($item) { return '%' . $item . '%'; }, $value);
            } else {
                $temp_where = [ '%"' . $value . '"%' ];
            }
            $query->where('material_ids', 'like', $temp_where, 'or');
        }
    }

    /**
     * 关联礼品卡分类
     * @return \think\model\relation\HasOne
     */
    public function category()
    {
        return $this->hasOne(Category::class, 'category_id', 'category_id')
            ->joinType('left')
            ->withField('category_id, category_name');
    }

}

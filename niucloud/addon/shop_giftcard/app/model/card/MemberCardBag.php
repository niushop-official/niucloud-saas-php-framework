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

namespace addon\shop_giftcard\app\model\card;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use core\base\BaseModel;

/**
 * 礼品卡会员卡包模型
 * Class MemberCardBag
 * @package addon\shop_giftcard\app\model\card
 */
class MemberCardBag extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'card_bag_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_member_card_bag';

    protected $type = [

    ];


    /**
     * 搜索器:礼品卡卡包id
     * @param $value
     * @param $data
     */
    public function searchCardBagIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_bag_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡活动id
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
     * 搜索器:会员id
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("member_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡权益类型，balance：储值余额，goods：商品
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
     * 搜索器:储值金额
     * @param $value
     * @param $data
     */
    public function searchBalanceAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("balance", $value);
        }
    }

    /**
     * 搜索器:提货方式，all：全部提货，batch：分批提货
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
     * 搜索器:礼品卡权益商品类型，all：全部，diy：指定商品数量
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
     * 搜索器:卡封面
     * @param $value
     * @param $data
     */
    public function searchCardCoverAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_cover", $value);
        }
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

}

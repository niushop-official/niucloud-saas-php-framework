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

use core\base\BaseModel;

/**
 * 礼品卡获取权益模型
 * Class CardGoods
 * @package addon\shop_giftcard\app\model\card
 */
class CardGoods extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_card_goods';

    /**
     * 搜索器:礼品卡获取权益
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("id", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取权益卡id
     * @param $value
     * @param $data
     */
    public function searchCardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取权益礼品卡活动id
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
     * 搜索器:礼品卡获取权益储值金额
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
     * 搜索器:礼品卡获取权益商品id
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
     * 搜索器:礼品卡获取权益商品规格id
     * @param $value
     * @param $data
     */
    public function searchSkuIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sku_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取权益商品名称
     * @param $value
     * @param $data
     */
    public function searchGoodsNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_name", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取权益规格名称
     * @param $value
     * @param $data
     */
    public function searchSkuNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sku_name", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取权益商品编码
     * @param $value
     * @param $data
     */
    public function searchSkuNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sku_no", $value);
        }
    }

    /**
     * 关联礼品卡获取表
     * @return \think\model\relation\hasOne
     */
    public function card()
    {
        return $this->hasOne(Card::class, 'card_id', 'card_id');
    }

}

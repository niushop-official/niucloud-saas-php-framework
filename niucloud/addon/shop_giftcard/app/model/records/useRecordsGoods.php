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

namespace addon\shop_giftcard\app\model\records;

use core\base\BaseModel;

/**
 * 礼品卡使用记录权益模型
 * Class useRecordsGoods
 * @package addon\shop_giftcard\app\model\records
 */
class useRecordsGoods extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'record_goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_use_records_goods';


    /**
     * 搜索器:礼品卡使用记录权益记录id
     * @param $value
     * @param $data
     */
    public function searchRecordGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("record_goods_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录权益使用记录id
     * @param $value
     * @param $data
     */
    public function searchRecordsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("records_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录权益卡id
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
     * 搜索器:礼品卡使用记录权益关联礼品卡项权益id
     * @param $value
     * @param $data
     */
    public function searchCardGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_goods_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录权益储值余额
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
     * 搜索器:礼品卡使用记录权益商品id
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
     * 搜索器:礼品卡使用记录权益商品skuid
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
     * 搜索器:礼品卡使用记录权益商品名称
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
     * 搜索器:礼品卡使用记录权益规格名称
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
     * 搜索器:礼品卡使用记录权益商品编码
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
     * 搜索器:礼品卡使用记录权益使用数量
     * @param $value
     * @param $data
     */
    public function searchUseNumAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("use_num", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录权益订单id
     * @param $value
     * @param $data
     */
    public function searchOrderIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("order_id", $value);
        }
    }

    /**
     * 关联礼品卡使用记录模型
     * @return \think\model\relation\HasOne
     */
    public function records()
    {
        return $this->hasOne(useRecords::class, 'record_id', 'records_id')->joinType('left')->bind(['member']);
    }

}

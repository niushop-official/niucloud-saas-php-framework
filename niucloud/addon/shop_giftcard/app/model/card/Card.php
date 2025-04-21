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

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\records\MemberRecords;
use app\model\member\Member;
use core\base\BaseModel;

/**
 * 礼品卡获取模型
 * Class Card
 * @package addon\shop_giftcard\app\model\card
 */
class Card extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'card_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_card';

    protected $type = [
        'validity_time' => 'timestamp',
        'use_time' => 'timestamp',
        'activate_time' => 'timestamp',
        'invalid_time' => 'timestamp',
    ];

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getSourceNameAttr($value, $data)
    {
        if (!empty($data[ 'source' ])) {
            return CardDict::getSourceList($data[ 'source' ]) ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (!empty($data[ 'status' ])) {
            return CardDict::getStatusList($data[ 'status' ]) ?? '';
        }
        return '';
    }

    /**
     * 搜索器:礼品卡获取卡id
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
     * 搜索器:礼品卡获取礼品卡活动id
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
     * 搜索器:礼品卡关联礼品卡包id
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
     * 搜索器:礼品卡获取关联订单id
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
     * 搜索器:礼品卡获取卡来源，order：购买，gift：别人赠送
     * @param $value
     * @param $data
     */
    public function searchSourceAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("source", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取卡编号
     * @param $value
     * @param $data
     */
    public function searchCardNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_no", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:礼品卡获取卡密
     * @param $value
     * @param $data
     */
    public function searchCardKeyAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_key", $value);
        }
    }

    /**
     * 搜索器:礼品卡制卡记录关联id
     * @param $value
     * @param $data
     */
    public function searchCardMakeIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_make_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取卡状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("status", $value);
        }
    }

    /**
     * 搜索器:礼品卡获取会员id
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
     * 关联礼品卡获取权益表
     * @return \think\model\relation\HasMany
     */
    public function cardGoods()
    {
        return $this->hasMany(CardGoods::class, 'card_id', 'card_id');
    }

    /**
     * 关联礼品卡活动
     * @return \think\model\relation\HasOne
     */
    public function giftcard()
    {
        return $this->hasOne(Giftcard::class, 'giftcard_id', 'giftcard_id')
            ->joinType('left')
            ->withField('giftcard_id, card_name,type, status, validity_type, validity_day, validity_time, is_give, receive_validity_time, card_right_type, delivery_way, card_goods_type, card_goods_count,blessing_json,poster_id,cover')
            ->append([ 'type_name', 'card_right_type_name' ]);
    }

    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')
            ->joinType('left')
            ->withField('member_id, nickname,headimg');
    }

    /**
     * 关联领取记录表
     * @return \think\model\relation\hasOne
     */
    public function recordInfo()
    {
        return $this->hasOne(MemberRecords::class, 'card_id', 'card_id');
    }

}

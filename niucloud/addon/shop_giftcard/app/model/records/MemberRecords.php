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

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\model\card\CardGive;
use app\model\member\Member;
use core\base\BaseModel;

/**
 * 礼品卡会员领取记录模型
 * Class MemberRecords
 * @package addon\shop_giftcard\app\model\records
 */
class MemberRecords extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'member_card_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_member_records';

    //类型
    protected $type = [
        'get_time' => 'timestamp',
        'give_time' => 'timestamp'
    ];


    /**
     * 搜索器:礼品卡会员领取记录主键id
     * @param $value
     * @param $data
     */
    public function searchMemberCardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("member_card_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡会员领取记录卡id
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
     * 搜索器:礼品卡会员领取记录来源会员id
     * @param $value
     * @param $data
     */
    public function searchFromMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("from_member_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡会员领取记录领取会员id
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
     * 搜索器:礼品卡会员领取记录赠予会员id
     * @param $value
     * @param $data
     */
    public function searchToMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("to_member_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡会员领取记录是否已被转赠
     * @param $value
     * @param $data
     */
    public function searchIsGiveAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("is_give", $value);
        }
    }

    /**
     * 搜索器:礼品卡会员领取记录来源，order：购买，gift：别人赠送
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
     * 搜索器:礼品卡会员领取记录获取时间
     * @param $value
     * @param $data
     */
    public function searchGetTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("get_time", $value);
        }
    }

    /**
     * 搜索器:礼品卡会员领取记录赠予时间
     * @param $value
     * @param $data
     */
    public function searchGiveTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("give_time", $value);
        }
    }

    /**
     * 关联领取会员信息
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')
            ->joinType('left')
            ->withField('member_id, nickname,headimg');
    }

    /**
     * 关联赠予会员信息
     * @return \think\model\relation\hasOne
     */
    public function giveMember()
    {
        return $this->hasOne(Member::class, 'member_id', 'to_member_id')
            ->joinType('left')
            ->withField('member_id, nickname,headimg');
    }

    /**
     * 关联赠予记录
     * @return \think\model\relation\hasOne
     */
    public function give()
    {
        return $this->hasOne(CardGive::class, 'give_id', 'give_id')
            ->joinType('left')
            ->withField('give_id, card_id, blessing')
            ->append([ 'status_name' ]);
    }

    /**
     * 关联来源会员信息
     * @return \think\model\relation\hasOne
     */
    public function fromMember()
    {
        return $this->hasOne(Member::class, 'member_id', 'from_member_id')
            ->joinType('left')
            ->withField('member_id, nickname,headimg');
    }

    /**
     * 获取卡来源
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public static function getSourceNameAttr($value, $data)
    {
        if (empty($data[ 'source' ]))
            return '';
        return CardDict::getSourceList()[ $data[ 'source' ] ] ?? '';
    }

}

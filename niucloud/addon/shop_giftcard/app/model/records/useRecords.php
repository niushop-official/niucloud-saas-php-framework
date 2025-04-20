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

use app\model\member\Member;
use core\base\BaseModel;

/**
 * 礼品卡使用记录模型
 * Class useRecords
 * @package addon\shop_giftcard\app\model\records
 */
class useRecords extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'record_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_use_records';


    /**
     * 搜索器:礼品卡使用记录记录id
     * @param $value
     * @param $data
     */
    public function searchRecordIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("record_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录礼品卡活动id
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
     * 搜索器:礼品卡使用记录卡id
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
     * 搜索器:礼品卡使用记录使用时间
     * @param $value
     * @param $data
     */
    public function searchUseTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("use_time", $value);
        }
    }

    /**
     * 搜索器:礼品卡使用记录会员id
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
     * 搜索器:礼品卡使用记录会员领取卡id
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
     * 关联礼品卡使用记录权益模型
     * @return \think\model\relation\HasMany
     */
    public function recordsGoods()
    {
        return $this->hasMany(useRecordsGoods::class, 'records_id', 'record_id');
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

}

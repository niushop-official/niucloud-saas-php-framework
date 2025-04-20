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

use app\model\member\Member;
use core\base\BaseModel;

/**
 * 礼品卡赠予模型
 * Class CardGive
 * @package addon\shop_giftcard\app\model\card
 */
class CardGive extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'give_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_give';

    /**
     * 搜索器:礼品卡赠予赠予id
     * @param $value
     * @param $data
     */
    public function searchGiveIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("give_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡赠予卡id
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
     * 搜索器:礼品卡赠予会员id
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

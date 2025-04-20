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

namespace addon\qiankun_vip_card\app\model\card;

use core\base\BaseModel;
use app\model\member\MemberLevel;
use app\model\member\Member;
use addon\tk_vip\app\model\order\Order;

/**
 * 会员卡密模型
 * Class Card
 * @package addon\qiankun_vip_card\app\model\card
 */
class Card extends BaseModel
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
    protected $name = 'qiankun_vip_card';

    public function getUseTimeAttr($value): string
    {
        if ($value > 0) {
            return date('Y-m-d H:i:s', $value);
        } else {
            return '-';
        }
    }

    /**
     * 搜索器:会员卡密
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
     * 搜索器:会员卡密等级
     * @param $value
     * @param $data
     */
    public function searchLevelIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("level_id", $value);
        }
    }

    /**
     * 搜索器:会员卡密用户
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
     * 搜索器:会员卡密卡号
     * @param $value
     * @param $data
     */
    public function searchCardNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_no", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:会员卡密使用时间
     * @param $value
     * @param $data
     */
    public function searchUseTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["use_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["use_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["use_time", "<=", $end]]);
        }
    }

    /**
     * 搜索器:会员卡密创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }


    public function memberLevel()
    {
        return $this->hasOne(MemberLevel::class, 'level_id', 'level_id')->joinType('left')->withField('level_name,level_id')->bind(['level_id_name' => 'level_name']);
    }

    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id,mobile,headimg')->bind(['member_id_name' => 'nickname', 'mobile' => 'mobile', 'headimg' => 'headimg']);
    }

    public function useMemberInfo()
    {
        return $this->hasOne(Member::class, 'member_id', 'use_member')->joinType('left')->withField('nickname,member_id,mobile,headimg')->bind(['use_name' => 'nickname', 'use_mobile' => 'mobile', 'use_headimg' => 'headimg']);
    }

}

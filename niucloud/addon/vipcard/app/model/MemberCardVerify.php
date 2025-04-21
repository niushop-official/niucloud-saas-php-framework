<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\model;

use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseModel;

/**
 *  会员卡核销记录
 * Class VipcardGoodsCategory
 * @package app\model\vipcard_goods_category
 */
class MemberCardVerify extends BaseModel
{
    protected $type = [
        'create_time' => 'timestamp'
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_member_card_verify';

    /**
     * 核销时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    public function searchVerifyCodeAttr($query, $value, $data)
    {
        if (!empty($value)) {
            $query->where([ ['verify_code', '=', $value] ]);
        }
    }

    /**
     * 获取核销员信息
     * @param $value
     * @param $data
     * @return mixed|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getVerifyerAttr($value, $data) {
        $nick_name = '';
        if (!empty($data['verifier_id'])) {
            if ($data['verifier_type'] == 'user') {
                $nick_name = (SysUser::find($data['verifier_id']))->username;
            } else {
                $nick_name = (Member::find($data['verifier_id']))->nickname;
            }
        }
        return $nick_name;
    }

    public function memberCardItem() {
        return $this->hasOne(MemberCardItem::class, 'item_id', 'card_item_id');
    }

}

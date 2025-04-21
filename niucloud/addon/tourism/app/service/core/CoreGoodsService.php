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

namespace addon\tourism\app\service\core;

use addon\tourism\app\model\TourismHourStat;
use addon\tourism\app\model\TourismStat;
use app\model\member\Member;
use core\base\BaseCoreService;
use think\facade\Db;

/**
 * 商品
 * Class CoreGoodsService
 */
class  CoreGoodsService extends BaseCoreService
{
    public function getMemberInfo($member_id, $site_id)
    {
        $member_model = new Member();
        $member_field = 'member_level';
        $member_info = $member_model->where([
            [ 'site_id', '=', $site_id ],
            [ 'member_id', '=', $member_id ]
        ])->field($member_field)
            ->with([
                // 会员等级
                'memberLevelData' => function($query) {
                    $query->field('level_id, site_id, level_name, status, level_benefits, level_gifts');
                },
            ])
            ->findOrEmpty()->toArray();
        return $member_info;
    }

    /**
     * 查询商品的会员价
     * @param $member_info
     * @param string $member_discount 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price
     * @param $price
     * @param $date Y-m-d
     * @param $goods_day tourism_goods_day表详情信息
     * @return int|string
     */
    public function getMemberPrice($member_info, $member_discount, $price, $goods_day, $fixed_discount = '')
    {

        if (empty($member_discount)) {
            return $price;
        }

        // 未找到会员，排除
        if (empty($member_info)) {
            return $price;
        }

        // 没有会员等级，排除
        if (!empty($member_info) && empty($member_info[ 'member_level' ])) {
            return $price;
        }
        //设置当日不参与
        if(!empty($goods_day) && empty($goods_day['member_price'])){
            return $price;
        }

        if ($member_discount == 'discount') {
            // 默认按会员享受折扣计算
            if (!empty($member_info[ 'memberLevelData' ][ 'level_benefits' ])
                && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ])
                && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'is_use' ])) {

                $price = number_format($price * $member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'discount' ] / 10, 2, '.', '');
            }
        }else if($member_discount =='fixed_discount'){
            if(empty($fixed_discount)) return $price;
            $fixed_discount = json_decode($fixed_discount, true);
            $discount = 10;
            if(isset($fixed_discount['level_'.$member_info['member_level']])) $discount = $fixed_discount['level_'.$member_info['member_level']] ?? 10;

            $price = number_format($price * $discount / 10, 2, '.', '');
        }

        return $price;

    }


}

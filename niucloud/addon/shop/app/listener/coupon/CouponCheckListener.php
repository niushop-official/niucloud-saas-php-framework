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

namespace addon\shop\app\listener\coupon;

use addon\shop\app\dict\coupon\CouponDict;
use addon\shop\app\model\coupon\Coupon;

/**
 * 优惠券状态检测
 * Class CouponCheckListener
 * @package addon\shop\app\listener
 */
class CouponCheckListener
{
    public function handle(array $data)
    {
        $old_coupon_list = $data['coupon_list'];

        $coupon_id = [];
        $coupon_list = [];
        $coupon_data = (new Coupon())->field('id,status,remain_count')
            ->where([ [ 'site_id', '=', $data['site_id'] ], [ 'id', 'in', $data['coupon_id'] ] ])
            ->select()->toArray();
        foreach ($coupon_data as $coupon) {
            //检测优惠券状态和剩余数量
            if ($coupon['status'] == CouponDict::NORMAL && ($coupon[ 'remain_count' ] == '-1' || $coupon[ 'remain_count' ] >= $old_coupon_list[ 'id_' . $coupon['id']])) {
                $coupon_id[] = $coupon['id'];
                $coupon_list[] = 'id_' . $coupon['id'];
            }
        }
        return [
            'coupon_id' => $coupon_id,
            'coupon_list' => $coupon_list,
        ];
    }
}

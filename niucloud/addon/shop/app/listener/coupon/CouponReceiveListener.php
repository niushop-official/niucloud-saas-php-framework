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

/**
 * 优惠券领取分类信息
 * Class CouponReceiveListener
 * @package addon\shop\app\listener
 */
class CouponReceiveListener
{
    public function handle(array $params)
    {
        return [
            [
                "name" => "send",
                "title" => get_lang('dict_shop_member_coupon.send'),
            ],
            [
                "name" => "receive",
                "title" => get_lang('dict_shop_member_coupon.receive'),
            ],
        ];
    }
}

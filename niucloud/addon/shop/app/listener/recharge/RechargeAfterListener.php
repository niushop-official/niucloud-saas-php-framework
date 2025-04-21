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

namespace addon\shop\app\listener\recharge;

use addon\shop\app\service\core\coupon\CoreCouponMemberService;
use core\exception\CommonException;
use think\facade\Log;

/**
 * 充值赠送
 * Class RechargeAfterListener
 * @package addon\shop\app\listener\recharge
 */
class RechargeAfterListener
{
    public function handle(array $params)
    {
        $site_id = $params[ 'site_id' ];
        $member_id = $params[ 'member_id' ];

        foreach ($params[ 'gift_json' ] as $key => $value) {
            if ($key == 'coupon') {
                Log::write('会员充值赠送优惠券开始', json_encode($value[ 'value' ]));
                foreach ($value[ 'value' ] as $v) {
                    try {
                        ( new CoreCouponMemberService() )->sendCoupon($site_id, $member_id, $v[ 'coupon_id' ], $v[ 'num' ]);
                    } catch (CommonException $e) {
                        Log::write('会员充值赠送优惠券“' . $v[ 'coupon_id' ] . '”发放失败，错误原因：' . $e->getMessage() . $e->getFile() . $e->getLine());
                    }
                }
            }
        }
    }
}

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
namespace addon\shop\app\job\marketing;

use addon\shop\app\dict\coupon\CouponMemberDict;
use addon\shop\app\model\coupon\CouponMember;
use addon\shop\app\service\core\coupon\CoreCouponMemberService;
use core\base\BaseJob;

/**
 * 订单自动关闭
 */
class CouponMemberExpire extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $ids = (new CouponMember())->where([
                ['status', '=', CouponMemberDict::WAIT_USE],
                ['expire_time', '<=', time()]
            ])->column('id');
            if(!empty($ids)){
                //过期
                (new CoreCouponMemberService())->expire($ids);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}

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

namespace addon\shop\app\service\core\marketing;

use addon\shop\app\dict\coupon\CouponDict;
use addon\shop\app\model\coupon\Coupon;
use core\base\BaseCoreService;

/**
 * 优惠券服务层
 */
class CoreCouponService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Coupon();
    }

    /**
     * 优惠券状态开启
     * @param $ids
     * @return true
     */
    public function couponNormal($ids)
    {
        $where = [
            [ 'id', 'in', $ids ],
            [ 'status', '=', CouponDict::WAIT_START ]
        ];
        $data = [
            'status' => CouponDict::NORMAL
        ];
        $this->model->where($where)->update($data);
        return true;
    }

    /**
     * 优惠券状态过期
     * @param $ids
     * @return true
     */
    public function couponExpire($ids)
    {
        $where = [
            [ 'id', 'in', $ids ],
            [ 'status', '=', CouponDict::NORMAL ]
        ];
        $data = [
            'status' => CouponDict::EXPIRE
        ];
        $this->model->where($where)->update($data);
        return true;
    }

}

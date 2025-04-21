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

namespace addon\shop\app\api\controller\marketing;

use addon\shop\app\service\api\marketing\CouponService;
use core\base\BaseApiController;
use think\Response;

class Coupon extends BaseApiController
{
    /**
     * 优惠券列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'goods_id', '' ],
            [ 'category_id', '' ],
            [ 'type', '' ], // 优惠券类型
            [ 'order', '' ], // 排序方式（综合：空，最新：create_time，价格：price）
            [ 'sort', 'desc' ], // 升序：asc，降序：desc
        ]);
        return success(( new CouponService() )->getPage($data));
    }

    /**
     * 优惠券详情
     * @param int $id
     * @return Response
     */
    public function detail(int $id)
    {
        return success(( new CouponService() )->getDetail($id));
    }

    /**
     * 优惠券领取
     */
    public function receive()
    {
        $data = $this->request->params([
            [ 'coupon_id', '' ],
            [ 'type', 'receive' ],
            [ 'number', 1 ],
        ]);
        ( new CouponService() )->receive($data);
        return success('COUPON_RECEIVE_SUCCESS');

    }

    /**
     * 会员已领取优惠券列表
     * @return Response
     */
    public function memberCouponlists()
    {
        $data = $this->request->params([
            [ 'status', '' ],
            [ 'type', 'all' ]
        ]);
        return success(( new CouponService() )->getMemberPage($data));
    }

    /**
     * 会员优惠券按状态查询数量
     * @return Response
     */
    public function memberCouponStatusCount()
    {
        return success(data:( new CouponService() )->getCouponCountByStatus());
    }

    /**
     * 会员已领取优惠券数量（待使用）
     * @return Response
     */
    public function memberCouponCount()
    {
        $data = $this->request->params([
            [ 'status', '' ]
        ]);
        return success(data:( new CouponService() )->getMemberCount($data));
    }

    /**
     * 获取优惠券列表供组件调用
     * @return Response
     */
    public function components()
    {
        $data = $this->request->params([
            [ 'num', 0 ],
            [ 'coupon_ids', '' ]
        ]);
        return success(( new CouponService() )->getCouponComponents($data));
    }

    /**
     * 获取优惠券二维码
     * @param int $id
     * @return Response
     */
    public function qrcode(int $id)
    {
        return success(data:( new CouponService() )->getQrcode($id));
    }

    /**
     * 获取优惠券类型
     * @return Response
     */
    public function getCouponType()
    {
        return success(( new CouponService() )->getCouponType());
    }

}

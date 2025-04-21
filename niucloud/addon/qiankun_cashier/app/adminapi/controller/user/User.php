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

namespace addon\qiankun_cashier\app\adminapi\controller\user;

use addon\shop\app\service\core\coupon\CoreCouponMemberService;
use app\model\member\Member;
use core\base\BaseAdminController;
use think\db\BaseQuery;
use think\db\exception\DbException;
use think\Response;

class User extends BaseAdminController
{
    /**
     * @return Response
     * @throws DbException
     */
    public function index()
    {
        $keyword = $this->request->get('keyword');
        $list = app()->make(Member::class)->getModel()->when($keyword != '', function (BaseQuery $query) use ($keyword) {
            $query->whereLike('username|nickname|mobile', "%{$keyword}%");
        })->paginate(10);

        return success('SUCCESS', $list);
    }

    /**
     * 获取优惠券列表
     * @return Response
     */
    public function couponList(): Response
    {
        $memberId = $this->request->get('member_id');
        $couponList = app()->make(CoreCouponMemberService::class)->getUseCouponListByMemberId($memberId);
        return success('', $couponList);
    }
}

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

namespace addon\shop_replace_buy\app\adminapi\controller;

use addon\shop_replace_buy\app\service\admin\OrderCreateService;
use core\base\BaseAdminController;
use think\Response;

class OrderCreate extends BaseAdminController
{

    /**
     * 已选商品计算
     * @return Response
     */
    public function selectGoodsCalculate()
    {
        $data = $this->request->params([
            [ 'sku_ids', [] ],
            [ 'member_id', 0 ],
        ]);
        return success(( new OrderCreateService() )->selectGoodsCalculate($data));
    }

    /**
     * 计算
     * @return Response
     */
    public function calculate()
    {
        $data = $this->request->params([
            [ 'order_key', [] ],
            [ 'cart_ids', [] ],
            [ 'sku_data', [] ],
            [ 'delivery', [] ],
//            ['member_remark', ''],//买家留言
            [ 'discount', [] ],//优惠
//            ['invoice', []],//发票
            [ 'extend_data', [] ], // 扩展数据
            [ 'member_id', '' ] // 用户id
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->calculate($data));
    }

    /**
     * 订单创建
     * @return Response
     */
    public function create()
    {
        $data = $this->request->params([
            [ 'member_id', '' ],
            [ 'order_key', [] ],
            [ 'member_remark', '' ],//买家留言
            [ 'invoice', [] ],//发票
//            [ 'is_use_balance', 0 ],//是否使用余额
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->create($data));
    }

    /**
     * 查询优惠券
     * @return Response
     */
    public function getCoupon()
    {
        $data = $this->request->params([
            [ 'order_key', [] ],
            [ 'member_id', '' ],
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->getCoupon($data));
    }

    /**
     * 获取自提点
     * @return Response
     */
    public function getStore()
    {
        $data = $this->request->params([
            [ 'latlng', [] ],
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->getStore($data[ 'latlng' ]));
    }

    /**
     * 检测订单支付
     * @return Response
     */
    public function checkPay()
    {
        $data = $this->request->params([
            [ 'trade_id', 0 ],
            [ 'trade_type', '' ],
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->checkPay($data));
    }

}

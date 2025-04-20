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

namespace addon\shop_giftcard\app\api\controller\order;

use addon\shop_giftcard\app\dict\order\OrderDict;
use core\base\BaseApiController;
use think\Response;
use addon\shop_giftcard\app\service\api\order\OrderService;

class Order extends BaseApiController
{

    /**
     * 礼品卡订单列表
     * @return Response
     * @throws \think\db\exception\DbException
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'order_no', '' ],
            [ 'status', '' ],
        ]);
        return success(( new OrderService() )->getPage($data));
    }

    /**
     * 礼品卡订单详情
     * @param int $order_id
     * @return Response
     */
    public function detail(int $order_id)
    {
        return success(( new OrderService() )->getInfo($order_id));
    }

    /**
     * 礼品卡订单关闭
     * @param int $order_id
     * @return Response
     */
    public function close(int $order_id)
    {
        return success(data:(new OrderService())->close($order_id));
    }

    /**
     * 礼品卡订单状态
     * @return Response
     */
    public function orderStatus()
    {
        return success(OrderDict::getStatus());
    }

}

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

namespace addon\shop_giftcard\app\adminapi\controller\order;

use addon\shop_giftcard\app\dict\order\OrderDict;
use app\dict\pay\PayDict;
use core\base\BaseAdminController;
use addon\shop_giftcard\app\service\admin\order\OrderService;
use think\Response;


/**
 * 礼品卡订单控制器
 * Class Order
 * @package addon\shop_giftcard\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
    /**
     * 获取礼品卡订单列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['search_type', ''],
            ['search_name', ''],
            ['status', ''],
            ['pay_type', ''],
            ['keyword', ''],
            ['create_time', ''],
            ['pay_time', ''],
            ['giftcard_id', '']
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 礼品卡订单详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 修改礼品卡订单备注
     * @param int $id
     * @return Response
     */
    public function remark(int $id)
    {
        $data = $this->request->params([
            ['shop_remark', '']
        ]);
        (new OrderService())->editRemark($id, $data);
        return success('SUCCESS');
    }

    /**
     * 礼品卡订单关闭
     * @param int $id
     * @return Response
     */
    public function close(int $id)
    {
        return success((new OrderService())->close($id));
    }

    /**
     * 获取订单状态
     * @return Response
     */
    public function getOrderStatus()
    {
        return success(OrderDict::getStatus());
    }

    /**
     * 获取支付方式
     * @return Response
     */
    public function getPayType()
    {
        return success(PayDict::getPayType());
    }
}

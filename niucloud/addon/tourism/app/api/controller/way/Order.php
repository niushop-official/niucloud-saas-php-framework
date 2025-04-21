<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\api\controller\way;

use addon\tourism\app\service\api\way\OrderService;
use core\base\BaseApiController;


/**
 * 路线订单控制器
 * Class GoodsController
 * @package app\adminapi\controller\goods
 */
class Order extends BaseApiController
{
   /**
    * 订单确认
    * @return \think\Response
    */
    public function confirm(){
        $data = $this->request->params([
            ['way_id', 0],
            ['reserve_time', ''],
            ['num', 1]
        ]);
        $this->validate($data, 'addon\tourism\app\validate\way\Order.confirm');
        return success('SUCCESS', (new OrderService())->confirm($data));
    }

    /**
     * 订单计算
     * @return void
     */
    public function calculate() {
        $data = $this->request->params([
            ['way_id', 0],
            ['reserve_time', ''],
            ['num', 1]
        ]);
        $this->validate($data, 'addon\tourism\app\validate\way\Order.calculate');
        return success('SUCCESS',  (new OrderService())->calculate($data));
    }

    /**
     * 订单创建
     * @return void
     */
    public function create() {
        $data = $this->request->params([
            ['way_id', 0],
            ['reserve_time', ''],
            ['num', 1],
            ['buyer_info', '[]'],
            ['mobile', '']
        ]);
        $data['buyer_info'] = json_decode($data['buyer_info'], true);
        $this->validate($data, 'addon\tourism\app\validate\way\Order.create');
        return success('SUCCESS', (new OrderService())->create($data));
    }

    /**
     * 取消订单
     * @param int $order_id
     * @return \think\Response
     */
    public function cancel(int $order_id) {
        return success('SUCCESS', (new OrderService())->cancel($order_id));
    }

}

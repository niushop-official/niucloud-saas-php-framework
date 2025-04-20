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

namespace addon\shop\app\service\admin\order;


use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\service\core\order\CoreOrderFinishService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 *  订单配送服务层
 */
class OrderFinishService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 完成
     * @param $order_id
     * @return true
     */
    public function finish(int $order_id)
    {
        $data[ 'main_type' ] = OrderLogDict::STORE;
        $data[ 'main_id' ] = $this->uid;
        $data[ 'order_id' ] = $order_id;
        $data[ 'site_id' ] = $this->site_id;

        //查询订单
        $where = array(
            ['order_id', '=', $order_id],
            ['site_id', '=', $this->site_id]
        );
        $order = $this->model->where($where)->findOrEmpty()->toArray();
        if (empty($order)) throw new AdminException('SHOP_ORDER_NOT_FOUND');//订单不存在
        if ($order['status'] != OrderDict::WAIT_TAKE) throw new AdminException('SHOP_ONLY_WAIT_TAKE_CAN_BE_TAKE');//只有待收货的订单才可以收货
        ( new CoreOrderFinishService() )->finish($data);
        return true;
    }

}

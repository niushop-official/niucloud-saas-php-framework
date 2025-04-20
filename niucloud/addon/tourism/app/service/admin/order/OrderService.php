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

namespace addon\tourism\app\service\admin\order;

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\model\TourismOrder;
use core\base\BaseAdminService;

/**
 * 旅游订单服务层
 * Class TourismHotelService
 * @package app\service\admin\tourism_hotel
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
    }

    /**
     * 查询订单数量
     * @param $where
     * @return void
     */
    public function getOrderCount() {
        $all_status = OrderDict::getStatus();

        $data = [];
        foreach ($all_status as $status) {
            $data[ $status['status'] ] = [
                'status' => $status['status'],
                'name' => $status['name'],
                'num' => $this->model->where([ ['site_id', '=', $this->site_id ], ['order_status', '=', $status['status'] ] ])->count()
            ];
        }
        return $data;
    }
}
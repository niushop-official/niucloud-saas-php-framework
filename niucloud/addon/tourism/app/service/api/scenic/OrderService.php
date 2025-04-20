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

namespace addon\tourism\app\service\api\scenic;

use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use addon\tourism\app\service\core\order\scenic\CoreScenicOrderService;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 门票订单
 * Class HotelOrderService
 * @package addon\tourism\app\service\admin\hotel
 */
class OrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
    }

    /**
     * 订单确认
     * @param $data
     */
    public function confirm(array $data)
    {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreScenicOrderService())->confirm($data);
    }

    /**
     * 订单创建
     * @param array $data
     * @return null
     */
    public function create(array $data) {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreScenicOrderService())->create($data);
    }

    /**
     * 订单计算
     * @param array $data
     * @return array|null
     */
    public function calculate(array $data) {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreScenicOrderService())->calculate($data);
    }

    /**
     * 会员关闭订单
     * @param int $order_id
     * @return \think\Response
     */
    public function cancel(int $order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');

        try {
            (new CoreScenicOrderService())->close($order);
            CoreOrderLogService::addLog($order['site_id'], $order_id, OrderLogDict::ORDER_CANCEL, 'member', $this->member_id, ScenicOrderDict::getStatus(ScenicOrderDict::CLOSE));
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }
}
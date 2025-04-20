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

namespace addon\tourism\app\service\core\order;

use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismOrderItem;
use app\dict\pay\PayDict;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 旅游订单
 * Class CoreHotelOrderService
 * @package app\service\core\order
 */
class CoreOrderService extends BaseCoreService
{

    /**
     * 创建订单
     * @param array $order_data
     * @param array $order_items
     * @return array
     */
    public function create(array $order_data, array $order_items)
    {
        $site_id = $order_data['site_id'];
        Db::startTrans();
        try{
            //添加订单表
            $order_data['order_no'] = create_no();
            $create_order = (new TourismOrder())->create($order_data);
            $order_id = $create_order->order_id;
            //添加订单支付表
            (new CorePayService())->create($site_id, PayDict::MEMBER, $order_data['member_id'], $order_data['pay_money'], $order_data['order_type'], $order_id, $order_data['goods_name']);
            //添加订单项目表
            $order_item_model = new TourismOrderItem();
            foreach ($order_items as $k => $order_item)
            {
                $order_item['order_id'] = $order_id;
                $order_item_model->create($order_item);
            }
            Db::commit();
            //返回订单信息
            return [
                'trade_type' => $order_data['order_type'],
                'trade_id' => $order_id,
                'order_id' => $order_id
            ];

        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 查询订单信息
     * @param int $site_id
     * @param int $order_id
     * @return void
     */
    public function getOrderInfo(int $site_id, int $order_id) {
        return (new TourismOrder())->where([
            ['site_id', '=', $site_id],
            ['order_id', '=', $order_id]
        ])->field('*')->findOrEmpty()->toArray();
    }

    /**
     * 生成核销码
     * @param int $order_id
     * @return string
     */
    public static function createVerifyCode(int $order_id) : string
    {
        return create_no($order_id);
    }
}


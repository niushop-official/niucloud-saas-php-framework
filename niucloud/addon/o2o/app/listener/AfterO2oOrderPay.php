<?php
declare (strict_types = 1);

namespace addon\o2o\app\listener;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\dict\order\OrderLogDict;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\service\core\CoreGoodsSaleNumService;
use addon\o2o\app\service\core\CoreOrderLogService;
use addon\o2o\app\service\core\CoreOrderService;
use addon\o2o\app\service\core\CoreStatService;
use app\service\core\notice\NoticeService;

class AfterO2oOrderPay
{
    public function handle($data){
        $order_data = $data['order_data'];

        $order_info = (new CoreOrderService())->orderInfo($order_data['site_id'], $order_data['order_id']);
        //统计
        CoreStatService::addStat($order_data['site_id'], ['order_num' => 1, 'order_money' => $order_data['order_money'] ]);
        //发送通知
        //日志
        $main_type = $data['main_type'] ?? 'member';
        $main_id = $data['main_id'] ?? $order_data['member_id'];
        (new CoreOrderLogService())->addLog($order_data['site_id'], $order_data['order_id'], OrderLogDict::ORDER_PAY,$main_type, $main_id, OrderDict::getStatus($order_info['order_status']));

        //消息发送
        (new NoticeService())->send($order_data['site_id'], 'o2o_order_pay', ['order_id' => $data['order_id'] ]);

        //累增销量
        $order_goods_data = (new OrderItem())->where([ ['order_id', '=', $data['order_id']] ])->select()->toArray();
        $core_goods_sale_num_service = new CoreGoodsSaleNumService();
        foreach($order_goods_data as $v){
            $core_goods_sale_num_service->inc([
                'num' => $v['num'],
                'goods_id' => $v['goods_id'],
                'sku_id' => $v['item_id']
            ]);
        }

        // 微信小程序 发货信息录入接口
        (new CoreOrderService())->orderShippingUploadShippingInfo($order_data['order_id']);

    }
}

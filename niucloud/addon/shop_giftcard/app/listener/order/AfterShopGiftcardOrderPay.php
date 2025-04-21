<?php
declare ( strict_types = 1 );

namespace addon\shop_giftcard\app\listener\order;

use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use app\service\core\notice\NoticeService;
use think\facade\Log;

/**
 * 订单支付后操作
 */
class AfterShopGiftcardOrderPay
{
    public function handle($data)
    {
        Log::write('礼品卡订单AfterShopGiftcardOrderPay' . json_encode($data));
        try {
            $order_data = $data[ 'order_data' ];
            $num = $order_data[ 'num' ];

            // 礼品卡发放
            $core_card_service = new CoreCardService();
            $core_giftcard_log_service = new CoreGiftcardLogService();
            $card_data = [
                'site_id' => $order_data[ 'site_id' ],
                'member_id' => $order_data[ 'member_id' ],
                'order_id' => $order_data[ 'order_id' ],
                'giftcard_id' => $order_data[ 'giftcard_id' ],
                'card_cover' => $order_data[ 'card_cover' ],
                'balance' => $order_data[ 'balance' ]
            ];
            for ($i = 0; $i < $num; $i++) {
                //添加电子卡
                $card_id = $core_card_service->addVirtualCard($card_data);
                //礼品卡制卡数量更新
                ( new CoreGiftcardService() )->updateMakeCardCount($order_data[ 'site_id' ], $order_data[ 'giftcard_id' ], 1);
                //增加日志
                $log_data = [
                    'giftcard_id' => $order_data['giftcard_id'],
                    'card_id' => $card_id,
                    'member_id' => $order_data['member_id'],
                    'site_id' => $order_data['site_id'],
                    'type' => GiftcardLogDict::CARD_BUY_ACTION,
                    'remark' => '通过购买获得了该礼品卡'
                ];
                $core_giftcard_log_service->add($log_data, 'member');
            }

            //礼品卡销量更新
            (new CoreGiftcardService())->updateSaleCount($order_data[ 'site_id' ], $order_data[ 'giftcard_id' ], $num);

            //消息发送
            ( new NoticeService() )->send($order_data[ 'site_id' ], 'shop_giftcard_order_pay', [ 'order_id' => $order_data[ 'order_id' ] ]);

        } catch (\Exception $e) {
            Log::write('礼品卡订单AfterShopGiftcardOrderPay失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}

<?php
declare (strict_types=1);

namespace addon\shop_giftcard\app\listener\refund;

use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\service\core\card\CoreCardGoodsService;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use addon\shop_giftcard\app\service\core\card\CoreMemberCardBagService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use core\exception\CommonException;
use think\facade\Db;


/**
 * 退款完成后操作
 */
class AfterShopOrderRefundFinish
{

    public function handle($data)
    {
        $order_data = (new Order())->where([['order_id', '=', $data['order_id']]])->findOrEmpty()->toArray();
        $order_goods_data = (new OrderGoods())->field('num,goods_id,sku_id')->where([['site_id', '=', $data['site_id']], ['order_id', '=', $data['order_id']]])->select()->toArray();
        if (!empty($order_data) && !empty($order_goods_data)) {
            if ($order_data['activity_type'] == OrderDict::TYPE) {
                $card = (new Card())->field('giftcard_id,total_num,use_num,status,validity_time,card_bag_id')->where([['site_id', '=', $data['site_id']], ['card_id', '=', $order_data['relate_id']]])
                    ->with(['giftcard'])->findOrEmpty()->toArray();

                $use_num = $card['use_num'];

                $validity_time = $card['validity_time'] == 0 ? 0 : strtotime($card['validity_time']);

                Db::startTrans();
                try {

                    $total_num = 0;
                    foreach ($order_goods_data as $goods_data) {
                        $total_num += $goods_data['num'];
                    }

                    if (!empty($card) && in_array($card['status'], [CardDict::USED, CardDict::CAN_USE])) {

                        if ($validity_time > 0 && $validity_time < time()) {
                            $status = CardDict::INVALID;
                            // 礼品卡失效
                            (new CoreCardService())->expire([$order_data['relate_id']]);
                        } else {
                            if ($use_num > $total_num) {
                                $status = CardDict::CAN_USE;
                            } else {
                                $status = CardDict::TO_USE;
                            }
                        }

                        if (in_array($status, [CardDict::TO_USE, CardDict::CAN_USE])) {
                            // 礼品卡使用状态更新
                            (new CoreCardService())->editStatus($order_data['site_id'], $order_data['relate_id'], ['status' => $status]);
                            // 礼品卡总提货数量更新
                            (new CoreCardService())->decUseNum($order_data['site_id'], $order_data['relate_id'], ['use_num' => $total_num]);
                            foreach ($order_goods_data as $goods_data) {
                                // 礼品卡已提货数量更新
                                (new CoreCardGoodsService())->decUseNum($order_data['site_id'], $order_data['relate_id'], $goods_data['sku_id'], ['use_num' => $goods_data['num']]);
                            }
                        }

                        if ($status == CardDict::TO_USE) {
                            // 礼品卡使用数量更新
                            (new CoreGiftcardService())->decUseCount($order_data['site_id'], $card['giftcard_id'], 1);
                        }

                        if ($card['status'] == CardDict::USED) {
                            if ($status == CardDict::CAN_USE) {
                                // 更新卡包剩余数量
                                ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'can_use_count' => 1, 'used_count' => -1 ]);
                            }
                            if ($status == CardDict::TO_USE) {
                                // 更新卡包剩余数量
                                ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'to_use_count' => 1, 'used_count' => -1 ]);
                            }
                            if ($status == CardDict::INVALID) {
                                // 更新卡包剩余数量
                                ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'invalid_count' => 1, 'used_count' => -1 ]);
                            }
                        }

                        if ($card['status'] == CardDict::CAN_USE) {
                            if ($status == CardDict::TO_USE) {
                                // 更新卡包剩余数量
                                ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'to_use_count' => 1, 'can_use_count' => -1 ]);
                            }
                            if ($status == CardDict::INVALID) {
                                // 更新卡包剩余数量
                                ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'invalid_count' => 1, 'can_use_count' => -1 ]);
                            }
                        }

                        //增加日志
                        $log_data = [
                            'giftcard_id' => $card[ 'giftcard_id' ],
                            'card_id' => $order_data[ 'relate_id' ],
                            'member_id' => $order_data[ 'member_id' ],
                            'site_id' => $order_data[ 'site_id' ],
                            'type' => GiftcardLogDict::CARD_REFUND_ACTION,
                            'remark' => '兑换卡退款，退还了' . $total_num . '件商品'
                        ];
                        ( new CoreGiftcardLogService() )->add($log_data, 'member');

                        Db::commit();
                    }
                } catch (\Exception $e) {
                    Db::rollback();
                    throw new CommonException($e->getMessage());
                }
            }

        }
    }

}

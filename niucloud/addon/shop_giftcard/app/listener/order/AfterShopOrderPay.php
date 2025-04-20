<?php
declare ( strict_types = 1 );

namespace addon\shop_giftcard\app\listener\order;

use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\order\OrderGoods;
use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGoods;
use addon\shop_giftcard\app\model\records\MemberRecords;
use addon\shop_giftcard\app\service\core\card\CoreCardGoodsService;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use addon\shop_giftcard\app\service\core\card\CoreMemberCardBagService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardService;
use addon\shop_giftcard\app\service\core\records\CoreUseRecordsGoodsService;
use addon\shop_giftcard\app\service\core\records\CoreUseRecordsService;
use core\exception\CommonException;
use think\facade\Db;
use think\facade\Log;

/**
 * 商城订单支付后操作
 */
class AfterShopOrderPay
{
    public function handle($data)
    {
        Log::write('订单AfterShopOrderPay' . json_encode($data));
        try {
            $order_data = $data[ 'order_data' ];
            if ($order_data[ 'activity_type' ] == OrderDict::TYPE) {
                $card = ( new Card() )->field('giftcard_id,total_num,use_num,card_bag_id,status')->where([ [ 'site_id', '=', $order_data[ 'site_id' ] ], [ 'card_id', '=', $order_data[ 'relate_id' ] ] ])
                    ->with([ 'giftcard' ])->findOrEmpty()->toArray();
                $member_records_where = [
                    [ 'site_id', '=', $order_data[ 'site_id' ] ],
                    [ 'member_id', '=', $order_data[ 'member_id' ] ],
                    [ 'card_id', '=', $order_data[ 'relate_id' ] ],
                    [ 'is_give', '=', 0 ]
                ];
                $member_records = ( new MemberRecords() )->field('member_card_id')->where($member_records_where)->findOrEmpty()->toArray();

                $order_goods_list = ( new OrderGoods() )->where([ 'order_id' => $data[ 'order_id' ] ])->select()->toArray();

                Db::startTrans();
                try {
                    //更新使用记录
                    $records_data = [
                        'site_id' => $order_data[ 'site_id' ],
                        'member_id' => $order_data[ 'member_id' ],
                        'member_card_id' => $member_records[ 'member_card_id' ],
                        'giftcard_id' => $card[ 'giftcard_id' ],
                        'card_id' => $order_data[ 'relate_id' ]
                    ];
                    $records_id = ( new CoreUseRecordsService )->add($records_data);

                    $total_goods_num = array_reduce($order_goods_list, function($carry, $item) {
                        return $carry + $item[ 'num' ];
                    }, 0);
                    $total_num = $card[ 'total_num' ];
                    $use_num = $card[ 'use_num' ];
                    $card_goods_type = $card[ 'giftcard' ][ 'card_goods_type' ];
                    $create_time = time();
                    if ($use_num + $total_goods_num <= $total_num) {
                        // 礼品卡使用状态更新
                        ( new CoreCardService() )->editStatus($order_data[ 'site_id' ], $order_data[ 'relate_id' ], [ 'status' => CardDict::CAN_USE ]);

                        // 礼品卡总提货数量更新
                        ( new CoreCardService() )->editUseNum($order_data[ 'site_id' ], $order_data[ 'relate_id' ], [ 'use_num' => $total_goods_num ]);

                        foreach ($order_goods_list as $goods) {
                            $goods_sku = ( new GoodsSku() )->field('sku_no')->where([ [ 'site_id', '=', $order_data[ 'site_id' ] ], [ 'sku_id', '=', $goods[ 'sku_id' ] ] ])->findOrEmpty()->toArray();
                            $card_goods_where = [
                                [ 'site_id', '=', $order_data[ 'site_id' ] ],
                                [ 'card_id', '=', $order_data[ 'relate_id' ] ],
                                [ 'goods_id', '=', $goods[ 'goods_id' ] ],
                                [ 'sku_id', '=', $goods[ 'sku_id' ] ]
                            ];
                            $card_goods = ( new CardGoods() )->field('id,total_num,use_num')->where($card_goods_where)->findOrEmpty()->toArray();
                            $num = $goods[ 'num' ];
                            if (!empty($card_goods)) {
                                $item_total_num = $card_goods[ 'total_num' ];
                                $item_use_num = $card_goods[ 'use_num' ];

                                if ($card_goods_type == GiftcardDict::ALL_GOODS) {
                                    if ($item_use_num + $num <= $item_total_num) {
                                        //礼品卡已提货数量更新
                                        ( new CoreCardGoodsService() )->editUseNum($order_data[ 'site_id' ], $order_data[ 'relate_id' ], $goods[ 'sku_id' ], [ 'use_num' => $num ]);
                                    }
                                } else {
                                    //礼品卡已提货数量更新
                                    ( new CoreCardGoodsService() )->editUseNum($order_data[ 'site_id' ], $order_data[ 'relate_id' ], $goods[ 'sku_id' ], [ 'use_num' => $num ]);
                                }

                                //更新使用记录权益
                                $records_goods_data = [
                                    'records_id' => $records_id,
                                    'site_id' => $order_data[ 'site_id' ],
                                    'card_id' => $order_data[ 'relate_id' ],
                                    'card_goods_id' => $card_goods[ 'id' ],
                                    'goods_id' => $goods[ 'goods_id' ],
                                    'sku_id' => $goods[ 'sku_id' ],
                                    'goods_name' => $goods[ 'goods_name' ],
                                    'sku_name' => $goods[ 'sku_name' ],
                                    'sku_image' => $goods[ 'sku_image' ],
                                    'sku_no' => $goods_sku[ 'sku_no' ],
                                    'use_num' => $num,
                                    'order_id' => $data[ 'order_id' ],
                                    'create_time' => $create_time
                                ];
                                ( new CoreUseRecordsGoodsService() )->add($records_goods_data);

                            }
                        }
                    }

                    if ($use_num + $total_goods_num == $total_num) {
                        // 更新卡包剩余数量
                        if ($card['status'] == CardDict::CAN_USE) {
                            ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'can_use_count' => -1, 'used_count' => 1 ]);
                        }
                        if ($card['status'] == CardDict::TO_USE) {
                            ( new CoreMemberCardBagService() )->editCount($order_data[ 'site_id' ], $order_data[ 'member_id' ], $card[ 'card_bag_id' ], [ 'to_use_count' => -1, 'used_count' => 1 ]);
                        }

                        // 礼品卡使用状态更新
                        ( new CoreCardService() )->editStatus($order_data[ 'site_id' ], $order_data[ 'relate_id' ], [ 'status' => CardDict::USED ]);

                        // 礼品卡使用数量更新
                        ( new CoreGiftcardService() )->updateUseCount($order_data[ 'site_id' ], $card[ 'giftcard_id' ], 1);

                        $remark = '使用兑换卡兑换了' . $total_goods_num . '件商品，兑换卡已用完';
                    } else {
                        // 更新卡包剩余数量
                        if ($card['status'] == CardDict::TO_USE) {
                            (new CoreMemberCardBagService())->editCount($order_data['site_id'], $order_data['member_id'], $card['card_bag_id'], ['to_use_count' => -1, 'can_use_count' => 1]);
                        }
                        $remark = '使用兑换卡兑换了' . $total_goods_num . '件商品，还可兑换' . ( $total_num - $use_num - $total_goods_num ) . '件商品';
                    }

                    //增加日志
                    $log_data = [
                        'giftcard_id' => $card[ 'giftcard_id' ],
                        'card_id' => $order_data[ 'relate_id' ],
                        'member_id' => $order_data[ 'member_id' ],
                        'site_id' => $order_data[ 'site_id' ],
                        'type' => GiftcardLogDict::CARD_USE_ACTION,
                        'remark' => $remark
                    ];
                    ( new CoreGiftcardLogService() )->add($log_data, 'member');
                    Db::commit();
                } catch (\Exception $e) {
                    Db::rollback();
                    throw new CommonException($e->getMessage());
                }
            }

        } catch (\Exception $e) {
            Log::write('订单AfterShopOrderPay失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}

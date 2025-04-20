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

namespace addon\vipcard\app\service\core;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\dict\MemberCardDict;
use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\model\Goods;
use addon\vipcard\app\model\MemberCard;
use addon\vipcard\app\model\MemberCardItem;
use addon\vipcard\app\model\Order;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 订单操作日志
 * Class CoreHotelOrderService
 * @package app\service\core\order
 */
class CoreMemberCardService extends BaseCoreService
{

    /**
     * 创建会员卡
     * @param int $site_id
     * @param int $member_id
     * @param int $goods_id
     * @param int $order_id
     * @return void
     */
    public static function create(int $site_id, int $member_id, int $goods_id, int $order_id, int $num) {
        $goods = (new Goods())->where([
            ['site_id', '=', $site_id ],
            ['goods_id', '=', $goods_id ],
        ])->field('goods_id,goods_type,buy_info,verify_validity_type,verify_validity,card_type,common_num')
            ->with(['goods_item' => function ($query){
                $query->field('main_goods_id,relate_goods_id,num');
            }])
            ->findOrEmpty();
        if ($goods->isEmpty()) throw new CommonException('VIPCARD_GOODS_NOT_EXIST');

        Db::startTrans();
        try {
            $expire_time = [
                GoodsDict::PARMANENT => 0,
                GoodsDict::FIXED_DAYS => strtotime("+ {$goods['verify_validity']} day"),
                GoodsDict::FIXED_TIME => strtotime($goods['verify_validity'])
            ];

            // 总可用次数
            $total_num = 0;
            // 创建卡
            $create_card = (new MemberCard())->create([
                'site_id' => $site_id,
                'member_id' => $member_id,
                'goods_id' => $goods_id,
                'order_id' => $order_id,
                'card_no' => create_no(),
                'goods_type' => $goods['goods_type'],
                'card_type' => $goods['goods_type'] == GoodsDict::CARD ? $goods['card_type'] : GoodsDict::ONCECARD,
                'create_time' => time(),
                'expire_time' => $expire_time[ $goods['verify_validity_type'] ],
                'status' => MemberCardDict::WAIT_USE
            ]);

            // 创建卡项
            $card_item = [];
            if ($goods['goods_type'] == GoodsDict::SERVICE) {
                $total_num = $num;
                $card_item[] = [
                    'site_id' => $site_id,
                    'member_id' => $member_id,
                    'goods_id' => $goods_id,
                    'card_id' => $create_card->card_id,
                    'num' => $total_num,
                    'expire_time' => $expire_time[ $goods['verify_validity_type'] ],
                    'verify_code' => self::createVerifyCode($order_id)
                ];
            } else {
                if ($goods['card_type'] == GoodsDict::TIMECARD) $total_num = 0;
                if ($goods['card_type'] == GoodsDict::COMMONCARD) $total_num = $goods['common_num'] * $num;

                foreach ($goods->goods_item as $goods_item) {
                    $card_item_data = [
                        'site_id' => $site_id,
                        'member_id' => $member_id,
                        'goods_id' => $goods_item['relate_goods_id'],
                        'card_id' => $create_card->card_id,
                        'num' => $goods['card_type'] == GoodsDict::ONCECARD ? $goods_item['num'] * $num : $total_num,
                        'expire_time' => $expire_time[ $goods['verify_validity_type'] ],
                        'verify_code' => self::createVerifyCode($order_id)
                    ];
                    $card_item[] = $card_item_data;
                    if ($goods['card_type'] == GoodsDict::ONCECARD) $total_num += $card_item_data['num'];
                }
            }
            (new MemberCardItem())->saveAll($card_item);

            (new MemberCard())->update(['total_num' => $total_num], [ ['card_id', '=', $create_card->card_id] ]);

            Db::commit();

            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 生成核销码
     * @param int $order_id
     * @return string
     */
    private static function createVerifyCode(int $order_id) : string
    {
        return uniqid($order_id);
    }

    /**
     * 次卡使用
     * @param int $site_id
     * @param string $verify_code
     * @param int $num
     * @return void
     */
    public static function use(int $site_id, string $verify_code, int $num = 1) {
        $card_item = (new MemberCardItem())->where([ ['site_id', '=', $site_id], ['verify_code', '=', $verify_code] ])
            ->with(['card' => function($query){
                $query->field('card_id,total_num,total_use_num,goods_type,card_type,order_id,status');
            }])
            ->findOrEmpty();
        if ($card_item->isEmpty()) throw new CommonException('CARD_ITEM_NOT_EXIST');
        if ($card_item->expire_time > 0 && $card_item->expire_time < time()) throw new CommonException('CARD_ITEM_EXPIRED');
        if ($num <= 0)  throw new CommonException('CARD_ITEM_VERIFY_NUM_ERROR');
        if ($card_item->card->status == MemberCardDict::USED) throw new CommonException('CARD_ITEM_USABLE_NUM_FINISH');
        if ($card_item->card->status != MemberCardDict::WAIT_USE) throw new CommonException('CARD_STATUS_ABNORMAL');
        if ($card_item->card->card_type == GoodsDict::ONCECARD && $card_item->num - $card_item->use_num < $num) throw new CommonException('CARD_ITEM_USABLE_NUM_INSUFFICIENT');
        if ($card_item->card->card_type == GoodsDict::COMMONCARD && $card_item->card->total_num - $card_item->card->total_use_num < $num) throw new CommonException('CARD_ITEM_USABLE_NUM_INSUFFICIENT');

        Db::startTrans();
        try {
            // 核销次数没有之后改变订单状态
            if ($card_item->card->card_type != GoodsDict::TIMECARD && $card_item->card->total_num - $card_item->card->total_use_num == $num) {
                $card_item->card->status = MemberCardDict::USED;
                (new Order())->update(['order_status' => OrderDict::FINISH], [ ['order_id', '=', $card_item->card->order_id ] ]);
            }

            $card_item->card->total_use_num = Db::raw("total_use_num + $num");
            $card_item->card->save();

            $card_item->use_num = Db::raw("use_num + $num");
            $card_item->save();

            Db::commit();

            return [
                'card_id' => $card_item['card_id'],
                'card_item_id' => $card_item['item_id'],
                'member_id' => $card_item['member_id']
            ];
        }  catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }
}

<?php

namespace addon\shop_giftcard\app\upgrade\v101;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGive;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\service\core\card\CoreMemberCardBagService;

class Upgrade
{

    public function handle()
    {
        $this->handleData();
    }

    /**
     * 处理商品数据
     */
    private function handleData()
    {
        $card_model = new Card();
        $giftcard_model = new Giftcard();
        $card_give_model = new CardGive();

        $field = 'card_id, site_id, giftcard_id, card_cover, balance, status, member_id, total_num, use_num';

        $order = 'create_time desc';
        $card_list = $card_model->field($field)->with([ 'giftcard' ])->order($order)->select()->toArray();

        // 生成卡包
        $member_card_bag_service = new CoreMemberCardBagService();

        foreach ($card_list as $k => $v) {
            $bag_data = [
                'giftcard_id' => $v[ 'giftcard_id' ],
                'card_right_type' => $v[ 'giftcard' ][ 'card_right_type' ],
                'balance' => $v[ 'balance' ],
                'delivery_way' => $v[ 'giftcard' ][ 'delivery_way' ],
                'card_goods_type' => $v[ 'giftcard' ][ 'card_goods_type' ],
                'validity_type' => $v[ 'giftcard' ][ 'validity_type' ],
                'is_give' => $v[ 'giftcard' ][ 'is_give' ],
                'card_cover' => $v[ 'card_cover' ],

                'total_count' => 1,
            ];

            if ($v[ 'status' ] == CardDict::TO_USE) {
                $bag_data[ 'to_use_count' ] = 1;
            } elseif ($v[ 'status' ] == CardDict::CAN_USE) {
                $bag_data[ 'can_use_count' ] = 1;
            } elseif ($v[ 'status' ] == CardDict::USED) {
                $bag_data[ 'used_count' ] = 1;
            } elseif ($v[ 'status' ] == CardDict::INVALID) {
                $bag_data[ 'invalid_count' ] = 1;
            }

            $card_bag_id = $member_card_bag_service->generate($v[ 'site_id' ], $v[ 'member_id' ], $bag_data);

            //更新礼品卡数据
            $card_model->where([
                [ 'card_id', '=', $v[ 'card_id' ] ]
            ])->update([ 'card_bag_id' => $card_bag_id ]);

            //更新礼品卡赠予数据
            $card_give_model->where([
                [ 'card_id', '=', $v[ 'card_id' ] ]
            ])->update([
                'card_bag_id' => $card_bag_id,
                'give_num' => 1,
                'limit_num' => 1,
                'validity_time' => time() + 86400,
            ]);

        }

        //更新礼品卡活动默认值
        $giftcard_model->where([ [ 'giftcard_id', '>', 0 ] ])->update([ 'receive_validity_time' => 24 ]);

    }

}
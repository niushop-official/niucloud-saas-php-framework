<?php
declare ( strict_types = 1 );

namespace addon\shop_giftcard\app\listener\poster;


/**
 * 礼品卡海报类型
 */
class GiftcardPosterType
{
    /**
     * 礼品卡海报
     * @param array $data
     * @return array
     */
    public function handle($data = [])
    {
        return [
            [
                'type' => 'shop_giftcard_give',
                'addon' => 'shop_giftcard',
                'name' => '礼品卡赠送海报',
                'decs' => '礼品卡赠送，分享后进入礼品卡领取页',
                'icon' => 'addon/shop_giftcard/poster/type_shop_giftcard.png'
            ],
        ];

    }
}

<?php
declare ( strict_types = 1 );

namespace addon\shop_giftcard\app\listener\poster;


use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGive;
use addon\shop_giftcard\app\service\core\card\CoreCardService;
use app\model\member\Member;
use app\service\core\sys\CoreSysConfigService;

/**
 * 礼品卡海报数据
 */
class GiftcardPoster
{
    /**
     * 礼品卡海报
     * @param $data
     * @return array
     */
    public function handle($data)
    {
        $type = $data[ 'type' ];
        if ($type == 'shop_giftcard_give') {
            // 赠送礼品卡 海报模板数据

            $site_id = $data[ 'site_id' ];
            $param = $data[ 'param' ];
            $give_id = $param[ 'give_id' ] ?? 0;
            $member_id = $param[ 'member_id' ] ?? 0;
            $mode = $param[ 'mode' ] ?? '';

            if ($mode == 'preview') {
                // 预览模式
                $url_data = [
                    [ 'key' => 'give_id', 'value' => $give_id ]
                ];
                $return_data = [
                    'nickname' => '会员昵称',
                    'headimg' => 'static/resource/images/default_headimg.png',
                    'giftcard_name' => '礼品卡名称',
                    'giftcard_image' => 'addon/shop_giftcard/giftcard_default.png',
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/shop_giftcard/pages/receive_info',
                        'data' => $url_data,
                    ],
                ];
                return $return_data;
            }

            // 查询礼品卡赠送信息
            $field = 'give_id,blessing,validity_time,give_num,limit_num,card_bag_id';
            $card_give_model = new CardGive();
            $card_give_info = $card_give_model->field($field)->where([
                [ 'site_id', '=', $site_id ],
                [ 'give_id', "=", $give_id ]
            ])->findOrEmpty()->toArray();

            // 检测是否有礼品卡赠送记录
            if (empty($card_give_info)) {
                return [];
            }

            // 查询是否有礼品卡
            $card_model = new Card();
            $card_info = $card_model->field('card_id, giftcard_id, card_cover,validity_time')->where([
                [ 'site_id', '=', $site_id ],
                [ 'card_bag_id', '=', $card_give_info[ 'card_bag_id' ] ],
            ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

            // 检测礼品卡是否存在
            if (empty($card_info)) return [];

            // 字太多会导致生不成海报，
            $url_data = [
                [ 'key' => 'give_id', 'value' => $give_id ],
//                [ 'key' => 'validity_time', 'value' => $card_give_info[ 'validity_time' ] ],
                [ 'key' => 'g', 'value' => $card_give_info[ 'give_num' ] ],
                [ 'key' => 'l', 'value' => $card_give_info[ 'limit_num' ] ]
            ];

            $member_info = [];

            if ($member_id > 0) {
                $url_data[] = [ 'key' => 'mid', 'value' => $member_id ];

                //查询会员信息
                $member_info = ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if (!empty($member_info)) {
                    if (empty($member_info[ 'headimg' ])) {
                        $member_info[ 'headimg' ] = 'static/resource/images/default_headimg.png';
                    }
                }
            }

            $validity_time = ( new CoreCardService() )->getValidityTimeContent($card_info[ 'giftcard' ]);

            $return_data = [
                'giftcard_name' => $card_info[ 'giftcard' ][ 'card_name' ],
                'giftcard_image' => $card_info[ 'card_cover' ],
                'giftcard_blessing' => $card_give_info[ 'blessing' ],
                'giftcard_validity' => $validity_time,
                'url' => [
                    'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                    'page' => 'addon/shop_giftcard/pages/receive_info',
                    'data' => $url_data,
                ],
            ];

            if (!empty($member_info)) {
                $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
            }
            return $return_data;
        }
    }
}

<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop_giftcard\app\service\api\card;

use addon\shop_giftcard\app\dict\card\CardDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\MemberCardBag;
use core\base\BaseApiService;


/**
 * 礼品卡会员卡包模型服务层
 * Class CoreMemberCardBagService
 * @package addon\shop_giftcard\app\service\core\card
 */
class MemberCardBagService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCardBag();
    }

    /**
     * 查询卡包列表
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'card_bag_id,giftcard_id,to_use_count,can_use_count,used_count,invalid_count,total_count,card_right_type,delivery_way,balance,card_cover,is_give';
        $order = 'update_time desc,giftcard_id desc';

        switch ($where[ 'status' ]) {
            case CardDict::TO_USE:
                $status_where = [ [ 'to_use_count', '>', 0 ] ];
                break;
            case CardDict::CAN_USE:
                $status_where = [ [ 'can_use_count', '>', 0 ] ];
                break;
            case CardDict::USED:
                $status_where = [ [ 'used_count', '>', 0 ] ];
                break;
            case CardDict::INVALID:
                $status_where = [ [ 'invalid_count', '>', 0 ] ];
                break;
            default:
                $status_where = [ [ 'total_count', '>', 0 ] ];
                break;
        }

        if (!empty($where[ 'order_id' ])) {
            $card_info = ( new Card() )->field('card_bag_id')->where([
                [ 'site_id', "=", $this->site_id ],
                [ 'member_id', '=', $this->member_id ],
                [ 'order_id', '=', $where[ 'order_id' ] ]
            ])->findOrEmpty()->toArray();
            if (!empty($card_info)) {
                $where[ 'card_bag_id' ] = $card_info[ 'card_bag_id' ];
            }
        }

        $search_model = $this->model->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'member_id', '=', $this->member_id ]
        ])->where($status_where)->withSearch([ 'giftcard_id', 'card_bag_id' ], $where)->field($field)
            ->append([ 'card_right_type_name' ])
            ->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list[ "data" ] as &$item) {
            $card_info = ( new Card() )->where([
                [ 'site_id', "=", $this->site_id ],
                [ 'member_id', '=', $this->member_id ],
                [ 'card_bag_id', '=', $item[ 'card_bag_id' ] ]
            ])->field('card_id,card_no')->findOrEmpty()->toArray();
            $item[ 'status' ] = $where[ 'status' ];
            if ($item[ 'status' ] == CardDict::TO_USE) {
                $item[ 'can_use_count' ] = 0;
                $item[ 'used_count' ] = 0;
                $item[ 'invalid_count' ] = 0;
                if ($item[ 'to_use_count' ] == 1) {
                    $item[ 'tag' ] = 'single';
                    $item[ 'card_id' ] = $card_info[ 'card_id' ];
                    $item[ 'card_no' ] = $card_info[ 'card_no' ];
                } else {
                    $item[ 'tag' ] = 'group';
                }
            } elseif ($item[ 'status' ] == CardDict::CAN_USE) {
                $item[ 'to_use_count' ] = 0;
                $item[ 'used_count' ] = 0;
                $item[ 'invalid_count' ] = 0;
                if ($item[ 'can_use_count' ] == 1) {
                    $item[ 'tag' ] = 'single';
                    $item[ 'card_id' ] = $card_info[ 'card_id' ];
                    $item[ 'card_no' ] = $card_info[ 'card_no' ];
                } else {
                    $item[ 'tag' ] = 'group';
                }
            } elseif ($item[ 'status' ] == CardDict::USED) {
                $item[ 'to_use_count' ] = 0;
                $item[ 'can_use_count' ] = 0;
                $item[ 'invalid_count' ] = 0;
                if ($item[ 'used_count' ] == 1) {
                    $item[ 'tag' ] = 'single';
                    $item[ 'card_id' ] = $card_info[ 'card_id' ];
                    $item[ 'card_no' ] = $card_info[ 'card_no' ];
                } else {
                    $item[ 'tag' ] = 'group';
                }
            } elseif ($item[ 'status' ] == CardDict::INVALID) {
                $item[ 'to_use_count' ] = 0;
                $item[ 'can_use_count' ] = 0;
                $item[ 'used_count' ] = 0;
                if ($item[ 'invalid_count' ] == 1) {
                    $item[ 'tag' ] = 'single';
                    $item[ 'card_id' ] = $card_info[ 'card_id' ];
                    $item[ 'card_no' ] = $card_info[ 'card_no' ];
                } else {
                    $item[ 'tag' ] = 'group';
                }
            } else {
                if ($item[ 'total_count' ] == 1) {
                    $item[ 'tag' ] = 'single';
                    $item[ 'card_id' ] = $card_info[ 'card_id' ];
                    $item[ 'card_no' ] = $card_info[ 'card_no' ];
                } else {
                    $item[ 'tag' ] = 'group';
                }
            }
        }
        return $list;
    }


}

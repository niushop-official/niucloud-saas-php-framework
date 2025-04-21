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
use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\giftcard\GiftcardLogDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\card\CardGive;
use addon\shop_giftcard\app\model\card\MemberCardBag;
use addon\shop_giftcard\app\model\records\MemberRecords;
use addon\shop_giftcard\app\service\core\card\CoreMemberCardBagService;
use addon\shop_giftcard\app\service\core\giftcard\CoreGiftcardLogService;
use addon\shop_giftcard\app\service\core\records\CoreMemberRecordsService;
use app\model\member\Member;
use core\base\BaseApiService;
use core\exception\ApiException;


/**
 * 礼品卡赠予服务层
 * Class CardGiveService
 * @package addon\shop_giftcard\app\service\api\card
 */
class CardGiveService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new CardGive();
    }

    /**
     * 获取赠送信息
     * @param int $give_id
     * @return array
     */
    public function getInfo($give_id)
    {
        $field = 'give_id,card_id,member_id,blessing,give_num,limit_num,validity_time,card_bag_id';
        $info = $this->model->field($field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'give_id', "=", $give_id ]
        ])->with([ 'member' ])->findOrEmpty()->toArray();

        if (empty($info)) throw new ApiException('CARD_GIVE_INFO_INVALID');

        if ($info[ 'give_num' ] == 1) {
            $give_ids = [ $give_id ];
        } else {
            $give_ids = $this->model->field($field)->where([
                [ 'site_id', "=", $this->site_id ],
                [ 'member_id', '=', $info[ 'member_id' ] ],
                [ 'give_num', '=', $info[ 'give_num' ] ],
                [ 'limit_num', '=', $info[ 'limit_num' ] ],
                [ 'card_bag_id', '=', $info[ 'card_bag_id' ] ]
            ])->column('give_id');
        }

        if (!empty($info[ 'validity_time' ]) < time()) {
            throw new ApiException('CARD_GIVE_INFO_INVALID');
        }

        $card_model = new Card();
        $card_info = $card_model->field('card_id, giftcard_id, card_no,balance,card_cover,validity_time')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_id', "=", $info[ 'card_id' ] ]
        ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

        $info['card_info'] = $card_info;

        $member_records = new MemberRecords();
        // 查询当前我已领取的数量
        $info[ 'receive_num' ] = $member_records->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'to_member_id', '=', $this->member_id ],
            [ 'give_id', 'in', $give_ids ],
            [ 'is_give', '=', 1 ]
        ])->count();

        // 总领取数量
        $info[ 'total_receive_num' ] = $member_records->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'give_id', 'in', $give_ids ],
            [ 'is_give', '=', 1 ]
        ])->count();

        // 卡的拥有者，my：我，other：其他
        if ($info[ 'member_id' ] == $this->member_id) {
            $info[ 'to_have' ] = 'my';
        } else {
            $info[ 'to_have' ] = 'other';
        }

        $card_bag_model = new MemberCardBag();
        $to_use_count = $card_bag_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_bag_id', '=', $info[ 'card_bag_id' ] ]
        ])->value('to_use_count');

        // 卡包剩余可领取数量
        $info[ 'total_leave_num' ] = $to_use_count;

        return $info;
    }

    /**
     * 添加礼品卡赠予（单张）
     * @param array $params
     * @return mixed
     */
    public function give(array $params)
    {
        $field = 'card_id,giftcard_id,source,card_no,card_key,card_cover,balance,card_make_id,status,member_id,validity_time,total_num,use_num,create_time,use_time,activate_time,invalid_time,card_bag_id';
        $card_model = new Card();
        $card_info = $card_model->field($field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'card_id', "=", $params[ 'card_id' ] ],
            [ 'status', "=", CardDict::TO_USE ]
        ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

        if (empty($card_info)) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        if (empty($card_info[ 'giftcard' ])) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        if ($card_info[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) {
            throw new ApiException('GIFTCARD_HAS_DOWN');
        }

        if ($card_info[ 'giftcard' ][ 'is_give' ] == 0) {
            throw new ApiException('CARD_NOT_ALLOW_GIVE');
        }

//        if (!empty($params[ 'give_id' ])) {
//            $card_give_where = [
//                [ 'site_id', '=', $this->site_id ],
//                [ 'give_id', '=', $params[ 'give_id' ] ]
//            ];
//        } else {
//            $card_give_where = [
//                [ 'site_id', '=', $this->site_id ],
//                [ 'member_id', '=', $this->member_id ],
//                [ 'card_bag_id', '=', $card_info[ 'card_bag_id' ] ]
//            ];
//        }
//        $card_give_info = $this->model->field('give_id')->where($card_give_where)->findOrEmpty()->toArray();

        $card_give_info = $this->model->field('give_id')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'give_id', '=', $params[ 'give_id' ] ]
        ])->findOrEmpty()->toArray();

        if (!empty($card_give_info)) {
            // 更新礼品卡赠予记录信息
            $this->model->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'give_id', '=', $card_give_info[ 'give_id' ] ],
            ])->update([
                'blessing' => $params[ 'blessing' ],
            ]);
            $give_id = $card_give_info[ 'give_id' ];
        } else {
            $data = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'blessing' => $params[ 'blessing' ],
                'validity_time' => time() + $card_info[ 'giftcard' ][ 'receive_validity_time' ] * 3600,
                'give_num' => 1,
                'limit_num' => 1,
                'card_id' => $card_info[ 'card_id' ],
                'card_bag_id' => $card_info[ 'card_bag_id' ]
            ];

            $res = $this->model->create($data);
            $give_id = $res->give_id;
        }

        $card_info[ 'give_id' ] = $give_id;

        return $card_info;
    }

    /**
     * 添加礼品卡赠予（多张）
     * @param array $params
     * @return mixed
     */
    public function giveBatch(array $params)
    {
        $card_bag_model = new MemberCardBag();
        $card_bag_info = $card_bag_model->field('giftcard_id,balance,card_cover,validity_type,to_use_count')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_bag_id', '=', $params[ 'card_bag_id' ] ]
        ])->findOrEmpty()->toArray();

        if (empty($card_bag_info)) {
            throw new ApiException('CARD_BAG_NOT_FUND');
        }

        if ($card_bag_info[ 'validity_type' ] == GiftcardDict::FOREVER) {
            $order = 'card_id desc';
        } else {
            $order = 'validity_time asc';
        }

        $give_num = $params[ 'give_num' ] ? $params[ 'give_num' ] : $card_bag_info[ 'to_use_count' ];
        $limit_num = $params[ 'limit_num' ] ? $params[ 'limit_num' ] : 1;

        $card_model = new Card();
        $card_list = $card_model->field('card_id,card_no,giftcard_id,status')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'card_bag_id', '=', $params[ 'card_bag_id' ] ],
            [ 'status', "=", CardDict::TO_USE ],
        ])->with([ 'giftcard' ])->order($order)->limit($give_num)->select()->toArray();

        if (empty($card_list)) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        $receive_validity_time = 0;

        foreach ($card_list as $card_info) {
            if (empty($card_info[ 'giftcard' ])) {
                throw new ApiException('CARD_NOT_FOUND');
            }

            if ($card_info[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) {
                throw new ApiException('GIFTCARD_HAS_DOWN');
            }

            if ($card_info[ 'giftcard' ][ 'is_give' ] == 0) {
                throw new ApiException('CARD_NOT_ALLOW_GIVE');
            }
            $receive_validity_time = $card_info[ 'giftcard' ][ 'receive_validity_time' ];
        }

        $card_ids = array_column($card_list, 'card_id');

//        if (!empty($params[ 'give_id' ])) {
//            $card_give_where = [
//                [ 'site_id', '=', $this->site_id ],
//                [ 'give_id', '=', $params[ 'give_id' ] ]
//            ];
//        } else {
//            if (empty($params[ 'give_num' ]) || empty($params[ 'limit_num' ])) {
//                $card_give_where = [
//                    [ 'site_id', '=', $this->site_id ],
//                    [ 'member_id', '=', $this->member_id ],
//                    [ 'card_bag_id', '=', $params[ 'card_bag_id' ] ],
//                    [ 'give_num', '=', $card_bag_info[ 'to_use_count' ] ],
//                    [ 'limit_num', '=', 1 ]
//                ];
//            } else {
//                $card_give_where = [
//                    [ 'site_id', '=', $this->site_id ],
//                    [ 'give_id', '=', 0 ]
//                ];
//            }
//        }
//
//        $card_give_info = $this->model->field('give_id')->where($card_give_where)->findOrEmpty()->toArray();

        $card_give_info = $this->model->field('give_id')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'give_id', '=', $params[ 'give_id' ] ]
        ])->findOrEmpty()->toArray();

        if (!empty($card_give_info)) {
            // 更新礼品卡赠予记录信息
            $this->model->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'give_id', '=', $card_give_info[ 'give_id' ] ],
            ])->update([
                'blessing' => $params[ 'blessing' ],
            ]);
            $give_id = $card_give_info[ 'give_id' ];
        } else {
            $data = [
                'site_id' => $this->site_id,
                'member_id' => $this->member_id,
                'blessing' => $params[ 'blessing' ],
                'validity_time' => time() + $receive_validity_time * 3600,
                'give_num' => $give_num,
                'limit_num' => $limit_num,
                'card_id' => $card_ids[0],
                'card_bag_id' => $params[ 'card_bag_id' ]
            ];

            $res = $this->model->create($data);
            $give_id = $res->give_id;
        }

        $res = $card_list[0];
        $res['give_id'] = $give_id;
        $res['to_use_count'] = $card_bag_info['to_use_count'];
        $res['card_cover'] = $card_bag_info['card_cover'];
        $res['balance'] = $card_bag_info['balance'];

        return $res;
    }

    /**
     * 领取礼品卡
     * @param $params
     */
    public function receive($params)
    {
        if (empty($params[ 'give_id' ])) {
            throw new ApiException('CARD_GIVE_INFO_INVALID');
        }

        $field = 'give_id,member_id,give_num,limit_num,validity_time,card_bag_id';

        $card_give_info = $this->model->field($field)->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'give_id', '=', $params[ 'give_id' ] ],
        ])->findOrEmpty()->toArray();

        if (empty($card_give_info)) {
            throw new ApiException('CARD_GIVE_INFO_INVALID');
        }

        if ($card_give_info[ 'give_num' ] == 1) {
            $give_ids = [ $params[ 'give_id' ] ];
        } else {
            $give_ids = $this->model->field($field)->where([
                ['site_id', "=", $this->site_id],
                ['member_id', '=', $card_give_info['member_id']],
                ['give_num', '=', $card_give_info['give_num']],
                ['limit_num', '=', $card_give_info['limit_num']],
                ['card_bag_id', '=', $card_give_info['card_bag_id']],
            ])->column('give_id');
        }

//        if ($card_give_info[ 'member_id' ] == $this->member_id) {
//            throw new ApiException('CARD_OWN_CANNOT_RECEIVE');
//        }

        if ($card_give_info[ 'validity_time' ] < time()) {
            throw new ApiException('CARD_GIVE_INFO_INVALID');
        }

        $card_model = new Card();
        $card_field = 'card_id,giftcard_id,status,card_no,balance,card_cover,card_bag_id';
        $card_info = $card_model->field($card_field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_bag_id', '=', $card_give_info[ 'card_bag_id' ] ],
            [ 'status', "=", CardDict::TO_USE ]
        ])->with([ 'giftcard' ])->findOrEmpty()->toArray();

        if (empty($card_info)) {
            throw new ApiException('CARD_RECEIVE_EMPTY'); // 该礼品卡已领完
        }

        if (empty($card_info[ 'giftcard' ])) {
            throw new ApiException('CARD_NOT_FOUND');
        }

        if ($card_info[ 'status' ] != CardDict::TO_USE) {
            throw new ApiException('CARD_HAS_BEEN_USED_CANNOT_RECEIVE');
        }

        if ($card_info[ 'giftcard' ][ 'status' ] == GiftcardDict::OFF) {
            throw new ApiException('GIFTCARD_HAS_DOWN');
        }

        if ($card_info[ 'giftcard' ][ 'is_give' ] == 0) {
            throw new ApiException('CARD_NOT_ALLOW_GIVE');
        }

        $member_records = new MemberRecords();

        // 总领取数量
        $total_receive_num = $member_records->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'give_id', 'in', $give_ids ],
            [ 'is_give', '=', 1 ]
        ])->count();

        if ($total_receive_num >= $card_give_info[ 'give_num' ]) {
            throw new ApiException('CARD_RECEIVE_LIMIT_MAX');
        }

        // 当前用户已领取数量
        $receive_num = $member_records->where([
            [ 'site_id', "=", $this->site_id ],
            [ 'to_member_id', '=', $this->member_id ],
            [ 'give_id', 'in', $give_ids ],
            [ 'is_give', '=', 1 ]
        ])->count();

        if ($receive_num >= $card_give_info[ 'limit_num' ]) {
            throw new ApiException('CARD_RECEIVE_LIMIT_MAX');
        }

        $member_records_where = [
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $card_give_info[ 'member_id' ] ],
            [ 'card_id', '=', $card_info[ 'card_id' ] ],
            [ 'is_give', '=', 0 ]
        ];
        $member_records_info = $member_records->field('member_card_id')->where($member_records_where)->findOrEmpty()->toArray();

        if (empty($member_records_info)) {
            throw new ApiException('CARD_HAS_BEEN_RECEIVED');
        }

        // 变更 原拥有卡的会员领取记录
        $member_records_service = new CoreMemberRecordsService();
        $member_records_service->edit([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_card_id', '=', $member_records_info[ 'member_card_id' ] ]
        ], [
            'to_member_id' => $this->member_id,
            'give_id' => $card_give_info[ 'give_id' ],
            'is_give' => 1,
            'give_time' => time()
        ]);

        // 变更 新拥有卡的会员领取记录
        $member_records_service->add([
            'site_id' => $this->site_id,
            'card_id' => $card_info[ 'card_id' ],
            'from_member_id' => $card_give_info[ 'member_id' ],
            'member_id' => $this->member_id,
            'source' => CardDict::GIVE
        ]);

        $nickname = ( new Member() )->where([ 'member_id' => $card_give_info[ 'member_id' ] ])->value('nickname') ?? '';

        // 增加日志
        $log_data = [
            'giftcard_id' => $card_info[ 'giftcard_id' ],
            'card_id' => $card_info[ 'card_id' ],
            'member_id' => $this->member_id,
            'site_id' => $this->site_id,
            'type' => GiftcardLogDict::CARD_GIVE_ACTION,
            'remark' => '领取了' . $nickname . '赠送的礼品卡'
        ];
        ( new CoreGiftcardLogService() )->add($log_data, 'member');

        // 领取别人发的礼品卡，要放入自己的卡包
        $bag_data = [
            'giftcard_id' => $card_info[ 'giftcard_id' ],
            'card_right_type' => $card_info[ 'giftcard' ][ 'card_right_type' ],
            'balance' => $card_info[ 'balance' ],
            'delivery_way' => $card_info[ 'giftcard' ][ 'delivery_way' ],
            'card_goods_type' => $card_info[ 'giftcard' ][ 'card_goods_type' ],
            'validity_type' => $card_info[ 'giftcard' ][ 'validity_type' ],
            'is_give' => $card_info[ 'giftcard' ][ 'is_give' ],
            'card_cover' => $card_info[ 'card_cover' ],

            'to_use_count' => 1,
            'total_count' => 1,
        ];
        $card_bag_id = ( new CoreMemberCardBagService() )->generate($this->site_id, $this->member_id, $bag_data);

        // 赠送人的卡包数量减少
        ( new CoreMemberCardBagService() )->editCount($this->site_id, $card_give_info[ 'member_id' ], $card_info[ 'card_bag_id' ], [ 'to_use_count' => -1, 'total_count' => -1 ]);

        // 变更 新拥有卡的会员
        $card_model = new Card();
        $card_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'card_id', '=', $card_info[ 'card_id' ] ]
        ])->update([
            'member_id' => $this->member_id,
            'card_bag_id' => $card_bag_id,
            'source' => CardDict::GIVE
        ]);
    }

}

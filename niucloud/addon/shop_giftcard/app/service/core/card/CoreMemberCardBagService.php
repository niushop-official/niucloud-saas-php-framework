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

namespace addon\shop_giftcard\app\service\core\card;

use addon\shop_giftcard\app\model\card\MemberCardBag;
use core\base\BaseCoreService;
use think\facade\Db;


/**
 * 礼品卡会员卡包模型服务层
 * Class CoreMemberCardBagService
 * @package addon\shop_giftcard\app\service\core\card
 */
class CoreMemberCardBagService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new MemberCardBag();
    }

    /**
     * 生成卡包
     * @param $site_id
     * @param $member_id
     * @param $params
     * @return mixed
     */
    public function generate($site_id, $member_id, $params)
    {
        $to_use_count = $params[ 'to_use_count' ] ?? 0;
        $can_use_count = $params[ 'can_use_count' ] ?? 0;
        $used_count = $params[ 'used_count' ] ?? 0;
        $invalid_count = $params[ 'invalid_count' ] ?? 0;
        $total_count = $params[ 'total_count' ] ?? 0;

        // 查询卡包
        $bag_info = $this->model->field('*')
            ->where([
                [ 'site_id', '=', $site_id ],
                [ 'member_id', '=', $member_id ],
                [ 'giftcard_id', "=", $params[ 'giftcard_id' ] ],
                [ 'balance', '=', $params[ 'balance' ] ],
                [ 'card_cover', '=', $params[ 'card_cover' ] ],
            ])->findOrEmpty()->toArray();

        // 先检查当前购买的卡是要放入卡包，把相同属性的卡归类（面值相同、封面相同、提货方式：全提），存在就修改数量，不存在就增加
        if (!empty($bag_info)) {
            $data = [
                'to_use_count' => Db::raw('to_use_count+' . $to_use_count),
                'can_use_count' => Db::raw('can_use_count+' . $can_use_count),
                'used_count' => Db::raw('used_count+' . $used_count),
                'invalid_count' => Db::raw('invalid_count+' . $invalid_count),
                'total_count' => Db::raw('total_count+' . $total_count),

                'update_time' => time()
            ];
            $this->model->where([
                [ 'site_id', '=', $site_id ],
                [ 'card_bag_id', '=', $bag_info[ 'card_bag_id' ] ]
            ])->update($data);
            return $bag_info[ 'card_bag_id' ];
        } else {
            $card_data = [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'giftcard_id' => $params[ 'giftcard_id' ],
                'card_right_type' => $params[ 'card_right_type' ],
                'balance' => $params[ 'balance' ],
                'delivery_way' => $params[ 'delivery_way' ],
                'card_goods_type' => $params[ 'card_goods_type' ],
                'validity_type' => $params[ 'validity_type' ],
                'is_give' => $params[ 'is_give' ],
                'card_cover' => $params[ 'card_cover' ],

                'to_use_count' => $to_use_count,
                'can_use_count' => $can_use_count,
                'used_count' => $used_count,
                'invalid_count' => $invalid_count,
                'total_count' => $total_count,

                'create_time' => time(),
                'update_time' => time()
            ];

            $res = $this->model->create($card_data);
            return $res->card_bag_id;
        }

    }

    /**
     * 更新卡包统计数据
     * @param $site_id
     * @param $member_id
     * @param $card_bag_id
     * @param $data
     */
    public function editCount($site_id, $member_id, $card_bag_id, $data)
    {
        $to_use_count = $data[ 'to_use_count' ] ?? 0;
        $can_use_count = $data[ 'can_use_count' ] ?? 0;
        $used_count = $data[ 'used_count' ] ?? 0;
        $invalid_count = $data[ 'invalid_count' ] ?? 0;
        $total_count = $data[ 'total_count' ] ?? 0;
        $count_data = [
            'to_use_count' => Db::raw('to_use_count+' . $to_use_count),
            'can_use_count' => Db::raw('can_use_count+' . $can_use_count),
            'used_count' => Db::raw('used_count+' . $used_count),
            'invalid_count' => Db::raw('invalid_count+' . $invalid_count),
            'total_count' => Db::raw('total_count+' . $total_count),
        ];
        $where = [
            [ 'site_id', '=', $site_id ],
            [ 'member_id', '=', $member_id ],
            [ 'card_bag_id', '=', $card_bag_id ]
        ];
        $this->model->where($where)->update($count_data);
    }

}

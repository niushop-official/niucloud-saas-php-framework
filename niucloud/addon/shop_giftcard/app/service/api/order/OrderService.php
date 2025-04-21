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

namespace addon\shop_giftcard\app\service\api\order;

use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\card\Card;
use addon\shop_giftcard\app\model\order\Order;
use app\model\pay\Pay;
use core\base\BaseApiService;
use core\exception\ApiException;
use think\db\Query;


/**
 * 礼品卡订单服务层
 * Class OrderService
 * @package addon\shop_giftcard\app\service\api\order
 */
class OrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取礼品卡订单列表
     * @param array $where
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getPage(array $where = [])
    {
        $field = 'order_id, order_no, body, out_trade_no, status, giftcard_id, card_right_type, card_cover, balance, material_id, card_price, num, order_money, goods_money, pay_money, member_remark, shop_remark, create_time, pay_time';
        $order = 'create_time desc';

        $pay_where = [];
        $search_model = $this->model->where([
            [ 'order.site_id', "=", $this->site_id ],
            [ 'member_id', "=", $this->member_id ],
        ])->withSearch([ 'order_no', 'join_status' ], $where)->field($field)
            ->withJoin([
                'pay' => function(Query $query) use ($pay_where) {
                    $query->where($pay_where);
                },
            ], 'left')
            ->append([ 'status_name', 'card_right_type_name' ])->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list[ 'data' ] as &$item) {
            $item[ 'order_type' ] = OrderDict::TYPE;
        }
        return $list;
    }

    /**
     * 获取礼品卡订单信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'order_id, order_no, body, out_trade_no, status, giftcard_id, card_right_type, card_cover, balance, material_id, card_price, num, delivery_way, card_goods_type, card_goods_count, validity_time, is_give, order_money, goods_money, pay_money, member_remark, shop_remark, create_time, pay_time';

        $info = $this->model->field($field)->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'order_id', "=", $id ]
        ])->append([ 'status_name', 'card_right_type_name' ])->findOrEmpty()->toArray();
        if (empty($info)) throw new ApiException('GIFTCARD_ORDER_NOT_EXIST');
        if (!empty($info[ 'out_trade_no' ])) {
            $info[ 'pay' ] = ( new Pay() )->where([ [ 'out_trade_no', '=', $info[ 'out_trade_no' ] ] ])
                ->field('out_trade_no, type, pay_time')->append([ 'type_name' ])->findOrEmpty()->toArray();
        }
        $info[ 'order_type' ] = OrderDict::TYPE;
        // 检测当前购买的礼品卡数量
        $info[ 'have_count' ] = (new Card())->where([['site_id', '=', $this->site_id],['order_id', '=', $id],['member_id', '=', $this->member_id]])->count();
        return $info;
    }

    /**
     * 礼品卡订单关闭
     * @param int $order_id
     * @return bool
     */
    public function close($order_id)
    {
        $this->model->where([['site_id', '=', $this->site_id],['order_id', '=', $order_id]])->update(['status' => OrderDict::CLOSE]);
        return true;
    }

}

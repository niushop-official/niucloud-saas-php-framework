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

namespace addon\shop_giftcard\app\service\admin\order;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;
use addon\shop_giftcard\app\model\order\Order;
use app\model\pay\Pay;
use core\base\BaseAdminService;
use think\db\Query;


/**
 * 礼品卡订单服务层
 * Class OrderService
 * @package addon\shop_giftcard\app\service\admin\order
 */
class OrderService extends BaseAdminService
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
     */
    public function getPage(array $where = [])
    {
        $field = 'order_id,order_no,body,status,card_right_type,card_cover,card_price,num,order_money,shop_remark,create_time,pay_time';
        $order = 'create_time desc';
        $pay_where = [];
        if ($where[ 'pay_type' ]) {
            $pay_where[] = [ 'type', '=', $where[ 'pay_type' ] ];
        }
        $member_where = [];
        if (isset($where[ 'keyword' ]) && $where[ 'keyword' ] != '') {
            $member_where[] = [ 'member.member_no|nickname|username|mobile', 'like', '%' . $this->model->handelSpecialCharacter($where[ 'keyword' ]) . '%' ];
        }
        $search_model = $this->model->where([ [ 'order.site_id' ,"=", $this->site_id ] ])->withSearch(['search_type','join_status','member_id','create_time','join_pay_time','giftcard_id'], $where)->field($field)
            ->withJoin([
                'pay' => function(Query $query) use ($pay_where) {
                    $query->where($pay_where);
                },
                'member' => function(Query $query) use ($member_where) {
                    $query->where($member_where);
                },
            ], 'left')
            ->append(['status_name', 'card_right_type_name'])->order($order);
        $list = $this->pageQuery($search_model, function($item, $key) {
            $item_pay = $item[ 'pay' ];
            if (!empty($item_pay)) {
                $item_pay->append([ 'type_name' ]);
            }
        });
        return $list;
    }

    /**
     * 获取礼品卡订单信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'order_id,order_no,body,order_from,out_trade_no,status,member_id,giftcard_id,card_right_type,num,member_remark,shop_remark,create_time';

        $info = $this->model->field($field)->where([['order_id', "=", $id]])
            ->with(['member','card'])->append(['status_name', 'card_right_type_name', 'order_from_name'])->findOrEmpty()->toArray();
        if ($info[ 'out_trade_no' ]) {
            $info[ 'pay' ] = ( new Pay() )->where([ [ 'out_trade_no', '=', $info[ 'out_trade_no' ] ] ])
                ->field('out_trade_no, type, pay_time')->append([ 'type_name' ])->findOrEmpty()->toArray();
        }
        if ($info[ 'card_right_type' ] == GiftcardDict::cardRightTypeGoods) {
            // 查询礼品卡关联的商品列表
            $giftcard_goods_model = new GiftcardGoods();
            $giftcard_goods = $giftcard_goods_model->where([ [ 'giftcard_id', "=", $info['giftcard_id'] ] ])->with([ 'goods', 'sku' ])->select()->toArray();
            $info[ 'goods_sku_list' ] = $giftcard_goods;
        }
        if ($info[ 'card_right_type' ] == GiftcardDict::cardRightTypeBalance) {
            $giftcard_model = new Giftcard();
            $giftcard_info = $giftcard_model->field('balance_json')->where([ [ 'giftcard_id', "=", $info['giftcard_id' ]], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
            $info[ 'balance_json' ] = $giftcard_info[ 'balance_json' ];
        }
        return $info;
    }

    /**
     * 修改礼品卡订单备注
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function editRemark($id, array $data)
    {
        $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->update(['shop_remark' => $data['shop_remark']]);
        return true;
    }

    /**
     * 礼品卡订单关闭
     * @param int $id
     * @return bool
     */
    public function close($id)
    {
        $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->update(['status' => OrderDict::CLOSE]);
        return true;
    }

}

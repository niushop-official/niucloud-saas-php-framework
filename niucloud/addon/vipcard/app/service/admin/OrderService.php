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

namespace addon\vipcard\app\service\admin;

use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\model\Order;
use app\dict\pay\PayDict;
use app\model\member\Member;
use core\base\BaseAdminService;

/**
 *
 * Class OrderService
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time'], $where)->field($field)
            ->with([ 'item' => function ($query){
                $query->field('order_id, item_name, item_image, price, num, item_money, site_id');
            }, 'member' => function($query){
                $query->field('member_id, nickname, mobile, headimg');
            }, 'pay' => function($query){
                $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
            } ])->order($order)->append(['order_status_info', 'order_from_name', 'item.item_image_thumb_small']);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $k => $v){
            if (!empty($v[ 'pay' ])) {
                $list['data'][$k][ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[PayDict::FRIENDSPAY]['name'] ?? '';
            }
        }
        return $list;
    }

    /**
     * 订单详情
     * @param array $where
     * @return mixed
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';

        $info = $this->model->where([ ['site_id', '=', $this->site_id], ['order_id', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_id, item_name, item_image, price, num, item_money, site_id');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        },'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }, 'member_card' => function($query){
            $query->field('order_id,goods_id,card_id,total_num,card_type,total_use_num,expire_time,status')->with(['member_card_item' => function($query){
                $query->field('card_id,item_id,goods_id,num,use_num,verify_code')->with(['goods' => function($query){
                    $query->field('goods_id,goods_name,goods_cover,site_id');
                }]);
            }, 'goods' => function($query){
                $query->field('goods_id,goods_name,goods_type')->append(['goods_type_name']);
            }])->append(['card_type_name', 'expire_time_name', 'status_name']);
        }, 'pay' => function($query){
            $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
        } ])->append(['order_status_info', 'order_from_name', 'item.item_image_thumb_small'])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            if (!empty($info[ 'pay' ])) {
                if ($info[ 'member_id' ] != $info[ 'pay' ][ 'main_id' ]) {
                    $member_info = ( new Member() )->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $info[ 'pay' ][ 'main_id' ] ] ])->findOrEmpty()->toArray();
                    if (!empty($member_info)) {
                        $info[ 'pay' ][ 'pay_member' ] = $member_info['nickname'];
                    }
                }
                $info[ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[PayDict::FRIENDSPAY]['name'] ?? '';
            }
            foreach ($info['member_card'] as &$item){
                if ($item['goods']['goods_type'] == 'service'){
                    $item['card_type_name'] = $item['goods']['goods_type_name'] ;
                }
            }
        }
        return $info;
    }

    /**
     * 订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return array_map(function ($item) {
            return [ 'name' => $item['name'], 'status' => $item['status'] ];
        }, OrderDict::getStatus());
    }
}
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

namespace addon\vipcard\app\service\api;

use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\dict\order\OrderLogDict;
use addon\vipcard\app\model\Order;
use addon\vipcard\app\service\core\CoreOrderLogService;
use addon\vipcard\app\service\core\CoreOrderService;
use app\model\member\Member;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 订单服务层
 * Class OrderService
 * @package app\service\api\order
 */
class OrderService extends BaseApiService
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
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->withSearch(['order_status'], $where)->field($field)->with([ 'item' => function ($query){
            $query->field('order_id, item_name, item_image, price, num, item_money, site_id');
        }])->order($order)->append(['order_status_info', 'item.item_image_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 订单详情
     * @param array $where
     * @return mixed
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, refund_no, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';

        $info = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['order_id', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_id, item_id, item_type, item_name, item_image, price, num, item_money, site_id');
        }, 'member_card' => function($query){
            $query->field('order_id,card_id');
        }, 'pay' => function($query){
            $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
        },'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }, 'refund' => function($query){
            $query->field('refund_id,refund_no');
        }])->append(['order_status_info', 'item.item_image_thumb_small'])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            if (!empty($info[ 'pay' ])) {
                if ($info[ 'member_id' ] != $info[ 'pay' ][ 'main_id' ]) {
                    $member_info = ( new Member() )->field('nickname,headimg')->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $info[ 'pay' ][ 'main_id' ] ] ])->findOrEmpty()->toArray();
                    if (!empty($member_info)) {
                        $info[ 'pay' ][ 'pay_member' ] = $member_info['nickname'];
                        $info[ 'pay' ][ 'pay_member_headimg' ] = $member_info['headimg'];
                    }
                }
            }
        }
        return $info;
    }

    /**
     * 订单确认
     * @param array $data
     * @return array|null
     */
    public function confirm(array $data) {
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreOrderService())->confirm($data);
    }

    /**
     * 订单计算
     * @param array $data
     * @return array|null
     */
    public function calculate(array $data){
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreOrderService())->calculate($data);
    }

    /**
     * 订单创建
     * @param array $data
     * @return array|null
     */
    public function create(array $data) {
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        $data['order_from'] = $this->channel;
        return (new CoreOrderService())->create($data);
    }

    /**
     * 会员取消订单
     * @param int $order_id
     * @return \think\Response
     */
    public function cancel(int $order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order['order_status'] != OrderDict::WAIT_PAY ) throw new CommonException('ORDER_NOT_ALLOW_CLOSE');

        try {
            (new CoreOrderService())->close($order);
            CoreOrderLogService::addLog($order['site_id'], $order_id, OrderLogDict::ORDER_CANCEL, 'member', $this->member_id, OrderDict::getStatus(OrderDict::CLOSE));
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除订单
     * @param int $order_id
     * @return true
     */
    public function delete(int $order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order['order_status'] != OrderDict::CLOSE ) throw new CommonException('ORDER_NOT_ALLOW_DELETE');
        $order->delete();
        return true;
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
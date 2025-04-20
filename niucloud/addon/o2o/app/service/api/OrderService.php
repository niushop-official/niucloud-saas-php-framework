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

namespace addon\o2o\app\service\api;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\dict\order\OrderLogDict;
use addon\o2o\app\dict\order\RefundDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderRefund;
use addon\o2o\app\service\core\CoreOrderCreateService;
use addon\o2o\app\service\core\CoreOrderLogService;
use addon\o2o\app\service\core\CoreOrderService;
use app\model\member\Member;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 订单服务层
 * Class OrderService
 * @package app\service\api
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
        $field = 'order_id, order_type, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->withSearch(['order_status'], $where)->field($field)->with([ 'item' => function ($query){
            $query->field('order_id, item_name, item_image, pay_time,price, num, item_money, site_id, item_images');
        }])->order($order)->append(['order_status_info', 'item.item_image_thumb_small']);
        $list = $this->pageQuery($search_model);

        foreach ($list['data'] as $k => $v){
            $list['data'][$k]['total_money'] = number_format(array_sum(array_column($v['item'], 'item_money')), 2, '.', '');
            $item = [];
            foreach ($v['item'] as $val)
            {
                if($val['pay_time'] != 0)
                {
                    $item[] = $val;
                }
            }
            $list['data'][$k]['total_pay_money'] = number_format(array_sum(array_column($item, 'item_money')), 2, '.', '');
        }
        return $list;
    }

    /**
     * 订单详情
     * @param array $where
     * @return mixed
     */
    public function getDetail($order_id)
    {
        $field = 'order_id, check_code,site_id, reserve_service_time,member_message,order_type, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude,technician_id,service_time,dispatch_time,finish_time';

        $info = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['order_id|out_trade_no', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_id, item_name,goods_id,item_id,order_item_id, item_type, is_refund, item_image,price, num, item_money, site_id, out_trade_no,pay_time,is_enable_refund, refund_status, refund_no, item_images')->append(['item_image_thumb_small', 'item_type_name', 'item_images_thumb_mid', 'item_images_thumb_small']);
        }, 'pay' => function($query){
            $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
        },'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        },'technician_info' => function($query){
            $query->field('name,age,id,mobile,working_age,position_id,position_name,order_num,bad_evaluate');
        }, 'refund' => function($query){
            $query->field('refund_id,refund_no');
        }])->append(['order_status_info'])->findOrEmpty()->toArray();

        if(!empty($info))
        {
            $info['total_money'] = number_format(array_sum(array_column($info['item'], 'item_money')), 2, '.', '');
            $item = [];
            foreach ($info['item'] as $val)
            {
                if($val['pay_time'] != 0)
                {
                    $item[] = $val;
                }
            }
            $info['total_pay_money'] = number_format(array_sum(array_column($item, 'item_money')), 2, '.', '');
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
        return (new CoreOrderCreateService())->confirm($data);
    }

    /**
     * 订单计算
     * @param array $data
     * @return array|null
     */
    public function calculate(array $data){
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreOrderCreateService())->calculate($data);
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
        return (new CoreOrderCreateService())->create($data);
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
        $order->delete_time = time();
        $order->save();
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

    /**
     * 获取订单数量
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function num()
    {
        $data[ 'wait_pay' ] = $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'order_status', '=', OrderDict::WAIT_PAY ],
        ])->count() ?? 0;

        $data[ 'wait_service' ] = $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'order_status', '=', OrderDict::WAIT_SERVICE ],
        ])->count() ?? 0;

        $data[ 'in_service' ] = $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'order_status', '=', OrderDict::IN_SERVICE ],
        ])->count() ?? 0;

        $data[ 'finish' ] = $this->model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'order_status', '=', OrderDict::FINISH ],
            [ 'is_evaluate', '=', 0 ],
        ])->count() ?? 0;

        $data[ 'refund' ] = ( new OrderRefund() )->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ],
            [ 'status', 'in', [
                RefundDict::WAIT_REFUND,
                RefundDict::REFUNDING,
                RefundDict::REFUND_REFUSE
            ] ]
        ])->count() ?? 0;

        return $data;
    }
}

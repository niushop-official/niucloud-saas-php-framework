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

namespace addon\o2o\app\service\admin;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\service\core\CoreOrderService;
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
        $where[ 'site_id' ] = $this->site_id;
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, technician_id,order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';
        $order = 'create_time desc';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time', 'order_name', 'pay_time', 'member_search_text', 'technician_search_text' ], $where)->field($field)
            ->with([ 'item' => function($query) {
                $query->field('order_id, item_name, order_item_id,refund_no,refund_status,item_image, price, num, item_money, site_id,item_type,goods_id')->append([ 'item_type_name', 'item_image_thumb_small' ]);
            }, 'member' => function($query) {
                $query->field('member_id, nickname, mobile, headimg');
            }, 'technician_info' => function($query) {
                $query->field('name,age,id,mobile,working_age,position_id,position_name,order_num,bad_evaluate');
            }, 'pay' => function($query) {
                $query->field('main_id, out_trade_no, type, pay_time, status')->append([ 'type_name' ]);
            } ])->order($order)->append([ 'order_status_info', 'order_from_name' ]);
        $list = $this->pageQuery($search_model);

        foreach ($list[ 'data' ] as $k => $v) {
            $list[ 'data' ][ $k ][ 'total_money' ] = number_format(array_sum(array_column($v[ 'item' ], 'item_money')), 2, '.', '');

            if (!empty($v[ 'pay' ])) {
                $list[ 'data' ][ $k ][ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[ PayDict::FRIENDSPAY ][ 'name' ] ?? '';
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
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude,technician_id,service_time,dispatch_time,finish_time,check_code,remark,member_message';

        $info = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'order_id', '=', $order_id ] ])->field($field)->with([ 'item' => function($query) {
            $query->field('order_id, item_name, item_image, price, num, item_money, site_id, item_type, item_images,refund_status')->append([ 'item_image_thumb_small', 'item_type_name', 'item_images_thumb_mid', 'item_images_thumb_small', 'refund_status_name' ]);
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'technician_info' => function($query) {
            $query->field('name,age,id,mobile,working_age,position_id,position_name,order_num,bad_evaluate');
        }, 'order_log' => function($query) {
            $query->field('order_id, action, action_time, nick_name, action_way');
        }, 'pay' => function($query) {
            $query->field('main_id, out_trade_no, type, pay_time, status')->append([ 'type_name' ]);
        } ])->append([ 'order_status_info', 'order_from_name' ])->findOrEmpty()->toArray();
        if (!empty($info)) {
            if (!empty($info[ 'pay' ])) {
                if ($info[ 'member_id' ] != $info[ 'pay' ][ 'main_id' ]) {
                    $member_info = ( new Member() )->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $info[ 'pay' ][ 'main_id' ] ] ])->findOrEmpty()->toArray();
                    if (!empty($member_info)) {
                        $info[ 'pay' ][ 'pay_member' ] = $member_info[ 'nickname' ];
                    }
                }
                $info[ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[ PayDict::FRIENDSPAY ][ 'name' ] ?? '';
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
        return array_map(function($item) {
            return [ 'name' => $item[ 'name' ], 'status' => $item[ 'status' ] ];
        }, OrderDict::getStatus());
    }

    /**
     * 订单派单
     */
    public function orderDispatch(array $data)
    {
        ( new CoreOrderService() )->orderDispatch(array_merge($data, [
            'id' => $this->uid,
            'action_way' => 'user',
        ]));
        return true;
    }

    /**
     * 获取一周内的时间段
     * @param $length
     * @return array
     */
    public function getWeekDay(int $length = 0) : array
    {
        $first_day = mktime(0, 0, 0, date("m"), date("d") - date("w") + 1, date("Y"));
        $first_day = strtotime($length . ' week', $first_day);

        $week = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ];
        $data = [];
        for ($i = 0; $i < 7; $i++) {
            $time = strtotime("+ {$i} day", $first_day);
            array_push($data, [
                'start' => $time,
                'end' => strtotime(date('Y-m-d 23:59:59', $time)),
                'date' => date('m/d', $time),
                'w' => date('w', $time),
                'week' => $week[ date('w', $time) ],
                'currday' => date('Y-m-d', $time) == date('Y-m-d') ? 1 : 0
            ]);
        }
        return $data;
    }

    /**
     * 预约看板
     */
    public function reserveByWeek(array $where)
    {
        $date = $this->getWeekDay($where[ 'length' ]);

        foreach ($date as $wk => $w_item) {
            $where[ 'site_id' ] = $this->site_id;
            $field = 'order_id, site_id, reserve_service_time, member_id, order_from, order_type, order_no, out_trade_no, technician_id,order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money';
            $order = 'create_time desc';
            $list = $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'order_status', '<>', 'close' ], [ 'reserve_service_time_stamp', 'between', [ $w_item[ 'start' ], $w_item[ 'end' ] ] ] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time', 'order_name', 'pay_time', 'member_search_text', 'technician_search_text' ], $where)->field($field)
                ->with([ 'item' => function($query) {
                    $query->field('order_id, item_name, item_image, price, num, item_money, site_id,item_type,goods_id');
                }, 'member' => function($query) {
                    $query->field('member_id, nickname, mobile, headimg');
                }, 'technician_info' => function($query) {
                    $query->field('name,age,id,mobile,working_age,position_id,position_name,order_num,bad_evaluate');
                }, 'pay' => function($query) {
                    $query->field('out_trade_no,type');
                } ])->order($order)->append([ 'order_status_info', 'order_from_name', 'item.item_image_thumb_small', 'item.item_type_name' ])->select()->toArray();

            $date[ $wk ][ 'data' ] = $list;

        }
        return $date;
    }

}

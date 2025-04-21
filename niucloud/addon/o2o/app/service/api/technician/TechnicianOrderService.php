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

namespace addon\o2o\app\service\api\technician;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\dict\order\OrderLogDict;
use addon\o2o\app\dict\order\TechnicianOrderDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\model\Technician;
use addon\o2o\app\service\core\CoreOrderLogService;
use addon\o2o\app\service\core\CoreOrderService;
use app\service\core\notice\NoticeService;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 技师订单服务层
 */
class TechnicianOrderService extends BaseApiService
{

    private $technician_id;
    private $technician_info;

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
        $this->checkTechnician();
    }

    public function checkTechnician()
    {
        $this->technician_info = (new Technician())->field('id,site_id,member_id,name,age,sex,mobile,working_age,status')->where([['member_id','=',$this->member_id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        $this->technician_id = $this->technician_info['id'] ?? 0;
        if(empty($this->technician_id)) throw new CommonException('技师未找到');
    }

    /**
     * 订单开始服务
     * @param array $data
     * @return bool
     */
    public function orderService(array $data)
    {
        $technician_id = $this->technician_id;
        $check_code = $data['check_code'] ?? '';
        if(empty($technician_id)) throw new CommonException('数据错误');
        $order = (new Order())->where([ ['order_id', '=', $data['order_id'] ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if($order->technician_id != $technician_id) throw new CommonException('数据未找到');
        if($check_code != $order->check_code) throw new CommonException('服务码错误');
        if ($order->order_status != OrderDict::WAIT_SERVICE) throw new CommonException('当前订单不可服务');

        Db::startTrans();
        try {
            $order->order_status = OrderDict::IN_SERVICE;
            $order->service_time = time();
            $order->save();
            (new CoreOrderLogService())->addLog($order->site_id, $data['order_id'], OrderLogDict::ORDER_SERVICE,'technician', $technician_id ?? 0, OrderDict::getStatus(OrderDict::IN_SERVICE));

            (new NoticeService())->send($order->site_id, 'o2o_order_service', ['order_id' => $data['order_id'] ]);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage().$e->getFile().$e->getLine());
        }
    }

    /**
     * 订单转单
     * @param array $data
     * @return bool
     */
    public function orderTransfer(array $data)
    {
        (new CoreOrderService())->orderTransfer([
            'order_id' => $data['order_id'],
            'action_way' => 'technician',
            'id' => $this->technician_id,
        ]);
        return true;
    }

    /**
     * 添加服务项目
     */
    public function orderAddItem(array $data)
    {
        (new CoreOrderService())->orderAddItem(array_merge($data,[
            'id' => $this->technician_id,
            'action_way' => 'technician',
        ]));
        return true;
    }

    /**
     * 删除服务项目
     */
    public function orderDelItem(array $data)
    {
        (new CoreOrderService())->orderItemDel(array_merge($data,[
            'id' => $this->technician_id,
            'action_way' => 'technician',
        ]));
        return true;
    }

    /**
     * 编辑服务项目
     */
    public function orderEditItem(array $data)
    {
        (new CoreOrderService())->orderItemEdit(array_merge($data,[
            'id' => $this->technician_id,
            'action_way' => 'technician',
        ]));
        return true;
    }

    /**
     * 订单服务完成
     */
    public function orderServiceFinish(array $data)
    {
        (new CoreOrderService())->orderServiceFinish(array_merge($data,[
            'id' => $this->technician_id,
            'action_way' => 'technician',
        ]));
        return true;
    }


    /**
     * 订单分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'order_id, reserve_service_time,site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['technician_id', '=', $this->technician_id], ['pay_time', '>', 0] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time'], $where)->field($field)
            ->with([ 'item' => function ($query){
                $query->field('order_id, item_name,order_item_id, item_type, is_refund, item_image,price, num, item_money, site_id, out_trade_no,pay_time,is_enable_refund');
            }, 'member' => function($query){
                $query->field('member_id, nickname, mobile, headimg');
            }, 'pay' => function($query){
                $query->field('out_trade_no,type');
            } ])->order($order)->append(['order_status_info', 'order_from_name', 'item.item_image_thumb_small', 'reserve_service_time', 'item.item_type_name']);
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

        $field = 'order_id, member_message,site_id, reserve_service_time,member_id, order_from, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money,taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude,technician_id,service_time,dispatch_time,finish_time';
        $detail = $this->model->where([ ['site_id', '=', $this->site_id], ['order_id', '=', $order_id], ['technician_id', '=', $this->technician_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_id, item_id, item_name,order_item_id, item_type, is_refund, item_image,price, num, item_money, site_id, out_trade_no,pay_time,is_enable_refund,item_images,refund_no,refund_status')->append(['item_image_thumb_small','item_images_thumb_mid', 'item_images_thumb_small','item_type_name']);
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        },'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }])->append(['order_status_info', 'order_from_name'])->findOrEmpty()->toArray();
        return $detail;
    }

    /**
     * 订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return array_map(function ($item) {
            return [ 'name' => $item['name'], 'status' => $item['status'] ];
        }, TechnicianOrderDict::getStatus());
    }

    /**
     * 统计数据
     */
    public function stat()
    {

        $status = $this->getStatus();
        $order_list = $this->model->where([ ['site_id', '=', $this->site_id], ['technician_id', '=', $this->technician_id], ['pay_time', '>', 0],['order_status', '<>', TechnicianOrderDict::CLOSE] ])->field('order_id,order_status')->select()->toArray();
        foreach ($status as $k => $v){
            $status[$k]['num'] = 0;
            foreach($order_list as $key => $val){
                if($val['order_status'] == $v['status']) $status[$k]['num'] += 1;
            }
        }
        $status['all'] = [
            'status' => 'all',
            'name' => '全部',
            'num' => count($order_list)
        ];

        $buy_money = $this->model->where([ ['site_id', '=', $this->site_id], ['technician_id', '=', $this->technician_id], ['pay_time', '>', 0],['order_status', '<>', TechnicianOrderDict::CLOSE] ])->field('order_id,order_status,order_money')->sum('order_money');
        $custom_money = (new OrderItem())->where([ ['site_id', '=', $this->site_id], ['technician_id', '=', $this->technician_id], ['pay_time', '>', 0], ['item_type', '=', 'custom'] ])->sum('item_money');
        return [
            'status' => $status,
            'order' => round($buy_money+$custom_money, 2)
        ];
    }

}

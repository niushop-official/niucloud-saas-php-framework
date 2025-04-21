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

namespace addon\yk_recharge\app\service\api;

use addon\yk_recharge\app\model\RechargeOrder;
use addon\yk_recharge\app\model\RechargeSetting;
use addon\yk_recharge\app\service\core\CoreRechargeOrderService;
use addon\yk_recharge\app\dict\RechargeOrderDict;
use app\service\admin\member\MemberLevelService;
use core\base\BaseApiService;

/**
 * 充值订单服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class RechargeOrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new RechargeOrder();
    }

    /**
     * 会员充值
     * @param $data //['order_from' => 'h5', 'ip' => '127.0.0.1', 'member_message' => '','recharge_money' => 12.00]
     */
    public function recharge(array $data)
    {
        $data[ 'order_from' ] = $this->channel;
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreRechargeOrderService() )->create($data);
    }


    /**
     * 充值订单分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason,add_money,add_jifen';
        $order = 'create_time desc';
        $where[ 'order_type' ] = 'yk_recharge';
        $search_model = $this->model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'order_status', 'create_time' ], $where)->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time,add_money,add_jifen');
        } ])->order($order)->append([ 'order_from_name' ]);
        $list = $this->pageQuery($search_model);
        $order_status = RechargeOrderDict::getStatus();
        //$refund_status = RechargeOrderDict::getRefundStatus();
        foreach ($list[ 'data' ] as $k => $v) {
            $list[ 'data' ][ $k ][ 'order_status_info' ] = $order_status[ $v[ 'order_status' ] ] ?? [];
            // $list['data'][$k]['refund_status_name'] = $refund_status[$v['refund_status']]['name'] ?? '';
        }
        return $list;
    }

    /**
     * 充值订单详情
     * @param int $order_id
     * @return array
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason,add_money,add_jifen';
        $detail = $this->model->where([ [ 'order_type', '=', 'yk_recharge' ], [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ], [ 'order_id', '=', $order_id ] ])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time,add_money,add_jifen');
        } ])->append([ 'order_from_name' ])->findOrEmpty()->toArray();
        if (!empty($detail)) {
            $detail[ 'order_status_info' ] = RechargeOrderDict::getStatus($detail[ 'order_status' ]) ?? [];
        }
        return $detail;
    }

    /**
     * 充值订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return RechargeOrderDict::getStatus();
    }

    public function getSettingList(){
        $field = 'setting_id, site_id, amount, money, jifen,level_id, create_time';
        $order = 'create_time desc';
        $lists = (new RechargeSetting( ))->where([ ['site_id', '=', $this->site_id] ])->field($field)->order($order)->select()->toArray();
        $levels = ( new MemberLevelService() )->getAll();
        $levels = array_column($levels, null, 'level_id');
        foreach ($lists as $k => $v){
            $lists[$k]['level_name'] = !empty($v['level_id']) && !empty($levels[$v['level_id']])?$levels[$v['level_id']]['level_name']:'--';
        }
        return $lists;
    }
}

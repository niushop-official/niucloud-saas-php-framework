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

namespace addon\recharge\app\service\api;

use addon\recharge\app\dict\RechargePackageDict;
use addon\recharge\app\model\Recharge;
use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\service\core\CoreRechargeConfigService;
use addon\recharge\app\service\core\CoreRechargeOrderService;
use addon\recharge\app\dict\RechargeOrderDict;
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
     * 获取充值套餐榜配置
     * @return array
     */
    public function getRechargeConfig()
    {
        return ( new CoreRechargeConfigService() )->getRechargeConfig($this->site_id);
    }

    /**
     * 获取充值套餐列表
     * @return array
     */
    public function getRechargeLists()
    {
        $field = 'recharge_id,recharge_name,face_value,buy_price,point,growth,gift_json';
        $order = 'sort desc,create_time desc';
        $list = ( new Recharge() )
            ->where([ [ 'site_id', '=', $this->site_id ], [ 'status', '=', RechargePackageDict::ON ] ])
            ->field($field)
            ->order($order)
            ->select()
            ->toArray();
        if (!empty($list)) {
            foreach ($list as &$value) {
                $value[ 'gift_content' ] = [];
                if (!empty($value[ 'gift_json' ])) {
                    foreach ($value[ 'gift_json' ] as $k => $v) {
                        $v[ 'key' ] = $k;
                        $content = event('RechargeGiftContent', $v)[ 0 ];
                        if (!empty($content)) {
                            $value[ 'gift_content' ][] = $content;
                        }
                    }
                }
            }
        }
        return $list;
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
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $order = 'create_time desc';
        $where[ 'order_type' ] = 'recharge';
        $search_model = $this->model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'order_status', 'create_time' ], $where)->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time');
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
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $detail = $this->model->where([ [ 'order_type', '=', 'recharge' ], [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ], [ 'order_id', '=', $order_id ] ])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time');
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
}

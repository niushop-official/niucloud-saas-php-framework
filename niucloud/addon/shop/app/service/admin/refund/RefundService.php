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

namespace addon\shop\app\service\admin\refund;

use addon\shop\app\dict\delivery\DeliveryDict;
use addon\shop\app\model\delivery\Store;
use addon\shop\app\model\order\OrderRefund;
use addon\shop\app\service\core\marketing\CoreManjianService;
use core\base\BaseAdminService;

/**
 *  订单服务层
 */
class RefundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderRefund();
    }

    /**
     * 分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'refund_id, order_id, order_goods_id, order_refund_no, refund_type, reason, member_id, apply_money, money, status, create_time, transfer_time, remark, voucher, source, timeout, refund_no, delivery, shop_reason, refund_address';
        $order = 'create_time desc';

        $search_model = $this->model
            ->where([ [ 'site_id', '=', $this->site_id ] ])
            ->withSearch([ 'order_refund_no', 'status', 'create_time' ], $where)
            ->field($field)
            ->with(
                [
                    'order_goods' => function($query) {
                        $query->field('order_goods_id, order_id, site_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money,discount_money, is_enable_refund, goods_type')->append([ 'goods_image_thumb_small' ]);
                    },
                    'member' => function($query) {
                        $query->field('member_id, nickname');
                    }
                ])->order($order)->append([ 'status_name', 'refund_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 详情
     * @param int $refund_id
     * @return array
     */
    public function getDetail(int $refund_id)
    {
        $field = 'site_id, refund_id, order_id, order_goods_id, order_refund_no, refund_type, reason, member_id, apply_money, money, status, create_time, transfer_time, remark, voucher, source, timeout, refund_no, delivery, shop_reason, refund_address';
        $info = $this->model->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $this->site_id ] ])->field($field)
            ->with(
                [
                    'order_main' => function($query) {
                        $query->field('order_id,order_no,order_type,order_from,out_trade_no,status,member_id,ip,goods_money,delivery_money,order_money,invoice_id,create_time,pay_time,delivery_time,take_time,finish_time,close_time,delivery_type,taker_name,taker_mobile,taker_province,taker_city,taker_district,taker_address,taker_full_address,taker_longitude,taker_latitude,take_store_id,is_enable_refund,member_remark,shop_remark,close_remark,discount_money,point')
                            ->append([ 'order_from_name', 'order_type_name', 'status_name', 'delivery_type_name' ]);
                    },
                    'order_goods' => function($query) {
                        $query->field('order_goods_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, is_enable_refund, goods_type');
                    },
                    'member' => function($query) {
                        $query->field('member_id, nickname, mobile, headimg, balance');
                    },
                    'pay_refund' => function($query) {
                        $query->field('refund_no, type, money, create_time, refund_time')->append([ 'type_name' ]);
                    },
                    'refund_log' => function($query) {
                        $query->field('order_refund_no, content, main_type, create_time ,main_id, type')->order("create_time desc, id desc")->append([ 'main_name', 'type_name', 'main_type_name' ]);
                    }
                ])->append([ 'status_name', 'refund_type_name' ])->findOrEmpty()->toArray();

        if (!empty($info)) {

            if ($info[ 'order_main' ][ 'delivery_type' ] == DeliveryDict::STORE) {
                $info[ 'store' ] = ( new Store() )->where([ [ 'store_id', '=', $info[ 'order_main' ][ 'take_store_id' ] ] ])
                    ->field('store_id, store_name, full_address, store_mobile, trade_time')
                    ->findOrEmpty()->toArray();
            }

            $refund_gift_list = (new CoreManjianService())->refundCheck($info);
            if (!empty($refund_gift_list)) {
                $gift_balance = 0;
                foreach ($refund_gift_list as $value) {
                    if (isset($value[ 'balance' ]) && $value[ 'balance' ] > 0) {
                        $gift_balance = bcadd($gift_balance, $value[ 'balance' ], 2);
                    }
                }
                if ($gift_balance > 0) {
                    $info[ 'gift_balance' ] = $gift_balance;
                }
            }

        }
        return $info;
    }

}

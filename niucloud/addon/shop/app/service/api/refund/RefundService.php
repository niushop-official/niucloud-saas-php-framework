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

namespace addon\shop\app\service\api\refund;

use addon\shop\app\model\order\OrderRefund;
use core\base\BaseApiService;

/**
 *  订单服务层
 */
class RefundService extends BaseApiService
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
            ->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])
            ->withSearch([ 'status' ], $where)
            ->field($field)
            ->with(
                [
                    'order_goods' => function($query) {
                        $query->field('order_goods_id, site_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money,discount_money, is_enable_refund, goods_type, order_goods_money, discount_money')->append([ 'goods_image_thumb_small' ]);
                    },
                ])->order($order)->append([ 'status_name', 'refund_type_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 详情
     * @param string $order_refund_no
     * @return array
     */
    public function getDetail(string $order_refund_no)
    {
        $field = 'refund_id, order_id, order_goods_id, order_refund_no, refund_type, reason, member_id, apply_money, money, status, create_time, transfer_time, remark, voucher, source, timeout, refund_no, delivery, shop_reason, refund_address';
        $info = $this->model->where([ [ 'order_refund_no', '=', $order_refund_no ], [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])->field($field)
            ->with([
                'order_goods' => function($query) {
                    $query->field('extend,order_goods_id, site_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, discount_money, is_enable_refund, status, order_refund_no, delivery_status, verify_count, verify_expire_time, is_verify, goods_type')->append([ 'goods_image_thumb_small' ]);
                },
                'refund_log' => function($query) {
                    $query->field('order_refund_no, content, main_type, create_time ,main_id,type')->order("create_time desc, id desc")->append([ 'main_name', 'main_type_name', 'type_name' ]);
                }
            ])->append([ 'status_name', 'refund_type_name' ])->findOrEmpty()->toArray();

        return $info;
    }
}

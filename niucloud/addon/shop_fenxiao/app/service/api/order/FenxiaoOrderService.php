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

namespace addon\shop_fenxiao\app\service\api\order;

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoSettlementDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrderGoods;
use core\base\BaseApiService;


/**
 * 分销订单服务层
 */
class FenxiaoOrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoOrderGoods();
    }

    /**
     * 获取分销订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,order_id,order_no,order_goods_id,order_goods_money,calculate_type,commission_type,commission_level,commission_rate,fenxiao_member_id,commission,is_refund,create_time,is_settlement,order_original_goods_money,agent_discount,team_flat_rate';
        $order = 'id desc';
        $search_model = $this->model
            ->where([
                ['site_id', '=', $this->site_id],
                ['commission_type', '=', FenxiaoSettlementDict::FENXIAO],
                ['fenxiao_member_id', '=', $this->member_id],
                ['commission', '>', 0]
            ])
            ->withSearch(['is_settlement'], $where)
            ->field($field)
            ->with([
                'shop_order' => function ($query) {
                    $query->field('order_id,order_no,order_type,order_from,out_trade_no,status,member_id,ip,goods_money,delivery_money,order_money,create_time,pay_time,delivery_type,taker_name,taker_mobile,taker_full_address,take_store_id,is_enable_refund,member_remark,shop_remark,close_remark,pay_money')
                        ->with([
                            'member' => function ($query) {
                                $query->field('member_id, nickname, mobile, headimg');
                            }
                        ]);
                },
                'order_goods' => function ($query) {
                    $query->field('order_goods_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, is_enable_refund, goods_type, delivery_status, status, site_id')->append(['goods_image_thumb_mid', 'status_name']);
                }
            ])
            ->order($order)->append(['calculate_type_name']);
        return $this->pageQuery($search_model);

    }

    /**
     * 团队分红统计
     */
    public function stat()
    {
        $fenxiao_info = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id]])->field("fenxiao_commission")->findOrEmpty()->toArray();
        $unsettlement_commission = $this->model->where([['fenxiao_member_id', '=', $this->member_id], ['is_refund', '=', 0], ['is_settlement', '=', 0], ['commission_type', '=', 'fenxiao']])->sum("commission");
        return [
            'fenxiao_commission' => format_float_money($fenxiao_info['fenxiao_commission']) ?? 0.00,
            'unsettlement' => format_float_money($unsettlement_commission) ?? 0.00
        ];
    }

}

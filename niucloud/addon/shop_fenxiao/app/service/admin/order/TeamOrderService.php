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

namespace addon\shop_fenxiao\app\service\admin\order;

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoSettlementDict;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrder;
use core\base\BaseAdminService;


/**
 * 分销订单服务层
 */
class TeamOrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new FenxiaoOrder();
    }

    /**
     * 获取分销订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,order_id,order_no,site_id,commission,commission_team,team_members,create_time';
        $order = 'create_time desc';

        $search_model = $this->model
            ->where([
                ['site_id', '=', $this->site_id],
                ['commission_team', '>', 0]
            ])
            ->withSearch(['is_settlement', 'create_time'], $where)
            ->field($field)
            ->with([
                'shop_order' => function ($query) {
                    $query->field('order_id,order_no,order_type,order_from,out_trade_no,status,member_id,ip,goods_money,delivery_money,order_money,create_time,pay_time,delivery_type,taker_name,taker_mobile,taker_full_address,take_store_id,is_enable_refund,member_remark,shop_remark,close_remark,pay_money')
                        ->with([
                            'order_goods' => function ($query) {
                                $query->field('order_goods_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, is_enable_refund, goods_type, delivery_status, status, site_id')->append(['goods_image_thumb_mid', 'status_name']);
                            },
                            'member' => function ($query) {
                                $query->field('member_id, nickname, mobile, headimg');
                            }
                        ]);
                },
                'fenxiao_order_goods' => function ($query) {
                    $query->field('*')->with(
                        [
                            'member' => function ($query) {
                                $query->field('member_id, nickname, mobile, headimg');
                            }
                        ]
                    )->where([['commission_type', '=', FenxiaoSettlementDict::TEAM]]);
                },

            ])->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as &$item) {
            if (!empty($item['fenxiao_order_goods'])) {
                foreach ($item['shop_order']['order_goods'] as &$order_goods_v) {
                    foreach ($item['fenxiao_order_goods'] as $fenxiao_order_goods_v) {
                        if ($fenxiao_order_goods_v['order_goods_id'] == $order_goods_v['order_goods_id']) {
                            $order_goods_v['fenxiao_order_goods'][] = $fenxiao_order_goods_v;
                        }
                    }
                }
            }
        }
        return $list;
    }

}

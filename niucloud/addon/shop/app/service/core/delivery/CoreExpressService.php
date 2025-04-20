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

namespace addon\shop\app\service\core\delivery;

use addon\shop\app\dict\delivery\ShippingTemplateDict;
use addon\shop\app\dict\goods\GoodsDict;
use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\model\delivery\ShippingTemplateItem;
use core\base\BaseCoreService;

/**
 * 快递配送服务层
 * Class CoreExpressService
 * @package addon\shop\app\service\admin\delivery
 */
class CoreExpressService extends BaseCoreService
{
    /**
     * 配送费用计算
     * @param $order
     * @return void
     */
    public static function calculate(&$order) {
        $delivery_money = 0;
        $address =  $order->delivery['take_address'] ?? [];

        if (empty($address)) {
            $order->error[] = get_lang('NOT_SELECT_ADDRESS');
            return;
        }

        $template_goods_data = [];
        foreach ($order->goods_data as $k => &$v) {
            $goods_type = $v['goods']['goods_type'];
            if ($goods_type == GoodsDict::REAL) {
                if (in_array(OrderDeliveryDict::EXPRESS, $v['goods']['delivery_type'])) {
                    if ($v['goods']['is_free_shipping'] == 0) {
                        if ($v['goods']['fee_type'] == 'template') {
                            $delivery_template_id = $v['goods']['delivery_template_id'];
                            $template_goods_data[$delivery_template_id][] = $v;
                        } else {
                            $v['delivery_money'] = $v['goods']['delivery_money'] * $v['num'];
                        }
                        $delivery_money += $v['delivery_money'] ?? 0;
                    }
                } else {
                    $v['not_support_delivery'] = 1;
                    $order->error[] = get_lang('NOT_SUPPORT_DELIVERY_TYPE');
                }
            }
        }

        //运费模板运费计算
        if (!empty($template_goods_data)) {
            (new self())->feeCalculate($order, $template_goods_data, $delivery_money, $order->goods_data);
        }

        // 判断会员等级是否有包邮的权益
        if (isset($order->buyer['member_level']['level_benefits']) && isset($order->buyer['member_level']['level_benefits']['shop_free_shipping'])) {
            if ($order->buyer['member_level']['level_benefits']['shop_free_shipping']['is_use']) {
                $order->basic['delivery_money'] = 0;
                return;
            }
        }

        $order->basic['delivery_money'] = $delivery_money;
    }

    /**
     * 运费模板运费计算
     * @param $order
     * @param $template_goods_data
     * @param $delivery_money
     * @param $goods_data
     * @return true|void
     */
    private function feeCalculate(&$order, $template_goods_data, &$delivery_money, &$goods_data) {
        foreach ($template_goods_data as $delivery_template_id => $goods_list) {
            $address = $order->delivery['take_address'] ?? [];

            $field = 'snum,sprice,xnum,xprice,fee_type,fee_area_ids,no_delivery,no_delivery_area_ids,is_free_shipping,free_shipping_area_ids,free_shipping_price,free_shipping_num';
            $template = (new ShippingTemplateItem())->where([['template_id', '=', $delivery_template_id], ['city_id', '=', $address['city_id']]])->field($field)->findOrEmpty()->toArray();
            $nationwide = (new ShippingTemplateItem())->where([['template_id', '=', $delivery_template_id], ['city_id', '=', 0]])->field($field)->findOrEmpty()->toArray();
            if (empty($template)) {
                $template = $nationwide;
                if (empty($nationwide)) {
                    $order->error[] = get_lang('SHOP_THE_AVAILABLE_SHIPPING_RATES_AREN_T_CONFIGURED');
                    return true;
                }
            } else {
                if (empty($template['snum'])) $template['snum'] = $nationwide['snum'];
                if (empty($template['sprice'])) $template['sprice'] = $nationwide['sprice'];
                if (empty($template['xnum'])) $template['xnum'] = $nationwide['xnum'];
                if (empty($template['xprice'])) $template['xprice'] = $nationwide['xprice'];
            }

            //按运费模板计算总量和总金额
            $total = 0;
            $total_goods_money = 0;
            foreach ($goods_list as $goods) {
                $this->totalCalculate($template, $goods, $total, $total_goods_money);
            }

            foreach ($goods_list as $goods) {
                // 判断收货地址是否不配送
                if ($template['no_delivery'] && !empty($template['no_delivery_area_ids'])) {
                    $goods_data[$goods['sku_id']]['not_support_delivery'] = 1;
                    $order->error[] = get_lang('NOT_SUPPORT_DELIVERY_ADDRESS');
                    return true;
                }
                // 判断收货地址是否包邮
                if ($template['is_free_shipping'] && !empty($template['free_shipping_area_ids']) && ($total >= $template['free_shipping_num'] || $total_goods_money >= $template['free_shipping_price'])) {
                    $goods_data[$goods['sku_id']]['is_free_shipping'] = 1;
                    return true;
                }
            }
            // 计算费用
            $item_delivery_money = $template['sprice'];
            if ($total > $template['snum']) {
                $item_delivery_money += round(ceil(($total - $template['snum']) / $template['xnum']) * $template['xprice'], 2);
            }
            $delivery_money += $item_delivery_money;
        }
    }

    /**
     * 按运费模板计算总量和总金额
     * @param $template
     * @param $goods
     * @param $total
     * @param $total_goods_money
     * @return void
     */
    private function totalCalculate($template, $goods, &$total, &$total_goods_money) {
        $total_goods_money += $goods['goods_money'];
        switch ($template['fee_type']) {
            case ShippingTemplateDict::NUM:
                $total += $goods['num'];
                break;
            case ShippingTemplateDict::VOLUME:
                $total += $goods['volume'] * $goods['num'];
                break;
            case ShippingTemplateDict::WEIGHT:
                $total += $goods['weight'] * $goods['num'];
                break;
        }
    }

}

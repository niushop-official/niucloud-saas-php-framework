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

namespace addon\shop\app\listener\order_export;

use addon\shop\app\dict\order\InvoiceDict;
use addon\shop\app\model\order\Invoice;

/**
 * 发票导出数据源查询
 * Class ShopInvoiceExportDataListener
 * @package addon\shop\app\listener\order_export
 */
class ShopInvoiceExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'shop_invoice') {
            $model = new Invoice();
            $order = 'id desc';
            //查询导出订单数据
            $search_model = $model->withSearch(["header_name", "create_time", "invoice_time"], $param['where'])
                ->with([
                    'member' => function ($query) {
                        $query->field('member_id, nickname');
                    },
                    'shop_order' => function ($query) {
                        $query->field('order_id, order_no, order_money');
                    }
                ])
                ->where([['site_id', '=', $param['site_id']], ['status', '=', InvoiceDict::OPEN]])->append(['header_type_name', 'type_name', 'is_invoice_name'])->field('*')->order($order);
            if ($param['page']['page'] > 0 && $param['page']['limit'] > 0) {
                $data = $search_model->page($param['page']['page'], $param['page']['limit'])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }
            foreach ($data as $key => $val) {
                $data[$key]['order_no'] = !empty($val['shop_order']) ? $val['shop_order']['order_no']."\t" : '';
                $data[$key]['order_money'] = !empty($val['shop_order']) ? $val['shop_order']['order_money'] : '';
                $data[$key]['nickname'] = !empty($val['member']) ? $val['member']['nickname'] : '';
                $data[$key]['header_name'] = $val['header_name']."\t";
                $data[$key]['tax_number'] = $val['tax_number']."\t";
                $data[$key]['bank_card_number'] = $val['bank_card_number']."\t";
                $data[$key]['invoice_number'] = $val['invoice_number']."\t";
                $data[$key]['create_time'] = !empty($val['create_time']) ? $val['create_time'] : '';
                $data[$key]['invoice_time'] = !empty($val['invoice_time']) ? $val['invoice_time'] : '';
            }
        }
        return $data;
    }
}
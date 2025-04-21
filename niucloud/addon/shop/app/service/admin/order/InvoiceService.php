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

namespace addon\shop\app\service\admin\order;

use addon\shop\app\dict\order\InvoiceDict;
use addon\shop\app\model\order\Invoice;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 发票
 * Class InvoiceService
 * @package app\service\admin
 */
class InvoiceService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Invoice();
    }

    public function getPage(array $where)
    {
        $order = 'id desc';
        $search_model = $this->model->withSearch([ "is_invoice", "header_type", "header_name", "create_time", "invoice_time" ], $where)->where([ ['site_id', '=', $this->site_id],[ 'status', '=', InvoiceDict::OPEN ] ])->append([ 'header_type_name', 'type_name' ])->field('*')->order($order);
        return $this->pageQuery($search_model);
    }

    public function getInfo(int $id)
    {
        $detail = $this->model->where([ [ 'id', '=', $id ], ['site_id', '=', $this->site_id], [ 'status', '=', InvoiceDict::OPEN  ] ])->field('*')->append([ 'header_type_name', 'type_name' ])->findOrEmpty()->toArray();
        return $detail;
    }

    /**
     * 开票
     * @param int $id
     * @param array $data
     * @return true
     */
    public function invoicing(int $id, array $data)
    {
        $invoice = $this->model->where([ [ 'id', '=', $id ], ['site_id', '=', $this->site_id], [ 'status', '=', 2 ] ])->findOrEmpty();
        if ($invoice->isEmpty()) throw new CommonException('INVOICE_NOT_EXIST');
        if ($invoice[ 'is_invoice' ]) throw new CommonException('INVOICED');

        $invoice->is_invoice = 1;
        $invoice->invoice_number = $data[ 'invoice_number' ];
        $invoice->invoice_voucher = $data[ 'invoice_voucher' ];
        $invoice->remark = $data[ 'remark' ];
        $invoice->invoice_time = time();

        $invoice->save();

        return true;
    }

}

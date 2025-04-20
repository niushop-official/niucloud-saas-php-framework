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

namespace addon\shop\app\service\core\order;

use addon\shop\app\dict\order\InvoiceDict;
use addon\shop\app\model\order\Invoice;
use core\base\BaseCoreService;

/**
 * 发票服务层(todo  是否兼容)
 */
class CoreInvoiceService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Invoice();
    }

    /**
     * 创建关联订单的发票
     * @param array $data
     * @return array
     */
    public function add($data)
    {
        $invoice = $this->model->create($data);
        return $invoice->id;
    }

    /**
     * 发票启用
     * @param $id
     * @return void
     */
    public function open($id)
    {
        $this->model->where(
            [
                ['id', '=', $id]
            ]
        )->update([
            'status' => InvoiceDict::OPEN
        ]);
        return true;
    }

    /**
     * 发票关闭
     * @param $id
     * @return true
     */
    public function close($id)
    {
        $this->model->where(
            [
                ['id', '=', $id]
            ]
        )->update([
            'status' => InvoiceDict::WAIT_OPEN
        ]);
        return true;
    }

}

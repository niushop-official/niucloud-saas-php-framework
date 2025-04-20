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

use app\model\diy_form\DiyForm;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 订单设置服务层
 * Class CoreOrderConfigService
 * @package addon\shop\app\service\core\order
 */
class CoreOrderConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置交易配置
     * @param array $params
     * @return array
     */
    public function setConfig($params)
    {
        $site_id = $params[ 'site_id' ];

        $value[ 'order_close' ] = [
            'is_close' => $params[ 'is_close' ],
            'close_length' => $params[ 'close_length' ]
        ];
        $value[ 'order_finish' ] = [
            'is_finish' => $params[ 'is_finish' ],
            'finish_length' => $params[ 'finish_length' ]
        ];
        $value[ 'order_refund' ] = [
            'no_allow_refund' => $params[ 'no_allow_refund' ],
            'refund_length' => $params[ 'refund_length' ]
        ];
        $value[ 'evaluate' ] = [
            'is_evaluate' => $params[ 'is_evaluate' ],
            'evaluate_is_to_examine' => $params[ 'evaluate_is_to_examine' ],
            'evaluate_is_show' => $params[ 'evaluate_is_show' ]
        ];
        $value[ 'form_id' ] = $params[ 'form_id' ];

        $this->core_config_service->setConfig($site_id, 'SHOP_ORDER_CONFIG', $value);

        $invoice = 'SHOP_INVOICE';
        $invoiceInfo = [
            'is_invoice' => $params[ 'is_invoice' ],
            'invoice_type' => $params[ 'invoice_type' ],
            'invoice_content' => $params[ 'invoice_content' ]
        ];
        $this->core_config_service->setConfig($site_id, $invoice, $invoiceInfo);

        $evaluate = 'SHOP_GOODS_EVALUATE';
        $evaluateInfo = [
            'is_evaluate' => $params[ 'is_evaluate' ],
            'evaluate_is_to_examine' => $params[ 'evaluate_is_to_examine' ],
            'evaluate_is_show' => $params[ 'evaluate_is_show' ]
        ];
        $this->core_config_service->setConfig($site_id, $evaluate, $evaluateInfo);

        return true;
    }

    /**
     * 自动取消订单
     */
    public function orderClose(int $site_id)
    {
        $data = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_ORDER_CONFIG');
        if (empty($data)) {
            $closeOrderInfo = [
                'is_close' => true,
                'close_length' => 120
            ];
        } else {
            $closeOrderInfo = [
                'is_close' => $data[ 'order_close' ][ 'is_close' ],
                'close_length' => $data[ 'order_close' ][ 'close_length' ]
            ];
        }
        return $closeOrderInfo;
    }

    /**
     * 获取交易配置
     * @param int $site_id
     * @return array
     */
    public function getConfig(int $site_id)
    {
        $data = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_ORDER_CONFIG');
        if (empty($data)) {
            $data[ 'close_order_info' ] = [
                'is_close' => true,
                'close_length' => 120
            ];
            $data[ 'confirm' ] = [
                'is_finish' => true,
                'finish_length' => 14
            ];
            $data[ 'refund' ] = [
                'no_allow_refund' => 1,
                'refund_length' => 7
            ];
            $data[ 'form_id' ] = '';
        } else {
            $data[ 'close_order_info' ] = [
                'is_close' => $data[ 'order_close' ][ 'is_close' ],
                'close_length' => $data[ 'order_close' ][ 'close_length' ]
            ];
            $data[ 'confirm' ] = [
                'is_finish' => $data[ 'order_finish' ][ 'is_finish' ],
                'finish_length' => $data[ 'order_finish' ][ 'finish_length' ],
            ];
            $data[ 'refund' ] = [
                'no_allow_refund' => $data[ 'order_refund' ][ 'no_allow_refund' ],
                'refund_length' => $data[ 'order_refund' ][ 'refund_length' ],
            ];
            $data[ 'form_id' ] = $data[ 'form_id' ] ?? '';

            if(!empty($data[ 'form_id' ])) {
                $diy_form_model = new DiyForm();
                $diy_form_count = $diy_form_model->where([
                    [ 'site_id', '=', $site_id ],
                    [ 'form_id', '=', $data[ 'form_id' ] ]
                ])->count();
                if ($diy_form_count == 0) {
                    $data[ 'form_id' ] = '';
                }
            }
        }

        //发票
        $data[ 'invoice' ] = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_INVOICE');
        if (empty($data[ 'invoice' ])) {
            $data[ 'invoice' ] = [
                'is_invoice' => '2',
                'invoice_type' => [],
                'invoice_content' => []
            ];
        }
        //评价
        $data[ 'evaluate' ] = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_GOODS_EVALUATE');
        if (empty($data[ 'evaluate' ])) {
            $data[ 'evaluate' ] = [
                'is_evaluate' => 1,
                'evaluate_is_to_examine' => 1,
                'evaluate_is_show' => 1
            ];
        }
        return $data;
    }

    /**
     * 订单确认收货
     */
    public function orderConfirm(int $site_id)
    {
        $data = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_ORDER_CONFIG');
        if (empty($data)) {
            $confirmOrderInfo = [
                'is_finish' => true,
                'finish_length' => 14
            ];
        } else {
            $confirmOrderInfo = [
                'is_finish' => $data[ 'order_finish' ][ 'is_finish' ],
                'finish_length' => $data[ 'order_finish' ][ 'finish_length' ]
            ];
        }
        return $confirmOrderInfo;
    }

    /**
     * 售后
     */
    public function orderRefund(int $site_id)
    {
        $data = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_ORDER_CONFIG');
        if (empty($data)) {
            $refundOrderInfo = [
                'no_allow_refund' => 1,
                'refund_length' => 7
            ];
        } else {
            $refundOrderInfo = [
                'no_allow_refund' => $data[ 'order_refund' ][ 'no_allow_refund' ],
                'refund_length' => $data[ 'order_refund' ][ 'refund_length' ]
            ];
        }
        return $refundOrderInfo;
    }

    /**
     * 发票信息
     */
    public function invoice(int $site_id)
    {
        $data = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_INVOICE');
        if (empty($data)) {
            $invoiceInfo = [
                'is_invoice' => '',
                'invoice_type' => [],
                'invoice_content' => []
            ];
        } else {
            $invoiceInfo = [
                'is_invoice' => $data[ 'is_invoice' ],
                'invoice_type' => $data[ 'invoice_type' ],
                'invoice_content' => $data[ 'invoice_content' ]
            ];
        }
        return $invoiceInfo;
    }

    /**
     * 获取评价设置
     * @return array|int[]|mixed
     */
    public function getEvaluateConfig(int $site_id)
    {
        $config = ( new CoreConfigService() )->getConfigValue($site_id, 'SHOP_GOODS_EVALUATE');
        if (empty($config)) {
            $config = [
                'is_evaluate' => 1,
                'evaluate_is_to_examine' => 1,
                'evaluate_is_show' => 1
            ];
        }
        return $config;
    }
}


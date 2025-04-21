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

namespace addon\shop\app\service\api;

use addon\shop\app\service\core\order\CoreOrderConfigService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseApiService;

/**
 *  订单服务层
 */
class ConfigService extends BaseApiService
{
    /**
     * 查询发票配置
     * @return array|mixed
     */
    public function getInvoiceConfig() {
        $config = (new CoreConfigService())->getConfigValue($this->site_id, 'SHOP_INVOICE');
        if (empty($config)) {
            $config = [
                'is_invoice' => '2',
                'invoice_type' => [],
                'invoice_content' => []
            ];
        }
        return $config;
    }

    /**
     * 获取评价设置
     * @return array|int[]|mixed
     */
    public function getEvaluateConfig()
    {
        return (new CoreOrderConfigService())->getEvaluateConfig($this->site_id);
    }
}

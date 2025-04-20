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
namespace addon\shop\app\service\core\delivery\delivery_search;

use addon\shop\app\service\core\delivery\delivery_search\sdk\Kdbird;


class KdniaoDeliverySearch extends BaseDeliverySearch
{

    protected $logistic_config;

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->logistic_config = $config;
    }

    /**
     * 物流跟踪查询
     * @param array $data
     * @return array
     */
    public function search(array $data = [])
    {
        $kdniao_sdk = ( new Kdbird($this->logistic_config) );

        $data = $kdniao_sdk->orderTracesSubByJson($data[ 'express_no' ], $data[ 'logistic_no' ], $data[ 'mobile' ]);
        return $data;
    }
}
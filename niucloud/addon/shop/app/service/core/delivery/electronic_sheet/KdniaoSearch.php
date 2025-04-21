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
namespace addon\shop\app\service\core\delivery\electronic_sheet;


use addon\shop\app\service\core\delivery\electronic_sheet\sdk\Kdbird;

class KdniaoSearch extends BaseElectronicSheetSearch
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
     * 电子面单
     * @param array $data
     * @return array
     */
    public function electronicSheet(array $data = [])
    {
        $kdniao_sdk = ( new Kdbird($this->logistic_config) );
        $data = $kdniao_sdk->electronicSheetByJson($data);
        return $data;
    }
}
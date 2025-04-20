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
namespace core\sms;

use addon\shop\app\service\core\delivery\delivery_search\BaseDeliverySearch;


class Kd100DeliverySearch extends BaseDeliverySearch
{

    protected $app_key = '';
    protected $secret_key = '';
    protected $sign = '';

    /**
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {
        parent::initialize($config);
        $this->app_key = $config[ 'app_key' ] ?? '';
        $this->secret_key = $config[ 'secret_key' ] ?? '';
        $this->sign = $config[ 'sign' ] ?? '';
    }


    /**
     * @param array $data
     * @return mixed|void
     */
    public function search(array $data = [])
    {
        //查询数据
    }
}
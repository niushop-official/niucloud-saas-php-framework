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

use core\loader\Loader;

/**
 * @see DeliverySearchLoader
 * @package think\facade
 * @mixin BaseDeliverySearch
 * @method  string|null search(array $data) 物流跟踪查询
 */
class DeliverySearchLoader extends Loader
{

    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\addon\\shop\\app\\service\\core\\delivery\\delivery_search\\';

    protected $config_name = 'delivery_search';

    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return 'kdbird';
    }
}
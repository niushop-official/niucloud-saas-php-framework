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

namespace core\printer;

use core\loader\Loader;

/**
 * Class PrinterLoader
 * @package core\printer
 */
class PrinterLoader extends Loader
{

    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\core\\printer\\';

    protected $config_name = 'printer';

    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return 'kdbird';
    }
}
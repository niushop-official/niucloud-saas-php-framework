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

namespace core\printer;

use core\loader\Storage;

/**
 * Class BasePrinter
 * @package core\printer
 */
abstract class BasePrinter extends Storage
{
    /**
     * 初始化
     * @param array $config
     * @return void
     */
    protected function initialize(array $config = [])
    {

    }

    /**
     * 打印小票
     * @param array $data
     * @return mixed
     */
    abstract protected function printTicket(array $data);

}

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

use core\loader\Loader;

/**
 * Class ElectronicSheetSearchLoader
 * @package addon\shop\app\service\core\delivery\electronic_sheet
 */
class ElectronicSheetSearchLoader extends Loader
{

    /**
     * 空间名
     * @var string
     */
    protected $namespace = '\\addon\\shop\\app\\service\\core\\delivery\\electronic_sheet\\';

    protected $config_name = 'electronic_sheet';

    /**
     * 默认驱动
     * @return mixed
     */
    protected function getDefault()
    {
        return 'kdbird';
    }
}
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

use core\loader\Storage;

/**
 * Class BaseElectronicSheetSearch
 * @package addon\shop\app\service\core\delivery\electronic_sheet
 */
abstract class BaseElectronicSheetSearch extends Storage
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
     * 电子面单
     * @param array $data
     * @return mixed
     */
    abstract public function electronicSheet(array $data);
}

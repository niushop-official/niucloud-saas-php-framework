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

namespace addon\shop_fenxiao\app\service\core\stat;

use addon\shop_fenxiao\app\model\stat\Stat;
use core\base\BaseCoreService;


/**
 * 统计
 */
class CoreMemberStatService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Stat();
    }

}

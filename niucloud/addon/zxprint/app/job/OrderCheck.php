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
namespace addon\zxprint\app\job;

use addon\zxprint\app\service\admin\zx_printlog\ZxPrintlogService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 检测商城订单列为打印列表内
 * @param $data
 * @return true
 */
class OrderCheck extends BaseJob
{
    /**
     * 检测
     * @return true
     */
    public function doJob()
    {
        try {
            (new ZxPrintlogService())->add();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}

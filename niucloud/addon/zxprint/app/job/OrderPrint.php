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

use addon\zxprint\app\service\YiLianYun;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 检测当天未打印的订单进行打印
 * @param $data
 * @return true
 */
class OrderPrint extends BaseJob
{
    /**
     * 检测
     * @return true
     */
    public function doJob()
    {
        try {
            (new YiLianYun())->action_print();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}

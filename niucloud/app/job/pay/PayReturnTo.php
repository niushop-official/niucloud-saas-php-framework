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

namespace app\job\pay;

use app\service\core\pay\CorePayService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 队列异步调用支付定时未支付恢复
 */
class PayReturnTo extends BaseJob
{

    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob($site_id, $out_trade_no)
    {

        Log::write('pay_log_' . $site_id.'_'.$out_trade_no);
        $res = (new CorePayService())->returnTo($site_id, $out_trade_no);
        return true;
    }

}

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
namespace addon\recharge\app\job;

use addon\recharge\app\dict\RechargeOrderDict;
use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\service\core\CoreRechargeOrderService;
use core\base\BaseJob;

/**
 * 订单自动关闭
 */
class OrderClose extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $list = ( new RechargeOrder() )->where([
                [ 'order_status', '=', RechargeOrderDict::WAIT_PAY ],
                [ 'timeout', '<=', time() ],
                [ 'timeout', '>', 0 ]
            ])->select();

            if (!$list->isEmpty()) {
                foreach ($list as $v) {
                    ( new CoreRechargeOrderService() )->close($v[ 'order_id' ]);
                }
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}

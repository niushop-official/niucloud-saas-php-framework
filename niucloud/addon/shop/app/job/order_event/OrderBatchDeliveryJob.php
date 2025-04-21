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
namespace addon\shop\app\job\order_event;

use addon\shop\app\service\core\order\CoreOrderBatchDeliveryService;
use core\base\BaseJob;

/**
 * 订单关闭后事件
 */
class OrderBatchDeliveryJob extends BaseJob
{

    public function doJob($data)
    {
        try {
            //查询当前未执行的任务
            $id = $data[ 'id' ];
            $site_id = $data[ 'site_id' ];
            $type = $data[ 'type' ];
            ( new CoreOrderBatchDeliveryService() )->execute($id, $site_id);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}

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
namespace addon\huodong\app\job;

use core\base\BaseJob;
use think\facade\Log;
use think\facade\Db;
use addon\huodong\app\model\act\Act;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\dict\order\OrderDict;


class HuodongNotice extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        Log::write('活动报名通知计划任务执行' . date('Y-m-d h:i:s'));


        try {

            $this->auto_job();

            return true;
        } catch (\Exception $e) {

            Log::write('活动报名通知计划任务失败: ' . json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE));

            return false;
        }
    }

    public function auto_job()
    {

      /*  $where[] = ['order_status', '=', [OrderDict::FINISH, OrderDict::WAIT_HX]];
        $list = (new Order())->with(['act'])->where($where)->select()->toArray();

        foreach ($list as $k => &$v) {



        }*/
    }


}

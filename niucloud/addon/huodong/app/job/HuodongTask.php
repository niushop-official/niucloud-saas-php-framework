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

class HuodongTask extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        Log::write('活动报名计划任务执行'.date('Y-m-d h:i:s'));


        try {

            $this->auto_end();

            return true;
        } catch (\Exception $e) {

            Log::write('活动报名计划任务失败: '.json_encode($e->getMessage(),JSON_UNESCAPED_UNICODE));

            return false;
        }
    }
    public function auto_end()
    {
        $list = (new Act())->where('endtime','< time', date('Y-m-d H:i:s'))->where('status',1)->select()->toArray();
        foreach ($list as $k => &$v) {

            if($v['is_zhouqi']){
                $indata = $v;
                $indata['status'] = 1;
                $indata['sales'] = 0;
                $indata['views'] = 0;
                $indata['zhouqi_from'] = $v['id'];
                $indata['adddate'] = date('Y-m-d H:i:s');
                $indata['startime'] = date('Y-m-d H:i:s',strtotime($v['startime'])+7*24*3600);
                $indata['endtime'] = date('Y-m-d H:i:s',strtotime($v['endtime'])+7*24*3600);
                unset($indata['id']);
                $new_id = (new Act())->strict(false)->insertGetId($indata);

                //内置活动订单事件监听
                $info = (new Act())->where([['id', "=", $new_id]])->findOrEmpty()->toArray();
                event('AfterHuoDongCreate', $info);

            }
            $updata['status'] = -2;
            (new Act())->where('id', $v['id'])->strict(false)->update($updata);


//            (new Order())->where('act_id', $v['id'])->strict(false)->update(['status' => -2]);

            event('AfterHuoDongEnd', $v);

        }
    }



}

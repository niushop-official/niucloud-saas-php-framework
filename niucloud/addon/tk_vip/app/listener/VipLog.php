<?php
declare (strict_types = 1);

namespace addon\tk_vip\app\listener;


use addon\tk_vip\app\model\log\Log;

/**
 *日志
 */
class VipLog
{

    public function handle($data){
        $logModel=new Log();
        $logModel->create([
            'site_id'=>$data['site_id']??'',
            'member_id'=>$data['member_id']??'',
            'level_id'=>$data['level_id']??'',
            'over_time'=>$data['over_time']??'',
            'body'=>$data['body']??'',
            'type'=>$data['type']??'',
            'create_time'=>time()
        ]);
    }
}

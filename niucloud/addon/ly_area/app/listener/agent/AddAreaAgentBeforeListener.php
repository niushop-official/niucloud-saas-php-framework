<?php

namespace addon\ly_area\app\listener\agent;

use addon\ly_area\app\service\admin\AreaAgentService;
use addon\ly_area\app\service\core\CoreAreaConfigService;

/**
 * 添加代理前
 * */
class AddAreaAgentBeforeListener
{
    /**
     * 事件方法
     *
     * @return mixed
     */
    public function handle($data)
    {
        $config = (new CoreAreaConfigService())->getAreaConfig($data['site_id']);
        if($config['become_many'] == 0){
            $agent = (new AreaAgentService())->getAgentByMemberId($data['site_id'], $data['member_id']);
            if(!$agent->isEmpty()){
                throw new \Exception("您已经是代理了,不能代理多区域");
            }
        }
    }
}
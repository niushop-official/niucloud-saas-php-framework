<?php

namespace addon\huodong\app\adminapi\controller\config;
use core\base\BaseAdminController;
use addon\huodong\app\service\core\ConfigService;


class Config extends BaseAdminController
{ 
    /**
     * @Notes:获取配置
     * @Interface getConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/6/25   上午12:00
     */
    public function getConfig()
    {
        return success("操作成功",(new ConfigService())->getConfig());
    }

    /**
     * @Notes:保存配置
     * @Interface setConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/6/25   上午12:00
     */
    public function setConfig(){
        $data = $this->request->params([
            ["is_allow_cancel",0],
            ["cancel_del_jifen",0],
            ["open_act_rank",0],
            ["open_send_point",0],
            ["fenxiao_gifts",0],
            ["open_fenxiao_gifts",[]],
            ["fenxiao_rate1",0],
            ["fenxiao_rate2",0],
            ["fenxiao_gifts_type",1],
            ["one_tianbiao",0],

        ]);
        (new ConfigService())->setConfig($data);
        return success('操作成功');
    }

}

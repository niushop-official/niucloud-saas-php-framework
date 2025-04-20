<?php

namespace addon\tk_vip\app\adminapi\controller\config;
use core\base\BaseAdminController;
use addon\tk_vip\app\service\core\ConfigService;


class Config extends BaseAdminController
{

    /**
     * @Notes:获取配置
     * @Interface getConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/10/25   上午8:56
     */
    public function getConfig()
    {
        return success("操作成功",(new ConfigService())->getConfig());
    }

    /**
     * @Notes:设置配置
     * @Interface setConfig
     * @return \think\Response
     * @author: TK
     * @Time: 2024/10/25   上午8:57
     */
    public function setConfig(){
        $data = $this->request->params([
            ['level_id', '0'],
            ['day', '0'],
            ['over_type', 'common'],
            ['over_time', ''],
        ]);
        (new ConfigService())->setConfig($data);
        return success('操作成功');
    }
    public function getRealConfig()
    {
        return success("操作成功",(new ConfigService())->getRealConfig());
    }
    public function setRealConfig(){
        $data = $this->request->params([
            ['open_real', '0'],
            ['app_code', ''],
            ['open_mobile_code', '0'],
            ['max_real_num', '0'],
            ['is_auto',''],  //自动认证
            ['field',[]],
            ['is_upload_card',0]
        ]);
        (new ConfigService())->setRealConfig($data);
        return success('操作成功');
    }
}

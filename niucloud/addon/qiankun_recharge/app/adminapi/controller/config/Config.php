<?php

namespace addon\qiankun_recharge\app\adminapi\controller\config;

use core\base\BaseAdminController;
use addon\qiankun_recharge\app\service\admin\config\ConfigService;


/**
 * 充值设置控制器
 * Class Config
 * @package addon\qiankun_recharge\app\adminapi\controller\config
 */
class Config extends BaseAdminController
{

    /**
     * 充值设置详情
     * @param int $id
     * @return \think\Response
     */
    public function info(){
        return success((new ConfigService())->getInfo());
    }

    /**
     * 添加充值设置
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["open",0],
             ["min_recharge",0.00],
             ["recharge_desc",""]
        ]);
        $this->validate($data, 'addon\qiankun_recharge\app\validate\config\Config.add');
        $id = (new ConfigService())->add($data);
        return success('SUCCESS', ['id' => $id]);
    }
}

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

namespace addon\shortvideo\app\adminapi\controller\config;

use core\base\BaseAdminController;
use addon\shortvideo\app\service\admin\config\ConfigService;


class Config extends BaseAdminController
{

    public function getset(){

        return success((new ConfigService())->getset());
    }
    public function saveset(){

        $data = $this->request->params([
            ["open_fabu",1],
            ["open_ping",1],
            ["open_pingshen",0],
//            ["index_type",1],
            ["mianze",''],

        ]);

        return success((new ConfigService())->saveset($data));
    }
}

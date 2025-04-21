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

namespace addon\ttcard\app\adminapi\controller\sys;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\sys\SysService;


/**
 * 系统配置
 * Class Sys
 * @package addon\ttcard\app\adminapi\controller\sys
 */
class Sys extends BaseAdminController
{
    public function index(){
        return success((new SysService())->getInfo());
    }

    public function edit(){
        $data = $this->request->params([
             ["addCard_switch","1"],
             ["authentication_switch","1"],
             ["indexSwiper",""],
             ["leaveamessage_switch","1"],
             ["miniappHiddenInformation","0"],
             ["recruit_switch","1"],
             ["vip_switch","1"],
             ["website_switch","0"],
             ["website_url",""],
             ["miniappIndexTitle",""],
        ]);
        if($data['miniappIndexTitle']==""){
            return fail('标题不能为空');
        }
        if($data['website_switch']=="0"){
            $data['website_url']="";
        }
        if($data['website_switch']=="1" && $data['website_url']==""){
            return fail('H5网页URL不能为空');
        }
        $update=[];
        $update['con_json']=json_encode($data,JSON_UNESCAPED_UNICODE);
        (new SysService())->edit($update);
        return success('EDIT_SUCCESS');
    }
}

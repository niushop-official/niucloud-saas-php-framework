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

namespace addon\ttcard\app\adminapi\controller\authentication;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\authentication\AuthenticationService;


/**
 * 认证信息管理控制器
 * Class Authentication
 * @package addon\ttcard\app\adminapi\controller\authentication
 */
class Authentication extends BaseAdminController
{
   /**
    * 获取认证信息管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["examine_status",""],
             ["user_id",""],
             ["website_id",""],
             ["ordertype_id",""],
             ["ordertype_diyname",""],
             ["name",""],
             ["idcard_num",""],
             ["tips",""],
             ["create_time",""]
        ]);
        return success((new AuthenticationService())->getPage($data));
    }

    /**
     * 认证信息管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AuthenticationService())->getInfo($id));
    }

    /**
     * 添加认证信息管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["examine_status",""],
             ["user_id",0],
             ["website_id",0],
             ["ordertype_id",0],
             ["ordertype_diyname",""],
             ["name",""],
             ["idcard_num",""],
             ["idcard_z_image",""],
             ["idcard_f_image",""],
             ["businesslicense_image",""],
             ["tips",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\authentication\Authentication.add');
        $id = (new AuthenticationService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 认证信息管理编辑
     * @param $id  认证信息管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["examine_status",""],
             ["user_id",0],
             ["website_id",0],
             ["ordertype_id",0],
             ["ordertype_diyname",""],
             ["name",""],
             ["idcard_num",""],
             ["idcard_z_image",""],
             ["idcard_f_image",""],
             ["businesslicense_image",""],
             ["tips",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\authentication\Authentication.edit');
        (new AuthenticationService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 认证信息管理删除
     * @param $id  认证信息管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new AuthenticationService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new AuthenticationService())->getUserAll());
    }

    public function getWebsiteAll(){
         return success(( new AuthenticationService())->getWebsiteAll());
    }

    public function getOrdertypeAll(){
        return success(( new AuthenticationService())->getOrdertypeAll());
    }
}

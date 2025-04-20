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

namespace addon\ttcard\app\adminapi\controller\user;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\user\UserService;


/**
 * 用户管理控制器
 * Class User
 * @package addon\ttcard\app\adminapi\controller\user
 */
class User extends BaseAdminController
{
   /**
    * 获取用户管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["username",""],
             ["nickname",""],
             ["phone",""],
             ["ordertype_id",""],
             ["expirationtime",""],
             ["grade_status",""],
             ["prelogintime",""],
             ["logintime",""],
             ["create_time",""]
        ]);
        return success((new UserService())->getPage($data));
    }

    /**
     * 用户管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new UserService())->getInfo($id));
    }

    /**
     * 添加用户管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["username",""],
             ["password",""],
             ["avatar",""],
             ["nickname",""],
             ["phone",0],
             ["ordertype_id",0],
             ["expirationtime",0],
             ["grade_status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\user\User.add');
        if($data['expirationtime']){
            $data['expirationtime'] = strtotime($data['expirationtime']);
        }
        $id = (new UserService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 用户管理编辑
     * @param $id  用户管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["username",""],
             ["password",""],
             ["avatar",""],
             ["nickname",""],
             ["phone",0],
             ["ordertype_id",0],
             ["expirationtime",0],
             ["grade_status",""],
        ]);
        if($data['expirationtime']){
            $data['expirationtime'] = strtotime($data['expirationtime']);
        }
        $this->validate($data, 'addon\ttcard\app\validate\user\User.edit');
        (new UserService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 用户管理删除
     * @param $id  用户管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new UserService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getOrdertypeAll(){
         return success(( new UserService())->getOrdertypeAll());
    }

}

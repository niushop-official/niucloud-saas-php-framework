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

namespace addon\huodong\app\adminapi\controller\user;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\user\UserService;


/**
 * 报名者信息控制器
 * Class User
 * @package addon\huodong\app\adminapi\controller\user
 */
class User extends BaseAdminController
{
   /**
    * 获取报名者信息列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["realname",""],
             ["mobile",""],
             ["idcard",""],
             ["adddate",["",""]]
        ]);
        return success((new UserService())->getPage($data));
    }

    /**
     * 报名者信息详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new UserService())->getInfo($id));
    }

    /**
     * 添加报名者信息
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["realname",""],
             ["mobile",""],
             ["idcard",""],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\user\User.add');
        $id = (new UserService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 报名者信息编辑
     * @param $id  报名者信息id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["realname",""],
             ["mobile",""],
             ["idcard",""],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\user\User.edit');
        (new UserService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 报名者信息删除
     * @param $id  报名者信息id
     * @return \think\Response
     */
    public function del(int $id){
        (new UserService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new UserService())->getMemberAll());
    }

}

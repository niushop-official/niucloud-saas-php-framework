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

namespace addon\ttcard\app\adminapi\controller\invite;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\invite\InviteService;


/**
 * 微官网邀请管理控制器
 * Class Invite
 * @package addon\ttcard\app\adminapi\controller\invite
 */
class Invite extends BaseAdminController
{
   /**
    * 获取微官网邀请管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",""],
             ["from_website_id",""],
             ["to_user_id",""],
             ["to_user_card_id",""],
             ["create_time",["",""]]
        ]);
        return success((new InviteService())->getPage($data));
    }

    /**
     * 微官网邀请管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new InviteService())->getInfo($id));
    }

    /**
     * 添加微官网邀请管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",0],
             ["from_website_id",0],
             ["to_user_id",0],
             ["to_user_card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\invite\Invite.add');
        $id = (new InviteService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 微官网邀请管理编辑
     * @param $id  微官网邀请管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",0],
             ["from_website_id",0],
             ["to_user_id",0],
             ["to_user_card_id",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\invite\Invite.edit');
        (new InviteService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 微官网邀请管理删除
     * @param $id  微官网邀请管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new InviteService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new InviteService())->getUserAll());
    }

    public function getWebsiteAll(){
         return success(( new InviteService())->getWebsiteAll());
    }

    public function getCardAll(){
         return success(( new InviteService())->getCardAll());
    }

}

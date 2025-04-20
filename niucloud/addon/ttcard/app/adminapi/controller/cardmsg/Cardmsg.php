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

namespace addon\ttcard\app\adminapi\controller\cardmsg;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\cardmsg\CardmsgService;


/**
 * 消息管理控制器
 * Class Cardmsg
 * @package addon\ttcard\app\adminapi\controller\cardmsg
 */
class Cardmsg extends BaseAdminController
{
   /**
    * 获取消息管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["type_status",""],
             ["status",""],
             ["form_user_id",""],
             ["to_user_id",""],
             ["card_id",""],
             ["title",""],
             ["content",""],
             ["create_time",""]
        ]);
        return success((new CardmsgService())->getPage($data));
    }

    /**
     * 消息管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CardmsgService())->getInfo($id));
    }

    /**
     * 添加消息管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["type_status",""],
             ["status",""],
             ["form_user_id",0],
             ["to_user_id",0],
             ["card_id",0],
             ["title",""],
             ["content",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cardmsg\Cardmsg.add');
        $id = (new CardmsgService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 消息管理编辑
     * @param $id  消息管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["type_status",""],
             ["status",""],
             ["form_user_id",0],
             ["to_user_id",0],
             ["card_id",0],
             ["title",""],
             ["content",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cardmsg\Cardmsg.edit');
        (new CardmsgService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 消息管理删除
     * @param $id  消息管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new CardmsgService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new CardmsgService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new CardmsgService())->getCardAll());
    }

}

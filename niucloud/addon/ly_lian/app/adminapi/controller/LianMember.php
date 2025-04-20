<?php

namespace addon\ly_lian\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_lian\app\service\admin\LianMemberService;


/**
 * 链动2+1会员控制器
 * Class LianMember
 * @package addon\ly_lian\app\adminapi\controller\member
 */
class LianMember extends BaseAdminController
{
   /**
    * 获取链动2+1会员列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ['search', ''],
             ["member_id",""],
             ["level_id",""],
             ["status",""],
             ["thaw_status",""],
             ["up_time",["",""]],
             ["create_time",["",""]]
        ]);
        return success((new LianMemberService())->getPage($data));
    }

    /**
     * 链动2+1会员详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LianMemberService())->getInfo($id));
    }

    /**
     * 添加链动2+1会员
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["lian_pid",0],
             ["level_id",0],
             ["child_mid1",0],
             ["child_mid2",0],
             ["commission",0.00],
             ["give_commission",0.00],
             ["frozen_commission",0.00],
             ["status",0],
             ["thaw_status",0],
             ["up_time",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\member\Member.add');
        $id = (new LianMemberService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 链动2+1会员编辑
     * @param $id  链动2+1会员id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["lian_pid",0],
             ["level_id",0],
             ["child_mid1",0],
             ["child_mid2",0],
             ["commission",0.00],
             ["give_commission",0.00],
             ["frozen_commission",0.00],
             ["status",0],
             ["thaw_status",0],
             ["up_time",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\member\Member.edit');
        (new LianMemberService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 链动2+1会员删除
     * @param $id  链动2+1会员id
     * @return \think\Response
     */
    public function del(int $id){
        (new LianMemberService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
<?php

namespace addon\ly_lian\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_lian\app\service\admin\LianChangeService;


/**
 * 链动2+1关系变动控制器
 * Class LianChange
 * @package addon\ly_lian\app\adminapi\controller
 */
class LianChange extends BaseAdminController
{
   /**
    * 获取链动2+1关系变动列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ['search', ''],
             ["member_id",""],
             ["pid",""],
             ["lian_pid",""],
             ["new_lian_pid",""],
             ["level_id",""],
             ["child_mid",""],
             ["child_type",""],
             ["create_time",["",""]]
        ]);
        return success((new LianChangeService())->getPage($data));
    }

    /**
     * 链动2+1关系变动详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LianChangeService())->getInfo($id));
    }

    /**
     * 添加链动2+1关系变动
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["lian_pid",0],
             ["new_lian_pid",0],
             ["level_id",0],
             ["child_mid",0],
             ["child_type",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\change\LianChange.add');
        $id = (new LianChangeService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 链动2+1关系变动编辑
     * @param $id  链动2+1关系变动id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["pid",0],
             ["lian_pid",0],
             ["new_lian_pid",0],
             ["level_id",0],
             ["child_mid",0],
             ["child_type",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\change\LianChange.edit');
        (new LianChangeService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 链动2+1关系变动删除
     * @param $id  链动2+1关系变动id
     * @return \think\Response
     */
    public function del(int $id){
        (new LianChangeService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
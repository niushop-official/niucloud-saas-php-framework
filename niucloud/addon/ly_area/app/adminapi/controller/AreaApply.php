<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\dict\area\AreaApplyDict;
use addon\ly_area\app\service\admin\AreaApplyService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 区域代理申请
 */
class AreaApply extends BaseAdminController
{
   /**
    * 获取区域代理申请记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["agent_id",""],
             ["level_area",""],
             ["apply_area",""],
             ["status",""],
             ["create_time",["",""]]
        ]);
        return success((new AreaApplyService())->getPage($data));
    }

    /**
     * 区域代理申请记录详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AreaApplyService())->getInfo($id));
    }

    /**
     * 添加区域代理申请记录
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["agent_id",0],
             ["level_area",0],
             ["apply_area",""],
             ["level_id",0],
             ["province_id",0],
             ["city_id",0],
             ["district_id",0],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_area\app\validate\apply\Apply.add');
        $id = (new AreaApplyService())->add($data);
        return success('ADD_SUCCESS', ['apply_id' => $id]);
    }

    /**
     * 区域代理申请记录编辑
     * @param $id  区域代理申请记录id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["agent_id",0],
             ["level_area",0],
             ["apply_area",""],
             ["level_id",0],
             ["province_id",0],
             ["city_id",0],
             ["district_id",0],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_area\app\validate\apply\Apply.edit');
        (new AreaApplyService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 区域代理申请记录删除
     * @param $id  区域代理申请记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new AreaApplyService())->del($id);
        return success('DELETE_SUCCESS');
    }


    /**
     * 审核
     * @param int $apply_id
     * @return void
     */
    public function agree(int $apply_id)
    {
        (new AreaApplyService())->agree($apply_id);
        return success('AGREE_SUCCESS');
    }

    /**
     * 拒绝
     * @param int $apply_id
     * @return Response
     */
    public function refuse(int $apply_id)
    {
        $data = $this->request->params([
            ['reason', ''],
        ]);
        (new AreaApplyService())->refuse($apply_id, $data);
        return success();
    }

    /**
     * 获取状态
     * @return Response
     */
    public function getStatus()
    {
        return success(AreaApplyDict::getStatus());
    }
}
<?php

namespace addon\ly_area\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_area\app\service\admin\AreaRewardService;


/**
 * 区域代理分红记录控制器
 * Class AreaReward
 * @package addon\ly_area\app\adminapi\controller
 */
class AreaReward extends BaseAdminController
{
   /**
    * 获取区域代理分红记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["search",""],
             ["member_id",""],
             ["level_id",""],
             ["agent_area",""],
             ["level_rate",""],
             ["level_money",""],
             ["status",""],
             ["settle_time",["",""]],
             ["create_time",["",""]]
        ]);
        return success((new AreaRewardService())->getPage($data));
    }

    /**
     * 区域代理分红记录详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AreaRewardService())->getInfo($id));
    }

    /**
     * 添加区域代理分红记录
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["agent_area",""],
             ["order_id",0],
             ["order_amount",0.00],
             ["amount",0.00],
             ["level_rate",0.00],
             ["level_agents",0],
             ["dividend_amount",0.00],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_area\app\validate\area\AreaReward.add');
        $id = (new AreaRewardService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 区域代理分红记录编辑
     * @param $id  区域代理分红记录id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["agent_area",""],
             ["order_id",0],
             ["order_amount",0.00],
             ["amount",0.00],
             ["level_rate",0.00],
             ["level_agents",0],
             ["dividend_amount",0.00],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_area\app\validate\area\AreaReward.edit');
        (new AreaRewardService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 区域代理分红记录删除
     * @param $id  区域代理分红记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new AreaRewardService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
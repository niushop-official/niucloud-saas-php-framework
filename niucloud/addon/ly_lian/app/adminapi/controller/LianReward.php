<?php

namespace addon\ly_lian\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_lian\app\service\admin\LianRewardService;


/**
 * 链动2+1奖励控制器
 * Class LianReward
 * @package addon\ly_lian\app\adminapi\controller
 */
class LianReward extends BaseAdminController
{
   /**
    * 获取链动2+1奖励列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["search",""],
             ["member_id",""],
             ["level_id",""],
             ["buy_mid",""],
             ["order_id",""],
             ["order_goods_id",""],
             ["reward_type",""],
             ["thaw_status",""],
             ["create_time",["",""]],
             ["settle_time", ""]
        ]);
        return success((new LianRewardService())->getPage($data));
    }

    /**
     * 链动2+1奖励详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LianRewardService())->getInfo($id));
    }

    /**
     * 添加链动2+1奖励
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["buy_mid",0],
             ["order_id",0],
             ["order_goods_id",0],
             ["settle_cycle",0],
             ["settle_amount",0.00],
             ["give_rate",0.00],
             ["give_amount",0.00],
             ["frozen_rate",0.00],
             ["frozen_amount",0.00],
             ["reward_type",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\reward\LianReward.add');
        $id = (new LianRewardService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 链动2+1奖励编辑
     * @param $id  链动2+1奖励id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["buy_mid",0],
             ["order_id",0],
             ["order_goods_id",0],
             ["settle_cycle",0],
             ["settle_amount",0.00],
             ["give_rate",0.00],
             ["give_amount",0.00],
             ["frozen_rate",0.00],
             ["frozen_amount",0.00],
             ["reward_type",0],
             ["thaw_status",0],
             ["status",0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\reward\LianReward.edit');
        (new LianRewardService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 链动2+1奖励删除
     * @param $id  链动2+1奖励id
     * @return \think\Response
     */
    public function del(int $id){
        (new LianRewardService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
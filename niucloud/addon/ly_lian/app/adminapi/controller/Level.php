<?php

namespace addon\ly_lian\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\ly_lian\app\service\admin\LevelService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;


/**
 * 链动2+1等级控制器
 * Class Level
 * @package addon\ly_lian\app\adminapi\controller\level
 */
class Level extends BaseAdminController
{
   /**
    * 获取链动2+1等级列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["level_name",""],
             ["level_num",""],
             ["create_time",["",""]],
             ["recommend_rate", ""],
             ["see_rate", ""],
             ["cultivate_rate", ""],
             ["frozen_rate", ""],
             ["see_frozen", ""],
             ["cultivate_frozen", ""],
        ]);
        return success((new LevelService())->getPage($data));
    }

    /**
     * 链动2+1等级详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LevelService())->getInfo($id));
    }

    /**
     * 添加链动2+1等级
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["level_name",""],
             ["level_num",0],
             ["recommend_money", 0.00],
             ["recommend_rate", 0.00],
             ["see_money", 0],
             ["see_rate", 0.00],
             ["cultivate_money", 0],
             ["cultivate_rate", 0.00],
             ["equal_money", 0.00],
             ["equal_rate", 0.00],
             ["upgrade_type", 0],
            ["order_money", 0.00],
            ["recharge_money", 0.00],
            ["recommend_num", 0],
            ["up_register", 0],
            ["up_goods_num", 0],
            ["see_frozen", 0],
            ["cultivate_frozen", 0],
            ["frozen_rate", 0.00],
            ["status", 0],
            ["task_boss_num", 0],
            ["task_boss_first", 1],
            ["task_limit_days", 0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\level\Level.add');
        $id = (new LevelService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 链动2+1等级编辑
     * @param $id  链动2+1等级id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["level_name",""],
             ["level_num",0],
             ["recommend_money", 0.00],
             ["recommend_rate", 0.00],
             ["see_money", 0.00],
             ["see_rate", 0.00],
             ["cultivate_money", 0.00],
             ["cultivate_rate", 0.00],
             ["equal_money", 0.00],
             ["equal_rate", 0.00],
             ["upgrade_type", 0],
            ["order_money", 0.00],
            ["recharge_money", 0.00],
            ["recommend_num", 0],
            ["up_register", 0],
            ["up_goods_num", 0],
            ["see_frozen", 0],
            ["cultivate_frozen", 0],
            ["frozen_rate", 0.00],
            ["status", 0],
            ["task_boss_num", 0],
            ["task_boss_first", 1],
            ["task_limit_days", 0],

        ]);
        // $this->validate($data, 'addon\ly_lian\app\validate\level\Level.edit');
        (new LevelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 链动2+1等级删除
     * @param $id  链动2+1等级id
     * @return \think\Response
     */
    public function del(int $id){
        (new LevelService())->del($id);
        return success('DELETE_SUCCESS');
    }


    
    /**
     * 链动等级权重
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getLevelNumList()
    {
        return success((new LevelService())->getLevelNumList());
    }

    /**
     * 等级内容卡片
     * @param int $id
     * @return Response
     */
    public function getLevelCard()
    {
        $data = $this->request->params([
            ["id", 0],
        ]);
        return success((new LevelService())->getLevelCardList($data));
    }

    /**
     *  查询股东等级列表(用于弹框选择)
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getListOfSelect()
    {
        return success((new LevelService())->getListOfSelect());
    }

    
}
<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\service\admin\AreaLevelService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminController;


/**
 * 区域代理等级控制器
 * Class Level
 * @package app\adminapi\controller\area
 */
class AreaLevel extends BaseAdminController
{
   /**
    * 获取区域代理等级列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["level_name",""],
             ["level_area",""],
             ["status",""],
             ["create_time",["",""]]
        ]);
        return success((new AreaLevelService())->getPage($data));
    }

    /**
     * 区域代理等级详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AreaLevelService())->getInfo($id));
    }

    /**
     * 添加区域代理等级
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["level_name",""],
             ["level_num",0],
             ["level_area",0],
             ["level_money",0.00],
             ["level_rate",0.00],
             ["up_type",0],
             ["order_goods_id",""],
             ["order_money",0.00],
             ["status",0],

        ]);

        if(is_array($data['order_goods_id'])){
            $data['order_goods_id'] = implode(",",$data['order_goods_id']);
        }

        // $this->validate($data, 'app\validate\area\Level.add');
        $id = (new AreaLevelService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 区域代理等级编辑
     * @param $id  区域代理等级id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["level_name",""],
             ["level_num",0],
             ["level_area",0],
             ["level_money",0.00],
             ["level_rate",0.00],
             ["up_type",0],
             ["order_goods_id",""],
             ["order_money",0.00],
             ["status",0],

        ]);

        if(is_array($data['order_goods_id'])){
            $data['order_goods_id'] = implode(",",$data['order_goods_id']);
        }
        // $this->validate($data, 'app\validate\area\Level.edit');
        (new AreaLevelService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 区域代理等级删除
     * @param $id  区域代理等级id
     * @return \think\Response
     */
    public function del(int $id){
        (new AreaLevelService())->del($id);
        return success('DELETE_SUCCESS');
    }


    public function getLevelNumList(){
        return success((new AreaLevelService())->getLevelNumList());
    }


    public function modifyLevelStatus(){
        $data = $this->request->params([
            ["level_id",""],
            ["status",""]
        ]);
        (new AreaLevelService())->modifyLevelStatus($data['level_id'], $data['status']);
        return success('SUCCESS');
    }

    
}
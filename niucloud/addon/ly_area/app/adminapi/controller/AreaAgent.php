<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\model\AreaLevel;
use app\service\admin\sys\AreaService;
use core\base\BaseAdminController;
use addon\ly_area\app\service\admin\AreaAgentService;


/**
 * 区域代理控制器
 * Class Agent
 * @package app\adminapi\controller\area
 */
class AreaAgent extends BaseAdminController
{
   /**
    * 获取区域代理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["search",""],
             ["member_id",""],
             ["full_area",""],
             ["status",""],
             ["agent_level",""],
             ["agent_at",["",""]],
             ["level_id",""],
        ]);
        return success((new AreaAgentService())->getPage($data));
    }

    /**
     * 区域代理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new AreaAgentService())->getInfo($id));
    }

    /**
     * 添加区域代理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["province_id",""],
             ["city_id",""],
             ["district_id",""],
             ["status",1],
             ["agent_level",""],
             ["level_id",""],
             ["rate",0.00],
             ["full_area",""],

        ]);

        $province = isset($data['province_id']) ? (new AreaService())->getAreaName($data['province_id']) : '';
        $city = isset($data['city_id']) && !empty($data['city_id']) ? (new AreaService())->getAreaName($data['city_id']) : '';
        $district = isset($data['district_id']) && !empty($data['district_id']) ? (new AreaService())->getAreaName($data['district_id']) : '';

        $data['full_area'] = implode(' ', [$province, $city, $district]);

        $level = (new AreaLevel())->where('level_area', $data['agent_level'])->findOrEmpty();
        $data['level_id'] = $level['level_id'];

        // $this->validate($data, 'addon\ly_area\app\validate\AreaAgent.add');
        $id = (new AreaAgentService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 区域代理编辑
     * @param $id  区域代理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["province_id",""],
             ["city_id",""],
             ["district_id",""],
             ["status",1],
             ["agent_level",""],
             ["level_id",""],
             ["rate",0.00],
             ["full_area",""],

        ]);

        $province = isset($data['province_id']) ? (new AreaService())->getAreaName($data['province_id']) : '';
        $city = isset($data['city_id']) && !empty($data['city_id']) ? (new AreaService())->getAreaName($data['city_id']) : '';
        $district = isset($data['district_id']) && !empty($data['district_id']) ? (new AreaService())->getAreaName($data['district_id']) : '';

        $data['full_area'] = implode(' ', [$province, $city, $district]);

        $level = (new AreaLevel())->where('level_area', $data['agent_level'])->findOrEmpty();
        $data['level_id'] = $level['level_id'];

        // $this->validate($data, 'addon\ly_area\app\validate\AreaAgent.edit');
        (new AreaAgentService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 区域代理删除
     * @param $id  区域代理id
     * @return \think\Response
     */
    public function del(int $id){
        (new AreaAgentService())->del($id);
        return success('DELETE_SUCCESS');
    }


    public function getMemberListOfSelect(){
        
        $data = $this->request->params([
            ['search',''],
            ['not_in',[]]
        ]);

        return (new ShareholderService())->getMemberListOfSelect($data);
    }

    
}
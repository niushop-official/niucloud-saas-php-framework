<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\adminapi\controller\scenic;

use addon\tourism\app\service\admin\scenic\ScenicService;
use core\base\BaseAdminController;


/**
 * 景点
 * Class Scenic
 * @package addon\tourism\app\adminapi\controller\scenic
 */
class Scenic extends BaseAdminController
{
   /**
    * 获取景点列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
            ["scenic_name",""],
            ["scenic_level",""],
            ['create_time', []],
        ]);
        return success((new ScenicService())->getPage($data));
    }

    /**
     * 景点详情
     * @param int $scenic_id
     * @return \think\Response
     */
    public function info(int $scenic_id){
        return success((new ScenicService())->getInfo($scenic_id));
    }

    /**
     * 添加景点
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["scenic_name",""],
            ["province_id",0],
            ["city_id",0],
            ["district_id",0],
            ["address",""],
            ["scenic_level",0],
            ["open_time",""],
            ["telephone",""],
            ["scenic_desc",""],
            ["surround",""],
            ["scenic_cover",""],
            ["scenic_images", ""],
            ["poster_id", 0],
            ["latitude", ""],
            ["longitude", ""]
        ]);
        $address = $this->request->params([
            ["province_name", ""],
            ["city_name", ""],
            ["district_name", ""]
        ]);

        $this->validate($data, 'addon\tourism\app\validate\scenic\Scenic.add');
        $id = (new ScenicService())->add($data, $address);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 景点编辑
     * @param $scenic_id
     * @return \think\Response
     */
    public function edit(int $scenic_id){
        $data = $this->request->params([
            ["scenic_name",""],
            ["province_id",0],
            ["city_id",0],
            ["district_id",0],
            ["address",""],
            ["scenic_level",0],
            ["open_time",""],
            ["telephone",""],
            ["scenic_desc",""],
            ["surround",""],
            ["scenic_cover",""],
            ["scenic_images", ""],
            ["poster_id", 0],
            ["latitude", ""],
            ["longitude", ""]
        ]);

        $address = $this->request->params([
            ["province_name", ""],
            ["city_name", ""],
            ["district_name", ""]
        ]);

        $this->validate($data, 'addon\tourism\app\validate\scenic\Scenic.edit');
        (new ScenicService())->edit($scenic_id, $data, $address);
        return success('EDIT_SUCCESS');
    }

    /**
     * 修改状态
     */
    public function editStatus($id){
        $data = $this->request->params([
            ["scenic_status",""],
        ]);
        (new ScenicService())->editStatus($id, $data);
        return success();
    }

    /**
     * 获取选择景点列表
     * @return \think\Response
     */
    public function select(){
        $data = $this->request->params([
            ["scenic_name",""],
            ["scenic_level",""],
            ['create_time', []],
        ]);
        return success((new ScenicService())->getSelectPage($data));
    }
}

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

namespace addon\vipcard\app\adminapi\controller\reserve;

use core\base\BaseAdminController;
use addon\vipcard\app\service\admin\reserve\ReserveUserService;


/**
 * 技师
 * Class Reserve
 * @package app\adminapi\controller\reserve
 */
class User extends BaseAdminController
{
   /**
    * 获取技师列表
    * @return \think\Response
    */
    public function pages(){
        $data = $this->request->params([
            ["name",""],
            ["create_time", []]
        ]);
        return success((new ReserveUserService())->getPage($data));
    }

    /**
     * 获取技师列表(不分页)
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["name",""],
            ["create_time", []]
        ]);
        return success((new ReserveUserService())->getList($data));
    }

    /**
     * 技师详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ReserveUserService())->getInfo($id));
    }

    /**
     * 添加技师
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["name", ""],
             ["mobile", ""],
             ["seniority", ""],
             ["number", ""],
             ["position", ""],
             ["headimg", ""],
             ["status", 1]
        ]);
        $id = (new ReserveUserService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 技师删除
     * @param $id  预约id
     * @return \think\Response
     */
    public function del(int $id){
        (new ReserveUserService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 编辑技师
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
            ["name", ""],
            ["mobile", ""],
            ["seniority", ""],
            ["number", ""],
            ["position", ""],
            ["headimg", ""]
        ]);
        (new ReserveUserService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 更新技师状态
     * @return \think\Response
     */
    public function status(int $id){
        $data = $this->request->params([
            ["status", 0],
        ]);
        (new ReserveUserService())->editStatus($id, $data);
        return success('EDIT_SUCCESS');
    }

}

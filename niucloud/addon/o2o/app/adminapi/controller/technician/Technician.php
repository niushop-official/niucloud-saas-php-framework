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

namespace addon\o2o\app\adminapi\controller\technician;

use addon\o2o\app\dict\TechnicianDict;
use addon\o2o\app\service\admin\technician\TechnicianService;
use core\base\BaseAdminController;


/**
 * 技师控制器
 * Class Reserve
 * @package app\adminapi\controller\reserve
 */
class Technician extends BaseAdminController
{
    /**
     * 获取技师列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ["name",""],
            ["mobile",""],
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getPage($data));
    }

    /**
     * 获取技师列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["name",""],
            ["mobile",""],
            ["status",""],
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getList($data));
    }

    /**
     * 获取技师列表（用于弹框选择
     * @return \think\Response
     */
    public function select()
    {
        $data = $this->request->params([
            ["name",""],
            ["mobile",""],
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getSelectPage($data));
    }

    /**
     * 技师详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new TechnicianService())->getInfo($id));
    }

    /**
     * 添加技师
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["member_id",0],
            ["name",""],
            ["age",""],
            ["sex",0],
            ["mobile", ""],
            ["working_age", 0],
            ["status" , ""],
            ["label", ''],
            ['position_id', ''],
            ['position_name', ''],
            ['goods_ids', ''],
            ['headimg', ''],
            ['images', ''],
            ['desc', ''],
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Technician.add');
        $id = (new TechnicianService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 技师编辑
     * @param $id  技师id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            ["member_id",0],
            ["name",""],
            ["age",""],
            ["sex",0],
            ["mobile", ""],
            ["working_age", 0],
            ["status" , ""],
            ["label", ''],
            ['position_id', ''],
            ['position_name', ''],
            ['goods_ids', ''],
            ['headimg', ''],
            ['images', ''],
            ['desc', ''],
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Technician.edit');
        (new TechnicianService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 技师删除
     * @param $id  技师id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new TechnicianService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取会员
     */
    public function getMember()
    {
        $data = $this->request->params([
            ["keyword",""],
        ]);
        return success((new TechnicianService())->getMemberList($data));
    }

    /**
     * 获取状态
     */
    public function getStatus()
    {
        return success(TechnicianDict::getTechnicianStatus());
    }

    /**
     * 修改 技师状态
     */
    public function status($id)
    {
        $data = $this->request->params([
            ["status",""]
        ]);
        (new TechnicianService())->editStatus($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 支持项目的技师列表
     * @param int $id
     * @return \think\Response
     */
    public function goodsTechnician(int $id)
    {

        $data = $this->request->params([
            ["keyword",""],
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getGoodsTechnician($id, $data));
    }

}

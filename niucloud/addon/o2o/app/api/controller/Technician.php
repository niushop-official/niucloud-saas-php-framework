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

namespace addon\o2o\app\api\controller;

use addon\o2o\app\service\api\technician\TechnicianService;
use core\base\BaseAdminController;


/**
 * 技师控制器
 * Class Reserve
 * @package app\adminapi\controller
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
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getList($data));
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
     * 技师列表
     * @param int $id
     * @return \think\Response
     */
    public function goodsTechnician(int $id)
    {

        $data = $this->request->params([
            ["name",""],
            ["mobile",""],
            ["create_time",""]
        ]);
        return success((new TechnicianService())->getGoodsTechnician($id, $data));
    }

    /**
     * 验证是否是技师
     * @param int $id
     * @return \think\Response
     */
    public function checkTechnician()
    {

        return success((new TechnicianService())->checkTechnician());
    }

}

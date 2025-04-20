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

use core\base\BaseAdminController;
use addon\o2o\app\service\admin\technician\PositionService;


/**
 * 岗位
 * Class Position
 * @package app\adminapi\controller\reserve
 */
class Position extends BaseAdminController
{
   /**
    * 获取岗位列表
    * @return \think\Response
    */
    public function pages()
    {
        $data = $this->request->params([
            ["name",""],
            ["create_time", []]
        ]);
        return success((new PositionService())->getPage($data));
    }

    /**
     * 获取岗位列表(不分页)
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["name",""],
            ["create_time", []]
        ]);
        return success((new PositionService())->getList($data));
    }

    /**
     * 岗位详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new PositionService())->getInfo($id));
    }

    /**
     * 添加岗位
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
             ["name", ""],
             ["desc", ""],
        ]);
        $id = (new PositionService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 岗位删除
     * @param $id  预约id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new PositionService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 编辑岗位
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["name", ""],
            ["desc", ""]
        ]);
        (new PositionService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

}

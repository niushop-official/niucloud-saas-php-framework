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

use addon\vipcard\app\dict\ReserveDict;
use core\base\BaseAdminController;
use addon\vipcard\app\service\admin\reserve\ReserveService;


/**
 * 预约控制器
 * Class Reserve
 * @package app\adminapi\controller\reserve
 */
class Reserve extends BaseAdminController
{
   /**
    * 获取预约列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["reserve_state",""],
             ["create_time",""]
        ]);
        return success((new ReserveService())->getPage($data));
    }

    /**
     * 预约看板
     */
    public function reserveByWeek()
    {
        $data = $this->request->params([
            ["length",0],
            ["search_name", ""]
        ]);
        return success((new ReserveService())->reserveByWeek($data));
    }

    /**
     * 预约详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ReserveService())->getInfo($id));
    }

    /**
     * 添加预约
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["reserve_name",""],
             ["goods_id",""],
             ["remark", ""],
             ["source", 2],
             ["reserve_date" , ""],
             ["technician_id", ''],
             ['mobile', '']
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Reserve.add');
        $id = (new ReserveService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 预约编辑
     * @param $id  预约id
     * @return \think\Response
     */
    public function edit($id){
        $data = $this->request->params([
             ["goods_id",""],
             ["remark", ""],
             ["reserve_date" , ""],
             ["technician_id", '']
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Reserve.edit');
        (new ReserveService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 预约删除
     * @param $id  预约id
     * @return \think\Response
     */
    public function del(int $id){
        (new ReserveService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取会员
     */
    public function getMember()
    {
        $data = $this->request->params([
            ["mobile",""],
        ]);
        return success((new ReserveService())->getMemberInfo($data));
    }

    /**
     * 获取状态
     */
    public function getStatus()
    {
        return success(ReserveDict::getStatus());
    }

    /**
     * 修改 预约状态
     */
    public function status($id){
        $data = $this->request->params([
            ["reserve_state",""]
        ]);
        (new ReserveService())->editStatus($id, $data);
        return success('EDIT_SUCCESS');
    }
}

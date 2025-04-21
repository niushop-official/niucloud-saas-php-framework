<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\huodong\app\adminapi\controller\fxbill;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\fxbill\FxbillService;


/**
 * 活动佣金明细控制器
 * Class Fxbill
 * @package addon\huodong\app\adminapi\controller\fxbill
 */
class Fxbill extends BaseAdminController
{
   /**
    * 获取活动佣金明细列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["account_type",""],
             ["account_data",""],
             ["account_sum",""],
             ["from_type",""],
             ["related_id",""],
             ["create_time",["",""]],
             ["memo",""],
             ["from_member_id",""],
             ["fxlevel",""],
             ["status",""]
        ]);
        return success((new FxbillService())->getPage($data));
    }

    /**
     * 活动佣金明细详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new FxbillService())->getInfo($id));
    }

    /**
     * 添加活动佣金明细
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["account_type",""],
             ["account_data",0.00],
             ["account_sum",0.00],
             ["from_type",""],
             ["related_id",""],
             ["memo",""],
             ["from_member_id",0],
             ["fxlevel",0],
             ["status",0]
        ]);
        $this->validate($data, 'addon\huodong\app\validate\fxbill\Fxbill.add');
        $id = (new FxbillService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 活动佣金明细编辑
     * @param $id  活动佣金明细id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["account_type",""],
             ["account_data",0.00],
             ["account_sum",0.00],
             ["from_type",""],
             ["related_id",""],
             ["memo",""],
             ["from_member_id",0],
             ["fxlevel",0],
             ["status",0]
        ]);
        $this->validate($data, 'addon\huodong\app\validate\fxbill\Fxbill.edit');
        (new FxbillService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 活动佣金明细删除
     * @param $id  活动佣金明细id
     * @return \think\Response
     */
    public function del(int $id){
        (new FxbillService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new FxbillService())->getMemberAll());
    }

}

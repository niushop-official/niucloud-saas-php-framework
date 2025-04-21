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

namespace addon\tk_vip\app\adminapi\controller\real;

use addon\tk_vip\app\dict\real\RealDict;
use core\base\BaseAdminController;
use addon\tk_vip\app\service\admin\real\RealService;


/**
 * 实名认证控制器
 * Class Real
 * @package addon\tk_vip\app\adminapi\controller\real
 */
class Real extends BaseAdminController
{
   /**
    * 获取实名认证列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["real_name",""],
             ["mobile",""],
             ["card_num",""],
             ["status",""],
             ["create_time",["",""]]
        ]);
        return success((new RealService())->getPage($data));
    }

    /**
     * 实名认证详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new RealService())->getInfo($id));
    }

    /**
     * 添加实名认证
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["real_name",""],
             ["mobile",""],
             ["card_num",""],
             ["sex",""],
             ["birthday",""],
             ["field",""],
             ["status",0],
             ["real_num",0],

        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\real\Real.add');
        $id = (new RealService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 实名认证编辑
     * @param $id  实名认证id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["real_name",""],
             ["mobile",""],
             ["card_num",""],
             ["sex",""],
             ["birthday",""],
             ["field",""],
             ["status",0],

        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\real\Real.edit');
        (new RealService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 实名认证删除
     * @param $id  实名认证id
     * @return \think\Response
     */
    public function del(int $id){
        (new RealService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new RealService())->getMemberAll());
    }
    public function getRealStatus()
    {
        return success(RealDict::getRealStatus());
    }
}

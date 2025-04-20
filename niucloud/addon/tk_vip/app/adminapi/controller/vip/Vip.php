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

namespace addon\tk_vip\app\adminapi\controller\vip;

use core\base\BaseAdminController;
use addon\tk_vip\app\service\admin\vip\VipService;


/**
 * 会员VIP管理控制器
 * Class Vip
 * @package addon\tk_vip\app\adminapi\controller\vip
 */
class Vip extends BaseAdminController
{
   /**
    * 获取会员VIP管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["level_id",""],
             ["over_time",["",""]]
        ]);
        return success((new VipService())->getPage($data));
    }

    /**
     * 会员VIP管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new VipService())->getInfo($id));
    }

    /**
     * 添加会员VIP管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["over_time",0],

        ]);
        if($data['over_time']!=0){
            $data['over_time']=strtotime($data['over_time']);
        }
        $this->validate($data, 'addon\tk_vip\app\validate\vip\Vip.add');
        $id = (new VipService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 会员VIP管理编辑
     * @param $id  会员VIP管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["over_time",0],

        ]);
        if($data['over_time']!=0){
            $data['over_time']=strtotime($data['over_time']);
        }
        $this->validate($data, 'addon\tk_vip\app\validate\vip\Vip.edit');
        (new VipService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员VIP管理删除
     * @return \think\Response
     */
    public function del(int $id){
        (new VipService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new VipService())->getMemberAll());
    }

    public function getMemberLevelAll(){
         return success(( new VipService())->getMemberLevelAll());
    }

}

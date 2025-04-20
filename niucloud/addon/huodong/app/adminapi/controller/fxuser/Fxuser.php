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

namespace addon\huodong\app\adminapi\controller\fxuser;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\fxuser\FxuserService;


/**
 * 推广员控制器
 * Class Fxuser
 * @package addon\huodong\app\adminapi\controller\fxuser
 */
class Fxuser extends BaseAdminController
{
   /**
    * 获取推广员列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["type",""],
             ["name",""],
             ["mobile",""],
             ["status",""],
             ["adddate",""]
        ]);
        return success((new FxuserService())->getPage($data));
    }

    /**
     * 推广员详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new FxuserService())->getInfo($id));
    }

    /**
     * 添加推广员
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["type",0],
             ["name",""],
             ["mobile",""],
            ["idcard",""],
             ["sfz1",""],
             ["sfz2",""],
             ["ying_image",""],
            ["status",""],
            ["fail_msg",""],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\fxuser\Fxuser.add');
        $id = (new FxuserService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 推广员编辑
     * @param $id  推广员id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["type",0],
             ["name",""],
             ["mobile",""],
             ["idcard",""],
             ["sfz1",""],
             ["sfz2",""],
             ["ying_image",""],
             ["status",""],
            ["fail_msg",""],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\fxuser\Fxuser.edit');
        (new FxuserService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 推广员删除
     * @param $id  推广员id
     * @return \think\Response
     */
    public function del(int $id){
        (new FxuserService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new FxuserService())->getMemberAll());
    }

}

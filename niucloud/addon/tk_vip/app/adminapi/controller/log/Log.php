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

namespace addon\tk_vip\app\adminapi\controller\log;

use core\base\BaseAdminController;
use addon\tk_vip\app\service\admin\log\LogService;


/**
 * 会员日志控制器
 * Class Log
 * @package addon\tk_vip\app\adminapi\controller\log
 */
class Log extends BaseAdminController
{
   /**
    * 获取会员日志列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["level_id",""],
             ["type",""],
             ["body",""],
             ["create_time",["",""]]
        ]);
        return success((new LogService())->getPage($data));
    }

    /**
     * 会员日志详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LogService())->getInfo($id));
    }

    /**
     * 添加会员日志
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["type",""],
             ["body",""],
             ["over_time",0],

        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\log\Log.add');
        $id = (new LogService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 会员日志编辑
     * @param $id  会员日志id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["level_id",0],
             ["type",""],
             ["body",""],
             ["over_time",0],

        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\log\Log.edit');
        (new LogService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员日志删除
     * @param $id  会员日志id
     * @return \think\Response
     */
    public function del(int $id){
        (new LogService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new LogService())->getMemberAll());
    }

    public function getMemberLevelAll(){
         return success(( new LogService())->getMemberLevelAll());
    }

}

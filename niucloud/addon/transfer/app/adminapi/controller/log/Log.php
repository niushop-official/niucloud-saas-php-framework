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

namespace addon\transfer\app\adminapi\controller\log;

use core\base\BaseAdminController;
use addon\transfer\app\service\admin\LogService;


/**
 * 资产转赠记录控制器
 * Class Log
 * @package addon\transfer\app\adminapi\controller\log
 */
class Log extends BaseAdminController
{
   /**
    * 获取资产转赠记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["account_type",""],
             ["order_no",""],
             ["member_id",""],
             ["to_member_id",""],
             ["meno",""],
             ["create_time",["",""]]
        ]);
        return success((new LogService())->getPage($data));
    }

    /**
     * 资产转赠记录详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new LogService())->getInfo($id));
    }

    /**
     * 添加资产转赠记录
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["account_type",""],
             ["member_id",0],
             ["to_member_id",0],
             ["zhuan_money",0.00],
             ["give_money",0.00],
             ["meno",""],

        ]);
        $this->validate($data, 'addon\transfer\app\validate\log\Log.add');
        $id = (new LogService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 资产转赠记录编辑
     * @param $id  资产转赠记录id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["account_type",""],
             ["member_id",0],
             ["to_member_id",0],
             ["zhuan_money",0.00],
             ["give_money",0.00],
             ["meno",""],

        ]);
        $this->validate($data, 'addon\transfer\app\validate\log\Log.edit');
        (new LogService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 资产转赠记录删除
     * @param $id  资产转赠记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new LogService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new LogService())->getMemberAll());
    }

}

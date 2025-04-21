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

namespace addon\ttcard\app\adminapi\controller\ordertype;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\ordertype\OrdertypeService;


/**
 * 会员等级控制器
 * Class Ordertype
 * @package addon\ttcard\app\adminapi\controller\ordertype
 */
class Ordertype extends BaseAdminController
{
   /**
    * 获取会员等级列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["name",""],
             ["diy_name",""],
             ["type",""]
        ]);
        return success((new OrdertypeService())->getPage($data));
    }

    /**
     * 会员等级详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrdertypeService())->getInfo($id));
    }

    /**
     * 添加会员等级
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["name",""],
             ["diy_name",""],
             ["type",""],
             ["duration",0],
             ["tips",""],
             ["create_website_num",0],
             ["create_card_num",0],
             ["originalprice",0.00],
             ["price",0.00]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\ordertype\Ordertype.add');
        $id = (new OrdertypeService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 会员等级编辑
     * @param $id  会员等级id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["name",""],
             ["diy_name",""],
             ["type",""],
             ["duration",0],
             ["tips",""],
             ["create_website_num",0],
             ["create_card_num",0],
             ["originalprice",0.00],
             ["price",0.00]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\ordertype\Ordertype.edit');
        (new OrdertypeService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 会员等级删除
     * @param $id  会员等级id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrdertypeService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}

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

namespace addon\ttcard\app\adminapi\controller\cases;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\cases\CasesService;


/**
 * 成功案例管理控制器
 * Class Cases
 * @package addon\ttcard\app\adminapi\controller\cases
 */
class Cases extends BaseAdminController
{
   /**
    * 获取成功案例管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["card_id",""],
             ["website_id",""],
             ["title",""],
             ["create_time",""],
             ["status",""]
        ]);
        return success((new CasesService())->getPage($data));
    }

    /**
     * 成功案例管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CasesService())->getInfo($id));
    }

    /**
     * 添加成功案例管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],
             ["website_id",0],
             ["title",""],
             ["video",""],
             ["description",""],
             ["images",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cases\Cases.add');
        $id = (new CasesService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 成功案例管理编辑
     * @param $id  成功案例管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],
             ["website_id",0],
             ["title",""],
             ["video",""],
             ["description",""],
             ["images",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\cases\Cases.edit');
        (new CasesService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 成功案例管理删除
     * @param $id  成功案例管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new CasesService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new CasesService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new CasesService())->getCardAll());
    }

    public function getWebsiteAll(){
         return success(( new CasesService())->getWebsiteAll());
    }

}

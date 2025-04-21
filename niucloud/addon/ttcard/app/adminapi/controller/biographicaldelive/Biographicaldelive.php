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

namespace addon\ttcard\app\adminapi\controller\biographicaldelive;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\biographicaldelive\BiographicaldeliveService;


/**
 * 简历投递管理控制器
 * Class Biographicaldelive
 * @package addon\ttcard\app\adminapi\controller\biographicaldelive
 */
class Biographicaldelive extends BaseAdminController
{
   /**
    * 获取简历投递管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",""],
             ["to_user_id",""],
             ["recruit_id",""],
             ["biographical_id",""],
             ["view_status",""],
             ["create_time",""]
        ]);
        return success((new BiographicaldeliveService())->getPage($data));
    }

    /**
     * 简历投递管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new BiographicaldeliveService())->getInfo($id));
    }

    /**
     * 添加简历投递管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",0],
             ["to_user_id",0],
             ["recruit_id",0],
             ["biographical_id",0],
             ["view_status",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\biographicaldelive\Biographicaldelive.add');
        $id = (new BiographicaldeliveService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 简历投递管理编辑
     * @param $id  简历投递管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["from_user_id",0],
             ["to_user_id",0],
             ["recruit_id",0],
             ["biographical_id",0],
             ["view_status",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\biographicaldelive\Biographicaldelive.edit');
        (new BiographicaldeliveService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 简历投递管理删除
     * @param $id  简历投递管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new BiographicaldeliveService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new BiographicaldeliveService())->getUserAll());
    }

    public function getRecruitAll(){
         return success(( new BiographicaldeliveService())->getRecruitAll());
    }

    public function getBiographicalAll(){
         return success(( new BiographicaldeliveService())->getBiographicalAll());
    }

}

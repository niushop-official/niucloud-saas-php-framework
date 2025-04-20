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

namespace addon\ttcard\app\adminapi\controller\recruit;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\recruit\RecruitService;


/**
 * 招聘管理控制器
 * Class Recruit
 * @package addon\ttcard\app\adminapi\controller\recruit
 */
class Recruit extends BaseAdminController
{
   /**
    * 获取招聘管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["status",""],
             ["recruit_status",""],
             ["website_id",""],
             ["industry_id",""],
             ["title",""],
             ["position",""],
             ["type_status",""],
             ["education",""],
             ["create_time",""]
        ]);
        return success((new RecruitService())->getPage($data));
    }

    /**
     * 招聘管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new RecruitService())->getInfo($id));
    }

    /**
     * 添加招聘管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["recruit_status",""],
             ["website_id",0],
             ["industry_id",0],
             ["scale",""],
             ["title",""],
             ["position",""],
             ["type_status",""],
             ["education",""],
             ["content",""],
             ["city",""],
             ["address",""],
             ["age",""],
             ["month_salary",""],
             ["tags",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\recruit\Recruit.add');
        $id = (new RecruitService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 招聘管理编辑
     * @param $id  招聘管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["recruit_status",""],
             ["website_id",0],
             ["industry_id",0],
             ["scale",""],
             ["title",""],
             ["position",""],
             ["type_status",""],
             ["education",""],
             ["content",""],
             ["city",""],
             ["address",""],
             ["age",""],
             ["month_salary",""],
             ["tags",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\recruit\Recruit.edit');
        (new RecruitService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 招聘管理删除
     * @param $id  招聘管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new RecruitService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new RecruitService())->getUserAll());
    }

    public function getWebsiteAll(){
         return success(( new RecruitService())->getWebsiteAll());
    }

    public function getIndustryAll(){
         return success(( new RecruitService())->getIndustryAll());
    }

}

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

namespace addon\ttcard\app\service\admin\recruit;

use addon\ttcard\app\model\recruit\Recruit;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\website\Website;
use addon\ttcard\app\model\industry\Industry;

use core\base\BaseAdminService;


/**
 * 招聘管理服务层
 * Class RecruitService
 * @package addon\ttcard\app\service\admin\recruit
 */
class RecruitService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Recruit();
    }

    /**
     * 获取招聘管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,user_id,status,recruit_status,website_id,industry_id,scale,title,position,type_status,education,content,city,address,age,month_salary,tags,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["user_id","status","recruit_status","website_id","industry_id","title","position","type_status","education","create_time"], $where)->with(['user','website','industry'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取招聘管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,user_id,status,recruit_status,website_id,industry_id,scale,title,position,type_status,education,content,city,address,age,month_salary,tags,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','website','industry'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
   $info['recruit_status'] = strval($info['recruit_status']);
   $info['type_status'] = strval($info['type_status']);
        return $info;
    }

    /**
     * 添加招聘管理
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 招聘管理编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除招聘管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getUserAll(){
       $userModel = new User();
       return $userModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getWebsiteAll(){
       $websiteModel = new Website();
       return $websiteModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getIndustryAll(){
       $industryModel = new Industry();
       return $industryModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

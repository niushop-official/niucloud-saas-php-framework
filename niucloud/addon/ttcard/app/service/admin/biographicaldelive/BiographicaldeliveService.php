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

namespace addon\ttcard\app\service\admin\biographicaldelive;

use addon\ttcard\app\model\biographicaldelive\Biographicaldelive;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\recruit\Recruit;
use addon\ttcard\app\model\biographical\Biographical;

use core\base\BaseAdminService;


/**
 * 简历投递管理服务层
 * Class BiographicaldeliveService
 * @package addon\ttcard\app\service\admin\biographicaldelive
 */
class BiographicaldeliveService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Biographicaldelive();
    }

    /**
     * 获取简历投递管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,status,from_user_id,to_user_id,recruit_id,biographical_id,view_status,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["status","from_user_id","to_user_id","recruit_id","biographical_id","view_status","create_time"], $where)->with(['user','user2','recruit','biographical'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取简历投递管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,status,from_user_id,to_user_id,recruit_id,biographical_id,view_status,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','user2','recruit','biographical'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
   $info['view_status'] = strval($info['view_status']);
        return $info;
    }

    /**
     * 添加简历投递管理
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
     * 简历投递管理编辑
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
     * 删除简历投递管理
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

    public function getRecruitAll(){
       $recruitModel = new Recruit();
       return $recruitModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getBiographicalAll(){
       $biographicalModel = new Biographical();
       return $biographicalModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

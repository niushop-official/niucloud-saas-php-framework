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

namespace addon\ttcard\app\service\admin\authentication;

use addon\ttcard\app\model\authentication\Authentication;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\website\Website;
use addon\ttcard\app\model\ordertype\Ordertype;
use core\base\BaseAdminService;


/**
 * 认证信息管理服务层
 * Class AuthenticationService
 * @package addon\ttcard\app\service\admin\authentication
 */
class AuthenticationService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Authentication();
    }

    /**
     * 获取认证信息管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,status,examine_status,user_id,website_id,ordertype_id,ordertype_diyname,name,idcard_num,idcard_z_image,idcard_f_image,businesslicense_image,tips,create_time,update_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","status","examine_status","user_id","website_id","ordertype_id","ordertype_diyname","name","idcard_num","tips","create_time"], $where)->with(['user','website','ordertype'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取认证信息管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,status,examine_status,user_id,website_id,ordertype_id,ordertype_diyname,name,idcard_num,idcard_z_image,idcard_f_image,businesslicense_image,tips,create_time,update_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','website','ordertype'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加认证信息管理
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
     * 认证信息管理编辑
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
     * 删除认证信息管理
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
    public function getOrdertypeAll(){
        $ordertypeModel = new Ordertype();
        return $ordertypeModel->where("type","authentication")->where([["site_id","=",$this->site_id]])->select()->toArray();
     }
}

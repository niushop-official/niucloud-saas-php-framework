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

namespace addon\ttcard\app\service\admin\biographical;

use addon\ttcard\app\model\biographical\Biographical;
use addon\ttcard\app\model\user\User;

use core\base\BaseAdminService;


/**
 * 简历管理服务层
 * Class BiographicalService
 * @package addon\ttcard\app\service\admin\biographical
 */
class BiographicalService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Biographical();
    }

    /**
     * 获取简历管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,user_id,status,name,phone,avatar,age,gender_status,email,wechat_num,position,expected,working,type_status,education,city,advantage_content,experience_content,learning_content,certificate_images,unemployed_status,delive_num,view_num,reporttime,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["user_id","status","name","phone","gender_status","email","wechat_num","position","type_status","education","unemployed_status","create_time"], $where)->with(['user'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $key => $value) {
            $list['data'][$key]['reporttime'] = $value['reporttime'] ? date('Y-m-d', $value['reporttime']) :'-';
        }
        return $list;
    }

    /**
     * 获取简历管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,user_id,status,name,phone,avatar,age,gender_status,email,wechat_num,position,expected,working,type_status,education,city,advantage_content,experience_content,learning_content,certificate_images,unemployed_status,delive_num,view_num,reporttime,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
   $info['gender_status'] = strval($info['gender_status']);
   $info['type_status'] = strval($info['type_status']);
   $info['unemployed_status'] = strval($info['unemployed_status']);
        return $info;
    }

    /**
     * 添加简历管理
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
     * 简历管理编辑
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
     * 删除简历管理
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

}

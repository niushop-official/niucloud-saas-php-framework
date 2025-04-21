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

namespace addon\ttcard\app\service\admin\user;

use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\ordertype\Ordertype;

use core\base\BaseAdminService;


/**
 * 用户管理服务层
 * Class UserService
 * @package addon\ttcard\app\service\admin\user
 */
class UserService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new User();
    }

    /**
     * 获取用户管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,status,username,password,salt,openid,avatar,nickname,token,phone,ordertype_id,expirationtime,grade_status,prelogintime,logintime,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["status","username","nickname","phone","ordertype_id","expirationtime","grade_status","prelogintime","logintime","create_time"], $where)->with(['ordertype'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $key => $value) {
            $list['data'][$key]['expirationtime'] = $value['expirationtime'] ? date('Y-m-d H:i:s', $value['expirationtime']) :'-';
            $list['data'][$key]['prelogintime'] = $value['prelogintime'] ? date('Y-m-d H:i:s', $value['prelogintime']) :'-';
            $list['data'][$key]['logintime'] = $value['logintime'] ? date('Y-m-d H:i:s', $value['logintime']) :'-';
        }
        return $list;
    }

    /**
     * 获取用户管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,status,username,password,salt,openid,avatar,nickname,token,phone,ordertype_id,expirationtime,grade_status,prelogintime,logintime,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['ordertype'])->findOrEmpty()->toArray();
        $info['status'] = strval($info['status']);
        $info['grade_status'] = strval($info['grade_status']);
        $info['expirationtime'] = $info['expirationtime'] ? date('Y-m-d H:i:s', $info['expirationtime']) :'';
        return $info;
    }

    /**
     * 添加用户管理
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
     * 用户管理编辑
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
     * 删除用户管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getOrdertypeAll(){
       $ordertypeModel = new Ordertype();
       return $ordertypeModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

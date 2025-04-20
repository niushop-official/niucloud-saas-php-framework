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

namespace addon\ttcard\app\service\admin\ordertype;

use addon\ttcard\app\model\ordertype\Ordertype;

use core\base\BaseAdminService;


/**
 * 会员等级服务层
 * Class OrdertypeService
 * @package addon\ttcard\app\service\admin\ordertype
 */
class OrdertypeService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Ordertype();
    }

    /**
     * 初始化数据
     * @param array $where
     * @return array
     */
    public function initData()
    {
        $hasData = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->count();
        if($hasData>0){
            return;
        }
        $source = $this->model->where('site_id' , 0)->select()->toArray();
        foreach ($source as $key => $value) {
            $value['site_id'] = $this->site_id;
            unset($value['id']);
            $this->model->create($value);
        }
    }
    /**
     * 获取会员等级列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $this->initData();
        $field = 'id,site_id,real_id,status,name,diy_name,type,duration,tips,create_website_num,create_card_num,originalprice,price';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["status","name","diy_name","type"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取会员等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,real_id,status,name,diy_name,type,duration,tips,create_website_num,create_card_num,originalprice,price';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加会员等级
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
     * 会员等级编辑
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
     * 删除会员等级
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
}

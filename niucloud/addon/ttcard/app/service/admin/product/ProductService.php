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

namespace addon\ttcard\app\service\admin\product;

use addon\ttcard\app\model\product\Product;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\card\Card;
use addon\ttcard\app\model\website\Website;

use core\base\BaseAdminService;


/**
 * 产品管理服务层
 * Class ProductService
 * @package addon\ttcard\app\service\admin\product
 */
class ProductService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Product();
    }

    /**
     * 获取产品管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,user_id,card_id,website_id,title,price,originalprice,sales_num,inventory_num,quota_num,video,images,description,create_time,status';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["user_id","card_id","website_id","title","create_time","status"], $where)->with(['user','card','website'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取产品管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,user_id,card_id,website_id,title,price,originalprice,sales_num,inventory_num,quota_num,video,images,description,create_time,status';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','card','website'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加产品管理
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
     * 产品管理编辑
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
     * 删除产品管理
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

    public function getCardAll(){
       $cardModel = new Card();
       return $cardModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getWebsiteAll(){
       $websiteModel = new Website();
       return $websiteModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

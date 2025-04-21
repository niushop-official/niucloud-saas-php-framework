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

namespace addon\ttcard\app\service\admin\website;

use addon\ttcard\app\model\website\Website;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\card\Card;
use addon\ttcard\app\model\industry\Industry;

use core\base\BaseAdminService;


/**
 * 微官网管理服务层
 * Class WebsiteService
 * @package addon\ttcard\app\service\admin\website
 */
class WebsiteService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Website();
    }

    /**
     * 获取微官网管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,status,user_id,card_id,team_card_ids,industry_id,swiper_images,name,phone,wechat_num,weixin_image,address,logo,description,video,images,minicode_image,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","status","user_id","card_id","team_card_ids","industry_id","name","phone","wechat_num","address","create_time"], $where)->with(['user','card','industry'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取微官网管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,status,user_id,card_id,team_card_ids,industry_id,swiper_images,name,phone,wechat_num,weixin_image,address,logo,description,video,images,minicode_image,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','card','industry'])->findOrEmpty()->toArray();
        $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加微官网管理
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
     * 微官网管理编辑
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
     * 删除微官网管理
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

    public function getIndustryAll(){
       $industryModel = new Industry();
       return $industryModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

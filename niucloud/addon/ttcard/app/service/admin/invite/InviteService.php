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

namespace addon\ttcard\app\service\admin\invite;

use addon\ttcard\app\model\invite\Invite;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\website\Website;
use addon\ttcard\app\model\card\Card;

use core\base\BaseAdminService;


/**
 * 微官网邀请管理服务层
 * Class InviteService
 * @package addon\ttcard\app\service\admin\invite
 */
class InviteService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Invite();
    }

    /**
     * 获取微官网邀请管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,status,from_user_id,from_website_id,to_user_id,to_user_card_id,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["status","from_user_id","from_website_id","to_user_id","to_user_card_id","create_time"], $where)->with(['user','website','user2','card'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取微官网邀请管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,status,from_user_id,from_website_id,to_user_id,to_user_card_id,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','website','user2','card'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加微官网邀请管理
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
     * 微官网邀请管理编辑
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
     * 删除微官网邀请管理
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

    public function getCardAll(){
       $cardModel = new Card();
       return $cardModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

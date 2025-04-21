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

namespace addon\ttcard\app\service\admin\impressionlog;

use addon\ttcard\app\model\impressionlog\Impressionlog;
use addon\ttcard\app\model\impression\Impression;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\card\Card;

use core\base\BaseAdminService;


/**
 * 个人印象日志管理服务层
 * Class ImpressionlogService
 * @package addon\ttcard\app\service\admin\impressionlog
 */
class ImpressionlogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Impressionlog();
    }

    /**
     * 获取个人印象日志管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,impression_id,user_id,card_id,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["impression_id","user_id","card_id","create_time"], $where)->with(['impression','user','card'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取个人印象日志管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,impression_id,user_id,card_id,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['impression','user','card'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加个人印象日志管理
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
     * 个人印象日志管理编辑
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
     * 删除个人印象日志管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getImpressionAll(){
       $impressionModel = new Impression();
       return $impressionModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getUserAll(){
       $userModel = new User();
       return $userModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getCardAll(){
       $cardModel = new Card();
       return $cardModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

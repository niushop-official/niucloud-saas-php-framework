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

namespace addon\ttcard\app\service\admin\cardmsg;

use addon\ttcard\app\model\cardmsg\Cardmsg;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\card\Card;

use core\base\BaseAdminService;


/**
 * 消息管理服务层
 * Class CardmsgService
 * @package addon\ttcard\app\service\admin\cardmsg
 */
class CardmsgService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Cardmsg();
    }

    /**
     * 获取消息管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,type_status,status,form_user_id,to_user_id,card_id,title,content,create_time';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","type_status","status","form_user_id","to_user_id","card_id","title","content","create_time"], $where)->with(['user','touser','card'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取消息管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,type_status,status,form_user_id,to_user_id,card_id,title,content,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','touser','card'])->findOrEmpty()->toArray();
   $info['type_status'] = strval($info['type_status']);
   $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加消息管理
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
     * 消息管理编辑
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
     * 删除消息管理
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

}

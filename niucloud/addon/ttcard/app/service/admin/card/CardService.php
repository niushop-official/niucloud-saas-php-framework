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

namespace addon\ttcard\app\service\admin\card;

use addon\ttcard\app\model\card\Card;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\industry\Industry;
use addon\ttcard\app\model\cardbackground\Cardbackground;

use core\base\BaseAdminService;


/**
 * 名片管理服务层
 * Class CardService
 * @package addon\ttcard\app\service\admin\card
 */
class CardService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Card();
    }

    /**
     * 获取名片管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,user_id,status,auditing_status,industry_id,avatar,name,gender,age,phone,position,tags,email,address,wechat_num,wechat_code_image,card_bg_id,card_diy_bg,description,video,recommend,default_status,connections_status,weigh,minicode_image,createtime';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["user_id","status","auditing_status","industry_id","name","phone","position","email","wechat_num","recommend","default_status","connections_status","createtime"], $where)->with(['user','industry','cardbackground'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $key => $value) {
            $list['data'][$key]['createtime'] = date('Y-m-d H:i:s', $value['createtime']);
        }
        return $list;
    }

    /**
     * 获取名片管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,user_id,status,auditing_status,industry_id,avatar,name,gender,age,phone,position,tags,email,address,wechat_num,wechat_code_image,card_bg_id,card_diy_bg,description,video,recommend,default_status,connections_status,weigh,minicode_image,createtime';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','industry','cardbackground'])->findOrEmpty()->toArray();
   $info['status'] = strval($info['status']);
   $info['gender'] = strval($info['gender']);
   $info['recommend'] = strval($info['recommend']);
   $info['default_status'] = strval($info['default_status']);
   $info['connections_status'] = strval($info['connections_status']);
        return $info;
    }

    /**
     * 添加名片管理
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
     * 名片管理编辑
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
     * 删除名片管理
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

    public function getIndustryAll(){
       $industryModel = new Industry();
       return $industryModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getCardbackgroundAll(){
       $cardbackgroundModel = new Cardbackground();
       return $cardbackgroundModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

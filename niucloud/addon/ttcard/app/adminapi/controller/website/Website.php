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

namespace addon\ttcard\app\adminapi\controller\website;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\website\WebsiteService;


/**
 * 微官网管理控制器
 * Class Website
 * @package addon\ttcard\app\adminapi\controller\website
 */
class Website extends BaseAdminController
{
   /**
    * 获取微官网管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["status",""],
             ["user_id",""],
             ["card_id",""],
             ["team_card_ids",""],
             ["industry_id",""],
             ["name",""],
             ["phone",""],
             ["wechat_num",""],
             ["address",""],
             ["create_time",""]
        ]);
        return success((new WebsiteService())->getPage($data));
    }

    /**
     * 微官网管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new WebsiteService())->getInfo($id));
    }

    /**
     * 添加微官网管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["status",""],
             ["user_id",0],
             ["card_id",0],
             ["team_card_ids",""],
             ["industry_id",0],
             ["swiper_images",""],
             ["name",""],
             ["phone",""],
             ["wechat_num",""],
             ["weixin_image",""],
             ["address",""],
             ["logo",""],
             ["description",""],
             ["video",""],
             ["images",""],
             ["minicode_image",""],
             ["create_time",0]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\website\Website.add');
        $id = (new WebsiteService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 微官网管理编辑
     * @param $id  微官网管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["status",""],
             ["user_id",0],
             ["card_id",0],
             ["team_card_ids",""],
             ["industry_id",0],
             ["swiper_images",""],
             ["name",""],
             ["phone",""],
             ["wechat_num",""],
             ["weixin_image",""],
             ["address",""],
             ["logo",""],
             ["description",""],
             ["video",""],
             ["images",""],
             ["minicode_image",""],
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\website\Website.edit');
        (new WebsiteService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 微官网管理删除
     * @param $id  微官网管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new WebsiteService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new WebsiteService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new WebsiteService())->getCardAll());
    }

    public function getIndustryAll(){
         return success(( new WebsiteService())->getIndustryAll());
    }

}

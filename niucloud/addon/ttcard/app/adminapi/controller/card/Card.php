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

namespace addon\ttcard\app\adminapi\controller\card;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\card\CardService;


/**
 * 名片管理控制器
 * Class Card
 * @package addon\ttcard\app\adminapi\controller\card
 */
class Card extends BaseAdminController
{
   /**
    * 获取名片管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["status",""],
             ["auditing_status",""],
             ["industry_id",""],
             ["name",""],
             ["phone",""],
             ["position",""],
             ["email",""],
             ["wechat_num",""],
             ["recommend",""],
             ["default_status",""],
             ["connections_status",""],
             ["createtime",["",""]]
        ]);
        return success((new CardService())->getPage($data));
    }

    /**
     * 名片管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CardService())->getInfo($id));
    }

    /**
     * 添加名片管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["auditing_status",""],
             ["industry_id",0],
             ["avatar",""],
             ["name",""],
             ["gender",""],
             ["age",""],
             ["phone",0],
             ["position",""],
             ["tags",""],
             ["email",""],
             ["address",""],
             ["wechat_num",""],
             ["wechat_code_image",""],
             ["card_bg_id",0],
             ["card_diy_bg",""],
             ["description",""],
             ["video",""],
             ["recommend",""],
             ["default_status",""],
             ["connections_status",""],
             ["weigh",0],
             ["minicode_image",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\card\Card.add');
        $id = (new CardService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 名片管理编辑
     * @param $id  名片管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["status",""],
             ["auditing_status",""],
             ["industry_id",0],
             ["avatar",""],
             ["name",""],
             ["gender",""],
             ["age",""],
             ["phone",0],
             ["position",""],
             ["tags",""],
             ["email",""],
             ["address",""],
             ["wechat_num",""],
             ["wechat_code_image",""],
             ["card_bg_id",0],
             ["card_diy_bg",""],
             ["description",""],
             ["video",""],
             ["recommend",""],
             ["default_status",""],
             ["connections_status",""],
             ["weigh",0],
             ["minicode_image",""],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\card\Card.edit');
        (new CardService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 名片管理删除
     * @param $id  名片管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new CardService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new CardService())->getUserAll());
    }

    public function getIndustryAll(){
         return success(( new CardService())->getIndustryAll());
    }

    public function getCardbackgroundAll(){
         return success(( new CardService())->getCardbackgroundAll());
    }

}

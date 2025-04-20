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

namespace addon\qiankun_vip_card\app\adminapi\controller\card;

use core\base\BaseAdminController;
use addon\qiankun_vip_card\app\service\admin\card\CardService;


/**
 * 会员卡密控制器
 * Class Card
 * @package addon\qiankun_vip_card\app\adminapi\controller\card
 */
class Card extends BaseAdminController
{
   /**
    * 获取会员卡密列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["level_id",""],
             ["member_id",""],
             ["order_id",""],
             ["card_no",""],
             ["use_time",["",""]],
             ["create_time",["",""]]
        ]);
        return success((new CardService())->getPage($data));
    }

    
    public function getMemberLevelAll(){
         return success(( new CardService())->getMemberLevelAll());
    }

    public function getMemberAll(){
         return success(( new CardService())->getMemberAll());
    }

    public function getOrderAll(){
         return success(( new CardService())->getOrderAll());
    }

}

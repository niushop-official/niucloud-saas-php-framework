<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\api\controller\goods;

use addon\vipcard\app\service\api\goods\CardService;
use core\base\BaseApiController;


/**
 * 卡项控制器
 * Class Service
 * @package addon\vipcard\app\adminapi\controller\goods
 */
class Card extends BaseApiController
{
   /**
    * 获取卡项列表
    * @return \think\Response
    */
    public function pages(){
        $data = $this->request->params([
             ["goods_name",""],
        ]);
        return success((new CardService())->getPage($data));
    }

    /**
     * 卡项详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new CardService())->getInfo($id));
    }

    /**
     * 获取列表
     * @param int $id
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["limit",10],
        ]);
        return success((new CardService())->getLists($data));
    }
}

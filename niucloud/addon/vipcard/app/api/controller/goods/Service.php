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

use addon\vipcard\app\service\api\goods\GoodsService;
use core\base\BaseApiController;


/**
 * 服务项目控制器
 * Class Service
 * @package addon\vipcard\app\api\controller\goods
 */
class Service extends BaseApiController
{
   /**
    * 获取服务项目列表
    * @return \think\Response
    */
    public function pages(){
        $data = $this->request->params([
             ["goods_name",""],
             ["create_time",""],
             ["category_id", ""]
        ]);
        return success((new GoodsService())->getPage($data));
    }

    /**
     * 服务项目详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new GoodsService())->getInfo($id));
    }

    /**
     * 获取服务项目列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["limit",""],
        ]);
        return success((new GoodsService())->getList($data));
    }
}

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

namespace addon\tourism\app\api\controller\scenic;

use addon\tourism\app\service\api\scenic\ScenicService;
use core\base\BaseAdminController;


/**
 * 景点
 * Class Scenic
 * @package addon\tourism\app\api\controller\scenic
 */
class Scenic extends BaseAdminController
{
   /**
    * 获取景点列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
            ["scenic_name",""],
            ["search_name",""],
            ["scenic_level",""],
            ["create_time",[]],
            ['order', 'create_time desc']
        ]);
        return success((new ScenicService())->getPage($data));
    }

    /**
     * 景点详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $scenic_id){
        return success((new ScenicService())->getInfo($scenic_id));
    }

    /**
     * 获取门票价格日历
     */
    public function goodsDay(int $goods_id){
        return success((new ScenicService())->getGoodsDay($goods_id));
    }

    /**
     * 推荐景点
     * @return void
     */
    public function recommend() {
        $data = $this->request->params([
            ["limit", 4],
            ['goods_ids', []]
        ]);
        return success((new ScenicService())->getRecommend($data));
    }

    /**
     * 景点门票
     * @param int $scenic_id
     * @return void
     */
    public function ticket(int $scenic_id){
        $data = $this->request->params([
            ["date", ""],
        ]);
        return success((new ScenicService())->getTicketList($scenic_id));
    }
}

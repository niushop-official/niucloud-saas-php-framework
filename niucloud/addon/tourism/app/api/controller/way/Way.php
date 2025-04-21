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

namespace addon\tourism\app\api\controller\way;

use addon\tourism\app\service\api\way\WayService;
use addon\tourism\app\dict\way\WayTagDict;
use core\base\BaseApiController;

/**
 * 线路管理
 * Class Way
 * @package addon\tourism\app\api\controller\way
 */
class Way extends BaseApiController
{
   /**
    * 获取线路列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
            ["way_name", ""],
            ["search_name",""],
            ["start_city",""],
            ["end_city",""],
            ["status", ""],
            ["create_time",["",""]],
            ['order', 'create_time desc']
        ]);
        return success((new WayService())->getPage($data));
    }

    /**
     * 线路详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $way_id){
        return success((new WayService())->getInfo($way_id));
    }

    /**
     * 获取线路标签
     * @return \think\Response
     */
    public function getLabel(){
        return success('ADD_SUCCESS', ['data' => WayTagDict::getTag()]);
    }

    /**
     * 获取线路价格日历
     */
    public function goodsDay(int $way_id){
        return success((new WayService())->getGoodsDay($way_id));
    }

    /**
     * 推荐路线
     * @return void
     */
    public function recommend() {
        $data = $this->request->params([
            ["limit", 4],
            ['goods_ids', []]
        ]);
        return success((new WayService())->getRecommend($data));
    }
}

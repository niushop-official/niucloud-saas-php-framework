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

namespace addon\tourism\app\adminapi\controller\way;

use addon\tourism\app\service\admin\way\WayService;
use core\base\BaseAdminController;
use addon\tourism\app\dict\way\WayTagDict;
use addon\tourism\app\service\admin\goods\GoodsDayService;

/**
 * 线路管理
 * Class Way
 * @package addon\tourism\app\adminapi\controller\way
 */
class Way extends BaseAdminController
{
   /**
    * 获取线路列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
            ["way_name",""],
            ["start_city",""],
            ["end_city",""],
            ["status", ""],
            ["create_time",["",""]]
        ]);
        return success((new WayService())->getPage($data));
    }

    /**
     * 线路详情
     * @param int $way_id
     * @return \think\Response
     */
    public function info(int $way_id){
        return success((new WayService())->getInfo($way_id));
    }

    /**
     * 添加线路
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["way_name",""],
            ["start_city",''],
            ["end_city",''],
            ["way_character",""],
            ["fee_desc",""],
            ["group_buy_type",""],
            ["way_theme", ""],
            ["travel_type", ""],
            ["way_traffic", ""],
            ["poster_id", 0],
        ]);

        $goods_data = $this->request->params([
            ["goods_cover", ""],
            ["goods_image", ""],
            ["stock", ""],
            ["price", ""],
            ["member_discount", ""],
            ["buy_info", ""]
        ]);
        $data['way_cover'] = $goods_data['goods_cover'] ?? '';
        $data['way_image'] = $goods_data['goods_image'] ?? '';
        return success('ADD_SUCCESS', (new WayService())->add($data, $goods_data));
    }

    /**
     * 线路编辑
     * @param $id
     * @return \think\Response
     */
    public function edit($way_id){
        $data = $this->request->params([
            ["way_name",""],
            ["start_city",''],
            ["end_city",''],
            ["way_character",""],
            ["fee_desc",""],
            ["group_buy_type",""],
            ["way_theme", ""],
            ["travel_type", ""],
            ["way_traffic", ""],
            ["way_image", ""],
            ["poster_id", 0],
        ]);
        $goods_data = $this->request->params([
            ["goods_cover", ""],
            ["goods_image", ""],
            ["stock", ""],
            ["price", ""],
            ["member_discount", ""],
            ["buy_info", ""]
        ]);
        
        (new WayService())->edit($way_id, $data, $goods_data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取线路标签
     * @return \think\Response
     */
    public function getLabel(){
        return success('ADD_SUCCESS', ['data' => WayTagDict::getTag()]);
    }

    /**
     * 更改线路状态
     */
    public function editStatus(int $way_id){
        $data = $this->request->params([
            ["way_status", 0],
        ]);
        (new WayService())->modifyWayStatus($way_id, $data['way_status']);
        return success();
    }

    /**
     * 添加价格日历
     */
    public function addDatePrice(){
        $data = $this->request->params([
            [ "is_set",1 ],
            [ "price",0.00 ],
            [ "goods_id",""],
            [ "start_date",""],
            [ "end_date",""],
            [ "member_price",""],
        ]);
        (new GoodsDayService())->addDatePrice($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取门票列表
     * @return \think\Response
     */
    public function datePriceLists(){
        $data = $this->request->params([
            ["goods_id",""],
        ]);
        return success((new GoodsDayService())->getPage($data['goods_id']));
    }

    /**
     * 获取选择线路列表
     * @return \think\Response
     */
    public function select(){
        $data = $this->request->params([
            ["way_name",""],
            ["start_city",""],
            ["end_city",""],
            ["status", ""],
            ["create_time",["",""]]
        ]);
        return success((new WayService())->getSelectPage($data));
    }

}

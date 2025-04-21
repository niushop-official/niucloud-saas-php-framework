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

namespace addon\vipcard\app\adminapi\controller\goods;

use core\base\BaseAdminController;
use addon\vipcard\app\service\admin\goods\GoodsService;


/**
 * 服务项目控制器
 * Class Service
 * @package addon\vipcard\app\adminapi\controller\goods
 */
class Service extends BaseAdminController
{
   /**
    * 获取服务项目列表
    * @return \think\Response
    */
    public function lists(){
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
     * 添加服务项目
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["goods_name",""],
             ["goods_cover",""],
             ["goods_image",""],
             ["category_id",0],
             ["goods_content",""],
             ["buy_info",""],
             ["verify_validity_type",0],
             ["verify_validity",0],
             ["status",0],
             ["price",0.00],
             ["is_reserve",0],
             ["is_reserve_pay",0],
             ["virtually_sale", 0]
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Service.add');
        $id = (new GoodsService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 服务项目编辑
     * @param $id  服务项目id
     * @return \think\Response
     */
    public function edit($id){
        $data = $this->request->params([
            ["goods_name",""],
            ["goods_cover",""],
            ["goods_image",""],
            ["category_id",0],
            ["goods_content",""],
            ["buy_info",""],
            ["verify_validity_type",0],
            ["verify_validity",0],
            ["status",0],
            ["price",0.00],
            ["is_reserve",0],
            ["is_reserve_pay",0],
            ["virtually_sale", 0]
        ]);
        $this->validate($data, 'addon\vipcard\app\validate\Service.edit');
        (new GoodsService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 服务项目删除
     * @param $id  服务项目id
     * @return \think\Response
     */
    public function del(int $id){
        (new GoodsService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取列表不分页
     */
    public function getLists()
    {
        $data = $this->request->params([
            ["goods_name",""],
            ["create_time",""],
            ["category_id", ""]
        ]);
        return success((new GoodsService())->getLists($data));
    }

    /**
     * 服务上下架
     */
    public function editStatus($id){
        $data = $this->request->params([
            ["status", 0],
        ]);
        (new GoodsService())->editStatus($id, $data);
        return success('SUCCESS');
    }

    /**
     * 更新排序
     * @param int $id
     * @return \think\Response
     */
    public function editSort(int $id){
        $data = $this->request->params([
            ["sort",0],
        ]);
        (new GoodsService())->editSort($id, $data);
        return success('SUCCESS');
    }

    /**
     * 项目搜索列表接口
     * @return \think\Response
     */
    public function select(){
        $data = $this->request->params([
            ["goods_name",""],
        ]);
        return success((new GoodsService())->getSelectPage($data));
    }
}

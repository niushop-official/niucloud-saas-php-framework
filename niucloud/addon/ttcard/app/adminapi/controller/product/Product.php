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

namespace addon\ttcard\app\adminapi\controller\product;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\product\ProductService;


/**
 * 产品管理控制器
 * Class Product
 * @package addon\ttcard\app\adminapi\controller\product
 */
class Product extends BaseAdminController
{
   /**
    * 获取产品管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["user_id",""],
             ["card_id",""],
             ["website_id",""],
             ["title",""],
             ["create_time",""],
             ["status",""]
        ]);
        return success((new ProductService())->getPage($data));
    }

    /**
     * 产品管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new ProductService())->getInfo($id));
    }

    /**
     * 添加产品管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],
             ["website_id",0],
             ["title",""],
             ["price",0.00],
             ["originalprice",0.00],
             ["sales_num",0],
             ["inventory_num",0],
             ["quota_num",0],
             ["video",""],
             ["images",""],
             ["description",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\product\Product.add');
        $id = (new ProductService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 产品管理编辑
     * @param $id  产品管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["user_id",0],
             ["card_id",0],
             ["website_id",0],
             ["title",""],
             ["price",0.00],
             ["originalprice",0.00],
             ["sales_num",0],
             ["inventory_num",0],
             ["quota_num",0],
             ["video",""],
             ["images",""],
             ["description",""],
             ["status",""]
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\product\Product.edit');
        (new ProductService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 产品管理删除
     * @param $id  产品管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new ProductService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new ProductService())->getUserAll());
    }

    public function getCardAll(){
         return success(( new ProductService())->getCardAll());
    }

    public function getWebsiteAll(){
         return success(( new ProductService())->getWebsiteAll());
    }

}

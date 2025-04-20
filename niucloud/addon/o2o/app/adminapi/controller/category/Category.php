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

namespace addon\o2o\app\adminapi\controller\category;

use addon\o2o\app\model\Goods;
use core\base\BaseAdminController;
use addon\o2o\app\service\admin\goods_category\GoodsCategoryService;


/**
 *  商品分类控制器
 * Class O2oGoodsCategory
 * @package app\adminapi\controller\o2o_goods_category
 */
class Category extends BaseAdminController
{
   /**
    * 获取 商品分类列表
    * @return \think\Response
    */
    public function lists()
    {
        $data = $this->request->params([
             ["category_name",""],
             ["create_time",[]]
        ]);
        return success((new GoodsCategoryService())->getPage($data));
    }

    /**
     *  商品分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new GoodsCategoryService())->getInfo($id));
    }

    /**
     * 添加 商品分类
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
             ["category_name",""],
             ["image",""],
             ["sort",0],
             ['pid', 0]
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Category.add');
        $id = (new GoodsCategoryService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     *  商品分类编辑
     * @param $id   商品分类id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
             ["category_name",""],
             ["image",""],
             ["sort",0],
             ['pid', 0]
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Category.add');
        (new GoodsCategoryService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     *  商品分类删除
     * @param $id   商品分类id
     * @return \think\Response
     */
    public function del(int $id)
    {
        $use_num = (new Goods())->getCountByCategoryID($id);
        if($use_num > 0){
            return fail('O2O_GOODS_CATEGORY_BE_USED');
        }
        (new GoodsCategoryService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取分级分类
     */
    public function getCategoryList()
    {
        $data = $this->request->params([
            ["type", 1]
        ]);
        return success((new GoodsCategoryService())->getList($data['type']));
    }
    /**
     * 获取分级分类
     */
    public function tree()
    {
        return success((new GoodsCategoryService())->getTree());
    }

}

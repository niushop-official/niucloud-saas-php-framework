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

namespace addon\shop\app\adminapi\controller\goods;

use core\base\BaseAdminController;
use addon\shop\app\service\admin\goods\CategoryService;


/**
 * 商品分类控制器
 * Class Category
 * @package addon\shop\app\adminapi\controller\goods
 */
class Category extends BaseAdminController
{
    /**
     * 获取商品分类列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "category_name", "" ]
        ]);
        return success(( new CategoryService() )->getPage($data));
    }

    /**
     * 获取商品分类列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ 'level', '' ]
        ]);
        return success(( new CategoryService() )->getList($data));
    }

    /**
     * 获取商品分类树结构
     * @return \think\Response
     */
    public function tree()
    {
        return success(( new CategoryService() )->getTree());
    }

    /**
     * 商品分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new CategoryService() )->getInfo($id));
    }

    /**
     * 添加商品分类
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ "image", "" ],
            [ "pid", 0 ],
            [ "is_show", 0 ],
            [ "sort", 0 ]
        ]);
        $this->validate($data, 'addon\shop\app\validate\goods\Category.add');
        $id = ( new CategoryService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 商品分类编辑
     * @param $id  商品分类id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ "image", "" ],
            [ "pid", 0 ],
            [ "is_show", 0 ],
            [ "sort", '' ]
        ]);
        $this->validate($data, 'addon\shop\app\validate\goods\Category.edit');
        ( new CategoryService() )->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 商品分类删除
     * @param $id  商品分类id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new CategoryService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 拖拽修改分类
     */
    public function editCategory()
    {
        $data = $this->request->params([
            [ "category_sort_array", [] ]
        ]);
        ( new CategoryService() )->updateCategory($data);
        return success('SUCCESS');
    }

    /**
     * 设置商品分类配置
     * @return \think\Response
     */
    public function setGoodsCategoryConfig()
    {
        $data = $this->request->params([
            [ "level", "" ],
            [ "template", "" ],
            [ "page_title", "" ],
            [ "search", "" ],
            [ "goods", "" ],
            [ "sort", "" ],
            [ "cart", '' ],
        ]);
        ( new CategoryService() )->setGoodsCategoryConfig($data);
        return success('SUCCESS');
    }

    /**
     * 获取商品分类配置
     * @return \think\Response
     */
    public function getGoodsCategoryConfig()
    {
        return success(( new CategoryService() )->getGoodsCategoryConfig());
    }

    /**
     * 获取商品分类树结构供弹框调用
     * @return \think\Response
     */
    public function components()
    {
        return success(( new CategoryService() )->getTreeComponents());
    }
}

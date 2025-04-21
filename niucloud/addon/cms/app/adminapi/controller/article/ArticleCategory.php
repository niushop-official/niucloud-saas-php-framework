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

namespace addon\cms\app\adminapi\controller\article;

use addon\cms\app\service\admin\article\ArticleCategoryService;
use core\base\BaseAdminController;
use think\Response;

class ArticleCategory extends BaseAdminController
{
    /**
     * 文章分类列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'name', '' ],
        ]);
        return success(( new ArticleCategoryService() )->getPage($data));
    }

    /**
     * 查询所有分类(文章添加，编辑，索引)
     * @return Response
     */
    public function all()
    {
        return success(( new ArticleCategoryService() )->getAll());
    }

    /**
     * 文章分类详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(( new ArticleCategoryService() )->getInfo($id));
    }

    /**
     * 添加文章分类
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ 'name', '' ],
            [ 'is_show', 1 ],
            [ 'sort', 0 ],
        ]);
        $this->validate($data, 'addon\cms\app\validate\article\ArticleCategory.add');
        $id = ( new ArticleCategoryService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 文章分类编辑
     * @param int $category_id //分类id
     * @return Response
     */
    public function edit(int $category_id)
    {
        $data = $this->request->params([
            [ 'name', '' ],
            [ 'is_show', 1 ],
            [ 'sort', 0 ],
        ]);
        $this->validate($data, 'addon\cms\app\validate\article\ArticleCategory.edit');
        ( new ArticleCategoryService() )->edit($category_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 文章分类删除
     * @param int $category_id
     * @return Response
     */
    public function del(int $category_id)
    {
        ( new ArticleCategoryService() )->del($category_id);
        return success('DELETE_SUCCESS');
    }

}

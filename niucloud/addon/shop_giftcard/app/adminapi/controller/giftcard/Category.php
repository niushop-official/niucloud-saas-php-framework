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

namespace addon\shop_giftcard\app\adminapi\controller\giftcard;

use addon\shop_giftcard\app\service\admin\giftcard\CategoryService;
use core\base\BaseAdminController;


/**
 * 礼品卡分类控制器
 * Class Category
 * @package addon\shop_giftcard\app\adminapi\controller\giftcard
 */
class Category extends BaseAdminController
{

    /**
     * 获取礼品卡分类分页列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ 'status', '' ],
            [ 'order', '' ],
            [ 'sort', '' ]
        ]);
        return success(( new CategoryService() )->getPage($data));
    }

    /**
     * 获取礼品卡分类列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ 'status', '' ]
        ]);
        return success(( new CategoryService() )->getList($data));
    }

    /**
     * 礼品卡分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success(( new CategoryService() )->getInfo($id));
    }

    /**
     * 添加礼品卡分类
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ 'status', 0 ],
            [ "sort", 0 ]
        ]);
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Category.add');
        $id = ( new CategoryService() )->add($data);
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 礼品卡分类编辑
     * @param $id  礼品卡分类id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            [ "category_name", "" ],
            [ 'status', 0 ],
            [ "sort", 0 ]
        ]);
        $data['category_id'] = $id;
        $this->validate($data, 'addon\shop_giftcard\app\validate\giftcard\Category.edit');
        ( new CategoryService() )->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 礼品卡分类删除
     * @param $id  礼品卡分类id
     * @return \think\Response
     */
    public function del(int $id)
    {
        ( new CategoryService() )->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改礼品卡分类排序号
     * @return \think\Response
     */
    public function modifySort()
    {
        $data = $this->request->params([
            [ 'category_id', '' ],
            [ 'sort', '' ],
        ]);
        ( new CategoryService() )->modifySort($data);
        return success('SUCCESS');
    }

    /**
     * 修改礼品卡分类状态
     * @return \think\Response
     */
    public function modifyStatus()
    {
        $data = $this->request->params([
            [ 'category_id', '' ],
            [ 'status', '' ],
        ]);
        ( new CategoryService() )->modifyStatus($data);
        return success('SUCCESS');
    }

}

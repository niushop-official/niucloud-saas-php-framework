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

namespace addon\vipcard\app\service\api\goods;

use addon\vipcard\app\model\GoodsCategory;
use core\base\BaseApiService;

/**
 *  商品分类服务层
 * Class GoodsCategoryService
 * @package addon\vipcard\app\service\api\goods
 */
class GoodsCategoryService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GoodsCategory();
    }

    /**
     * 获取 商品分类列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'category_name,image,category_id,site_id';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "category_name", "create_time" ], $where)->field($field)->order($order)->append([ 'image_thumb_small' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取 商品分类信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'category_name,image,category_id,pid,site_id';

        $info = $this->model->field($field)->where([ [ 'category_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->append([ 'image_thumb_small' ])->toArray();
        return $info;
    }

    /**
     * 查询分类树
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getTree()
    {
        $list = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->order("create_time desc")->select()->toArray();
        $tree = list_to_tree($list, 'category_id', 'pid', 'children');
        return $tree;
    }

    /**
     * 查询分类列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getChildId(int $pid)
    {
        return $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'pid', '=', $pid ] ])->column('category_id');
    }

}

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

namespace addon\vipcard\app\service\admin\goods_category;

use addon\vipcard\app\model\GoodsCategory;
use core\base\BaseAdminService;

/**
 *  商品分类服务层
 * Class VipcardGoodsCategoryService
 * @package app\service\admin\vipcard_goods_category
 */
class GoodsCategoryService extends BaseAdminService
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

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["category_name","create_time"], $where)->field($field)->order($order)->append(['image_thumb_small']);
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

        $info = $this->model->field($field)->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->append(['image_thumb_small'])->toArray();
        return $info;
    }

    /**
     * 添加 商品分类
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['level'] = 1;
        if($data['pid'] > 0){
            $data['level'] = 2;
        }

        $res = $this->model->create($data);
        return $res->category_id;

    }

    /**
     *  商品分类编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['update_time'] = time();
        $data['level'] = 1;
        if($data['pid'] > 0){
            $data['level'] = 2;
        }
        $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除 商品分类
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['category_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 查询所有数据列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getList($type = 1){
        $list = $this->model->where([['site_id', '=', $this->site_id], ['level', '=', 1]])->field("category_id, category_name")->order("create_time desc")->select()->toArray();
        if($list && $type == 2){
            foreach ($list as $key => $val){
                $list[$key]['children'] = $this->model->where([['site_id', '=', $this->site_id], ['pid', '=', $val['category_id']]])->field("category_id, category_name")->order("create_time desc")->select()->toArray();
            }
        }

        return $list;
    }
    /**
     * 查询所有数据列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getTree(){
        $list = $this->model->where([['site_id', '=', $this->site_id]])->field("category_id,pid,category_name,image,site_id")->order("create_time desc")->append(['image_thumb_small'])->select()->toArray();
        $tree = list_to_tree($list, 'category_id', 'pid', 'children');
        return $tree;
    }

}

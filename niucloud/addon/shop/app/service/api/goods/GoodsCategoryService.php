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

namespace addon\shop\app\service\api\goods;

use addon\shop\app\model\goods\Category;
use addon\shop\app\service\core\goods\CoreGoodsCategoryService;
use core\base\BaseApiService;

/**
 *  商品分类服务层
 */
class GoodsCategoryService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Category();
    }

    /**
     * 查询商品分类树结构
     * @param string $field
     * @param string $order
     * @return array
     */
    public function getTree()
    {
        return ( new CoreGoodsCategoryService() )->getTree([ [ 'is_show', '=', 1 ], [ 'site_id', '=', $this->site_id ] ], 'category_id,category_name,image,level,pid,category_full_name');
    }

    /**
     * 获取商品分类配置
     * @return array
     */
    public function getGoodsCategoryConfig()
    {
        return ( new CoreGoodsCategoryService() )->getGoodsCategoryConfig($this->site_id);
    }

    /**
     * 获取商品分类列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'category_id,category_name,image,level,pid,category_full_name')
    {
        $order = 'sort desc,create_time desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ], [ 'is_show', '=', 1 ] ])->withSearch([ "category_name", 'level', 'category_id', 'pid' ], $where)->field($field)->order($order)->select()->toArray();
    }

}

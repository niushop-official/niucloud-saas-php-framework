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

namespace addon\vipcard\app\service\admin\goods;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\model\Goods;
use core\base\BaseAdminService;

/**
 * 商品服务层(项目)
 * Class GoodsService
 * @package addon\vipcard\app\service\admin\goods
 */
class GoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取商品列表(service)
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,is_reserve,is_reserve_pay,virtually_sale';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id], ['goods_type', '=', GoodsDict::SERVICE ]])->withSearch(["goods_name","create_time","category_id"], $where)->field($field)->with('category')->order($order)->append(['cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,buy_info,goods_content,is_reserve,is_reserve_pay,virtually_sale';

        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->with('category')->findOrEmpty()->append(['cover_thumb_small','image_thumb_small'])->toArray();
        return $info;
    }

    /**
     * 添加商品
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['goods_type'] = GoodsDict::SERVICE;
        $data['category_id'] = $data['category_id'][1] ?? $data['category_id'][0];
        $res = $this->model->create($data);
        return $res->goods_id;

    }

    /**
     * 商品编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['goods_type'] = GoodsDict::SERVICE;
        $data['category_id'] = is_array($data['category_id']) ? $data['category_id'][1] ?? $data['category_id'][0] : $data['category_id'];
        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除商品
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 获取项目列表不分页
     * @param array $where
     * @return array
     */
    public function getLists(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,virtually_sale';
        $order = 'create_time desc';

        $list = $this->model->where([['site_id', '=', $this->site_id], ['goods_type', '=', GoodsDict::SERVICE]])->withSearch(["goods_name","create_time","categroy_id"], $where)->field($field)->with('category')->order($order)->append(['cover_thumb_small'])->select()->toArray();
        return $list;
    }

    /**
     * 项目上下架
     */
    public function editStatus($id, $data){
        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 修改排序
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function editSort(int $id, array $data)
    {
        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 获取搜索上架项目列表(service)
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,create_time,update_time,price,is_reserve,is_reserve_pay,virtually_sale';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id], ['goods_type', '=', GoodsDict::SERVICE ],['status','=',1]])->withSearch(["goods_name","create_time","category_id"], $where)->field($field)->with('category')->order($order)->append(['cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

}

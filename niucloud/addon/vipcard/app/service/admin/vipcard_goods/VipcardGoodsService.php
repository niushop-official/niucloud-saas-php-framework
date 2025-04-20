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

namespace addon\vipcard\app\service\admin\vipcard_goods;

use addon\vipcard\app\model\Goods;
use core\base\BaseAdminService;

/**
 * 商品表服务层
 * Class VipcardGoodsService
 * @package app\service\admin\vipcard_goods
 */
class VipcardGoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取商品表列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,card_type,common_num,create_time,update_time,price';
        $order = '';

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["goods_name","goods_type","category_id","status","card_type","create_time","update_time","price"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品表信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_type,goods_cover,goods_image,category_id,sale_num,verify_validity_type,verify_validity,status,sort,card_type,common_num,create_time,update_time,price';

        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商品表
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->goods_id;

    }

    /**
     * 商品表编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除商品表
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

}
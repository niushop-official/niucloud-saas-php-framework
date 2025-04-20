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

namespace addon\shop_giftcard\app\service\admin\giftcard;


use addon\shop_giftcard\app\model\giftcard\GiftcardGoods;
use core\base\BaseAdminService;


/**
 * 礼品卡关联商品服务层
 * Class GiftcardGoodsService
 * @package addon\shop_giftcard\app\service\admin\giftcard
 */
class GiftcardGoodsService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new GiftcardGoods();
    }

    /**
     * 获取礼品卡关联商品分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,giftcard_id,goods_id,sku_id,num';
        $order = '';

        $search_model = $this->model->where($where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取礼品卡关联商品列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'id,giftcard_id,goods_id,sku_id,num')
    {
        $order = '';
        return $this->model->where($where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取礼品卡关联商品信息
     * @param int $id
     * @return array
     */
    public function getInfo($id)
    {
        $field = 'id,giftcard_id,goods_id,sku_id,num';

        $info = $this->model->field($field)->where([ [ 'id', "=", $id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加礼品卡关联商品
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 批量添加
     * @param $data
     * @return bool
     */
    public function addAll($data)
    {
        $this->model->insertAll($data);
        return true;
    }

    /**
     * 礼品卡关联商品编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit($id, array $data)
    {
        $this->model->where([ [ 'id', '=', $id ] ])->update($data);
        return true;
    }

    /**
     * 删除礼品卡关联商品
     * @param int $id
     * @return bool
     */
    public function del($id)
    {
        $model = $this->model->where([ [ 'id', '=', $id ] ])->find();
        $res = $model->delete();
        return $res;
    }

    /**
     * 批量删除礼品卡关联商品
     * @param array $condition
     * @return mixed
     */
    public function delBatch($condition = [])
    {
        $res = $this->model->where($condition)->select()->delete();
        return $res;
    }

}

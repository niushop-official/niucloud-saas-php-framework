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

namespace addon\qiankun_recovery\app\service\admin\order;

use addon\qiankun_recovery\app\model\order\Order;

use core\base\BaseAdminService;


/**
 * 推N返本订单服务层
 * Class OrderService
 * @package addon\qiankun_recovery\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取推N返本订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [], $with = [])
    {
        $field = 'id,order.order_no,order.order_goods_id,order.member_id,g.goods_name,g.goods_image,s.sku_image,s.sku_name,order.goods_id,goods_price,rules,after,type,is_full,current,order.create_time';
        $order = 'id desc';

        $search_model = $this->model
            ->alias('order')
            ->withJoin($with)
            ->when(isset($where['order_no']) && $where['order_no'], function ($query) use ($where) {
                $query->where('order.order_no', 'like', "%{$where['order_no']}%");
            })
            ->when(isset($where['goods_id']) && $where['goods_id'], function ($query) use ($where) {
                $query->where('g.goods_name', 'like', "%{$where['goods_id']}%");
            })
            ->when(isset($where['user_id']) && $where['user_id'], function ($query) use ($where) {
                $query->where('order.member_id', $where['user_id']);
            })
            ->join('shop_order so', 'so.order_no = order.order_no')
            ->join('shop_order_goods g', 'g.order_id = so.order_id')
            ->join('shop_goods_sku s', 's.sku_id = order.sku_id')
            ->where([['order.site_id', "=", $this->site_id], ['g.is_gift', "=", 0]])
            ->withSearch(["id", "member_id"], $where)
            ->field($field)
            ->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取推N返本订单信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,order_no,order_goods_id,member_id,goods_id,sku_id,goods_price,rules,after,type,is_full,current,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加推N返本订单
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 推N返本订单编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id]])->update($data);
        return true;
    }

    /**
     * 删除推N返本订单
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id]])->find();
        $res = $model->delete();
        return $res;
    }


}

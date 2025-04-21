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

namespace addon\qiankun_recovery\app\adminapi\controller\order;

use core\base\BaseAdminController;
use addon\qiankun_recovery\app\service\admin\order\OrderService;


/**
 * 推N返本订单控制器
 * Class Order
 * @package addon\qiankun_recovery\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
    /**
     * 获取推N返本订单列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["order_no", ""],
            ["member_id", ""],
            ["goods_id", ""],
        ]);
        return success((new OrderService())->getPage($data, ['member']));
    }

    /**
     * 推N返本订单详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加推N返本订单
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            ["order_no", ""],
            ["member_id", 0],
            ["goods_id", 0],
            ["sku_id", 0],
            ["goods_price", 0.00],
            ["rules", ""],
            ["after", 0.00],
            ["type", 0],
            ["is_full", 0],
            ["current", 0],

        ]);
        $this->validate($data, 'addon\qiankun_recovery\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 推N返本订单编辑
     * @param $id  推N返本订单id
     * @return \think\Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ["order_no", ""],
            ["member_id", 0],
            ["goods_id", 0],
            ["sku_id", 0],
            ["goods_price", 0.00],
            ["rules", ""],
            ["after", 0.00],
            ["type", 0],
            ["is_full", 0],
            ["current", 0],

        ]);
        $this->validate($data, 'addon\qiankun_recovery\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 推N返本订单删除
     * @param $id  推N返本订单id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }


}

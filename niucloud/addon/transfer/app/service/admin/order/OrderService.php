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

namespace addon\transfer\app\service\admin\order;

use addon\transfer\app\model\order\Order;

use core\base\BaseAdminService;
use addon\transfer\app\model\log\log as Tlog;
use addon\transfer\app\dict\order\OrderDict;

/**
 * 转赠支付订单服务层
 * Class OrderService
 * @package addon\transfer\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取转赠支付订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'order_id,site_id,order_no,order_from,out_trade_no,order_status,member_id,ip,order_money,create_time,pay_time,close_time,log_id,order_type';
        $order = 'order_id desc';

        $search_model = $this->model->where('order_status',2)->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["order_no","out_trade_no","order_status","create_time"], $where)->with(['member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'pay' => function($query) {
            $query->field('');
        } ])->field($field)->order($order);

        $order_status = OrderDict::getStatus();

        $list = $this->pageQuery($search_model);


        foreach ($list[ 'data' ] as $k => &$v) {
            $list[ 'data' ][ $k ][ 'order_status_info' ] = $order_status[ $v[ 'order_status' ] ] ?? [];

            $v['pay_time'] = $v['pay_time']?date('Y-m-d H:i:s',$v['pay_time']):'';
        }


        return $list;
    }

    /**
     * 获取转赠支付订单信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'order_id,site_id,order_no,order_from,out_trade_no,order_status,member_id,ip,order_money,create_time,pay_time,close_time,log_id,order_type';

        $info = $this->model->field($field)->where([['order_id', "=", $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加转赠支付订单
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->order_id;

    }

    /**
     * 转赠支付订单编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除转赠支付订单
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['order_id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
}

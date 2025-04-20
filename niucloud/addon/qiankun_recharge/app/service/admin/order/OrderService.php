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

namespace addon\qiankun_recharge\app\service\admin\order;

use addon\qiankun_recharge\app\model\order\Order;
use app\model\member\Member;
use addon\qiankun_recharge\app\model\options\Options;

use core\base\BaseAdminService;


/**
 * 充值订单服务层
 * Class OrderService
 * @package addon\qiankun_recharge\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取充值订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,order_no,order_from,order_type,out_trade_no,member_id,recharge_id,give_coupon,give_integral,give_price,paid,pay_time,refund_status,create_time';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","order_no","order_from","member_id","recharge_id","paid","pay_time","refund_status","create_time"], $where)->with(['member','options'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取充值订单信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,order_no,order_from,order_type,out_trade_no,member_id,recharge_id,give_coupon,give_integral,give_price,paid,pay_time,refund_status,create_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member','options'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加充值订单
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 充值订单编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除充值订单
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getMemberAll(){
       $memberModel = new Member();
       return $memberModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getOptionsAll(){
       $optionsModel = new Options();
       return $optionsModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

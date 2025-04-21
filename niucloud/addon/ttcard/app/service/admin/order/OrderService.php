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

namespace addon\ttcard\app\service\admin\order;

use addon\ttcard\app\model\order\Order;
use addon\ttcard\app\model\user\User;
use addon\ttcard\app\model\ordertype\Ordertype;

use core\base\BaseAdminService;


/**
 * 订单管理服务层
 * Class OrderService
 * @package addon\ttcard\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取订单管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,order_num,pay_status,price,total_price,buy_num,address_id,user_id,authentication_id,product_id,ordertype_id,ordertype_viptype,order_type_diyname,paytime,create_time,status';
        $order = 'id desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["order_num","pay_status","user_id","authentication_id","ordertype_id","ordertype_viptype","order_type_diyname","paytime","create_time"], $where)->with(['user','ordertype'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $key => $value) {
            $list['data'][$key]['paytime'] = $value['paytime'] ? date('Y-m-d H:i:s', $value['paytime']) :'-';
        }
        return $list;
    }

    /**
     * 获取订单管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,order_num,pay_status,price,total_price,buy_num,address_id,user_id,authentication_id,product_id,ordertype_id,ordertype_viptype,order_type_diyname,paytime,create_time,status';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['user','ordertype'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加订单管理
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
     * 订单管理编辑
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
     * 删除订单管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    public function getUserAll(){
       $userModel = new User();
       return $userModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

    public function getOrdertypeAll(){
       $ordertypeModel = new Ordertype();
       return $ordertypeModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

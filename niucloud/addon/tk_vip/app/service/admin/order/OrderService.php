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

namespace addon\tk_vip\app\service\admin\order;

use addon\tk_vip\app\dict\order\OrderDict;
use addon\tk_vip\app\model\order\Order;
use app\model\member\Member;
use app\model\member\MemberLevel;

use core\base\BaseAdminService;


/**
 * VIP订单服务层
 * Class OrderService
 * @package addon\tk_vip\app\service\admin\order
 */
class OrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 获取VIP订单列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,member_id,order_from,order_id,body,level_id,sku_id,day,status,out_trade_no,pay_time,close_time,close_reason,remark,refund_status,create_time,update_time,delete_time,order_money,type,over_time';
        $order = 'update_time desc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["member_id","order_from","order_id","body","level_id","status","out_trade_no","update_time"], $where)->with(['member','memberLevel'])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        foreach ($list['data'] as $k => $v)
        {
            $list['data'][$k]['status_name'] = OrderDict::getOrderStatus($v['status'])['name'];
        }
        return $list;
    }

    /**
     * 获取VIP订单信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,member_id,order_from,order_id,body,level_id,sku_id,day,status,out_trade_no,pay_time,close_time,close_reason,remark,refund_status,create_time,update_time,delete_time';

        $info = $this->model->field($field)->where([['id', "=", $id]])->with(['member','memberLevel'])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加VIP订单
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
     * VIP订单编辑
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
     * 删除VIP订单
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

    public function getMemberLevelAll(){
       $memberLevelModel = new MemberLevel();
       return $memberLevelModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }

}

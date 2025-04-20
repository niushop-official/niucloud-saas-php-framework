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

namespace addon\zxprint\app\service\admin\zx_printlog;

use addon\zxprint\app\model\zx_printlog\ZxPrintlog;
use addon\shop\app\model\order\Order;
use addon\zxprint\app\service\YiLianYun;
use addon\shop\app\service\admin\order\OrderService;

use core\base\BaseAdminService;


/**
 * 小票打印记录服务层
 * Class ZxPrintlogService
 * @package addon\zxprint\app\service\admin\zx_printlog
 */
class ZxPrintlogService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ZxPrintlog();
    }

    /**
     * 获取小票打印记录列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,order_id,status,create_time,delete_time';
        $order = 'id asc';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["id","order_id","create_time"], $where)->field($field)->order($order);
        $list= $this->pageQuery($search_model, function ($values, $key) {
            $values['infos'] = (new OrderService())->getDetail($values['order_id']);
        });
        
        return $list;
    }

    /**
     * 添加小票打印记录
     * @param array $data
     * @return mixed
     */
    public function add()
    {
        $orderIds = (new Order())->where([ [ 'status' ,"=", 2 ] ])->whereDay('create_time')  
            ->whereNotIn('order_id', function ($query) {  
                $query->name('zx_printlog')->field('order_id');  
            })  
            ->select();
        foreach ($orderIds as $order) {  
            $data = [  
                'site_id' => $order['site_id'],
                'order_id' => $order['order_id'], 
                'status' => 0,
                'create_time' => time()
            ];  
            (new ZxPrintlog())->create($data);  
            (new YiLianYun())->one_print($order['order_id'],$order['site_id']);
        } 

    }

    /**
     * 删除小票打印记录
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id]])->find();
        $res = $model->delete();
        return $res;
    }
    
    /**
     * 进行小票打印
     * @param $id  小票打印记录订单order_id
     * @return \think\Response
     */
    public function print($order_id)
    {
        $infos = $this->model->where([['order_id', '=', $order_id]])->findOrEmpty()->toArray();
        return (new YiLianYun())->one_print($infos['order_id'],$infos['site_id']);
    }

    
    public function getOrderAll(){
       $orderModel = new Order();
       return $orderModel->where([["site_id","=",$this->site_id]])->select()->toArray();
    }


}

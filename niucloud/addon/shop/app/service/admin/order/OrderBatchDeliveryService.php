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

namespace addon\shop\app\service\admin\order;

use addon\shop\app\dict\order\OrderBatchDeliveryDict;
use addon\shop\app\model\order\OrderBatchDelivery;
use addon\shop\app\service\core\order\CoreOrderBatchDeliveryService;
use core\base\BaseAdminService;

/**
 *  订单配送服务层
 */
class OrderBatchDeliveryService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderBatchDelivery();
    }

    /**
     * 分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'id,site_id,main_id,status,type,total_num,success_num,fail_num,create_time,data, update_time, output, fail_output, fail_remark';
        $order = 'create_time desc';
        $search_model = $this->model
            ->where([ [ 'site_id', '=', $this->site_id ] ])
            ->withSearch([ 'status', 'type', 'create_time', 'main_id' ], $where)
            ->field($field)
            ->with([
                'user' => function($query) {
                    $query->field('uid, username, head_img, real_name');
                }
            ])->order($order)->append([ 'type_name', 'status_name' ]);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取详情
     * @param $id
     * @return array
     * @throws \think\db\exception\DbException
     */
    public function getInfo($id)
    {
        $field = 'id,site_id,main_id,status,type,total_num,success_num,fail_count,create_time,data, update_time, output, fail_output, fail_remark';
        return $this->model
            ->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'id', '=', $id ]
            ])
            ->field($field)
            ->with([
                'user' => function($query) {
                    $query->field('extend,order_goods_id, order_id, member_id, goods_id, sku_id, goods_name, sku_name, goods_image, sku_image, price, num, goods_money, is_enable_refund, goods_type, delivery_status, status,discount_money,site_id')->append([ 'delivery_status_name', 'status_name', 'goods_image_thumb_small' ]);
                }
            ])->append([ 'type_name', 'status_name' ])->findOrEmpty()->toArray();
    }

    /**
     * 加入批量发货任务
     * @param $data
     * @return void
     */
    public function addBatchOrderDelivery($data)
    {
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'type' ] = OrderBatchDeliveryDict::DELIVERY;
        $data[ 'main_id' ] = $this->uid;
        ( new CoreOrderBatchDeliveryService() )->add($data);
        return true;
    }

    /**
     * 手动执行任务
     * @param $id
     * @return void
     */
    public function execute($id)
    {
        return ( new CoreOrderBatchDeliveryService() )->execute($id, $this->site_id);
    }

}

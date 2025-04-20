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

namespace addon\shop\app\service\core\pointexchange;

use addon\shop\app\model\exchange\Exchange;
use core\base\BaseCoreService;


/**
 *  积分兑换订单服务层
 */
class CorePointexChangeService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Exchange();
    }

    /**
     * 获取积分商城详情
     * @param int $active_id
     * @return array
     */
    public function getInfo($where)
    {
        $field = 'stock,total_exchange_num,id,site_id,type,names,title,image,status,product_detail,point,price,limit_num,content,sort,total_point_num,total_price_num,total_order_num,total_member_num,update_time,create_time';
        $info = $this->model->withSearch([ 'names', 'status', 'create_time', 'product_detail', 'sku_id', 'goods_id' ], $where)->append([ 'type_name' ])->field($field)->findOrEmpty()->toArray();
        return $info;
    }

}
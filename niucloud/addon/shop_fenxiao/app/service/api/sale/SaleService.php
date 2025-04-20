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

namespace addon\shop_fenxiao\app\service\api\sale;

use addon\shop_fenxiao\app\model\sale\Sale;
use core\base\BaseApiService;


/**
 * 销售周期服务层
 */
class SaleService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Sale();
    }

    /**
     * 分页
     * @return void
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,period_type,sale_start_time,sale_end_time,total_order_money,total_reward_money,send_reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $order = 'id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['is_settlement'], $where)
            ->field($field)
            ->append(['period_type_name'])
            ->order($order);

        return $this->pageQuery($search_model);
    }

    /**
     * 获取当前最新的周期
     * @return Sale|array|mixed|\think\Model
     */
    public function getNowSalePeriod(){
        $field = 'id,site_id,period_type,sale_start_time,sale_end_time,total_order_money,total_reward_money,send_reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $now_time = time();
        //查询当前最新的周期
        return (new Sale())->where([
            ['site_id', '=', $this->site_id],
            ['sale_start_time', '<=', $now_time],
            ['sale_end_time', '>=', $now_time],
        ])->findOrEmpty()->toArray();
    }
}

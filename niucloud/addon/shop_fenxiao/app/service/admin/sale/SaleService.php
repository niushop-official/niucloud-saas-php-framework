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

namespace addon\shop_fenxiao\app\service\admin\sale;

use addon\shop_fenxiao\app\model\sale\Sale;
use addon\shop_fenxiao\app\service\core\sale\CoreSalePeriodService;
use core\base\BaseAdminService;
use think\db\exception\DbException;


/**
 * 销售周期服务层
 */
class SaleService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Sale();
    }

    /**
     * 分页
     * @return void`
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,period_type,sale_start_time,sale_end_time,total_order_money,total_reward_money,send_reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        $order = 'id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['is_settlement', 'is_send', 'settlement_time', 'send_time'], $where)
            ->field($field)
            ->append(['period_type_name'])
            ->order($order);

        return $this->pageQuery($search_model);
    }

    /**
     * 周期明细
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,period_type,sale_start_time,sale_end_time,total_order_money,total_reward_money,send_reward_money,is_settlement,settlement_time,create_time, is_send, send_time';
        return $this->model->where([['site_id', '=', $this->site_id], ['id', '=', $id]])
            ->field($field)
            ->append(['period_type_name'])
            ->findOrEmpty()->toArray();
    }

    /**
     * 发放销售奖励已结算的佣金
     * @param int $period_id
     * @return void
     */
    public function send(int $period_id)
    {
        return (new CoreSalePeriodService())->send($this->site_id, $period_id);
    }
}

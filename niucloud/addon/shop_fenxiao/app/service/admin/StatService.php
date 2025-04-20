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


namespace addon\shop_fenxiao\app\service\admin;


use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoApplyDict;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoApply;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoGoods;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrderGoods;
use app\model\member\Member;
use core\base\BaseAdminService;

/**
 * 统计服务层
 */
class StatService extends BaseAdminService
{
    /**
     * 佣金统计
     */
    public function accountStat()
    {
        //佣金统计
        $sum_commission = (new Member())->where([['site_id', '=', $this->site_id]])->field("sum(commission) as sum_commission, sum(commission_get) as sum_commission_get, sum(commission_cash_outing) as sum_commission_cash_outing")->findOrEmpty()->toArray();

        //订单佣金统计
        $unsettlement_commission = (new FenxiaoOrderGoods())->where([['is_refund', '=', 0], ['is_settlement', '=', 0], ['site_id', '=', $this->site_id]])->sum("commission");
        return [
            'sum_commission' => $sum_commission['sum_commission'] ?? 0.00,
            'sum_commission_get' => $sum_commission['sum_commission_get'] ?? 0.00,
            'sum_commission_cash_outing' => $sum_commission['sum_commission_cash_outing'] ?? 0.00,
            'unsettlement_commission' => $unsettlement_commission ?? 0
        ];
    }

    /**
     * 分销用户统计
     */
    public function fenxiaoMemberStat()
    {
        $apply_count = (new FenxiaoApply())->where([['site_id', '=', $this->site_id], ['status', '=', FenxiaoApplyDict::WAIT_AUDIT]])->count();
        $fenxiao_count = (new Fenxiao())->where([['site_id', '=', $this->site_id]])->count();
        $agent_count = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['is_agent', '=', 1]])->count();
        return [
            'apply_count' => $apply_count,
            'fenxiao_count' => $fenxiao_count,
            'agent_count' => $agent_count
        ];
    }

    /**
     * 分销佣金统计
     */
    public function commissionStat()
    {
        //佣金统计
        $sum_commission = (new Fenxiao())->where([['site_id', '=', $this->site_id]])
            ->field("sum(fenxiao_commission) as sum_fenxiao_commission, sum(agent_commission) as sum_agent_commission, 
         sum(team_commission) as sum_team_commission, sum(task_commission) as  sum_task_commission,sum(sale_commission) as sum_sale_commission")
            ->findOrEmpty()->toArray();

        //查询待结算的佣金
        $temp_wait_commission_list = (new FenxiaoOrderGoods())->where([['is_settlement', '=', 0]])->setOption('group', 'commission_type')
            ->field('commission_type, sum(commission) as sum_commission ')->select()->toArray();
        foreach ($temp_wait_commission_list as $v) {
            $sum_commission[$v['commission_type'] . '_sum_commission_wait'] = $v['sum_commission'];
        }
        $sum_commission = [
            'sum_fenxiao_commission' => $sum_commission['sum_fenxiao_commission'] ?? 0,
            'sum_agent_commission' => $sum_commission['sum_agent_commission'] ?? 0,
            'sum_team_commission' => $sum_commission['sum_team_commission'] ?? 0,
            'sum_task_commission' => $sum_commission['sum_task_commission'] ?? 0,
            'sum_sale_commission' => $sum_commission['sum_sale_commission'] ?? 0,
            'fenxiao_sum_commission_wait' => $sum_commission['fenxiao_sum_commission_wait'] ?? 0,
            'agent_sum_commission_wait' => $sum_commission['agent_sum_commission_wait'] ?? 0,
            'team_sum_commission_wait' => $sum_commission['team_sum_commission_wait'] ?? 0,
        ];
        return $sum_commission;
    }

    /**
     * 分销商品数
     */
    public function goodsStat()
    {
        $count = (new FenxiaoGoods())->where([
            ['site_id', '=', $this->site_id],
            ['is_fenxiao', '=', 1],//参与分销
        ])->count();
        return $count;
    }

    /**
     * 一周7天内分销商增加统计
     */
    public function fenxiaoWeekStat()
    {
        $data = [];
        $times = $this->getWeekTime();
        $fenxiao_list = (new Fenxiao())->where([['site_id', '=', $this->site_id], ['create_time', '>=', $times[0]]])->field('member_id,create_time')->select()->toArray();
        for ($i = 0; $i < 7; $i++) {
            $data[$i]['date'] = date('Y-m-d', $times[$i]);
            $data[$i]['num'] = 0;
            if (!empty($fenxiao_list)) {
                foreach ($fenxiao_list as $key => $value) {
                    $check_time = strtotime($value['create_time']);
                    if (($check_time >= $times[$i]) && ($check_time < $times[$i + 1])) {
                        $data[$i]['num'] += 1;
                    }
                }
            }
        }
        return $data;

    }

    /**
     * 获取一周内的时间戳
     */
    private function getWeekTime()
    {
        $currentDate = date('Y-m-d');
        $date_time = [];
        $date_time[7] = time();
        for ($i = 0; $i < 7; $i++) {
            $date_time[$i] = strtotime($currentDate . ' +' . $i - 6 . ' days');
        }
        return $date_time;
    }
}
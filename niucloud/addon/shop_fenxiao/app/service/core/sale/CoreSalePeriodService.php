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

namespace addon\shop_fenxiao\app\service\core\sale;

use addon\shop_fenxiao\app\dict\sale\SaleDict;
use addon\shop_fenxiao\app\model\sale\Sale;
use addon\shop_fenxiao\app\model\sale\SaleMember;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoDataService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoOrderService;
use app\service\core\member\CoreMemberAccountService;
use Carbon\Carbon;
use core\base\BaseCoreService;


/**
 * 销售奖励周期
 */
class CoreSalePeriodService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Sale();
    }

    /**
     * 自动结算
     * @param $site_id
     * @return true
     */
    public function autoSettlement($site_id)
    {

        //查看当前可结算的周期(待结算)
        $period = $this->model->where(
            [
                ['is_settlement', '=', 0],
                ['site_id', '=', $site_id]
            ]
        )->findOrEmpty();
        if (!$period->isEmpty()) {
            $this->settlement($site_id, [
                'period' => $period
            ]);
        } else {
            $this->create($site_id);
        }
        return true;
    }

    /**
     * 结算周期
     * @param $site_id
     * @return void
     */
    public function settlement($site_id, $data)
    {
        $config = (new CoreSaleConfigService())->getConfig($site_id);
//        if ($config['is_open'] != 1) return true;
        //销售门槛
        $condition_order_money = $config['condition']['order_money'];
        $period = $data['period'] ?? [];
        $reward_config = (new CoreSaleConfigService())->getRewardConfig($site_id);
        $last_rank = $reward_config['last_rank'];
        $reward_list = $reward_config['reward_list'];
        if (empty($period)) {
            $period_id = $data['period_id'];
            //查看当前可结算的周期(待结算)
            $period = $this->model->where(
                [
                    ['is_settlement', '=', 0],
                    ['id', '=', $period_id],
                    ['site_id', '=', $site_id]
                ]
            )->findOrEmpty();
        } else {
            $period_id = $period['id'];
        }
        $total_reward_money = 0;
        //必须存在可结算的奖励
        $sale_member = new SaleMember();
        if (!$period->isEmpty()) {
            //todo  优化可以用生成器或分批次
            //按照排序来发放佣金
            $sale_member_list = $sale_member->where(
                [
                    ['period_id', '=', $period_id],
                    ['site_id', '=', $site_id],
                    ['is_settlement', '=', 0],
                    ['order_money', '>=', $condition_order_money]
                ]
            )->order('order_money desc, id asc')->limit($last_rank)->select();
            if (!$sale_member_list->isEmpty()) {
                foreach ($sale_member_list as $k => $sale_member_v) {
                    $item_rank = $k + 1;
                    //超出最后一名就不需要再进行了
                    if ($item_rank > $last_rank) break;
                    //判断排行是否符合排名区间
                    foreach ($reward_list as $reward_list_v) {
                        $reward_list_v_start = $reward_list_v['start'];
                        $reward_list_v_end = $reward_list_v['end'];
                        //判断当前排名是否符合区间
                        if ($item_rank >= $reward_list_v_start && $item_rank <= $reward_list_v_end) {
//                            $item_member_id = $sale_member_v['member_id'];
                            $reward_list_v_reward = $reward_list_v['reward'];
                            $reward_commission = $reward_list_v_reward['commission'];
                            //将这个记录设置为已经结算,并赋值奖励佣金
                            $sale_member_v->save([
                                'reward_money' => $reward_commission
                            ]);
                            $total_reward_money += $reward_commission;
                        }
                    }
                }
            }
            $now_time = time();
            //将这个销售周期设置为已结算
            //todo 判断当前时间是否大于结束时间,如果小于结束时间,就要将当前日期赋给这条记录
            $period_update_data = [
                'is_settlement' => 1,
                'settlement_time' => $now_time
            ];
            if ($period['sale_end_time'] > $now_time) {
                $period_update_data['sale_end_time'] = $now_time;
            }
            $period->save(array_merge($period_update_data, ['total_reward_money' => $total_reward_money]));
            //会员销售周期设置为已经结算
            $sale_member->where([
                ['site_id', '=', $site_id],
                ['is_settlement', '=', 0],
                ['period_id', '=', $period_id],
            ])->update($period_update_data);
        }
        //创建新的周期
        $this->create($site_id);

        //尝试发放奖励  开启手动发放要发放奖励
        if ($config['send_type'] == SaleDict::AUTO) {
            $this->send($site_id, $period);
        }
        return true;
    }

    /**
     * 创建新的周期
     * @param $site_id
     * @return void
     */
    public function create($site_id)
    {
        $config = (new CoreSaleConfigService())->getConfig($site_id);
        if ($config['is_open'] != 1) return true;
        $now_time = time();
        $now_date = date('Y-m-d');
        //查询当前最新的周期
        $sale_model = new Sale();
        $period = $sale_model->where([
            ['site_id', '=', $site_id],
            ['sale_start_time', '<=', $now_time],
            ['sale_end_time', '>=', $now_time],
            ['is_settlement', '=', 0]
        ])->findOrEmpty();
        if (!$period->isEmpty()) return true;
        $period_type = $config['period_type'];
        $period_date = $config['period'];
        $carbon = Carbon::now();
        $year = $carbon->year;
        $month = $carbon->month;
        $day = $carbon->day;
        switch ($period_type) {
            case SaleDict::MONTH:
                if ($day < $period_date) {
                    //如果大于这个月的最后一日,就用最后一日
                    $end_time = $this->getPeriodDateIfGtLastDay(
                        $period_date
                    );
                } else {
                    $end_time = $this->getPeriodDateIfGtLastDay(
                        $period_date,
                        strtotime("$now_date +1 month")
                    );
                }
                break;
            case SaleDict::QUARTER:
                $quarter_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
                foreach ($quarter_list as $k => $quarter_v) {
                    //判断所在季度
                    if (in_array($month, $quarter_v)) {
                        if ($month == $quarter_v[0] && $day < $period_date) {

                            $end_time = $this->getPeriodDateIfGtLastDay(
                                $period_date,
                                strtotime(date('Y-' . $month . '-' . '01'))
                            );
//                            $end_time = strtotime(date('Y-' . $month . '-' . $period_date . ' 00:00:00'));
                        } else {
                            $last_quarter = $quarter_list[($k + 1)] ?? $quarter_list[0];//下一个季度
                            $end_time = $this->getPeriodDateIfGtLastDay(
                                $period_date,
                                strtotime(date('Y-' . $last_quarter[0] . '-' . '01' ))
                            );
//                            $end_time = strtotime(date('Y-' . $last_quarter[0] . '-' . $period_date . ' 00:00:00'));
                        }
                    }
                }
                break;
            case SaleDict::YEAR:
                $temp_month = explode('-', $period_date)[0];
                $temp_day = explode('-', $period_date)[1];
                //当前日期是否小于年度结算日期
                if ($now_time < strtotime(date('Y-' . $period_date . ' 00:00:00'))) {
                    $end_time = $this->getPeriodDateIfGtLastDay(
                        $temp_day,
                        strtotime(date('Y-' . $temp_month . '-' . '01' ))
                    );
//                    $end_time = strtotime(date('Y-' . $period_date . ' 00:00:00'));
                } else {
                    $end_time = $this->getPeriodDateIfGtLastDay(
                        $temp_day,
                        strtotime(date(($year + 1) . '-' . $temp_month . '-' . '01' ))
                    );
//                    $end_time = strtotime(date(($year + 1) . '-' . $period_date . ' 00:00:00'));
                }
                break;
        }
        $insert_data = [
            'site_id' => $site_id,
            'sale_start_time' => $now_time,
            'sale_end_time' => $end_time,
            'period_type' => $period_type,
        ];
        $sale_model->create($insert_data);
        return true;
    }

    /**
     * 日期是否大于当月最后一日
     * @param $period_date
     * @param $time
     * @return false|int
     */
    public function getPeriodDateIfGtLastDay($period_date, $time = null)
    {
        $now_month_last_day = date('t', $time);
        if($period_date > $now_month_last_day){
            $period_date = $now_month_last_day;
        }
        return strtotime(date('Y-m-' . $period_date . ' 00:00:00', $time));
    }
    /**
     * 发放这个周期的奖励
     * @param $site_id
     * @param $period_id
     * @return void
     */
    public function send($site_id, $period_id)
    {
        //按照排序来发放佣金
        $sale_member = new SaleMember();
        $where = [
            ['period_id', '=', $period_id],
            ['site_id', '=', $site_id],
            ['is_settlement', '=', 1],
            ['is_send', '=', 0],
        ];
        $sale_member_list = $sale_member->where($where)->select();
        if (!empty($sale_member_list)) {
            $core_member_account = new CoreMemberAccountService();
            $core_fenxiao_order = new CoreFenxiaoOrderService();
            foreach ($sale_member_list as $sale_member_v) {
                $item_member_id = $sale_member_v['member_id'];
                $reward_commission = $sale_member_v['reward_money'];
                CoreFenxiaoDataService::setCommission($site_id, $item_member_id, $reward_commission, 'sale', $period_id);
//                //累加分团队分红佣金
//                $core_fenxiao_order->incCommission($site_id, $item_member_id, 'sale', $reward_commission);
//                //累计增加会员佣金
//                $core_member_account->addLog($site_id, $item_member_id, MemberAccountTypeDict:: COMMISSION, $reward_commission, 'shop_fenxiao_sale', '销售奖励结算', $period_id);
            }
            $update_data = [
                'is_send' => 1,
                'send_time' => time()
            ];
            //会员奖励
            $sale_member->where($where)->update($update_data);
            //整体周期
            $this->model->where(
                [
                    ['id', '=', $period_id],
                    ['site_id', '=', $site_id]
                ]
            )->update($update_data);
        }

        return true;
    }

}

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

namespace addon\shop_fenxiao\app\service\core\stat;

use addon\shop_fenxiao\app\model\stat\Stat;
use Carbon\Carbon;
use core\base\BaseCoreService;
use think\facade\Db;


/**
 * 统计
 */
class CoreStatService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Stat();
    }

    /**
     * 分销商订单相关统计
     * @param $site_id
     * @param $fenxiao
     * @return true
     */
    public function order($site_id, $fenxiao, $data)
    {

        //以及当日累加销售额和销售量
        self::set($site_id, $fenxiao['member_id'], $data);

        $fenxiao_member_id = $fenxiao['member_id'];
        $parent = $fenxiao['parent'];
        $team_data = [
            'team_order_money' => $data['order_money'],
            'team_order_num' => $data['team_order_num'],
        ];
        //以及累加销售额和销售量
        self::set($site_id, $fenxiao_member_id, $team_data);
        //上级以及累加销售额和销售量
        self::set($site_id, $parent, $team_data);
        return true;
    }

    /**
     * 统计
     * @param int $site_id
     * @param int $member_id
     * @param array $data
     * @return true
     */
    public static function set(int $site_id, int $member_id, array $data)
    {
        $stat_model = new Stat();
        $carbon = Carbon::now();
        $year = $carbon->year;
        $month = $carbon->month;
        $day = $carbon->day;
        $condition = [
            ['year', '=', $year],
            ['month', '=', $month],
            ['day', '=', $day],
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id],
        ];
        $stat = $stat_model->where($condition)->findOrEmpty();
        if ($stat->isEmpty()) {
            $insert_data = [
                'year' => $year,
                'month' => $month,
                'day' => $day,
                'site_id' => $site_id,
                'member_id' => $member_id,
            ];
            $stat_model->create(array_merge($insert_data, $data));
        } else {
            $update_data = [];
            foreach ($data as $k => $v) {
                if ($v != 0) {
                    if ($v > 0) {
                        $item_sql = ' + ' . abs($v);
                    } else if ($v < 0) {
                        $item_sql = ' - ' . abs($v);
                    }
                    $update_data[$k] = Db::raw('CASE WHEN '.$k . $item_sql. '>= 0 THEN ' .$k . $item_sql. ' ELSE 0 END');
                }
            }
            if ($update_data) {
                $stat->save($update_data);
            }
        }
        return true;
    }

    /**
     * 退款累计业绩统计
     * @param $site_id
     * @param $fenxiao
     * @param $data
     * @return true
     */
    public function refund($site_id, $fenxiao, $data)
    {
        //以及当日累加销售额和销售量
        self::set($site_id, $fenxiao['member_id'], $data);

        //累计团队

        $fenxiao_member_id = $fenxiao['member_id'];
        $parent = $fenxiao['parent'];
        $team_data = [
            'team_refund_money' => $data['refund_money'],
            'team_refund_num' => $data['team_refund_num'],
        ];
        //以及累加销售额和销售量
        self::set($site_id, $fenxiao_member_id, $team_data);
        //上级以及累加销售额和销售量
        self::set($site_id, $parent, $team_data);
        return true;

    }

}

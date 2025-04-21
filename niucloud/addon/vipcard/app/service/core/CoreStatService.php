<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\service\core;

use addon\vipcard\app\model\HourStat;
use addon\vipcard\app\model\Stat;
use core\base\BaseCoreService;
use think\facade\Db;

/**
 * 统计
 * Class CoreStatService
 */
class  CoreStatService extends BaseCoreService
{
    private const STAT_FIELD = [
        'order_money',
        'order_num',
        'refund_money',
        'refund_num',
        'reserve_num',
        'buy_card_money',
        'buy_card_num',
        'buy_service_money',
        'buy_service_num'
    ];

    /**
     * 添加统计数据
     * @param int $site_id
     * @param $data
     * @return true
     */
    public static function addStat(int $site_id, $data = []) {
        // 添加天统计
        $stat_data = [
            'site_id' => $site_id,
            'date' => date('Y-m-d', time()),
            'date_time' => strtotime(date('Y-m-d', time()))
        ];

        $stat = (new Stat())->where($stat_data)->findOrEmpty();
        if ($stat->isEmpty()) {
            $stat->allowField(array_merge(array_keys($stat_data), self::STAT_FIELD))->save(array_merge($stat_data, $data));
        } else {
            foreach ($data as $key => $value) {
                $stat->$key = Db::raw("{$key} + {$value}");
            }
            $stat->allowField(self::STAT_FIELD)->save();
        }

        // 添加时统计
        $stat_hour_data = [
            'site_id' => $site_id,
            'date' => date('Y-m-d', time()),
            'hour' => (int)date('H', time()),
            'date_time' => strtotime(date('Y-m-d H:00:00', time()))
        ];

        $stat_hour = (new HourStat())->where($stat_hour_data)->findOrEmpty();
        if ($stat_hour->isEmpty()) {
            $stat_hour->allowField(array_merge(array_keys($stat_hour_data), self::STAT_FIELD))->save(array_merge($stat_hour_data, $data));
        } else {
            foreach ($data as $key => $value) {
                $stat_hour->$key = Db::raw("{$key} + {$value}");
            }
            $stat_hour->allowField(self::STAT_FIELD)->save();
        }

        return true;
    }

    /**
     * 获取时间区间内天统计数据
     * @param int $site_id
     * @param string $start_date
     * @param string $end_date
     * @return void
     */
    public function getStatData(int $site_id, string $start_date, string $end_date) {
        $start_date = strtotime($start_date);
        $end_date = strtotime($end_date);

        $field = implode(',', array_merge(self::STAT_FIELD, ['date']));
        $stat_data = (new Stat())->where([ ['site_id', '=', $site_id], ['date_time', '>=', $start_date], ['date_time', '<=', $end_date] ])->field($field)->select()->toArray();
        $stat_data = !empty($stat_data) ? array_column($stat_data, null, 'date') : [];

        $data = [];
        $day = ceil(($end_date - $start_date) / 86400);

        foreach (self::STAT_FIELD as $field) {
            $value = [];
            $time = [];
            for ($i = 0; $i < $day; $i++) {
                $date = date('Y-m-d', $start_date + $i * 86400);
                $time[] = $date;
                $value[] = isset($stat_data[ $date ]) && isset($stat_data[ $date ][ $field ]) ? $stat_data[ $date ][ $field ] : 0;
            }
            $data[ $field ] = $value;
            $data[ 'time' ] = $time;
        }
        return $data;
    }

    /**
     * 获取时间区间内小时统计数据
     * @return void
     */
    public function getHourStatData(int $site_id, string $date){
        $field = implode(',', array_merge(self::STAT_FIELD, ['hour']));
        $stat_data = (new HourStat())->where([ ['site_id', '=', $site_id], ['date_time', '=', strtotime($date)] ])->field($field)->select()->toArray();
        $stat_data = !empty($stat_data) ? array_column($stat_data, null, 'hour') : [];

        $data = [];
        foreach (self::STAT_FIELD as $field) {
            $value = [];
            for ($i = 0; $i < 24; $i++) {
                $value[ $i ] = isset($stat_data[ $i ]) && isset($stat_data[ $i ][ $field ]) ? $stat_data[ $i ][ $field ] : 0;
            }
            $data[ $field ] = $value;
        }
        $data[ 'time' ] = array_map(function($value) { return $value . '时'; }, range(0, 23, 1));

        return $data;
    }

    /**
     * 查询统计总和
     * @param int $site_id
     * @param string $start_date
     * @param string $end_date
     * @return array
     */
    public function getStat(int $site_id, string $start_date = '', string $end_date = '') {
        $condition = [ ['site_id', '=', $site_id ] ];

        if (!empty($start_date) && !empty($end_date)) {
            $condition[] = ['date_time', '>=', strtotime($start_date) ];
            $condition[] = ['date_time', '<=', strtotime($end_date) ];
        } else if (!empty($start_date)) {
            $condition[] = ['date_time', '=', strtotime($start_date) ];
        }

        $field = array_map(function ($field) {
            return "IFNULL(sum({$field}), 0) as {$field}";
        }, self::STAT_FIELD);

        $stat_data = (new Stat())->where($condition)->field(implode(',', $field))->find()->toArray();

        return $stat_data;
    }

    /**
     * 查询月统计总和
     * @param int $site_id
     * @param string $start_date
     * @param string $end_date
     * @return array
     */
    public function getMonthStat(int $site_id, string $start_date = '', string $end_date = '') {
        $condition = [ ['site_id', '=', $site_id ] ];

        if (empty($start_date) || empty($end_date)) {
            $start_date = strtotime(date('Y-m-01 00:00:00'));
            $end_date  = strtotime(date('Y-m-t 23:59:59'));
        }

        $condition[] = ['date_time', '>=', strtotime($start_date) ];
        $condition[] = ['date_time', '<=', strtotime($end_date) ];

        $field = array_map(function ($field) {
            return "IFNULL(sum({$field}), 0) as {$field}";
        }, self::STAT_FIELD);

        $stat_data = (new Stat())->where($condition)->field(implode(',', $field))->find()->toArray();

        return $stat_data;
    }
}
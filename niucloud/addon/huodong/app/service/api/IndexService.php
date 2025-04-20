<?php

namespace addon\huodong\app\service\api;

use addon\huodong\app\model\banner\Banner;
use addon\huodong\app\model\order\Order;
use addon\huodong\app\service\core\ConfigService;
use app\model\member\Member;
 
use core\base\BaseApiService;
use think\facade\Db;


class IndexService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getBanner()
    {
        $BannerModel = new Banner();

        return $BannerModel->where([["site_id", "=", $this->site_id]])->where('status', 1)->select()->toArray();
    }

    public function getconfig()
    {
        $config = (new ConfigService())->getConfig( $this->site_id);

        return $config;
    }

    public function newsbao()
    {
        $post = input('');

        $list = Db::name('huodong_order')->alias('a')->join('huodong_act b','a.act_id = b.id')->field('a.member_id,b.name,a.create_time')->where([["a.site_id", "=", $this->site_id]])->order('a.order_id desc')->limit(10)->select()->toArray();
        $bao = [];
        foreach ($list as $k => &$v) {
            $v["nickname"] = (new Member())->where([["member_id", "=", $v["member_id"]]])->value('nickname');
            $v["create_time"] = date('H:i',$v["create_time"]);
            $bao[] = $v['nickname'].'于'.$v["create_time"].'参与'.$v["name"];
        }

        return $bao;
    }


    public function getrank()
    {
        $post = input('');
        $where = null;
        $where2 = '1=1 ';
        if ($post['type'] == 1) {
            // 本日
            // 获取当前日期
            $currentDate = date('Y-m-d');

            // 设置本日的起始时间戳（当天00:00:00）
            $startOfDayTimestamp = strtotime($currentDate);

            // 设置本日的结束时间戳（当天23:59:59）
            $endOfDayTimestamp = strtotime($currentDate. ' 23:59:59');

            // 将时间戳转换为时间格式化字符串
            /*$startOfDayFormatted = date('Y-m-d H:i:s', $startOfDayTimestamp);
            $endOfDayFormatted = date('Y-m-d H:i:s', $endOfDayTimestamp);*/
                $where2 .= 'and create_time >= ' .$startOfDayTimestamp.' and create_time <= '. $endOfDayTimestamp;
            //       $where['b.create_time'] = ['between', [$startOfDayTimestamp, $endOfDayTimestamp]];
        } elseif ($post['type'] == 2) {
            // 本周
            // 获取当前周的第一天（周一）
            $currentDate = date('Y-m-d');
            $currentDayOfWeek = date('w'); // 0表示周日，1表示周一，以此类推
            $daysToMonday = $currentDayOfWeek == 0? 6 : $currentDayOfWeek - 1;
            $firstDayOfWeek = date('Y-m-d', strtotime('-'. $daysToMonday. ' days', strtotime($currentDate)));
            $startOfWeekTimestamp = strtotime($firstDayOfWeek);

            // 获取当前周的最后一天（周日）
            $lastDayOfWeek = date('Y-m-d', strtotime('+'. (6 - $daysToMonday). ' days', strtotime($firstDayOfWeek)));
            $endOfWeekTimestamp = strtotime($lastDayOfWeek);

            // 将时间戳转换为时间格式化字符串
          /*  $startOfWeekFormatted = date('Y-m-d H:i:s', $startOfWeekTimestamp);
            $endOfWeekFormatted = date('Y-m-d H:i:s', $endOfWeekTimestamp);*/
            $where2 .= 'and create_time >= ' .$startOfWeekTimestamp.' and create_time <= '. $endOfWeekTimestamp;
//            $where['b.create_time'] = ['between', [$startOfWeekTimestamp, $endOfWeekTimestamp]];
        } elseif ($post['type'] == 3) {
            // 本月
            // 获取当前月份和年份
            $currentMonth = date('m');
            $currentYear = date('Y');

            // 获取本月的第一天
            $firstDayOfMonth = date('Y-m-01', strtotime($currentYear. '-'. $currentMonth. '-01'));
            $startOfMonthTimestamp = strtotime($firstDayOfMonth);

            // 获取本月的最后一天
            $lastDayOfMonth = date('Y-m-t', strtotime($currentYear. '-'. $currentMonth. '-01'));
            $endOfMonthTimestamp = strtotime($lastDayOfMonth);

            // 将时间戳转换为时间格式化字符串
           /* $startOfMonthFormatted = date('Y-m-d H:i:s', $startOfMonthTimestamp);
            $endOfMonthFormatted = date('Y-m-d H:i:s', $endOfMonthTimestamp);*/
            $where2 .= 'and create_time >= ' .$startOfMonthTimestamp.' and create_time <= '. $endOfMonthTimestamp;
//            $where['b.create_time'] = ['between', [$startOfMonthTimestamp, $endOfMonthTimestamp]];
        } else {
            // 本年
            // 获取当前年份
            $currentYear = date('Y');

            // 获取本年的第一天
            $firstDayOfYear = date('Y-01-01', strtotime($currentYear. '-01-01'));
            $startOfYearTimestamp = strtotime($firstDayOfYear);

            // 获取本年的最后一天
            $lastDayOfYear = date('Y-12-31', strtotime($currentYear. '-12-31'));
            $endOfYearTimestamp = strtotime($lastDayOfYear);

            // 将时间戳转换为时间格式化字符串
           /* $startOfYearFormatted = date('Y-m-d H:i:s', $startOfYearTimestamp);
            $endOfYearFormatted = date('Y-m-d H:i:s', $endOfYearTimestamp);*/
            $where2 .= 'and create_time >= ' .$startOfYearTimestamp.' and create_time <= '. $endOfYearTimestamp;
//            $where['b.create_time'] = ['between', [$startOfYearTimestamp, $endOfYearTimestamp]];
        }


        /*$list = Db::name('member')->alias('a')->join('member_account_log b','a.member_id = b.member_id')->field('a.member_id,a.headimg,a.nickname,sum(b.account_data) as num')->where('b.account_type','point')->where('b.memo','参与活动报名奖励')->where([["b.site_id", "=", $this->site_id]])->where($where2)->order('num desc')->limit(13)->group('member_id')->select()->toArray();*/


        /*usort($list, function ($a, $b) {
            return $b["num"] - $a["num"];
        });*/

        $list =  (new Order)->field('count(*) as num,member_id')->where([ [ 'site_id', '=', $this->site_id ] ])->with(['member'])->where($where2)->where('order_status',3)->order('num desc')->group('member_id')->limit(50)->select()->toArray();



      return $list;
    }


    public function getrankone()
    {
        $post = input('');
        $where = null;
        $where2 = '1=1 ';


        /*$list = Db::name('member')->alias('a')->join('member_account_log b','a.member_id = b.member_id')->field('a.member_id,a.headimg,a.nickname,sum(b.account_data) as num')->where('b.account_type','point')->where('b.memo','参与活动报名奖励')->where([["b.site_id", "=", $this->site_id]])->where($where2)->order('num desc')->limit(13)->group('member_id')->select()->toArray();*/


        /*usort($list, function ($a, $b) {
            return $b["num"] - $a["num"];
        });*/

        $list =  (new Order)->field('point as num,member_id')->where([ [ 'site_id', '=', $this->site_id ] ])->with(['member'])->where($where2)->where('order_status',3)->where('is_jiangli',1)->where('act_id',$post['id'])->order('num desc')->group('member_id')->limit(50)->select()->toArray();


        return $list;
    }
}

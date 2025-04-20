<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\model\ShareholderLog;
use addon\ly_shareholder\app\service\admin\ShareholderLevelService;
use addon\ly_shareholder\app\service\admin\ShareholderLogService;
use addon\ly_shareholder\app\service\admin\ShareholderService;
use addon\shop\app\model\order\Order;
use Carbon\Carbon;
use core\base\BaseCoreService;
use think\facade\Log;
use addon\ly_shareholder\app\service\core\CoreConfigService;
use addon\ly_shareholder\app\service\core\CoreShareholderLevelService;

class CoreShareholderDividendService extends BaseCoreService
{
    public $config;

    public $log;

    public function __construct($site_id){
        parent::__construct();
        $this->config = (new CoreConfigService())->getShareholderConfig($site_id);
        $this->log = (new ShareholderLogService())->getList();
    }

    public function  handleQueue($site_id)
    {   
        Log::write('=======股东分红handleQueue======进入' . '站点ID：' .  $site_id . '==========');

        $is_execute = $this->isExecute();
        if ($is_execute) {
            $now = time();
            if($now >= $this->config['settle_time']){
                $this->shareholderDividend($site_id);
                Log::write('========股东分红UNIACID:' . $site_id . '执行========');
            }else{
                Log::write('========股东分红UNIACID:' . $site_id . '未到结算发放时间========');
            }
                
        } else {
            Log::write('========股东分红UNIACID:' . $site_id . '不满足条件========');
        }
    }

    public function isExecute(){
        
        if($this->config['is_open'] == 0){
            Log::write('==========股东分红未开启==========','ERROR');
            return false;
        }

        //分红时间设置
        $settle_time = $this->config['settle_time'];
        switch($settle_time){
            case ShareholderDict::DAY:
                return $this->everyDay();
            
            case ShareholderDict::WEEK:
                return $this->everyWeek();

            case ShareholderDict::MONTH:
                return $this->everyMonth();

            default:
                return false;
        }
    }

    //每天执行
    public function everyDay(){
        
        return $this->isExecuted();
    }

    //每周执行
    public function everyWeek(){
        if(Carbon::now()->dayOfWeek != 1){
            Log::write('==========每周执行：不是周一==========','ERROR');
            return false;
        }
        return $this->isExecuted();
    }

    //每月执行
    public function everyMonth(){
        if($this->config['settle_time'] == 2 && Carbon::now()->day != 1){
            Log::write('==========股东分红每月执行：不是每月1号==========','ERROR');
        }

        return $this->isExecuted();
    }


    /**
     * 今天（日）是否执行过
     *
     * @return bool
     */
    private function isExecuted()
    {
       //获取今天0点0分0秒
        $today = Carbon::now()->startOfDay();
        $log = (new ShareholderLog())->where('site_id','=',$this->config['site_id'])->order('create_time','desc')->findOrEmpty();
        Log::write('==========isExecuted==========走到这里了'  . json_encode( $log ) );

        // $log_list = $log->where('site_id',$this->log['site_id'])->order('create_time','desc')->find();
        if ($this->config['settle_time'] == 0 && $log['create_time'] > $today) {
            Log::write('========isExecuted():股东分红今日已返现' . 'Site_id:' . $this->config['site_id'] . '==========','DEBUG');
            return false;
        }
        
        return true;
    }


    //分红处理
    public function shareholderDividend($site_id){
        $config = (new CoreConfigService())->getShareholderConfig($site_id);
        $is_max = $config['is_max'];//封顶功能
        $is_commission = $config['is_commission'];//股东分红条件
        if($config['is_open'] == 0) {
            Log::write('==========股东分红未开启==========','ERROR');
        }
        
        //获取订单总金额
        $orderAmount = CoreCountService::getCycleOrderAmount($config['settle_type'], $config['take_type'], $site_id);

        if($orderAmount <= 0){
            Log::write('===========股东分红没有返现总金额' . 'siteID:' . $config['site_id'] . '==========');
            return;
        }

        $shareholderLevels = (new ShareholderLevelService())->getList($site_id)->toArray();//股东等级
        foreach($shareholderLevels as $level){
            Log::write('===========走到这里了股东等级ID：' . $level['level_id'] . '==========');

            $teamAgents = (new ShareholderService())->getShareholderByLevelId($level['level_id'], $site_id);
            $teamAgentsNum = count($teamAgents);

            $rate = $level['rate'] * 0.01;//分红比例
            $amount = number_format($orderAmount * $rate  / $teamAgentsNum,2);//分红金额
            if($amount < 0){
                Log::write('===========股东分红' . $level['level_id'] . '分红金额小于0');
                continue;
            }

            foreach($teamAgents as $agent){//开启股东分红上限，
                $agent_level = (new CoreShareholderLevelService())->getLevelByMember($site_id, $agent);
                if($is_max){
                    $max = $agent_level['max_money'];//分红上限
                    if($max > 0 && $amount > $max){
                        $amount = $max; 
                    }                 
                }

                if($is_commission){//开启股东分红条件，每月最低消费一单
                    $is_commission_sign = $this->checkConditionDividend($agent['member_id'], $config['min_order']);
                    $is_commission_amount_sign = $this->checkConditionDividendAmount($agent['member_id'], $config['min_order_amount']);
                    if(!$is_commission_sign || !$is_commission_amount_sign){
                        Log::write('===========股东分红条件未满足：' . $agent['member_id']);
                        continue;
                    }
                }

                 // 股东分红数据
                 $shareData = [
                    'site_id' => $site_id,
                    'member_id' => $agent['member_id'],
                    'order_amount' => $orderAmount,
                    'rate' => $rate,
                    'team_level' => $level['level_id'],
                    'team_level_name' => $level['level_name'],
                    'level_num' => $teamAgentsNum,
                    'amount' => $amount,
                    'create_time' => time(),
                    'update_time' => time(),
                ];
                $logId = ShareholderLog::insertGetId($shareData);
               
            }
        }
    }

    
    //获取前一天
    public function Day($date){
        
        $date = strtotime($date);
        $yesterday = strtotime('-1 day', $date);
        
        return date('Y-m-d', $yesterday);
    }

    //获取前一周
    public function Week($date){
        
        $date = strtotime($date);
        $week = date('w', $date);
        
        $yesterday = strtotime('-' . $week . ' day', $date);
        
        return date('Y-m-d', $yesterday);
    }

    //获取前一月
    public function Month($date){
        
        $date = strtotime($date);
        $month = date('m', $date);
        
        $yesterday = strtotime('-' . $month . ' month', $date);
        
        return date('Y-m-d', $yesterday);
    }

    //获取当月最后一天
    public function getLastDay($date){
        $date = strtotime($date);
        $year = date('Y', $date);
        $month = date('m', $date);
        
        $first_day = mktime(0, 0, 0, $month, 1, $year);
        $last_day = strtotime('-1 day', strtotime('+1 month', $first_day));
        
        return date('Y-m-d', $last_day);
    }

    //获取当月第一天
    public function getFirstDay($date){
        $date = strtotime($date);
        $year = date('Y', $date);
        $month = date('m', $date);
        
        $first_day = mktime(0, 0, 0, $month, 1, $year);
        
        return date('Y-m-d', $first_day);
    }

    //验证当前用户是否满足股东分红
    public function checkConditionDividend($member_id, $min_order)
    {
        if ($member_id == '') {
            return '';
        }
        $min_order = $min_order ? $min_order : 1;
        $begin_time = Carbon::now()->modify('-1 month')->startOfMonth()->timestamp;
        $end_time = Carbon::now()->modify('-1 month')->endOfMonth()->timestamp;

        //查询会员上个月支付订单总数
        $order_num = Order::where('member_id', $member_id)
            ->where('status', '>', '0')
            ->whereBetween('pay_time', [$begin_time, $end_time])
            ->count();

        //判断上个月会员支付订单总数是否符合设置股东分红最低分红单数 else 不能获得股东分红
        if ($order_num >= $min_order) {
            return true;
        }

        Log::write('========股东分红条件开启=======:订单数不符合设置最低分红单数：'. '会员ID:' . $member_id . '订单总数：' . $order_num . '设置最低分红单数：' . $min_order);
        return false;
    }

    //验证当前用户是否满足股东分红条件：每月最低消费金额
    public function checkConditionDividendAmount($member_id, $min_order_amount){
        
        if ($member_id == '') {
            return '';
        }
        $min_order_amount = $min_order_amount ? $min_order_amount : 1;  
        
        $begin_time = Carbon::now()->modify('-1 month')->startOfMonth()->timestamp;
        $end_time = Carbon::now()->modify('-1 month')->endOfMonth()->timestamp;

        //查询会员上个月支付订单总数
        $order_amount = Order::where('member_id', $member_id)
            ->where('status', '>', '0')
            ->whereBetween('pay_time', [$begin_time, $end_time])
            ->sum('order_money');
            
        if ($order_amount >= $min_order_amount) {
            return true;
        }
        
        Log::write('========股东分红条件开启=======:订单金额不符合设置最低分红金额：'. '会员ID:' . $member_id . '订单金额：' . $order_amount . '设置最低分红金额：' . $min_order_amount);
        return false;
    }
}
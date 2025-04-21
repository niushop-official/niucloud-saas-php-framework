<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\service\admin\ConfigService;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreTimeTaskService extends BaseCoreService
{
    public $config;

    public function __construct(){
        parent::__construct();
        $this->config = (new ConfigService())->getShareholderConfig();
    }

    public function isExecute(){
        
        if($this->config['is_open'] == 0){
            Log::write('==========股东分红未开启==========','ERROR');
            return false;
        }

        //分红时间设置
        $current_time = $this->config['settle_time'];
        switch($current_time){
            case 0:
                return $this->everyDay();
                break;
            
            case 1:
                return $this->everyWeek();
                break;

            case2:
                return $this->everyMonth();
                break;

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
        
    }


    /**
     * 今天（日）是否执行过
     *
     * @return bool
     */
    private function isExecuted()
    {
        if ($this->config['settle_time'] == 0 && $this->log['create_time'] == date('d')) {
            Log::info('========isExecuted():今日已返现');
            return false;
        }
        return true;
    }
}
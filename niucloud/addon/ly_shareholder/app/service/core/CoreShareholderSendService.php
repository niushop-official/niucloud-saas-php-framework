<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\model\ShareholderLog;
use addon\ly_shareholder\app\service\core\CoreConfigService;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;
use think\facade\Log;


/**
 * 股东分红发放
 */
class CoreShareholderSendService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public $site_id;


    public function __construct()
    {
        parent::__construct();
        $this->model = new ShareholderLog();
    }

    /**
     * 自动结算
     * @param $site_id
     * @return true
     */
    public function autoSettlement($data)
    {
        //查看当前可结算的周期(待结算)
        $period = $this->model->where(
            [
                ['is_settlement', '=', 0],
                ['site_id', '=', $data['site_id']]
            ]
        )->select();

        if (!empty($period) ){
            foreach($period as $period_v){
               //更新每个period_v的结算状态
                $settle = $period_v->is_settlement = 1;
                $settle = $period_v->settle_time = time(); 
                $settle = $period_v->save();

                if($settle){
                    Log::write('股东分红结算：ID:' . $period_v['id'] . '结算成功' . 'site_id:' . $data['site_id']);
                    
                    //发放奖励
                    $send = self::send( $period_v); 
                    if($send){
                        Log::write('股东分红发放：ID:' . $period_v['id'] . '发放成功' . 'site_id:' . $data['site_id']);
                    }else{
                        Log::write('股东分红发放：ID:' . $period_v['id'] . '发放失败' . 'site_id:' . $data['site_id']);
                    }   
               }
            } 
           
        }else{
            Log::write('=========股东分红结算：没有可结算的周期ID:' . $period['id'] . '结算失败' . 'site_id:'. $data['site_id'] . '==============');
        }

        return true;
    }

   

    /**
     * 发放这个周期的奖励
     * @param $site_id
     * @param $period_id
     * @return bool
     */
    public function send($data)
    {
        $site_id = $data['site_id'];
        $config = (new CoreConfigService())->getShareholderConfig($site_id);

        Log::write('股东分红发放开始：'. $site_id  . '==============');
        $share_queue = $this->model->where(
            [
                ['site_id', '=', $site_id],
                ['is_settlement', '=', 1],
                ['is_send', '=', 0],
            ]
        )->field('member_id,amount')
         ->select();
         Log::write('股东分红发放准备了：' . $data['site_id'] . json_encode($share_queue) . '=========================='. json_encode($data));

        if (!empty($share_queue)) {              
            Log::write('股东分红发放开始：'. $site_id  . '==============' . json_encode($share_queue) . ''. json_encode($data));
            foreach($share_queue as $key => $value){

                //佣金发放
                switch($config['take_type']){
                    case ShareholderDict::BALANCE:
                        (new CoreMemberAccountService())->addLog($site_id,  $value['member_id'], MemberAccountTypeDict::BALANCE, $value['amount'], 'shareholder','股东分红');
                        break;
                    
                    case ShareholderDict::COMMISSION:
                        (new CoreMemberAccountService())->addLog($site_id, $value['member_id'], MemberAccountTypeDict::COMMISSION, $value['amount'], 'shareholder','股东分红' );
                        break;
                    
                    case ShareholderDict::SCORE:
                        (new CoreMemberAccountService())->addLog((int)$data['site_id'], $value['member_id'], MemberAccountTypeDict::POINT, $value['amount'], 'order','股东分红');
                        break;

                    default:
                        (new CoreMemberAccountService())->addLog((int)$data['site_id'], $value['member_id'], MemberAccountTypeDict::BALANCE, $value['amount'], 'order','股东分红' );
                        break;
                }
                Log::write('发放完成，准备更新字段' . '==========================');
                $update_data = [
                    'is_send' => 1,
                    'send_time' => time()
                ];
                Log::write('要更新的字段是：' . json_encode($update_data) . '==========================');

                $where = [
                    ['site_id', '=', $site_id ], 
                ];
                Log::write('要更新的条件是：' . json_encode($where) . '==========================');

                $send = $this->model->where($where)->update($update_data);
                if($send){
                    Log::write('股东分红发放：ID:' . $value['id'] . '发放成功' . 'site_id:' . $site_id . $key);
                }
                
                //累加股东总分红金额
                (new CoreShareholderService())->incFenhong($site_id, $value['member_id'], $value['amount'], 'shareholder_fenhong');
            }
            
        }

        return true;
    }

}

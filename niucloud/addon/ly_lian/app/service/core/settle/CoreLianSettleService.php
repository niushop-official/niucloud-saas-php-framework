<?php

namespace addon\ly_lian\app\service\core\settle;

use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\member\CoreLianMemberAttrService;
use addon\ly_lian\app\service\core\order\CoreLianRewardAttrService;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreLianSettleService extends BaseCoreService
{   

    public function __construct()
    {
        parent::__construct(); 
        $this->model = new LianReward();
    }


    public function handleQueue($reward_ids){
        $reward_list = $this->model->where('id', 'in', $reward_ids)->where('status', 1)->select(); 
        foreach($reward_list as $v){ 
            // $account_type = (new CoreLianRewardAttrService())->getTakeType($v['site_id']); 
            // $config = (new CoreConfigService())->getLianConfig($v['site_id']); 
            // $reward_type = (new CoreLianRewardAttrService())->getRewardType($v['site_id'], $v['id']);  
            $site_id = $v['site_id']; 
            $id = $v['id'];
        }

        $account_type = (new CoreLianRewardAttrService())->getTakeType($site_id); 
        $config = (new CoreConfigService())->getLianConfig($site_id); 
        $reward_type = (new CoreLianRewardAttrService())->getRewardType($site_id, $id);  

        $current_time = time();
        $start_time = $current_time - ($config['settle_cycle'] * 86400);

        if($config['settle_way'] == 0){//结算方式为支付后
            $pay_list = (new CoreLianSettleAttrService())->getRewardListAfterPay($reward_ids); // 获取已支付的奖励列表。
            foreach($pay_list as $pay){
                if($config['settle_cycle'] == 0){ 
                    Log::write('======ly_lian======='. '立即结算=====pay_list======0000000');  
                    $data = [ // 更新奖励状态为已结算。
                        'id' => $pay['id'],
                        'status' => 2,
                        'settle_time' => time()
                    ];
                    $this->model->update($data); 

                    //发放收益到会员账户  
                    (new CoreMemberAccountService())->addLog($pay['site_id'], $pay['member_id'], $account_type, $pay['give_amount']-$pay['frozen_amount'], 'ly_lian', $reward_type);
                    //累加会员的已发放金额
                    (new CoreLianMemberAttrService())->incGiveCommission($pay['site_id'], $pay['member_id'], $pay['give_amount']-$pay['frozen_amount']);
                }else{ // 周期结算。     
                    if(strtotime($pay['pay_time']) <= $start_time){
                        $data = [
                            'id' => $pay['id'],
                            'status' => 2,
                            'settle_time' => time()
                        ];
                        $this->model->update($data); 

                        //发放收益到会员账户
                        (new CoreMemberAccountService())->addLog($pay['site_id'], $pay['member_id'], $account_type, $pay['give_amount']-$pay['frozen_amount'],  'ly_lian', $reward_type);
                        Log::write('===ly_lian=='. '周期结算发放成功===pay_list===支付时间为：' . $pay['pay_time'] . '===开始时间为：' . date('Y-m-d H:i:s', $start_time));
                        //累加会员的已发放金额
                        (new CoreLianMemberAttrService())->incGiveCommission($pay['site_id'], $pay['member_id'], $pay['give_amount']-$pay['frozen_amount']);
                    }
                }
            }
        }else{//结算方式为完成订单后
            $finish_list = (new CoreLianSettleAttrService())->getRewardListAfterFinish($reward_ids);
            foreach($finish_list as $finish){ 
                if($config['settle_cycle'] == 0){ 
                    Log::write('======ly_lian======='. '周期结算====finish_list====00000');
                    $data = [
                        'id' => $finish['id'],
                        'status' => 2,
                        'settle_time' => time()
                    ];
                    $this->model->update($data); 

                    //发放收益到会员账户  
                    (new CoreMemberAccountService())->addLog($finish['site_id'], $finish['member_id'], $account_type, $finish['give_amount']-$finish['frozen_amount'], 'ly_lian', $reward_type);
                    //累加会员的已发放金额
                    (new CoreLianMemberAttrService())->incGiveCommission($finish['site_id'], $finish['member_id'], $finish['give_amount']-$finish['frozen_amount']);
                }else{
                    Log::write('======ly_lian======='. '周期结算====finishi_list=====11111');  
                    if(strtotime($finish['finish_time']) <= $start_time){
                        $data = [
                            'id' => $finish['id'], 
                            'status' => 2, 
                            'settle_time' => time() 
                        ];
                        $this->model->update($data); 
                        //发放收益到会员账户  
                        (new CoreMemberAccountService())->addLog($finish['site_id'], $finish['member_id'], $account_type, $finish['give_amount']-$finish['frozen_amount'], 'ly_lian', $reward_type);
                         //累加会员的已发放金额
                        (new CoreLianMemberAttrService())->incGiveCommission($finish['site_id'], $finish['member_id'], $finish['give_amount']-$finish['frozen_amount']);
                    }
                }
            }
        }
        
    }


    public function send($site_id, $list){
        $account_type = (new CoreLianRewardAttrService())->getTakeType($site_id);
        if(empty($list)){  
            return;  
        }
        foreach ($list as $item) {
            $data = [
                'id' => $item['id'],
                'status' => 2,
                'settle_time' => time()
            ];
            $this->model->update($data); // 更新奖励状态为已结算。
    
            $reward_type = (new CoreLianRewardAttrService())->getRewardType($site_id, $item['id']); //获取奖励的奖励类型，直推奖，见点奖等
            Log::write('======ly_lian=======$reward_type:'.$reward_type);
            //发放收益到会员账户
            (new CoreMemberAccountService())->addLog($site_id, $item['member_id'], $account_type, $item['give_amount'], 'ly_lian', $reward_type);
        }
        
    }

       
}
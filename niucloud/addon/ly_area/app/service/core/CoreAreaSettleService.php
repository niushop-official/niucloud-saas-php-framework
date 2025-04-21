<?php

namespace addon\ly_area\app\service\core;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaReward;
use addon\ly_area\app\service\admin\AreaConfigService;
use addon\ly_area\app\service\core\agent\CoreAreaAgentService;
use core\base\BaseCoreService;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use think\facade\Log;

/**
 * 区域结算
 * Class CoreAreaSettleService
 * @package addon\ly_area\app\service\core
 */
class CoreAreaSettleService extends BaseCoreService
{
    protected $config;

    public function __construct(){
        parent::__construct();
        $this->model = new AreaReward();
        $this->config = (new AreaConfigService())->getAreaConfig();
    }

    /**
     * 自动结算
     * @param $site_id
     * @return true
     */
    public function autoSettlement($data){
        $settle = $data->status = 1;
        $settle = $data->settle_time = time();
        $settle = $data->save();

        if($settle){
            Log::write('区域代理分红结算：ID:' . $data['id'] . '结算成功' . 'site_id:' . $data['site_id']);

            //发放奖励
            $send = self::send($data);
            if($send){
                Log::write('区域代理分红发放：ID:' . $data['id'] . '发放成功' . 'site_id:' . $data['site_id']);
            }else{
                Log::write('区域代理分红发放：ID:' . $data['id'] . '发放失败' . 'site_id:' . $data['site_id']);
            }  
        }else{
            Log::write('区域代理分红结算：ID:' . $data['id'] . '结算失败' . 'site_id:' . $data['site_id']);
        }

        return true;
    }


    /**
     * 发放这个周期的奖励
     * @param $site_id
     * @param $period_id
     * @return void
     */
    public function send($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        Log::write('区域代理分红发放开始：站点ID:'. $data['site_id']  . '==============');

        //佣金发放
        switch($this->config['take_type']){
            case AreaDict::BALANCE:
                (new CoreMemberAccountService())->addLog($site_id,  $member_id, MemberAccountTypeDict::BALANCE, $data['dividend_amount'], 'ly_area','区域代理分红');
                break;
            
            case AreaDict::COMMISSION:
                (new CoreMemberAccountService())->addLog($site_id, $member_id, MemberAccountTypeDict::COMMISSION, $data['dividend_amount'], 'ly_area','区域代理分红' );
                break;
            
            case AreaDict::SCORE:
                (new CoreMemberAccountService())->addLog((int)$data['site_id'], $member_id, MemberAccountTypeDict::POINT, $data['dividend_amount'], 'ly_area','区域代理分红');
                break;

            default:
                (new CoreMemberAccountService())->addLog((int)$data['site_id'], $member_id, MemberAccountTypeDict::BALANCE, $data['dividend_amount'], 'ly_area','区域代理分红' );
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

        if($data['dividend_amount'] > 0){
            $send = $this->model->where($where)->update($update_data);
        }
        
        if($send){
            Log::write('股东分红发放：ID:' . $data['id'] . '发放成功' . 'site_id:' . $site_id);
        }
        
        //累加代理总分红金额
        (new CoreAreaAgentService())->incFenhong($site_id, $member_id, $data['dividend_amount'], 'area_fenhong');

        //增加统计数据
        
    }
}

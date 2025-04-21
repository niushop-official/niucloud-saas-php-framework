<?php

namespace addon\ly_lian\app\service\core\member;

use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\order\CoreLianRewardService;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;
use think\facade\Db;
use think\facade\Log;


/**
 * 分销商属性发生变化 (数字类的)
 */
class CoreLianDataService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new LianMember();
    }


    public function handleQueue($ids){
        Log::write('========ly_lian=======checkTask======='); // 记录日志，以便调试。
        $member_list = (new LianMember())->where('id', 'in', $ids)->select()->toArray(); 
        foreach($member_list as $member){
            $this->checkMemberTask($member['site_id'], $member); 
        }
    }


    public function checkMemberTask($site_id, $member){ 
        Log::write('========ly_lian=======checkMemberTask=======member:====' . json_encode($member)); 
        $member = $this->model->where('site_id', $site_id)->where('member_id', $member['member_id'])->findOrEmpty();
        $level = (new CoreLianLevelService())->getLevelByMember($site_id, $member); 

        $child_boss_list = $this->getChildBossList($site_id, $member); 
        $limit_time = strtotime($member['up_time']) + $level['task_limit_days'] * 86400;

        $boss_mids = []; 
        $boss_num = 0; 
        $boss_list = [];
       
        foreach($child_boss_list as $boss){
            if($level['task_limit_days'] == 0 || empty($level['task_limit_days'])){
                $boss_num ++; 
                $boss_list[] = $boss;
                $boss_mids[] = $boss['member_id']; // 增加BOSS的会员ID到数组中。

            }elseif($level['task_limit_days'] > 0){
                if($boss['up_time'] <= $limit_time){
                    $boss_num ++;
                    $boss_list[] = $boss; 
                    $boss_mids[] = $boss['member_id']; 
                }
            }
        }
        Log::write('========ly_lian=======checkMemberTask=======boss_num:====' . $boss_num); 
        if($boss_num <= 0) return true; // 如果BOSS数量小于等于0，则直接返回。

        if($level['task_limit_days'] == 0 || empty($level['task_limit_days'])){
            if($level['task_boss_first'] == 1){//前二直推下级升级老板数
                if(in_array($member['child_mid1'], $boss_mids) && in_array($member['child_mid2'], $boss_mids)){
                    (new CoreLianMemberAttrService())->unfrozenReward($site_id, $member);  
                }
            }elseif($level['task_boss_num'] > 0){//直推下级升级老板数
                if($boss_num >= $level['task_boss_num']){
                    (new CoreLianMemberAttrService())->unfrozenReward($site_id, $member); // 解冻奖励金额，发放奖励金额。
                }
            }
        }elseif($level['task_limit_days'] > 0){ // 限制时间内的BOSS数量。
            if($level['task_boss_first'] == 1){//前二直推下级升级老板数
                if(in_array($member['child_mid1'], $boss_mids) && in_array($member['child_mid2'], $boss_mids)){
                    (new CoreLianMemberAttrService())->unfrozenReward($site_id, $member);  // 解冻奖励金额，发放奖励金额。

                }elseif(!in_array($member['child_mid1'], $boss_mids) && !in_array($member['child_mid2'], $boss_mids)){
                    (new CoreLianMemberAttrService())->expireFrozenCommission($site_id, $member); // 将会员冻结收益状态改为-1失效状态。
                }

            }elseif($level['task_boss_num'] > 0){//直推下级升级老板数
                if($boss_num >= $level['task_boss_num']){
                    (new CoreLianMemberAttrService())->unfrozenReward($site_id, $member); // 解冻奖励金额，发放奖励金额。
                    
                }elseif($boss_num < $level['task_boss_num']){//将会员冻结收益状态改为-1失效状态。
                    (new CoreLianMemberAttrService())->expireFrozenCommission($site_id, $member); // 将会员冻结收益状态改为-1失效状态。
                }
            }
        }

        return true; // 返回true，表示任务检查完成。
    }


    //获取直推下级boss列表
    public function getChildBossList($site_id, $parent){
        $child_list = $this->getChildList($site_id, $parent); 
        $boss = []; 
        foreach ($child_list as $child) { 
            $child_level = (new CoreLianLevelService())->getLevelByMember($site_id, $child); // 获取链动等级信息
            if ($child_level['level_num'] == 2) { 
                $boss[] = $child;
            }
        }
        return $boss; 
    }

    //获取直推下级
    public function getChildList($site_id, $parent){
        $list = $this->model->where('site_id', $site_id)->where('pid', $parent['member_id'])->select(); 
        return $list;
    }


    //获取会员待结算数据列表
   public function getUnsettleList($site_id){
    Log::write('==========ly_lian========getUnsettleList');
        $where = [
            'site_id' => $site_id, 
            'status' => 1, 
        ]; 
        $list = (new LianReward())->where($where)->select(); 
        return $list;
    }


    //获取团队会员
    public function getTeam($site_id, $member, $deeplevel = 3){
        if($deeplevel <= 0) return []; // 如果递归深度小于等于0，则直接返回空数组。

        $child_list = $this->getChildList($site_id, $member); // 获取直推下级列表

        $team_list = []; 
        foreach ($child_list as $child) { 
            $team_list[] = $child; 
            $team_list = array_merge($team_list, $this->getTeam($site_id, $child, $deeplevel - 1)); // 递归调用getTeam方法，获取下级团队列表，并合并到团队列表数组中
        }
        return $team_list; 
    }

}

<?php

namespace addon\ly_lian\app\service\core\member;

use addon\ly_lian\app\dict\lian\LianDict;
use addon\ly_lian\app\model\fenxiao\Fenxiao;
use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianChange;
use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\order\CoreLianRewardAttrService;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoMember;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao as ShopFenxiao;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;
use core\dict\MemberAccountChangeType;
use think\facade\Log;


/**
 * 链动会员属性发生变化
 */
class CoreLianMemberAttrService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new LianMember();
    }

    //会员关系链变动 记录
    public function addLianChange($site_id, $member_id, $pid,  $lian_pid,  $new_lian_pid, $level_id, $remark){
        $data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'level_id' => $level_id,
            'lian_pid' => $lian_pid,
            'pid' => $pid,
            'new_lian_pid' => $new_lian_pid,
            'remark' => $remark,
            'create_time' => time(),
        ];

        (new LianChange())->insertGetId($data);
        return true;
    }

    //升级成为链动会员
    public function autoLianMember($site_id, $member_id){
        try{
            // $fenxiao_member = (new ShopFenxiao())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
            $fenxiao_member = (new FenxiaoMember())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
            $level_id = (new Level())->where('site_id', $site_id)->where('level_num', 1)->findOrEmpty()['level_id'];
            $data = [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'level_id' => $level_id,
                'lian_pid' => $fenxiao_member['pid'] ?: 0,
                'pid' => $fenxiao_member['pid'] ?: 0,
                'create_time' => time(), 
            ];
            (new LianMember())->insertGetId($data);
            return true;
        }catch (\Exception $e){
            return false;
        }
    }

    //获取商城分销商上级
    public function getShopParent($site_id, $member_id){
        return (new ShopFenxiao())->where('site_id', $site_id)->where('member_id', $member_id)->value('parent');
    }

    //获取会员的直推上级
    public function getParentMember($site_id, $member_id){
        // return (new LianMember())->where('site_id', $site_id)->where('member_id', $member_id)->value('pid');
        return (new LianMember())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
    }

    //获取会员的链动上级
    public function getLianParentMember($site_id, $member_id){
        return (new LianMember())->where('site_id', $site_id)->where('lian_pid', $member_id)->findOrEmpty();
    }


    public function buyParentCheck($site_id, $data, $member){
        $pid = $this->getParentMember($site_id, $member['member_id']); //获取会员的直推上级ID
    }


    public function getMemberReward($site_id, $member){
        
    }

    //累加会员的已发放收益
    public function incGiveCommission($site_id, $member_id, $reward){
        $data = [
            'give_commission' => ['inc', $reward], //增加已发放收益字段值
        ];
        $this->model->where('site_id', $site_id)->where('member_id', $member_id)->update($data);
    }


    //增加链动会员总收益
    public function incReward($site_id, $member_id, $reward){
        $data = [
            'commission' => ['inc', $reward], //增加总收益字段值
        ];
        $this->model->where('site_id', $site_id)->where('member_id', $member_id)->update($data);

    }


    //增加链动会员冻结收益
    public function incFrozenReward($site_id, $member_id, $reward){
        $data = [
            'frozen_commission' => ['inc', $reward], //增加冻结收益字段值
        ];
        $this->model->where('site_id', $site_id)->where('member_id', $member_id)->update($data);
    }


    //累减链动会员冻结收益
    public function decFrozenReward($site_id, $member_id, $reward){
        $data = [
            'frozen_commission' => ['dec', $reward], //累减冻结收益字段值
        ];
        $this->model->where('site_id', $site_id)->where('member_id', $member_id)->update($data);
    }

    //解冻链动会员冻结收益
    public function unfrozenReward($site_id, $member){
        Log::write('链动解冻收益开始', 'unfrozen_reward');
        $account_type = (new CoreLianRewardAttrService())->getTakeType($site_id);
        $frozen = $this->model
            ->where('site_id', $site_id)
            ->where('member_id', $member['member_id'])
            ->where('thaw_status', 0)
            ->value('frozen_commission'); 

        if($frozen > 0){ 
            $this->decFrozenReward($site_id, $member['member_id'], $frozen);
            
            //发放收益到用户账户
            (new CoreMemberAccountService())->addLog($site_id, $member['member_id'], $account_type, $frozen, 'ly_lian', '链动冻结收益解冻发放');

            //累加会员已发放收益
            (new CoreLianMemberAttrService())->incGiveCommission($site_id, $member['member_id'], $frozen); 

            //更新奖励记录为已解冻状态
            $this->unfrozenRewardLog($site_id, $member);
        }    
    }


    //解冻链动会员冻结金额记录
    public function unfrozenRewardLog($site_id, $member){
        $frozen_list = (new CoreLianRewardAttrService())->getFrozenRewardList($site_id, $member);
        if(!$frozen_list->isEmpty()){ 
            foreach($frozen_list as $key => $value){ 
                $data = [ 
                    'thaw_status' => 1, 
                    'update_time' => time(), 
                    'unfrozen_time' => time(), 
                    'frozen_amount' => 0.00,
                ];
                (new LianReward())->where('site_id', $site_id)->where('id', $value['id'])->update($data); 
            }
        }
    }


    //更改会员冻结收益状态为-1，失效，不再被解冻
    public function expireFrozenCommission($site_id, $member){
        $data = [
            'thaw_status' => -1, 
            // 'frozen_commission' => 0,  
            'update_time' => time(),
        ];
        $this->model->where('site_id', $site_id)->where('member_id', $member['member_id'])->update($data);
        $this->expireFrozenRewardLog($site_id, $member);
    }


    //更改会员奖励记录中的冻结状态为-1，失效，不再被解冻
    public function expireFrozenRewardLog($site_id, $member){
        $frozen_list = (new CoreLianRewardAttrService())->getFrozenRewardList($site_id, $member); 

        if(!$frozen_list->isEmpty()){ 
            foreach($frozen_list as $key => $value){ 
                $data = [ 
                    'thaw_status' => -1,  
                    // 'frozen_amount' => 0,
                    'update_time' => time(), 
                ];
                (new LianReward())->where('site_id', $site_id)->where('id', $value['id'])->update($data);
            }
        }
    }

}

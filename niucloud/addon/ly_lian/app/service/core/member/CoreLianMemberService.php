<?php

namespace addon\ly_lian\app\service\core\member;

use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianChange;
use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\service\admin\LevelService;
use addon\ly_lian\app\service\core\order\CoreLianRewardService;
use addon\ly_lian\app\service\core\member\CoreLianLevelService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use addon\ly_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService as CoreLyFenxiaoConfigService;
use core\base\BaseCoreService;
use core\base\BaseModel;
use core\exception\CommonException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Model;
use think\facade\Log;


/**
 * 链动会员
 * Class CoreLianMemberService
 * @package addon\ly_lian\app\service\core
 */
class CoreLianMemberService extends BaseCoreService
{

    /**
     * 获取会员链动关系
     * @param $site_id
     * @param $member_id
     *
     */
    public function getLianMemberCreateIfNotExists($site_id, $member_id)
    {
        $lian_member = (new LianMember())->where([['member_id', '=', $member_id], ['site_id', '=', $site_id]])->findOrEmpty();
        if ($lian_member->isEmpty()) {
            $insert_data = [
                'member_id' => $member_id,
                'site_id' => $site_id,
                'lian_member_id' => 0
            ];
            $lian_member = (new LianMember())->create($insert_data);
        }
        return $lian_member->toArray();
    }

    /**
     * 会员注册成功事件处理
     * @param $member
     */
    public function memberRegister($site_id, $member)
    {
        // $min_level = (new LevelService())->getMinLevel();
        $min_level = (new CoreLianLevelService())->getMinLevel($site_id);
        //添加链动会员表
        $data = [
            'site_id' => $site_id,
            'pid' => $member['pid'] ?? 0,
            'member_id' => $member['member_id'],
            'lian_pid' => $member['lian_pid'] ?? 0,
            'level_id' => $min_level['level_id'],
        ];
        (new LianMember())->create($data);
        $this->bindRelation($site_id, $member['member_id'], 1);
        return true;
    }


    /**
     * 会员上下级绑定，会员必须存在
     * @param int $site_id
     * @param int $member_id
     * @param int $child_condition 1 注册 2 首次下单 3 首次付款
     */
    public function bindRelation(int $site_id, int $member_id, int $child_condition)
    {
        Log::write('==================ly__lian================bindRelation');
        // $ly_fenxiao_config = (new CoreLyFenxiaoConfigService())->getFenxiaoConfig($site_id);//检测新客商插件是否开启

        // if ($ly_fenxiao_config['is_fenxiao'] != 0) {
            // $fenxiao_config = (new CoreLyFenxiaoConfigService())->getFenxiaoConfig($site_id);
        // }else{
             //检测触发场景和设置是否匹配
            $fenxiao_config = (new CoreFenxiaoConfigService())->getFenxiaoConfig($site_id);
        // }
        Log::write('===============ly_lian=============fenxiaoconfig' . json_encode($fenxiao_config));

        $config_child_condition = $fenxiao_config['child_condition'];
        if ($child_condition != $config_child_condition) return;

        //获取最低链动等级信息
        $level_info = (new CoreLianLevelService())->getMinLevel($site_id);

        //查询会员绑定信息
        $lian_member_info = (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        //如果当前用户已经是链动或者没有推荐人
        if ($lian_member_info['level_id'] == 0) return;

        if($lian_member_info['pid'] > 0){
            //查询链动会员信息
            $parent = (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $lian_member_info['pid']], ['status', '=', 0]])->findOrEmpty();

            if (!$parent->isEmpty()) {
                //绑定关系
                (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])
                    ->update([ 'lian_pid' => $parent['member_id'], 'level_id' => $level_info['level_id'], 'update_time' => time()]);
                //绑定上级事件
                // CoreLianMemberAttrService::memberBindFenxiao($site_id, $parent['member_id']);

                //绑定为上级的前2直推下级
                if(empty($parent['child_num1'])){
                    $parent['child_num1'] = $member_id;
                    $parent->save();
                }elseif(empty($parent['child_num2'])){
                    $parent['child_num2'] = $member_id;
                    $parent->save();
                    // $this->bossLevelUp($site_id, $parent);
                    (new CoreLianLevelService())->lianMemberUpgrade($site_id, $parent['member_id']);
                }
            }
        }
        
        return true;
    }

    /**
     * 订单创建后执行会员方法
     * @param $site_id
     * @param $data
     */
    public function orderCreate($site_id, $member_id)
    {
        $this->bindRelation($site_id, $member_id, 2);
    }

    /**
     * 订单支付后执行会员方法
     * @param $site_id
     * @param $data
     */
    public function orderPay($site_id, $data)
    {
        $this->bindRelation($site_id, $data['order_data']['member_id'], 3);
    }


    public function bindChildMember($site_id, $member_id, $order_data){
        Log::write('==================ly__lian================bindChildMember');
        //获取最低链动等级信息
        $level_info = (new CoreLianLevelService())->getMinLevel($site_id);
        $lian_member_info = (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
        Log::write('==================ly__lian================lian_member_info.11111111111' );
        if($lian_member_info['pid'] > 0) {
            Log::write('==================ly__lian================lian_member_info.22222222222' );
            //查询链动会员信息
            $parent = (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $lian_member_info['pid']], ['status', '=', 0]])->findOrEmpty();

            if (!$parent->isEmpty()) {
                Log::write('==================ly__lian================lian_member_info.33333333333' . json_encode($parent) );
                //绑定关系
                (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])
                    ->update([ 'lian_pid' => $parent['member_id'], 'level_id' => $level_info['level_id'], 'update_time' => time()]);

                //绑定为上级的前2直推下级
                if($parent['child_mid1'] == 0){
                    $parent['child_mid1'] = $member_id;
                    $parent->save();
                }elseif($parent['child_mid2'] == 0){
                    $parent['child_mid2'] = $member_id;
                    $parent->save();
                    // $this->bossLevelUp($site_id, $parent);
                    (new CoreLianLevelService())->bossMemberUpgrade($site_id, $parent, $order_data);
                }
            }
        }
    }


    public function bossLevelUp($site_id, $member, $order_data){
        Log::write('==================ly_lian=================bossLevelUp');
        //自己升级，下级留给上级
        if($member['lian_pid'] > 0){
            $member_list = (new LianMember())->where('site_id', $site_id)->where('lian_pid', $member['member_id'])->select();
            Log::write('===========ly_lian=========='. json_encode($member_list) );

            foreach ($member_list as $m){
                $old_lian_pid = $m['lian_pid'];
                $new_lian_pid = $member['lian_pid'];
                $m['lian_pid'] = $new_lian_pid; 
                $m->save();

                //变动记录
                (new CoreLianMemberAttrService())->addLianChange($site_id, $m['member_id'], $m['pid'], $old_lian_pid, $new_lian_pid, $m['level_id'],'上级升级，链动上级变更为' . $new_lian_pid . '原链动上级为' . $old_lian_pid);
            }
        }
    
        //自己升级,脱离上级
        $member_lian_pid = $member['lian_pid'];
        $boss_level = (new CoreLianLevelService())->getMaxLevel($site_id);
        $member['lian_pid'] = 0; 
        $member['level_id'] = $boss_level['level_id'];
        $member['up_time'] = time();
        $member->save();

        //变动记录
        (new CoreLianMemberAttrService())->addLianChange($site_id, $member['member_id'], $member['pid'], $member_lian_pid, 0, $boss_level['level_id'],'升级为' . $boss_level['level_name']);
        
        //尝试培育奖
        if($member['pid'] > 0){
            $parent = (new LianMember())->where('site_id', $site_id)->where('member_id', $member['pid'])->findOrEmpty();
            if(!$parent->isEmpty()){
                (new CoreLianRewardService())->cultivateReward($site_id, $parent, $order_data);
            }
        }
    }


    

    /**
     * 递归获取所有上级
     * 获取上级
     * @param $member_id
     * @return mixed
     */
    public function getAllParentWithLevelList($member_id)
    {
        $parent_list = [];
        $this->getAllParentList($member_id, $parent_list);
        if (!empty($parent_list)) {
            //等级
            $level_ids = array_filter(array_unique(array_column($parent_list, 'level_id')));
            $level_list = $level_ids ? (new Level())->where([['level_id', 'in', $level_ids]])->column('*', 'level_id') : [];
           
            foreach ($parent_list as &$v) {
                $v['level_data'] = $level_list[$v['level_id']] ?? []; 
            }
        }
        return $parent_list ?? [];
    }

    /**
     * 递归获取所有上级(通过传入最下级链动会员)
     * @param $member_id
     * @param $list
     * @return true
     */
    public function getAllParentList($member_id, &$list = [])
    {
        if (isset(array_column($list, null, 'member_id')[$member_id])) return true;//防无效数据
        $condition = [
            ['member_id', '=', $member_id]
        ];
        $field = 'site_id,member_id,level_id,pid,lian_pid,status';
        $lian = (new LianMember())->where($condition)
            ->field($field)
            ->findOrEmpty();
        if (!$lian->isEmpty()) {
            $list[] = $lian->toArray();
            $parent = $lian['pid'] ?? 0;
            if ($parent > 0) {
                $this->getAllParentList($parent, $list);
            }
        }
        return true;
    }

    /**
     * 获取链动会员信息
     * @param $site_id
     * @param $member_id
     * @return array|BaseModel|mixed|Model
     */
    public function findLianMember($site_id, $member_id)
    {
        return (new LianMember())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
    }

}

<?php

namespace addon\ly_lian\app\service\core\member;

use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianGoods;
use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\Member;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreLianLevelService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Level();
    }


    public function getMinLevel($site_id){
        $info = $this->model->where('site_id', $site_id)->where('level_num', 1)->findOrEmpty();
        return $info;
    }


    public function getMaxLevel($site_id){
        $info = $this->model->where('site_id', $site_id)->where('level_num', 2)->findOrEmpty();
        return $info;
    }


    public function getLevelList($site_id){
        $list = $this->model->where('site_id', $site_id)->order('level_num', 'asc')->select();
        return $list;
    }


    /**
     * 链动升级检测
     */
    public static function lianMemberUpgrade($site_id, $lian_member)
    {
        try {
            Log::write('=================ly_lian================进入链动升级检测======lianMemberUpgrade');
            $level_one = (new Level())->where('site_id', $site_id)->where('level_num', 1)->findOrEmpty();

            $lian_member['recommend_num'] = (new Fenxiao())->where('site_id', $site_id)->where('parent', $lian_member['member_id'])->count();
            
            $lian_member['up_goods_num'] = self::getMemberUpGoosNum($site_id, $lian_member);
            log::write('=================ly_lian================会员ID:' . $lian_member['member_id'] . '推荐人数:' . $lian_member['recommend_num'] . '链动商品购买数:' . $lian_member['up_goods_num']);

            $upgrade_level = [];
                if($level_one['upgrade_type'] == 1){
                    if($lian_member['up_goods_num'] >= $level_one['up_goods_num'] && $lian_member['recommend_num'] >= $level_one['recommend_num']){
                        $upgrade_level = $level_one;
                    }
                }else {
                    if ($lian_member['recommend_num'] >= $level_one['recommend_num'] || $lian_member['up_goods_num'] >= $level_one['up_goods_num']) {
                        $upgrade_level = $level_one;
                    }
                }   
                if($upgrade_level){
                    // (new LianMember())->create(['site_id' => $site_id, 'member_id' => $lian_member_id, 'level_id' => $upgrade_level['level_id']]);
                    (new CoreLianMemberAttrService())->autoLianMember($site_id, $lian_member['member_id']);
                    return true;
                }   

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }


    public function bossMemberUpgrade($site_id, $lian_member, $order_data){
        try {
            Log::write('=================ly_lian================链动会员升级boss');
            $level_two = (new Level())->where(['site_id' => $site_id, 'level_num' => 2])->findOrEmpty();

            $lian_member['recommend_num'] = (new LianMember())->where('site_id', $site_id)->where('pid', $lian_member['member_id'])->count();
            $lian_member['up_goods_num'] = $this->getMemberUpGoosNum($site_id, $lian_member);//获取用户升级商品数量
            Log::write('=================ly_lian================链动会员升级boss' . $lian_member['member_id'] . '推荐人数:' . $lian_member['recommend_num'] . '链动商品购买数:' . $lian_member['up_goods_num'] . '');
            
            $upgrade_level = [];
            if($level_two['upgrade_type'] == 1){//升级条件为且关系时，满足条件直接升级
                if (($lian_member['recommend_num'] >= $level_two['recommend_num']) && ($lian_member['up_goods_num'] >= $level_two['up_goods_num'])) {
                    $upgrade_level = $level_two;//
                }
            }else{
                if(($lian_member['recommend_num'] >= $level_two['recommend_num']) || ($lian_member['up_goods_num'] >= $level_two['up_goods_num'])){
                    $upgrade_level = $level_two;//
                }
            }
            if ($upgrade_level) {//升级条件满足时，进行升级操作，并返回升级后的用户信息，否则返回空数组。
                (new CoreLianMemberService())->bossLevelUp($site_id, $lian_member, $order_data);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }


    public static function getMemberUpGoosNum($site_id, $lian_member){//获取用户升级商品数量
        $goods_ids = (new LianGoods())->where('site_id', $site_id)->where('is_lian', 1)->column('goods_id');//链动商品id集合
        $config = (new CoreConfigService())->getLianConfig($site_id);

        if ($config['up_way'] == 1) {
            $statusConditions = ['o.status' => [OrderDict::FINISH]];
        } else {
            $statusConditions = ['o.status' => [OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH]];
        }

        $lian_member['up_goods_num'] = (new OrderGoods())->alias('og')
                ->where('og.site_id', $site_id)
                ->where('og.member_id', $lian_member['member_id'])
                ->whereIn('og.goods_id', $goods_ids)
                ->join('shop_order o', 'og.order_id = o.order_id', 'INNER')
                ->whereIn('o.status', $statusConditions['o.status'])
                ->count(); 
        
        return $lian_member['up_goods_num'];
    }


    public function getLevelByMember($site_id, $member){

        $level = (new Level())->where('site_id', $site_id)->where('level_id', $member['level_id'])->findOrEmpty();
        return $level;
    }
}
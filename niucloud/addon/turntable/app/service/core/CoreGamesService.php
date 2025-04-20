<?php
#######################################################################
# File Name: CoreGamesService.php
# Desc:
# Author: hd
# Created Time: 2024/6/29 21:24
#######################################################################
namespace addon\turntable\app\service\core;
use addon\dianz_invitation\app\model\MemberInvitationRulesAwardModel;
use addon\turntable\app\model\PromotionTurntableGamesBanner;
use addon\turntable\app\model\PromotionTurntableGamesDrawRecord;
use addon\turntable\app\model\PromotionTurntableGamesSettings;
use app\model\member\MemberAccountLog;
use app\model\member\Member;
use addon\turntable\app\model\PromotionTurntableGamesAward;
use app\service\admin\site\SiteService;
use app\service\api\member\MemberService;
use Carbon\Carbon;
use core\base\BaseCoreService;
use core\base\BaseService;
use addon\turntable\app\model\PromotionTurntableGames;
use core\exception\ApiException;
use JetBrains\PhpStorm\ArrayShape;
use think\facade\Db;
use think\Model;

class CoreGamesService extends BaseCoreService {
    protected PromotionTurntableGamesAward $gamesDraw;
    protected PromotionTurntableGamesDrawRecord $drawRecord;
    protected PromotionTurntableGamesBanner $gamesBanner;
    public function __construct(){
        parent::__construct();
        $this->model = new PromotionTurntableGames();
        $this->gamesDraw = new PromotionTurntableGamesAward();
        $this->drawRecord = new PromotionTurntableGamesDrawRecord();
        $this->gamesBanner = new PromotionTurntableGamesBanner();
    }

    public function getGamesInfo($conditions): array
    {
        return $this->model->getGamesInfo($conditions);
    }
    public function getGamesDrawInfo($conditions): array
    {
        return $this->gamesDraw->getGamesDrawInfo($conditions);
    }
    public function getGamesDrawRecordInfo($conditions): array
    {
        return $this->drawRecord->getGamesDrawRecordInfo($conditions);
    }
    public function getGamesDrawList($conditions): array
    {
        $response =  $this->pageQuery(
            $this->gamesDraw->getGamesDrawPageList($conditions)
        );
        foreach ($response['data'] as $key=>$item){
            $response['data'][$key]['prize'] = $this->gamesDraw->getAwardTypeText($item['award_type']);
            $response['data'][$key]['assign_crowd'] = !empty($item['assign_crowd'])?json_decode($item['assign_crowd'],true):[];
        }
        return $response;
    }
    public function getGamesBannerList($conditions): array
    {
        return $this->gamesBanner->getGamesBannerList($conditions);
    }

    /**
     * @throws \think\db\exception\DbException
     */
    public function getGamesDrawRecordPageList($conditions, $betweenWhere = [], $finds='*',): array
    {
        return $this->pageQuery(
            $this->drawRecord->getGamesDrawRecordPageList($conditions)
        );
    }
    public function memberAccount($entity,$operation = 'inc'){
        $operations = '+';
        $accountNewData = $accumulationData = 0;
        $memberAccount = (new MemberService())->findMemberInfo(['member_id'=>$entity['memberId'],'site_id'=>$entity['site_id']])->toArray();
        $msg = '';
        if ($entity['accountType'] == PromotionTurntableGames::POINT) {
            $msg = '账户积分';
        }
        if ($entity['accountType'] == PromotionTurntableGames::GROWTH) {
            $msg = '账户经验';
        }
        if($entity['accountType'] == PromotionTurntableGames::BALANCE){
            $msg = '账户余额';
        }
        if($operation =='inc'){
            $precision = ($entity['accountType'] == PromotionTurntableGames::BALANCE) ? 2 : 0;
            $accountNewData = bcadd($memberAccount[$entity['accountType']], $entity['accountData'], $precision);
            $accumulationData = bcadd($memberAccount[$entity['accumulationType']], $entity['accountData'], $precision);
            if($accountNewData > 99999999){
                throw new ApiException($msg.'不可超出99999999');
            }
        }
        if($operation =='dec'){
            $accountNewData = intval(bcsub($memberAccount[ $entity['accountType'] ],$entity['accountData']));
            if($accountNewData < 0){
                throw new ApiException($msg.'不可小于0');
            }
            $operations = '-';
        }
        try {
            Db::startTrans();
            $data = array (
                'member_id'    => $entity['memberId'],
                'site_id'      => $entity['site_id'],
                'account_type' => $entity['accountType'],
                'account_data' => $operations.$entity['accountData'],
                'account_sum'  => $accountNewData,
                'from_type'    => $entity['fromType'],
                'related_id'   => $memberAccount['member_id'],
                'create_time'  => Carbon::now()->timestamp,
                'memo'         => $entity['remark'],
            );
             (new MemberAccountLog())->create($data);
            (new Member())->update([
                $entity['accountType'] => $accountNewData,
            ], [
                'member_id' => $entity['memberId']
            ]);
            if($operation =='inc'){
                (new Member())->update([
                    $entity['accumulationType'] => $accumulationData,
                ], [
                    'member_id' => $entity['memberId']
                ]);
            }
            Db::commit();
        }catch (\Exception $e){
            Db::rollback();
            throw new ApiException($e->getMessage());
        }
        return $memberAccount;
    }
    // 获取用户分享活动次数
    #[ArrayShape(['invitationRulesList' => "array", 'rewards' => "int"])]
    public function getMemberRecommendAwardSum($condition): array
    {
        $rewards = 0;
        $memberInvitationRulesList = [];

        // 获取是否授权了会员营销插件
        if ($this->hasAuthorizationApp($condition)) {
            // 获取当前时间
            $now = Carbon::now();

            // 获取会员邀请规则列表
            $memberInvitationRulesList = (new MemberInvitationRulesAwardModel())->where($condition)->select()->toArray();

            // 遍历奖励列表，计算有效奖励
            foreach ($memberInvitationRulesList as $item) {
                // 获取奖励失效时间
                $rewardFailureTime = !empty($item['reward_failure_time']) ? Carbon::parse($item['reward_failure_time']) : null;

                // 判断奖励是否有效
                if (!$rewardFailureTime || $now->lt($rewardFailureTime)) {
                    $rewards += $item['rewards'];
                }
            }
        }

        // 返回奖励总额
        return [
            'invitationRulesList' => $memberInvitationRulesList,
            'rewards'             => $rewards,
        ];
    }
    public function updateRewardUsageStatus($invitationRulesList): bool{
        // 获取当前时间
        $currentTime = Carbon::now();

        $validRewards = array_filter($invitationRulesList, function($item) use ($currentTime) {
            return !empty($item['reward_failure_time']) && $currentTime->lt(Carbon::parse($item['reward_failure_time'])) && $item['is_used'] == 0;
        });

        if (!empty($validRewards)) {

            $randomRewardKey = array_rand($validRewards);
            $randomReward = $validRewards[$randomRewardKey];

            if ($randomReward['rewards'] > 1) {
                (new MemberInvitationRulesAwardModel())->where([
                    'award_id'=>$randomReward['award_id']
                ])->dec('rewards', 1)->update();
            }else {
                (new MemberInvitationRulesAwardModel())->where([
                    'award_id'=>$randomReward['award_id']
                ])->update(['is_used'=>1]);
            }
        }
        return true;
    }
    // 判断站点是否授权了会员营销插件
    public function hasAuthorizationApp($condition): bool {
        // 获取站点信息
        $siteInfo = (new SiteService())->getInfo($condition['site_id']);

        // 如果站点信息存在，检查是否包含 dianz_invitation 插件
        if ($siteInfo) {
            foreach ($siteInfo['site_addons'] as $addon) {
                if ($addon['key'] === 'dianz_invitation') {
                    return true;  // 找到插件，返回授权状态为 true
                }
            }
        }

        // 如果没有找到该插件，返回 false
        return false;
    }
}
<?php
#######################################################################
# File Name: PromotionTurntableGamesApiService.php
# Desc:
# Author: hd
# Created Time: 2024/7/2 09:18
#######################################################################
namespace addon\turntable\app\service\api;
use addon\shop\app\service\api\marketing\CouponService;
use addon\shop\app\service\core\coupon\CoreCouponMemberService;
use addon\turntable\app\model\PromotionTurntableGames;
use addon\turntable\app\model\PromotionTurntableGamesAward;
use addon\turntable\app\model\PromotionTurntableGamesDrawRecord;
use addon\turntable\app\service\core\CoreGamesService;
use addon\turntable\utils\Utils;
use app\service\api\member\MemberService;
use Carbon\Carbon;
use core\base\BaseApiService;
use core\exception\ApiException;
use JetBrains\PhpStorm\ArrayShape;

class PromotionTurntableGamesApiService extends BaseApiService{

    protected CoreGamesService $coreService;
    protected PromotionTurntableGamesAward $gameWard;
    protected PromotionTurntableGamesDrawRecord $drawRecord;
    protected string $defaultTips = '未中奖';
    public function __construct()
    {
        parent::__construct();
        $this->model = new PromotionTurntableGames();
        $this->gameWard = new PromotionTurntableGamesAward();
        $this->drawRecord = new PromotionTurntableGamesDrawRecord();
        $this->coreService = new CoreGamesService();
    }

    public function getGameDrawRecord($conditions){
        $response = $this->pageQuery(
            $this->drawRecord->getGamesDrawRecordPageList([
                'game_id'=>$conditions['game_id'],
                'is_winning'=>PromotionTurntableGamesDrawRecord::WIN,
                'member_id'=>$this->member_id
            ])
        );
        foreach ($response['data'] as $key=>$item){
            if($item['award_type'] == PromotionTurntableGamesAward::PRIZE_GIFT){
                $drawRecord = $this->coreService->getGamesDrawInfo([
                    'award_id'=>$item['award_id']
                ]);
                $response['data'][$key]['award_img'] = $drawRecord['award_img'];
            }
        }
        return $response;
    }
    public function lottery($conditions){
        $gameInfo = $this->model->getGamesInfo([
            'game_id'=>$conditions['game_id']
        ]);
        if(empty($gameInfo)){
            throw new ApiException('未获取到游戏信息');
        }
        if($gameInfo['status'] == PromotionTurntableGames::STATUS_NOT_STARTED){
            throw new ApiException('游戏尚未开始');
        }
        if($gameInfo['status'] == PromotionTurntableGames::STATUS_ENDED){
            throw new ApiException('游戏已经结束');
        }
        $memberInfo  = (new MemberService())->findMemberInfo(['member_id'=>$this->member_id,'site_id'=>$this->site_id])->toArray();
        if(empty($memberInfo)){
            throw new ApiException('未获取到会员信息');
        }
        if (!empty($gameInfo[ 'level_id' ])) {
            $level = explode(',', $gameInfo[ 'level_id' ]);
            if (!in_array($memberInfo[ 'member_level' ], $level)) {
                throw new ApiException("只有{$gameInfo['level_name']}等级的会员可参与该活动");
            }
        }
        $shareCountList = $this->checkInvitationRulesAward($gameInfo);
        if ($gameInfo[ 'join_type' ] == 0) { //每天
            $getTodayStartEnd = Utils::getTodayStartEnd();
            $luckDrawNum = $this->getDrawRecordCount([
                'where'=>[
                    'game_id'   =>$conditions['game_id'],
                    'member_id' =>$this->member_id
                ],
                'betweenWhere'=>[
                    ['create_time', '>=',$getTodayStartEnd['todayStart']],
                    ['create_time', '<=',$getTodayStartEnd['todayEnd']]
                ]
            ]);
        }else{ //全程
            $luckDrawNum = $this->getDrawRecordCount([
                'where'=>[
                    'game_id'   =>$conditions['game_id'],
                    'member_id' =>$this->member_id
                ],
                'betweenWhere'=>[]
            ]);
        }
        // 剩余次数 = 游戏配置次数 + 分享次数 - 已抽取次数
        $residueNumber = max(0,$gameInfo[ 'join_frequency' ] + $shareCountList['rewards'] - $luckDrawNum);
        if($residueNumber > $gameInfo['join_frequency'] + $shareCountList['rewards']){
            throw new ApiException("您今日的抽奖次数已用完");
        }
        if ($gameInfo[ 'points' ] > 0 && $memberInfo[ 'point' ] < $gameInfo[ 'points' ]){
            throw new ApiException("积分不足");
        }
        $lotteryResult = $this->lotteryCalculate($gameInfo);
        $memberAccount  = (new MemberService())->findMemberInfo(['member_id'=>$this->member_id,'site_id'=>$this->site_id])->toArray();
        $record = [
            'game_id' => $gameInfo['game_id'],
            'site_id' => $this->site_id??0,
            'game_type' => $gameInfo[ 'game_type' ],
            'member_id' => $this->member_id,
            'member_nick_name' => $memberAccount[ 'nickname' ],
            'points' => $gameInfo[ 'points' ],
            'award_name'=>$this->defaultTips,
            'create_time' =>Carbon::now()->toDateTimeString(),
            'created_at'  =>Carbon::now()->toDateTimeString()
        ];
        try {
            if ($gameInfo[ 'points' ] > 0) {
                // 扣除积分
                $this->coreService->memberAccount([
                    'memberId'=>$this->member_id,
                    'site_id'=>$this->site_id??0,
                    'accountType'=>'point',
                    'accountData'=>$gameInfo[ 'points' ],
                    'fromType'=>'turntable',
                    'relateTag'=>0,
                    'remark'=>'参与活动扣除' . $gameInfo[ 'points' ] . '积分'
                ],'dec');
            }
            if ($lotteryResult[ 'is_winning' ]) {
                switch ($lotteryResult['award_type']) {
                    case PromotionTurntableGames::AWARD_TYPE_POINT:
                        // 积分
                        $this->coreService->memberAccount([
                            'memberId'=>$this->member_id,
                            'site_id'=>$this->site_id??0,
                            'accountType'=>'point',
                            'accountData'=>$lotteryResult[ 'point' ],
                            'fromType'=>'turntable',
                            'accumulationType'=>'point_get',
                            'remark'=>'活动奖励发放' . $lotteryResult[ 'point' ] . '积分'
                        ]);
                        break;
                        //余额
                    case PromotionTurntableGames::AWARD_TYPE_BALANCE:
                        $this->coreService->memberAccount([
                            'memberId'=>$this->member_id,
                            'site_id'=>$this->site_id??0,
                            'accountType'=>'balance',
                            'accountData'=>$lotteryResult[ 'balance' ],
                            'fromType'=>'turntable',
                            'accumulationType'=>'balance_get',
                            'remark'=>'活动奖励发放' . $lotteryResult[ 'balance' ] . '余额'
                        ]);
                        break;
                    case PromotionTurntableGames::AWARD_TYPE_COUPON:
                        (new CoreCouponMemberService())->sendCoupon($this->site_id,$this->member_id,$lotteryResult['relate_id'],1);
                        break;
                }
                $record[ 'is_winning' ] = PromotionTurntableGamesDrawRecord::WIN;
                $record[ 'award_id' ] = $lotteryResult[ 'award_id' ];
                $record[ 'award_name' ] = $lotteryResult['award_name'];
                $record[ 'award_type' ] = $lotteryResult[ 'award_type' ];
                $record[ 'relate_id' ] = $lotteryResult[ 'relate_id' ];
                $record[ 'relate_name' ] = $lotteryResult[ 'relate_name' ];
                $record[ 'point' ] = $lotteryResult[ 'point' ];
                $record[ 'balance' ] = $lotteryResult[ 'balance' ];
                $record[ 'site_id' ] = $this->site_id??0;
                $this->model->setInc(['game_id'=>$gameInfo['game_id']],'winning_num');

                $this->gameWard->setDec(['award_id'=>$lotteryResult['award_id']],'remaining_num');

                $this->gameWard->setInc(['award_id'=>$lotteryResult['award_id']],'receive_num');
            }
            $this->drawRecord->createDrawRecord($record);
            //修改分享奖励次数
            $this->coreService->updateRewardUsageStatus($shareCountList['invitationRulesList']);
        }catch (\Exception $e){
            throw new ApiException('服务异常');
        }
        return $lotteryResult;
    }
    #[ArrayShape(['gameInfo' => "array", 'award' => "array", 'drawRecord' => "array", 'gameBanner' => "array"])]
    public function getGamesInfo($conditions): array
    {
        $gameWardInfo = $drawRecordData = $gameBanner = [];
        $gameInfo = $this->model->getGamesInfo([
            'game_id'=>$conditions['game_id']
        ]);
        if(empty($gameInfo)){
            return [];
        }
        $gameInfo['is_app'] = $this->coreService->hasAuthorizationApp([
            'site_id'=>$gameInfo['site_id']
        ]);
        $not_winning = $this->gameWard->defaultNotWinning;
        if(!empty($gameInfo)){
            $not_winning['award_img'] = $gameInfo['no_winning_img'];
            $gameWardInfo = $this->gameWard->getGamesDrawList([
                'game_id'=>$conditions['game_id']
            ]);
            $count = count($gameWardInfo);
            if ($count < 7) {
                $gameWardInfo = array_merge($gameWardInfo, array_fill(0, 8 - $count, $not_winning));
                shuffle($gameWardInfo);
            }else{
                $gameWardInfo[] = $not_winning;
            }
            // 中奖名单
            if(!$gameInfo[ 'is_show_winner' ]){
                $drawRecordData = $this->coreService->getGamesDrawRecordPageList([
                    'game_id'       =>$conditions['game_id'],
                    'is_winning'    =>PromotionTurntableGamesDrawRecord::WIN
                ],[],'member_nick_name,award_name,create_time');
            }
            // 剩余次数
            if($gameInfo[ 'join_frequency' ] && $this->member_id){
                $gameInfo['surplus_num'] = $this->getMemberSurplusNum($gameInfo);
            }
            $gameBanner = $this->coreService->getGamesBannerList([
                'game_id'=>$conditions['game_id']
            ]);
        }
        return [
            'gameInfo'      =>$gameInfo,
            'award'         =>$gameWardInfo,
            'drawRecord'    =>$drawRecordData,
            'gameBanner'    =>$gameBanner
        ];
    }
    public function getDrawRecordCount($conditions): int
    {
        return $this->drawRecord->withSearch([
            'record_id','member_nick_name','member_id','point','game_id','site_id'
        ], $conditions['where'])->where($conditions['betweenWhere'])->select()->count();
    }

    //获取会员剩余可抽奖次数
    public function getMemberSurplusNum($gameInfo){
        $residueNumber = 0;
        if (!empty($gameInfo)) {
            $shareCountList = $this->checkInvitationRulesAward($gameInfo);
            if ($gameInfo[ 'join_type' ] == 0) { //每天
                $getTodayStartEnd = Utils::getTodayStartEnd();
                $luckDrawNum = $this->getDrawRecordCount([
                    'where'=>[
                        'game_id'   =>$gameInfo['game_id'],
                        'member_id' =>$this->member_id
                    ],
                    'betweenWhere'=>[
                        ['create_time', '>=',$getTodayStartEnd['todayStart']],
                        ['create_time', '<=',$getTodayStartEnd['todayEnd']]
                    ]
                ]);
            }else{
                $luckDrawNum = $this->getDrawRecordCount([
                    'where'=>[
                        'game_id'   =>$gameInfo['game_id'],
                        'member_id' =>$this->member_id
                    ],
                    'betweenWhere'=>[]
                ]);
            }
            // 剩余次数 = 游戏配置次数 + 分享次数 - 已抽取次数
            $residueNumber = max(0,$gameInfo[ 'join_frequency' ] + $shareCountList['rewards'] - $luckDrawNum);
        }
        return $residueNumber;
    }

    /**
     * 中奖计算
     */
    public function lotteryCalculate($data){
        $rand = random_int(1, 10000);
        $winningPercentage = $data['winning_rate'] * 100;
        $result = ['is_winning' => 0];
        if ($data['winning_rate'] > 0 && $rand <= $winningPercentage) {
            $awardList = $this->gameWard->getLotteryAwardList([
                'game_id'=>$data['game_id']
            ]);
            if (!empty($awardList) && count($awardList) >1) {
                $rateArr = array_column($awardList, 'award_winning_rate');
                $key = Utils::getWeightedRandom($rateArr);
                if (isset($awardList[$key])) {
                    $assignCrowd = !empty($data['assign_crowd']) ? json_decode($data['assign_crowd'], true) : [];
                    // 如果 assign_crowd 为空或当前用户在 assign_crowd 中
                    if (empty($assignCrowd) || isset($assignCrowd[$this->member_id])) {
                        $result = $awardList[$key];
                        $result['is_winning'] = 1;
                        unset($result['award_winning_rate']);
                    }
                }
            }else{
                $this->model->update([
                    'status'=> PromotionTurntableGames::STATUS_ENDED
                ],['game_id'=>$data['game_id']]);
            }
        }
        return $result;
    }

    public function saveAddress($conditions){
        $gameDrawRecord = $this->coreService->getGamesDrawRecordInfo([
            'record_id'=>$conditions['record_id']
        ]);
        if(empty($gameDrawRecord)){
            throw new ApiException("数据异常");
        }
        $this->drawRecord->update([
            'full_address'  =>$conditions['full_address'],
            'mobile'        =>$conditions['mobile'],
            'address_name'  =>$conditions['address_name'],
            'is_receive'    =>PromotionTurntableGamesDrawRecord::REDEEMED

        ],['record_id'=>$conditions['record_id']]);
        return true;
    }
    #[ArrayShape(['invitationRulesList' => "array", 'rewards' => "int"])]
    public function checkInvitationRulesAward($gameInfo):array{
        return $this->coreService->getMemberRecommendAwardSum([
            'site_id'       =>$this->site_id,
            'member_id'     =>$this->member_id,
            'activity_id'   =>$gameInfo['game_id'],
            'is_used'       =>0
        ]);
    }
}
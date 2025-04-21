<?php
#######################################################################
# File Name: PromotionTurntableGamesService.php
# Desc:
# Author: hd
# Created Time: 2024/6/25 11:59
#######################################################################
namespace addon\turntable\app\service\admin;
use addon\turntable\app\model\PromotionTurntableGames;
use addon\turntable\app\model\PromotionTurntableGamesAward;
use addon\turntable\app\model\PromotionTurntableGamesBanner;
use addon\turntable\app\model\PromotionTurntableGamesDrawRecord;
use addon\turntable\app\service\core\CoreGamesService;
use addon\turntable\utils\Utils;
use app\model\member\Member;
use app\service\api\member\MemberService;
use Carbon\Carbon;
use core\base\BaseAdminService;
use core\base\BaseService;
use core\exception\ApiException;
use JetBrains\PhpStorm\ArrayShape;
use think\facade\Db;
use think\Model;

class PromotionTurntableGamesService extends BaseAdminService {

    protected string $_fileds = 'game_id,site_id,game_name,points,start_time,end_time,status,winning_rate,join_num,winning_num,join_type,join_frequency';
    protected array $_editFiled = [
        'game_name','site_id','level_id','level_name','points','start_time','end_time','status','remark',
        'winning_rate','no_winning_img','no_winning_desc','is_show_winner','join_type','join_frequency','template_name','banner_show'
    ];
    protected CoreGamesService $coreService;
    protected PromotionTurntableGamesAward $gamesAwardModel;
    protected PromotionTurntableGamesBanner $gamesBannerModel;
    protected PromotionTurntableGamesDrawRecord $gamesDrawRecord;
    public function __construct(){
        parent::__construct();
        $this->model = new PromotionTurntableGames();
        $this->coreService = new CoreGamesService();
        $this->gamesAwardModel = new PromotionTurntableGamesAward();
        $this->gamesBannerModel = new PromotionTurntableGamesBanner();
        $this->gamesDrawRecord = new PromotionTurntableGamesDrawRecord();
    }

    public function searchList($conditions): array
    {
        $conditions = $this->_filterParams($conditions);
        $response =  $this->pageQuery(
            $this->model->withSearch(['game_name','status','start_time','end_time','site_id'], $conditions['where'])->field($this->_fileds)->where($conditions['betweenWhere'])->order($conditions['order'])
        );
        foreach ($response['data'] as $key=>$item) {
            $response['data'][$key]['status_name'] = $this->model->getStatusText($item['status']);
        }
        return $response;
    }
    public function getInit(array $params = []){
        $gamesInfo = $gamesDraw = $gamesBanner = [];
        if(!empty($params['game_id'])){
            $gamesInfo = $this->coreService->getGamesInfo([
                'game_id'=>$params['game_id']
            ]);
            $gamesDraw = $this->coreService->getGamesDrawList([
                'where'=>[
                    'game_id'=>$params['game_id']
                ],
                'order'=>[]
            ]);
            $gamesBanner = $this->coreService->getGamesBannerList([
                'game_id'=>$params['game_id']
            ]);
        }
        return [
            'gamesInfo'     =>$gamesInfo,
            'gamesDraw'     =>$gamesDraw,
            'gamesBanner'   =>$gamesBanner
        ];
    }
    public function create($entity){
        $this->setGameDataStatus($entity);
        if(empty($entity['games_award'])){
            throw new ApiException('奖品奖项不能少于1项');
        }
//        if($entity['start_time'] < Carbon::today()->setTime(8, 0, 0)){
//            throw new ApiException('活动开始时间小于当前时间，请重新选择');
//        }
        if(Utils::hasDuplicateValues($entity['games_award'],'award_name')){
            throw new ApiException('中奖奖项，奖品名称存在重复值');
        }
        Db::startTrans();
        try {
            $gameId = $this->model->create($entity)->getLastInsID();
            $awardData = $this->getAwardData($entity,$gameId);
            $this->gamesAwardModel->insertAll($awardData);
            $this->gamesBannerModel->createGamesBanner($entity,$gameId);
            Db::commit();
        }catch (Exception $e){
            Db::rollback();
            throw new ApiException('服务异常...');
        }
        return true;
    }
    public function update($entity){
        $this->setGameDataStatus($entity);
        if(empty($entity['games_award'])){
            throw new ApiException('奖品奖项不能少于1项');
        }
        if(Utils::hasDuplicateValues($entity['games_award'],'award_name')){
            throw new ApiException('中奖奖项，奖品名称存在重复值');
        }
        Db::startTrans();
        try {
            $games = $this->model->update($entity,['game_id'=>$entity['game_id']],$this->_editFiled);
            $this->gamesAwardModel->destroy(['game_id'=>$entity['game_id']]);
            $this->gamesBannerModel->destroy(['game_id'=>$entity['game_id']]);
            $awardData = $this->getAwardData($entity,$entity['game_id']);
            $this->gamesAwardModel->insertAll($awardData);
            $this->gamesBannerModel->createGamesBanner($entity,$entity['game_id']);
            Db::commit();
        }catch (Exception $e){
            Db::rollback();
            throw new ApiException('服务异常...');
        }
        return $games;
    }
    public function delete($entity){
        Db::startTrans();
        try {
            $models = [
                $this->model,
                $this->gamesAwardModel,
                $this->gamesBannerModel,
                $this->gamesDrawRecord,
            ];

            foreach ($models as $model) {
                $model->destroy(['game_id' => $entity['game_id']]);
            }

            Db::commit();
        } catch (Exception $e) {
            Db::rollback();
            throw new ApiException('服务异常...');
        }

        return true;
    }
    private function setGameDataStatus(array & $entity){
        // 比较时间并设置状态
        if (Carbon::now()->gt(Carbon::parse($entity['start_time'])) && Carbon::now()->lt(Carbon::parse($entity['end_time']))) {
            $entity['status'] = PromotionTurntableGames::STATUS_STARTED;
        } else {
            $entity['status'] = PromotionTurntableGames::AWARD_TYPE_POINT;
        }

        $entity['game_type']        = PromotionTurntableGames::GAMES_TYPE;
        $entity['game_type_name']   = PromotionTurntableGames::GAMES_TYPE_NAME;
        $entity['created_at']       = Carbon::now()->toDateTimeString();
        $entity['site_id']          = $this->site_id??0;
    }
    private function getAwardData(array $entity,$gameId): array{
        $awardData = [];
        foreach ($entity['games_award'] as $key=>$value){
            $awardImg = ''; $assignCrowd = [];
            if($value['award_type'] == PromotionTurntableGames::AWARD_TYPE_COUPON){
                $awardImg = 'addon/turntable/game_coupon.png';
            }elseif ($value['award_type'] == PromotionTurntableGames::AWARD_TYPE_BALANCE){
                $awardImg = 'addon/turntable/game_hongbao.png';
            }elseif ($value['award_type'] == PromotionTurntableGames::AWARD_TYPE_POINT){
                $awardImg = 'addon/turntable/game_jifen.png';
            }elseif ($value['award_type'] == PromotionTurntableGames::AWARD_TYPE_FREEBIE){
                $awardImg = $value['offlinePrize']??$value['award_img'];
                $assignCrowd = $this->transitionAssignCrowd($value['assign_crowd']);
            }
            $item = [
                'site_id'               => $entity[ 'site_id' ]??0,
                'game_id'               => $gameId,
                'award_name'            => $value[ 'award_name' ],
                'award_img'             => $awardImg,
                'award_type'            => $value[ 'award_type' ],
                'relate_id'             => $value[ 'relate_id' ],
                'relate_name'           => $value['relate_name'] ?? '',
                'point'                 => $value[ 'point' ],
                'balance'               => $value[ 'balance' ],
                'award_num'             => $value[ 'award_num' ],
                'assign_crowd'          => !empty($assignCrowd)?json_encode($assignCrowd):'',
                'award_winning_rate'    => $value[ 'award_winning_rate' ],
                'remaining_num'         => $value[ 'award_num' ],
                'no_winning_img'        => $entity['no_winning_img'] ?? '',
                'created_at'            => $entity['created_at'],
            ];
            $awardData[ $key ] = $item;
        }
        return $awardData;
    }

    public function detail($conditions){
        $conditions = $this->_filterParams($conditions);
        $gameInfo = $this->coreService->getGamesInfo([
            'game_id' =>$conditions['where']['game_id']
        ]);
        $gameAward = $this->coreService->getGamesDrawList($conditions);
        $gameDrawRecord = $this->coreService->getGamesDrawRecordPageList(
            $conditions['where'],$conditions['betweenWhere']);
        $gameInfo['status_name']    = $this->model->getStatusText($gameInfo['status']);
        $gameInfo['level_iid_name'] = $this->model->getLevelIdText($gameInfo['level_id']);
        $gameInfo['is_show_winner_name'] = $this->model->getIsShowWinnerText($gameInfo['is_show_winner']);

        return [
            'basicInfo'         =>$gameInfo,
            'gameAward'         =>$gameAward,
            'gameDrawRecord'    =>$gameDrawRecord
        ];
    }
    public function close($entity){
        $response = 0;
        $gameInfo = $this->model->getGamesInfo([
            'game_id'=>$entity['game_id']
        ]);
        if(!empty($gameInfo)){
            if($gameInfo['status'] != PromotionTurntableGames::STATUS_CLOSED){
                $response = $this->model->update([
                    'status' => PromotionTurntableGames::STATUS_CLOSED
                ],['game_id'=>$entity['game_id']]);
            }
        }else{
            throw new ApiException('该游戏不存在');
        }
        return $response;
    }
    public function open($entity){
        $gameInfo = $this->model->getGamesInfo([
            'game_id'=>$entity['game_id']
        ]);
        if(!empty($gameInfo)){
            if(Carbon::parse($gameInfo['end_time'])->gt(Carbon::now())){
                $response = $this->model->update([
                    'status' => PromotionTurntableGames::STATUS_STARTED
                ],['game_id'=>$entity['game_id']]);
            }else{
                throw new ApiException('游戏已结束');
            }
        }else{
            throw new ApiException('该游戏不存在');
        }
        return $response;
    }
    public function calculate($conditions){
        $percentages = [];
        // 模拟抽奖次数
        $draws = $conditions['number'];
        $results = array_fill(0, count($conditions['dynamicWeight']), 0);
        // 进行抽奖
        for ($i = 0; $i < $draws; $i++) {
            $winner = Utils::getWeightedRandom($conditions['dynamicWeight']);
            $results[$winner]++;
        }

        foreach ($conditions['dynamicWeight'] as $weight) {
            $percentages[] = round(($weight / array_sum($conditions['dynamicWeight'])) * 100,2);
        }
        return [
            'results'       =>$results,
            'percentages'   =>$percentages
        ];

    }
    private function transitionAssignCrowd(array $assignCrowd): array
    {
        $newAssignCrowd = [];
        foreach ($assignCrowd as $item){
            $memberAccount = (new Member())->where([
                'nickname'=>$item
            ])->findOrEmpty();
            if(!$memberAccount->isEmpty()){
                $newAssignCrowd[$memberAccount->member_id] = $item;
            }
        }
        // 确保原始索引没有变化，保留数组的顺序
        return  $newAssignCrowd;
    }
    #[ArrayShape(['where' => "array", 'betweenWhere' => "array", 'order' => "string"])]
    private function _filterParams($conditions): array{
        $where = $betweenWhere = [];
        $order = 'game_id desc';
        if(!empty($conditions['game_name'])){
            $where['game_name'] = trim($conditions['game_name']);
        }
        if(!empty($conditions['create_time'])){
            $betweenWhere[] = [ 'start_time', '>=', $conditions['create_time'][0] ];
            $betweenWhere[] = [ 'end_time', '<=', $conditions['create_time'][1] ];
        }
        if(!empty($conditions['draw_start_create_time'])){
            $betweenWhere[] = [ 'create_time', '>=', $conditions['draw_start_create_time']];
        }
        if(!empty($conditions['draw_end_create_time'])){
            $betweenWhere[] = [ 'create_time', '<=', $conditions['draw_end_create_time']];
        }
        if(!empty($conditions['draw_start_create_time']) && !empty($conditions['draw_end_create_time'])){
            $betweenWhere[] = [ 'create_time', '>=', $conditions['draw_start_create_time']];
            $betweenWhere[] = [ 'create_time', '<=', $conditions['draw_end_create_time']];
        }
        if (!empty($conditions['status'])) {
            $where['status'] = $conditions['status'];
        }
        if(!empty($conditions['is_winning'])){
            $where['is_winning'] = $conditions['is_winning'];
        }
        if(!empty($conditions['game_id'])){
            $where['game_id'] = $conditions['game_id'];
        }
        if(!empty($conditions['member_nick_name'])){
            $where['member_nick_name'] = $conditions['member_nick_name'];
        }
        if (!empty($conditions[ 'order' ])) {
            $order = $conditions[ 'order' ] . ' ' . $conditions[ 'sort' ];
        }
        if(!empty($this->site_id)){
            $where['site_id'] = $this->site_id;
        }
        return [
            'where'=>$where,
            'betweenWhere'=>$betweenWhere,
            'order' =>$order
        ];
    }
}
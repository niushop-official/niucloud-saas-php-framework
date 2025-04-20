<?php
#######################################################################
# File Name: Statistics.php
# Desc:
# Author: hd
# Created Time: 2024/7/10 09:34
#######################################################################
namespace addon\turntable\app\job\game;
use addon\turntable\app\model\PromotionTurntableGames;
use addon\turntable\app\model\PromotionTurntableGamesDrawRecord;
use core\base\BaseJob;
use think\facade\Log;

class Statistics extends BaseJob{

    protected int $pageSize = 500;

    public function doJob(){
        try {
            $total = $this->getGamesTotal();
            $totalNum = ceil($total / $this->pageSize);
            for ($i = 1; $i <= $totalNum; $i++) {
                $offset = ($i - 1) * $this->pageSize; // 计算每一页的起始位置
                $turntableGames = (new PromotionTurntableGames())->where([
                    'status'=>PromotionTurntableGames::STATUS_STARTED
                ])->field('game_id,start_time,end_time')->paginate([
                    'list_rows' => $this->pageSize,
                    'page' => $offset,
                ]);
                foreach ($turntableGames as $item){
                    $joinNumTotal = $this->getJoinNumTotal([
                        'game_id'=>$item['game_id']
                    ]);
                    (new PromotionTurntableGames())->update([
                        'join_num'=>$joinNumTotal
                    ],['game_id'=>$item['game_id']]);
                }
            }
            return true;
        }catch (\Exception $e){
            return false;
        }
    }

    private function getGamesTotal(): int
    {
        return (new PromotionTurntableGames())->where([
            'status'=>PromotionTurntableGames::STATUS_STARTED
        ])->count();
    }
    private function getJoinNumTotal($conditions){
        return (new PromotionTurntableGamesDrawRecord())->where($conditions)->group('member_id')->count();
    }
}
<?php
#######################################################################
# File Name: GameClose.php
# Desc:
# Author: hd
# Created Time: 2024/6/30 10:37
#######################################################################
namespace addon\turntable\app\job\game;
use addon\turntable\app\model\PromotionTurntableGames;
use Carbon\Carbon;
use core\base\BaseJob;
use think\facade\Log;
use think\Model;

class GameClose extends BaseJob{

    protected int $pageSize = 500;
    public function doJob()
    {
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
                    if(Carbon::parse($item['end_time'])->lt(Carbon::now())){
                        (new PromotionTurntableGames())->update([
                            'status'=>PromotionTurntableGames::STATUS_ENDED
                        ],['game_id'=>$item['game_id']]);
                    }
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
}
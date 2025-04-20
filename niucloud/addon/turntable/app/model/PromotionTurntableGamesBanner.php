<?php
#######################################################################
# File Name: PromotionTurntableGamesBanner.php
# Desc:
# Author: hd
# Created Time: 2024/7/13 21:23
#######################################################################
namespace addon\turntable\app\model;
use Carbon\Carbon;
use core\base\BaseModel;
class PromotionTurntableGamesBanner extends BaseModel{

    protected $pk = 'banner_id';
    protected $name = 'promotion_turntable_games_banner';
    protected $type = [

    ];
    public function getGamesBannerList($conditions): array{
        return  $this->withSearch(['game_id','status','site_id'], $conditions)->field('*')->select()->toArray();
    }
    public function createGamesBanner($entity,$gameId): int{
        $response = true;
        if(!empty($entity['banner_show'])){
            foreach ($entity['games_banner'] as $key=>$item){
                $entity['games_banner'][$key]['game_id'] = $gameId;
                $entity['games_banner'][$key]['site_id'] = $entity['site_id'];
                $entity['games_banner'][$key]['created_at'] = Carbon::now()->toDateTimeString();
            }
            $response = $this->insertAll($entity['games_banner']);
        }
        return $response;

    }
}
<?php
#######################################################################
# File Name: PromotionTurntableGamesAward.php
# Desc:
# Author: hd
# Created Time: 2024/6/28 11:49
#######################################################################
namespace addon\turntable\app\model;
use core\base\BaseModel;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

class PromotionTurntableGamesAward extends BaseModel{

    protected $pk = 'award_id';
    protected $name = 'promotion_turntable_games_award';
    protected $type = [

    ];
    public array $defaultNotWinning = [
        'award_id' => -1,
        'award_name' => '谢谢参与',
        'award_img' => ''
    ];
    const PRIZE_POINTS = 1;
    const PRIZE_BALANCE = 2;
    const PRIZE_COUPON = 3;
    const PRIZE_GIFT   = 4;
    #[ArrayShape([self::PRIZE_POINTS => "string", self::PRIZE_BALANCE => "string", self::PRIZE_COUPON => "string", self::PRIZE_GIFT => "string"])]
    public function getAwardTypeList(): array
    {
        return [
            self::PRIZE_POINTS            => '积分',
            self::PRIZE_BALANCE           => '余额',
            self::PRIZE_COUPON            => '优惠卷',
            self::PRIZE_GIFT              => '线下奖品',
        ];
    }
    #[Pure] public  function getAwardTypeText($status): string{
        $list = self::getAwardTypeList();
        return $list[$status] ?? '';
    }
    public function getGamesDrawPageList($conditions)
    {
        return  $this->withSearch(['game_id','status'], $conditions['where'])->field('*')->order($conditions['order']);
    }
    public function getGamesDrawList($conditions){
        return  $this->withSearch(['game_id','status'], $conditions)->field('*')->order('award_id asc')->select()->toArray();
    }
    public function getLotteryAwardList($conditions){
        return $this->withSearch([
            'award_id','award_name','award_type','relate_id','relate_id','point',
            'balance','award_winning_rate','game_id','site_id'
        ],$conditions)->where([['remaining_num','>',0]])
            ->order('award_winning_rate asc')->select()->toArray();
    }
    public function setInc($where, $field, $num = 1){
        return $this->where($where)->inc($field, $num)->update();
    }
    public function setDec($where, $field, $num = 1){
        return $this->where($where)->dec($field, $num)->update();
    }
    public function getGamesDrawInfo($conditions): array{
        return $this->field('*')->where($conditions)->findOrEmpty()->toArray();
    }
}
<?php
#######################################################################
# File Name: PromotionTurntableGames.php
# Desc:
# Author: hd
# Created Time: 2024/6/25 11:55
#######################################################################
namespace addon\turntable\app\model;
use core\base\BaseModel;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

class PromotionTurntableGames extends BaseModel{

    const GAMES_TYPE            = 'turntable';
    const GAMES_TYPE_NAME       ='幸运抽奖';
    const AWARD_TYPE_POINT      = 1;
    const AWARD_TYPE_BALANCE    = 2;
    const AWARD_TYPE_COUPON     = 3;
    const AWARD_TYPE_FREEBIE    = 4;
    const STATUS_NOT_STARTED    = 1;
    const STATUS_STARTED        = 2;
    const STATUS_ENDED          = 3;
    const STATUS_CLOSED         = 4;
    const PARTICIPATION_ALL     = 0;
    const PARTICIPATION_PARTIAL = 1;
    const DISPLAY_WINNERS       = 0;
    const HIDE_WINNERS          = 1;
    const POINT = 'point';
    const GROWTH = 'growth';
    const BALANCE = 'balance';
    protected $pk               = 'game_id';
    protected $name             = 'promotion_turntable_games';
    protected $type             = [

    ];

    #[ArrayShape([self::AWARD_TYPE_POINT => "string", self::AWARD_TYPE_BALANCE => "string", self::AWARD_TYPE_COUPON => "string", self::AWARD_TYPE_FREEBIE => "string"])]
    public function getAwardTypeList(): array{
        return [
            self::AWARD_TYPE_POINT            => '积分',
            self::AWARD_TYPE_BALANCE          => '余额',
            self::AWARD_TYPE_COUPON           => '优惠卷',
            self::AWARD_TYPE_FREEBIE          => '线下奖品',
        ];
    }
    #[ArrayShape([self::STATUS_NOT_STARTED => "string", self::STATUS_STARTED => "string", self::STATUS_ENDED => "string", self::STATUS_CLOSED => "string"])]
    public function getStatusList(): array
    {
        return [
            self::STATUS_NOT_STARTED            => '未开始',
            self::STATUS_STARTED                => '进行中',
            self::STATUS_ENDED                  => '已结束',
            self::STATUS_CLOSED                 => '已关闭',
        ];
    }
    #[ArrayShape([self::PARTICIPATION_ALL => "string", self::PARTICIPATION_PARTIAL => "string"])]
    public function getLevelIdList(): array
    {
        return [
            self::PARTICIPATION_ALL             => '全部会员',
            self::PARTICIPATION_PARTIAL         => '部分会员'
        ];
    }
    #[ArrayShape([self::DISPLAY_WINNERS => "string", self::HIDE_WINNERS => "string"])]
    public function isShowWinnerList(): array
    {
        return [
            self::DISPLAY_WINNERS               => '显示',
            self::HIDE_WINNERS                  => '不显示'
        ];
    }
    #[Pure] public  function getStatusText($status): string{
        $list = self::getStatusList();
        return $list[$status] ?? '';
    }
    #[Pure] public function getLevelIdText($status): string
    {
        $list = self::getLevelIdList();
        return $list[$status] ?? '';
    }
    #[Pure] public function getIsShowWinnerText($status): string
    {
        $list = self::isShowWinnerList();
        return $list[$status] ?? '';
    }
    #[Pure] public function getAwardTypeText($status): string
    {
        $list = self::getAwardTypeList();
        return $list[$status] ?? '';
    }
    public function getGamesInfo($conditions): array{
        return $this->field('*')->where($conditions)->findOrEmpty()->toArray();
    }
    public function setInc($where, $field, $num = 1){
        return $this->where($where)->inc($field, $num)->update();
    }
}
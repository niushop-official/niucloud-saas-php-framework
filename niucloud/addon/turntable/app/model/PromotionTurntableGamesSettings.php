<?php
#######################################################################
# File Name: PromotionTurntableGamesSettings.php
# Desc:
# Author: hd
# Created Time: 2024/8/23 14:16
#######################################################################
namespace addon\turntable\app\model;
use core\base\BaseModel;
use JetBrains\PhpStorm\NoReturn;

class PromotionTurntableGamesSettings extends BaseModel{

    protected $pk = 'settings_id';
    protected $name = 'promotion_turntable_games_settings';
    protected $type = [

    ];

     public function getSettingsInfo($conditions): \think\Collection|array
    {
        return $this->where('1=1')->where($conditions)->limit(1)->findOrEmpty()->toArray();
    }
}
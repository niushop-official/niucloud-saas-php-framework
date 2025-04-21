<?php
#######################################################################
# File Name: PromotionTurntableGamesDrawRecord.php
# Desc:
# Author: hd
# Created Time: 2024/7/2 16:48
#######################################################################
namespace addon\turntable\app\model;
use core\base\BaseModel;

class PromotionTurntableGamesDrawRecord extends BaseModel{

    protected string $_fileds = 'record_id,game_id,award_id,member_nick_name,points,is_winning,award_name,award_type,relate_id,relate_name,point,balance,create_time,is_receive,address_name,mobile,full_address';
    protected $pk = 'record_id';
    protected $name = 'promotion_turntable_games_draw_record';
    protected $type = [

    ];

    const NOT_WIN = 1;
    const WIN     = 2;
    const UNREDEEMED = 0;
    const REDEEMED = 1;
    public function createDrawRecord($entity){
        return $this->create($entity)->getLastInsID();
    }
    public function getGamesDrawRecordPageList($conditions){
        return $this->withSearch([
            'member_nick_name','game_id','award_id','record_id','is_winning','member_id','site_id'
        ], $conditions)->field($this->_fileds)->order('create_time desc,award_type desc');
    }
    public function getGamesDrawRecordInfo($conditions): array{
        return $this->field('*')->where($conditions)->findOrEmpty()->toArray();
    }
}
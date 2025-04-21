<?php
#######################################################################
# File Name: Turntable.php
# Desc:
# Author: hd
# Created Time: 2024/7/1 11:55
#######################################################################
namespace addon\turntable\app\api\controller\turntable;
use addon\turntable\app\service\api\PromotionTurntableGamesApiService;
use core\base\BaseApiController;

class Turntable extends BaseApiController{

    public function info(){

        $data = $this->request->params([
            [ "game_id", 0 ],
        ]);

         return success((new PromotionTurntableGamesApiService())->getGamesInfo($data));
    }

    public function lottery(){
        $data = $this->request->params([
            [ "game_id", 0 ],
        ]);
        return success((new PromotionTurntableGamesApiService())->lottery($data));
    }

    public function gameDrawRecord(){
        $data = $this->request->params([
            ["game_id",0]
        ]);
        return success((new PromotionTurntableGamesApiService())->getGameDrawRecord($data));
    }
    public function saveAddress(){
        $data = $this->request->params([
            [ "address_name", "" ],
            [ "mobile",       "" ],
            [ "full_address", "" ],
            [ "record_id",    "" ]
        ]);
        return success(( new PromotionTurntableGamesApiService() )->saveAddress($data));
    }
}
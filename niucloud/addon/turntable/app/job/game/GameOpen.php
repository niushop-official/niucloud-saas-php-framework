<?php
#######################################################################
# File Name: GameOpen.php
# Desc:
# Author: hd
# Created Time: 2024/6/30 10:37
#######################################################################
namespace addon\turntable\app\job\game;
use core\base\BaseJob;
use think\facade\Log;

class GameOpen extends BaseJob{

    public function doJob(){
        try {

        }catch (\Exception $e){
            return false;
        }
        Log::write('hello word game open');
    }
}
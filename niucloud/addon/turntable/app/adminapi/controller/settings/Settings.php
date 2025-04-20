<?php
#######################################################################
# File Name: settings.php
# Desc:
# Author: hd
# Created Time: 2024/8/23 14:33
#######################################################################
namespace addon\turntable\app\adminapi\controller\settings;
use addon\turntable\app\service\admin\PromotionTurntableGameSettingsService;
use core\base\BaseAdminController;

class Settings extends BaseAdminController{


    public function settings(){
        $data = $this->request->params([
            ["is_shop",       "" ],
        ]);
        $response = (new PromotionTurntableGameSettingsService())->settings($data);
        return success('SUCCESS',$response);
    }

    public function getSettings(){
        $response = (new PromotionTurntableGameSettingsService())->getSettings();
        return success('SUCCESS',$response);
    }
}
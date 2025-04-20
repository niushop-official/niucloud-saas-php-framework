<?php
#######################################################################
# File Name: PromotionTurntableGameSettingsService.php
# Desc:
# Author: hd
# Created Time: 2024/8/24 12:12
#######################################################################
namespace addon\turntable\app\service\admin;
use addon\turntable\app\model\PromotionTurntableGamesSettings;
use Carbon\Carbon;
use core\base\BaseAdminService;
use think\Model;

class PromotionTurntableGameSettingsService extends BaseAdminService{

    protected PromotionTurntableGamesSettings $settings;

    public function __construct(){
        parent::__construct();
        $this->settings = new PromotionTurntableGamesSettings();
    }
    public function settings($entity){
        $settings = $this->settings->getSettingsInfo([
            'site_id'=>$this->site_id??0,
        ]);
        $entity['created_at'] = Carbon::now()->toDateTimeString();
        $entity['site_id'] = $this->site_id??0;
        if ($settings) {
            return $this->settings->update($entity, ['settings_id' => $settings['settings_id']]);
        }
        return $this->settings->insert($entity);
    }
    public function getSettings(): \think\Collection|array
    {
        return $this->settings->getSettingsInfo([
            'site_id'=>$this->site_id??0,
        ]);
    }
}
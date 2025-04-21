<?php

namespace addon\ly_shareholder\app\service\admin;

use addon\ly_shareholder\app\model\ShareholderLevel;
use addon\ly_shareholder\app\service\core\CoreConfigService;
use app\model\member\MemberLevel;
use core\base\BaseAdminService;

class ConfigService extends BaseAdminService
{
    /**
     * 获取股东配置
     * @return array
     * 
     */
    public function setShareholderConfig($params){
        return (new CoreConfigService())->setShareholderConfig($this->site_id, $params);
    }

    public function getShareholderConfig(){
        return (new CoreConfigService())->getShareholderConfig($this->site_id);
    }

    public function getMemberLevelAll(){
        $memberLevelModel = new MemberLevel();
        return $memberLevelModel->where([['site_id', '=', $this->site_id]])->select()->toArray();
    }

    public function getShareholderLevelAll(){
        $shareholderLevelModel = new ShareholderLevel();
        return $shareholderLevelModel->where([['site_id', '=', $this->site_id]])->select()->toArray();
    }
}
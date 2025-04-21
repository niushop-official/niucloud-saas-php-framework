<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\service\admin\hotel;

use addon\tourism\app\service\core\hotel\CoreHotelConfigService;
use core\base\BaseAdminService;

/**
 * 酒店设置
 * Class HotelConfigService
 * @package addon\tourism\app\service\admin\hotel
 */
class HotelConfigService extends BaseAdminService
{
    /**
     * 获取酒店设置
     */
    public function getConfig(){

        return (new CoreHotelConfigService())->getConfig($this->site_id);
    }

    /**
     * 酒店设置
     * @param $data
     */
    public function setConfig(array $data){
        return (new CoreHotelConfigService())->setConfig($this->site_id, $data);
    }
}
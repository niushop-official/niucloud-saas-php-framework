<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop\app\service\admin\delivery;

use addon\shop\app\service\core\delivery\CoreConfigService;
use app\model\sys\SysConfig;
use core\base\BaseAdminService;
use think\Model;

/**
 * 物流查询接口配置服务层
 * Class DeliverySearchConfigService
 * @package addon\shop\app\service\admin\delivery
 */
class DeliverySearchConfigService extends BaseAdminService
{
    /**
     * 设置物流查询接口配置
     * @param $data
     * @return SysConfig|bool|Model
     */
    public function setConfig($data)
    {
        return ( new CoreConfigService() )->setDeliverySearchConfig($this->site_id, $data);
    }

    /**
     * 获取物流跟踪查询配置
     * @return array
     */
    public function getConfig()
    {
        return $info = ( new CoreConfigService() )->getDeliverySearchConfig($this->site_id);
    }
}

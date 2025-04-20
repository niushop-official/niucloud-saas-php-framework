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

namespace app\service\api\addon;


use app\service\core\addon\CoreAddonService;
use core\base\BaseApiService;

/**
 *
 * Class AddonService
 * @package app\service\api\agreement
 */
class AddonService extends BaseApiService
{
    /**
     * 查询已安装应用
     * @return array
     */
    public function getInstallList(){
        return (new CoreAddonService())->getInstallAddonList();
    }

}
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

namespace addon\vipcard\app\api\controller\reserve;

use addon\vipcard\app\service\api\reserve\ReserveConfigService;
use core\base\BaseApiController;
use think\Response;

class Config extends BaseApiController
{
    /**
     * 获取微信配置信息
     * @return Response
     */
    public function get(){
        return success((new ReserveConfigService())->getReserveConfig());
    }

}

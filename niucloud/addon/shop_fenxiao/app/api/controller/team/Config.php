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

namespace addon\shop_fenxiao\app\api\controller\team;

use addon\shop_fenxiao\app\service\api\team\ConfigService;
use core\base\BaseApiController;
use think\Response;


/**
 * 团队奖励配置
 */
class Config extends BaseApiController
{
    /**
     * 获取配置
     * @return Response
     */
    public function getConfig()
    {
        return success((new ConfigService())->getConfig());
    }
}

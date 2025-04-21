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

namespace addon\shop_fenxiao\app\api\controller\fenxiao;

use addon\shop_fenxiao\app\service\api\fenxiao\ConfigService;
use core\base\BaseApiController;
use think\Response;

class Config extends BaseApiController
{
    /**
     * 获取分销配置
     * @return Response
     */
    public function getFenxiaoConfig()
    {
        return success((new ConfigService())->getFenxiaoConfig());
    }
}

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

namespace addon\shop\app\api\controller\goods;
use addon\shop\app\service\api\goods\ConfigService;
use core\base\BaseApiController;

class Config extends BaseApiController
{
    /**
     * 获取搜做配置
     * @return \think\Response
     */
    public function getSearchConfig()
    {
        return success((new ConfigService())->getSearchConfig());
    }
}
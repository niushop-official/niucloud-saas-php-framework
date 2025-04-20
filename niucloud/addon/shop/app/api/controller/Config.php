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

namespace addon\shop\app\api\controller;

use addon\shop\app\service\api\ConfigService;
use core\base\BaseApiController;

class Config extends BaseApiController
{
    public function invoice() {
        return success(( new ConfigService() )->getInvoiceConfig());
    }

    /**
     * 评价设置
     * @return \think\Response
     */
    public function evaluate()
    {
        return success(( new ConfigService() )->getEvaluateConfig());
    }
}

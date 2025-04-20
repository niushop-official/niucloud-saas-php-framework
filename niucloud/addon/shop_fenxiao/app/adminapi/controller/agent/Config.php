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

namespace addon\shop_fenxiao\app\adminapi\controller\agent;

use addon\shop_fenxiao\app\service\admin\agent\ConfigService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 代理商配置
 */
class Config extends BaseAdminController
{

    /**
     * 获取配置
     * @return Response
     */
    public function getConfig()
    {
        return success((new ConfigService())->getConfig());
    }

    /**
     * 设置配置
     * @return Response
     */
    public function setConfig()
    {
        $data = $this->request->params([
            ['is_open', 1],
        ]);
        (new ConfigService())->setConfig($data);
        return success('SET_SUCCESS');
    }
}

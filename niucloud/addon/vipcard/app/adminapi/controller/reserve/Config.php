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

namespace addon\vipcard\app\adminapi\controller\reserve;

use addon\vipcard\app\service\admin\reserve\ReserveConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取微信配置信息
     * @return Response
     */
    public function get(){
        return success((new ReserveConfigService())->getReserveConfig());
    }

    /**
     * 设置微信配置信息
     * @return Response
     */
    public function set(){
        $data = $this->request->params([
            ['week', ''],
            ['start', 32400],
            ['end', 79200],
            ['interval', 30],
            ['advance', 1],
            ['max', 10]
        ]);
        (new ReserveConfigService())->setReserveConfig($data);
        return success('SET_SUCCESS');
    }

}

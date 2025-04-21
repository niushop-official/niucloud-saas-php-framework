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

namespace addon\tourism\app\adminapi\controller\way;

use addon\tourism\app\service\admin\way\WayConfigService;
use core\base\BaseAdminController;
use think\Response;

class Config extends BaseAdminController
{
    /**
     * 获取设置
     * @return Response
     */
    public function getConfig()
    {
        return success(( new WayConfigService() )->getConfig());
    }

    /**
     * 设置
     * @return Response
     */
    public function setConfig()
    {
        $data = $this->request->params([
            [ 'order_close', 60 ],
            [ 'is_allow_refund', 0 ],
            [ 'refund_rate', 0 ],
        ]);
        $this->validate($data, 'addon\tourism\app\validate\way\Config.set');
        ( new WayConfigService() )->setConfig($data);
        return success('MODIFY_SUCCESS');
    }
}

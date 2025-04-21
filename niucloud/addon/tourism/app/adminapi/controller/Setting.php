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

namespace addon\tourism\app\adminapi\controller;

use core\base\BaseAdminController;
use addon\tourism\app\service\admin\hotel\HotelConfigService;
use addon\tourism\app\service\admin\scenic\ScenicConfigService;
use addon\tourism\app\service\admin\way\WayConfigService;

class Setting extends BaseAdminController
{
    /**
     * 设置旅游设置
     */
    public function setSetting()
    {
        $data = $this->request->params([
            ['hotel', []],
            ['scenic', []],
            ['way', []]
        ]);
        $this->validate($data['hotel'], 'addon\tourism\app\validate\hotel\Config.set');
        ( new HotelConfigService() )->setConfig($data['hotel']);

        $this->validate($data['scenic'], 'addon\tourism\app\validate\scenic\Config.set');
        ( new ScenicConfigService() )->setConfig($data['scenic']);

        $this->validate($data['way'], 'addon\tourism\app\validate\way\Config.set');
        ( new WayConfigService() )->setConfig($data['way']);

        return success('MODIFY_SUCCESS');
    }

    /**
     * 获取旅游设置
     */
    public function getSetting()
    {
        $tourism_config = [];
        $tourism_config['hotel'] = ( new HotelConfigService() )->getConfig();
        $tourism_config['scenic'] = ( new ScenicConfigService() )->getConfig();
        $tourism_config['way'] = ( new WayConfigService() )->getConfig();
        return success($tourism_config);
    }
}

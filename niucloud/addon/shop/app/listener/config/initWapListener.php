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

namespace addon\shop\app\listener\config;

use addon\shop\app\service\core\CoreStatService;

/**
 * 手机端初始化加载事件
 */
class initWapListener
{
    public function handle($params = [])
    {
        $site_id = request()->siteId();
        if (!empty($params[ 'site_id' ])) {
            $site_id = $params[ 'site_id' ];
        }
        //增加访问数
        ( new CoreStatService() )->addStat([ 'site_id' => $site_id, 'access_sum' => 1 ]);
    }
}

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


namespace addon\shop_fenxiao\app\service\api\fenxiao;


use addon\shop_fenxiao\app\service\core\agent\CoreAgentConfigService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use addon\shop_fenxiao\app\service\core\sale\CoreSaleConfigService;
use addon\shop_fenxiao\app\service\core\task\CoreTaskConfigService;
use addon\shop_fenxiao\app\service\core\team\CoreTeamConfigService;
use core\base\BaseApiService;

/**
 * 分销系统配置
 */
class ConfigService extends BaseApiService
{

    /**
     * 获取分销设置
     * @return array
     */
    public function getFenxiaoConfig()
    {
        $data = [
            'fenxiao_config' => (new CoreFenxiaoConfigService())->getFenxiaoConfig($this->site_id),
            'agent_config' => (new CoreAgentConfigService())->getConfig($this->site_id),
            'sale_config' => (new CoreSaleConfigService())->getConfig($this->site_id),
            'task_config' => (new CoreTaskConfigService())->getConfig($this->site_id),
            'team_config' => (new CoreTeamConfigService())->getConfig($this->site_id)
        ];
        return $data;
    }
}
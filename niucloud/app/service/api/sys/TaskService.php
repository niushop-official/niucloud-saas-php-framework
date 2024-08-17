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

namespace app\service\api\sys;

use app\service\core\member\CoreMemberConfigService;
use app\service\core\member\CoreMemberService;
use core\base\BaseApiService;

/**
 * Class BaseService
 * @package app\service
 */
class TaskService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取成长值任务
     * @param string $key
     * @return mixed
     */
    public function getGrowthTask()
    {
        $growth_config = (new CoreMemberConfigService())->getGrowthRuleConfig($this->site_id);
        if (!empty($growth_config)) {
            $growth_config = CoreMemberService::getGrowthRuleContent($this->site_id, $growth_config, 'task');
            $growth_config = array_values(array_filter(array_map(function ($item) {
                if ($item['content']) return $item['content'];
            }, $growth_config)));
        }
        return $growth_config;
    }

    /**
     * 获取积分任务
     * @param string $key
     * @return mixed
     */
    public function getPointTask()
    {
        $point_config = (new CoreMemberConfigService())->getPointRuleConfig($this->site_id)['grant'] ?? [];

        if (!empty($point_config)) {
            $point_config = CoreMemberService::getPointGrantRuleContent($this->site_id, $point_config, 'task');
            $point_config = array_values(array_filter(array_map(function ($item) {
                if ($item['content']) return $item['content'];
            }, $point_config)));
        }
        return $point_config;
    }
}

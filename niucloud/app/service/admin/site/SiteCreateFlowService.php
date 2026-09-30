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

namespace app\service\admin\site;

use app\dict\site\SiteCreateFlowDict;
use core\base\BaseAdminService;

/**
 * 站点创建流程服务层
 * Class SiteCreateFlowService
 * @package app\service\admin\site
 */
class SiteCreateFlowService extends BaseAdminService
{
    /**
     * 获取站点创建流程（主流程 + 子流程）
     * @param array $data
     * ['flow_id' => '', 'sub_flow_id' => '', 'with_sub' => 1]
     * @return array
     */
    public function getList(array $data = [])
    {
        $flows = SiteCreateFlowDict::getFlows();

        $flow_id = $data['flow_id'] ?? '';
        $sub_flow_id = $data['sub_flow_id'] ?? '';
        $with_sub = (int)($data['with_sub'] ?? 1) > 0;

        // 指定主流程时，仅返回该主流程
        if (!empty($flow_id)) {
            $flows = array_values(array_filter($flows, function ($flow) use ($flow_id) {
                return $flow['id'] === $flow_id;
            }));
        }

        $sub_flow_total = 0;
        foreach ($flows as &$flow) {
            // 保留完整子流程数量，便于前端展示
            $flow['sub_flow_count'] = count($flow['sub_flows']);

            if (!$with_sub) {
                $flow['sub_flows'] = [];
            } elseif (!empty($sub_flow_id)) {
                $flow['sub_flows'] = array_values(array_filter($flow['sub_flows'], function ($sub_flow) use ($sub_flow_id) {
                    return $sub_flow['id'] === $sub_flow_id;
                }));
            }
            $sub_flow_total += count($flow['sub_flows']);
        }
        unset($flow);

        // 指定子流程时，剔除未命中的主流程
        if (!empty($sub_flow_id)) {
            $flows = array_values(array_filter($flows, function ($flow) {
                return !empty($flow['sub_flows']);
            }));
        }

        return [
            'total' => count($flows),
            'sub_flow_total' => $sub_flow_total,
            'flows' => $flows,
            'appendix' => SiteCreateFlowDict::getAppendix()
        ];
    }
}

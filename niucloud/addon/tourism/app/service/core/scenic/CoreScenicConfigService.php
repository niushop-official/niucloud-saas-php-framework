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

namespace addon\tourism\app\service\core\scenic;

use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 景点设置
 * Class CoreScenicConfigService
 * @package addon\tourism\app\service\core\scenic
 */
class  CoreScenicConfigService extends BaseCoreService
{
    /**
     * 获取景点设置
     * @param int $site_id
     * @return array
     */
    public function getConfig(int $site_id){
        $info = (new CoreConfigService())->getConfig($site_id, "tourism_scenic_config")['value'] ?? [];
        $config = [
            'order_close' => $info['order_close'] ?? 60,//订单关闭时长
            'is_allow_refund' => $info['is_allow_refund'] ?? 0,//是否允许退款
            'refund_rate' => $info['refund_rate'] ?? 0,//退款手续费比率
        ];
        return $config;
    }

    /**
     * 获取景点配置
     * @param $site_id
     * @param $info
     * @return SysConfig|bool|Model
     */
    public function setConfig(int $site_id, array $info){
        $config = [
            'order_close' => $info['order_close'] ?? 60,//订单关闭时长
            'is_allow_refund' => $info['is_allow_refund'] ?? 0,//是否允许退款
            'refund_rate' => $info['refund_rate'] ?? 0,//退款手续费比率
        ];
        return (new CoreConfigService())->setConfig($site_id, "tourism_scenic_config", $config);
    }


}
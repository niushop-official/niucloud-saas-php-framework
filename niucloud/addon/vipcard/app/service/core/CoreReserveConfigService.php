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

namespace addon\vipcard\app\service\core;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;

/**
 * 预约配置
 * Class CoreReserveConfigService
 * @package addon\vipcard\app\service\core
 */
class CoreReserveConfigService extends BaseCoreService
{
    /**
     * 获取预约配置
     * @param $site_id
     */
    public function getReserveConfig(int $site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, 'vipcard_reserve')[ 'value' ] ?? [];
        return [
            'week' => $info[ 'week' ] ?? [ '1', '2', '3', '4', '5' ], //预约时间一周内
            'start' => $info[ 'start' ] ?? 32400, //当日预约时间开始
            'end' => $info[ 'end' ] ?? 79200, //当日预约时间结束
            'interval' => $info[ 'interval' ] ?? 30, //预约时间间隔（分钟）
            'advance' => $info[ 'advance' ] ?? 1, //提前预约时间小时
            'max' => $info[ 'max' ] ?? 10 //最大预约人数
        ];
    }

    /**
     * 设置预约配置
     * @param $site_id
     * @param $data
     */
    public function setReserveConfig(int $site_id, array $data)
    {
        $config = [
            'week' => explode(',', $data[ 'week' ]), //预约时间一周内
            'start' => $data[ 'start' ] ?? 32400, //当日预约时间开始
            'end' => $data[ 'end' ] ?? 79200, //当日预约时间结束
            'interval' => $data[ 'interval' ] ?? 30, //预约时间间隔（分钟）
            'advance' => $data[ 'advance' ] ?? 1,  //提前预约时间小时
            'max' => $data[ 'max' ] ?? 1,  //最大预约人数
        ];
        return ( new CoreConfigService() )->setConfig($site_id, 'vipcard_reserve', $config);
    }

}

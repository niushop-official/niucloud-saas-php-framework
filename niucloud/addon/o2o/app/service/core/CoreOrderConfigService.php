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

namespace addon\o2o\app\service\core;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 订单设置服务层
 * Class CoreOrderConfigService
 * @package addon\o2o\app\service\core
 */
class CoreOrderConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置交易配置
     * @param array $params
     * @return array
     */
    public function setConfig($params)
    {
        $site_id = $params['site_id'];

        $value['order_close'] = [
            'is_close' => $params['is_close'],
            'close_length' => $params['close_length']
        ];
        $value['order_finish'] = [
            'is_finish' => $params['is_finish'],
            'finish_length' => $params['finish_length']
        ];
        $value['order_refund'] = [
            'no_allow_refund' => $params['no_allow_refund'],
            'refund_length' => $params['refund_length']
        ];
        $value['evaluate'] = [
            'is_evaluate' => $params['is_evaluate'],
            'evaluate_is_to_examine' => $params['evaluate_is_to_examine'],
            'evaluate_is_show' => $params['evaluate_is_show']
        ];

        $this->core_config_service->setConfig($site_id, 'O2O_ORDER_CONFIG', $value);

        return true;
    }

    /**
     * 获取交易配置
     * @param int $id
     * @return array
     */
    public function getConfig(int $site_id)
    {
        $data = (new CoreConfigService())->getConfigValue($site_id, 'O2O_ORDER_CONFIG');
        if (empty($data)) {
            $data['order_close'] = [
                'is_close' => true,
                'close_length' => 120
            ];
            $data['order_finish'] = [
                'is_finish' => true,
                'finish_length' => 14
            ];

            $data['order_refund'] = [
                'no_allow_refund' => true,
                'refund_length' => 7
            ];
            $data['evaluate'] = [
                'is_evaluate' => 1,
                'evaluate_is_to_examine' => 1,
                'evaluate_is_show' => 1
            ];
        } else {
            $data['order_close'] = [
                'is_close' => $data['order_close']['is_close'],
                'close_length' => $data['order_close']['close_length']
            ];
            $data['order_finish'] = [
                'is_finish' => $data['order_finish']['is_finish'],
                'finish_length' => $data['order_finish']['finish_length'],
            ];
            $data['order_refund'] = [
                'no_allow_refund' => $data['order_refund']['no_allow_refund'],
                'refund_length' => $data['order_refund']['refund_length'],
            ];
            $data['evaluate'] = [
                'is_evaluate' => $data['evaluate']['is_evaluate'],
                'evaluate_is_to_examine' => $data['evaluate']['evaluate_is_to_examine'],
                'evaluate_is_show' => $data['evaluate']['evaluate_is_show'],
            ];
        }


        return $data;
    }

    /**
     * 获取预约配置
     * @param $site_id
     */
    public function getReserveConfig(int $site_id){
        $info = (new CoreConfigService())->getConfig($site_id, 'o2o_reserve')['value'] ?? [];
        return [
            'week' => $info['week'] ?? ['1','2','3','4','5'],
            'start' => $info['start'] ?? 32400,
            'end' => $info['end'] ?? 79200,
            'interval' => $info['interval'] ?? 30,
            'advance' => $info['advance'] ?? 1,
        ];
    }

    /**
     * 设置预约配置
     * @param $site_id
     * @param $data
     */
    public function setReserveConfig(int $site_id, array $data){
        $config = [
            'week' => explode(',', $data['week']), //预约时间一周内
            'start' => $data[ 'start' ] ?? 32400, //当日预约时间开始
            'end' => $data[ 'end' ] ?? 79200, //当日预约时间结束
            'interval' => $data[ 'interval' ] ?? 30, //预约时间间隔（分钟）
            'advance' => $data[ 'advance' ] ?? 1,  //提前预约时间小时
        ];
        return (new CoreConfigService())->setConfig($site_id, 'o2o_reserve', $config);
    }

}


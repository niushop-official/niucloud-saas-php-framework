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

namespace addon\shop_fenxiao\app\service\core\sale;

use addon\shop_fenxiao\app\dict\sale\SaleDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 销售奖励配置
 */
class CoreSaleConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setConfig(int $site_id, array $data)
    {
        $value = [
            'is_open' => $data['is_open'] ?? '0',
            'period_type' => $data['period_type'],// month 月度 quarter 季度 year 年度
            'period' => $data['period'],
            'send_type' => $data['send_type'],//发放方式 1 手动发放 2 自动发放
            'rules' => $data['rules'],//参与条件  销售额度
            'condition' => $data['condition'],//参与条件
            'reward' => $data['reward'],//奖励  (阶梯奖励)
        ];
        $this->core_config_service->setConfig($site_id, 'SHOP_FENXIAO_SALE_CONFIG', $value);

        //主动结算当前的周期
        (new CoreSalePeriodService())->autoSettlement($site_id);
        return true;
    }

    /**
     * @param int $site_id
     * @return void
     */
    public function getRewardConfig(int $site_id)
    {
        $config = $this->getConfig($site_id);
        //销售门槛
        $condition_order_money = $config['condition']['order_money'];
        //排名奖励
        $reward = $config['reward'];
        $reward_list = [];
        $last_rank = 0;//最后一名
        foreach ($reward as $reward_v) {
            $item_end = $reward_v['end'];
            $reward_list[] = array(
                'start' => $last_rank + 1,
                'end' => $item_end,
                'reward' => $reward_v['reward']
            );
            $last_rank = $item_end;
        }
        return [
            'reward_list' => $reward_list,
            'last_rank' => $last_rank,
            'order_money' => $condition_order_money
        ];
    }

    /**
     * 获取设置
     * @param int $site_id
     */
    public function getConfig(int $site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_FENXIAO_SALE_CONFIG');
        $value = [
            'is_open' => $data['is_open'] ?? '0',
            'period_type' => $data['period_type'] ?? SaleDict::MONTH,// month 月度 quarter 季度 year 年度
            'period' => $data['period'] ?? '',
            'send_type' => $data['send_type'] ?? SaleDict::ACTIVE,//发放方式 1 手动发放 2 自动发放
            'rules' => $data['rules'] ?? [],//参与条件  销售额度
            'condition' => $data['condition'] ?? [],//参与条件
            'reward' => $data['reward'] ?? [
                        [
                            'end' => 1,
                            'reward' => [
                                'commission' => 0
                            ]
                        ]
                    ],//奖励  (阶梯奖励)
        ];
        return $value;
    }

}

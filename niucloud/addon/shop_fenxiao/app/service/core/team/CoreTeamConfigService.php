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

namespace addon\shop_fenxiao\app\service\core\team;

use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 团队配置
 */
class CoreTeamConfigService extends BaseCoreService
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
        ];
        $this->core_config_service->setConfig($site_id, 'SHOP_FENXIAO_TEAM_CONFIG', $value);
        $level = $data['level'] ?? [];
        if ($level) {
            $fenxiao_level_model = new FenxiaoLevel();
            $update_list = [];
            foreach ($level as $v) {
                $update_list[] = ['level_id' => $v['level_id'], 'team_rate' => $v['team_rate'], 'team_flat_rate' => $v['team_flat_rate']];
            }
            $fenxiao_level_model->saveAll($update_list);
        }
        return true;
    }

    /**
     * 获取设置
     * @param int $site_id
     */
    public function getConfig(int $site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_FENXIAO_TEAM_CONFIG');
        $value = [
            'is_open' => $data['is_open'] ?? '0',
        ];
        //查询分销商等级
        $value['level'] = (new FenxiaoLevel())->where([['site_id', '=', $site_id]])->field('level_id, level_name, team_rate, team_flat_rate')->order('level_num asc')->select()->toArray();
        return $value;
    }

}

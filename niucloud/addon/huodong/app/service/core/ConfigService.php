<?php

namespace addon\huodong\app\service\core;

use core\base\BaseAdminService;
use app\service\core\sys\CoreConfigService;
use addon\huodong\app\dict\config\ConfigDict;

/**
 * 配置信息服务层
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 获取配置信息
     */
    public function getConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getConfigType());
        $info['value']['is_allow_cancel'] =  $info['value']['is_allow_cancel']??'0';
        $info['value']['cancel_del_jifen'] =  $info['value']['cancel_del_jifen']??0;
		$info['value']['open_act_rank'] =  $info['value']['open_act_rank']??0;
        $info['value']['open_send_point'] =  $info['value']['open_send_point']??0;
        $info['value']['open_fenxiao_gifts'] =  $info['value']['open_fenxiao_gifts']??0;
        $info['value']['fenxiao_gifts'] =  $info['value']['fenxiao_gifts']??'';
        $info['value']['fenxiao_gifts'] = $info['value']['fenxiao_gifts']?json_decode($info['value']['fenxiao_gifts'],true):[];
        $info['value']['fenxiao_rate1'] =  $info['value']['fenxiao_rate1']??0;
        $info['value']['fenxiao_rate2'] =  $info['value']['fenxiao_rate2']??0;
        $info['value']['fenxiao_gifts_type'] =  $info['value']['fenxiao_gifts_type']??1;
        $info['value']['one_tianbiao'] =  $info['value']['one_tianbiao']??0;


        return $info['value'];
    }

    /**
     * 设置配置信息
     * @param $site_id
     * @param string $config_key
     * @return string|null
     */
    public function setConfig($value)
    {
        $value['fenxiao_gifts'] = $value['fenxiao_gifts']?json_encode($value['fenxiao_gifts']):'';
        (new CoreConfigService())->setConfig($this->site_id, ConfigDict::getConfigType(), $value);

        return true;
    }

}
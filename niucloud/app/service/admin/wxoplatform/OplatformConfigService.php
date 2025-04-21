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

namespace app\service\admin\wxoplatform;

use app\dict\common\CommonDict;
use app\model\sys\SysConfig;
use app\service\core\wxoplatform\CoreOplatformConfigService;
use core\base\BaseAdminService;
use think\Model;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class OplatformConfigService extends BaseAdminService
{

    /**
     * 获取配置信息
     * @return array|null
     */
    public function getConfig()
    {
        $config =  (new CoreOplatformConfigService())->getConfig();
        foreach ($config as $k => $v) {
            if ($v !== '' && in_array($k, ['app_secret', 'aes_key'])) {
                $config[$k] = CommonDict::ENCRYPT_STR;
            }
        }
        return $config;
    }

    /**
     * 设置配置
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setConfig(array $data){
        $config =  (new CoreOplatformConfigService())->getConfig();
        foreach ($data as $k => $v) {
            if ($v == CommonDict::ENCRYPT_STR) {
                $data[$k] = $config[$k];
            }
        }
        return (new CoreOplatformConfigService())->setConfig($data);
    }

    /**
     * 查询微信需要的静态信息
     * @return array
     */
    public function getStaticInfo(){
        return (new CoreOplatformConfigService())->getStaticInfo();
    }
}

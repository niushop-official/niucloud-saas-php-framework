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

namespace app\service\admin\wechat;

use app\dict\common\CommonDict;
use app\model\sys\SysConfig;
use app\service\core\wechat\CoreWechatConfigService;
use core\base\BaseAdminService;
use think\Model;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class WechatConfigService extends BaseAdminService
{
    /**
     * 获取配置信息
     * @return array|null
     */
    public function getWechatConfig()
    {
        $config_info = (new CoreWechatConfigService())->getWechatConfig($this->site_id);
        foreach ($config_info as $k => $v) {
            if ($v !== '' && in_array($k, ['app_secret', 'encoding_aes_key'])) {
                $config_info[$k] = CommonDict::ENCRYPT_STR;
            }
        }
        return $config_info;
    }

    /**
     * 设置配置
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setWechatConfig(array $data){
        $config = (new CoreWechatConfigService())->getWechatConfig($this->site_id);
        foreach ($data as $k => $v) {
            if ($v == CommonDict::ENCRYPT_STR) {
                $data[$k] = $config[$k];
            }
        }
        return (new CoreWechatConfigService())->setWechatConfig($this->site_id, $data);
    }

    /**
     *查询微信需要的静态信息
     * @return array
     */
    public function getWechatStaticInfo(){
        return (new CoreWechatConfigService())->getWechatStaticInfo($this->site_id);
    }
}

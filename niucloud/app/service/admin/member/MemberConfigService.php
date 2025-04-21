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

namespace app\service\admin\member;

use app\model\sys\SysConfig;
use app\service\core\member\CoreMemberConfigService;
use app\service\core\member\CoreMemberService;
use core\base\BaseAdminService;
use think\Model;

/**
 * 会员设置
 * Class MemberConfigService
 * @package app\service\admin\member
 */
class MemberConfigService extends BaseAdminService
{
    /**
     * 获取注册与登录设置
     */
    public function getLoginConfig(){

        return (new CoreMemberConfigService())->getLoginConfig($this->site_id);
    }

    /**
     * 注册登录设置
     * @param array $data
     * @return true
     */
    public function setLoginConfig(array $data){
        return (new CoreMemberConfigService())->setLoginConfig($this->site_id, $data);
    }
    /**
     * 获取提现设置
     */
    public function getCashOutConfig(){

        return (new CoreMemberConfigService())->getCashOutConfig($this->site_id);
    }

    /**
     * 提现设置
     * @param array $data
     * @return true
     */
    public function setCashOutConfig(array $data){
        return (new CoreMemberConfigService())->setCashOutConfig($this->site_id, $data);
    }

    /**
     * 获取会员设置
     */
    public function getMemberConfig(){
        return (new CoreMemberConfigService())->getMemberConfig($this->site_id);
    }

    /**
     * 会员设置
     * @param array $data
     * @return true
     */
    public function setMemberConfig(array $data){
        return (new CoreMemberConfigService())->setMemberConfig($this->site_id, $data);
    }

    /**
     * 获取成长值规则配置
     */
    public function getGrowthRuleConfig(){
        $config = (new CoreMemberConfigService())->getGrowthRuleConfig($this->site_id);
        if (!empty($config)) {
            $config = CoreMemberService::getGrowthRuleContent($this->site_id, $config);
        }
        return $config;
    }

    /**
     * 配置成长值规则
     * @param array $data
     * @return true
     */
    public function setGrowthRuleConfig(array $data){
        return (new CoreMemberConfigService())->setGrowthRuleConfig($this->site_id, $data);
    }

    /**
     * 获取积分规则配置
     */
    public function getPointRuleConfig(){
        $config = (new CoreMemberConfigService())->getPointRuleConfig($this->site_id);
        if (!empty($config)) {
            if (isset($config['grant']) && !empty($config['grant'])) $config['grant'] = CoreMemberService::getPointGrantRuleContent($this->site_id, $config['grant']);
            if (isset($config['consume']) && !empty($config['consume'])) $config['consume'] = CoreMemberService::getPointGrantRuleContent($this->site_id, $config['consume']);
        }
        return $config;
    }

    /**
     * 配置积分规则
     * @param array $data
     * @return true
     */
    public function setPointRuleConfig(array $data){
        return (new CoreMemberConfigService())->setPointRuleConfig($this->site_id, $data);
    }
}

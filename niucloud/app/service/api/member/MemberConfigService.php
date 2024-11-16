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

namespace app\service\api\member;

use app\service\api\wechat\WechatAuthService;
use app\service\core\member\CoreMemberConfigService;
use core\base\BaseApiService;

/**
 * 会员配置服务层
 * Class MemberService
 * @package app\service\api\member
 */
class MemberConfigService extends BaseApiService
{
    /**
     * 获取注册与登录设置
     * @param $url
     * @return array
     */
    public function getLoginConfig($url = '')
    {
        $res = ( new CoreMemberConfigService() )->getLoginConfig($this->site_id);
        if (!empty($url)) {
            try {
                // 检测公众号配置是否成功
                $wechat_auth = ( new WechatAuthService() )->jssdkConfig($url);
            } catch (\Exception $e) {
                $res[ 'is_auth_register' ] = 0;
                $res[ 'is_force_access_user_info' ] = 0;
            }
        }
        return $res;
    }

}
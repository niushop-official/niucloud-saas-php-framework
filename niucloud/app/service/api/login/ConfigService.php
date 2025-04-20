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

namespace app\service\api\login;

use app\dict\member\MemberLoginTypeDict;
use app\service\api\member\MemberConfigService;
use core\base\BaseApiService;
use core\exception\AuthException;

/**
 * 登录注册配置服务层
 * Class MemberService
 * @package app\service\api\member
 */
class ConfigService extends BaseApiService
{
    /**
     * 校验登录注册配置是否正确配置
     * @param string $type
     * @return true
     */
    public function checkLoginConfig(string $type)
    {
        //登录注册配置
        $config = ( new MemberConfigService() )->getLoginConfig();
        if ($type == MemberLoginTypeDict::USERNAME) {
            $is_username = $config[ 'is_username' ];
            //未开启账号密码登录注册
            if ($is_username != 1) throw new AuthException('MEMBER_USERNAME_LOGIN_NOT_OPEN');
        } elseif ($type == MemberLoginTypeDict::MOBILE) {
            $is_mobile = $config[ 'is_mobile' ];
            $is_bind_mobile = $config[ 'is_bind_mobile' ];
            //未开启手机号登录注册
            if ($is_mobile != 1 && $is_bind_mobile != 1) throw new AuthException('MOBILE_LOGIN_UNOPENED');
        }
        return true;
    }

}
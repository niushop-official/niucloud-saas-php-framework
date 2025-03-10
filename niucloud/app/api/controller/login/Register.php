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

namespace app\api\controller\login;

use app\dict\member\MemberLoginTypeDict;
use app\service\api\login\ConfigService;
use app\service\api\login\RegisterService;
use core\base\BaseController;
use think\Response;

class Register extends BaseController
{

    /**
     * 账号密码注册
     * @return Response
     */
    public function account()
    {

        $data = $this->request->params([
            [ 'username', '' ],
            [ 'password', '' ],
            [ 'mobile', '' ],
            [ 'wx_openid', '' ]
        ]);
        //校验登录注册配置
        ( new ConfigService() )->checkLoginConfig(MemberLoginTypeDict::USERNAME);
        //参数验证
        $this->validate($data, 'app\validate\member\Member.account_register');
        //验证码验证
        $result = ( new RegisterService() )->account($data[ 'username' ], $data[ 'password' ], $data[ 'mobile' ], $data[ 'wx_openid' ]);
        return success($result);
    }

    /**
     * 手机号注册
     * @return Response
     */
    public function mobile()
    {
        $data = $this->request->params([
            [ 'mobile', '' ],
        ]);
        //校验登录注册配置
        ( new ConfigService() )->checkLoginConfig(MemberLoginTypeDict::MOBILE);
        //参数验证
        $this->validate($data, [
            'mobile' => 'require|mobile'
        ]);
        //验证码验证
        $result = ( new RegisterService() )->mobile($data[ 'mobile' ]);
        return success($result);
    }

}

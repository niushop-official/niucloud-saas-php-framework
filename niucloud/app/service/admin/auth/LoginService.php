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

namespace app\service\admin\auth;

use app\dict\sys\AppTypeDict;
use app\model\sys\SysUser;
use app\model\sys\SysUserRole;
use app\service\admin\captcha\CaptchaService;
use app\service\admin\site\SiteService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\AuthException;
use core\util\TokenAuth;
use Exception;
use Throwable;
use app\service\admin\home\AuthSiteService as HomeAuthSiteService;

/**
 * 登录服务层
 * Class BaseService
 * @package app\service
 */
class LoginService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysUser();
    }

    /**
     * 用户登录
     * @param string $username
     * @param string $password
     * @param string $app_type
     * @return array|bool
     */
    public function login(string $username, string $password, string $app_type)
    {
        if(!array_key_exists($app_type, AppTypeDict::getAppType())) throw new AuthException('APP_TYPE_NOT_EXIST');

        $this->site_id = $this->request->adminSiteId();

        $config = (new ConfigService())->getConfig();
        switch($app_type){
            case AppTypeDict::SITE:
                $is_captcha = $config['is_site_captcha'];
                break;
            case AppTypeDict::ADMIN:
                $is_captcha = $config['is_captcha'];
                break;
        }
        if($is_captcha == 1){
            (new CaptchaService())->verification();
        }

        $user_service = new UserService();
        $userinfo = $user_service->getUserInfoByUsername($username);
        if ($userinfo->isEmpty()) return false;

        if (!check_password($password, $userinfo->password)) return false;
        $this->request->uid($userinfo->uid);

        $auth_site_service = (new HomeAuthSiteService());
        $user_role_service = new UserRoleService();

        $default_site_id = 0;
        if($app_type == AppTypeDict::ADMIN){
            $default_site_id = $this->request->defaultSiteId();
            $userrole = $user_role_service->getUserRole($default_site_id, $userinfo->uid);
            if (!empty($userrole)) {
                if (!$userrole['status']) throw new AuthException('USER_LOCK');
                if (!$userrole['is_admin']) {
                    $rules = $user_role_service->getRoleByUserRoleIds($userrole['role_ids'], $default_site_id);
                    if (empty($rules) || count($rules) == 0) throw new AuthException('USER_LOCK');
                }
            } else {
                $app_type = AppTypeDict::SITE;
            }
        } else if($app_type == AppTypeDict::SITE){
            $site_ids = $auth_site_service->getSiteIds();
            if(!empty($site_ids)){
                $default_site_id = in_array($this->site_id, $site_ids) || AuthService::isSuperAdmin() ? $this->site_id : $site_ids[0];
            }
            if (!empty($default_site_id)) {
                $userrole = $user_role_service->getUserRole($default_site_id, $userinfo->uid);
                if (!empty($userrole)) {
                    if (!$userrole['status']) throw new AuthException('USER_LOCK');
                    if (!$userrole['is_admin']) {
                        $rules = $user_role_service->getRoleByUserRoleIds($userrole['role_ids'], $default_site_id);
                        if (empty($rules) || count($rules) == 0) throw new AuthException('USER_LOCK');
                    }
                }
            }
        } else {
            throw new AuthException('APP_TYPE_NOT_EXIST');
        }
        //修改用户登录信息
        $userinfo->last_time = time();
        $userinfo->last_ip = app('request')->ip();
        $userinfo->login_count++;
        $userinfo->save();
        //创建token
        $token_info = $this->createToken($userinfo, $app_type);

        $this->request->uid($userinfo->uid);

        //查询权限以及菜单
        $data = [
            'token' => $token_info['token'],
            'expires_time' => $token_info['params']['exp'],
            'userinfo' => [
                'uid' => $userinfo->uid,
                'username' => $userinfo->username,
                'is_super_admin' => AuthService::isSuperAdmin(),
                'head_img' => $userinfo->head_img
            ],
            'site_id' => $default_site_id,
            'site_info' => null,
            'userrole' => $app_type == AppTypeDict::ADMIN ? $userrole : []
        ];
        if ($app_type == AppTypeDict::ADMIN || ($app_type == AppTypeDict::SITE && $data['site_id']) ) {
            $this->request->siteId($data['site_id']);
            $data['site_info'] = (new AuthSiteService())->getSiteInfo();
        }
        if ($app_type == AppTypeDict::ADMIN && !$data['userinfo']['is_super_admin']) {
            $data['userinfo']['site_ids'] = $auth_site_service->getSiteIds();
        }
        return $data;
    }

    /**
     * 登陆退出(当前账户) (todo 这儿应该登出当前token, (登出一个账号还是全端口登出))
     * @return true
     */
    public function logout()
    {
        self::clearToken($this->uid, $this->app_type, $this->request->adminToken());
        return true;
    }

    /**
     * 创建token
     * @param SysUser $userinfo
     * @param string $app_type
     * @return array
     */
    public function createToken(SysUser $userinfo, string $app_type)
    {
        $expire_time = env('system.admin_token_expire_time') ?? 3600;
        return TokenAuth::createToken($userinfo->uid, AppTypeDict::ADMIN, ['uid' => $userinfo->uid, 'username' => $userinfo->username], $expire_time);
    }

    /**
     * 清理token
     * @param int $uid
     * @param string|null $type
     * @param string|null $token
     */
    public static function clearToken(int $uid, ?string $type = '', ?string $token = '')
    {
        if (empty($type)) {
            TokenAuth::clearToken($uid, AppTypeDict::ADMIN, $token);//清除平台管理端的token
//            TokenAuth::clearToken($uid, AppTypeDict::SITE, $token);//清除站点管理端的token
        } else {
            TokenAuth::clearToken($uid, $type, $token);
        }

    }

    /**
     * 解析token
     * @param string|null $token
     * @return array
     */
    public function parseToken(?string $token)
    {
        if (empty($token)) {
            //定义专属于授权认证机制的错误响应, 定义专属语言包
            throw new AuthException('MUST_LOGIN', 401);
        }
        //暴力操作,截停所有异常覆盖为token失效
        try {
            $token_info = TokenAuth::parseToken($token, AppTypeDict::ADMIN);
        } catch ( Throwable $e ) {
//            if(env('app_debug', false)){
//                throw new AuthException($e->getMessage(), 401);
//            }else{
                throw new AuthException('LOGIN_EXPIRE', 401);
//            }

        }
        if (!$token_info) {
            throw new AuthException('MUST_LOGIN', 401);
        }
        //验证有效次数或过期时间
        return $token_info;
    }

    /**
     * 重置管理员密码
     * @return void
     */
    public static function resetAdministratorPassword() {
        $super_admin_uid = ( new SysUserRole() )->where([
            [ 'site_id', '=', request()->defaultSiteId() ],
            [ 'is_admin', '=', 1 ]
        ])->value('uid');

        $user = (new UserService())->find($super_admin_uid);
        $user->password = create_password('123456');
        $user->save();

        self::clearToken($super_admin_uid);
    }
}

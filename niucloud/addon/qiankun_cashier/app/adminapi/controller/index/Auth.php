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

namespace addon\qiankun_cashier\app\adminapi\controller\index;

use addon\qiankun_cashier\app\model\cashier\Cashier;
use core\base\BaseAdminController;
use core\util\TokenAuth;
use think\Response;

class Auth extends BaseAdminController
{
    /**
     * Hello World
     * @return Response
     */
    public function login()
    {
        $siteId = (int)$this->request->apiSiteId();
        if ($siteId <= 0) return fail('站点不存在');
        $username = $this->request->post('username', '', 'trim');
        $password = $this->request->post('password', '', 'trim');

        $userinfo = (new Cashier())->where('username', $username)->findOrEmpty();
        if ($userinfo->isEmpty()) return fail('用户不存在');
        if (!password_verify($password, $userinfo->password)) return fail('密码错误');
        $token_info = $this->createToken($userinfo);
        return success('SUCCESS', $token_info);
    }

    /**
     * 创建token
     * @param Cashier $userinfo
     * @return array
     */
    public function createToken(Cashier $userinfo)
    {
        $expire_time = env('system.admin_token_expire_time') ?? 3600;
        return TokenAuth::createToken($userinfo->id, 'cashier', [
            'cashier_id' => $userinfo->id,
            'username'   => $userinfo->username,
            'avatar'     => $userinfo->avatar,
        ], $expire_time);
    }
}

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

namespace addon\qiankun_cashier\middleware;

use app\Request;
use Closure;
use core\exception\AuthException;
use core\util\TokenAuth;

/**
 * admin用户登录token验证
 * Class AdminCheckToken
 * @package app\adminapi\middleware
 */
class CashierCheckToken
{
    public function handle(Request $request, Closure $next)
    {
        //通过配置来设置系统header参数
        $token = $request->header('token');
        $token_info = $this->parseToken($token);
        $request->uid($token_info['cashier_id']);
        $request->siteId($request->header('site-id'));
        $request->username($token_info['username']);
        return $next($request);
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
            throw new AuthException('请先登录', 401);
        }
        //暴力操作,截停所有异常覆盖为token失效
        try {
            $token_info = TokenAuth::parseToken($token, 'cashier');
        } catch (\Throwable $e) {
            throw new AuthException('登录超时', 401);
        }
        if (!$token_info) {
            throw new AuthException('请先登录', 401);
        }
        //验证有效次数或过期时间
        return $token_info;
    }
}

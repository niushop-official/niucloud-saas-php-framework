<?php
// +----------------------------------------------------------------------
// | Author:TK
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\api\middleware;

use addon\business_agent\app\service\core\agent\AgentService;
use app\dict\sys\AppTypeDict;
use app\Request;
use app\service\api\login\AuthService;
use app\service\api\login\LoginService;
use app\service\api\verify\VerifyService;
use Closure;
use Exception;
use core\exception\AuthException;


/**
 * 检测核销管理权限
 */
class ApiCheckRole
{
    /**
     * @param Request $request
     * @param Closure $next
     * @param bool $is_throw_exception 是否把错误抛出
     * @return mixed
     * @throws Exception
     */
    public function handle(Request $request, Closure $next, bool $is_throw_exception = false)
    {
        $res=(new VerifyService())->checkVerifier();
        if($res==false) throw new \think\Exception('暂无核销权限');
        return $next($request);
    }
}

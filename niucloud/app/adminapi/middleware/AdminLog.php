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

namespace app\adminapi\middleware;


use app\Request;
use app\service\admin\site\UserLogService;
use Closure;
use ReflectionClass;
use think\facade\Log;
use think\facade\Route;

/**
 * admin用户操作日志
 * Class AdminCheckToken
 * @package app\adminapi\middleware
 */
class AdminLog
{
    /**
     * 操作日志中需要脱敏的请求参数字段（避免凭据明文落库）
     */
    private const SENSITIVE_KEYS = [
        'token',
        'access_token',
        'refresh_token',
        'auth_secret',
        'password',
        'old_password',
        'new_password'
    ];

    public function handle(Request $request, Closure $next)
    {
        //写入日志
        if ($request->method() != 'GET') {
            $path = $request->rule()->getRoute();
            try {
                if (strstr($path, '@')) {
                    $arr = explode('@', $path);
                    $controller = $arr[0] ?? "";
                    $action = $arr[1] ?? "";
                } else {
                    //暂时只有APP目录下使用这样的路由定义
                    list($controllerStr, $action) = explode('/', $path, 2);
                    $parts = preg_split('/[\.\\\\]/', $controllerStr, 2);
                    list($module, $controller) = $parts;
                    if (count($parts) >= 2) {
                        // 拼接完整类名（根据 TP 命名空间规则调整）
                        $controllerClass = "app\\adminapi\\controller\\{$module}\\{$controller}";
                        $controller = $controllerClass;
                    }
                }
                $operation = $this->extractDescFromAnnotation($controller, $action);
            } catch (\Exception $e) {
                $operation = "";
                Log::write('获取路由描述错误:path' . $path . ' error' . $e->getMessage());
            }

            $data = [
                'uid' => $request->uid(),
                'username' => $request->username(),
                'url' => $request->url(),
                'params' => $this->filterSensitiveParams($request->param()),
                'ip' => $request->ip(),
                'type' => $request->method(),
                'operation' => $operation,
            ];
            (new UserLogService())->add($data);
        }

        return $next($request);
    }

    /**
     * 敏感参数脱敏（token / 密码 / 授权秘钥等不写入操作日志）
     * @param array $params
     * @return array
     */
    private function filterSensitiveParams(array $params): array
    {
        foreach ($params as $key => $value) {
            if (is_array($value)) {
                $params[$key] = $this->filterSensitiveParams($value);
                continue;
            }
            if ($value !== '' && in_array(strtolower((string)$key), self::SENSITIVE_KEYS, true)) {
                $params[$key] = '******';
            }
        }
        return $params;
    }

    private function extractDescFromAnnotation($controllerClass, $actionMethod)
    {
        try {
            if (!class_exists($controllerClass)) {
                return '';
            }

            $reflection = new ReflectionClass($controllerClass);
            $controller_comment = $reflection->getDocComment();
            $controller_desc = '';
            if (preg_match('/@description\s+(.+)/', $controller_comment, $matches)) {
                $controller_desc = $matches[1];
            }
            if (!$reflection->hasMethod($actionMethod)) {
                return '';
            }

            $method = $reflection->getMethod($actionMethod);
            $docComment = $method->getDocComment();

            if (preg_match('/@description\s+(.+)/', $docComment, $matches)) {
                return (empty($controller_desc) ? "" : $controller_desc . '-') . $matches[1];
            }

            return '';
        } catch (\Exception $e) {
            return '';
        }
    }
}

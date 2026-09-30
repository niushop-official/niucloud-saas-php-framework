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

namespace core\util;

/**
 * 步骤审计记录工具：以 JSONL(每行一条 JSON) 形式记录任务执行过程
 * 每条记录含 time / step_no / type / task_key / step / method / params / result / status / next
 */
class StepLogger
{
    /**
     * 需要脱敏的敏感字段（键名，大小写不敏感）
     */
    private static $sensitiveKeys = [
        'auth_code', 'authorize_code', 'token', 'password', 'secret',
        'access_token', 'refresh_token', 'api_key', 'apikey', 'authorization'
    ];

    /**
     * 追加一条步骤记录
     * @param string $file  JSONL 文件路径
     * @param array  $entry 记录内容（至少含 type/step/method 等，time 与 step_no 自动补）
     */
    public static function append(string $file, array $entry)
    {
        if (empty($file)) return;

        // 计算 step_no：基于文件已有行数（不存在则自动创建目录）
        $stepNo = 1;
        if (is_file($file)) {
            $content = file_get_contents($file);
            if ($content !== false && $content !== '') {
                $lines = explode("\n", rtrim($content, "\n"));
                $stepNo = count($lines) + 1;
            }
        } else {
            $dir = dirname($file);
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
        }

        $entry[ 'time' ] = date('Y-m-d H:i:s'); // 如 2026年09月07日 10时00分01秒
        $entry[ 'step_no' ] = $stepNo;

        self::desensitize($entry);

        $line = json_encode($entry, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
        // LOCK_EX 保证并发写入原子；@ 抑制失败时不影响主流程
        @file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
    }

    /**
     * 递归脱敏敏感字段（就地修改）
     * @param mixed $data
     */
    private static function desensitize(&$data)
    {
        if (!is_array($data)) return;
        foreach ($data as $key => &$value) {
            if (is_array($value)) {
                self::desensitize($value);
            } else if (is_string($key) && in_array(strtolower($key), self::$sensitiveKeys, true)) {
                $value = ( is_string($value) && $value !== '' ) ? '******' : $value;
            }
        }
        unset($value);
    }
}

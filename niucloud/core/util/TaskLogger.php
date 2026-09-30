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

use app\dict\sys\TaskDict;

/**
 * 任务日志工具：负责任务目录落盘
 * - events.jsonl：终端输出流水（回放 / 实时增量，含 seq 自增）
 * - task.json   ：任务状态快照（Cache 失效后可据此恢复续跑）
 * - steps.jsonl ：沿用 StepLogger（节点审计）
 *
 * 容错：所有写操作失败均不影响主流程。
 */
class TaskLogger
{
    /**
     * 单个任务事件日志上限（超过后仅保留尾部，防止永久保留撑爆磁盘）
     */
    const EVENT_MAX_LINES = 20000;

    /**
     * 任务根目录：runtime/backup/{task_type}/{task_key}/
     * @param string $taskType
     * @param string $taskKey
     * @return string
     */
    public static function taskDir(string $taskType, string $taskKey): string
    {
        if (empty($taskKey)) return '';
        // 备份任务：日志（task.json / events.jsonl / steps.jsonl / run.lock / run.lock.json）与备份归档同目录存放，
        // 便于统一管理与「文件被删则记录自愈」判断（备份归档目录为 project_path()/upgrade/{backup_key}）
        if ($taskType === TaskDict::TYPE_BACKUP) {
            return project_path() . 'upgrade' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR;
        }
        // task_runtime_path()：HTTP 与队列（CLI）下 runtime_path() 不同，这里统一，避免读写落在两套目录
        return task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . $taskType . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR;
    }

    public static function taskFile(string $taskType, string $taskKey): string
    {
        $dir = self::taskDir($taskType, $taskKey);
        return $dir ? $dir . 'task.json' : '';
    }

    public static function eventsFile(string $taskType, string $taskKey): string
    {
        $dir = self::taskDir($taskType, $taskKey);
        return $dir ? $dir . 'events.jsonl' : '';
    }

    public static function stepsFile(string $taskType, string $taskKey): string
    {
        $dir = self::taskDir($taskType, $taskKey);
        return $dir ? $dir . 'steps.jsonl' : '';
    }

    /**
     * 追加终端输出事件（批量）
     * @param string $file   events.jsonl 路径
     * @param array  $events [[level,text,progress], ...] 或 ['level'=>'','text'=>'','progress'=>0]
     * @return int 写入条数
     */
    public static function appendEvents(string $file, array $events): int
    {
        if (empty($file) || empty($events)) return 0;

        $dir = dirname($file);
        if (!is_dir($dir)) @mkdir($dir, 0755, true);

        // 当前最大 seq
        $seq = 0;
        if (is_file($file)) {
            $last = self::lastLine($file);
            if ($last !== '') {
                $decoded = json_decode($last, true);
                if (is_array($decoded) && isset($decoded[ 'seq' ])) {
                    $seq = (int) $decoded[ 'seq' ];
                }
            }
        }

        $lines = '';
        foreach ($events as $item) {
            if (is_string($item)) {
                $item = [ 'level' => 'info', 'text' => $item, 'progress' => null ];
            }
            if (empty($item[ 'text' ])) continue;

            $seq++;
            $line = [
                'seq'      => $seq,
                'ts'       => date('Y-m-d H:i:s'),
                'time'     => time(),
                'level'    => $item[ 'level' ] ?? 'info',
                'text'     => (string) $item[ 'text' ],
                'progress' => isset($item[ 'progress' ] ) && $item[ 'progress' ] !== '' ? (int) $item[ 'progress' ] : null,
            ];

            // 保留进度事件的元信息：队列驱动时前端从 events.jsonl 增量读取事件，
            // 缺 type/key/label/percent 就只能按文本兜底识别进度（文案一变就变一条新进度行），
            // 保留后可与 run 接口返回的事件用同一套渲染逻辑（同一 key 原地刷新）
            foreach ([ 'type', 'key', 'label', 'percent', 'level' ] as $field) {
                if (!array_key_exists($field, $item)) continue;
                if ($item[ $field ] === '' || $item[ $field ] === null) continue;
                $line[ $field ] = in_array($field, [ 'percent' ], true) ? (int) $item[ $field ] : $item[ $field ];
            }

            self::desensitize($line);
            $lines .= json_encode($line, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";
        }

        if ($lines === '') return 0;
        @file_put_contents($file, $lines, FILE_APPEND | LOCK_EX);
        self::trimEvents($file);
        return substr_count($lines, "\n");
    }

    /**
     * 读取事件（支持增量）
     * @param string $file
     * @param int    $afterSeq 只返回 seq 大于该值的事件
     * @param int    $limit    0 表示不限
     * @return array
     */
    public static function readEvents(string $file, int $afterSeq = 0, int $limit = 0): array
    {
        if (!is_file($file)) return [];
        $lines = @file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (empty($lines)) return [];

        $result = [];
        foreach ($lines as $line) {
            $decoded = json_decode($line, true);
            if (!is_array($decoded) || !isset($decoded[ 'seq' ])) continue;
            if ((int) $decoded[ 'seq' ] <= $afterSeq) continue;
            $result[] = $decoded;
            if ($limit > 0 && count($result) >= $limit) break;
        }
        return $result;
    }

    /**
     * 事件文件体积（字节）
     * @param string $file
     * @return int
     */
    public static function eventsSize(string $file): int
    {
        return is_file($file) ? (int) @filesize($file) : 0;
    }

    /**
     * 超出上限时裁剪，仅保留尾部 EVENT_MAX_LINES 行
     * @param string $file
     */
    private static function trimEvents(string $file)
    {
        if (!is_file($file)) return;
        $lines = @file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false || count($lines) <= self::EVENT_MAX_LINES) return;

        $keep = array_slice($lines, -self::EVENT_MAX_LINES);
        @file_put_contents($file, implode("\n", $keep) . "\n", LOCK_EX);
    }

    /**
     * 取文件最后一行
     * @param string $file
     * @return string
     */
    private static function lastLine(string $file): string
    {
        $fp = @fopen($file, 'r');
        if (!$fp) return '';
        $pos = -1;
        $line = '';
        // 从文件尾向前读，直到遇到换行
        while (true) {
            if (@fseek($fp, $pos, SEEK_END) !== 0) break;
            $char = @fgetc($fp);
            if ($char === false) break;
            if ($char === "\n" && $line !== '') break;
            $line = $char . $line;
            if (-$pos > 1024 * 1024) break; // 单行超过 1MB 则放弃
            $pos--;
        }
        @fclose($fp);
        return $line;
    }

    /**
     * 保存任务快照
     * @param string $file task.json
     * @param array  $data 快照内容（建议含 task 行 + handler_state）
     */
    public static function saveSnapshot(string $file, array $data)
    {
        if (empty($file)) return;
        $dir = dirname($file);
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        self::desensitize($data);
        $data[ '_snapshot_time' ] = date('Y-m-d H:i:s');
        @file_put_contents($file, json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
    }

    /**
     * 读取任务快照
     * @param string $file
     * @return array
     */
    public static function loadSnapshot(string $file): array
    {
        if (!is_file($file)) return [];
        $content = @file_get_contents($file);
        if (empty($content)) return [];
        $decoded = json_decode($content, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * 递归脱敏（与 StepLogger 保持一致）
     * @param mixed $data
     */
    private static function desensitize(&$data)
    {
        $keys = [ 'auth_code', 'authorize_code', 'token', 'password', 'secret', 'access_token', 'refresh_token', 'api_key', 'apikey', 'authorization' ];
        $handler = function (&$item) use (&$handler, $keys) {
            if (!is_array($item)) return;
            foreach ($item as $key => &$value) {
                if (is_array($value)) {
                    $handler($value);
                } else if (is_string($key) && in_array(strtolower($key), $keys, true)) {
                    $value = ( is_string($value) && $value !== '' ) ? '******' : $value;
                }
            }
            unset($value);
        };
        $handler($data);
    }
}

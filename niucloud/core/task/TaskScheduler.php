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

namespace core\task;

use app\dict\sys\TaskDict;
use app\job\task\TaskRunJob;
use app\service\admin\sys\SystemService;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;

/**
 * 任务调度器
 *
 * 职责（与 TaskExecutor 分工：执行器管单个任务的推进，调度器管「谁可以开始跑」）：
 * - 槽位：同一站点「互斥任务」与「非互斥任务」各占独立槽位，互不阻塞；
 *         互斥任务同站点同时最多 slot_mutex 个，非互斥任务同站点同时最多 slot_normal 个。
 * - 排队：创建任务时槽位已满也允许创建（created 状态即排队中），
 *         由 dispatchSite() 在槽位空闲时按 FIFO（id 升序）挑选并开始执行。
 * - 驱动：队列可用时投递 TaskRunJob 由队列推进；队列不可用时什么都不做，
 *         交给前端请求驱动（run 接口在队列可用时会拒绝推进）。
 *
 * 站点隔离：所有统计与调度都按 site_id 分组，某个站点任务异常不会影响其它站点；
 * 调度过程中每个站点、每个槽位单独 try/catch，异常只记录日志不向上抛。
 */
class TaskScheduler
{
    /**
     * 队列心跳缓存键：队列消费进程每次执行任务时刷新
     */
    const CACHE_KEY_QUEUE_HEARTBEAT = 'task_queue_heartbeat';

    /**
     * 队列可用状态缓存键（探测结果短期缓存，避免每次等待队列回执）
     */
    const CACHE_KEY_QUEUE_ALIVE = 'task_queue_alive';

    /**
     * 队列可用状态缓存时长（秒）
     */
    const CACHE_TTL_QUEUE_ALIVE = 10;

    // ==================== 槽位 ====================

    /**
     * 槽位上限
     * @param bool $isMutex
     * @return int
     */
    public static function slotLimit(bool $isMutex): int
    {
        $key  = $isMutex ? 'slot_mutex' : 'slot_normal';
        $limit = (int) config('niucloud.task.' . $key, 1);
        return $limit > 0 ? $limit : 1;
    }

    /**
     * 当前站点正在执行的任务数（占槽的任务）
     *
     * 口径：非终态 + 非子任务（parent_key 为空，子任务随父任务执行，不单独占槽）。
     *
     * @param int  $siteId
     * @param bool $isMutex
     * @return int
     */
    public static function activeCount(int $siteId, bool $isMutex): int
    {
        return (int) Db::name('sys_task')
            ->where([
                [ 'site_id', '=', $siteId ],
                [ 'is_mutex', '=', $isMutex ? 1 : 0 ],
                [ 'parent_key', '=', '' ],
                [ 'status', 'in', TaskDict::getNonTerminalStatus() ]
            ])
            ->where('status', '<>', TaskDict::STATUS_CREATED) // created = 排队中，尚未占槽
            ->count();
    }

    /**
     * 当前站点指定槽位是否空闲
     * @param int  $siteId
     * @param bool $isMutex
     * @return bool
     */
    public static function hasSlot(int $siteId, bool $isMutex): bool
    {
        return self::activeCount($siteId, $isMutex) < self::slotLimit($isMutex);
    }

    /**
     * 排队中的任务（created，未开始）
     * @param int  $siteId
     * @param bool $isMutex
     * @return array
     */
    public static function pendingList(int $siteId, bool $isMutex = null): array
    {
        $where = [
            [ 'site_id', '=', $siteId ],
            [ 'parent_key', '=', '' ],
            [ 'status', '=', TaskDict::STATUS_CREATED ]
        ];
        if ($isMutex !== null) $where[] = [ 'is_mutex', '=', $isMutex ? 1 : 0 ];

        return Db::name('sys_task')->where($where)->order('id asc')->select()->toArray();
    }

    // ==================== 调度 ====================

    /**
     * 调度单个站点的排队任务（补齐空闲槽位）
     *
     * 互斥槽与非互斥槽各自独立：某一类槽位被占满不影响另一类任务开始执行
     * （即非互斥任务可以「插队」到正在执行的互斥任务之前开始）。
     *
     * @param int $siteId
     * @return array 本次被调度开始的任务行列表
     */
    public static function dispatchSite(int $siteId): array
    {
        $started = [];

        foreach ([ true, false ] as $isMutex) {
            try {
                while (self::hasSlot($siteId, $isMutex)) {
                    $task = self::claim($siteId, $isMutex);
                    if (empty($task)) break; // 该槽位无排队任务

                    $started[] = $task;
                    self::push($task);
                }
            } catch (\Throwable $e) {
                // 单个站点 / 单个槽位的调度异常不影响其它站点与槽位
                Log::write('任务调度异常（site_id:' . $siteId . '，mutex:' . ( $isMutex ? 1 : 0 ) . '）：' . $e->getMessage());
            }
        }

        return $started;
    }

    /**
     * 调度所有站点（供队列任务在自身结束后调用，保证任何站点的排队任务都能被拉起）
     * @return array
     */
    public static function dispatchAll(): array
    {
        $started = [];
        try {
            $siteIds = Db::name('sys_task')
                ->where([ [ 'status', '=', TaskDict::STATUS_CREATED ], [ 'parent_key', '=', '' ] ])
                ->distinct(true)->column('site_id');
        } catch (\Throwable $e) {
            return $started;
        }

        foreach ((array) $siteIds as $siteId) {
            try {
                $started = array_merge($started, self::dispatchSite((int) $siteId));
            } catch (\Throwable $e) {
                Log::write('任务调度异常（site_id:' . $siteId . '）：' . $e->getMessage());
            }
        }

        return $started;
    }

    /**
     * 抢占一个排队任务并置为执行中（原子：事务内行锁，避免并发请求选中同一任务 / 超发槽位）
     *
     * @param int  $siteId
     * @param bool $isMutex
     * @return array 抢占到的任务行，无排队任务返回空数组
     */
    protected static function claim(int $siteId, bool $isMutex): array
    {
        $task = [];

        Db::startTrans();
        try {
            // 行锁：串行化「查排队任务 + 占位」，避免两个请求同时选中同一条
            $row = Db::name('sys_task')
                ->where([
                    [ 'site_id', '=', $siteId ],
                    [ 'is_mutex', '=', $isMutex ? 1 : 0 ],
                    [ 'parent_key', '=', '' ],
                    [ 'status', '=', TaskDict::STATUS_CREATED ]
                ])
                ->order('id asc')
                ->lock(true)
                ->find();

            if (empty($row)) {
                Db::commit();
                return [];
            }

            $update = [ 'status' => TaskDict::STATUS_RUNNING ];
            if ((int) ( $row[ 'start_time' ] ?? 0 ) <= 0) $update[ 'start_time' ] = time();

            Db::name('sys_task')->where([ [ 'id', '=', (int) $row[ 'id' ] ] ])->update($update);
            Db::commit();

            $task = array_merge($row, $update);
        } catch (\Throwable $e) {
            Db::rollback();
            throw $e;
        }

        return $task;
    }

    /**
     * 把任务交给队列推进
     *
     * 队列不可用时不投递（Dispatch 在 queue.state 关闭时会同步立即执行，
     * 那样会在当前请求里跑任务，故这里先判定队列可用性）。
     *
     * @param array $task 任务行
     * @return bool 是否已投递到队列
     */
    public static function push(array $task): bool
    {
        $taskKey = (string) ( $task[ 'task_key' ] ?? '' );
        if ($taskKey === '') return false;

        try {
            if (!self::queueAlive()) return false;
            return (bool) TaskRunJob::dispatch([ $taskKey, 0 ], secs: 0);
        } catch (\Throwable $e) {
            Log::write('任务投递队列失败：' . $taskKey . '_' . $e->getMessage());
            return false;
        }
    }

    // ==================== 队列可用性 ====================

    /**
     * 刷新队列心跳（由队列消费进程调用）
     * @return void
     */
    public static function beat(): void
    {
        try {
            Cache::set(self::CACHE_KEY_QUEUE_HEARTBEAT, time(), 3600);
        } catch (\Throwable $e) {
            // 心跳写入失败不影响任务执行
        }
    }

    /**
     * 队列是否可用（决定任务由队列推进还是由前端请求推进）
     *
     * 判定顺序：
     * 1. 队列未开启 / 无 redis 扩展：不可用
     * 2. 心跳新鲜（queue_heartbeat_ttl 秒内有过消费）：可用
     * 3. 心跳缺失（如队列刚启动、还没有任务被消费过）：退回主动探测（投递 CheckJob 等回执）
     *
     * 探测结果短期缓存，避免每次请求都等待队列回执。
     *
     * @return bool
     */
    public static function queueAlive(): bool
    {
        if (!env('queue.state', false) || !extension_loaded('redis')) return false;

        // 短期缓存：心跳判定很快，但探测（最多 5 秒）不能每次都做
        $cached = Cache::get(self::CACHE_KEY_QUEUE_ALIVE);
        if ($cached !== null) return (bool) $cached;

        $alive = false;
        try {
            $beat  = (int) Cache::get(self::CACHE_KEY_QUEUE_HEARTBEAT, 0);
            $ttl   = (int) config('niucloud.task.queue_heartbeat_ttl', 60);
            $alive = $beat > 0 && ( time() - $beat ) <= ( $ttl > 0 ? $ttl : 60 );
        } catch (\Throwable $e) {
            $alive = false;
        }

        if (!$alive) {
            try {
                $alive = ( new SystemService() )->checkJob();
            } catch (\Throwable $e) {
                $alive = false;
            }
        }

        try {
            Cache::set(self::CACHE_KEY_QUEUE_ALIVE, $alive ? 1 : 0, self::CACHE_TTL_QUEUE_ALIVE);
        } catch (\Throwable $e) {
            // 缓存失败不影响本次判定
        }

        return $alive;
    }

    // ==================== 保护阈值 ====================

    /**
     * 任务是否已超过最长执行时长
     * @param array $task
     * @return bool
     */
    public static function isTimeout(array $task): bool
    {
        $max = (int) config('niucloud.task.max_duration', 21600);
        if ($max <= 0) return false;

        $start = (int) ( $task[ 'start_time' ] ?: $task[ 'create_time' ] ?: 0 );
        if ($start <= 0) return false;

        return ( time() - $start ) > $max;
    }

    /**
     * 自驱链最大片数
     * @return int
     */
    public static function maxRounds(): int
    {
        $max = (int) config('niucloud.task.max_rounds', 20000);
        return $max > 0 ? $max : 20000;
    }

    /**
     * 自驱链入队延迟（秒）：带进度条的阶段（上传 / 下载）节奏更快
     * @param string $stage
     * @return int
     */
    public static function queueDelay(string $stage): int
    {
        $fast = preg_match('/(上传|下载)/u', $stage) === 1;
        $key  = $fast ? 'queue_delay_fast' : 'queue_delay';
        $sec  = (int) config('niucloud.task.' . $key, $fast ? 1 : 2);

        return max(0, $sec);
    }
}

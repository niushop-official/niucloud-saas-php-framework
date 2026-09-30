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
use core\exception\CommonException;
use core\util\TaskLogger;
use think\facade\Db;

/**
 * 统一任务执行器
 *
 * 职责（业务流程不在此处，全部委派给 Handler）：
 * - 任务落库（sys_task）与状态机流转
 * - 全局单实例互斥（升级与云编译同时只能进行一个，无配置开关）
 * - 任务锁（防多标签页并发驱动）与游标幂等（防重复推进同一片）
 * - 终端输出流水 events.jsonl 落盘
 * - 任务快照 task.json 落盘 / 恢复（Cache 失效后仍可续跑）
 *
 * 边界（决策）：终态任务**不可驱动**，只能只读回放。
 */
class TaskExecutor
{
    /**
     * 锁闸门文件：仅在「读租约 + 写租约」期间短时持有 flock
     */
    const LOCK_FILE = 'run.lock';

    /**
     * 租约文件：锁有效性的唯一凭据，记录持有者 token / pid / 过期时间
     */
    const LEASE_FILE = 'run.lock.json';

    /**
     * 租约默认有效期（秒）：需大于单次 run 的最长耗时，进程被中断且收尾失效时按此时间自动接管
     */
    const LOCK_TTL = 1800;

    protected TaskHandlerInterface $handler;

    protected array $task = [];

    /**
     * 任务锁目录（run.lock 闸门 + run.lock.json 租约）
     * @var string
     */
    protected string $lockDir = '';

    /**
     * 本进程是否已持有任务锁
     * @var bool
     */
    protected bool $lockHeld = false;

    /**
     * 本次持有锁的凭证（用于识别租约是否仍归属本进程）
     * @var string
     */
    protected string $lockToken = '';

    /**
     * 本次加锁是否为「接管僵死锁」（上一持有进程被中断，租约已失效）
     * @var bool
     */
    protected bool $lockTakenOver = false;

    /**
     * 是否已注册进程退出兜底释放（覆盖 fatal / 执行超时等无法 catch 的中断）
     * @var bool
     */
    protected bool $shutdownRegistered = false;

    public function __construct(TaskHandlerInterface $handler)
    {
        $this->handler = $handler;
    }

    public function __destruct()
    {
        $this->unlock();
    }

    // ==================== 查询 ====================

    /**
     * 当前站点id（多商户隔离：任务归属于发起它的站点，平台端为 0）
     * @return int
     */
    protected static function currentSiteId(): int
    {
        try {
            return (int) request()->siteId();
        } catch (\Throwable $e) {
            // 非 HTTP 上下文（命令行 / 队列）降级为平台端
            return 0;
        }
    }

    /**
     * 当前处于非终态的任务（全局互斥依据，不区分 task_type）
     * @return array
     */
    public static function getActiveTask(): array
    {
        $row = Db::name('sys_task')
            ->whereIn('status', TaskDict::getNonTerminalStatus())
            ->order('id desc')
            ->find();
        return self::rowToArray($row);
    }

    /**
     * 按 task_key 查询
     * @param string $taskKey
     * @return array
     */
    public static function getByKey(string $taskKey): array
    {
        if (empty($taskKey)) return [];
        $row = Db::name('sys_task')->where('task_key', $taskKey)->find();
        return self::rowToArray($row);
    }

    protected static function rowToArray($row): array
    {
        if (empty($row)) return [];
        if (is_array($row)) return $row;
        if (is_object($row) && method_exists($row, 'toArray')) return $row->toArray();
        return (array) $row;
    }

    /**
     * 装载任务
     * @param string $taskKey
     * @return bool
     */
    public function load(string $taskKey): bool
    {
        $this->task = self::getByKey($taskKey);
        return !empty($this->task);
    }

    public function getTask(): array
    {
        return $this->task;
    }

    public function getTaskKey(): string
    {
        return (string) ( $this->task[ 'task_key' ] ?? '' );
    }

    // ==================== 生命周期 ====================

    /**
     * 创建任务
     * @param array $params 业务入参
     * @return array 任务行
     * @throws CommonException 互斥任务且同站点已有进行中的互斥任务（互斥槽被占）
     */
    public function create(array $params): array
    {
        $siteId  = self::currentSiteId();
        $type    = $this->handler->getType();
        $isMutex = TaskDict::isMutex($type);

        // 槽位校验（按站点隔离）：互斥槽被占时拒绝创建互斥任务；
        // 非互斥任务不受影响，槽位空闲则立即开始，被占则排队（created）等待调度
        if ($isMutex && !TaskScheduler::hasSlot($siteId, true)) {
            throw new CommonException('TASK_MUTEX_EXIST');
        }

        $meta = $this->handler->create($params);
        $taskKey = (string) ( $meta[ 'task_key' ] ?? '' );
        if ($taskKey === '') {
            throw new CommonException('TASK_CREATE_FAIL');
        }

        $now = time();
        $data = [
            'site_id'     => $siteId,
            'task_key'    => $taskKey,
            'parent_key'  => (string) ( $meta[ 'parent_key' ] ?? '' ), // 子任务（如升级的备份）指向父任务
            'task_type'   => $type,
            'title'       => (string) ( $meta[ 'title' ] ?? TaskDict::getType($type) ),
            // 互斥标记：由任务类型固定（TaskDict::MUTEX_TYPES），创建参数不可覆盖
            'is_mutex'    => $isMutex ? 1 : 0,
            // 任务描述：由各 Handler 按业务拼（如升级任务记录「应用 版本 → 版本」）
            'desc'        => (string) ( $meta[ 'desc' ] ?? '' ),
            'status'      => TaskDict::STATUS_CREATED,
            'end_reason'  => '',
            'progress'    => 0,
            'stage'       => '',
            'cursor'      => '',
            'params'      => json_encode($meta[ 'params' ] ?? $params, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'actions'     => json_encode([], JSON_UNESCAPED_UNICODE),
            'fail_reason' => '',
            'log_size'    => 0,
            'start_time'  => 0,
            'end_time'    => 0,
            'create_time' => $now
        ];

        Db::name('sys_task')->insert($data);
        $this->task = self::getByKey($taskKey);

        // 预置步骤树：让详情页在任务一开始就展示 0/N 步骤
        $tracker = new TaskStepTracker($taskKey);
        $tracker->init($this->handler->getStepDefinitions());
        $this->handler->bindTracker($tracker);

        $this->writeEventsAndSnapshot([ [ 'level' => 'info', 'text' => '任务已创建：' . $data[ 'title' ] ] ]);

        // 立即调度：槽位空闲时把排队的任务（含本次创建的）交给队列开始执行；
        // 队列不可用时什么都不做，由前端请求驱动
        try {
            $started = TaskScheduler::dispatchSite($siteId);
            foreach ($started as $row) {
                // 被调度后状态可能已被置为 running，回写本对象以保证返回值与库一致
                if ((string) ( $row[ 'task_key' ] ?? '' ) === $taskKey) $this->task = $row;
            }
        } catch (\Throwable $e) {
            // 调度失败不影响任务创建结果
        }

        return $this->task;
    }

    /**
     * 推进一片 / 一步
     * @param string $cursor 上次返回的游标（首次可为空）
     * @return TaskResult
     */
    public function run(string $cursor = ''): TaskResult
    {
        // 单步可能耗时较长（如备份源码递归复制整个代码库、云编译下载产物等），
        // 放开执行时间限制，避免被 Web 端 max_execution_time 截断导致 500（CLI 默认不限制故正常）
        if (function_exists('set_time_limit')) {
            @set_time_limit(0);
        }
        @ignore_user_abort(true);

        $this->assertLoaded();

        // 1. 任务锁：防止多标签页并发驱动重复推进
        if (!$this->lock()) {
            return $this->currentResult(TaskDict::STATUS_LOCKED)
                ->addEvent('任务正被其它进程驱动，请稍候', 'warning');
        }

        try {
            // 2. 终态不可驱动（决策：老任务/已结束任务仅可只读回放）
            if (TaskDict::isTerminal((string) $this->task[ 'status' ])) {
                return $this->currentResult((string) $this->task[ 'status' ])
                    ->addEvent('任务已结束，仅可查看回放，不可继续执行', 'warning');
            }

            // 3. 排队中（created）：需先由调度器占用槽位并置为执行中，禁止直接驱动，
            //    否则会绕过槽位限制，导致同站点超出「互斥 / 非互斥各一个」的并发约定
            if ($this->task[ 'status' ] === TaskDict::STATUS_CREATED) {
                return $this->currentResult(TaskDict::STATUS_CREATED)
                    ->addEvent('任务排队中，等待前面的任务结束后自动开始', 'warning');
            }

            // 4. 等待用户决策期间暂停推进（决策：任务暂停等决策）
            if ($this->task[ 'status' ] === TaskDict::STATUS_WAITING_INPUT) {
                return $this->currentResult(TaskDict::STATUS_WAITING_INPUT)
                    ->addEvent('任务已暂停，等待用户选择操作', 'warning');
            }

            // 5. 游标幂等：重复/过期请求直接返回当前状态，不重复推进
            $storedCursor = (string) ( $this->task[ 'cursor' ] ?? '' );
            if ($cursor !== '' && $cursor !== $storedCursor) {
                return $this->currentResult((string) $this->task[ 'status' ]);
            }

            // 6. 首次驱动：标记开始（正常流程中状态已由调度器置为 running，这里作为兜底）
            $extra = [];
            if ($this->task[ 'status' ] === TaskDict::STATUS_CREATED) {
                $extra[ 'status' ]     = TaskDict::STATUS_RUNNING;
                $extra[ 'start_time' ] = time();
            }

            // 7. 委派 Handler 推进（先注入任务标识：业务服务可能已清空自身缓存，Handler 无法反推）
            $this->handler->bindTask($this->getTaskKey());
            $res = $this->handler->run($storedCursor);
            return $this->applyResult($res, $extra);

        } catch (\Throwable $e) {
            return $this->applyResult([
                'status'      => TaskDict::STATUS_FAILED,
                'stage'       => '执行异常',
                'events'      => [ [ 'level' => 'error', 'text' => '任务执行异常：' . $e->getMessage() ] ],
                'fail_reason' => [
                    'Message' => '失败原因：' . $e->getMessage(),
                    'File'    => '文件：' . $e->getFile(),
                    'Line'    => '代码行号：' . $e->getLine()
                ]
            ], []);
        } finally {
            $this->unlock();
        }
    }

    /**
     * 当前状态（只读回显，不推进、不产生事件）
     *
     * 用于「任务由队列推进时」的接口响应：前端请求只拿状态，不做驱动。
     * @return TaskResult
     */
    public function current(): TaskResult
    {
        $this->assertLoaded();
        return $this->currentResult((string) ( $this->task[ 'status' ] ?? '' ));
    }

    /**
     * 判定任务失败（执行超时 / 自驱链异常达上限等保护场景）
     * @param string $reason 失败原因描述
     * @return TaskResult
     */
    public function fail(string $reason): TaskResult
    {
        $this->assertLoaded();

        try {
            $this->handler->cancel(TaskDict::END_REASON_FAILED);
        } catch (\Throwable $e) {
            // 收尾失败不影响状态收敛
        }

        return $this->applyResult([
            'status'      => TaskDict::STATUS_FAILED,
            'end_reason'  => TaskDict::END_REASON_FAILED,
            'stage'       => '执行失败',
            'events'      => [ [ 'level' => 'error', 'text' => '任务执行失败：' . $reason ] ],
            'fail_reason' => [ 'Message' => '失败原因：' . $reason ]
        ], []);
    }

    /**
     * 调度同站点的排队任务（终态后调用）
     * @return void
     */
    protected function scheduleNext(): void
    {
        try {
            TaskScheduler::dispatchSite((int) ( $this->task[ 'site_id' ] ?? 0 ));
        } catch (\Throwable $e) {
            // 调度失败不影响本次任务结果
        }
    }

    /**
     * 用户操作（仅在 waiting_input 时生效）
     * @param string $code
     * @return TaskResult
     */
    public function operate(string $code): TaskResult
    {
        $this->assertLoaded();

        if (!$this->lock()) {
            return $this->currentResult(TaskDict::STATUS_LOCKED)
                ->addEvent('任务正被其它进程驱动，请稍候', 'warning');
        }

        try {
            if ($this->task[ 'status' ] !== TaskDict::STATUS_WAITING_INPUT) {
                return $this->currentResult((string) $this->task[ 'status' ])
                    ->addEvent('当前任务状态不允许该操作', 'warning');
            }

            $this->handler->bindTask($this->getTaskKey());

            // 跳过：只对声明了 can_skip 的步骤开放（不依赖前端是否展示了该入口）
            if ($code === TaskDict::ACTION_SKIP) {
                $tracker = new TaskStepTracker($this->getTaskKey());
                $stepKey = $tracker->actionStepKey();
                if ($stepKey === '' || !$tracker->isSkippable($stepKey)) {
                    return $this->currentResult(TaskDict::STATUS_WAITING_INPUT)
                        ->addEvent('当前步骤不支持跳过，请选择重试或取消任务', 'warning');
                }
            }

            $res = $this->handler->operate($code);

            // 跳过：当前步骤不再重试，标记为已跳过（进度计算中按已完成计入），随后继续推进
            if ($code === TaskDict::ACTION_SKIP) {
                ( new TaskStepTracker($this->getTaskKey()) )->skipCurrent();
            }

            return $this->applyResult($res, []);

        } catch (\Throwable $e) {
            return $this->applyResult([
                'status'      => TaskDict::STATUS_FAILED,
                'stage'       => '操作失败',
                'events'      => [ [ 'level' => 'error', 'text' => '操作失败：' . $e->getMessage() ] ],
                'fail_reason' => [
                    'Message' => '失败原因：' . $e->getMessage(),
                    'File'    => '文件：' . $e->getFile(),
                    'Line'    => '代码行号：' . $e->getLine()
                ]
            ], []);
        } finally {
            $this->unlock();
        }
    }

    /**
     * 取消任务
     * @param string $reason TaskDict::END_REASON_*
     * @return TaskResult
     */
    public function cancel(string $reason = TaskDict::END_REASON_USER_CANCEL): TaskResult
    {
        $this->assertLoaded();

        try {
            $this->handler->cancel($reason);
        } catch (\Throwable $e) {
            // 取消失败不影响本地状态收敛
        }

        return $this->applyResult([
            'status'      => TaskDict::STATUS_CANCELED,
            'end_reason'  => $reason,
            'stage'       => '已取消',
            'events'      => [ [ 'level' => 'warning', 'text' => '任务已被取消' ] ]
        ], []);
    }

    // ==================== 日志 / 快照 ====================

    /**
     * 读取终端输出事件（增量）
     * @param int $afterSeq
     * @param int $limit 0 不限
     * @return array
     */
    public function getEvents(int $afterSeq = 0, int $limit = 0): array
    {
        return TaskLogger::readEvents($this->getEventsFile(), $afterSeq, $limit);
    }

    public function getEventsSize(): int
    {
        return TaskLogger::eventsSize($this->getEventsFile());
    }

    /**
     * 从快照恢复 Handler 内部状态（Cache 失效后用于续跑）
     * @return bool
     */
    public function restoreState(): bool
    {
        $this->assertLoaded();
        $snapshot = TaskLogger::loadSnapshot($this->getSnapshotFile());
        $state    = $snapshot[ 'handler_state' ] ?? [];
        if (empty($state)) return false;

        $this->handler->restoreState($state);
        return true;
    }

    protected function getEventsFile(): string
    {
        return TaskLogger::eventsFile((string) ( $this->task[ 'task_type' ] ?? '' ), $this->getTaskKey());
    }

    protected function getSnapshotFile(): string
    {
        return TaskLogger::taskFile((string) ( $this->task[ 'task_type' ] ?? '' ), $this->getTaskKey());
    }

    /**
     * 写事件流水 + 任务快照
     * @param array $events
     */
    protected function writeEventsAndSnapshot(array $events): void
    {
        $eventsFile = $this->getEventsFile();
        if ($eventsFile !== '') {
            TaskLogger::appendEvents($eventsFile, $events);
            Db::name('sys_task')->where('task_key', $this->getTaskKey())
                ->update([ 'log_size' => TaskLogger::eventsSize($eventsFile) ]);
        }

        $snapshotFile = $this->getSnapshotFile();
        if ($snapshotFile !== '') {
            $old = TaskLogger::loadSnapshot($snapshotFile);

            $state = [];
            try {
                $state = $this->handler->snapshotState();
            } catch (\Throwable $e) {
                $state = [];
            }
            // 任务收尾（完成 / 失败 / 取消）时 Handler 往往已清空自身状态（如云端 build_task 缓存），
            // 此时沿用上一次快照的 handler_state，避免终态快照被写成空
            if (empty($state)) $state = (array) ( $old[ 'handler_state' ] ?? [] );

            $task = self::getByKey($this->getTaskKey());

            // Handler 附加信息（如云端生成的 task_id）：同样「非空才覆盖」，
            // 保证 Handler 清空自身状态后，快照里仍留有运行期间最后一次拿到的值
            $meta = [];
            try {
                if (method_exists($this->handler, 'snapshotMeta')) $meta = (array) $this->handler->snapshotMeta();
            } catch (\Throwable $e) {
                $meta = [];
            }
            if (empty($meta)) $meta = (array) ( $old[ 'task' ][ 'snapshot_meta' ] ?? [] );
            if (!empty($meta)) $task[ 'snapshot_meta' ] = $meta;

            TaskLogger::saveSnapshot($snapshotFile, [
                'task'           => $task,
                'handler_state'  => $state
            ]);
        }
    }

    /**
     * 过滤「跳过」操作：仅当当前步骤显式声明 can_skip=1 时才保留
     *
     * 跳过意味着该步骤不再执行，只有流程上确实允许略过的步骤才能开放该入口；
     * 这里做统一兜底，Handler 无需各自判断。
     *
     * @param array $actions
     * @param TaskStepTracker $tracker
     * @return array
     */
    protected function filterSkipAction(array $actions, TaskStepTracker $tracker): array
    {
        if (empty($actions)) return $actions;

        $hasSkip = false;
        foreach ($actions as $action) {
            if ((string) ( $action[ 'code' ] ?? '' ) === TaskDict::ACTION_SKIP) {
                $hasSkip = true;
                break;
            }
        }
        if (!$hasSkip) return $actions;

        $stepKey = $tracker->actionStepKey();
        if ($stepKey !== '' && $tracker->isSkippable($stepKey)) return $actions;

        return array_values(array_filter($actions, function ($action) {
            return (string) ( $action[ 'code' ] ?? '' ) !== TaskDict::ACTION_SKIP;
        }));
    }

    // ==================== 内部方法 ====================

    /**
     * 应用 Handler 返回的结果：更新 DB + 写事件与快照
     * @param array $res
     * @param array $extraUpdate
     * @return TaskResult
     */
    protected function applyResult(array $res, array $extraUpdate): TaskResult
    {
        $status   = (string) ( $res[ 'status' ] ?? TaskDict::STATUS_RUNNING );
        $progress = (int) ( $res[ 'progress' ] ?? $this->task[ 'progress' ] ?? 0 );
        $stage    = (string) ( $res[ 'stage' ] ?? $this->task[ 'stage' ] ?? '' );
        $cursor   = (string) ( $res[ 'cursor' ] ?? $this->task[ 'cursor' ] ?? '' );
        $events   = $res[ 'events' ] ?? [];
        $fail     = $res[ 'fail_reason' ] ?? [];

        $tracker = new TaskStepTracker($this->getTaskKey());
        $this->handler->bindTracker($tracker);

        // 仅在任务未进入终态时接受 Handler 的上报：
        // 终态（尤其是「取消」）时 Handler 仍可能按「已完成」推断（如云编译的 build_task 缓存已被清空 →
        // reportSteps 返回全部 success），继续合并会把未执行的步骤刷成 success 并把进度推到 100%，
        // 掩盖真实的取消/失败结果。终态的步骤收敛统一由下面 isTerminal 分支决定。
        if (!TaskDict::isTerminal($status)) {
            $tracker->merge($this->handler->reportSteps());
            $stepProgress = $tracker->calcProgress();
            if ($stepProgress !== null) $progress = $stepProgress;
        } elseif ($status === TaskDict::STATUS_FAILED) {
            // 失败终态：只回填「失败」的步骤（补齐失败原因）。整批合并会让 Handler 在收尾时
            // 把未执行步骤误报为成功（缓存已清 / 按已完成推断），故这里只取 failed 项。
            try {
                $failedSteps = array_values(array_filter($this->handler->reportSteps(), function ($step) {
                    return is_array($step) && (string) ( $step[ 'status' ] ?? '' ) === 'failed';
                }));
                if (!empty($failedSteps)) $tracker->merge($failedSteps);
            } catch (\Throwable $e) {
                // 回填失败不影响任务结果
            }
        }

        // 接管了「僵死锁」（上一驱动进程被中断）：补一条提示事件，便于排查与感知自动恢复
        if ($this->lockTakenOver) {
            $this->lockTakenOver = false;
            $events = array_merge([
                [ 'level' => 'warning', 'text' => '检测到上一次驱动进程异常中断，已自动接管任务继续执行' ]
            ], $events);
        }

        // 持久化事件筛选：审计事件全量落盘；实时进度事件（persist=false，如上传/下载百分比）
        // 按 key 节流落盘（见 persistEventsWithThrottle），保证队列驱动时终端也能看到上传/下载进度
        $persistEvents = $this->persistEventsWithThrottle($events);

        // 仅 waiting_input 下发操作项；终态一律为空（不可再操作）
        $actions = ( $status === TaskDict::STATUS_WAITING_INPUT ) ? ( $res[ 'actions' ] ?? [] ) : [];
        // 统一兜底：「跳过」只有步骤定义声明了 can_skip 才下发，
        // 避免各 Handler 漏判导致必要步骤（如「发起云编译」）被提供跳过入口
        $actions = $this->filterSkipAction($actions, $tracker);

        $update = array_merge($extraUpdate, [
            'status'  => $status,
            'progress'=> $progress,
            'stage'   => $stage,
            'cursor'  => $cursor,
            'actions' => json_encode($actions, JSON_UNESCAPED_UNICODE)
        ]);

        if (TaskDict::isTerminal($status)) {
            // 收敛未执行步骤：成功 => 视为已完成（如云编译最后一步下载/部署在同一请求内完成，来不及单独观测）；
            // 取消 => canceled；失败/回滚 => skipped（这部分确实没做）
            if ($status === TaskDict::STATUS_SUCCESS) {
                $tracker->finishPending(TaskStepTracker::STATUS_SUCCESS);
                // 成功即 100%，避免出现「步骤全部完成但进度停在 40%」的不一致
                $progress = 100;
                $update[ 'progress' ] = $progress;
            } else {
                $tracker->finishPending($status === TaskDict::STATUS_CANCELED ? TaskStepTracker::STATUS_CANCELED : TaskStepTracker::STATUS_SKIPPED);
                $recalc = $tracker->calcProgress();
                if ($recalc !== null) {
                    // 同步返回值里的进度，避免接口回显与库中不一致
                    $progress = $recalc;
                    $update[ 'progress' ] = $progress;
                }
            }
            $update[ 'end_time' ]   = time();
            $update[ 'end_reason' ] = (string) ( $res[ 'end_reason' ] ?? self::guessEndReason($status) );
            // 终态：任务不可再驱动，清除可能残留的锁，避免后续任何请求仍被旧锁挡住
            $this->releaseLease();
        }
        if (!empty($fail)) {
            $update[ 'fail_reason' ] = json_encode($fail, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }

        $this->update($update);
        $this->writeEventsAndSnapshot($persistEvents);

        // 终态：槽位释放，调度同站点的排队任务
        // 成功 / 失败 / 取消都继续调度，避免某个任务失败后同站点后续任务一直挂着
        if (TaskDict::isTerminal($status)) $this->scheduleNext();

        return TaskResult::make($status)
            ->setProgress($progress)
            ->setStage($stage)
            ->setCursor($cursor)
            ->setEvents($events)
            ->setActions($actions)
            ->setFailReason($fail);
    }

    /**
     * 筛选需要落盘 events.jsonl 的事件
     *
     * - 审计事件（persist != false）：全量落盘。
     * - 实时进度事件（persist=false，如上传/下载逐片百分比）：默认不落盘是为了防刷屏，
     *   但队列驱动时前端不调 run，终端输出只能从 events.jsonl 增量读取（pullEvents），
     *   进度事件完全不落盘会让队列任务的上传/下载阶段在终端看不到任何进度。
     *   因此进度事件按 key 节流落盘：与该 key 上次落盘值相差 >=10%（或到 100%）才写一条；
     *   handler 已落盘的里程碑事件（persist=true）直接落盘并同步节流游标，避免同值重复。
     *
     * $persistedProgress 为进程内缓存（函数级 static）：FPM/队列 worker 常驻进程内跨请求生效；
     * 进程重启后游标清空，最多导致多写一两条中间值，前端按 key 原地刷新渲染，无副作用。
     */
    protected function persistEventsWithThrottle(array $events): array
    {
        static $persistedProgress = [];

        $persistEvents = [];
        $taskKey = $this->getTaskKey();

        foreach ($events as $e) {
            if (!is_array($e)) continue;

            $isPersist  = ( $e[ 'persist' ] ?? true ) !== false;
            $isProgress = (string) ( $e[ 'type' ] ?? '' ) === 'progress';

            if ($isProgress) {
                $key     = (string) ( $e[ 'key' ] ?? $e[ 'text' ] ?? 'progress' );
                $percent = (int) ( $e[ 'percent' ] ?? $e[ 'progress' ] ?? 0 );
                $slot    = $taskKey . ':' . $key;
                $last    = $persistedProgress[ $slot ] ?? -100;

                if ($isPersist) {
                    // 里程碑事件：直接落盘，并推进节流游标
                    $persistedProgress[ $slot ] = max($last, $percent);
                    $persistEvents[] = $e;
                    continue;
                }

                // 实时进度事件：节流落盘
                if ($percent - $last >= 10 || $percent >= 100) {
                    $persistedProgress[ $slot ] = $percent;
                    $persistEvents[] = $e;
                }
                continue;
            }

            if ($isPersist) $persistEvents[] = $e;
        }

        return $persistEvents;
    }

    protected static function guessEndReason(string $status): string
    {
        $map = [
            TaskDict::STATUS_SUCCESS         => TaskDict::END_REASON_COMPLETED,
            TaskDict::STATUS_FAILED          => TaskDict::END_REASON_FAILED,
            TaskDict::STATUS_CANCELED        => TaskDict::END_REASON_USER_CANCEL,
            TaskDict::STATUS_ROLLED_BACK     => TaskDict::END_REASON_ROLLED_BACK,
            TaskDict::STATUS_ROLLBACK_FAILED => TaskDict::END_REASON_FAILED,
        ];
        return $map[ $status ] ?? TaskDict::END_REASON_FAILED;
    }

    /**
     * 以当前 DB 状态构造结果（不推进、不产生新事件）
     * @param string $status
     * @return TaskResult
     */
    protected function currentResult(string $status): TaskResult
    {
        $actions = json_decode((string) ( $this->task[ 'actions' ] ?? '' ), true);
        return TaskResult::make($status)
            ->setProgress((int) ( $this->task[ 'progress' ] ?? 0 ))
            ->setStage((string) ( $this->task[ 'stage' ] ?? '' ))
            ->setCursor((string) ( $this->task[ 'cursor' ] ?? '' ))
            ->setActions(is_array($actions) ? $actions : []);
    }

    protected function update(array $data): void
    {
        $taskKey = $this->getTaskKey();
        if ($taskKey === '') return;
        Db::name('sys_task')->where('task_key', $taskKey)->update($data);
        $this->task = self::getByKey($taskKey);
    }

    // ==================== 任务锁（租约制，防死锁） ====================

    /**
     * 任务锁目录
     * @return string
     */
    protected function getLockDir(): string
    {
        if ($this->lockDir !== '') return $this->lockDir;
        $dir = TaskLogger::taskDir((string) ( $this->task[ 'task_type' ] ?? '' ), $this->getTaskKey());
        if ($dir === '') return '';
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $this->lockDir = $dir;
        return $dir;
    }

    /**
     * 任务级互斥锁（非阻塞，租约制）
     *
     * 原实现用 flock 句柄贯穿整个 run()，一旦进程被中断（执行超时 / fatal / 被 kill，
     * catch(\Throwable) 捕获不到、finally 不会执行），锁便无法释放，任务永久处于
     * 「正被其它进程驱动」的死锁状态。现改为租约制：
     * - run.lock（闸门）：只在「读租约 + 写租约」期间短时 flock，用完立即释放，不再贯穿 run()
     * - run.lock.json（租约）：记录持有者 token / pid / 过期时间，是锁有效性的唯一凭据
     * - 正常结束 / 可捕获异常：finally 释放租约
     * - 进程被中断且收尾失效时：租约到期或持有进程已不存在 => 其它请求自动接管，杜绝死锁
     *
     * @return bool
     */
    protected function lock(): bool
    {
        $dir = $this->getLockDir();
        if ($dir === '') return false;

        $gateFile  = $dir . self::LOCK_FILE;
        $leaseFile = $dir . self::LEASE_FILE;

        $fp = @fopen($gateFile, 'c');
        if ($fp === false) return false;

        // 闸门：串行化租约的读-改-写，持有时长极短，因此不会长期占用导致无法抢占
        if (!self::flockWait($fp)) {
            @fclose($fp);
            return false;
        }

        $lease    = self::readLease($leaseFile);
        $takeOver = !empty($lease) && self::isLeaseInvalid($lease);
        $acquired = empty($lease) || $takeOver;
        $token    = $acquired ? self::writeLease($leaseFile) : '';

        @flock($fp, LOCK_UN);
        @fclose($fp);

        if (!$acquired || $token === '') return false;

        $this->lockHeld      = true;
        $this->lockToken     = $token;
        $this->lockTakenOver = $takeOver;
        $this->registerShutdownRelease();
        return true;
    }

    /**
     * 释放本进程持有的租约（仅释放归属自己的，避免误删接管者的租约）
     * @return void
     */
    protected function unlock(): void
    {
        if (!$this->lockHeld) return;
        $this->lockHeld = false;

        $dir = $this->lockDir !== '' ? $this->lockDir : $this->getLockDir();
        if ($dir === '') return;

        $leaseFile = $dir . self::LEASE_FILE;
        if (!is_file($leaseFile)) return;

        $lease = self::readLease($leaseFile);
        $owner = isset($lease[ 'token' ]) ? (string) $lease[ 'token' ] : '';
        // 租约仍归本进程才删除；已被其它进程接管时不能删，否则会把接管者的锁清掉
        if ($owner === '' || $owner === $this->lockToken) @unlink($leaseFile);
        $this->lockToken = '';
    }

    /**
     * 强制清除租约（任务进入终态后使用，任何残留锁都不该再生效）
     * @return void
     */
    protected function releaseLease(): void
    {
        $dir = $this->lockDir !== '' ? $this->lockDir : $this->getLockDir();
        if ($dir === '') return;
        $leaseFile = $dir . self::LEASE_FILE;
        if (is_file($leaseFile)) @unlink($leaseFile);
        $this->lockHeld  = false;
        $this->lockToken = '';
    }

    /**
     * 注册进程退出兜底释放：覆盖执行超时 / fatal error 等 catch 不到且 finally 不执行的中断
     * @return void
     */
    protected function registerShutdownRelease(): void
    {
        if ($this->shutdownRegistered) return;
        $this->shutdownRegistered = true;
        register_shutdown_function(function () {
            try {
                $this->unlock();
            } catch (\Throwable $e) {
                // 收尾阶段不再抛出
            }
        });
    }

    /**
     * 短时等待 flock（避免极端并发下直接失败；闸门持有时间极短，等待上限很小）
     * @param resource $fp
     * @param int $timeoutMs
     * @return bool
     */
    protected static function flockWait($fp, int $timeoutMs = 3000): bool
    {
        $deadline = microtime(true) + ( $timeoutMs / 1000 );
        while (true) {
            if (@flock($fp, LOCK_EX | LOCK_NB)) return true;
            if (microtime(true) >= $deadline) return false;
            usleep(50000);
        }
    }

    /**
     * 读取租约（文件不存在返回空数组，表示无持有者）
     * @param string $file
     * @return array
     */
    protected static function readLease(string $file): array
    {
        if (!is_file($file)) return [];
        $raw = @file_get_contents($file);
        if ($raw === false || $raw === '') return [];

        $data = json_decode($raw, true);
        if (is_array($data)) return $data;

        // 租约文件损坏（写入被中断等）：无法识别持有者，按文件修改时间 + TTL 兜底判定，保守不抢占
        return [ 'pid' => 0, 'token' => '', 'expire_at' => ( (int) @filemtime($file) ) + self::lockTtl() ];
    }

    /**
     * 写入（抢占）租约，返回本次凭证；失败返回空串
     * @param string $file
     * @return string
     */
    protected static function writeLease(string $file): string
    {
        $ttl   = self::lockTtl();
        $token = self::makeToken();
        $data  = [
            'token'     => $token,
            'pid'       => function_exists('getmypid') ? (int) getmypid() : 0,
            'host'      => function_exists('gethostname') ? (string) gethostname() : '',
            'start_at'  => time(),
            'expire_at' => time() + $ttl,
            'ttl'       => $ttl
        ];
        $ok = @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
        return $ok !== false ? $token : '';
    }

    /**
     * 租约是否已失效（可被其它进程接管）
     * @param array $lease
     * @return bool
     */
    protected static function isLeaseInvalid(array $lease): bool
    {
        $expireAt = (int) ( $lease[ 'expire_at' ] ?? 0 );
        if ($expireAt <= 0) return true;
        if (time() > $expireAt) return true;

        // 未到期但持有进程已确定不存在（被 kill / 崩溃）：立即判定失效，缩短恢复等待
        $pid = (int) ( $lease[ 'pid' ] ?? 0 );
        return $pid > 0 && self::isPidDead($pid);
    }

    /**
     * 判断进程是否已不存在（无法判定时保守返回 false，避免误抢正常进程的锁）
     * @param int $pid
     * @return bool
     */
    protected static function isPidDead(int $pid): bool
    {
        static $cache = [];
        $now = time();
        if (isset($cache[ $pid ]) && $cache[ $pid ][ 'expire' ] > $now) return $cache[ $pid ][ 'dead' ];

        $dead = false;
        if (DIRECTORY_SEPARATOR === '\\') {
            $out = @shell_exec('tasklist /FI "PID eq ' . $pid . '" /NH 2>NUL');
            $dead = is_string($out) && trim($out) !== '' && stripos($out, (string) $pid) === false;
        } else if (is_dir('/proc/' . $pid)) {
            $dead = false;
        } else if (function_exists('posix_kill')) {
            if (!@posix_kill($pid, 0)) {
                $err = function_exists('posix_get_last_error') ? posix_get_last_error() : 0;
                // EPERM(1) 表示进程存在但无权限；其余（如 ESRCH）视为进程已不存在
                $dead = ( $err !== 1 );
            }
        }

        // 5 秒内复用检测结果，避免高频 syscall / tasklist 开销
        $cache[ $pid ] = [ 'dead' => $dead, 'expire' => $now + 5 ];
        return $dead;
    }

    /**
     * 租约有效期（秒）：需大于单次 run 的最长耗时（分片上传/产物下载等）
     * @return int
     */
    protected static function lockTtl(): int
    {
        $ttl = (int) config('niucloud.task.lock_ttl', self::LOCK_TTL);
        return $ttl > 60 ? $ttl : self::LOCK_TTL;
    }

    protected static function makeToken(): string
    {
        try {
            return function_exists('random_bytes') ? bin2hex(random_bytes(8)) : uniqid('', true);
        } catch (\Throwable $e) {
            return uniqid('', true);
        }
    }

    protected function assertLoaded(): void
    {
        if (empty($this->task)) {
            throw new CommonException('TASK_NOT_EXIST');
        }
    }
}

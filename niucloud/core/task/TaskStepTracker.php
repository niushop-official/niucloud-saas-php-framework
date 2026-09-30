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

use app\model\sys\SysTaskStep;
use think\facade\Db;
use Throwable;

/**
 * 任务步骤追踪器
 *
 * 职责：维护「任务 → 步骤 → 子步骤」三层结构，落库 sys_task_step，并据此计算任务总进度。
 *
 * 设计要点：
 * - 静态步骤表由 Handler 的 getStepDefinitions() 提供，任务创建时一次性预置（UI 才能一开始显示 0/N）
 * - 运行时状态由 Handler 的 reportSteps() 上报（增量 merge，幂等）
 * - 步骤权重 weight 之和 = 100，任务总进度 = Σ(已完成权重) + 当前步骤权重 × 步骤进度/100
 * - 子步骤（多端口编译、分片等）用 parent_key 关联，允许多个子步骤同时 running（并行分支）
 * - 所有写操作容错：步骤写失败不影响任务主流程
 */
class TaskStepTracker
{
    /** 步骤状态 */
    const STATUS_PENDING = 'pending';   // 待执行
    const STATUS_RUNNING = 'running';   // 执行中
    const STATUS_SUCCESS = 'success';   // 成功
    const STATUS_FAILED = 'failed';     // 失败
    const STATUS_SKIPPED = 'skipped';   // 跳过
    const STATUS_CANCELED = 'canceled'; // 已取消

    /** 终态步骤（计入已完成） */
    const DONE_STATUS = [ self::STATUS_SUCCESS, self::STATUS_SKIPPED ];

    protected string $taskKey = '';

    public function __construct(string $taskKey)
    {
        $this->taskKey = $taskKey;
    }

    /**
     * 预置步骤（任务创建时调用）
     * @param array $definitions [['key'=>'','name'=>'','desc'=>'','weight'=>0,'parent'=>'','seq'=>0], ...]
     * @return void
     */
    public function init(array $definitions): void
    {
        if ($this->taskKey === '' || empty($definitions)) return;

        $now = time();
        $rows = [];
        $seq = 0;
        foreach ($definitions as $item) {
            $seq++;
            $rows[] = [
                'task_key' => $this->taskKey,
                'step_key' => (string) ( $item[ 'key' ] ?? '' ),
                'parent_key' => (string) ( $item[ 'parent' ] ?? '' ),
                'name' => (string) ( $item[ 'name' ] ?? ( $item[ 'key' ] ?? '' ) ),
                'desc' => (string) ( $item[ 'desc' ] ?? '' ),
                'seq' => (int) ( $item[ 'seq' ] ?? $seq ),
                'weight' => (int) ( $item[ 'weight' ] ?? 0 ),
                'is_show' => (int) ( $item[ 'is_show' ] ?? 1 ),
                'need_execute' => (int) ( $item[ 'need_execute' ] ?? 1 ),
                'can_skip' => (int) ( $item[ 'can_skip' ] ?? 0 ),
                'status' => self::STATUS_PENDING,
                'progress' => 0,
                'start_at' => 0,
                'end_at' => 0,
                'duration' => 0,
                'error' => '',
                'create_time' => $now,
                'update_time' => $now,
            ];
        }

        try {
            Db::name('sys_task_step')->insertAll($rows);
        } catch (Throwable $e) {
            // 步骤写失败不影响任务主流程
        }
    }

    /**
     * 合并 Handler 上报的步骤状态（幂等）
     *
     * @param array $steps
     * 单条结构：
     * [
     *   'step_key' => 'build_compile', 'name' => '云端编译',
     *   'status' => 'running', 'progress' => 60,
     *   'start_at' => 0, 'end_at' => 0, 'error' => '',
     *   'sub' => [ ['step_key'=>'build_compile:admin','name'=>'admin 端口','status'=>'success','progress'=>100,...], ... ]
     * ]
     * @return void
     */
    public function merge(array $steps): void
    {
        if ($this->taskKey === '' || empty($steps)) return;

        foreach ($steps as $step) {
            if (!is_array($step)) continue;
            $stepKey = (string) ( $step[ 'step_key' ] ?? '' );
            if ($stepKey === '') continue;

            // 单个步骤写入失败不能中断整批合并（否则后续步骤永远停留在旧状态）
            try {
                $this->saveStep($stepKey, $step);
            } catch (Throwable $e) {
                // 忽略
            }

            foreach (( $step[ 'sub' ] ?? [] ) as $sub) {
                if (!is_array($sub)) continue;
                $subKey = (string) ( $sub[ 'step_key' ] ?? '' );
                if ($subKey === '') continue;
                $sub[ 'parent' ] = $sub[ 'parent' ] ?? $stepKey;
                try {
                    $this->saveStep($subKey, $sub);
                } catch (Throwable $e) {
                    // 忽略
                }
            }
        }
    }

    /**
     * 任务终态时收敛未执行步骤
     * @param string $status success（视为已完成）|canceled|skipped
     * @return void
     */
    public function finishPending(string $status): void
    {
        if ($this->taskKey === '') return;
        $allow  = [ self::STATUS_SUCCESS, self::STATUS_CANCELED, self::STATUS_SKIPPED ];
        $target = in_array($status, $allow, true) ? $status : self::STATUS_SKIPPED;

        $now = time();
        // 开始时间兜底：仅当原本没有开始时间（pending 步骤）时才用结束时间补齐，
        // 已处于 running 且记录过开始时间的步骤保持不变，避免把真实耗时清零
        $resolvedStart = 'IF(start_at <= 0, ' . $now . ', start_at)';
        $data = [
            'status'    => $target,
            'end_at'    => $now,
            'start_at'  => Db::raw($resolvedStart),
            'duration'  => Db::raw('GREATEST(0, ' . $now . ' - (' . $resolvedStart . '))'),
            'update_time' => $now,
        ];
        // 成功收敛时把进度补满，保证「已完成」步骤展示一致
        if ($target === self::STATUS_SUCCESS) $data[ 'progress' ] = 100;

        try {
            Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'status', 'in', [ self::STATUS_PENDING, self::STATUS_RUNNING ] ] ])
                ->update($data);
        } catch (Throwable $e) {
            // 忽略
        }
    }

    /**
     * 跳过当前步骤：把「执行中 / 失败」的步骤标记为已跳过
     *
     * 用于用户在等待决策时选择「跳过」：该步骤不再重试，也不再占住当前进度，
     * 后续由任务继续推进（进度计算中 skipped 与 success 一样计入已完成）。
     * @return int 被标记的行数
     */
    public function skipCurrent(): int
    {
        if ($this->taskKey === '') return 0;

        $now = time();

        try {
            // 只跳过「当前那一条」：优先执行中的步骤（序号最小），否则取失败步骤中的第一条
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'status', '=', self::STATUS_RUNNING ] ])
                ->order('seq asc')
                ->find();

            if (empty($row)) {
                $row = Db::name('sys_task_step')
                    ->where([ [ 'task_key', '=', $this->taskKey ], [ 'status', '=', self::STATUS_FAILED ] ])
                    ->order('seq asc')
                    ->find();
            }

            if (empty($row)) return 0;

            return Db::name('sys_task_step')
                ->where([ [ 'id', '=', (int) $row[ 'id' ] ] ])
                ->update([ 'status' => self::STATUS_SKIPPED, 'end_at' => $now, 'update_time' => $now ]);
        } catch (Throwable $e) {
            return 0;
        }
    }

    /**
     * 记录步骤开始时间（通用计时 API，供 Handler 在阶段切换时统一调用）
     *
     * 仅首次写入（start_at<=0 且步骤尚未终态），重复调用不刷新；不覆盖已有真实起点。
     * @param string $stepKey
     * @param int|null $time 真实开始时间（Unix 秒）；为空取当前时间
     * @return void
     */
    public function markStarted(string $stepKey, ?int $time = null): void
    {
        if ($this->taskKey === '' || $stepKey === '') return;
        $now = time();
        $t = (int) ( $time ?? $now );

        try {
            Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'step_key', '=', $stepKey ] ])
                ->where('status', 'in', [ self::STATUS_PENDING, self::STATUS_RUNNING ])
                ->where('start_at', '<=', 0)
                ->update([ 'start_at' => $t, 'update_time' => $now ]);
        } catch (Throwable $e) {
            // 忽略
        }
    }

    /**
     * 记录步骤结束时间并计算耗时（通用计时 API，供 Handler 在阶段切换时统一调用）
     *
     * 仅首次写入（end_at<=0）：结束时间取 $time（Handler 提供的真实结束时刻）或当前时间；
     * 开始时间缺失时以结束时间兜底，最终耗时 = end - start（>=0）。
     * @param string $stepKey
     * @param int|null $time 真实结束时间（Unix 秒）；为空取当前时间
     * @return void
     */
    public function markFinished(string $stepKey, ?int $time = null): void
    {
        if ($this->taskKey === '' || $stepKey === '') return;
        $now = time();
        $t = (int) ( $time ?? $now );

        try {
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'step_key', '=', $stepKey ] ])
                ->field('start_at, end_at')
                ->find();
            if (empty($row) || (int) ( $row[ 'end_at' ] ?? 0 ) > 0) return;

            $startAt = (int) ( $row[ 'start_at' ] ?? 0 );
            if ($startAt <= 0) $startAt = $t;

            Db::name('sys_task_step')
                ->where([ [ 'id', '=', (int) $row[ 'id' ] ] ])
                ->update([
                    'start_at' => $startAt,
                    'end_at'   => $t,
                    'duration' => max(0, $t - $startAt),
                    'update_time' => $now,
                ]);
        } catch (Throwable $e) {
            // 忽略
        }
    }

    /**
     * 任务总进度（按权重加权）；无步骤数据时返回 null，交由 Handler 自行估算
     * @return int|null
     */
    public function calcProgress(): ?int
    {
        if ($this->taskKey === '') return null;

        try {
            $rows = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'parent_key', '=', '' ] ])
                ->field('status, progress, weight, need_execute')
                ->select()->toArray();
        } catch (Throwable $e) {
            return null;
        }

        if (empty($rows)) return null;

        $totalWeight = 0;
        $done = 0.0;
        foreach ($rows as $row) {
            // 仅用于展示的步骤（如云端各端口）不参与进度计算
            if ((int) ( $row[ 'need_execute' ] ?? 1 ) === 0) continue;

            $weight = (int) ( $row[ 'weight' ] ?? 0 );
            if ($weight <= 0) continue;
            $totalWeight += $weight;

            $status = (string) ( $row[ 'status' ] ?? self::STATUS_PENDING );
            $progress = (int) ( $row[ 'progress' ] ?? 0 );

            if ($status === self::STATUS_SUCCESS || $status === self::STATUS_SKIPPED) {
                $done += $weight;
            } elseif ($status === self::STATUS_RUNNING) {
                $done += $weight * ( min(100, max(0, $progress)) / 100 );
            } elseif ($status === self::STATUS_FAILED) {
                // 失败步骤按已完成的进度部分计入，避免进度回退到 0
                $done += $weight * ( min(100, max(0, $progress)) / 100 );
            }
        }

        if ($totalWeight <= 0) return null;
        return (int) floor(min(100, $done / $totalWeight * 100));
    }

    /**
     * 步骤树（含子步骤）
     * @return array
     */
    public function tree(): array
    {
        if ($this->taskKey === '') return [];

        try {
            $rows = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ] ])
                ->field('step_key, parent_key, name, desc, seq, weight, is_show, need_execute, can_skip, status, progress, start_at, end_at, duration, error')
                ->order('seq asc, id asc')
                ->select()->toArray();
        } catch (Throwable $e) {
            return [];
        }

        $parents = [];
        $children = [];
        foreach ($rows as $row) {
            $item = $this->format($row);
            if ((string) $row[ 'parent_key' ] === '') {
                $parents[] = $item;
            } else {
                $children[ (string) $row[ 'parent_key' ] ][] = $item;
            }
        }

        foreach ($parents as &$parent) {
            $parent[ 'sub_steps' ] = $children[ $parent[ 'step_key' ] ] ?? [];
        }

        return $parents;
    }

    /**
     * 指定步骤是否声明了可跳过（只看定义，不看当前状态）
     *
     * 用于「是否向用户提供跳过入口」的判断：步骤定义里 can_skip=1 才允许出现跳过操作。
     *
     * @param string $stepKey
     * @return bool
     */
    public function isSkippable(string $stepKey): bool
    {
        if ($this->taskKey === '' || $stepKey === '') return false;

        try {
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'step_key', '=', $stepKey ] ])
                ->field('can_skip')
                ->find();
        } catch (Throwable $e) {
            return false;
        }

        return (int) ( $row[ 'can_skip' ] ?? 0 ) === 1;
    }

    /**
     * 指定步骤是否可跳过
     *
     * 两个条件同时满足才允许：步骤定义声明了 can_skip，且该步骤当前处于出错（failed）状态。
     * 即「只有存在错误的时候才可以跳过」，正常的待执行 / 进行中步骤不允许跳过。
     *
     * @param string $stepKey
     * @return bool
     */
    public function canSkip(string $stepKey): bool
    {
        if ($this->taskKey === '' || $stepKey === '') return false;

        try {
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'step_key', '=', $stepKey ] ])
                ->field('can_skip, status')
                ->find();
        } catch (Throwable $e) {
            return false;
        }

        if (empty($row)) return false;

        return (int) ( $row[ 'can_skip' ] ?? 0 ) === 1
            && (string) ( $row[ 'status' ] ?? '' ) === self::STATUS_FAILED;
    }

    /**
     * 最近出错的步骤标识（无则空串）
     * @return string
     */
    public function failedStepKey(): string
    {
        if ($this->taskKey === '') return '';

        try {
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'status', '=', self::STATUS_FAILED ] ])
                ->order('seq asc, id asc')
                ->field('step_key')
                ->find();
            return (string) ( $row[ 'step_key' ] ?? '' );
        } catch (Throwable $e) {
            return '';
        }
    }

    /**
     * 等待决策时「跳过」针对的步骤：优先执行中的步骤，其次最近出错的步骤
     * @return string
     */
    public function actionStepKey(): string
    {
        $key = $this->currentStepKey();
        return $key !== '' ? $key : $this->failedStepKey();
    }

    /**
     * 当前执行中的步骤标识
     * @return string
     */
    public function currentStepKey(): string
    {
        if ($this->taskKey === '') return '';
        try {
            $row = Db::name('sys_task_step')
                ->where([ [ 'task_key', '=', $this->taskKey ], [ 'status', '=', self::STATUS_RUNNING ] ])
                ->order('seq asc, id asc')
                ->field('step_key')
                ->find();
            return (string) ( $row[ 'step_key' ] ?? '' );
        } catch (Throwable $e) {
            return '';
        }
    }

    /**
     * 步骤统计
     * @return array ['total'=>int, 'done'=>int]
     */
    public function stat(): array
    {
        $steps = $this->tree();
        $total = 0;
        $done = 0;
        foreach ($steps as $step) {
            $total++;
            if (in_array($step[ 'status' ], [ self::STATUS_SUCCESS, self::STATUS_SKIPPED ], true)) $done++;
        }
        return [ 'total' => $total, 'done' => $done ];
    }

    // ==================== 内部方法 ====================

    /**
     * 写入/更新单个步骤
     * @param string $stepKey
     * @param array $step
     * @return void
     */
    protected function saveStep(string $stepKey, array $step): void
    {
        $now = time();

        $exists = Db::name('sys_task_step')
            ->where([ [ 'task_key', '=', $this->taskKey ], [ 'step_key', '=', $stepKey ] ])
            ->find();

        $data = [ 'update_time' => $now ];

        if (isset($step[ 'name' ])) $data[ 'name' ] = (string) $step[ 'name' ];
        if (isset($step[ 'desc' ])) $data[ 'desc' ] = (string) $step[ 'desc' ];
        if (isset($step[ 'parent' ])) $data[ 'parent_key' ] = (string) $step[ 'parent' ];
        if (isset($step[ 'seq' ])) $data[ 'seq' ] = (int) $step[ 'seq' ];
        if (isset($step[ 'weight' ])) $data[ 'weight' ] = (int) $step[ 'weight' ];
        if (isset($step[ 'is_show' ])) $data[ 'is_show' ] = (int) $step[ 'is_show' ];
        if (isset($step[ 'need_execute' ])) $data[ 'need_execute' ] = (int) $step[ 'need_execute' ];
        if (isset($step[ 'can_skip' ])) $data[ 'can_skip' ] = (int) $step[ 'can_skip' ];
        if (isset($step[ 'status' ])) $data[ 'status' ] = (string) $step[ 'status' ];
        if (isset($step[ 'error' ])) $data[ 'error' ] = (string) $step[ 'error' ];

        if (array_key_exists('progress', $step)) {
            $progress = (int) $step[ 'progress' ];
            // 进度只允许增长，避免步骤进度回退造成进度条抖动
            $data[ 'progress' ] = empty($exists) ? $progress : max($progress, (int) $exists[ 'progress' ]);
        }

        if (!empty($step[ 'start_at' ])) $data[ 'start_at' ] = (int) $step[ 'start_at' ];
        if (!empty($step[ 'end_at' ])) $data[ 'end_at' ] = (int) $step[ 'end_at' ];

        $status = (string) ( $step[ 'status' ] ?? '' );

        if (empty($exists)) {
            $data = array_merge([
                'task_key' => $this->taskKey,
                'step_key' => $stepKey,
                'parent_key' => (string) ( $step[ 'parent' ] ?? '' ),
                'name' => (string) ( $step[ 'name' ] ?? $stepKey ),
                'desc' => (string) ( $step[ 'desc' ] ?? '' ),
                'seq' => (int) ( $step[ 'seq' ] ?? 0 ),
                'weight' => (int) ( $step[ 'weight' ] ?? 0 ),
                'is_show' => (int) ( $step[ 'is_show' ] ?? 1 ),
                'need_execute' => (int) ( $step[ 'need_execute' ] ?? 1 ),
                'can_skip' => (int) ( $step[ 'can_skip' ] ?? 0 ),
                'status' => $status !== '' ? $status : self::STATUS_PENDING,
                'progress' => (int) ( $step[ 'progress' ] ?? 0 ),
                'start_at' => (int) ( $step[ 'start_at' ] ?? 0 ),
                'end_at' => (int) ( $step[ 'end_at' ] ?? 0 ),
                'duration' => 0,
                'error' => (string) ( $step[ 'error' ] ?? '' ),
                'create_time' => $now,
            ], $data);

            // 首见即执行中：补开始时间
            if (( $data[ 'status' ] ?? '' ) === self::STATUS_RUNNING && empty($data[ 'start_at' ])) {
                $data[ 'start_at' ] = $now;
            }
            // 首见即终态（如直接以 success 上报的步骤）：补结束时间与开始时间，避免 start_at 恒为 0
            if (in_array(( $data[ 'status' ] ?? '' ), [ self::STATUS_SUCCESS, self::STATUS_FAILED, self::STATUS_SKIPPED, self::STATUS_CANCELED ], true)) {
                if (empty($data[ 'end_at' ])) $data[ 'end_at' ] = $now;
                if (empty($data[ 'start_at' ])) $data[ 'start_at' ] = $data[ 'end_at' ];
                $data[ 'duration' ] = max(0, (int) $data[ 'end_at' ] - (int) $data[ 'start_at' ]);
            }
            Db::name('sys_task_step')->insert($data);
            return;
        }

        // 首次进入执行中：补开始时间
        if ($status === self::STATUS_RUNNING && (int) $exists[ 'start_at' ] <= 0) {
            $data[ 'start_at' ] = $now;
        }
        // 进入终态：补结束时间并计算耗时
        if (in_array($status, [ self::STATUS_SUCCESS, self::STATUS_FAILED, self::STATUS_SKIPPED, self::STATUS_CANCELED ], true)) {
            // 结束时间优先级：Handler 上报的真实结束时间 > 已记录的 > 本次时间
            $endAt = (int) ( $step[ 'end_at' ] ?? 0 );
            if ($endAt <= 0) $endAt = (int) ( $exists[ 'end_at' ] ?? 0 );
            if ($endAt <= 0) $endAt = $now;
            $data[ 'end_at' ] = $endAt;

            $startAt = (int) ( $exists[ 'start_at' ] ?? 0 ) ?: (int) ( $step[ 'start_at' ] ?? 0 );
            // 直接以终态上报（从未经历 running）且 Handler 也没给开始时间的步骤：
            // 用结束时间兜底补齐，避免 start_at 恒为 0 而 end_at 有值的脏数据
            if ($startAt <= 0) {
                $startAt = $endAt;
                $data[ 'start_at' ] = $startAt;
            }
            $data[ 'duration' ] = max(0, $endAt - $startAt);
        }

        Db::name('sys_task_step')->where([ [ 'id', '=', $exists[ 'id' ] ] ])->update($data);
    }

    /**
     * 格式化输出（补时长，空时间返回空串便于前端判断）
     * @param array $row
     * @return array
     */
    protected function format(array $row): array
    {
        $duration = (int) ( $row[ 'duration' ] ?? 0 );
        if ($duration <= 0) {
            $startAt = (int) ( $row[ 'start_at' ] ?? 0 );
            $endAt = (int) ( $row[ 'end_at' ] ?? 0 );
            if ($startAt > 0) $duration = max(0, ( $endAt ?: time() ) - $startAt);
        }

        return [
            'step_key' => (string) ( $row[ 'step_key' ] ?? '' ),
            'parent_key' => (string) ( $row[ 'parent_key' ] ?? '' ),
            'name' => (string) ( $row[ 'name' ] ?? '' ),
            'desc' => (string) ( $row[ 'desc' ] ?? '' ),
            'seq' => (int) ( $row[ 'seq' ] ?? 0 ),
            'weight' => (int) ( $row[ 'weight' ] ?? 0 ),
            'is_show' => (int) ( $row[ 'is_show' ] ?? 1 ),
            'need_execute' => (int) ( $row[ 'need_execute' ] ?? 1 ),
            'can_skip' => (int) ( $row[ 'can_skip' ] ?? 0 ),
            'status' => (string) ( $row[ 'status' ] ?? self::STATUS_PENDING ),
            'progress' => (int) ( $row[ 'progress' ] ?? 0 ),
            'start_at' => (int) ( $row[ 'start_at' ] ?? 0 ),
            'end_at' => (int) ( $row[ 'end_at' ] ?? 0 ),
            'duration' => $duration,
            'error' => (string) ( $row[ 'error' ] ?? '' ),
            'sub_steps' => [],
        ];
    }
}

<?php

namespace core\task;

/**
 * 步骤上报默认实现
 *
 * 用于「暂无步骤模型」的任务处理器：返回空定义与空上报，
 * 保证 TaskExecutor 与旧 Handler 完全兼容（进度仍走各 Handler 自己的 estimateProgress）。
 * 业务方接入步骤模型后，在自己的 Handler 中覆写这两个方法即可。
 */
trait TaskStepTrait
{
    /**
     * 步骤追踪器（由 TaskExecutor 注入），用于统一记录步骤起止时间
     * @var TaskStepTracker|null
     */
    protected ?TaskStepTracker $tracker = null;

    /**
     * 注入步骤追踪器（Executor 在 create/run 前调用）
     * @param TaskStepTracker $tracker
     * @return void
     */
    public function bindTracker(TaskStepTracker $tracker): void
    {
        $this->tracker = $tracker;
    }

    /**
     * 步骤定义（静态表）
     * @return array [['key'=>'','name'=>'','desc'=>'','weight'=>0,'parent'=>'','seq'=>0], ...]
     */
    public function getStepDefinitions(): array
    {
        return [];
    }

    /**
     * 运行时步骤状态上报
     * @return array [['step_key'=>'','name'=>'','status'=>'','progress'=>0,'error'=>'','sub'=>[]], ...]
     */
    public function reportSteps(): array
    {
        return [];
    }

    /**
     * 记录步骤开始时间（统一计时 API，业务 handler 在阶段切换时调用）
     * @param string $stepKey
     * @param int|null $time
     * @return void
     */
    protected function markStepStarted(string $stepKey, ?int $time = null): void
    {
        $this->tracker?->markStarted($stepKey, $time);
    }

    /**
     * 记录步骤结束时间并计算耗时（统一计时 API，业务 handler 在阶段切换时调用）
     * @param string $stepKey
     * @param int|null $time
     * @return void
     */
    protected function markStepFinished(string $stepKey, ?int $time = null): void
    {
        $this->tracker?->markFinished($stepKey, $time);
    }

    /**
     * 依据「步骤定义 + 已完成步骤 + 当前步骤」生成上报结构（各 Handler 通用）
     *
     * - 已完成：status=success / progress=100
     * - 当前步骤：status=running（失败时 failed）/ progress=步骤内进度
     * - 其余：status=pending / progress=0
     *
     * @param array $definitions 步骤定义
     * @param array $doneKeys 已完成的步骤 key
     * @param string $currentKey 当前步骤 key（为空表示无进行中步骤）
     * @param int $currentPercent 当前步骤内进度
     * @param bool $failed 当前步骤是否失败
     * @param string $error 失败原因
     * @return array
     */
    protected function buildStepsFromDefinitions(
        array $definitions,
        array $doneKeys = [],
        string $currentKey = '',
        int $currentPercent = 0,
        bool $failed = false,
        string $error = ''
    ): array {
        $steps = [];

        foreach ($definitions as $index => $def) {
            $key = (string) ( $def[ 'key' ] ?? '' );
            if ($key === '') continue;

            $base = [
                'step_key'     => $key,
                'name'         => (string) ( $def[ 'name' ] ?? $key ),
                'desc'         => (string) ( $def[ 'desc' ] ?? '' ),
                'seq'          => (int) ( $def[ 'seq' ] ?? $index + 1 ),
                'weight'       => (int) ( $def[ 'weight' ] ?? 0 ),
                'is_show'      => (int) ( $def[ 'is_show' ] ?? 1 ),
                'need_execute' => (int) ( $def[ 'need_execute' ] ?? 1 ),
                // 是否允许跳过；由步骤定义声明，实际能否跳过还要求该步骤处于出错状态
                'can_skip'     => (int) ( $def[ 'can_skip' ] ?? 0 ),
            ];

            if ($key === $currentKey) {
                $steps[] = array_merge($base, [
                    'status'   => $failed ? 'failed' : 'running',
                    'progress' => max(0, min(100, $failed ? min($currentPercent, 99) : $currentPercent)),
                    'error'    => $failed ? $error : ''
                ]);
                continue;
            }

            if (in_array($key, $doneKeys, true)) {
                $steps[] = array_merge($base, [ 'status' => 'success', 'progress' => 100 ]);
                continue;
            }

            $steps[] = array_merge($base, [ 'status' => 'pending', 'progress' => 0 ]);
        }

        return $steps;
    }
}

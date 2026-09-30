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

/**
 * 任务处理器接口
 *
 * 设计原则：**适配器模式**——每个 Handler 只做「现有业务服务」与「统一任务模型」之间的
 * 入参/出参适配，业务流程代码不重写。
 * TaskExecutor 负责：落库、状态机、锁与幂等、写 events/steps、快照。
 */
interface TaskHandlerInterface
{
    /**
     * 任务类型（TaskDict::TYPE_*）
     * @return string
     */
    public function getType(): string;

    /**
     * 创建任务：调用现有业务服务发起任务，返回统一的元信息
     * @param array $params 业务入参
     * @return array ['task_key'=>string, 'title'=>string, 'params'=>array]
     */
    public function create(array $params): array;

    /**
     * 绑定当前任务标识（Executor 在 run/operate 前调用）
     *
     * Handler 多为无状态适配器，且业务服务可能已清空自己的任务缓存（如云编译完成后 clearTask），
     * 此时 Handler 无法从业务服务反推 task_key。由 Executor 统一注入，保证收尾逻辑（发版落版本记录等）
     * 在任何阶段都能拿到正确的任务标识。
     * @param string $taskKey
     * @return void
     */
    public function bindTask(string $taskKey): void;

    /**
     * 注入步骤追踪器（Executor 在 create/run 前调用，供 Handler 统一记录步骤起止时间）
     * @param TaskStepTracker $tracker
     * @return void
     */
    public function bindTracker(TaskStepTracker $tracker): void;

    /**
     * 推进一片/一步
     * @param string $cursor 续跑游标（首次为空串）
     * @return array 统一中间结构：
     *               [
     *                 'status'      => running|waiting_input|success|failed|canceled|rolled_back,
     *                 'progress'    => int,
     *                 'stage'       => string,
     *                 'cursor'      => string,
     *                 'events'      => [[level,text,progress], ...],
     *                 'actions'     => [[code,label,style], ...],
     *                 'fail_reason' => array
     *               ]
     */
    public function run(string $cursor): array;

    /**
     * 处理用户操作（仅在 waiting_input 时被调用）
     * @param string $code  操作码 retry|continue|cancel|rollback|local_build
     * @return array 同 run() 返回结构
     */
    public function operate(string $code): array;

    /**
     * 取消 / 结束任务
     * @param string $reason TaskDict::END_REASON_*
     * @return void
     */
    public function cancel(string $reason): void;

    /**
     * 导出内部状态（用于写入 task.json 快照）
     * 说明：现有服务把任务状态放在 Cache 中，Cache 失效后靠此快照恢复续跑。
     * @return array
     */
    public function snapshotState(): array;

    /**
     * 从快照恢复内部状态（写回 Cache）
     * @param array $state
     * @return void
     */
    public function restoreState(array $state): void;

    /**
     * 步骤定义（静态表），任务创建时用于预置整棵步骤树
     * 返回空数组表示「该任务类型暂无步骤模型」，详情页按历史任务降级展示
     * @return array [['key'=>string,'name'=>string,'desc'=>string,'weight'=>int,'parent'=>string,'seq'=>int], ...]
     */
    public function getStepDefinitions(): array;

    /**
     * 运行时步骤状态上报（增量、幂等，由 TaskExecutor 在每次 run/operate 后合并）
     * @return array [['step_key'=>string,'name'=>string,'status'=>string,'progress'=>int,
     *                'start_at'=>int,'end_at'=>int,'error'=>string,'sub'=>array], ...]
     */
    public function reportSteps(): array;
}

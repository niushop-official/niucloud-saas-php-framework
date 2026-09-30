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

namespace app\job\task;

use app\dict\sys\TaskDict;
use app\service\admin\task\TaskService;
use core\base\BaseJob;
use core\task\TaskExecutor;
use core\task\TaskScheduler;
use think\facade\Log;

/**
 * 任务推进（队列驱动）
 *
 * 队列正常时由本 job 自驱推进任务：每次只推一片，推完再把自己入队，形成自驱链。
 * 这样即使所有用户都关闭页面，任务也能跑完；前端只需轮询状态，不再驱动推进。
 *
 * 自驱链终止条件：
 * - 任务进入终态（success / failed / canceled / rolled_back / rollback_failed）
 * - 等待用户决策（waiting_input）：占槽等待，用户操作后由 operate 接口重新入队
 * - 超过最长执行时长 / 最大推进片数（保护阈值）：判定失败并调度同站点排队任务
 *
 * 站点隔离：任务行里带 site_id，job 执行时把它注入请求上下文，
 * 保证业务服务取到的站点与创建任务时一致（CLI 下无登录态，只能从任务行取）。
 */
class TaskRunJob extends BaseJob
{
    /**
     * 推进一片
     * @param string $task_key 任务标识
     * @param int    $round    已推进片数（用于最大片数保护）
     * @return bool
     */
    public function doJob(string $task_key, int $round = 0)
    {
        // 心跳：队列消费进程存活的凭据（run 接口据此判断「交给队列 / 交给前端请求」）
        TaskScheduler::beat();

        $task = TaskExecutor::getByKey($task_key);
        if (empty($task)) return true;

        $siteId = (int) ( $task[ 'site_id' ] ?? 0 );
        self::bindSite($siteId);

        $status = (string) ( $task[ 'status' ] ?? '' );

        // 终态：不再推进（可能已被取消），顺带调度同站点排队任务
        if (TaskDict::isTerminal($status)) {
            TaskScheduler::dispatchSite($siteId);
            return true;
        }

        // 等待用户决策：停止自驱，等 operate 后再继续
        if ($status === TaskDict::STATUS_WAITING_INPUT) return true;

        // 保护：超过最长执行时长
        if (TaskScheduler::isTimeout($task)) {
            $this->terminate($task_key, $siteId, '任务执行超过最长时长限制，已终止');
            return true;
        }

        // 保护：超过最大推进片数
        if ($round > TaskScheduler::maxRounds()) {
            $this->terminate($task_key, $siteId, '任务推进次数超过上限，已终止');
            return true;
        }

        $stage = '';
        try {
            // force：队列内推进不受「队列可用则不推进」的限制
            $result = ( new TaskService() )->run($task_key, '', true);
            $stage  = (string) ( $result[ 'stage' ] ?? '' );
        } catch (\Throwable $e) {
            Log::write('任务队列推进异常：' . $task_key . '_' . $e->getMessage() . '_' . $e->getFile() . '_' . $e->getLine());
        }

        $current = TaskExecutor::getByKey($task_key);
        $status  = (string) ( $current[ 'status' ] ?? '' );
        $stage   = $stage !== '' ? $stage : (string) ( $current[ 'stage' ] ?? '' );

        if (TaskDict::isTerminal($status)) {
            TaskScheduler::dispatchSite($siteId);
            return true;
        }

        // 等待决策：占槽等待用户操作（operate 后重新入队）
        if ($status === TaskDict::STATUS_WAITING_INPUT) return true;

        // 继续自驱：按阶段节奏延迟入队（带进度条的阶段节奏更快）
        self::dispatch([ $task_key, $round + 1 ], secs: TaskScheduler::queueDelay($stage));
        return true;
    }

    /**
     * 终止任务（保护阈值触发）并调度同站点排队任务
     * @param string $taskKey
     * @param int    $siteId
     * @param string $reason
     * @return void
     */
    protected function terminate(string $taskKey, int $siteId, string $reason): void
    {
        try {
            ( new TaskService() )->fail($taskKey, $reason);
        } catch (\Throwable $e) {
            Log::write('任务终止失败：' . $taskKey . '_' . $e->getMessage());
        }

        TaskScheduler::dispatchSite($siteId);
    }

    /**
     * 把站点注入请求上下文（CLI / 队列无登录态，站点只能取自任务行）
     * @param int $siteId
     * @return void
     */
    protected static function bindSite(int $siteId): void
    {
        if ($siteId <= 0) return;
        try {
            request()->siteId($siteId);
        } catch (\Throwable $e) {
            // CLI 环境可能没有请求对象，业务服务自行降级
        }
    }
}

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

namespace app\service\core\task\handler;

use app\dict\sys\TaskDict;
use app\service\admin\upgrade\BackupRecordsService;
use core\exception\CommonException;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTrait;
use think\facade\Cache;
use think\facade\Db;

/**
 * 系统备份 / 恢复任务处理器（适配器）
 * 仅做统一任务模型与 BackupRecordsService 之间的入参/出参适配，业务流程不改写。
 * - 备份步骤：备份源码 -> 备份数据库（分段）-> 完成
 * - 恢复步骤：备份源码 -> 备份数据库（分段）-> 恢复源码 -> 恢复数据库（分段）-> 恢复数据 -> 完成
 */
class BackupTaskHandler implements TaskHandlerInterface
{
    use TaskStepTrait;

    /**
     * 已输出过的日志行去重缓存键
     * @var string
     */
    protected string $emittedKey = '';

    /** 当前任务标识（由 TaskExecutor 注入） */
    protected string $taskKey = '';

    /**
     * 本次备份 / 恢复的步骤定义（创建阶段按模式确定）
     * @var array
     */
    protected array $backupSteps = [];

    public function getType(): string
    {
        return TaskDict::TYPE_BACKUP;
    }

    /**
     * 备份 / 恢复步骤定义（权重合计 100）
     * @param string $mode BackupRecordsService::MODE_BACKUP / MODE_RESTORE
     * @return array
     */
    public static function backupStepDefinitions(string $mode = BackupRecordsService::MODE_BACKUP): array
    {
        if ($mode === BackupRecordsService::MODE_RESTORE) {
            return [
                [ 'key' => BackupRecordsService::STEP_BACKUP_CODE, 'name' => '备份当前源码', 'desc' => '恢复前自动备份现有源码', 'weight' => 15, 'seq' => 1 ],
                [ 'key' => BackupRecordsService::STEP_RESTORE_CODE, 'name' => '恢复源码', 'desc' => '用备份覆盖现有源码', 'weight' => 35, 'seq' => 2 ],
                [ 'key' => BackupRecordsService::STEP_RESTORE_SQL, 'name' => '恢复数据库', 'desc' => '分段导入备份 SQL', 'weight' => 30, 'seq' => 3 ],
                [ 'key' => BackupRecordsService::STEP_RESTORE_DATA, 'name' => '数据修正', 'desc' => '恢复后的数据修正', 'weight' => 10, 'seq' => 4 ],
                [ 'key' => BackupRecordsService::STEP_RESTORE_COMPLETE, 'name' => '恢复完成', 'desc' => '恢复收尾', 'weight' => 10, 'seq' => 5 ],
            ];
        }

        return [
            [ 'key' => BackupRecordsService::STEP_BACKUP_CODE, 'name' => '备份源码', 'desc' => '复制源码到归档目录', 'weight' => 40, 'seq' => 1 ],
            [ 'key' => BackupRecordsService::STEP_BACKUP_SQL, 'name' => '备份数据库', 'desc' => '分段导出数据库', 'weight' => 50, 'seq' => 2 ],
            [ 'key' => BackupRecordsService::STEP_BACKUP_COMPLETE, 'name' => '备份完成', 'desc' => '备份收尾', 'weight' => 10, 'seq' => 3 ],
        ];
    }

    public function getStepDefinitions(): array
    {
        return $this->backupSteps;
    }

    /**
     * 运行时步骤上报：以备份任务的当前步骤与分段进度为准
     * @return array
     */
    public function reportSteps(): array
    {
        $state = ( new BackupRecordsService() )->getTaskState();
        if (empty($state) || !is_array($state)) return [];

        $mode       = (string) ( $state[ 'mode' ] ?? BackupRecordsService::MODE_BACKUP );
        $definitions = self::backupStepDefinitions($mode);
        $keys       = array_column($definitions, 'key');
        $step       = (string) ( $state[ 'step' ] ?? '' );
        $done       = !empty($state[ 'done' ]);

        $index = array_search($step, $keys, true);
        if ($index === false) $index = 0;

        // 当前步骤之前的视为已完成；任务结束时全部完成
        $doneKeys = $done ? $keys : array_slice($keys, 0, $index);

        // 步骤内进度：源码复制按已复制文件数，数据库按分段进度
        $percent = 0;
        if ($step === BackupRecordsService::STEP_BACKUP_CODE) {
            $percent = $this->codePercent($state, 'backup');
        } elseif ($step === BackupRecordsService::STEP_RESTORE_CODE) {
            $percent = $this->codePercent($state, 'restore');
        } elseif (in_array($step, [ BackupRecordsService::STEP_BACKUP_SQL, BackupRecordsService::STEP_RESTORE_SQL ], true)) {
            $percent = (int) ( $state[ 'progress' ] ?? 0 );
        }

        $steps = $this->buildStepsFromDefinitions($definitions, $doneKeys, $done ? '' : $step, $percent);

        // 源码备份 / 恢复按目录展开子步骤：每个目录一个，便于看到具体处理到哪个目录
        foreach ($steps as &$item) {
            if ($item[ 'step_key' ] === BackupRecordsService::STEP_BACKUP_CODE) {
                $item[ 'sub' ] = $this->buildCodeRootSteps($state, $done, BackupRecordsService::STEP_BACKUP_CODE, 'backup');
            } elseif ($item[ 'step_key' ] === BackupRecordsService::STEP_RESTORE_CODE) {
                $item[ 'sub' ] = $this->buildCodeRootSteps($state, $done, BackupRecordsService::STEP_RESTORE_CODE, 'restore');
            }
        }
        unset($item);

        return $steps;
    }

    /**
     * 源码备份 / 恢复的子步骤：每个待处理目录一个
     *
     * 依据 state 中的目录序号（当前目录）与各目录文件数推导：
     * 已过目录 => 已完成；当前目录 => 执行中（按已复制文件数算进度）；未开始 => 待执行。
     *
     * @param array $state 备份 / 恢复任务状态
     * @param bool $done 任务是否已结束
     * @param string $stepKey 所属步骤标识（backupCode / restoreCode）
     * @param string $kind backup（备份） / restore（恢复）
     * @return array
     */
    protected function buildCodeRootSteps(array $state, bool $done, string $stepKey, string $kind): array
    {
        $isRestore = $kind === 'restore';

        $roots     = $isRestore ? BackupRecordsService::getRestoreCodeRoots() : BackupRecordsService::getBackupCodeRoots();
        $indexKey  = $isRestore ? 'restore_root_index' : 'code_root_index';
        $totalsKey = $isRestore ? 'restore_root_totals' : 'code_root_totals';
        $doneKey   = $isRestore ? 'restore_done' : 'code_done';
        $totalKey  = $isRestore ? 'restore_total' : 'code_total';

        if (empty($roots)) return [];

        $totals    = (array) ( $state[ $totalsKey ] ?? [] );
        $doneCount = (int) ( $state[ $doneKey ] ?? 0 );
        $rootIndex = (int) ( $state[ $indexKey ] ?? 0 );

        // 该步骤已整体完成（步骤流转到后续步骤 / 任务结束）时，全部目录视为已完成
        $finished = $done || ( (string) ( $state[ 'step' ] ?? '' ) !== $stepKey );
        if ($finished) {
            $rootIndex = count($roots);
            $doneCount = (int) ( $state[ $totalKey ] ?? 0 );
        }

        $steps    = [];
        $consumed = 0; // 已完成目录累计的文件数（已复制数是跨目录累加值）

        foreach ($roots as $index => $root) {
            $key   = (string) ( $root[ 'key' ] ?? '' );
            $total = (int) ( $totals[ $key ] ?? 0 );

            if ($index < $rootIndex) {
                $status   = 'success';
                $progress = 100;
                $consumed += $total;
            } elseif ($index === $rootIndex) {
                $copied   = max(0, $doneCount - $consumed);
                $status   = 'running';
                $progress = $total > 0 ? (int) floor(min(1, $copied / $total) * 100) : 0;
            } else {
                $status   = 'pending';
                $progress = 0;
            }

            $steps[] = [
                'step_key' => $stepKey . ':' . $key,
                'parent'   => $stepKey,
                'name'     => (string) ( $root[ 'name' ] ?? $key ),
                'desc'     => (string) ( $root[ 'desc' ] ?? '' ),
                'seq'      => $index + 1,
                'weight'   => 0, // 子步骤不参与任务总进度
                'status'   => $status,
                'progress' => $progress
            ];
        }

        return $steps;
    }

    public function create(array $params): array
    {
        $mode = (string) ( $params[ 'mode' ] ?? BackupRecordsService::MODE_BACKUP );
        $service = new BackupRecordsService();

        if ($mode === BackupRecordsService::MODE_RESTORE) {
            // 备份归属统一取 sys_task（sys_backup_records 已废弃）：优先按 backup_key 定位，
            // 兼容按 id 传入时反查其 task_key
            $backup_key = (string) ( $params[ 'backup_key' ] ?? '' );
            if ($backup_key === '') {
                $id = (int) ( $params[ 'id' ] ?? 0 );
                if ($id > 0) $backup_key = (string) ( Db::name('sys_task')->where('id', $id)->value('task_key') ?: '' );
            }

            $state = $service->startRestoreByKey($backup_key);
            $title = '系统恢复';
        } else {
            $mode  = BackupRecordsService::MODE_BACKUP;
            $state = $service->startBackup($params);
            $title = '系统备份';
        }

        // 步骤在创建阶段即按模式确定（备份 3 步 / 恢复 5 步）
        $this->backupSteps = self::backupStepDefinitions($mode);

        $key = (string) ( $state[ 'key' ] ?? '' );
        if ($key === '') {
            throw new CommonException('TASK_CREATE_FAIL');
        }

        $this->emittedKey = self::cacheKey($key);
        $this->resetEmitted();

        return [
            'task_key' => $key,
            'title'    => $title,
            'params'   => array_merge($params, [ 'mode' => $mode ])
        ];
    }

    public function run(string $cursor): array
    {
        $service = new BackupRecordsService();
        $state   = $service->getTaskState();

        // 任务状态不存在 => 已结束（完成 / 被清除）
        if (empty($state)) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '执行完成',
                'cursor'     => ''
            ];
        }

        // 已结束：收敛一次，交由执行器置为终态
        if (!empty($state[ 'done' ])) {
            $events = $this->buildEvents($state);
            // 任务已成功完成：补写备份记录（幂等），backup_key 与 task_key 对齐
            $service->finishBackup($state);
            $service->clearTaskState();

            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => $this->currentStage($state, true),
                'cursor'     => '',
                'events'     => $events
            ];
        }

        $this->emittedKey = self::cacheKey((string) ( $state[ 'key' ] ?? '' ));

        try {
            $service->execute();
        } catch (\Throwable $e) {
            // 收敛：备份失败删除记录，恢复失败标记失败
            try {
                $service->failTask();
            } catch (\Throwable $ignore) {
            }

            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'stage'       => '执行失败',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'error', 'text' => '执行失败：' . $e->getMessage() ] ],
                'fail_reason' => [
                    'Message' => '失败原因：' . $e->getMessage(),
                    'File'    => '文件：' . $e->getFile(),
                    'Line'    => '代码行号：' . $e->getLine()
                ]
            ];
        }

        // 执行后重新读取最新任务状态
        $state = $service->getTaskState();
        if (empty($state)) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '执行完成',
                'cursor'     => ''
            ];
        }

        $events = $this->buildEvents($state);

        if (!empty($state[ 'done' ])) {
            // 本次执行完成：此时才落备份记录，backup_key 取任务标识（state.key = task_key）
            $service->finishBackup($state);
            $service->clearTaskState();

            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => $this->currentStage($state, true),
                'cursor'     => '',
                'events'     => $events
            ];
        }

        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => $this->estimateProgress($state),
            'stage'    => $this->currentStage($state),
            'cursor'   => (string) ( $state[ 'step' ] ?? '' ),
            'events'   => $events
        ];
    }

    public function bindTask(string $taskKey): void
    {
        if ($taskKey !== '') $this->taskKey = $taskKey;
    }

    public function operate(string $code): array
    {
        if ($code === 'cancel') {
            $this->cancel(TaskDict::END_REASON_USER_CANCEL);
            return [
                'status'     => TaskDict::STATUS_CANCELED,
                'end_reason' => TaskDict::END_REASON_USER_CANCEL,
                'stage'      => '已取消',
                'cursor'     => '',
                'events'     => [ [ 'level' => 'warning', 'text' => '备份任务已被取消' ] ]
            ];
        }

        return [
            'status' => TaskDict::STATUS_RUNNING,
            'stage'  => '继续执行',
            'cursor' => '',
            'events' => [ [ 'level' => 'info', 'text' => '已恢复执行' ] ]
        ];
    }

    public function cancel(string $reason): void
    {
        ( new BackupRecordsService() )->failTask();
    }

    public function snapshotState(): array
    {
        return ( new BackupRecordsService() )->getTaskState();
    }

    public function restoreState(array $state): void
    {
        ( new BackupRecordsService() )->restoreTaskState($state);
    }

    // ==================== 内部方法 ====================

    protected static function cacheKey(string $key): string
    {
        return 'task_backup_emitted_' . $key;
    }

    /**
     * 清空本任务的事件去重与进度里程碑缓存（任务创建时调用）
     * @return void
     */
    protected function resetEmitted(): void
    {
        if ($this->emittedKey === '') return;
        Cache::delete($this->emittedKey);
        Cache::delete($this->emittedKey . '_sql_percent_backup_sql');
        Cache::delete($this->emittedKey . '_sql_percent_restore_sql');
    }

    protected function isEmitted(string $text): bool
    {
        if ($this->emittedKey === '') return false;
        $emitted = Cache::get($this->emittedKey) ?: [];
        return is_array($emitted) && in_array($text, $emitted, true);
    }

    protected function markEmitted(string $text): void
    {
        if ($this->emittedKey === '') return;
        $emitted = Cache::get($this->emittedKey) ?: [];
        if (!is_array($emitted)) $emitted = [];
        $emitted[] = $text;
        Cache::set($this->emittedKey, $emitted, 86400);
    }

    /**
     * 构造本次要输出的事件（日志行去重 + 数据库备份/恢复进度）
     * @param array $state
     * @return array
     */
    protected function buildEvents(array $state): array
    {
        $events = [];

        foreach (( $state[ 'data' ] ?? [] ) as $item) {
            $text = (string) ( $item[ 'content' ] ?? '' );
            if ($text === '' || $this->isEmitted($text)) continue;
            $this->markEmitted($text);
            $events[] = [ 'level' => 'info', 'text' => $text, 'progress' => null ];
        }

        // 源码备份 / 恢复：基于已复制文件数估算进度（实时进度条，仅前端展示，不落盘回放）
        $step    = (string) ( $state[ 'step' ] ?? '' );
        if (in_array($step, [ BackupRecordsService::STEP_BACKUP_CODE, BackupRecordsService::STEP_RESTORE_CODE ], true)) {
            $isRestore = $step === BackupRecordsService::STEP_RESTORE_CODE;
            $total = (int) ( $state[ 'code_total' ] ?? ( $state[ 'restore_total' ] ?? 0 ) );
            $done  = (int) ( $state[ 'code_done' ] ?? ( $state[ 'restore_done' ] ?? 0 ) );
            $percent = $total > 0 ? (int) min(100, round($done / $total * 100)) : 0;
            $label = $isRestore ? '源码恢复' : '源码备份';

            $events[] = [
                'type'     => 'progress',
                'key'      => $isRestore ? 'restore_code' : 'backup_code',
                'label'    => $label,
                'percent'  => $percent,
                'text'     => $label . ' ' . $percent . '%',
                'progress' => $percent,
                'persist'  => false
            ];
        }

        // 数据库备份 / 恢复的分段进度：渲染为进度条
        $percent    = $state[ 'progress' ] ?? null;
        $isRestore  = (string) ( $state[ 'mode' ] ?? BackupRecordsService::MODE_BACKUP ) === BackupRecordsService::MODE_RESTORE;
        $key        = $isRestore ? 'restore_sql' : 'backup_sql';
        $label      = $isRestore ? '数据库恢复' : '数据库备份';
        $sqlSteps   = [ BackupRecordsService::STEP_BACKUP_SQL, BackupRecordsService::STEP_RESTORE_SQL ];
        // 数据库阶段完成后的下一步（步骤会立即流转，进度事件需在此补发一次 100%）
        $sqlDoneStep = $isRestore ? BackupRecordsService::STEP_RESTORE_DATA : BackupRecordsService::STEP_BACKUP_COMPLETE;

        // 已落盘的数据库进度百分比（跨 run 记忆，用于里程碑判重与收尾去重）
        $lastKey     = $this->emittedKey . '_sql_percent_' . $key;
        $lastPercent = (int) Cache::get($lastKey, -10);

        if ($percent !== null && in_array($step, $sqlSteps, true)) {
            $percent = (int) $percent;

            // 每跨过 10% 落一次 events.jsonl（而非只在整 10% 上落盘），
            // 避免进度跳跃（如 0 → 37 → 100）时回放丢掉中间进度
            $isMilestone = ( $percent - $lastPercent >= 10 ) || ( $percent >= 100 && $lastPercent < 100 );
            if ($isMilestone) {
                Cache::set($lastKey, $percent, 86400);
                $lastPercent = $percent;
            }

            $events[] = [
                'type'     => 'progress',
                'key'      => $key,
                'label'    => $label,
                'percent'  => $percent,
                'text'     => $label . ' ' . $percent . '%',
                'progress' => $percent,
                'persist'  => $isMilestone
            ];
        }

        // 收尾：数据库阶段一步做完后步骤已流转，此处补发 100%，否则进度条停在最后一个中间值
        if ($percent !== null && (int) $percent >= 100 && $lastPercent < 100
            && ( $step === $sqlDoneStep || $step === BackupRecordsService::STEP_END || !empty($state[ 'done' ]) )) {
            Cache::set($lastKey, 100, 86400);
            $events[] = [
                'type'     => 'progress',
                'key'      => $key,
                'label'    => $label,
                'percent'  => 100,
                'text'     => $label . ' 100%',
                'progress' => 100,
                'persist'  => true
            ];
        }

        return $events;
    }

    /**
     * 当前阶段描述
     * @param array $state
     * @param bool  $finished 是否已结束
     * @return string
     */
    protected function currentStage(array $state, bool $finished = false): string
    {
        $step = (string) ( $state[ 'step' ] ?? '' );
        $isRestore = ( $state[ 'mode' ] ?? '' ) === BackupRecordsService::MODE_RESTORE;

        if ($finished) return $isRestore ? '恢复完成' : '备份完成';

        $map = [
            BackupRecordsService::STEP_BACKUP_CODE      => '源码备份中',
            BackupRecordsService::STEP_BACKUP_SQL       => '数据库备份中',
            BackupRecordsService::STEP_BACKUP_COMPLETE  => '备份收尾中',
            BackupRecordsService::STEP_RESTORE_CODE     => '源码恢复中',
            BackupRecordsService::STEP_RESTORE_SQL      => '数据库恢复中',
            BackupRecordsService::STEP_RESTORE_DATA     => '数据恢复中',
            BackupRecordsService::STEP_RESTORE_COMPLETE => '恢复收尾中',
        ];

        return $map[ $step ] ?? ( $isRestore ? '恢复中' : '备份中' );
    }

    /**
     * 进度估算（0-100）
     * @param array $state
     * @return int
     */
    protected function estimateProgress(array $state): int
    {
        $step      = (string) ( $state[ 'step' ] ?? '' );
        $percent   = (int) ( $state[ 'progress' ] ?? 0 );
        $isRestore = ( $state[ 'mode' ] ?? '' ) === BackupRecordsService::MODE_RESTORE;

        if ($isRestore) {
            $map = [
                BackupRecordsService::STEP_BACKUP_CODE      => 10,
                BackupRecordsService::STEP_RESTORE_CODE     => 50,
                BackupRecordsService::STEP_RESTORE_DATA     => 95,
                BackupRecordsService::STEP_RESTORE_COMPLETE => 100,
            ];
            // 恢复前自动备份源码：0~10
            if ($step === BackupRecordsService::STEP_BACKUP_CODE) {
                $cp = $this->codePercent($state, 'backup');
                return (int) floor($cp * 0.10);
            }
            // 源码恢复：10~45
            if ($step === BackupRecordsService::STEP_RESTORE_CODE) {
                $cp = $this->codePercent($state, 'restore');
                return 10 + (int) floor($cp * 0.35);
            }
            // 数据库备份 10~45，数据库恢复 45~90
            if ($step === BackupRecordsService::STEP_BACKUP_SQL) return 10 + (int) floor($percent * 0.35);
            if ($step === BackupRecordsService::STEP_RESTORE_SQL) return 45 + (int) floor($percent * 0.45);
            return $map[ $step ] ?? 0;
        }

        $map = [
            BackupRecordsService::STEP_BACKUP_CODE     => 30,
            BackupRecordsService::STEP_BACKUP_COMPLETE => 100,
        ];
        // 源码备份：10~30
        if ($step === BackupRecordsService::STEP_BACKUP_CODE) {
            $cp = $this->codePercent($state, 'backup');
            return 10 + (int) floor($cp * 0.20);
        }
        // 数据库备份 30~95
        if ($step === BackupRecordsService::STEP_BACKUP_SQL) return 30 + (int) floor($percent * 0.65);
        return $map[ $step ] ?? 0;
    }

    /**
     * 计算源码备份 / 恢复的文件复制进度（0-100）
     */
    protected function codePercent(array $state, string $kind): int
    {
        $total = (int) ( $state[ $kind === 'restore' ? 'restore_total' : 'code_total' ] ?? 0 );
        $done  = (int) ( $state[ $kind === 'restore' ? 'restore_done' : 'code_done' ] ?? 0 );
        return $total > 0 ? (int) min(100, round($done / $total * 100)) : 0;
    }
}

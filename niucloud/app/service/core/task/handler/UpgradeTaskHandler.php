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

use app\dict\addon\AddonDict;
use app\dict\sys\TaskDict;
use app\service\admin\upgrade\BackupRecordsService;
use app\service\admin\upgrade\UpgradeService;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTracker;
use core\task\TaskStepTrait;
use think\facade\Cache;

/**
 * 系统升级任务处理器（适配器）
 * 仅做统一任务模型与 UpgradeService 之间的入参/出参适配，业务流程不改写。
 */
class UpgradeTaskHandler implements TaskHandlerInterface
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
     * 回滚相关步骤（处于这些步骤 => rolling_back）
     */
    private const ROLLBACK_STEPS = [ 'restoreCode', 'restoreSql' ];

    /**
     * 本次升级的步骤定义（创建阶段按「是否需要备份」确定）
     * @var array
     */
    protected array $upgradeSteps = [];

    public function getType(): string
    {
        return TaskDict::TYPE_UPGRADE;
    }

    /**
     * 升级主流程步骤定义（权重合计 100）
     * @param bool $needBackup 是否需要备份（关闭时移除备份源码 / 备份数据库两步）
     * @return array
     */
    public static function upgradeStepDefinitions(bool $needBackup = true): array
    {
        $definitions = [
            [ 'key' => 'requestUpgrade', 'name' => '请求升级', 'desc' => '向云端请求升级信息', 'weight' => 10, 'seq' => 1 ],
            [ 'key' => 'downloadFile', 'name' => '下载升级包', 'desc' => '分片下载升级文件', 'weight' => 20, 'seq' => 2 ],
            [ 'key' => 'backupCode', 'name' => '备份源码', 'desc' => '升级前备份源码', 'weight' => 10, 'seq' => 3, 'need_backup' => 1 ],
            [ 'key' => 'backupSql', 'name' => '备份数据库', 'desc' => '升级前备份数据库', 'weight' => 10, 'seq' => 4, 'need_backup' => 1 ],
            [ 'key' => 'coverCode', 'name' => '合并更新文件', 'desc' => '覆盖合并升级文件', 'weight' => 20, 'seq' => 5 ],
            [ 'key' => 'handleUniapp', 'name' => '处理 uni-app', 'desc' => '同步 uni-app 端代码', 'weight' => 5, 'seq' => 6 ],
            [ 'key' => 'installDepend', 'name' => '合并依赖', 'desc' => '合并 composer 依赖', 'weight' => 5, 'seq' => 7 ],
            [ 'key' => 'refreshMenu', 'name' => '刷新菜单', 'desc' => '刷新系统菜单', 'weight' => 5, 'seq' => 8 ],
            [ 'key' => 'installSchedule', 'name' => '安装计划任务', 'desc' => '安装 / 更新计划任务', 'weight' => 5, 'seq' => 9 ],
            [ 'key' => 'upgradeComplete', 'name' => '升级完成', 'desc' => '升级收尾', 'weight' => 10, 'seq' => 10 ],
        ];

        if (!$needBackup) {
            $definitions = array_values(array_filter($definitions, fn($item) => empty($item[ 'need_backup' ])));
        }

        return $definitions;
    }

    /**
     * 回滚步骤定义（失败后由业务动态追加，不参与主流程权重）
     * @return array
     */
    public static function rollbackStepDefinitions(): array
    {
        return [
            [ 'key' => 'restoreCode', 'name' => '恢复源码备份', 'desc' => '回滚：恢复升级前源码备份', 'weight' => 0, 'seq' => 21 ],
            [ 'key' => 'restoreSql', 'name' => '恢复数据库备份', 'desc' => '回滚：恢复升级前数据库备份', 'weight' => 0, 'seq' => 22 ],
            [ 'key' => 'restoreComplete', 'name' => '回滚完成', 'desc' => '回滚收尾', 'weight' => 0, 'seq' => 23 ],
        ];
    }

    public function getStepDefinitions(): array
    {
        return $this->upgradeSteps;
    }

    /**
     * 运行时步骤上报：以升级任务的实际步骤顺序为准（失败后会替换为回滚步骤）
     * @return array
     */
    public function reportSteps(): array
    {
        $task = ( new UpgradeService() )->getUpgradeTask();
        if (empty($task) || !is_array($task)) return [];

        $stepKeys = array_keys($task[ 'steps' ] ?? []);
        if (empty($stepKeys)) $stepKeys = array_column($this->upgradeSteps, 'key');
        if (empty($stepKeys)) return [];

        // 步骤定义：主流程 / 回滚步骤，均未命中时按步骤标识兜底
        $definitions = [];
        foreach ($stepKeys as $index => $stepKey) {
            $definitions[] = $this->resolveStepDefinition((string) $stepKey, $index + 1);
        }

        $executed = array_values((array) ( $task[ 'executed' ] ?? [] ));
        $lastDone = (string) ( $task[ 'step' ] ?? '' );
        $failed   = !empty($task[ 'error' ]);
        $error    = $failed ? (string) ( is_array($task[ 'error' ]) ? ( $task[ 'error' ][ 0 ] ?? '' ) : $task[ 'error' ] ) : '';

        // 正在执行的步骤：task.step 记录的是「最后一个已完成步骤」，分片步骤（downloadFile）
        // 在完成前不会推进它，直接当当前步骤会让 UI 一直高亮上一步、步骤内进度也无从体现
        $current = $this->resolveCurrentStep($stepKeys, $lastDone);

        $steps = $this->buildStepsFromDefinitions($definitions, $executed, $current, $this->stepPercent($current, $task), $failed, $error);

        // 展开子步骤：下载按应用、源码备份按根目录（子步骤权重为 0，不参与任务总进度）
        foreach ($steps as &$item) {
            if ($item[ 'step_key' ] === 'downloadFile') {
                $item[ 'sub' ] = $this->buildDownloadSubSteps($task, $item);
            } elseif ($item[ 'step_key' ] === 'backupCode') {
                $item[ 'sub' ] = $this->buildBackupCodeSubSteps($task, $item);
            }
        }
        unset($item);

        return $steps;
    }

    /**
     * 取正在执行的步骤标识（task.step 的下一步）
     * @param array $stepKeys
     * @param string $lastDone 最后一个已完成的步骤
     * @return string
     */
    protected function resolveCurrentStep(array $stepKeys, string $lastDone): string
    {
        $index = array_search($lastDone, $stepKeys, true);
        if ($index === false) return $lastDone;

        return (string) ( $stepKeys[ $index + 1 ] ?? $lastDone );
    }

    /**
     * 步骤内进度（0-100）
     * @param string $stepKey
     * @param array $task
     * @return int
     */
    protected function stepPercent(string $stepKey, array $task): int
    {
        if ($stepKey === 'downloadFile') return $this->downloadPercent($task);
        if ($stepKey === 'backupCode') return $this->backupCodePercent($task);
        if ($stepKey === 'backupSql') return $this->backupSqlPercent($task);

        return 0;
    }

    /**
     * 源码备份进度：已复制文件数 / 预扫描文件总数
     * @param array $task
     * @return int
     */
    protected function backupCodePercent(array $task): int
    {
        $state = is_array($task[ 'backup_code' ] ?? null) ? $task[ 'backup_code' ] : [];
        $total = (int) ( $state[ 'code_total' ] ?? 0 );
        if ($total <= 0) return 0;

        $done = max(0, (int) ( $state[ 'code_done' ] ?? 0 ));

        return (int) floor(min(100, $done / $total * 100));
    }

    /**
     * 数据库备份进度：取 DbBackup 的分段进度
     * @param array $task
     * @return int
     */
    protected function backupSqlPercent(array $task): int
    {
        $state = is_array($task[ 'backup_sql' ] ?? null) ? $task[ 'backup_sql' ] : [];

        return (int) floor(min(100, max(0, (int) ( $state[ 'percent' ] ?? 0 ))));
    }

    /**
     * 「下载升级包」的子步骤：每个应用一个
     *
     * 已下载完成的应用标记成功、正在下载的应用按分片进度展示、未开始的保持待执行。
     *
     * @param array $task
     * @param array $parent 父步骤（用于判断整体是否已完成）
     * @return array
     */
    protected function buildDownloadSubSteps(array $task, array $parent): array
    {
        $apps = array_values((array) ( $task[ 'upgrade_apps' ] ?? [] ));
        if (empty($apps)) return [];

        $download = is_array($task[ 'download' ] ?? null) ? $task[ 'download' ] : [];
        $params   = is_array($task[ 'params' ] ?? null) ? $task[ 'params' ] : [];
        $current  = (string) ( $download[ 'app_key' ] ?? ( $params[ 'app_key' ] ?? '' ) );

        // 步骤尚未开始 => 子步骤一律待执行；已完成 => 全部完成；当前应用未命中时按「全部完成」处理
        $index = array_search($current, $apps, true);
        if (( $parent[ 'status' ] ?? '' ) === 'pending') {
            $index = -1;
        } elseif ($parent[ 'status' ] === 'success' || $index === false) {
            $index = count($apps);
        }

        $percent = $this->downloadPercent($task);

        $steps = [];
        foreach ($apps as $i => $appKey) {
            $appKey = (string) $appKey;

            if ($i < $index) {
                $status   = 'success';
                $progress = 100;
            } elseif ($i === $index) {
                $status   = 'running';
                $progress = $percent;
            } else {
                $status   = 'pending';
                $progress = 0;
            }

            $steps[] = [
                'step_key' => 'downloadFile:' . $appKey,
                'parent'   => 'downloadFile',
                'name'     => $this->appName($task, $appKey),
                'desc'     => '',
                'seq'      => $i + 1,
                'weight'   => 0, // 子步骤不参与任务总进度
                'status'   => $status,
                'progress' => $progress
            ];
        }

        return $steps;
    }

    /**
     * 「备份源码」的子步骤：每个根目录一个（与备份任务同构）
     *
     * 已复制文件数是跨目录累加值，按各目录文件数换算当前目录的进度。
     *
     * @param array $task
     * @param array $parent 父步骤（用于判断整体是否已完成）
     * @return array
     */
    protected function buildBackupCodeSubSteps(array $task, array $parent): array
    {
        $roots = BackupRecordsService::getBackupCodeRoots();
        if (empty($roots)) return [];

        $state     = is_array($task[ 'backup_code' ] ?? null) ? $task[ 'backup_code' ] : [];
        $totals    = (array) ( $state[ 'code_root_totals' ] ?? [] );
        $doneCount = (int) ( $state[ 'code_done' ] ?? 0 );
        $rootIndex = (int) ( $state[ 'code_root_index' ] ?? 0 );

        // 步骤尚未开始 => 子步骤一律待执行；已完成 => 全部目录视为已完成
        if (( $parent[ 'status' ] ?? '' ) === 'pending') {
            $rootIndex = -1;
        } elseif ($parent[ 'status' ] === 'success') {
            $rootIndex = count($roots);
            $doneCount = (int) ( $state[ 'code_total' ] ?? 0 );
        }

        $steps    = [];
        $consumed = 0; // 已完成目录累计的文件数

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
                'step_key' => 'backupCode:' . $key,
                'parent'   => 'backupCode',
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

    /**
     * 应用展示名：框架固定为「系统框架」，其余取升级内容中的应用名
     * @param array $task
     * @param string $appKey
     * @return string
     */
    protected function appName(array $task, string $appKey): string
    {
        if ($appKey === AddonDict::FRAMEWORK_KEY) return '系统框架';

        $content = (array) ( $task[ 'upgrade_content' ][ 'content' ] ?? [] );
        foreach ($content as $item) {
            if ((string) ( $item[ 'app' ][ 'app_key' ] ?? '' ) === $appKey) {
                return (string) ( $item[ 'app' ][ 'app_name' ] ?? $appKey );
            }
        }

        return $appKey;
    }

    /**
     * 下载升级包的进度：按已下载分片 / 总分片计算，无分片信息时退回字节数
     * @param array $task
     * @return int
     */
    protected function downloadPercent(array $task): int
    {
        $download = $task[ 'download' ] ?? [];
        if (!is_array($download)) $download = [];

        $total = (int) ( $download[ 'step' ] ?? 0 );
        if ($total > 0) {
            $done = max(0, (int) ( $download[ 'index' ] ?? 0 ));
            return (int) floor(min(100, $done / $total * 100));
        }

        $length = (int) ( $download[ 'length' ] ?? 0 );
        if ($length > 0) {
            $done = max(0, (int) ( $download[ 'current' ] ?? 0 ));
            return (int) floor(min(100, $done / $length * 100));
        }

        return 0;
    }

    /**
     * 阶段描述：下载 / 备份阶段带上百分比，其余沿用原文案
     *
     * 下载进度在下载结束后会清理，而备份进度会一直留在任务状态里，
     * 因此这里按「当前步骤」判定，避免后续步骤仍显示上一个阶段的文案。
     *
     * @param array $task
     * @param string $stage 默认文案
     * @param string $currentKey 当前步骤标识
     * @return string
     */
    protected function buildStage(array $task, string $stage, string $currentKey = ''): string
    {
        if ($currentKey === 'backupCode' && !empty($task[ 'backup_code' ])) {
            return sprintf('正在备份源码 %d%%', $this->backupCodePercent($task));
        }

        if ($currentKey === 'backupSql' && !empty($task[ 'backup_sql' ])) {
            return sprintf('正在备份数据库 %d%%', $this->backupSqlPercent($task));
        }

        if ($currentKey === 'downloadFile') {
            $download = $task[ 'download' ] ?? [];
            if (!is_array($download)) return $stage;

            $total  = (int) ( $download[ 'step' ] ?? 0 );
            $length = (int) ( $download[ 'length' ] ?? 0 );
            if ($total <= 0 || $length <= 0) return $stage;

            return sprintf(
                '正在下载升级包 %d%%（%s / %s）',
                $this->downloadPercent($task),
                UpgradeService::formatBytes((int) ( $download[ 'current' ] ?? 0 )),
                UpgradeService::formatBytes($length)
            );
        }

        return $stage;
    }

    /**
     * 按步骤标识取步骤定义（主流程 -> 回滚 -> 兜底）
     * @param string $stepKey
     * @param int $seq
     * @return array
     */
    protected function resolveStepDefinition(string $stepKey, int $seq): array
    {
        foreach (array_merge(self::upgradeStepDefinitions(true), self::rollbackStepDefinitions()) as $definition) {
            if ($definition[ 'key' ] === $stepKey) {
                $definition[ 'seq' ] = $seq;
                return $definition;
            }
        }

        return [ 'key' => $stepKey, 'name' => $stepKey, 'desc' => '', 'weight' => 0, 'seq' => $seq ];
    }

    public function create(array $params): array
    {
        $addon = (string) ( $params[ 'addon' ] ?? '' );
        $data  = $params[ 'data' ] ?? [];

        // 步骤在创建阶段即确定：不需要备份时不含备份源码 / 备份数据库两步
        $needBackup = (bool) ( is_array($data) ? ( $data[ 'is_need_backup' ] ?? true ) : true );
        $this->upgradeSteps = self::upgradeStepDefinitions($needBackup);

        $task = ( new UpgradeService() )->upgrade($addon, $data);
        $key  = (string) ( $task[ 'key' ] ?? '' );
        $this->emittedKey = self::cacheKey($key);
        Cache::delete($this->emittedKey);

        return [
            'task_key' => $key,
            'title'    => $this->buildTitle($addon),
            'desc'     => $this->buildDesc($task),
            'params'   => $params
        ];
    }

    /**
     * 出错暂停时可用的操作
     *
     * 「跳过」仅在出错步骤声明了 can_skip 时才下发 —— 正常待执行 / 进行中的步骤
     * 不允许跳过，避免把必要的步骤（如备份、合并代码）静默略过。
     *
     * @param string $stepKey 当前出错的步骤标识
     * @return array
     */
    protected function buildWaitingActions(string $stepKey): array
    {
        $actions = [];

        if (( new TaskStepTracker($this->taskKey) )->canSkip($stepKey)) {
            $actions[] = [ 'code' => 'skip', 'label' => '跳过该步骤', 'style' => 'primary' ];
        }

        $actions[] = [ 'code' => 'rollback', 'label' => '回滚到升级前', 'style' => 'danger' ];
        $actions[] = [ 'code' => 'cancel', 'label' => '结束任务', 'style' => 'default' ];

        return $actions;
    }

    /**
     * 任务描述：逐条列出本次升级的应用与版本区间
     *
     * 例：系统框架 1.2.0 → 1.3.0；tourism 1.0.1 → 1.1.0
     * 取创建升级时云端返回的升级内容（UpgradeService 已按可升级过滤）。
     *
     * @param array $task UpgradeService::upgrade() 返回的任务数组
     * @return string
     */
    protected function buildDesc(array $task): string
    {
        $rows = [];

        foreach ((array) ( $task[ 'upgrade_content' ][ 'content' ] ?? [] ) as $item) {
            $name = (string) ( $item[ 'app' ][ 'app_name' ] ?? '' );
            if ($name === '') continue;

            $from = (string) ( $item[ 'version' ] ?? '' );
            $to   = (string) ( $item[ 'upgrade_version' ] ?? '' );

            $rows[] = $to !== '' ? "{$name} {$from} → {$to}" : "{$name} {$from}";
        }

        return implode('；', $rows);
    }

    public function run(string $cursor): array
    {
        $service = new UpgradeService();

        // 任务缓存不存在 => 已结束（完成/回滚完成/被清除）
        if (!is_array($service->getUpgradeTask()) || empty($service->getUpgradeTask())) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '升级完成',
                'cursor'     => '',
                'events'     => [ [ 'level' => 'success', 'text' => '升级完成' ] ]
            ];
        }

        try {
            $service->execute();
        } catch (\Throwable $e) {
            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'stage'       => '升级失败',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'error', 'text' => '升级失败：' . $e->getMessage() ] ],
                'fail_reason' => [
                    'Message' => '失败原因：' . $e->getMessage(),
                    'File'    => '文件：' . $e->getFile(),
                    'Line'    => '代码行号：' . $e->getLine()
                ]
            ];
        }

        // 执行后重新读取最新任务状态
        $task = ( new UpgradeService() )->getUpgradeTask();
        if (empty($task)) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '升级完成',
                'cursor'     => ''
            ];
        }

        $this->emittedKey = self::cacheKey((string) ( $task[ 'key' ] ?? '' ));
        $step   = (string) ( $task[ 'step' ] ?? '' );
        $errors = $task[ 'error' ] ?? [];

        $events = [];
        foreach (( $task[ 'log' ] ?? [] ) as $line) {
            $line = (string) $line;
            if ($line === '' || $this->isEmitted($line)) continue;
            $this->markEmitted($line);
            $events[] = [ 'level' => 'info', 'text' => $line, 'progress' => null ];
        }

        // 失败（进入回滚）
        if (!empty($errors)) {
            $events = array_merge($events, array_map(function ($err) {
                return [ 'level' => 'error', 'text' => (string) $err ];
            }, $errors));

            // 回滚进行中 / 回滚已完成
            if ($step === 'restoreComplete') {
                return [
                    'status'      => TaskDict::STATUS_ROLLED_BACK,
                    'end_reason'  => TaskDict::END_REASON_ROLLED_BACK,
                    'stage'       => '已回滚',
                    'cursor'      => '',
                    'events'      => $events,
                    'fail_reason' => [ 'Message' => '升级失败并已回滚' ]
                ];
            }

            if (in_array($step, self::ROLLBACK_STEPS, true)) {
                return [
                    'status'   => TaskDict::STATUS_ROLLING_BACK,
                    'stage'    => '回滚中',
                    'cursor'   => $step,
                    'events'   => $events,
                    'progress' => $this->estimateProgress($task)
                ];
            }

            // 升级失败但尚未回滚：暂停等用户决策。
            // 此前直接置为 failed（终态）会导致回滚步骤永远无法被驱动，只能等用户手动恢复
            return [
                'status'      => TaskDict::STATUS_WAITING_INPUT,
                'stage'       => '升级失败，等待决策',
                'cursor'      => $step,
                'events'      => $events,
                'progress'    => $this->estimateProgress($task),
                'actions'     => $this->buildWaitingActions($step),
                'fail_reason' => [ 'Message' => '升级失败：' . implode('；', array_map('strval', (array) $errors)) ]
            ];
        }

        if ($step === 'upgradeComplete') {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '升级完成',
                'cursor'     => '',
                'events'     => $events
            ];
        }

        $stepKeys   = array_keys($task[ 'steps' ] ?? []);
        $currentKey = $this->resolveCurrentStep($stepKeys, $step);

        // 下载升级包：以结构化 progress 事件下发。前端遇到 type=progress 会直接渲染进度条，
        // 不再走「含『下载 + N%』的文本即视为编译产物下载」的启发式，避免标签被误标
        if ($currentKey === 'downloadFile' && !empty($task[ 'download' ])) {
            $percent  = $this->downloadPercent($task);
            $events[] = [
                'type'     => 'progress',
                'key'      => 'upgrade_download',
                'label'    => '升级包下载',
                'percent'  => $percent,
                'text'     => '升级包下载 ' . $percent . '%',
                'progress' => $percent,
                'persist'  => false
            ];
        }

        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => $this->estimateProgress($task),
            'stage'    => $this->buildStage($task, '升级进行中', $currentKey),
            'cursor'   => $step,
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
                'events'     => [ [ 'level' => 'warning', 'text' => '升级任务已被取消' ] ]
            ];
        }

        // rollback：触发回滚，随后由前端继续驱动执行回滚步骤
        if ($code === 'rollback') {
            ( new UpgradeService() )->operate('rollback');
            return [
                'status'   => TaskDict::STATUS_ROLLING_BACK,
                'stage'    => '回滚中',
                'cursor'   => 'rollback',
                'events'   => [ [ 'level' => 'warning', 'text' => '已触发回滚' ] ]
            ];
        }

        // skip：跳过当前出错的步骤，清理错误并推进到下一步
        if ($code === 'skip') {
            ( new UpgradeService() )->operate('skip');
            return [
                'status'   => TaskDict::STATUS_RUNNING,
                'stage'    => '已跳过，继续执行',
                'cursor'   => '',
                'progress' => null,
                'events'   => [ [ 'level' => 'warning', 'text' => '已跳过出错步骤，继续执行' ] ]
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
        ( new UpgradeService() )->cancelUpgrade(0, 1);
    }

    public function snapshotState(): array
    {
        return ( new UpgradeService() )->getUpgradeTask() ?: [];
    }

    public function restoreState(array $state): void
    {
        ( new UpgradeService() )->restoreTask($state);
    }

    // ==================== 内部方法 ====================

    protected static function cacheKey(string $key): string
    {
        return 'task_upgrade_emitted_' . $key;
    }

    protected function isEmitted(string $text): bool
    {
        $emitted = Cache::get($this->emittedKey) ?: [];
        return is_array($emitted) && in_array($text, $emitted, true);
    }

    protected function markEmitted(string $text): void
    {
        $emitted = Cache::get($this->emittedKey) ?: [];
        if (!is_array($emitted)) $emitted = [];
        $emitted[] = $text;
        Cache::set($this->emittedKey, $emitted, 86400);
    }

    protected function buildTitle(string $addon): string
    {
        if ($addon === '' || $addon === AddonDict::FRAMEWORK_KEY) return '系统升级-框架';
        return '系统升级-' . $addon;
    }

    /**
     * 按已完成步骤数估算进度
     * @param array $task
     * @return int
     */
    protected function estimateProgress(array $task): int
    {
        $steps   = array_keys($task[ 'steps' ] ?? []);
        $total   = count($steps);
        if ($total === 0) return 0;

        $step     = (string) ( $task[ 'step' ] ?? '' );
        $index    = array_search($step, $steps, true);
        $executed = count($task[ 'executed' ] ?? []);

        $current = $index === false ? $executed : max($executed, $index + 1);
        return (int) floor(min(1, $current / $total) * 100);
    }
}

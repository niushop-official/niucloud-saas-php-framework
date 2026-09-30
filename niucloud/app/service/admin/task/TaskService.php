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

namespace app\service\admin\task;

use app\dict\sys\TaskDict;
use app\model\sys\SysTask;
use app\service\core\niucloud\CoreCloudBuildService;
use app\service\core\task\handler\AddonBuildTaskHandler;
use core\base\BaseAdminService;
use core\exception\CommonException;
use core\task\TaskExecutor;
use core\task\TaskHandlerInterface;
use core\task\TaskScheduler;
use core\task\TaskStepTracker;
use core\util\ArtifactScanner;
use core\util\TaskLogger;
use think\facade\Db;

/**
 * 统一任务服务层
 * 对外提供：创建 / 驱动 / 用户操作 / 取消 / 事件回放 / 记录分页与清理
 */
class TaskService extends BaseAdminService
{
    /**
     * 历史任务（steps.jsonl 审计记录）步骤名映射
     *
     * 审计记录的 name 取自接口名（轮询统一为「获取编译日志」），直接展示会出现重复步骤，
     * 这里按步骤标识映射回业务步骤名，保证历史任务与接入步骤模型后的展示一致。
     */
    protected static array $legacy_step_name = [
        'prepare_package' => [ 'name' => '发起云编译', 'desc' => '打包源码并生成编译压缩包' ],
        'upload_package' => [ 'name' => '提交云编译任务', 'desc' => '分片上传源码压缩包' ],
        'upload_complete' => [ 'name' => '提交云编译任务', 'desc' => '源码上传完成并已提交编译任务' ],
        'build_compile' => [ 'name' => '获取编译日志', 'desc' => '编译任务进行中' ],
        'download_start' => [ 'name' => '编译任务完成', 'desc' => '开始下载编译产物' ],
        'download_package' => [ 'name' => '编译任务完成', 'desc' => '分片下载编译产物' ],
        'download_complete' => [ 'name' => '编译任务完成', 'desc' => '编译任务完成下载编译产物' ],
        'download_fail' => [ 'name' => '编译任务完成', 'desc' => '编译产物下载失败' ],
        'unzip_fail' => [ 'name' => '编译任务完成', 'desc' => '编译产物解压失败' ],
        'deploy_files' => [ 'name' => '编译任务完成', 'desc' => '编译产物部署' ],
        'deploy_complete' => [ 'name' => '编译任务完成', 'desc' => '编译产物部署完成' ],
        'deploy_fail' => [ 'name' => '编译任务完成', 'desc' => '编译产物部署失败' ],
    ];

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysTask();
    }

    // ==================== Handler ====================

    /**
     * 当前端：平台端 admin（site_id = 0）/ 站点端 site（site_id > 0）
     *
     * 任务按端划分：内置任务（升级 / 备份 / 云编译…）仅平台端可用，
     * 站点端任务由插件通过 TaskDict::EVENT_TASK_TYPE 扩展注册。
     * 非 HTTP 上下文（队列 / 命令行）按任务自身所属站点判定，此处降级为平台端。
     *
     * @param int $siteId 指定站点时按该站点判定（队列等无请求上下文场景）
     * @return string TaskDict::APP_TYPE_*
     */
    public static function appType(int $siteId = 0): string
    {
        if ($siteId <= 0) $siteId = self::currentSiteId();

        return $siteId > 0 ? TaskDict::APP_TYPE_SITE : TaskDict::APP_TYPE_ADMIN;
    }

    /**
     * 按任务类型获取处理器（类型与处理器均由 TaskDict 注册表提供，支持事件扩展）
     * @param string $taskType
     * @return TaskHandlerInterface
     * @throws CommonException
     */
    public static function getHandler(string $taskType): TaskHandlerInterface
    {
        $class = TaskDict::handlerClass($taskType);
        if ($class === '') throw new CommonException('TASK_TYPE_NOT_EXIST');

        $handler = new $class();
        if (!$handler instanceof TaskHandlerInterface) throw new CommonException('TASK_TYPE_NOT_EXIST');

        return $handler;
    }

    /**
     * 校验任务类型是否允许在当前端创建
     * @param string $taskType
     * @param string $appType TaskDict::APP_TYPE_*
     * @return void
     * @throws CommonException
     */
    public static function assertAppType(string $taskType, string $appType = ''): void
    {
        $appType = $appType !== '' ? $appType : self::appType();
        if (!TaskDict::allowAppType($taskType, $appType)) {
            throw new CommonException('TASK_TYPE_NOT_ALLOW');
        }
    }

    /**
     * 按 task_key 装载任务并构造执行器
     * 若 Cache 中任务状态已丢失但任务仍非终态，则尝试从 task.json 快照恢复（保证续跑）
     * @param string $taskKey
     * @return TaskExecutor
     * @throws CommonException
     */
    public static function getExecutor(string $taskKey): TaskExecutor
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) throw new CommonException('TASK_NOT_EXIST');

        self::assertTaskSite($task);

        $handler  = self::getHandler((string) $task[ 'task_type' ]);
        $executor = new TaskExecutor($handler);
        $executor->load($taskKey);

        // Cache 失效但任务未结束 -> 用快照恢复内部状态
        if (!TaskDict::isTerminal((string) $task[ 'status' ])) {
            try {
                $state = $handler->snapshotState();
                if (empty($state)) $executor->restoreState();
            } catch (\Throwable $e) {
                // 恢复失败不影响主流程
            }
        }
        return $executor;
    }

    // ==================== 查询 ====================

    /**
     * 当前进行中的任务（按站点隔离）
     *
     * 返回结构：
     * - list        当前站点所有非终态任务（含排队中 created）
     * - queue_alive 队列是否可用（true 时任务由队列推进，前端无需驱动）
     * - 兼容字段（task_key / status / task_type / params …）：取优先展示的那条任务
     *   （互斥任务优先，其次最早创建的），供只关心单个任务的页面直接使用
     *
     * @return array
     */
    public function getActive(): array
    {
        $siteId = self::currentSiteId();

        try {
            $list = Db::name('sys_task')
                ->where([
                    [ 'site_id', '=', $siteId ],
                    [ 'status', 'in', TaskDict::getNonTerminalStatus() ]
                ])
                ->order('id asc')
                ->select()->toArray();
        } catch (\Throwable $e) {
            $list = [];
        }

        foreach ($list as &$task) {
            $params = json_decode((string) ( $task[ 'params' ] ?? '' ), true);
            $task[ 'params' ]      = is_array($params) ? $params : [];
            $task[ 'status_name' ] = TaskDict::getStatus((string) ( $task[ 'status' ] ?? '' ));
            $task[ 'is_terminal' ] = false;
        }

        // 优先展示：互斥任务 > 最早创建的任务
        $primary = [];
        foreach ($list as $task) {
            if (empty($primary) || (int) ( $task[ 'is_mutex' ] ?? 0 ) === 1) $primary = $task;
        }

        $result = $primary;
        $result[ 'list' ]         = $list;
        $result[ 'queue_alive' ]  = TaskScheduler::queueAlive();

        return $result;
    }

    /**
     * 任务详情
     * @param string $taskKey
     * @return array
     */
    public function detail(string $taskKey): array
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) return [];

        self::assertTaskSite($task);

        // 补齐展示字段
        $task[ 'task_type_name' ] = TaskDict::getType((string) ( $task[ 'task_type' ] ?? '' ));
        $task[ 'status_name' ]    = TaskDict::getStatus((string) ( $task[ 'status' ] ?? '' ));
        $task[ 'is_terminal' ]    = TaskDict::isTerminal((string) ( $task[ 'status' ] ?? '' ));
        $actions                  = json_decode((string) ( $task[ 'actions' ] ?? '' ), true);
        $task[ 'actions' ]        = is_array($actions) ? $actions : [];
        $params                   = json_decode((string) ( $task[ 'params' ] ?? '' ), true);
        $task[ 'params' ]         = is_array($params) ? $params : [];

        // 步骤概览与耗时，供详情页头部展示
        $step_stat                = $this->getStepStat($taskKey);
        $task[ 'steps_total' ]    = (int) ( $step_stat[ 'total' ] ?? 0 );
        $task[ 'steps_done' ]     = (int) ( $step_stat[ 'done' ] ?? 0 );
        $task[ 'current_step' ]   = (string) ( $step_stat[ 'current_step' ] ?? '' );
        $task[ 'duration' ]       = (int) ( ( (int) ( $task[ 'end_time' ] ?: time() ) ) - (int) ( $task[ 'start_time' ] ?: $task[ 'create_time' ] ) );

        // 云交互任务（云编译 / 云上传等）：从运行快照文件取云端 task_id（build_task.task_id 的快照），
        // 供详情页「任务信息」展示并追溯云端侧任务。快照缺失不影响主流程。
        try {
            $snapFile = TaskLogger::taskFile((string) ( $task[ 'task_type' ] ?? '' ), $taskKey);
            if ($snapFile !== '') {
                $snap        = TaskLogger::loadSnapshot($snapFile);
                $cloudTaskId = (string) (
                    $snap[ 'task' ][ 'snapshot_meta' ][ 'cloud_task_id' ]
                    ?? $snap[ 'snapshot_meta' ][ 'cloud_task_id' ]
                    ?? ''
                );
                if ($cloudTaskId !== '') $task[ 'cloud_task_id' ] = $cloudTaskId;
            }
        } catch (\Throwable $e) {
            // 忽略快照读取异常
        }

        return $task;
    }

    /**
     * 任务步骤树
     *
     * 优先返回 sys_task_step 的结构化步骤（含状态/耗时/进度/子步骤）；
     * 历史任务无步骤数据时，降级为 steps.jsonl 审计记录（只含时间/步骤名/结果，无状态）。
     *
     * @param string $taskKey
     * @return array
     */
    public function getSteps(string $taskKey): array
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) return [];

        self::assertTaskSite($task);

        $steps = ( new TaskStepTracker($taskKey) )->tree();
        if (!empty($steps)) {
            // 详情页只返回可展示的步骤；is_show=0 的步骤仍会执行，仅不展示
            return array_values(array_filter($steps, function ($step) {
                return (int) ( $step[ 'is_show' ] ?? 1 ) !== 0;
            }));
        }

        // 降级：历史任务的 JSONL 审计记录
        $file = TaskLogger::stepsFile((string) $task[ 'task_type' ], $taskKey);
        if (!is_file($file)) return [];

        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (empty($lines)) return [];

        $steps = [];
        foreach ($lines as $line) {
            $decoded = json_decode($line, true);
            if (!is_array($decoded)) continue;

            $stepKey = (string) ( $decoded[ 'step' ] ?? '' );
            if ($stepKey === '') continue;

            // 审计行按接口名命名（轮询统一为「获取编译日志」），这里映射回业务步骤名，避免出现重复步骤
            $meta = self::$legacy_step_name[ $stepKey ] ?? null;
            $seq  = (int) ( $decoded[ 'step_no' ] ?? 0 );

            // 同一 step 会在审计里出现多行（轮询 / 重试），按 step 去重，保留最后一次结果
            $steps[ $stepKey ] = [
                'step_key' => $stepKey,
                'parent_key' => '',
                'name' => $meta[ 'name' ] ?? (string) ( $decoded[ 'name' ] ?? $stepKey ),
                'desc' => $meta[ 'desc' ] ?? (string) ( $decoded[ 'desc' ] ?? '' ),
                'seq' => $seq,
                'weight' => 0,
                'status' => ( (string) ( $decoded[ 'status' ] ?? 'success' ) ) === 'fail' ? 'failed' : 'success',
                'progress' => 100,
                'start_at' => strtotime((string) ( $decoded[ 'time' ] ?? '' )) ?: 0,
                'end_at' => 0,
                'duration' => 0,
                'error' => '',
                'sub_steps' => [],
            ];
        }

        // 按审计顺序（step_no）重排
        uasort($steps, function ($a, $b) {
            return ( $a[ 'seq' ] ?? 0 ) <=> ( $b[ 'seq' ] ?? 0 );
        });
        return array_values($steps);
    }

    /**
     * 任务步骤概览（详情页头部用）
     * @param string $taskKey
     * @return array ['total'=>int,'done'=>int,'current_step'=>string]
     */
    public function getStepStat(string $taskKey): array
    {
        $tracker = new TaskStepTracker($taskKey);
        $visible = array_values(array_filter($tracker->tree(), function ($step) {
            return (int) ( $step[ 'is_show' ] ?? 1 ) !== 0;
        }));

        $done = 0;
        foreach ($visible as $step) {
            if (in_array((string) ( $step[ 'status' ] ?? '' ), [ 'success', 'skipped' ], true)) $done++;
        }

        return [
            'total' => count($visible),
            'done' => $done,
            'current_step' => $tracker->currentStepKey()
        ];
    }

    /**
     * 终端输出事件（增量 / 全量回放）
     * @param string $taskKey
     * @param int    $afterSeq
     * @param int    $limit
     * @return array
     */
    public function getEvents(string $taskKey, int $afterSeq = 0, int $limit = 0): array
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) return [];

        self::assertTaskSite($task);

        $file = TaskLogger::eventsFile((string) $task[ 'task_type' ], $taskKey);
        return TaskLogger::readEvents($file, $afterSeq, $limit);
    }

    /**
     * 当前站点id（多商户隔离，与 TaskExecutor::create 写入的 site_id 一致）
     * @return int
     */
    protected static function currentSiteId(): int
    {
        try {
            return (int) request()->siteId();
        } catch (\Throwable $e) {
            return 0;
        }
    }

    /**
     * 站点端隔离：站点后台只能访问本站点创建的任务
     *
     * 平台端（site_id = 0）可查看全部任务；站点端仅限 site_id 与当前站点一致的任务。
     * 任务标识是 uniqid，虽不易猜测，但接口安全不能依赖「猜不到」——
     * 站点端已开放任务详情 / 驱动 / 产物等接口，必须显式校验归属。
     *
     * @param array $task 任务行
     * @return void
     * @throws CommonException
     */
    protected static function assertTaskSite(array $task): void
    {
        $siteId = self::currentSiteId();
        if ($siteId <= 0) return; // 平台端：不过滤

        if ((int) ( $task[ 'site_id' ] ?? 0 ) !== $siteId) throw new CommonException('TASK_NOT_EXIST');
    }

    /**
     * 记录分页列表
     * @param array $where task_type / status / task_key / title / keyword（标题或任务标识，OR）
     * @return array
     */
    public function getRecords(array $where = []): array
    {
        $field = 'id, task_key, parent_key, task_type, title, desc, is_mutex, status, end_reason, progress, stage, params, fail_reason, log_size, start_time, end_time, create_time';
        $order = 'id desc';

        $search_model = $this->model
            ->withSearch([ 'task_type', 'status', 'task_key', 'title', 'keyword' ], $where)
            // 多商户隔离：只看当前站点的任务（与任务创建时写入的 site_id 对应）
            ->where('site_id', self::currentSiteId())
            ->field($field)
            ->order($order)
            ->append([ 'task_type_name', 'status_name', 'end_reason_name', 'is_terminal' ]);

        // 端隔离：只看当前端允许的任务类型（未显式指定类型时生效）
        if (empty($where[ 'task_type' ])) {
            $types = array_keys(TaskDict::getTaskType(self::appType()));
            if (!empty($types)) $search_model->whereIn('task_type', $types);
        }

        return $this->pageQuery($search_model);
    }

    /**
     * 删除任务记录（同步删除任务目录，决策：选择性清理）
     * @param array|string $ids
     * @return void
     */
    public function delRecords($ids): void
    {
        if (empty($ids)) return;
        if (!is_array($ids)) $ids = explode(',', (string) $ids);

        // 多商户隔离：只允许删除当前站点的任务记录
        $rows = $this->model->where([ [ 'id', 'in', $ids ], [ 'site_id', '=', self::currentSiteId() ] ])->select()->toArray();

        $this->model->where([ [ 'id', 'in', $ids ], [ 'site_id', '=', self::currentSiteId() ] ])->delete();

        // 同步清理任务目录（events/steps/snapshot/临时产物）
        foreach ($rows as $row) {
            // 不允许删除进行中的任务，避免误删后状态错乱
            if (!TaskDict::isTerminal((string) $row[ 'status' ])) continue;

            $dir = TaskLogger::taskDir((string) $row[ 'task_type' ], (string) $row[ 'task_key' ]);
            if ($dir !== '' && is_dir($dir)) {
                del_target_dir($dir, true);
            }
        }
    }

    // ==================== 任务产物 ====================

    /**
     * 各类型任务的产物位置
     *
     * 约定返回 [ dir, zip, zip_name ]：
     * - dir：产物目录（展示目录树）
     * - zip：产物压缩包（存在时提供整包下载），不存在则为空串
     * @param string $taskType
     * @param string $taskKey
     * @return array
     */
    protected static function artifactLocation(string $taskType, string $taskKey): array
    {
        switch ($taskType) {
            case TaskDict::TYPE_CLOUD_BUILD:
                // 云编译：download.zip + 解压后的 download 目录
                $dir = ( new CoreCloudBuildService() )->getTaskDir($taskKey);
                return [
                    'dir'      => $dir === '' ? '' : $dir . 'download',
                    'zip'      => $dir === '' ? '' : $dir . 'download.zip',
                    'zip_name' => 'cloud-build-' . $taskKey . '.zip'
                ];

            case TaskDict::TYPE_BACKUP:
                // 备份：归档目录 upgrade/{backup_key}/backup（源码 + 数据库）
                return [
                    'dir'      => project_path() . 'upgrade' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR . 'backup',
                    'zip'      => '',
                    'zip_name' => ''
                ];

            case TaskDict::TYPE_UPGRADE:
                // 升级：云端下载的升级包目录 download/{app_key}（升级包 + 解压后的更新文件）。
                // 备份归档（backup/）属于升级过程的中间产物，回滚由系统自动完成，不在此展示。
                return [
                    'dir'      => project_path() . 'upgrade' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR . 'download',
                    'zip'      => '',
                    'zip_name' => ''
                ];

            case TaskDict::TYPE_ADDON_BUILD:
                // 插件打包：每个插件产出一个 zip，统一收在 runtime/addon_build/{task_key} 下。
                // 仅单插件时提供整包下载，多插件在目录树里逐项下载。
                $dir  = AddonBuildTaskHandler::artifactDirOf($taskKey);
                $zips = ( $dir !== '' && is_dir($dir) ) ? (array) glob($dir . '*.zip') : [];
                $zip  = count($zips) === 1 ? (string) $zips[ 0 ] : '';

                return [
                    'dir'      => $dir,
                    'zip'      => $zip,
                    'zip_name' => $zip !== '' ? basename($zip) : ''
                ];

            default:
                return [ 'dir' => '', 'zip' => '', 'zip_name' => '' ];
        }
    }

    /**
     * 任务产物信息（目录树 + 压缩包）
     * @param string $taskKey
     * @param int $depth 目录展开层数
     * @return array [ 'exists', 'zip', 'total', 'tree' ]
     */
    public function getArtifacts(string $taskKey, int $depth = 2, string $taskType = ''): array
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) throw new CommonException('TASK_NOT_EXIST');

        self::assertTaskSite($task);

        // 同一 task_key 可能对应多条记录（升级任务与其产生的备份共用 key），
        // 仅凭 key 反查会命中先插入的那条，故产物口径允许调用方显式指定
        $type     = $taskType !== '' ? $taskType : (string) $task[ 'task_type' ];
        $location = self::artifactLocation($type, (string) $task[ 'task_key' ]);

        $zip = ( $location[ 'zip' ] !== '' && is_file($location[ 'zip' ]) )
            ? ArtifactScanner::fileInfo($location[ 'zip' ], $location[ 'zip_name' ])
            : null;

        $dir = $location[ 'dir' ];
        if ($dir === '' || !is_dir($dir)) {
            return [ 'exists' => $zip !== null, 'zip' => $zip, 'total' => ArtifactScanner::emptyStat(), 'tree' => [] ];
        }

        $node = ArtifactScanner::scan($dir, max(1, $depth));

        return [
            'exists' => true,
            'zip'    => $zip,
            'total'  => [
                'files'     => (int) $node[ 'files' ],
                'dirs'      => (int) $node[ 'dirs' ],
                'size'      => (int) $node[ 'size' ],
                'size_name' => ArtifactScanner::formatSize((int) $node[ 'size' ])
            ],
            'tree'   => ArtifactScanner::withPath($node[ 'children' ])
        ];
    }

    /**
     * 下载任务产物
     * @param string $taskKey
     * @param string $path 产物内相对路径；为空表示下载产物压缩包
     * @return \think\response\File
     * @throws CommonException
     */
    public function downloadArtifact(string $taskKey, string $path = '', string $taskType = '')
    {
        $task = TaskExecutor::getByKey($taskKey);
        if (empty($task)) throw new CommonException('TASK_NOT_EXIST');

        self::assertTaskSite($task);

        // 与 getArtifacts 同口径：产物类型可由调用方显式指定
        $type     = $taskType !== '' ? $taskType : (string) $task[ 'task_type' ];
        $location = self::artifactLocation($type, (string) $task[ 'task_key' ]);

        // 单文件下载
        if ($path !== '') {
            $dir = $location[ 'dir' ];
            if ($dir === '' || !is_dir($dir)) throw new CommonException('TASK_ARTIFACT_NOT_EXIST');

            $file = ArtifactScanner::resolve($dir, $path);
            if ($file === '' || !is_file($file)) throw new CommonException('TASK_ARTIFACT_NOT_EXIST');

            return download($file, basename($file));
        }

        // 整包下载
        $zip = $location[ 'zip' ];
        if ($zip === '' || !is_file($zip)) throw new CommonException('TASK_ARTIFACT_NOT_EXIST');

        return download($zip, $location[ 'zip_name' ] !== '' ? $location[ 'zip_name' ] : basename($zip));
    }

    // ==================== 执行 ====================

    /**
     * 创建任务（含全局单实例校验）
     * @param string $taskType
     * @param array  $params
     * @return array
     * @throws CommonException
     */
    public function create(string $taskType, array $params): array
    {
        // 端校验：平台端任务不能在站点端发起，反之亦然（站点端任务由插件扩展注册）
        self::assertAppType($taskType);

        $handler  = self::getHandler($taskType);
        $executor = new TaskExecutor($handler);
        return $executor->create($params);
    }

    /**
     * 驱动一片 / 一步
     *
     * 队列可用时任务由 TaskRunJob 自驱推进，这里只回显当前状态（前端请求不推进）；
     * 队列不可用时由本次请求推进（降级驱动）。
     * 前端判定「队列假死」（状态长时间无变化）时可传 force=true 强制接管驱动。
     *
     * @param string $taskKey
     * @param string $cursor
     * @param bool   $force  是否强制推进（忽略队列可用性）
     * @return array
     */
    public function run(string $taskKey, string $cursor = '', bool $force = false): array
    {
        $executor = self::getExecutor($taskKey);

        // 排队中：先尝试调度（占用同站点槽位）；槽位仍被占则继续排队，本次请求不推进
        if ((string) ( $executor->getTask()[ 'status' ] ?? '' ) === TaskDict::STATUS_CREATED) {
            TaskScheduler::dispatchSite((int) ( $executor->getTask()[ 'site_id' ] ?? 0 ));
            $executor = self::getExecutor($taskKey);

            if ((string) ( $executor->getTask()[ 'status' ] ?? '' ) === TaskDict::STATUS_CREATED) {
                $data                = $this->wrapResult($executor, $executor->current());
                $data[ 'driven_by' ] = 'queue';
                return $data;
            }
        }

        if (!$force && TaskScheduler::queueAlive()) {
            $data             = $this->wrapResult($executor, $executor->current());
            $data[ 'driven_by' ] = 'queue';
            return $data;
        }

        $data                = $this->wrapResult($executor, $executor->run($cursor));
        $data[ 'driven_by' ] = 'request';
        return $data;
    }

    /**
     * 用户操作（仅 waiting_input 生效）
     * @param string $taskKey
     * @param string $code
     * @return array
     */
    public function operate(string $taskKey, string $code): array
    {
        $executor = self::getExecutor($taskKey);
        $result   = $executor->operate($code);
        $data     = $this->wrapResult($executor, $result);
        $data[ 'driven_by' ] = 'request';

        // 决策完成后任务继续：队列可用时重新交给队列推进（自驱链在 waiting_input 时已中断）
        $task   = $executor->getTask();
        $status = (string) ( $task[ 'status' ] ?? '' );
        if (!TaskDict::isTerminal($status) && $status !== TaskDict::STATUS_WAITING_INPUT) {
            TaskScheduler::push($task);
        }

        return $data;
    }

    /**
     * 取消任务（执行中 / 排队中都允许取消）
     * @param string $taskKey
     * @return array
     */
    public function cancel(string $taskKey): array
    {
        $executor = self::getExecutor($taskKey);
        $result   = $executor->cancel(TaskDict::END_REASON_USER_CANCEL);
        $data     = $this->wrapResult($executor, $result);
        $data[ 'driven_by' ] = 'request';
        return $data;
    }

    /**
     * 判定任务失败（执行超时 / 自驱链异常达上限等保护场景）
     * @param string $taskKey
     * @param string $reason
     * @return array
     */
    public function fail(string $taskKey, string $reason): array
    {
        $executor = self::getExecutor($taskKey);
        $result   = $executor->fail($reason);
        return $this->wrapResult($executor, $result);
    }

    /**
     * 统一包装返回：补上当前 db 状态与最新事件序号
     * @param TaskExecutor $executor
     * @param \core\task\TaskResult $result
     * @return array
     */
    protected function wrapResult(TaskExecutor $executor, $result): array
    {
        $task = $executor->getTask();
        $data = $result->toArray();
        $data[ 'task_key' ] = (string) ( $task[ 'task_key' ] ?? '' );
        return $data;
    }
}

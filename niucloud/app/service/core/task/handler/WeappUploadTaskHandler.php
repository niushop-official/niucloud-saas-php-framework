<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\task\handler;

use app\dict\sys\CloudDict;
use app\dict\sys\TaskDict;
use app\model\weapp\WeappVersion;
use app\service\core\site\CoreSiteService;
use app\service\core\weapp\CoreWeappCloudService;
use app\service\core\weapp\CoreWeappConfigService;
use core\exception\CommonException;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTracker;
use core\task\TaskStepTrait;
use core\util\TaskLogger;
use think\facade\Cache;

/**
 * 小程序发布任务处理器（站点端）
 *
 * 原流程：点击发布后同步打包上传源码，再由页面通过云端 SSE + 轮询日志展示编译进度，
 * 离开页面即断流、无法续跑。改为任务模型后：
 * - 创建任务只做轻量准备（生成版本号 + 建版本记录），接口立即返回
 * - 打包上传源码作为第一片执行（耗时操作放在任务推进中，避免请求长时间阻塞）
 * - 云端编译按片轮询，未完成即返回 running，由执行器继续驱动
 * - 版本状态（成功 / 失败）由任务统一回写，不再依赖页面轮询
 */
class WeappUploadTaskHandler implements TaskHandlerInterface
{
    use TaskStepTrait;

    /** 子步骤：准备 -> 打包上传源码 -> 云端编译 -> 回写版本状态 */
    const SUB_PREPARE = 'prepare'; // 轻量准备片：先返回进度，避免首个请求承担耗时的打包上传
    const SUB_UPLOAD  = 'upload';
    const SUB_COMPILE = 'compile';
    const SUB_FINISH  = 'finish';

    /** 主步骤标识 */
    const STEP_UPLOAD = 'weappUpload';

    /** 任务状态缓存有效期（秒） */
    const STATE_TTL = 86400;

    /** 云端编译进度事件的去重步长（每 10% 下发一次，100% 必发） */
    const PERCENT_STEP = 10;

    /** 当前任务标识（由 TaskExecutor 注入） */
    protected string $taskKey = '';

    public function getType(): string
    {
        return TaskDict::TYPE_WEAPP_UPLOAD;
    }

    // ==================== 状态存取 ====================

    protected static function cacheKey(string $taskKey): string
    {
        return 'weapp_upload_task_' . $taskKey;
    }

    protected function state(): array
    {
        if ($this->taskKey === '') return [];
        $state = Cache::get(self::cacheKey($this->taskKey));

        return is_array($state) ? $state : [];
    }

    protected function saveState(array $state): void
    {
        if ($this->taskKey === '') return;
        Cache::set(self::cacheKey($this->taskKey), $state, self::STATE_TTL);
    }

    protected function clear(): void
    {
        if ($this->taskKey === '') return;
        Cache::delete(self::cacheKey($this->taskKey));
    }

    public function bindTask(string $taskKey): void
    {
        if ($taskKey !== '') $this->taskKey = $taskKey;
    }

    /**
     * 当前站点id（站点端任务；非 HTTP 上下文降级为 0）
     * @return int
     */
    protected static function siteId(): int
    {
        try {
            return (int) request()->siteId();
        } catch (\Throwable $e) {
            return 0;
        }
    }

    // ==================== 创建 ====================

    public function create(array $params): array
    {
        $siteId = (int) ( $params[ 'site_id' ] ?? 0 ) > 0 ? (int) $params[ 'site_id' ] : self::siteId();
        if ($siteId <= 0) throw new CommonException('WEAPP_UPLOAD_SITE_EMPTY');

        // 同一站点同时只允许一个「上传中」版本（业务约束，与任务槽位无关）
        $uploading = ( new WeappVersion() )->where([ [ 'site_id', '=', $siteId ], [ 'status', '=', CloudDict::APPLET_UPLOADING ] ])->count();
        if ($uploading > 0) throw new CommonException('WEAPP_UPLOADING');

        // 回退：用历史成功版本保留的源码包重新提交（跳过重新打包）
        $sourceZip   = $this->resolveSourceZip((string) ( $params[ 'source_zip' ] ?? '' ));
        $isRollback  = $sourceZip !== '';
        $rollbackZip = $isRollback ? $sourceZip : '';

        // 版本号：未指定则按站点内最大版本号递增；自定义版本 version_no 记 0（不打断默认连续性）
        // 回退场景由前端带上原版本号，走自定义分支（version_no = 0）
        $version = trim((string) ( $params[ 'version' ] ?? '' ));
        if ($version === '') {
            $versionNo = (int) ( new WeappVersion() )->where([ [ 'site_id', '=', $siteId ] ])
                    ->order('version_no desc')->value('version_no') + 1;
            $version   = "1.0.{$versionNo}";
        } else {
            $versionNo = 0;
        }

        // 回退版本：说明里标注来源版本，便于在版本列表中区分
        $desc = $isRollback ? ('回退至版本 ' . $version) : (string) ( $params[ 'desc' ] ?? '' );

        $key     = uniqid();
        $versionId = ( new WeappVersion() )->create([
            'site_id'     => $siteId,
            'version'     => $version,
            'version_no'  => $versionNo,
            'desc'        => $desc,
            'create_time' => time(),
            // 上传完成前用任务标识占位，拿到云端编译标识后回写（预览码 / 日志查询都以该字段为准）
            'task_key'    => $key,
            'status'      => CloudDict::APPLET_UPLOADING
        ])->id;

        $this->taskKey = $key;

        $this->saveState([
            'key'          => $key,
            'site_id'      => $siteId,
            'version_id'   => (int) $versionId,
            'version'      => $version,
            'desc'         => $desc,
            'step'         => self::SUB_PREPARE,
            'compile_key'  => '',
            'source_zip'   => $rollbackZip,
            'is_rollback'  => $isRollback ? 1 : 0,
            'last_percent' => -1
        ]);

        return [
            'task_key' => $key,
            'title'    => ($isRollback ? '小程序回退-' : '小程序发布-') . $version,
            'desc'     => $isRollback ? ('回退至版本 ' . $version) : $desc,
            'params'   => array_merge($params, [
                'site_id'     => $siteId,
                'version'     => $version,
                'version_id'  => (int) $versionId,
                'source_zip'  => $rollbackZip,
                'is_rollback' => $isRollback ? 1 : 0
            ])
        ];
    }

    /**
     * 解析回退使用的源码包路径
     *
     * 路径来自数据库登记的保留包，但仍需校验：
     * - 必须位于小程序上传临时目录 runtime/backup/weapp/ 内（防止传入任意文件被上传）
     * - 必须真实存在
     *
     * @param string $zip
     * @return string 非法 / 不存在时返回空串（回退模式自动降级为重新打包）
     */
    protected function resolveSourceZip(string $zip): string
    {
        if ($zip === '') return '';

        $root = realpath(task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp');
        $real = realpath($zip);

        if ($root === false || $real === false) return '';
        if (!is_file($real)) return '';
        if (strpos($real, $root . DIRECTORY_SEPARATOR) !== 0) return '';

        return $real;
    }

    // ==================== 推进 ====================

    public function run(string $cursor): array
    {
        $state = $this->state();

        if (empty($state)) {
            return [ 'status' => TaskDict::STATUS_SUCCESS, 'end_reason' => TaskDict::END_REASON_COMPLETED, 'progress' => 100, 'stage' => '发布完成', 'cursor' => '' ];
        }

        $step = (string) ( $state[ 'step' ] ?? self::SUB_PREPARE );

        try {
            // 准备片：只回显进度，把耗时的打包上传放到下一片（避免首次驱动长时间阻塞请求）
            if ($step === self::SUB_PREPARE) {
                $state[ 'step' ] = self::SUB_UPLOAD;
                $this->saveState($state);

                return $this->running(5, '准备打包上传小程序源码', [
                    [ 'level' => 'info', 'text' => '开始发布小程序（版本 ' . (string) ( $state[ 'version' ] ?? '' ) . '）' ]
                ]);
            }

            // 第二片：打包源码并上传到云端（耗时操作）
            if ($step === self::SUB_UPLOAD) {
                $compileKey = $this->doUpload($state);

                $state[ 'compile_key' ] = $compileKey;
                $state[ 'step' ]        = self::SUB_COMPILE;
                $this->saveState($state);

                // 版本记录的 task_key 改为云端编译标识（预览码 / 停止云端上传依赖它），
                // 同时登记本次保留的源码包路径（成功后可用于版本回退）
                $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [
                    'task_key'   => $compileKey,
                    'source_zip' => (string) ( $state[ 'source_zip' ] ?? '' )
                ]);

                $isRollback = (int) ( $state[ 'is_rollback' ] ?? 0 ) === 1;

                return $this->running(50, '源码已上传，等待云端编译', [
                    [ 'level' => 'info', 'text' => $isRollback ? '已用历史版本源码包重新提交，云端编译中' : '小程序源码打包上传完成，云端编译中' ]
                ]);
            }

            // 第二片起：轮询云端编译日志
            $log = $this->pollCompile((string) ( $state[ 'compile_key' ] ?? '' ));

            if ($log[ 'pending' ]) {
                $percent = (int) $log[ 'percent' ];
                // 云端编译内容行（与云编译一致：步骤执行明细，按 sig 去重）
                $events  = $this->emitCompileEvents($state, $log[ 'events' ] ?? []);

                // 排队中：单行原地刷新的进度条（与云编译一致：type=progress / key=queue），
                // 不追加文字行，避免每次轮询都刷一行「前面还有 N 人」
                if (!empty($log[ 'queued' ])) {
                    $events[] = $this->buildQueueEvent($log);
                    $state[ 'queue_seen' ] = true;
                    $this->saveState($state);

                    return $this->running($percent, '排队中', $events);
                }

                // 曾排队、现已出队：补一条 100% 排队事件把进度条固化为一行静态日志，
                // 避免终端在编译阶段仍一直停在「排队中」
                if (!empty($state[ 'queue_seen' ])) {
                    $state[ 'queue_seen' ] = false;
                    $this->saveState($state);
                    $events[] = [
                        'type'     => 'progress',
                        'key'      => 'queue',
                        'label'    => '任务排队',
                        'percent'  => 100,
                        'text'     => '任务排队完成，开始编译',
                        'progress' => 100,
                        'persist'  => true
                    ];
                }

                return $this->running(50 + (int) floor($percent / 2), '云端编译中 ' . $percent . '%', $events);
            }

            if ($log[ 'failed' ]) {
                $message = (string) ( $log[ 'message' ] ?? '云端编译失败' );
                $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [
                    'status'      => CloudDict::APPLET_UPLOAD_FAIL,
                    'fail_reason' => $message,
                    'update_time' => time()
                ]);
                $this->clear();

                return [
                    'status'      => TaskDict::STATUS_FAILED,
                    'end_reason'  => TaskDict::END_REASON_FAILED,
                    'progress'    => 100,
                    'stage'       => '发布失败',
                    'cursor'      => '',
                    'events'      => array_merge($this->emitCompileEvents($state, $log[ 'events' ] ?? []), [
                        [ 'level' => 'error', 'text' => '小程序发布失败：' . $message ]
                    ]),
                    'fail_reason' => [ 'Message' => '失败原因：' . $message ]
                ];
            }

            // 编译完成：回写版本状态
            $state[ 'step' ] = self::SUB_FINISH;
            $this->saveState($state);

            // 编译完成后调用云端预览接口，获取体验版预览码（二维码 base64）
            $preview = '';
            try {
                $preview = ( new CoreWeappCloudService() )->getWeappPreviewImage((string) ( $state[ 'compile_key' ] ?? '' ));
            } catch (\Throwable $e) {
                // 预览码获取失败不影响发布成功
            }

            $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [
                'status'      => CloudDict::APPLET_UPLOAD_SUCCESS,
                'preview'     => $preview,
                'update_time' => time()
            ]);
            $this->clear();

            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '发布完成',
                'cursor'     => '',
                'preview'    => $preview,
                'events'     => array_merge($this->emitCompileEvents($state, $log[ 'events' ] ?? []), [
                    [ 'level' => 'success', 'text' => '小程序发布成功（版本 ' . (string) ( $state[ 'version' ] ?? '' ) . '）' ]
                ])
            ];
        } catch (\Throwable $e) {
            $message = $e->getMessage();

            $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [
                'status'      => CloudDict::APPLET_UPLOAD_FAIL,
                'fail_reason' => $message,
                'update_time' => time()
            ]);
            $this->clear();

            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'progress'    => 100,
                'stage'       => '发布失败',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'error', 'text' => '小程序发布失败：' . $message ] ],
                'fail_reason' => [ 'Message' => '失败原因：' . $message ]
            ];
        }
    }

    /**
     * 打包源码并上传到云端，返回云端编译任务标识
     * @param array $state
     * @return string
     */
    protected function doUpload(array &$state): string
    {
        $siteId = (int) ( $state[ 'site_id' ] ?? 0 );

        $upload = ( new CoreWeappCloudService() )->setConfig(function () use ($siteId) {
            $config = ( new CoreWeappConfigService() )->getWeappConfig($siteId);

            return [
                'app_id'             => $config[ 'app_id' ],
                'upload_private_key' => $config[ 'upload_private_key' ],
                'addon'              => ( new CoreSiteService() )->getAddonKeysBySiteId($siteId)
            ];
        })->uploadWeapp([
            'site_id'      => $siteId,
            'version'      => (string) ( $state[ 'version' ] ?? '' ),
            'desc'         => (string) ( $state[ 'desc' ] ?? '' ),
            // 保留本次上传的源码包：成功后登记到版本记录，供后续「版本回退」复用
            'keep_package' => 1,
            // 回退场景：复用历史版本的包，跳过重新打包
            'source_zip'   => (string) ( $state[ 'source_zip' ] ?? '' )
        ]);

        $compileKey = (string) ( $upload[ 'key' ] ?? '' );
        if ($compileKey === '') throw new CommonException('WEAPP_UPLOAD_KEY_EMPTY');

        // 记录保留的源码包路径（上传成功后回写版本记录）
        $state[ 'source_zip' ] = (string) ( $upload[ 'zip' ] ?? '' );

        return $compileKey;
    }

    /**
     * 轮询云端编译日志
     * @param string $compileKey
     * @return array [ pending, failed, percent, message ]
     */
    protected function pollCompile(string $compileKey): array
    {
        if ($compileKey === '') return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => '缺少云端编译任务标识' ];

        // 新接口 task/logs 返回 main + sub_process，统一在 Cloud 服务内解析为进度/失败结论
        return ( new CoreWeappCloudService() )->getWeappCompileStatus($compileKey);
    }

    /**
     * 小程序发布排队回显事件（单行原地刷新进度条，与云编译 buildQueueEvent 一致）
     *
     * 云端排队期间没有百分比进度，只有「前面还有几个任务」；进度条百分比按排队推进度估算仅用于条形填充。
     * 文案带排队人数，由终端按 key=queue 原地刷新这一行，排到前面时能看到位置变化。
     *
     * @param array $log getWeappCompileStatus 返回（含 queued / waiting_count / position / percent）
     * @return array progress 事件；非排队 / 人数无效时返回空数组
     */
    protected function buildQueueEvent(array $log): array
    {
        $waiting  = (int) ( $log[ 'waiting_count' ] ?? 0 );
        $position = (int) ( $log[ 'position' ] ?? 0 );
        $percent  = (int) ( $log[ 'percent' ] ?? 0 );

        // 前面没人（或已出队）：不展示「前面还有 0 人」这种无意义行；
        // waiting_count 与 position 均为 1 时即将轮到本任务，展示反而误导，同样不展示
        if ($waiting <= 0 || ( $waiting === 1 && $position === 1 )) return [];

        return [
            'type'     => 'progress',
            'key'      => 'queue',
            'label'    => '任务排队',
            'percent'  => $percent,
            'text'     => '任务排队中，前面还有 ' . $waiting . ' 个任务',
            'progress' => $percent,
            // 必须落盘：队列驱动时前端从 events 增量读取，不落盘的话终端在排队阶段会完全没有输出
            'persist'  => true
        ];
    }

    /**
     * 编译进度事件（按步长去重，避免每片都刷一行日志）
     * @param array $state 任务状态（引用：记录上次下发的百分比）
     * @param int $percent
     * @return array
     */
    protected function progressEvents(array &$state, int $percent): array
    {
        $last = (int) ( $state[ 'last_percent' ] ?? -1 );
        $isEnd = $percent >= 100;

        if (!$isEnd && $percent - $last < self::PERCENT_STEP) return [];

        $state[ 'last_percent' ] = $percent;
        $this->saveState($state);

        return [
            [
                'type'     => 'progress',
                'key'      => 'weapp_compile',
                'label'    => '云端编译',
                'percent'  => $percent,
                'text'     => '云端编译 ' . $percent . '%',
                'progress' => $percent,
                'persist'  => $isEnd
            ]
        ];
    }

    protected function updateVersion(int $id, array $data): void
    {
        if ($id <= 0) return;
        ( new WeappVersion() )->update($data, [ 'id' => $id ]);
    }

    /**
     * 云端编译日志内容事件去重输出（与云编译 isEmitted/markEmitted 一致）
     *
     * task/logs 每次轮询都返回完整 main + sub_process，同一状态会重复出现，
     * 因此按 sig 去重，保证「执行中 / 完成 / 失败」每态只输出一次。
     * 去重集合随任务状态持久化（任务结束 clear 后自然清空）。
     *
     * @param array $state 任务状态（引用；写入已输出签名）
     * @param array $candidates buildCompileEvents 产出的候选事件（含 sig）
     * @return array 实际要下发的事件
     */
    protected function emitCompileEvents(array &$state, array $candidates): array
    {
        $emitted = (array) ( $state[ 'emitted' ] ?? [] );
        $events  = [];

        foreach ($candidates as $c) {
            $sig = (string) ( $c[ 'sig' ] ?? ( $c[ 'text' ] ?? '' ) );
            if ($sig === '' || isset($emitted[ $sig ])) continue;
            $emitted[ $sig ] = 1;
            $events[] = [
                'level'    => (string) ( $c[ 'level' ] ?? 'info' ),
                'text'     => (string) ( $c[ 'text' ] ?? '' ),
                'progress' => null
            ];
        }

        if (!empty($emitted)) {
            $state[ 'emitted' ] = $emitted;
            $this->saveState($state);
        }

        return $events;
    }

    // ==================== 操作 / 取消 ====================

    public function operate(string $code): array
    {
        if ($code === TaskDict::ACTION_CANCEL) {
            $this->cancel(TaskDict::END_REASON_USER_CANCEL);

            return [
                'status'     => TaskDict::STATUS_CANCELED,
                'end_reason' => TaskDict::END_REASON_USER_CANCEL,
                'stage'      => '已取消',
                'cursor'     => '',
                'events'     => [ [ 'level' => 'warning', 'text' => '小程序发布任务已被取消' ] ]
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
        $state = $this->state();
        if (empty($state)) return;

        // 已提交云端：中断上传并清除云端日志
        $compileKey = (string) ( $state[ 'compile_key' ] ?? '' );
        if ($compileKey !== '') {
            try {
                ( new CoreWeappCloudService() )->stopUploadAndClearLogs($compileKey);
            } catch (\Throwable $e) {
                // 中断失败不影响任务收敛
            }
        }

        $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [
            'status'      => CloudDict::APPLET_UPLOAD_FAIL,
            'fail_reason' => '已取消发布',
            'update_time' => time()
        ]);

        $this->clear();
    }

    public function snapshotState(): array
    {
        return $this->state();
    }

    /**
     * 快照附加信息：记录云端编译任务标识（compile_key），供详情页追溯云端侧任务
     */
    public function snapshotMeta(): array
    {
        $key = (string) ( $this->state()[ 'compile_key' ] ?? '' );
        if ($key === '' && $this->taskKey !== '') {
            // 任务已 clear（如取消）：从运行快照的 handler_state 兜底取云端标识
            try {
                $snap = TaskLogger::loadSnapshot(TaskLogger::taskFile($this->getType(), $this->taskKey));
                $key  = (string) ( $snap[ 'handler_state' ][ 'compile_key' ] ?? '' );
            } catch (\Throwable $e) {
                $key = '';
            }
        }
        return $key !== '' ? [ 'cloud_task_id' => $key ] : [];
    }

    public function restoreState(array $state): void
    {
        if ($this->taskKey === '' || empty($state)) return;
        $this->saveState($state);
    }

    // ==================== 步骤 ====================

    /**
     * 子步骤定义（主步骤下的发布流程）
     * @return array
     */
    public static function subStepDefinitions(): array
    {
        return [
            [ 'key' => self::SUB_UPLOAD, 'name' => '打包上传源码', 'desc' => '打包小程序源码并提交云端' ],
            [ 'key' => self::SUB_COMPILE, 'name' => '云端编译', 'desc' => '等待云端编译完成' ],
            [ 'key' => self::SUB_FINISH, 'name' => '发布完成', 'desc' => '版本状态回写为上传成功' ]
        ];
    }

    public function getStepDefinitions(): array
    {
        $defs = [
            [
                'key'    => self::STEP_UPLOAD,
                'name'   => '上传并编译',
                'desc'   => '打包源码上传到云端并等待编译完成',
                'weight' => 0, // 进度由 run() 直接给出，步骤不参与加权
                'seq'    => 1
            ]
        ];

        foreach (self::subStepDefinitions() as $i => $item) {
            $defs[] = [
                'key'    => self::STEP_UPLOAD . ':' . $item[ 'key' ],
                'parent' => self::STEP_UPLOAD,
                'name'   => (string) $item[ 'name' ],
                'desc'   => (string) $item[ 'desc' ],
                'weight' => 0,
                'seq'    => $i + 1
            ];
        }

        $defs[] = [
            'key'    => 'uploadComplete',
            'name'   => '发布完成',
            'desc'   => '',
            'weight' => 0,
            'seq'    => 2
        ];

        return $defs;
    }

    public function reportSteps(): array
    {
        $state = $this->state();
        if (empty($state)) return [];

        $step    = (string) ( $state[ 'step' ] ?? self::SUB_PREPARE );
        $percent = max(0, (int) ( $state[ 'last_percent' ] ?? 0 ));

        // 准备 / 上传阶段：0~5%；编译阶段：50% + 编译进度的一半；完成：100%
        $progress = in_array($step, [ self::SUB_PREPARE, self::SUB_UPLOAD ], true)
            ? ($step === self::SUB_UPLOAD ? 5 : 0)
            : ($step === self::SUB_COMPILE ? 50 + (int) floor($percent / 2) : 100);

        return [
            [
                'step_key' => self::STEP_UPLOAD,
                'name'     => '上传并编译',
                'desc'     => '打包源码上传到云端并等待编译完成',
                'status'   => $step === self::SUB_FINISH ? TaskStepTracker::STATUS_SUCCESS : TaskStepTracker::STATUS_RUNNING,
                'progress' => $progress,
                'sub'      => $this->buildSubSteps($step, $percent)
            ],
            [
                'step_key' => 'uploadComplete',
                'name'     => '发布完成',
                'desc'     => '',
                'status'   => $step === self::SUB_FINISH ? TaskStepTracker::STATUS_SUCCESS : TaskStepTracker::STATUS_PENDING,
                'progress' => $step === self::SUB_FINISH ? 100 : 0
            ]
        ];
    }

    /**
     * 子步骤状态
     * @param string $step 当前子步骤
     * @param int $percent 云端编译百分比
     * @return array
     */
    protected function buildSubSteps(string $step, int $percent): array
    {
        $order  = array_column(self::subStepDefinitions(), 'key');
        $curIdx = array_search($step, $order, true);

        // 准备阶段：尚未真正上传，按「打包上传源码」进行中展示
        if ($curIdx === false && $step === self::SUB_PREPARE) $curIdx = 0;

        $sub = [];
        foreach (self::subStepDefinitions() as $i => $item) {
            if ($curIdx === false) {
                $status = TaskStepTracker::STATUS_PENDING;
            } elseif ($i < $curIdx) {
                $status = TaskStepTracker::STATUS_SUCCESS;
            } elseif ($i === $curIdx) {
                $status = $step === self::SUB_FINISH ? TaskStepTracker::STATUS_SUCCESS : TaskStepTracker::STATUS_RUNNING;
            } else {
                $status = TaskStepTracker::STATUS_PENDING;
            }

            // 编译中：子步骤进度取云端百分比，避免进度条一直停在 0
            $subPercent = $status === TaskStepTracker::STATUS_SUCCESS ? 100
                : ($item[ 'key' ] === self::SUB_COMPILE ? $percent : 0);

            $sub[] = [
                'step_key' => self::STEP_UPLOAD . ':' . $item[ 'key' ],
                'parent'   => self::STEP_UPLOAD,
                'name'     => (string) $item[ 'name' ],
                'desc'     => (string) $item[ 'desc' ],
                'seq'      => $i + 1,
                'weight'   => 0, // 子步骤不参与任务总进度
                'status'   => $status,
                'progress' => $subPercent
            ];
        }

        return $sub;
    }

    // ==================== 结果组装 ====================

    protected function running(int $progress, string $stage, array $events = []): array
    {
        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => max(0, min(99, $progress)),
            'stage'    => $stage,
            'cursor'   => '',
            'events'   => $events
        ];
    }
}

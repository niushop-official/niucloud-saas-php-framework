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
use app\model\site\SiteGroup;
use app\model\sys\WxOplatfromWeappVersion;
use app\service\admin\site\SiteGroupService;
use app\service\core\weapp\CoreWeappCloudService;
use app\service\core\wxoplatform\CoreOplatformConfigService;
use app\service\core\wxoplatform\CoreOplatformService;
use core\exception\CommonException;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTrait;
use core\util\TaskLogger;
use think\facade\Cache;

/**
 * 小程序模板库同步任务处理器
 *
 * 原流程依赖队列 job 链（GetVersionUploadResult -> VersionUploadSuccess -> 下一个套餐），
 * 进度不可见、中断后难以续跑。改为任务模型后：
 * - 每个套餐 = 一个步骤
 * - 上传流程中的每一步 = 子步骤（上传 / 编译 / 草稿 / 加入模板库 / 取模板ID / 清理旧模板）
 * - 编译是异步的，run() 每次轮询一次，未完成即返回 running 由执行器继续驱动
 *
 * 单个套餐失败不会中断整轮：记录错误信息后继续下一个套餐（与插件打包同策略）。
 */
class WeappCommitTaskHandler implements TaskHandlerInterface
{
    use TaskStepTrait;

    /** 子步骤：一个套餐内的上传流程 */
    const SUB_UPLOAD       = 'upload';       // 上传代码到云端
    const SUB_COMPILE      = 'compile';      // 等待云端编译完成
    const SUB_DRAFT        = 'draft';        // 获取草稿列表并匹配本次版本
    const SUB_ADD_TEMPLATE = 'addTemplate';  // 草稿添加到模板库
    const SUB_GET_TEMPLATE = 'getTemplate';  // 取模板 ID 并回写
    const SUB_CLEAN_OLD    = 'cleanOld';     // 清理该套餐的旧模板

    /** 任务状态缓存有效期（秒） */
    const STATE_TTL = 86400;

    /** 当前任务标识（由 TaskExecutor 注入） */
    protected string $taskKey = '';

    public function getType(): string
    {
        return TaskDict::TYPE_WEAPP_COMMIT;
    }

    protected static function cacheKey(string $taskKey): string
    {
        return 'weapp_commit_task_' . $taskKey;
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

    public function create(array $params): array
    {
        $groupId = (int) ( $params[ 'site_group_id' ] ?? 0 );

        // 未指定套餐即「一键同步」：按 group_id 升序同步全部套餐
        if ($groupId > 0) {
            $groups = ( new SiteGroup() )->where([ [ 'group_id', '=', $groupId ] ])
                ->field('group_id, group_name')->order('group_id asc')->select()->toArray();
        } else {
            $groups = ( new SiteGroup() )->field('group_id, group_name')->order('group_id asc')->select()->toArray();
        }

        if (empty($groups)) throw new CommonException('PLEASE_ADD_FIRST_SITE_GROUP');

        $list = array_map(fn ($item) => [
            'id'   => (int) $item[ 'group_id' ],
            'name' => (string) $item[ 'group_name' ]
        ], $groups);

        $key  = uniqid();
        $this->taskKey = $key;

        $this->saveState([
            'key'    => $key,
            'groups' => $list,
            'index'  => 0,
            'step'   => self::SUB_UPLOAD,
            'errors' => [],
            'done'   => []
        ]);

        return [
            'task_key' => $key,
            'title'    => count($list) > 1 ? '模板库同步-' . count($list) . '个套餐' : '模板库同步-' . $list[ 0 ][ 'name' ],
            'desc'     => implode('、', array_column($list, 'name')),
            'params'   => array_merge($params, [ 'site_group_id' => $groupId ])
        ];
    }

    public function run(string $cursor): array
    {
        $state = $this->state();

        if (empty($state)) {
            return [ 'status' => TaskDict::STATUS_SUCCESS, 'end_reason' => TaskDict::END_REASON_COMPLETED, 'progress' => 100, 'stage' => '同步完成', 'cursor' => '' ];
        }

        $groups = (array) ( $state[ 'groups' ] ?? [] );
        $index  = (int) ( $state[ 'index' ] ?? 0 );
        $total  = count($groups);

        if ($index >= $total) {
            $this->clear();
            return [ 'status' => TaskDict::STATUS_SUCCESS, 'end_reason' => TaskDict::END_REASON_COMPLETED, 'progress' => 100, 'stage' => '同步完成', 'cursor' => '' ];
        }

        $current = $groups[ $index ];
        $step    = (string) ( $state[ 'step' ] ?? self::SUB_UPLOAD );

        try {
            $result = $this->advance($current, $step, $state);
        } catch (\Throwable $e) {
            // 单个套餐失败：记下原因后继续下一个，避免一个套餐有问题整批中断
            $state[ 'errors' ][ $current[ 'id' ] ]      = $e->getMessage();
            // 记下失败发生在哪个子步骤：否则后面把 step 重置为 upload，步骤树无法定位到具体失败环节
            $state[ 'failed_step' ][ $current[ 'id' ] ] = $step;
            $state[ 'index' ]                           = $index + 1;
            $state[ 'step' ]                            = self::SUB_UPLOAD;
            $this->saveState($state);

            // 重新读取最新状态（含本次编译失败输出的步骤明细），并入错误事件
            $state  = $this->state();
            $events = array_merge($state[ 'compile_events' ] ?? [], [
                [ 'level' => 'error', 'text' => '套餐【' . $current[ 'name' ] . '】同步失败，已跳过：' . $e->getMessage() ]
            ]);

            if ($index + 1 >= $total) {
                $this->clear();
                return $this->finish($groups, $events);
            }

            return $this->running($groups, $state, $index + 1, '已跳过套餐【' . $current[ 'name' ] . '】', $events);
        }

        // 重新读取最新状态（advance 内已将云端编译内容行写入 compile_events）
        $state = $this->state();

        // 编译未完成：保持在当前子步骤，下次 run 继续轮询
        if (!empty($result[ 'pending' ])) {
            $state[ 'step' ] = $result[ 'step' ] ?? $step;
            $this->saveState($state);

            return $this->running($groups, $state, $index, $result[ 'message' ] ?? '处理中', array_merge($state[ 'compile_events' ] ?? [], $result[ 'events' ] ?? []));
        }

        if (!empty($result[ 'done' ])) {
            // 该套餐全部子步骤完成
            $state[ 'done' ][] = $current[ 'id' ];
            $state[ 'index' ]  = $index + 1;
            $state[ 'step' ]   = self::SUB_UPLOAD;
            $this->saveState($state);

            $events = array_merge($state[ 'compile_events' ] ?? [], [
                [ 'level' => 'info', 'text' => '套餐【' . $current[ 'name' ] . '】同步完成' ]
            ]);

            if ($index + 1 >= $total) {
                $this->clear();
                return $this->finish($groups, $events);
            }

            return $this->running($groups, $state, $index + 1, '套餐【' . $current[ 'name' ] . '】同步完成', $events);
        }

        // 推进到下一个子步骤
        $state[ 'step' ] = $result[ 'step' ];
        $this->saveState($state);

        return $this->running($groups, $state, $index, $result[ 'message' ] ?? '处理中', array_merge($state[ 'compile_events' ] ?? [], $result[ 'events' ] ?? []));
    }

    /**
     * 推进当前套餐的一个子步骤
     *
     * @param array $current 当前套餐
     * @param string $step 当前子步骤
     * @param array $state 任务状态（引用传参，子步骤内会写入中间结果）
     * @return array [ pending|done|step, message, events ]
     * @throws \Throwable
     */
    protected function advance(array $current, string $step, array &$state): array
    {
        $groupId = (int) $current[ 'id' ];

        switch ($step) {
            case self::SUB_UPLOAD:
                $this->doUpload($groupId, $state);

                return [ 'step' => self::SUB_COMPILE, 'message' => '代码已上传，等待云端编译' ];

            case self::SUB_COMPILE:
                $log = $this->pollCompile((string) ( $state[ 'task_key' ] ?? '' ));

                // 编译中：保持子步骤，输出云端日志内容行（与云编译一致：步骤执行明细，按 sig 去重）
                if ($log[ 'pending' ]) {
                    $events  = $this->emitCompileEvents($state, $log[ 'events' ] ?? []);
                    $message = !empty($log[ 'queued' ])
                        ? '排队中，前面还有 ' . (int) ( $log[ 'waiting_count' ] ?? 0 ) . ' 个任务'
                        : '云端编译中 ' . (int) $log[ 'percent' ] . '%';

                    // 排队中：单行原地刷新进度条（与云编译一致：type=progress / key=queue），不追加文字行
                    if (!empty($log[ 'queued' ])) {
                        $events[] = $this->buildQueueEvent($log);
                        $state[ 'queue_seen' ] = true;
                        $this->saveState($state);
                    } elseif (!empty($state[ 'queue_seen' ])) {
                        // 曾排队、现已出队：补一条 100% 排队事件把进度条固化为一行静态日志
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

                    return [
                        'pending' => true,
                        'step'    => self::SUB_COMPILE,
                        'message' => $message,
                        'events'  => $events
                    ];
                }

                if ($log[ 'failed' ]) {
                    // 先输出失败相关步骤明细，再抛出异常（异常消息由 run 的 catch 统一展示）
                    $this->emitCompileEvents($state, $log[ 'events' ] ?? []);
                    throw new CommonException($log[ 'message' ] ?: '云端编译失败');
                }

                // 编译完成：把最终内容行（各步骤「完成」）也输出
                $this->emitCompileEvents($state, $log[ 'events' ] ?? []);
                $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [ 'status' => CloudDict::APPLET_UPLOAD_SUCCESS, 'update_time' => time() ]);

                return [ 'step' => self::SUB_DRAFT, 'message' => '编译完成，正在获取草稿' ];

            case self::SUB_DRAFT:
                $draftId = $this->matchDraft((string) ( $state[ 'user_version' ] ?? '' ));
                if ($draftId <= 0) throw new CommonException('草稿箱中未找到本次上传的版本');

                $state[ 'draft_id' ] = $draftId;

                return [ 'step' => self::SUB_ADD_TEMPLATE, 'message' => '已匹配草稿，正在添加到模板库' ];

            case self::SUB_ADD_TEMPLATE:
                CoreOplatformService::addToTemplate([ 'draft_id' => (int) ( $state[ 'draft_id' ] ?? 0 ) ]);

                return [ 'step' => self::SUB_GET_TEMPLATE, 'message' => '已添加到模板库，正在获取模板ID' ];

            case self::SUB_GET_TEMPLATE:
                $templateId = $this->matchTemplate((string) ( $state[ 'user_version' ] ?? '' ));
                if ($templateId === '') throw new CommonException('模板库中未找到本次添加的版本');

                $this->updateVersion((int) ( $state[ 'version_id' ] ?? 0 ), [ 'template_id' => $templateId ]);
                $state[ 'template_id' ] = $templateId;

                return [ 'step' => self::SUB_CLEAN_OLD, 'message' => '已获取模板ID，正在清理旧模板' ];

            case self::SUB_CLEAN_OLD:
                $this->cleanOldTemplate($groupId, (int) ( $state[ 'version_id' ] ?? 0 ));

                return [ 'done' => true, 'message' => '同步完成' ];
        }

        throw new CommonException('WEAPP_COMMIT_STEP_NOT_EXIST');
    }

    // ==================== 上传流程各环节 ====================

    /**
     * 上传代码：生成版本号 -> 调云端上传 -> 落版本记录
     */
    protected function doUpload(int $groupId, array &$state): void
    {
        $versionNo = (int) ( new WxOplatfromWeappVersion() )
                ->where([ [ 'site_group_id', '=', $groupId ] ])->order('id desc')->value('version_no') + 1;
        $version   = "1.{$groupId}.{$versionNo}";

        $baseUrl = cache_remember('base_url', fn () => (string) url('/', [], '', true));

        $upload = ( new CoreWeappCloudService() )->setConfig(function () use ($groupId, $baseUrl) {
            $config    = ( new CoreOplatformConfigService() )->getConfig();
            $groupInfo = ( new SiteGroupService() )->getInfo($groupId);

            return [
                'app_id'               => $config[ 'develop_app_id' ],
                'upload_private_key'   => public_path() . $config[ 'develop_upload_private_key' ],
                'addon'                => array_merge($groupInfo[ 'app' ] ?? [], $groupInfo[ 'addon' ] ?? []),
                'base_url'             => $baseUrl
            ];
        })->uploadWeapp([
            'site_id' => 0, // 平台侧统一上传，不归属具体站点
            'version' => $version,
            'desc'    => ''
        ]);

        $record = ( new WxOplatfromWeappVersion() )->create([
            'site_group_id' => $groupId,
            'user_version'  => $version,
            'user_desc'     => '',
            'version_no'    => $versionNo,
            'create_time'   => time(),
            'task_key'      => (string) ( $upload[ 'key' ] ?? '' ),
            'template_id'   => ''
        ]);

        $state[ 'version_id' ]   = $record->id;
        $state[ 'user_version' ] = $version;
        $state[ 'task_key' ]     = (string) ( $upload[ 'key' ] ?? '' );
    }

    /**
     * 轮询云端编译日志
     *
     * 编译在云端进行，一次 run 只查一次：未完成返回 pending，由执行器继续推进。
     *
     * @param string $compileKey
     * @return array [ pending, failed, percent, message ]
     */
    protected function pollCompile(string $compileKey): array
    {
        if ($compileKey === '') return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => '缺少编译任务标识' ];

        // 新接口 task/logs 返回 main + sub_process，统一在 Cloud 服务内解析为进度/失败结论
        return ( new CoreWeappCloudService() )->getWeappCompileStatus($compileKey);
    }

    /** 在草稿箱中匹配本次上传的版本，返回 draft_id */
    protected function matchDraft(string $userVersion): int
    {
        $list = CoreOplatformService::getTemplateDraftList()[ 'draft_list' ] ?? [];

        foreach ((array) $list as $item) {
            if ((string) ( $item[ 'user_version' ] ?? '' ) === $userVersion) {
                return (int) ( $item[ 'draft_id' ] ?? 0 );
            }
        }

        return 0;
    }

    /** 在模板库中匹配本次添加的版本，返回 template_id */
    protected function matchTemplate(string $userVersion): string
    {
        $list = CoreOplatformService::getTemplateList()[ 'template_list' ] ?? [];

        foreach ((array) $list as $item) {
            if ((string) ( $item[ 'user_version' ] ?? '' ) === $userVersion) {
                return (string) ( $item[ 'template_id' ] ?? '' );
            }
        }

        return '';
    }

    /**
     * 清理该套餐下上一个版本的模板
     *
     * 微信模板库有数量上限，旧模板不再使用后需要删除。
     */
    protected function cleanOldTemplate(int $groupId, int $versionId): void
    {
        if ($versionId <= 0) return;

        $prev = ( new WxOplatfromWeappVersion() )
            ->where([ [ 'site_group_id', '=', $groupId ], [ 'id', '<', $versionId ] ])
            ->order('id desc')->findOrEmpty();

        if ($prev->isEmpty() || empty($prev[ 'template_id' ])) return;

        try {
            CoreOplatformService::deleteTemplate($prev[ 'template_id' ]);
        } catch (\Throwable $e) {
            // 旧模板清理失败不影响本次同步结果
        }
    }

    protected function updateVersion(int $id, array $data): void
    {
        if ($id <= 0) return;
        ( new WxOplatfromWeappVersion() )->update($data, [ 'id' => $id ]);
    }

    /**
     * 云端编译日志内容事件去重输出（与云编译 isEmitted/markEmitted、小程序上传一致）
     *
     * task/logs 每次轮询都返回完整 main + sub_process，同一状态会重复出现，
     * 因此按 sig 去重，保证「执行中 / 完成 / 失败」每态只输出一次；
     * 已渲染的事件同时累积进 state.compile_events，供 run() 统一并入返回（含失败/完成态）。
     *
     * @param array $state 任务状态（引用；写入已输出签名与渲染事件）
     * @param array $candidates buildCompileEvents 产出的候选事件（含 sig）
     * @return array 实际要下发的事件
     */
    protected function emitCompileEvents(array &$state, array $candidates): array
    {
        $emitted  = (array) ( $state[ 'emitted' ] ?? [] );
        $rendered = (array) ( $state[ 'compile_events' ] ?? [] );
        $out      = [];

        foreach ($candidates as $c) {
            $sig = (string) ( $c[ 'sig' ] ?? ( $c[ 'text' ] ?? '' ) );
            if ($sig === '' || isset($emitted[ $sig ])) continue;
            $emitted[ $sig ] = 1;
            $ev = [
                'level'    => (string) ( $c[ 'level' ] ?? 'info' ),
                'text'     => (string) ( $c[ 'text' ] ?? '' ),
                'progress' => null
            ];
            $rendered[] = $ev;
            $out[]      = $ev;
        }

        if (!empty($emitted)) {
            $state[ 'emitted' ]        = $emitted;
            $state[ 'compile_events' ] = $rendered;
            $this->saveState($state);
        }

        return $out;
    }

    /**
     * 模板库同步排队回显事件（单行原地刷新进度条，与云编译 buildQueueEvent 一致）
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

    protected function updateVersionByCompileKey(string $compileKey, array $data): void
    {
        if ($compileKey === '') return;
        ( new WxOplatfromWeappVersion() )->update($data, [ 'task_key' => $compileKey ]);
    }

    // ==================== 结果组装 ====================

    /**
     * 进行中的返回：进度按「已完成套餐 + 当前套餐内子步骤」估算
     */
    protected function running(array $groups, array $state, int $index, string $stage, array $events = []): array
    {
        $total = count($groups);
        $done  = count((array) ( $state[ 'done' ] ?? [] ));

        $stepWeight = $this->subStepProgress((string) ( $state[ 'step' ] ?? self::SUB_UPLOAD ));
        $progress   = $total > 0 ? (int) floor(( $done + $stepWeight ) / $total * 100) : 0;
        $progress   = max(0, min(99, $progress));

        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => $progress,
            'stage'    => $stage,
            'cursor'   => (string) $index,
            'events'   => $events
        ];
    }

    protected function finish(array $groups, array $events): array
    {
        $errors  = (array) ( $this->state()[ 'errors' ] ?? [] );
        $failed  = count($errors);
        $success = max(0, count($groups) - $failed);

        if ($failed <= 0) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => $success > 1 ? sprintf('同步完成（%d 个套餐）', $success) : '同步完成',
                'cursor'     => '',
                'events'     => $events
            ];
        }

        $detail = [];
        foreach ($errors as $groupId => $message) {
            $detail[] = '套餐 ' . $groupId . ' 同步失败：' . (string) $message;
        }

        return [
            'status'      => TaskDict::STATUS_FAILED,
            'end_reason'  => TaskDict::END_REASON_FAILED,
            'progress'    => 100,
            'stage'       => sprintf('同步完成（%d 成功 / %d 失败）', $success, $failed),
            'cursor'      => '',
            'events'      => $events,
            'fail_reason' => [ 'Message' => '失败原因：' . implode('；', $detail) ]
        ];
    }

    // ==================== 步骤 ====================

    /**
     * 子步骤清单（一个套餐内的上传流程）
     * @return array
     */
    public static function subStepDefinitions(): array
    {
        return [
            [ 'key' => self::SUB_UPLOAD, 'name' => '上传代码', 'desc' => '提交代码到云端' ],
            [ 'key' => self::SUB_COMPILE, 'name' => '云端编译', 'desc' => '等待云端编译完成' ],
            [ 'key' => self::SUB_DRAFT, 'name' => '获取草稿', 'desc' => '在草稿箱匹配本次版本' ],
            [ 'key' => self::SUB_ADD_TEMPLATE, 'name' => '加入模板库', 'desc' => '草稿添加到模板库' ],
            [ 'key' => self::SUB_GET_TEMPLATE, 'name' => '获取模板ID', 'desc' => '回写模板ID到版本记录' ],
            [ 'key' => self::SUB_CLEAN_OLD, 'name' => '清理旧模板', 'desc' => '删除该套餐的上一版模板' ]
        ];
    }

    /**
     * 子步骤在当前套餐内的完成度（0~1）
     * @param string $step
     * @return float
     */
    protected function subStepProgress(string $step): float
    {
        $order = array_column(self::subStepDefinitions(), 'key');
        $index = array_search($step, $order, true);

        if ($index === false) return 0;

        return $index / count($order);
    }

    /**
     * 步骤定义：每个套餐一个步骤，其下预置「上传流程」子步骤
     *
     * 子步骤必须在这里一并预置（而非只靠 reportSteps 运行时 merge）：
     * 任务创建时即写入整棵「步骤 → 子步骤」树，UI 一开始就能展开 0/6；
     * 否则任务若在第一片就失败/结束（执行器终态不再 merge 上报），子步骤会一条都不落库。
     *
     * @param array $groups
     * @return array
     */
    protected function buildDefinitions(array $groups): array
    {
        $defs = [];
        $seq  = 0;

        foreach (array_values($groups) as $group) {
            $groupId = (int) $group[ 'id' ];
            $parent  = self::stepKey($groupId);

            $defs[] = [
                'key'    => $parent,
                'name'   => '同步 ' . (string) $group[ 'name' ],
                'desc'   => '',
                'weight' => 0, // 进度由 run() 直接给出，步骤不参与加权
                'seq'    => ++$seq
            ];

            // 该套餐的上传流程子步骤：与 reportSteps()/buildSubSteps() 使用同一套 key，便于后续 merge 增量更新
            foreach (self::subStepDefinitions() as $i => $item) {
                $defs[] = [
                    'key'    => $parent . ':' . $item[ 'key' ],
                    'parent' => $parent,
                    'name'   => (string) $item[ 'name' ],
                    'desc'   => (string) $item[ 'desc' ],
                    'weight' => 0, // 子步骤不参与任务总进度
                    'seq'    => $i + 1
                ];
            }
        }

        $defs[] = [
            'key'    => 'commitComplete',
            'name'   => '同步完成',
            'desc'   => '',
            'weight' => 0,
            'seq'    => ++$seq
        ];

        return $defs;
    }

    protected static function stepKey(int $groupId): string
    {
        return 'commit:' . $groupId;
    }

    public function getStepDefinitions(): array
    {
        return $this->buildDefinitions((array) ( $this->state()[ 'groups' ] ?? [] ));
    }

    /**
     * 步骤状态：每个套餐一个步骤，其下展开上传流程的子步骤
     */
    public function reportSteps(): array
    {
        $state = $this->state();
        if (empty($state)) return [];

        $groups      = array_values((array) ( $state[ 'groups' ] ?? [] ));
        $index       = (int) ( $state[ 'index' ] ?? 0 );
        $step        = (string) ( $state[ 'step' ] ?? self::SUB_UPLOAD );
        $done        = array_map('intval', (array) ( $state[ 'done' ] ?? [] ));
        $errors      = (array) ( $state[ 'errors' ] ?? [] );
        $failedSteps = (array) ( $state[ 'failed_step' ] ?? [] );

        $allDone = ( $index >= count($groups) ) && !empty($groups);

        $steps = [];
        foreach ($this->buildDefinitions($groups) as $def) {
            // 只处理顶层步骤（套餐步骤 / 同步完成）；子步骤由 sub 展开，避免被当作顶层步骤重复处理
            if (!empty($def[ 'parent' ])) continue;

            $key = (string) $def[ 'key' ];

            if ($key === 'commitComplete') {
                $failedNum = count($errors);
                $steps[]   = array_merge($def, [
                    'status'   => $allDone ? ($failedNum > 0 ? 'failed' : 'success') : 'pending',
                    'progress' => $allDone && $failedNum === 0 ? 100 : 0,
                    'error'    => $failedNum > 0 ? sprintf('%d 个套餐同步失败，已跳过', $failedNum) : ''
                ]);
                continue;
            }

            $groupId = (int) substr($key, strlen('commit:'));

            if (isset($errors[ $groupId ])) {
                $status  = 'failed';
                $error   = (string) $errors[ $groupId ];
                // 失败发生在哪个子步骤：据此把前序子步骤标成功、当前标失败
                $curStep = (string) ( $failedSteps[ $groupId ] ?? '' );
            } elseif (in_array($groupId, $done, true)) {
                $status  = 'success';
                $error   = '';
                $curStep = '';
            } elseif (!empty($groups[ $index ]) && (int) $groups[ $index ][ 'id' ] === $groupId) {
                $status  = 'running';
                $error   = '';
                $curStep = $step;
            } else {
                $status  = 'pending';
                $error   = '';
                $curStep = '';
            }

            $steps[] = array_merge($def, [
                'status'   => $status,
                'progress' => $status === 'success' ? 100 : 0,
                'error'    => $error,
                'sub'      => $this->buildSubSteps($groupId, $status, $curStep)
            ]);
        }

        return $steps;
    }

    /**
     * 子步骤状态
     *
     * @param int $groupId
     * @param string $parentStatus 套餐步骤的整体状态
     * @param string $curStep 当前进行到的子步骤（仅 running 时有效）
     * @return array
     */
    protected function buildSubSteps(int $groupId, string $parentStatus, string $curStep): array
    {
        $order  = array_column(self::subStepDefinitions(), 'key');
        $curIdx = array_search($curStep, $order, true);

        $sub = [];
        foreach (self::subStepDefinitions() as $i => $item) {
            if ($parentStatus === 'success') {
                $status = 'success';
            } elseif ($parentStatus === 'failed') {
                // 失败发生在 curStep：标 failed，其后的未执行
                $status = $curIdx === false ? 'pending' : ($i === $curIdx ? 'failed' : ($i < $curIdx ? 'success' : 'pending'));
            } elseif ($parentStatus === 'running') {
                $status = $curIdx === false ? 'pending' : ($i < $curIdx ? 'success' : ($i === $curIdx ? 'running' : 'pending'));
            } else {
                $status = 'pending';
            }

            $sub[] = [
                'step_key' => self::stepKey($groupId) . ':' . $item[ 'key' ],
                'parent'   => self::stepKey($groupId),
                'name'     => (string) $item[ 'name' ],
                'desc'     => (string) $item[ 'desc' ],
                'seq'      => $i + 1,
                'weight'   => 0, // 子步骤不参与任务总进度
                'status'   => $status,
                'progress' => $status === 'success' ? 100 : 0
            ];
        }

        return $sub;
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
                'events'     => [ [ 'level' => 'warning', 'text' => '模板库同步任务已被取消' ] ]
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
        $this->clear();
    }

    public function snapshotState(): array
    {
        return $this->state();
    }

    /**
     * 快照附加信息：记录云端编译任务标识（state.task_key 即 uploadWeapp 返回的云端 key），
     * 供详情页追溯云端侧任务
     */
    public function snapshotMeta(): array
    {
        $key = (string) ( $this->state()[ 'task_key' ] ?? '' );
        if ($key === '' && $this->taskKey !== '') {
            try {
                $snap = TaskLogger::loadSnapshot(TaskLogger::taskFile($this->getType(), $this->taskKey));
                $key  = (string) ( $snap[ 'handler_state' ][ 'task_key' ] ?? '' );
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
}

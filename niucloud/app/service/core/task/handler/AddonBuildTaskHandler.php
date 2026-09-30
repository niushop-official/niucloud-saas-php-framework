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

use app\dict\sys\CloudBuildDict;
use app\dict\sys\TaskDict;
use app\service\core\addon\CoreAddonDevelopBuildService;
use app\service\core\addon\CoreAddonService;
use app\service\core\niucloud\CoreCloudBuildService;
use core\exception\CommonException;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTracker;
use core\task\TaskStepTrait;
use think\facade\Cache;

/**
 * 插件打包任务处理器（批量）
 *
 * 单次打包仍走原有的「打包 + 直接下载」接口（同步、即时）；
 * 批量打包由于插件多、耗时长，统一走任务模型：每次 run() 只打包一个插件，
 * 避免单次请求长时间阻塞，并能在任务详情看到逐项进度与失败原因。
 *
 * 状态放在 Cache 中（与备份/升级任务同套路），任务结束后清理。
 */
class AddonBuildTaskHandler implements TaskHandlerInterface
{
    use TaskStepTrait;

    /**
     * 插件清单缓存的有效期（秒）
     *
     * 清单与运行时进度分开存：进度在任务结束后即可清除，
     * 清单需要保留一段时间，否则任务详情回看时「每个插件一个步骤」的树会整棵消失。
     */
    const MANIFEST_TTL = 86400;

    /** 当前任务标识（由 TaskExecutor 注入） */
    protected string $taskKey = '';

    /** 云编译阶段的游标（幂等依据） */
    const CURSOR_CLOUD = 'cloud_build';

    /** 云编译步骤标识 */
    const STEP_CLOUD_BUILD = 'cloud_build';

    public function getType(): string
    {
        return TaskDict::TYPE_ADDON_BUILD;
    }

    /**
     * 任务状态缓存键
     * @param string $taskKey
     * @return string
     */
    protected static function cacheKey(string $taskKey): string
    {
        return 'addon_build_task_' . $taskKey;
    }

    /**
     * 插件清单缓存键
     * @param string $taskKey
     * @return string
     */
    protected static function manifestKey(string $taskKey): string
    {
        return 'addon_build_manifest_' . $taskKey;
    }

    /**
     * 读取任务状态（运行时进度，任务结束后清除）
     * @return array
     */
    protected function state(): array
    {
        if ($this->taskKey === '') return [];
        $state = Cache::get(self::cacheKey($this->taskKey));
        return is_array($state) ? $state : [];
    }

    /**
     * 读取插件清单（含已完成的插件与失败插件，任务结束后保留）
     * @return array
     */
    protected function manifest(): array
    {
        if ($this->taskKey === '') return [];
        $data = Cache::get(self::manifestKey($this->taskKey));
        return is_array($data) ? $data : [];
    }

    /**
     * 写入插件清单
     * @param array $manifest
     * @return void
     */
    protected function saveManifest(array $manifest): void
    {
        if ($this->taskKey === '') return;
        Cache::set(self::manifestKey($this->taskKey), $manifest, self::MANIFEST_TTL);
    }

    /**
     * 清理运行时进度
     *
     * 只清进度缓存，插件清单（manifest）独立存放并保留，
     * 这样任务结束后任务详情仍能按「每个插件一个步骤」回看整棵步骤树。
     *
     * @return void
     */
    protected function clear(): void
    {
        if ($this->taskKey === '') return;
        Cache::delete(self::cacheKey($this->taskKey));
    }

    public function create(array $params): array
    {
        $addons = array_values(array_filter(array_map('strval', (array) ( $params[ 'addon' ] ?? [] ))));
        if (empty($addons)) throw new CommonException('TASK_CREATE_FAIL');

        $key = uniqid();

        // 立即绑定任务标识：TaskExecutor 紧接着会调用 getStepDefinitions() 预置步骤树，
        // 此时若 taskKey 为空则读不到插件清单，步骤树会退化成只有「打包完成」一步
        $this->taskKey = $key;

        // 是否需要先云编译：开启时先走云编译（只下载不部署），再从产物中提取插件编译产物
        $withCloud   = !empty($params[ 'is_cloud_build' ]);
        $cloudKey    = '';
        $cloudParams = [];
        $cloudPorts  = [];

        if ($withCloud) {
            $cloudParams = $this->cloudBuildParams($params, $addons);
            $cloudPorts  = array_values((array) ( $cloudParams[ 'port' ] ?? [] ));

            $service  = new CoreCloudBuildService();
            $build    = $service->cloudBuild($cloudParams);
            $cloudKey = (string) ( $build[ 'task_key' ] ?? '' );
            if ($cloudKey === '') throw new CommonException('TASK_CREATE_FAIL');
        }

        Cache::set(self::cacheKey($key), [
            'key'         => $key,
            'addons'      => $addons,
            'index'       => 0,
            'done'        => [],
            'cloud'       => $withCloud ? 1 : 0,
            'cloud_key'   => $cloudKey,
            'cloud_ports' => $cloudPorts,
            'cloud_done'  => 0
        ]);

        // 插件清单：任务结束后仍需保留，用于回看每个插件对应的步骤与错误信息
        Cache::set(self::manifestKey($key), [
            'addons'      => $addons,
            'done'        => [],
            'errors'      => [],
            'cloud'       => $withCloud ? 1 : 0,
            'cloud_ports' => $cloudPorts,
            'cloud_done'  => 0
        ], self::MANIFEST_TTL);

        $title = count($addons) > 1 ? '插件打包-' . count($addons) . '个插件' : '插件打包-' . $addons[ 0 ];

        return [
            'task_key' => $key,
            'title'    => $withCloud ? $title . '（含云编译）' : $title,
            'params'   => array_merge($params, [ 'addon' => $addons ])
        ];
    }

    /**
     * 打包场景的云编译入参：只编译被打包的插件，编译 admin / wap / mp-weixin / web 各端，
     * 只下载产物不做部署（打包从下载目录提取产物，避免覆盖本地 public）
     *
     * @param array $params 打包任务入参
     * @param array $addons 插件清单
     * @return array
     */
    protected function cloudBuildParams(array $params, array $addons): array
    {
        $ports = (array) ( $params[ 'port' ] ?? [] );
        $ports = array_values(array_filter(array_map('strval', $ports)));

        // 未显式指定端口时：admin / wap(h5) / 微信小程序 / web 全端编译
        if (empty($ports)) {
            $ports = [
                CloudBuildDict::PORT_ADMIN,
                CloudBuildDict::PORT_H5,
                CloudBuildDict::PORT_MP_WEIXIN,
                CloudBuildDict::PORT_WEB
            ];
        }

        // 插件自定义端口：一并编译（去重后合并）
        foreach ($addons as $addon) {
            foreach ($this->customPortsOf($addon) as $port) {
                if (!in_array($port, $ports, true)) $ports[] = $port;
            }
        }

        return [
            'scope'      => CloudBuildDict::SCOPE_PLUGIN, // 只编译被打包的插件
            'addon'      => $addons,
            'port'       => $ports,
            'deploy'     => false,                        // 不部署：产物只用于打包提取
            'checkLocal' => $params[ 'checkLocal' ] ?? true
        ];
    }

    /**
     * 插件声明的自定义编译端口（无自定义端口时返回空数组）
     * @param string $addon
     * @return array
     */
    protected function customPortsOf(string $addon): array
    {
        try {
            $config = ( new CoreAddonService() )->getAddonConfig($addon);
        } catch (\Throwable $e) {
            return [];
        }

        $ports = [];
        foreach ((array) ( $config[ 'port' ] ?? [] ) as $port) {
            $key = is_array($port) ? (string) ( $port[ 'key' ] ?? '' ) : (string) $port;
            if ($key !== '') $ports[] = $key;
        }

        return $ports;
    }

    public function bindTask(string $taskKey): void
    {
        if ($taskKey !== '') $this->taskKey = $taskKey;
    }

    public function run(string $cursor): array
    {
        $state = $this->state();

        // 状态不存在 => 已结束（完成 / 被清除）
        if (empty($state)) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '打包完成',
                'cursor'     => ''
            ];
        }

        // 云编译阶段：先编译（只下载产物），再从产物中提取插件编译产物
        if (!empty($state[ 'cloud' ]) && empty($state[ 'cloud_done' ])) {
            return $this->runCloudBuild($state);
        }

        $addons = array_values((array) ( $state[ 'addons' ] ?? [] ));
        $index  = (int) ( $state[ 'index' ] ?? 0 );
        $total  = count($addons);

        if ($index >= $total) {
            $this->clear();
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => '打包完成',
                'cursor'     => ''
            ];
        }

        $current = (string) $addons[ $index ];

        try {
            ( new CoreAddonDevelopBuildService() )->build($current);

            if ($this->collectArtifact($current)) {
                $state[ 'done' ][] = $current;
                $events            = [ [ 'level' => 'info', 'text' => '插件打包完成：' . $current ] ];
            } else {
                // build() 未抛异常但没产出 zip（压缩失败会被静默吞掉）：
                // 按失败处理，避免步骤显示成功却在产物里找不到包
                $state[ 'errors' ][ $current ] = '打包未生成安装文件';
                $events                        = [ [ 'level' => 'error', 'text' => '插件打包未生成安装文件，已跳过：' . $current ] ];
            }
        } catch (\Throwable $e) {
            // 单个插件打包失败：记下错误信息后跳过，继续打包剩余插件。
            // 一个插件有问题不应让整批中断，否则前面已经打好的包也白做了。
            $message                     = (string) $e->getMessage();
            $state[ 'errors' ][ $current ] = $message;
            $events                      = [ [ 'level' => 'error', 'text' => '插件打包失败，已跳过：' . $current . '（' . $message . '）' ] ];
        }

        $state[ 'index' ] = $index + 1;
        Cache::set(self::cacheKey($this->taskKey), $state);

        // 清单同步：任务结束时进度缓存会被清除，步骤树与错误信息靠清单回看
        $manifest           = $this->manifest();
        $manifest[ 'done' ]   = array_values((array) ( $state[ 'done' ] ?? [] ));
        $manifest[ 'errors' ] = (array) ( $state[ 'errors' ] ?? [] );
        $this->saveManifest($manifest);

        if ($state[ 'index' ] >= $total) {
            $this->clear();
            return $this->finish($addons, $events);
        }

        // 进度：含云编译时，云编译占前 50%，打包阶段占后 50%
        $percent = empty($state[ 'cloud' ])
            ? (int) floor($state[ 'index' ] / $total * 100)
            : 50 + (int) floor($state[ 'index' ] / $total * 50);

        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => $percent,
            'stage'    => sprintf('正在打包插件（%d/%d）', $state[ 'index' ], $total),
            'cursor'   => (string) $state[ 'index' ],
            'events'   => $events
        ];
    }

    // ==================== 云编译阶段 ====================

    /**
     * 推进云编译：反复驱动 CoreCloudBuildService，直到云端编译完成 / 失败
     *
     * 云端编译失败即终止本次打包任务（打包依赖云端产物，没有产物继续打包没有意义）。
     * 编译成功后从下载目录提取插件各端产物到本地编译输出目录，随后进入打包阶段。
     *
     * @param array $state 运行时进度
     * @return array
     */
    protected function runCloudBuild(array $state): array
    {
        $service  = new CoreCloudBuildService();
        $cloudKey = (string) ( $state[ 'cloud_key' ] ?? '' );
        $addons   = array_values((array) ( $state[ 'addons' ] ?? [] ));

        // 直接复用云编译任务处理器推进：云端日志解析、上传/下载进度、失败判定与它完全一致，
        // 打包只需把「云编译期间的日志与进度」透传到本任务的终端，并在结束后提取产物
        $handler = new CloudBuildTaskHandler();
        $handler->bindTask($cloudKey);

        try {
            $res = $handler->run(self::CURSOR_CLOUD);
        } catch (\Throwable $e) {
            return [
                'status'   => TaskDict::STATUS_WAITING_INPUT,
                'progress' => (int) floor((int) ( $service->getBuildTask()[ 'progress' ] ?? 0 ) / 2),
                'stage'    => '云编译异常',
                'cursor'   => self::CURSOR_CLOUD,
                'events'   => [ [ 'level' => 'error', 'text' => '云编译过程异常：' . $e->getMessage() ] ],
                'actions'  => [
                    [ 'code' => TaskDict::ACTION_RETRY, 'label' => '重试', 'style' => 'primary' ],
                    [ 'code' => TaskDict::ACTION_CANCEL, 'label' => '取消任务', 'style' => 'danger' ]
                ]
            ];
        }

        $status = (string) ( $res[ 'status' ] ?? TaskDict::STATUS_RUNNING );

        // 云编译失败：终止本次打包（打包依赖云端产物）
        if ($status === TaskDict::STATUS_FAILED) {
            $reason = (string) ( $res[ 'fail_reason' ][ 'Message' ] ?? '云编译失败' );

            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'progress'    => 100,
                'stage'       => '云编译失败',
                'cursor'      => '',
                'events'      => array_merge((array) ( $res[ 'events' ] ?? [] ), [
                    [ 'level' => 'error', 'text' => '云编译失败，已终止打包' ]
                ]),
                'fail_reason' => [ 'Message' => '失败原因：' . $reason ]
            ];
        }

        // 网络类异常：交由用户决策（重试 / 取消）
        if ($status === TaskDict::STATUS_WAITING_INPUT) {
            return [
                'status'   => TaskDict::STATUS_WAITING_INPUT,
                'progress' => (int) floor((int) ( $res[ 'progress' ] ?? 0 ) / 2),
                'stage'    => '云编译异常',
                'cursor'   => self::CURSOR_CLOUD,
                'events'   => (array) ( $res[ 'events' ] ?? [] ),
                'actions'  => [
                    [ 'code' => TaskDict::ACTION_RETRY, 'label' => '重试', 'style' => 'primary' ],
                    [ 'code' => TaskDict::ACTION_CANCEL, 'label' => '取消任务', 'style' => 'danger' ]
                ]
            ];
        }

        // 仍在编译：透传云端日志与进度（云编译占整体进度前 50%）
        if ($status !== TaskDict::STATUS_SUCCESS) {
            return [
                'status'   => TaskDict::STATUS_RUNNING,
                'progress' => (int) floor((int) ( $res[ 'progress' ] ?? 0 ) / 2),
                'stage'    => (string) ( $res[ 'stage' ] ?? '云端编译中' ),
                'cursor'   => self::CURSOR_CLOUD,
                'events'   => (array) ( $res[ 'events' ] ?? [] )
            ];
        }

        // 编译已结束：提取插件产物
        $dir = $cloudKey !== '' ? $service->downloadDir($cloudKey) : '';
        if ($dir === '' || !is_dir($dir)) {
            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'progress'    => 100,
                'stage'       => '云编译产物缺失',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'error', 'text' => '未获取到云编译产物，已终止打包' ] ],
                'fail_reason' => [ 'Message' => '失败原因：未获取到云编译产物' ]
            ];
        }

        $result = $service->extractAddonDist($dir, $addons);
        if (empty($result[ 'synced' ])) {
            return [
                'status'      => TaskDict::STATUS_FAILED,
                'end_reason'  => TaskDict::END_REASON_FAILED,
                'progress'    => 100,
                'stage'       => '云编译产物提取失败',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'error', 'text' => '云编译产物中没有本次打包插件的编译结果，已终止打包' ] ],
                'fail_reason' => [ 'Message' => '失败原因：云编译产物缺少插件编译结果（' . implode('、', (array) $result[ 'missing' ]) . '）' ]
            ];
        }

        // 标记云编译完成，进入打包阶段
        $state[ 'cloud_done' ] = 1;
        Cache::set(self::cacheKey($this->taskKey), $state);

        $manifest             = $this->manifest();
        $manifest[ 'cloud_done' ] = 1;
        $this->saveManifest($manifest);

        $missing = (array) ( $result[ 'missing' ] ?? [] );
        $events  = [ [ 'level' => 'info', 'text' => '云编译完成，已提取插件编译产物：' . implode('、', (array) $result[ 'synced' ]) ] ];
        if (!empty($missing)) {
            $events[] = [ 'level' => 'warning', 'text' => '以下插件未在云编译产物中找到编译结果，将使用本地已有产物打包：' . implode('、', $missing) ];
        }

        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => 50,
            'stage'    => '云编译完成，开始打包',
            'cursor'   => self::CURSOR_CLOUD,
            'events'   => $events
        ];
    }

    /**
     * 本次云编译的端口清单（预置子步骤与状态上报共用）
     * @return array
     */
    protected function cloudPorts(): array
    {
        $ports = (array) ( $this->manifest()[ 'cloud_ports' ] ?? [] );
        if (!empty($ports)) return array_values(array_map('strval', $ports));

        return array_values(array_map('strval', (array) ( $this->state()[ 'cloud_ports' ] ?? [] )));
    }

    /**
     * 云编译端口子步骤标识（与 CloudBuildTaskHandler::portStepKey 保持一致）
     * @param string $port
     * @return string
     */
    protected static function cloudPortStepKey(string $port): string
    {
        return CloudBuildTaskHandler::portStepKey($port);
    }

    /**
     * 云编译端口子步骤名称
     * @param string $port
     * @return string
     */
    protected static function cloudPortStepName(string $port): string
    {
        $labels = [
            CloudBuildDict::PORT_ADMIN     => '管理端 admin',
            CloudBuildDict::PORT_H5        => '移动端 wap',
            CloudBuildDict::PORT_MP_WEIXIN => '微信小程序',
            CloudBuildDict::PORT_WEB       => 'PC 端 web'
        ];

        return $labels[ $port ] ?? $port;
    }

    /**
     * 云编译步骤的子步骤（与云编译任务完全对齐）
     *
     * 直接复用 CloudBuildTaskHandler 的步骤上报：主干步骤（发起 / 提交 / 获取日志 / 下载）
     * 与各端口步骤（含端口内进度）都会带过来，统一挂到「云编译」步骤下。
     * 打包场景不部署，故跳过其部署步骤。
     *
     * @param bool $cloudDone 云编译是否已结束
     * @return array
     */
    protected function cloudSubSteps(bool $cloudDone): array
    {
        $defs = $this->cloudSubDefinitions();

        if ($cloudDone) {
            // 编译已结束（云端缓存已清）：子步骤统一置为成功
            return array_map(function (array $sub) {
                $sub[ 'status' ]   = TaskStepTracker::STATUS_SUCCESS;
                $sub[ 'progress' ] = 100;
                return $sub;
            }, $defs);
        }

        // 云端编译任务已被清理（编译刚结束、产物提取中）：保持定义不变，由 cloudDone 分支收尾
        $task = $this->cloudTask();
        if (empty($task)) return $defs;

        // 主干步骤顺序（部署步骤在打包场景不使用，故不在此列）
        $order = [
            CloudBuildTaskHandler::STEP_START,
            CloudBuildTaskHandler::STEP_SUBMIT,
            CloudBuildTaskHandler::STEP_LOG,
            CloudBuildTaskHandler::STEP_DOWNLOAD
        ];

        [ $index, $percent ] = $this->cloudPhaseIndex($task);
        $portStatus          = $this->cloudPortStatusMap($task);

        foreach ($defs as &$sub) {
            $key = (string) ( $sub[ 'step_key' ] ?? '' );
            $raw = substr($key, strlen(self::STEP_CLOUD_BUILD) + 1); // 去掉「cloud_build:」前缀

            // 端口子步骤：port:{端口} —— 状态取自云端 main 中该端口的编译状态
            if (strpos($raw, 'port:') === 0) {
                $status = $portStatus[ substr($raw, 5) ] ?? TaskStepTracker::STATUS_PENDING;

                $sub[ 'status' ]   = $status;
                $sub[ 'progress' ] = $status === TaskStepTracker::STATUS_SUCCESS ? 100 : 0;
                continue;
            }

            $pos = array_search($raw, $order, true);
            if ($pos === false) continue;

            if ($pos < $index) {
                $sub[ 'status' ]   = TaskStepTracker::STATUS_SUCCESS;
                $sub[ 'progress' ] = 100;
            } elseif ($pos === $index) {
                $sub[ 'status' ]   = TaskStepTracker::STATUS_RUNNING;
                $sub[ 'progress' ] = $percent;
            } else {
                $sub[ 'status' ]   = TaskStepTracker::STATUS_PENDING;
                $sub[ 'progress' ] = 0;
            }
        }
        unset($sub);

        return $defs;
    }

    /**
     * 云端编译当前阶段：返回 [进行中的主干步骤下标, 该步骤内进度]
     *
     * 阶段划分与 CloudBuildTaskHandler 一致：
     * packaging(0) -> uploading(1) -> compiling(2) -> downloading(3)
     *
     * @param array $task build_task
     * @return array
     */
    protected function cloudPhaseIndex(array $task): array
    {
        $phase = (string) ( $task[ 'phase' ] ?? '' );

        switch ($phase) {
            case 'uploading':
                $total = max(1, (int) ( $task[ 'total_chunk' ] ?? 1 ));
                $done  = (int) ( $task[ 'chunk' ] ?? 0 );

                return [ 1, (int) floor(min(1, $done / $total) * 100) ];

            case 'compiling':
                return [ 2, (int) ( $task[ 'progress' ] ?? 0 ) ];

            case 'downloading':
                $length = (int) ( $task[ 'length' ] ?? 0 );
                $offset = (int) ( $task[ 'offset' ] ?? 0 );

                return [ 3, $length > 0 ? (int) floor(min(1, $offset / $length) * 100) : 0 ];

            default: // packaging / 未知
                return [ 0, 0 ];
        }
    }

    /**
     * 云端各端口的编译状态（main 中 type=port 的条目）
     * @param array $task build_task
     * @return array 端口 => 步骤状态
     */
    protected function cloudPortStatusMap(array $task): array
    {
        $map = [];

        foreach ((array) ( $task[ 'main' ] ?? [] ) as $item) {
            if ((string) ( $item[ 'type' ] ?? '' ) !== 'port') continue;

            $key = (string) ( $item[ 'port_key' ] ?? '' ) !== ''
                ? (string) $item[ 'port_key' ]
                : str_replace('port_', '', (string) ( $item[ 'id' ] ?? '' ));
            if ($key === '') continue;

            $status = strtolower((string) ( $item[ 'status' ] ?? '' ));
            if (in_array($status, [ 'completed', 'success' ], true)) {
                $map[ $key ] = TaskStepTracker::STATUS_SUCCESS;
            } elseif (in_array($status, [ 'failed', 'fail' ], true)) {
                $map[ $key ] = TaskStepTracker::STATUS_FAILED;
            } elseif (in_array($status, [ 'running', 'in_progress' ], true)) {
                $map[ $key ] = TaskStepTracker::STATUS_RUNNING;
            } else {
                $map[ $key ] = TaskStepTracker::STATUS_PENDING;
            }
        }

        return $map;
    }

    /**
     * 云编译子步骤的静态定义（任务创建时预置 + 上报缺失时兜底）
     * @return array
     */
    protected function cloudSubDefinitions(): array
    {
        $defs = [
            [ 'key' => CloudBuildTaskHandler::STEP_START, 'name' => '发起云编译', 'desc' => '打包源码并生成编译压缩包' ],
            [ 'key' => CloudBuildTaskHandler::STEP_SUBMIT, 'name' => '提交云编译任务', 'desc' => '源码上传完成并已提交编译任务' ],
            [ 'key' => CloudBuildTaskHandler::STEP_LOG, 'name' => '获取编译日志', 'desc' => '云端编译进行中' ]
        ];

        // 各端口编译发生在「获取编译日志」阶段内，排在「编译任务完成」（下载产物）之前
        foreach ($this->cloudPorts() as $port) {
            $defs[] = [
                'key'  => CloudBuildTaskHandler::portStepKey($port),
                'name' => self::cloudPortStepName($port),
                'desc' => '云端编译（展示云端执行明细）'
            ];
        }

        $defs[] = [ 'key' => CloudBuildTaskHandler::STEP_DOWNLOAD, 'name' => '编译任务完成', 'desc' => '下载编译产物' ];

        $subs = [];
        foreach ($defs as $i => $def) {
            $subs[] = [
                'step_key'     => self::STEP_CLOUD_BUILD . ':' . $def[ 'key' ],
                'name'         => (string) $def[ 'name' ],
                'desc'         => (string) ( $def[ 'desc' ] ?? '' ),
                'seq'          => $i + 1,
                'status'       => TaskStepTracker::STATUS_PENDING,
                'progress'     => 0,
                'need_execute' => 0
            ];
        }

        return $subs;
    }

    /**
     * 云端编译任务（build_task）；已结束（缓存清理）时返回空数组
     * @return array
     */
    protected function cloudTask(): array
    {
        try {
            $task = ( new CoreCloudBuildService() )->getBuildTask();
        } catch (\Throwable $e) {
            return [];
        }

        return is_array($task) ? $task : [];
    }

    /**
     * 收尾：全部插件过一遍后给出终态
     *
     * 只要有一个插件打包失败就判整轮失败（确实没全部打成），
     * 但成功的包已经产出，失败原因逐条带回，便于定位是哪个插件、为什么失败。
     *
     * @param array $addons 插件清单
     * @param array $events 最后一个插件产生的事件
     * @return array
     */
    protected function finish(array $addons, array $events): array
    {
        $manifest = $this->manifest();
        $errors   = (array) ( $manifest[ 'errors' ] ?? [] );
        $failed   = count($errors);
        $success  = max(0, count($addons) - $failed);

        if ($failed <= 0) {
            return [
                'status'     => TaskDict::STATUS_SUCCESS,
                'end_reason' => TaskDict::END_REASON_COMPLETED,
                'progress'   => 100,
                'stage'      => $success > 1 ? sprintf('打包完成（%d 个插件）', $success) : '打包完成',
                'cursor'     => '',
                'events'     => $events
            ];
        }

        $detail = [];
        foreach ($errors as $addon => $message) {
            $detail[] = '插件 ' . $addon . ' 打包失败：' . (string) $message;
        }

        return [
            'status'      => TaskDict::STATUS_FAILED,
            'end_reason'  => TaskDict::END_REASON_FAILED,
            'progress'    => 100,
            'stage'       => sprintf('打包完成（%d 成功 / %d 失败）', $success, $failed),
            'cursor'      => '',
            'events'      => $events,
            'fail_reason' => [ 'Message' => '失败原因：' . implode('；', $detail) ]
        ];
    }

    // ==================== 产物 ====================

    /**
     * 任务产物目录
     *
     * 与 TaskService::artifactLocation() 保持同一口径。
     *
     * @param string $taskKey
     * @return string 任务标识为空时返回空串
     */
    public static function artifactDirOf(string $taskKey): string
    {
        if ($taskKey === '') return '';

        return task_runtime_path() . 'addon_build' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR;
    }

    /**
     * 当前任务的产物目录
     * @return string
     */
    protected function artifactDir(): string
    {
        return self::artifactDirOf($this->taskKey);
    }

    /**
     * 把打包产物收进任务产物目录
     *
     * build() 的产物固定落在 runtime/{addon}.zip，多个任务打包同一插件会互相覆盖，
     * 故这里按任务归拢到独立目录，任务详情的「相关产物」即可逐个列出与下载。
     *
     * @param string $addon
     * @return bool 产物是否已归拢成功
     */
    protected function collectArtifact(string $addon): bool
    {
        $src = task_runtime_path() . $addon . '.zip';
        if (!is_file($src)) return false;

        $dir = $this->artifactDir();
        if ($dir === '') return false;

        if (!is_dir($dir)) dir_mkdir($dir);
        if (!is_dir($dir)) return false;

        $dst = $dir . $addon . '.zip';
        if (is_file($dst)) @unlink($dst);

        // 跨分区时 rename 可能失败，退化成复制
        if (!@rename($src, $dst) && !@copy($src, $dst)) return false;

        @unlink($src);

        return is_file($dst);
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
                'events'     => [ [ 'level' => 'warning', 'text' => '插件打包任务已被取消' ] ]
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

    public function restoreState(array $state): void
    {
        if ($this->taskKey === '' || empty($state)) return;
        Cache::set(self::cacheKey($this->taskKey), $state);
    }

    // ==================== 步骤 ====================

    /**
     * 步骤定义：每个插件一个「打包」步骤 + 末尾「打包完成」
     *
     * weight 统一为 0：进度由 run() 的 progress 直接给出（按已完成插件数 / 总数），
     * 避免按步骤加权时出现除不尽或权重随插件数变化的问题。
     *
     * @param array $addons
     * @return array
     */
    protected function buildDefinitions(array $addons): array
    {
        $defs  = [];
        $seq   = 0;
        $cloud = (int) ( $this->manifest()[ 'cloud' ] ?? ( $this->state()[ 'cloud' ] ?? 0 ) ) === 1;

        // 需要云编译时：云编译作为第一个步骤（产物提取完成后才进入打包），
        // 其下按端口预置子步骤，云端编译期间可看到各端的编译状态
        if ($cloud) {
            $seq++;
            $defs[] = [
                'key'      => self::STEP_CLOUD_BUILD,
                'step_key' => self::STEP_CLOUD_BUILD,
                'name'     => '云编译',
                'desc'     => '云端编译本次打包的插件并提取编译产物',
                'weight'   => 0,
                'seq'      => $seq
            ];

            // 云编译的子步骤：主干步骤（发起/提交/获取日志/下载） + 各端口
            foreach ($this->cloudSubDefinitions() as $sub) {
                $defs[] = [
                    'key'          => (string) $sub[ 'step_key' ],
                    'step_key'     => (string) $sub[ 'step_key' ],
                    'parent'       => self::STEP_CLOUD_BUILD,
                    'name'         => (string) $sub[ 'name' ],
                    'desc'         => (string) ( $sub[ 'desc' ] ?? '' ),
                    'weight'       => 0,
                    'seq'          => (int) $sub[ 'seq' ],
                    'is_show'      => 1,
                    'need_execute' => 0 // 由云端执行，不参与任务总进度
                ];
            }
        }

        foreach (array_values($addons) as $addon) {
            $seq++;
            $key    = self::buildStepKey((string) $addon);
            $defs[] = [
                'key'      => $key,
                // 步骤上报契约使用 step_key（TaskStepTracker::merge 按它匹配），定义里额外带上，
                // 保证 reportSteps() 直接回传定义时能被正确合并（否则中间过程的状态会被整体丢弃）
                'step_key' => $key,
                'name'     => '打包 ' . $addon,
                'desc'     => '',
                'weight'   => 0,
                'seq'      => $seq
            ];
        }

        $seq++;
        $defs[] = [
            'key'      => 'buildComplete',
            'step_key' => 'buildComplete',
            'name'     => '打包完成',
            'desc'     => '',
            'weight'   => 0,
            'seq'      => $seq
        ];

        return $defs;
    }

    /**
     * 单个插件的打包步骤标识
     * @param string $addon
     * @return string
     */
    protected static function buildStepKey(string $addon): string
    {
        return 'build:' . $addon;
    }

    public function getStepDefinitions(): array
    {
        $addons = (array) ( $this->manifest()[ 'addons' ] ?? [] );

        // 清单已过期则回退运行时进度，保证任务进行中步骤树始终可用
        if (empty($addons)) $addons = (array) ( $this->state()[ 'addons' ] ?? [] );

        return $this->buildDefinitions($addons);
    }

    /**
     * 一个插件 = 一个步骤
     *
     * 步骤状态取自插件清单（任务结束后仍在），进行中的那一步取自运行时进度：
     * - failed  打包失败的插件（整轮在此中断）
     * - success 已打包完成
     * - running 正在打包（仅任务进行中存在）
     * - pending 排队中
     */
    public function reportSteps(): array
    {
        $manifest = $this->manifest();
        if (empty($manifest)) return [];

        $addons = array_values((array) ( $manifest[ 'addons' ] ?? [] ));
        if (empty($addons)) return [];

        $done   = array_values((array) ( $manifest[ 'done' ] ?? [] ));
        $errors = (array) ( $manifest[ 'errors' ] ?? [] );

        // 正在打包的插件：只有任务进行中（进度缓存还在）才有
        $state  = $this->state();
        $cursor = empty($state) ? -1 : (int) ( $state[ 'index' ] ?? -1 );
        $cloud  = (int) ( $manifest[ 'cloud' ] ?? 0 ) === 1;
        $cloudDone = (int) ( $manifest[ 'cloud_done' ] ?? 0 ) === 1;

        $allDone = count($done) + count($errors) >= count($addons);

        $steps = [];
        foreach ($this->buildDefinitions($addons) as $def) {
            $key = (string) $def[ 'key' ];

            // 子步骤（parent 指向云编译）已随父步骤的 sub 数组上报，不能再作为顶层步骤上报：
            // 否则它们在 merge 时排在父步骤之后，会把 sub 刚写入的正确状态覆盖回 pending，
            // 表现为「云编译下的子步骤进度一直不变」（直到任务终态被 finishPending 收敛）
            if (!empty($def[ 'parent' ])) continue;

            // 云编译步骤：完成 / 进行中；子步骤与云编译任务一致（主干步骤 + 各端口）
            if ($key === self::STEP_CLOUD_BUILD) {
                // 子步骤推导失败不影响顶层步骤上报（否则整个 reportSteps 失败会导致所有步骤都不更新）
                try {
                    $sub = $this->cloudSubSteps($cloudDone);
                } catch (\Throwable $e) {
                    $sub = $this->cloudSubDefinitions();
                }

                $steps[] = array_merge($def, [
                    'status'   => $cloudDone ? 'success' : 'running',
                    'progress' => $cloudDone ? 100 : (int) ( $this->cloudTask()[ 'progress' ] ?? 0 ),
                    'error'    => '',
                    'sub'      => $sub
                ]);
                continue;
            }

            // 收尾步骤：全部打包成功才算完成，有失败则标出数量
            if ($key === 'buildComplete') {
                $failedNum = count($errors);
                $steps[]   = array_merge($def, [
                    'status'   => $failedNum > 0 ? 'failed' : ($allDone ? 'success' : 'pending'),
                    'progress' => $failedNum === 0 && $allDone ? 100 : 0,
                    'error'    => $failedNum > 0 ? sprintf('%d 个插件打包失败，已跳过', $failedNum) : ''
                ]);
                continue;
            }

            $addon = substr($key, strlen('build:'));

            // 打包失败的插件：带上具体错误信息，便于直接定位
            if (isset($errors[ $addon ])) {
                $steps[] = array_merge($def, [ 'status' => 'failed', 'progress' => 0, 'error' => (string) $errors[ $addon ] ]);
            } elseif (in_array($addon, $done, true)) {
                $steps[] = array_merge($def, [ 'status' => 'success', 'progress' => 100, 'error' => '' ]);
            } elseif ($cursor >= 0 && $addon === (string) ( $addons[ $cursor ] ?? '' )) {
                $steps[] = array_merge($def, [ 'status' => 'running', 'progress' => 0, 'error' => '' ]);
            } else {
                $steps[] = array_merge($def, [ 'status' => 'pending', 'progress' => 0, 'error' => '' ]);
            }
        }

        return $steps;
    }
}

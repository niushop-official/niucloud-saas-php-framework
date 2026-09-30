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
use app\service\core\niucloud\CoreBuildVersionService;
use app\service\core\niucloud\CoreCloudBuildService;
use core\task\TaskHandlerInterface;
use core\task\TaskStepTrait;
use think\facade\Cache;

/**
 * 云编译任务处理器（适配器）
 * 仅做统一任务模型与 CoreCloudBuildService 之间的入参/出参适配，业务流程不改写。
 */
class CloudBuildTaskHandler implements TaskHandlerInterface
{
    use TaskStepTrait;

    /**
     * 已输出过的日志行去重缓存键
     * @var string
     */
    protected string $emittedKey = '';

    protected string $taskKey = '';

    /**
     * 绑定当前任务标识（由 TaskExecutor 在 run/operate 前注入）
     * @param string $taskKey
     * @return void
     */
    public function bindTask(string $taskKey): void
    {
        if ($taskKey !== '') $this->taskKey = $taskKey;
    }

    /**
     * 本次编译的端口（任务创建阶段即确定，用于预置端口步骤）
     * @var array
     */
    protected array $ports = [];

    /**
     * 云编译固定步骤（与业务一一对应）
     * 1 发起云编译（打包源码并生成编译压缩包）
     * 2 提交云编译任务（源码上传完成并已提交编译任务）
     * 3 获取编译日志（编译任务进行中）
     * 4 编译任务完成（下载编译产物）
     * 5 编译任务完成（编译产物部署）
     */
    const STEP_START    = 'start_build';
    const STEP_SUBMIT   = 'submit_build';
    const STEP_LOG      = 'get_build_log';
    const STEP_DOWNLOAD = 'download_build';
    const STEP_DEPLOY   = 'deploy_build';

    public function getType(): string
    {
        return TaskDict::TYPE_CLOUD_BUILD;
    }

    public function getStepDefinitions(): array
    {
        $defs = [
            [ 'key' => self::STEP_START, 'name' => '发起云编译', 'desc' => '打包源码并生成编译压缩包', 'weight' => 20, 'seq' => 1, 'is_show' => 1 ],
            [ 'key' => self::STEP_SUBMIT, 'name' => '提交云编译任务', 'desc' => '源码上传完成并已提交编译任务', 'weight' => 20, 'seq' => 2, 'is_show' => 1 ],
            [ 'key' => self::STEP_LOG, 'name' => '获取编译日志', 'desc' => '编译任务进行中', 'weight' => 25, 'seq' => 3, 'is_show' => 0],
            [ 'key' => self::STEP_DOWNLOAD, 'name' => '编译任务完成', 'desc' => '编译任务完成下载编译产物', 'weight' => 20, 'seq' => 4, 'is_show' => 1 ],
            [ 'key' => self::STEP_DEPLOY, 'name' => '编译产物部署', 'desc' => '编译产物部署', 'weight' => 15, 'seq' => 5, 'is_show' => 1 ],
        ];

        // 编译时选择的端口在创建阶段就已确定：直接预置为步骤，
        // 不必等 submit_build 之后从云端 main 里反推
        return array_merge($defs, $this->buildPortDefinitions());
    }

    /**
     * 端口步骤定义（仅展示、不执行，不参与任务总进度）
     * @return array
     */
    protected function buildPortDefinitions(): array
    {
        $defs = [];
        foreach ($this->ports as $portKey) {
            $defs[] = [
                'key'          => self::portStepKey($portKey),
                'name'         => $this->portStepName($portKey),
                'desc'         => '云端编译（展示云端执行明细）',
                'weight'       => 0,
                'seq'          => 3, // 与「获取编译日志」同级，排在编译阶段内
                'is_show'      => 1,
                'need_execute' => 0
            ];
        }
        return $defs;
    }

    /**
     * 从创建参数中取出本次要编译的端口
     *
     * 顺序以 build_task.command 为准 —— 那就是提交给云端的实际编译顺序，
     * 端口步骤的展示顺序需与之一致；入参里多出而命令中缺失的端口追加在末尾。
     *
     * @param array $params 任务入参
     * @param array $build  CoreCloudBuildService::cloudBuild() 返回
     * @return array
     */
    protected function extractPorts(array $params, array $build): array
    {
        $ports = [];

        foreach ((array) ( $build[ 'command' ] ?? [] ) as $cmd) {
            $key = is_array($cmd) ? ( $cmd[ 'key' ] ?? '' ) : '';
            if (is_string($key) && $key !== '' && !in_array($key, $ports, true)) $ports[] = $key;
        }

        foreach ((array) ( $params[ 'port' ] ?? [] ) as $port) {
            if (is_string($port) && $port !== '' && !in_array($port, $ports, true)) $ports[] = $port;
        }

        return $ports;
    }

    /**
     * 端口步骤的展示名称（标准端口取字典语言包，自定义端口取其配置标题）
     * @param string $portKey
     * @return string 未识别时原样返回端口键
     */
    protected function portStepName(string $portKey): string
    {
        static $labels = null;
        if ($labels === null) {
            $labels = [];
            foreach (CloudBuildDict::getPortOptions() as $option) {
                $key = (string) ( $option[ 'key' ] ?? '' );
                if ($key !== '') $labels[ $key ] = (string) ( $option[ 'label' ] ?? $key );
            }
            try {
                foreach (( new CoreCloudBuildService() )->getCustomPorts() as $option) {
                    $key = (string) ( $option[ 'key' ] ?? '' );
                    if ($key !== '') $labels[ $key ] = (string) ( $option[ 'label' ] ?? $key );
                }
            } catch (\Throwable $e) {
                // 自定义端口不可用不影响步骤展示
            }
        }
        return $labels[ $portKey ] ?? $portKey;
    }

    /**
     * 端口步骤 step_key
     *
     * 供其它任务（如插件打包的云编译阶段）复用同一套端口步骤标识，保证步骤结构一致。
     * @param string $portKey
     * @return string
     */
    public static function portStepKey(string $portKey): string
    {
        return 'port:' . $portKey;
    }

    /**
     * 按 build_task 当前状态推导各步骤状态与进度
     *
     * build_task 状态流转：prepared -> （分片上传）-> 已回填 task_id / queued -> running -> （分片下载）-> success / failed
     */
    public function reportSteps(): array
    {
        $order = [ self::STEP_START, self::STEP_SUBMIT, self::STEP_LOG, self::STEP_DOWNLOAD, self::STEP_DEPLOY ];
        $task  = ( new CoreCloudBuildService() )->getBuildTask();

        // 任务缓存已清空：编译已完成（成功或被清除）
        if (empty($task)) {
            return $this->buildStepStates($order, 5, 100, false);
        }

        $status = (string) ( $task[ 'status' ] ?? '' );
        $failed = $status === 'failed' || (string) ( $task[ 'phase' ] ?? '' ) === 'failed';

        // 以 build_task.phase 为准定位阶段（打包/上传/编译/下载/部署/完成）；
        // 老任务（改造前创建，缓存里没有 phase）用状态兜底推断
        $buildPhase = (string) ( $task[ 'phase' ] ?? '' );
        if ($buildPhase === '') {
            $buildPhase = $this->guessPhase($task, $status);
        }

        $length = (int) ( $task[ 'length' ] ?? 0 );
        $offset = (int) ( $task[ 'offset' ] ?? 0 );

        // 步骤下标（0-4 为进行中的步骤，5 表示全部完成）；百分比为当前步骤内进度
        $percent = 0;
        switch ($buildPhase) {
            case 'uploading':
                $index   = 1;
                $total   = max(1, (int) ( $task[ 'total_chunk' ] ?? 1 ));
                $done    = (int) ( $task[ 'chunk' ] ?? 0 );
                $percent = (int) floor(min(1, $done / $total) * 100);
                break;

            case 'compiling':
                $index   = 2;
                $percent = (int) ( $task[ 'progress' ] ?? 0 );
                break;

            case 'downloading':
                $index   = 3;
                $percent = $length > 0 ? (int) floor(min(1, $offset / $length) * 100) : 0;
                // 分片信息仍在但字节已下全 => 已进入部署
                if ($length > 0 && $offset >= $length) {
                    $index   = 4;
                    $percent = 50;
                }
                break;

            case 'deploying':
                $index   = 4;
                $percent = 50;
                break;

            case 'done':
                $index   = 5;
                $percent = 100;
                break;

            case 'packaging':
            default:
                $index   = 0;
                $percent = 0;
                break;
        }

        $steps = $this->buildStepStates($order, $index, $percent, $failed);

        // 步骤与阶段一一对应：发起=packaging / 提交=uploading / 日志=compiling / 下载=downloading / 部署=deploying
        // 用统一计时 API 记录真实起止时间（业务服务 CoreCloudBuildService 在干活那一刻写入 phase_times）
        $phases = [ 'packaging', 'uploading', 'compiling', 'downloading', 'deploying' ];
        $phaseTimes = (array) ( $task[ 'phase_times' ] ?? [] );
        foreach ($order as $i => $stepKey) {
            $pt = $phaseTimes[ $phases[ $i ] ?? '' ] ?? [];
            $ptStart = (int) ( $pt[ 'start' ] ?? 0 );
            $ptEnd = (int) ( $pt[ 'end' ] ?? 0 );
            if ($ptEnd > 0) {
                if ($ptStart > 0) $this->markStepStarted($stepKey, $ptStart);
                $this->markStepFinished($stepKey, $ptEnd);
            } elseif ($ptStart > 0) {
                $this->markStepStarted($stepKey, $ptStart);
            }
        }

        // 编译阶段起：把云端各端口及其编译步骤补充为「仅展示、不执行」的步骤
        if ($index >= 2) {
            $steps = array_merge($steps, $this->buildPortSteps($task));
        }

        return $steps;
    }

    /**
     * 云端各端口步骤（仅展示、不执行）
     *
     * 数据来源：task/logs 的 main（type=port）给出端口及其 steps；
     * 进度来源：sub_process 中 get_path 等于端口键、且 seq 与 main.steps.step 对齐的条目
     * （两边步骤 id 命名不一致，如 step_exec_2 对应 step_npm_build，因此按序号对齐）。
     *
     * @param array $task build_task
     * @return array
     */
    protected function buildPortSteps(array $task): array
    {
        $main = $task[ 'main' ] ?? [];
        if (empty($main)) return [];

        // 按端口键归并执行明细：port_key => [ seq => entry ]
        // 归属以「整组」判定：组内任意条目带 get_path 即认为该组属于该端口
        // （部分条目如 step_collect 自身不带 get_path，必须靠整组归属才能取到进度）
        // 端口映射：sub_process 用 get_path（源码目录，如 h5 端口为 uni-app），主表用 port_config.key
        $portItems = [];
        $aliases = [];
        foreach ($main as $item) {
            if ((string) ( $item[ 'type' ] ?? '' ) !== 'port') continue;
            $key = (string) ( $item[ 'port_key' ] ?? '' ) !== ''
                ? (string) $item[ 'port_key' ]
                : str_replace('port_', '', (string) ( $item[ 'id' ] ?? '' ));
            if ($key === '') continue;
            $portItems[ $key ] = $item;
            $aliases[ $key ] = $key;
            if ((string) ( $item[ 'get_path' ] ?? '' ) !== '') $aliases[ (string) $item[ 'get_path' ] ] = $key;
        }

        $detail = [];
        $pendingBundles = [];
        foreach (( $task[ 'sub_process' ] ?? [] ) as $bundle) {
            $bundlePort = '';
            foreach ((array) $bundle as $entry) {
                $rawKey = (string) ( $entry[ 'get_path' ] ?? '' );
                if ($rawKey !== '' && isset($aliases[ $rawKey ])) {
                    $bundlePort = $aliases[ $rawKey ];
                    break;
                }
            }
            if ($bundlePort === '') {
                $pendingBundles[] = (array) $bundle;
                continue;
            }

            foreach ((array) $bundle as $entry) {
                $detail[ $bundlePort ][ (int) ( $entry[ 'seq' ] ?? 0 ) ] = $entry;
            }
        }

        // 兜底：整组都不带 get_path 时（如部分端口），按「端口步骤特征 + 主表顺序」分配给尚无进度的端口
        if (!empty($pendingBundles)) {
            $portKeys = array_keys($portItems);

            foreach ($pendingBundles as $bundle) {
                // 仅处理具备端口步骤特征的分组（排除 finish / package / upload 等）
                $isPortBundle = false;
                foreach ($bundle as $entry) {
                    $entryId = (string) ( $entry[ 'id' ] ?? '' );
                    if (str_contains($entryId, 'step_extract')
                        || str_contains($entryId, 'step_exec')
                        || str_contains($entryId, 'step_npm')
                        || str_contains($entryId, 'step_collect')) {
                        $isPortBundle = true;
                        break;
                    }
                }
                if (!$isPortBundle) continue;

                // 分配给第一个还没有进度的端口
                $target = '';
                foreach ($portKeys as $key) {
                    if ($key !== '' && !isset($detail[ $key ])) {
                        $target = $key;
                        break;
                    }
                }
                if ($target === '') continue;

                foreach ($bundle as $entry) {
                    $detail[ $target ][ (int) ( $entry[ 'seq' ] ?? 0 ) ] = $entry;
                }
            }
        }

        $steps = [];
        foreach ($main as $item) {
            if ((string) ( $item[ 'type' ] ?? '' ) !== 'port') continue;

            $portKey = (string) ( $item[ 'port_key' ] ?? '' );
            if ($portKey === '') $portKey = str_replace('port_', '', (string) ( $item[ 'id' ] ?? '' ));
            if ($portKey === '') continue;

            $stepKey   = self::portStepKey($portKey);
            $subSteps  = [];
            $percentSum = 0;

            foreach (( $item[ 'steps' ] ?? [] ) as $step) {
                $seq   = (int) ( $step[ 'step' ] ?? 0 );
                $entry = $detail[ $portKey ][ $seq ] ?? [];

                $subSteps[] = [
                    'step_key' => $stepKey . ':' . ( (string) ( $step[ 'id' ] ?? '' ) !== '' ? $step[ 'id' ] : $seq ),
                    'name' => (string) ( $step[ 'name' ] ?? ( '步骤' . ( $seq + 1 ) ) ),
                    'seq' => $seq,
                    'status' => $this->mapPortStepStatus((string) ( $entry[ 'status' ] ?? '' ), (string) ( $item[ 'status' ] ?? '' )),
                    'progress' => (int) ( $entry[ 'progress' ] ?? 0 ),
                    'start_at' => $this->parseApiTime((string) ( $entry[ 'ts_start' ] ?? '' )),
                    'end_at' => $this->parseApiTime((string) ( $entry[ 'ts_end' ] ?? '' )),
                ];
                $percentSum += (int) ( $entry[ 'progress' ] ?? 0 );
            }

            $total = count($subSteps);

            // 端口级起止时间按子步骤聚合（最早开始 / 最晚结束）：
            // 云端端口级 ts_start/ts_end 只覆盖收尾时段（如收集产物），直接使用会把
            // 真实编译窗口（解压→安装依赖→编译构建）压缩成几秒，与子步骤明细自相矛盾
            $minStart = 0;
            $maxEnd   = 0;
            foreach ($subSteps as $sub) {
                $subStart = (int) ( $sub[ 'start_at' ] ?? 0 );
                $subEnd   = (int) ( $sub[ 'end_at' ] ?? 0 );
                if ($subStart > 0 && ( $minStart === 0 || $subStart < $minStart )) $minStart = $subStart;
                if ($subEnd > 0 && $subEnd > $maxEnd) $maxEnd = $subEnd;
            }
            $portStart = $minStart > 0 ? $minStart : $this->parseApiTime((string) ( $item[ 'ts_start' ] ?? '' ));
            $portEnd   = $maxEnd > 0 ? $maxEnd : $this->parseApiTime((string) ( $item[ 'ts_end' ] ?? '' ));

            // 名称优先用本地统一命名（与创建时预置保持一致），识别不到再退回云端返回
            $name = $this->portStepName($portKey);
            if ($name === $portKey) $name = (string) ( $item[ 'name' ] ?? ( '编译 ' . $portKey ) );

            $steps[] = [
                'step_key' => $stepKey,
                'name' => $name,
                'desc' => '云端编译（展示云端执行明细）',
                'seq' => 3,           // 与「获取编译日志」同级，排在编译阶段内
                'weight' => 0,        // 不参与任务总进度
                'is_show' => 1,
                'need_execute' => 0,
                'status' => $this->mapPortStepStatus((string) ( $item[ 'status' ] ?? '' ), ''),
                'progress' => $total > 0 ? (int) floor($percentSum / $total) : 0,
                'start_at' => $portStart,
                'end_at' => $portEnd,
                'sub' => $subSteps,
            ];
        }

        return $steps;
    }

    /**
     * 端口键别名映射（sub_process.get_path => port_key）
     * @param array $task
     * @return array
     */
    protected function portAliases(array $task): array
    {
        $main = $task[ 'main' ] ?? [];
        $aliases = [];
        foreach ($main as $item) {
            if ((string) ( $item[ 'type' ] ?? '' ) !== 'port') continue;
            $key = (string) ( $item[ 'port_key' ] ?? '' ) !== ''
                ? (string) $item[ 'port_key' ]
                : str_replace('port_', '', (string) ( $item[ 'id' ] ?? '' ));
            if ($key === '') continue;
            $aliases[ $key ] = $key;
            if ((string) ( $item[ 'get_path' ] ?? '' ) !== '') $aliases[ (string) $item[ 'get_path' ] ] = $key;
        }
        return $aliases;
    }

    /**
     * 把 sub_process 各端口编译明细（解压 / 装依赖 / 编译 / 收集等）作为终端日志输出
     *
     * 按「当前状态」发射：每个端口步骤的每次状态变化（running / success / failed）输出一行，
     * 用 sig 去重，因此首轮轮询晚到（服务端已跑完若干步骤）时，已完成的明细会一次性补发到
     * events.jsonl，终端不会对这些步骤「毫无输出」。正常轮询中只增量输出新增/变化行。
     * @param array $task
     * @return array
     */
    protected function buildSubProcessEvents(array $task): array
    {
        $subProcess = (array) ( $task[ 'sub_process' ] ?? [] );
        if (empty($subProcess)) return [];

        $aliases = $this->portAliases($task);
        $events = [];

        foreach ($subProcess as $bundle) {
            if (!is_array($bundle)) continue;

            $portKey = '';
            foreach ($bundle as $entry) {
                $rawKey = (string) ( $entry[ 'get_path' ] ?? '' );
                if ($rawKey !== '' && isset($aliases[ $rawKey ])) {
                    $portKey = $aliases[ $rawKey ];
                    break;
                }
            }
            if ($portKey === '') continue;

            foreach ($bundle as $entry) {
                $status = (string) ( $entry[ 'status' ] ?? '' );

                // 只对三类确定的状态发射，未知状态一律跳过：
                // 未开始（pending / waiting）或未知状态若落进 else 分支会被误报为「完成」，
                // 出现「安装依赖 完成」先于「安装依赖 执行中」的乱序假象（与 parseBuildLog 的 pending 过滤保持一致）
                if (in_array($status, [ 'failed', 'fail', 'error' ], true)) {
                    $level = 'error';
                    $suffix = ' 失败';
                } elseif (in_array($status, [ 'running', 'in_progress' ], true)) {
                    $level = 'info';
                    $suffix = ' 执行中';
                } elseif (in_array($status, [ 'completed', 'success', 'done', 'finished' ], true)) {
                    $level = 'success';
                    $suffix = ' 完成';
                } else {
                    continue;
                }

                $seq = (int) ( $entry[ 'seq' ] ?? 0 );
                $sig = 'sub:' . $portKey . ':' . $seq . ':' . $status;
                if ($this->isEmitted($sig)) continue;
                $this->markEmitted($sig);

                $name = (string) ( $entry[ 'name' ] ?? ( $entry[ 'id' ] ?? '步骤' ) );
                $events[] = [
                    'level'    => $level,
                    'text'     => ( $portKey !== '' ? '[' . $portKey . '] ' : '' ) . $name . $suffix,
                    'progress' => null,
                    'persist'  => true
                ];

                // 失败步骤：把 error_desc（失败原因）单独输出到终端，便于定位问题
                if ($level === 'error') {
                    $errDesc = (string) ( $entry[ 'error_desc' ] ?? '' );
                    if ($errDesc !== '') {
                        $errSig = 'sub:' . $portKey . ':' . $seq . ':errdesc';
                        if (!$this->isEmitted($errSig)) {
                            $this->markEmitted($errSig);
                            $events[] = [
                                'level'    => 'error',
                                'text'     => $errDesc,
                                'progress' => null,
                                'persist'  => true
                            ];
                        }
                    }
                }
            }
        }
        return $events;
    }

    /**
     * 云端状态 => 步骤状态
     * @param string $status
     * @param string $fallback 明细缺失时用上级状态兜底
     * @return string
     */
    protected function mapPortStepStatus(string $status, string $fallback): string
    {
        $map = [
            'completed' => 'success',
            'success' => 'success',
            'failed' => 'failed',
            'fail' => 'failed',
            'running' => 'running',
            'in_progress' => 'running',
            'pending' => 'pending',
            'waiting' => 'pending',
        ];
        if ($status !== '' && isset($map[ $status ])) return $map[ $status ];
        return $map[ $fallback ] ?? 'pending';
    }

    /**
     * 解析云端 ISO8601 时间（如 2026-09-15T10:36:02Z）为时间戳
     * @param string $time
     * @return int
     */
    protected function parseApiTime(string $time): int
    {
        if ($time === '') return 0;
        $ts = strtotime($time);
        return $ts === false ? 0 : (int) $ts;
    }

    /**
     * 阶段兜底推断（改造前创建的任务，缓存中没有 phase 字段）
     *
     * 注意：下载 / 部署期间 build_task.status 很可能已经是 success（云端编译已完成），
     * 因此「下载标记」必须优先于 status 判断，否则会一步跳到「全部完成」而错过下载步骤。
     */
    protected function guessPhase(array $task, string $status): string
    {
        if (!empty($task[ 'step' ]) || (int) ( $task[ 'length' ] ?? 0 ) > 0) return 'downloading';
        if ($status === 'success') return 'downloading';// 云端已编译完成 => 即将开始下载产物
        if (!empty($task[ 'task_id' ])) return 'compiling';
        if (!empty($task[ 'total_chunk' ])) return 'uploading';
        return 'packaging';
    }

    /**
     * 依据「已完成到第几步 + 当前步骤进度」生成上报结构
     * @param array $order   步骤顺序
     * @param int   $phase   当前进行中的步骤下标；等于 count($order) 表示全部完成
     * @param int   $percent 当前步骤内进度
     * @param bool  $failed  当前步骤是否失败
     * @return array
     */
    protected function buildStepStates(array $order, int $phase, int $percent, bool $failed): array
    {
        // 带上名称/序号/权重：任务创建早于本次改造（未预置步骤行）时，合并上报也能补全展示信息
        $defs = [];
        foreach ($this->getStepDefinitions() as $def) {
            $defs[ (string) $def[ 'key' ] ] = $def;
        }

        $steps = [];
        foreach ($order as $index => $stepKey) {
            $def = $defs[ $stepKey ] ?? [];

            // 展示/执行属性随定义一起上报，定义调整后可同步到已存在的步骤行
            $base = [
                'step_key' => $stepKey,
                'name' => (string) ( $def[ 'name' ] ?? $stepKey ),
                'desc' => (string) ( $def[ 'desc' ] ?? '' ),
                'seq' => (int) ( $def[ 'seq' ] ?? $index + 1 ),
                'weight' => (int) ( $def[ 'weight' ] ?? 0 ),
                'is_show' => (int) ( $def[ 'is_show' ] ?? 1 ),
                'need_execute' => (int) ( $def[ 'need_execute' ] ?? 1 ),
            ];

            if ($index < $phase) {
                $steps[] = array_merge($base, [
                    'status' => 'success',
                    'progress' => 100
                ]);
            } elseif ($index === $phase) {
                $steps[] = array_merge($base, [
                    'status' => $failed ? 'failed' : 'running',
                    'progress' => $failed ? min($percent, 99) : $percent,
                    'error' => $failed ? '编译失败' : ''
                ]);
            } else {
                // 未开始的步骤也一并上报，保证「改动前创建的任务」能补全完整步骤树
                $steps[] = array_merge($base, [
                    'status' => 'pending',
                    'progress' => 0
                ]);
            }
        }
        return $steps;
    }

    public function create(array $params): array
    {
        $build = ( new CoreCloudBuildService() )->cloudBuild($params);
        $taskKey = (string) ( $build[ 'task_key' ] ?? '' );
        $this->taskKey = $taskKey;
        $this->emittedKey = self::cacheKey($taskKey);
        Cache::delete($this->emittedKey);

        // 记录本次编译端口：随后 TaskExecutor 会用 getStepDefinitions() 预置步骤树
        $this->ports = $this->extractPorts($params, is_array($build) ? $build : []);

        return [
            'task_key' => $taskKey,
            'title'    => $this->buildTitle($params),
            'params'   => $params
        ];
    }

    public function run(string $cursor): array
    {
        $service = new CoreCloudBuildService();
        $task    = $service->getBuildTask();

        // 任务标识优先用 Executor 注入的值：编译完成后业务缓存会被 clearTask 清空，
        // 此时不能把 taskKey 覆盖为空，否则收尾逻辑（发版落版本记录）会因拿不到任务标识而跳过
        $serviceTaskKey = (string) ( $task[ 'task_key' ] ?? '' );
        if ($serviceTaskKey !== '') $this->taskKey = $serviceTaskKey;

        $this->emittedKey = self::cacheKey($this->taskKey);

        // 任务缓存已清空 => 编译已结束（完成或被清除）
        if (empty($task)) {
            // 发版：编译成功后落一条版本记录（幂等，普通云编译不写）
            $this->recordBuildVersion();

            return [
                'status'      => TaskDict::STATUS_SUCCESS,
                'end_reason'  => TaskDict::END_REASON_COMPLETED,
                'progress'    => 100,
                'stage'       => '编译完成',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'success', 'text' => '云编译部署完成' ] ]
            ];
        }

        try {
            $log = $service->getBuildLog();
        } catch (\Throwable $e) {
            // 网络超时 / 连接断开：暂停推进，交用户决策（决策：任务暂停等决策）
            return [
                'status'   => TaskDict::STATUS_WAITING_INPUT,
                'progress' => $this->estimateProgress($task, $cursor),
                'stage'    => '编译中断',
                'cursor'   => $cursor,
                'events'   => [ [ 'level' => 'error', 'text' => '编译过程出现异常：' . $e->getMessage() ] ],
                'actions'  => [
                    [ 'code' => TaskDict::ACTION_RETRY, 'label' => '重试', 'style' => 'primary' ],
                    [ 'code' => TaskDict::ACTION_CANCEL, 'label' => '取消任务', 'style' => 'danger' ]
                ]
            ];
        }

        if (empty($log)) {
            // 发版：编译成功后落一条版本记录（幂等，普通云编译不写）
            $this->recordBuildVersion();

            return [
                'status'      => TaskDict::STATUS_SUCCESS,
                'end_reason'  => TaskDict::END_REASON_COMPLETED,
                'progress'    => 100,
                'stage'       => '编译完成',
                'cursor'      => '',
                'events'      => $this->finalizeProgressEvents([], $task)
            ];
        }

        $items  = $log[ 'data' ][ 0 ] ?? [];
        $events = [];
        $failed = '';

        foreach ($items as $item) {
            $text = (string) ( $item[ 'action' ] ?? ( $item[ 'msg' ] ?? '' ) );

            // 上传/下载等带百分比的进度项：渲染为进度条，不逐行输出
            $progress = $this->parseProgress($item);
            if ($progress !== null) {
                $sig = $progress[ 'category' ] . ':' . $progress[ 'percent' ];
                if (!$this->isEmitted($sig)) {
                    $this->markEmitted($sig);
                    $label = $progress[ 'category' ] === 'upload' ? '源码上传' : '编译产物下载';
                    // 仅整 10% 里程碑（或 100%）落盘 events.jsonl，避免每个百分比刷一行；其余仅实时展示进度条
                    $isMilestone = $progress[ 'percent' ] % 10 === 0 || $progress[ 'percent' ] === 100;
                    $events[] = [
                        'type'     => 'progress',
                        'key'      => $progress[ 'category' ],
                        'label'    => $label,
                        'percent'  => $progress[ 'percent' ],
                        'text'     => $label . ' ' . $progress[ 'percent' ] . '%',
                        'progress' => $progress[ 'percent' ],
                        'persist'  => $isMilestone
                    ];
                }
                if ((string) ( $item[ 'code' ] ?? '' ) === '0') {
                    $failed = (string) ( $item[ 'msg' ] ?? '云编译失败' );
                }
                continue;
            }

            if ($text !== '' && !$this->isEmitted($text)) {
                $this->markEmitted($text);
                $events[] = [
                    'level'    => (string) ( $item[ 'level' ] ?? 'info' ),
                    'text'     => $text,
                    'progress' => null
                ];
            }
            if ((string) ( $item[ 'code' ] ?? '' ) === '0') {
                $failed = (string) ( $item[ 'msg' ] ?? '云编译失败' );
            }
        }

        if ($failed !== '') {
            // getBuildLog 已更新 build_task 的进度，这里重新读取以获取最新进度
            $task = $service->getBuildTask();

            // 云端已给出整体失败结论（全局终态条目 id=fail）：本次任务直接以失败结束，
            // 不再暂停询问用户决策 —— 该结论不可重试，重试只会得到同样结果
            if ((string) ( $task[ 'status' ] ?? '' ) === 'failed') {
                return [
                    'status'      => TaskDict::STATUS_FAILED,
                    'end_reason'  => TaskDict::END_REASON_FAILED,
                    'progress'    => $this->estimateProgress($task, $cursor, $items),
                    'stage'       => '编译失败',
                    'cursor'      => '',
                    // 失败前先补发各端口步骤明细（含「失败」行与 error_desc 原因行），再追加整体失败结论
                    'events'      => array_merge($events, $this->buildSubProcessEvents($task), [ [ 'level' => 'error', 'text' => $failed ] ]),
                    'fail_reason' => [ 'Message' => '失败原因：' . $failed ]
                ];
            }

            // 其余异常（网络中断、步骤级错误等）：暂停并交用户决策（前端通过终端 TerminalAsk 询问）
            return [
                'status'      => TaskDict::STATUS_WAITING_INPUT,
                'progress'    => $this->estimateProgress($task, $cursor, $items),
                'stage'       => '编译异常，等待决策',
                'cursor'      => $cursor,
                // 同样先补发步骤明细，保证暂停决策时终端能看到失败步骤与原因
                'events'      => array_merge($events, $this->buildSubProcessEvents($task), [ [ 'level' => 'error', 'text' => $failed ] ]),
                'actions'     => [
                    [ 'code' => TaskDict::ACTION_RETRY, 'label' => '重试', 'style' => 'primary' ],
                    [ 'code' => TaskDict::ACTION_SKIP, 'label' => '跳过', 'style' => 'default' ],
                    [ 'code' => TaskDict::ACTION_CANCEL, 'label' => '取消任务', 'style' => 'danger' ]
                ]
            ];
        }

        // getBuildLog 过程中会修改 build_task（total_chunk / chunk / task_id / status 等），
        // 因此 estimateProgress / currentStage / finalizeProgressEvents 都必须用执行后的最新状态，
        // 避免用 getBuildLog 前的快照误判阶段，导致上传未完就注入 100%。
        $task = $service->getBuildTask();

        // 下载 + 部署已在本片收尾（build_task.deploy_finish）：本片即收敛为成功。
        // 注意不能只看 build_task.status === 'success' —— 云端编译成功时就会置该状态，
        // 此时产物还没下载部署，直接收敛会跳过后续步骤。
        if (!empty($task[ 'deploy_finish' ])) {
            $this->recordBuildVersion();

            return [
                'status'      => TaskDict::STATUS_SUCCESS,
                'end_reason'  => TaskDict::END_REASON_COMPLETED,
                'progress'    => 100,
                'stage'       => '编译完成',
                'cursor'      => '',
                'events'      => $this->finalizeProgressEvents(array_merge($events, $this->buildSubProcessEvents($task)), $task)
            ];
        }

        // 排队中：云端尚未开始编译，用一行原地回显展示「前面还有几人」，
        // 信息来自 task/logs 的 sub_process.queue（waiting / check 事件，取最新一条），由 getBuildLog 落到 build_task
        $queueEvent = $this->buildQueueEvent($task);
        if (!empty($queueEvent)) {
            $events[] = $queueEvent;
        } else {
            // 出队后补一条排队收尾事件：把「任务排队中，前面还有 N 个任务」的半截进度条
            // 固化为「任务排队完成」，避免终态回放残留一行停在中间百分比的排队条
            $queueDone = $this->buildQueueDoneEvent($task);
            if (!empty($queueDone)) $events[] = $queueDone;
        }

        $progress = $this->estimateProgress($task, $cursor, $items);
        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'progress' => $progress,
            'stage'    => $this->currentStage($task),
            'cursor'   => (string) ( $task[ 'task_key' ] ?? $cursor ),
            'events'   => $this->finalizeProgressEvents(array_merge($events, $this->buildSubProcessEvents($task)), $task)
        ];
    }

    /**
     * 排队回显事件（单行原地刷新）
     *
     * 云端编译在排队时没有百分比进度，只有「当前位置 / 前面还有几个任务」，
     * 因此这里用自定义文案（text）承载，进度条百分比按「队列推进度」估算，仅用于条形填充。
     *
     * @param array $task build_task
     * @return array 事件；非排队 / 人数未变化返回空数组
     */
    protected function buildQueueEvent(array $task): array
    {
        // 以排队数据本身为准（不再看 status）：排队期间端口步骤已存在但未完成，
        // parseBuildLog 会据此把整体状态判成 running，用 status 判定会永远进不来。
        // 出队后云端会给 dequeued 事件，position / waiting_count 归零，这里自然不再输出
        $waiting  = (int) ( $task[ 'waiting_count' ] ?? 0 );
        $position = (int) ( $task[ 'position' ] ?? 0 );

        // 前面没人（或已出队）：不需要排队回显，避免出现「前面还有 0 人」这种无意义的行；
        // waiting_count 与 position 均为 1 时即将轮到本任务执行，展示「前面还有 1 个任务」反而误导，同样不展示
        if ($waiting <= 0 || ( $waiting === 1 && $position === 1 )) return [];

        // 人数变化才重新下发，避免每片都刷同一行
        $sig = 'queue:' . $waiting . ':' . $position;
        if ($this->isEmitted($sig)) return [];
        $this->markEmitted($sig);
        // 标记本任务确实排过队：出队后 buildQueueDoneEvent 据此决定是否补收尾事件
        $this->markEmitted('queue:shown');

        $percent = $this->queuePercent($waiting, $position);

        // 文案带排队位置：终端原地刷新这一行，排到前面时能看到位置变化
        $text = '任务排队中，前面还有 ' . $waiting . ' 个任务';

        return [
            'type'     => 'progress',
            'key'      => 'queue',
            'label'    => '任务排队',
            'percent'  => $percent,
            'text'     => $text,
            'progress' => $percent,
            // 必须落盘：队列驱动时前端不调 run，事件只能从 events.jsonl 增量读取，
            // 不落盘的话终端在排队阶段会完全没有输出（排位变化时各落一行，与上传/下载里程碑一致）
            'persist'  => true
        ];
    }

    /**
     * 排队收尾事件（单行固化，100%）
     *
     * 出队后排队进度条停止更新，终态回放会把最后一帧「任务排队中，前面还有 N 个任务」
     * 固化成一行停在中间百分比的半截进度条，观感像卡住。这里补一条 100% 的收尾事件，
     * 把该行固化为「任务排队完成，开始编译」，与上传 / 下载的 100% 收尾口径一致。
     *
     * @param array $task build_task
     * @return array 事件；未排过队 / 已收尾返回空数组
     */
    protected function buildQueueDoneEvent(array $task): array
    {
        // 没排过队（queue:shown 未标记）：不发收尾行，避免出现从未展示过排队进度、
        // 却凭空多出「任务排队完成」这种前后矛盾的输出
        if (!$this->isEmitted('queue:shown') || $this->isEmitted('queue:done')) return [];

        // 还没轮到（前面仍有任务）：排队回显仍由 buildQueueEvent 承载，这里不下发；
        // 仅剩自己（前面 1 人且即将执行）或已出队（人数归零）才收尾
        $waiting = (int) ( $task[ 'waiting_count' ] ?? 0 );
        if ($waiting > 1) return [];

        $this->markEmitted('queue:done');

        return [
            'type'     => 'progress',
            'key'      => 'queue',
            'label'    => '任务排队',
            'percent'  => 100,
            'text'     => '任务排队完成，开始编译',
            'progress' => 100,
            // 必须落盘：队列驱动时前端不调 run，收尾行只能随 events 增量下发，
            // 不落盘的话终态回放仍会残留一行停在中间百分比的排队条
            'persist'  => true
        ];
    }

    /**
     * 排队推进度（0~99）：与上传 / 下载一致，由小到大
     *
     * 以「进入排队时前面还有几个任务」为基准（首次观察值）：
     * 刚开始排队 = 0%，前面的任务逐个完成时线性增长，轮到自己（前面 0 人）= 99%。
     * 用「首次观察值」而不是「当前队列长度」做基准，避免任务变多时进度回退（由大到小）。
     *
     * @param int $waiting 前面还有几个任务
     * @param int $position 当前排队位置（仅用于展示，不参与计算）
     * @return int
     */
    protected function queuePercent(int $waiting, int $position): int
    {
        $waiting = max(0, $waiting);

        $baseKey = 'cloud_build_queue_base_' . $this->taskKey;
        $base    = (int) Cache::get($baseKey);

        // 基准：首次观察到的等待人数（后续只有变得更多才更新，保证进度不回退）
        if ($base <= 0 || $waiting > $base) {
            $base = max($waiting, 1);
            Cache::set($baseKey, $base, 86400);
        }

        if ($waiting <= 0) return 99;

        return max(0, min(99, (int) round(( $base - $waiting ) / $base * 100)));
    }

    public function operate(string $code): array
    {
        // 取消：结束任务（本地收敛 + 通知云端取消）
        if ($code === TaskDict::ACTION_CANCEL) {
            $this->cancel(TaskDict::END_REASON_USER_CANCEL);
            return [
                'status'      => TaskDict::STATUS_CANCELED,
                'end_reason'  => TaskDict::END_REASON_USER_CANCEL,
                'stage'       => '已取消',
                'cursor'      => '',
                'events'      => [ [ 'level' => 'warning', 'text' => '云编译任务已被取消' ] ]
            ];
        }

        // 跳过：不再重试当前步骤，继续推进（该步骤由 TaskExecutor 标记为已跳过）
        if ($code === TaskDict::ACTION_SKIP) {
            return [
                'status'   => TaskDict::STATUS_RUNNING,
                'stage'    => '已跳过，继续执行',
                'cursor'   => '',
                'events'   => [ [ 'level' => 'warning', 'text' => '已跳过当前步骤，继续执行' ] ]
            ];
        }

        // 重试：恢复为执行中，由前端继续驱动
        return [
            'status'   => TaskDict::STATUS_RUNNING,
            'stage'    => '重试执行',
            'cursor'   => '',
            'events'   => [ [ 'level' => 'info', 'text' => '已重试，继续执行' ] ]
        ];
    }

    public function cancel(string $reason): void
    {
        ( new CoreCloudBuildService() )->cancelCloudBuild();
    }

    public function snapshotState(): array
    {
        return ( new CoreCloudBuildService() )->getBuildTask() ?: [];
    }

    /**
     * 快照附加信息：记录云端生成的任务标识
     *
     * 提交源码后云端返回 task_id（build_task.task_id），后续拉取编译日志 / 下载产物都依赖它；
     * 任务收尾时 clearTask() 会清掉 build_task，这里把它固化到 task.json 的 task 节点，
     * 便于任务结束后追溯云端侧的任务。
     *
     * @return array
     */
    public function snapshotMeta(): array
    {
        $task   = ( new CoreCloudBuildService() )->getBuildTask();
        $taskId = (string) ( $task[ 'task_id' ] ?? '' );

        return $taskId !== '' ? [ 'cloud_task_id' => $taskId ] : [];
    }

    public function restoreState(array $state): void
    {
        ( new CoreCloudBuildService() )->restoreTask($state);
    }

    // ==================== 内部方法 ====================

    /**
     * 编译成功收尾：发版任务在此写入版本记录
     *
     * 幂等（同一 task_key 只写一条），且失败不影响任务结果 —— 版本记录是附加产物，
     * 不能因为它失败就让本已成功的编译任务报错。
     * @return void
     */
    protected function recordBuildVersion(): void
    {
        if ($this->taskKey === '') return;

        try {
            ( new CoreBuildVersionService() )->record($this->taskKey);
        } catch (\Throwable $e) {
            // 忽略：版本记录失败不影响任务结果
        }
    }

    /**
     * 阶段切换时补全上传/下载的 100% 收尾进度
     * 第三方云编译日志可能在上传/下载结束后不再输出 100%，导致刷新回放时进度停在中间里程碑。
     * 这里根据 emitted 缓存判断：若曾有过上传/下载进度且当前已离开对应阶段，则补一条 100% 事件。
     *
     * @param array $events 本次已产生的 events
     * @param array $task   当前任务状态
     * @return array
     */
    protected function finalizeProgressEvents(array $events, array $task): array
    {
        $emitted = Cache::get($this->emittedKey) ?: [];
        if (!is_array($emitted)) return $events;

        $inUpload   = !empty($task[ 'total_chunk' ]);
        // 下载中：仍有字节未下载完（offset < length）。
        // 不能用 !empty(index) 判断：分片下载 index 从 0 开始，起始轮会被误判为「已离开下载阶段」，
        // 从而提前注入 100% 收尾事件，出现「一开始就是 100%」的观感
        $inDownload = !empty($task[ 'length' ]) && (int) ( $task[ 'offset' ] ?? 0 ) < (int) $task[ 'length' ];

        $finalEvents = [];
        // 收尾按「当前状态」判定，而非「是否曾上报过」：
        // 首轮轮询可能晚于上传/下载完成，此时未走过对应进度事件，按状态直接补发 100%，
        // 避免终端进度条一直停在 0%。isEmitted 保证正常轮询时不重复补发。
        if (!$inUpload && !empty($task[ 'task_id' ]) && !$this->isEmitted('upload:100')) {
            $finalEvents[] = [
                'type'     => 'progress',
                'key'      => 'upload',
                'label'    => '源码上传',
                'percent'  => 100,
                'text'     => '源码上传 100%',
                'progress' => 100,
                'persist'  => true
            ];
            $this->markEmitted('upload:100');
        }
        // length 为空表示尚未进入下载阶段，不误发 100%（如仍在编译阶段）
        if (!$inDownload && !empty($task[ 'length' ]) && !$this->isEmitted('download:100')) {
            $finalEvents[] = [
                'type'     => 'progress',
                'key'      => 'download',
                'label'    => '编译产物下载',
                'percent'  => 100,
                'text'     => '编译产物下载 100%',
                'progress' => 100,
                'persist'  => true
            ];
            $this->markEmitted('download:100');
        }

        if (empty($finalEvents)) return $events;

        // 将收尾进度插入到当前已有进度事件之后、非进度事件之前，保证顺序合理
        $progressEvents = [];
        $otherEvents    = [];
        foreach ($events as $e) {
            if (( $e[ 'type' ] ?? '' ) === 'progress') $progressEvents[] = $e;
            else $otherEvents[] = $e;
        }
        return array_merge($progressEvents, $finalEvents, $otherEvents);
    }

    protected static function cacheKey(string $taskKey): string
    {
        return 'task_cloud_build_emitted_' . $taskKey;
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

    /**
     * 解析上传/下载进度项（带百分比），返回 [ 'category' => 'upload'|'download', 'percent' => int ] 或 null
     * 仅识别含「上传 / 下载」字样且带百分比的日志，用于前端进度条渲染
     */
    protected function parseProgress(array $item): ?array
    {
        $text = (string) ( $item[ 'action' ] ?? ( $item[ 'msg' ] ?? '' ) );
        if ($text === '' || !preg_match('/(\d+)\s*%/', $text, $m)) {
            return null;
        }
        if (strpos($text, '上传') !== false) {
            return [ 'category' => 'upload', 'percent' => (int) $m[ 1 ] ];
        }
        if (strpos($text, '下载') !== false) {
            return [ 'category' => 'download', 'percent' => (int) $m[ 1 ] ];
        }
        return null;
    }

    /**
     * 任务标题
     * @param array $params
     * @return string
     */
    protected function buildTitle(array $params): string
    {
        $scopeMap = [
            CloudBuildDict::SCOPE_ALL      => '全部产物',
            CloudBuildDict::SCOPE_FRAMEWORK => '仅框架',
            CloudBuildDict::SCOPE_PLUGIN   => '仅插件',
            CloudBuildDict::SCOPE_CUSTOM   => '自定义端口'
        ];
        $scope = $params[ 'scope' ] ?? CloudBuildDict::SCOPE_ALL;
        return '云编译-' . ( $scopeMap[ $scope ] ?? $scope );
    }

    /**
     * 当前阶段描述
     * @param array $task
     * @return string
     */
    protected function currentStage(array $task): string
    {
        // 分片下载编译产物阶段：step/index 由 CoreCloudBuildService::buildSuccess 维护。
        // 阶段名需固定（不拼接百分比），否则前端会因阶段串变化误判为阶段切换而提前收尾进度条
        if (!empty($task[ 'step' ]) && isset($task[ 'index' ])) return '编译产物下载';

        // 排队中（前面确实还有任务）：阶段名固定（人数由终端的排队回显承载）
        if ((int) ( $task[ 'waiting_count' ] ?? 0 ) > 0) return '排队中';

        $status = $task[ 'status' ] ?? '';
        // 阶段名固定（不拼接人数）：前端按阶段串判断阶段切换，拼接动态值会被误判为换阶段
        if ($status === 'queued') return '排队中';
        if ($status === 'failed') return '编译失败';
        if ($status === 'success') return '编译完成';
        if (!empty($task[ 'task_id' ])) return '云端编译中';
        return '等待云端编译任务';
    }

    /**
     * 进度估算（0-100）
     * 新接口由云端编译服务在 main.jsonl 中回传各端口编译状态，service 已汇总为 task.progress
     * @param array $task
     * @param string $cursor
     * @param array $items
     * @return int
     */
    protected function estimateProgress(array $task, string $cursor = '', array $items = []): int
    {
        if (isset($task[ 'progress' ])) {
            return (int) $task[ 'progress' ];
        }
        return empty($task[ 'task_id' ]) ? 5 : 30;
    }
}

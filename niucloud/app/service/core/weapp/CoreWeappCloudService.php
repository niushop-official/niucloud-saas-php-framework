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

namespace app\service\core\weapp;

use app\service\api\diy\DiyConfigService;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\WapTrait;
use app\service\core\niucloud\CoreCloudBaseService;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use think\facade\Cache;

/**
 * 微信小程序云服务
 * Class CoreWeappAuthService
 * @package app\service\core\weapp
 */
class CoreWeappCloudService extends CoreCloudBaseService
{
    private $site_id;

    private $addon;

    private $addon_path;

    private $config = [
        'app_id' => '',
        'upload_private_key' => '',
        'addon' => [],
        'base_url' => ''
    ];

    use WapTrait;

    public function __construct()
    {
        parent::__construct();
        $this->root_path = dirname(root_path()) . DIRECTORY_SEPARATOR;
        $this->addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR;
        $this->config[ 'base_url' ] = (string) url('/', [], '', true);
    }

    public function setConfig($function)
    {
        $this->config = array_merge($this->config, $function());
        return $this;
    }

    /**
     * 上传小程序
     * @param $addon
     */
    public function uploadWeapp(array $data)
    {
//        if (strpos($this->config[ 'base_url' ], 'https://') === false) throw new CommonException('CURR_SITE_IS_NOT_OPEN_SSL');
        $this->site_id = $data[ 'site_id' ] ?? 0;

        if (empty($this->config[ 'app_id' ])) throw new CommonException('WEAPP_APPID_EMPTY');
        if (empty($this->config[ 'upload_private_key' ])) throw new CommonException('UPLOAD_KEY_EMPTY');
        if (!file_exists($this->config[ 'upload_private_key' ])) throw new CommonException('UPLOAD_KEY_NOT_EXIST');

        // 上传任务key（本地临时目录名）
        $task_key = uniqid();
        // 小程序上传的临时根目录 + 此次上传任务目录
        $weapp_root = task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp' . DIRECTORY_SEPARATOR;
        $temp_dir   = $weapp_root . $task_key;
        // 压缩包路径（回退场景直接复用历史版本的包，不再重新打包）
        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'weapp.zip';

        $reuse_zip = (string) ( $data[ 'source_zip' ] ?? '' );

        if ($reuse_zip !== '' && is_file($reuse_zip)) {
            // 回退：用历史版本保留的源码包重新提交（包内已含上传密钥，无需再打包）
            if (!is_dir($temp_dir)) @mkdir($temp_dir, 0755, true);
            @copy($reuse_zip, $zip_file);
        } else {
            // 小程序源码存放路径
            $package_dir = $temp_dir . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
            // uni
            $uni_dir = $package_dir . 'uni-app';

            dir_copy(public_path() . 'mp-weixin', $uni_dir);
            $this->handleUniapp($uni_dir);
            // 替换env文件
            $this->weappEnvReplace($uni_dir);

            file_put_contents($package_dir . 'private.key', file_get_contents($this->config[ 'upload_private_key' ]));

            // 将临时目录下文件生成压缩包
            if (!( new CoreAddonDevelopDownloadService('') )->compressToZip($package_dir, $zip_file)) {
                throw new CommonException('源码压缩包生成失败，请检查磁盘空间与目录权限');
            }
        }

        // 新 V2 接口：POST /task/cloud/weapp_v2（multipart：file + authorize_code/appid/version/desc）
        // 旧接口的 compile / do / timestamp / token 入参已不再需要（V2 固定「合并插件 → 云上传 → 预览」）
        $query = [
            'authorize_code' => $this->auth_code,
            'appid' => $this->config[ 'app_id' ],
            'version' => $data[ 'version' ] ?? '',
            'desc' => $data[ 'desc' ] ?? ''
        ];
        $response = ( new CloudService(true) )->httpPost('task/cloud/weapp_v2?' . http_build_query($query), [
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => fopen($zip_file, 'r'),
                    'filename' => 'weapp.zip'
                ]
            ],
        ]);

        // 云端返回业务错误：本次包不保留，连同历史临时目录一并清理
        if (isset($response[ 'code' ]) && $response[ 'code' ] == 0) {
            $this->clearWeappTemp($weapp_root, $task_key, false);
            throw new CommonException($response[ 'msg' ]);
        }

        // 保留本次源码包（用于后续版本回退）时，只清理其它历史临时目录
        $this->clearWeappTemp($weapp_root, $task_key, !empty($data[ 'keep_package' ]));

        // 云端返回的任务标识（格式 weapp_{authorize_code}_{UnixNano}），后续预览 / 日志 / 取消都依赖它
        $task_id = $response[ 'data' ][ 'task_id' ] ?? '';

        return [
            'key' => $task_id,
            // 保留的源码包路径（未要求保留时为空），由调用方登记到版本记录
            'zip' => !empty($data[ 'keep_package' ]) && is_file($zip_file) ? $zip_file : ''
        ];
    }

    /**
     * 清理小程序上传的临时目录
     *
     * @param string $root     临时根目录 runtime/backup/weapp/
     * @param string $keepKey  本次上传的任务目录名
     * @param bool   $keepCurrent 是否保留本次目录（保留后其源码包可用于版本回退）
     * @return void
     */
    protected function clearWeappTemp(string $root, string $keepKey, bool $keepCurrent): void
    {
        if (!is_dir($root)) return;

        if (!$keepCurrent) {
            del_target_dir($root, true);
            return;
        }

        // 只清理本次之外的历史目录，避免旧包长期堆积占磁盘
        $names = @scandir($root);
        if (empty($names)) return;

        foreach ($names as $name) {
            if ($name === '.' || $name === '..' || $name === $keepKey) continue;

            $dir = $root . $name;
            if (is_dir($dir)) del_target_dir($dir . DIRECTORY_SEPARATOR, true);
        }
    }

    /**
     * @param string $dir
     * @return void
     */
    private function handleUniapp(string $dir)
    {
        $site_addon = $this->config[ 'addon' ];
        foreach ($site_addon as $addon) {
            $src = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'mp-weixin' . DIRECTORY_SEPARATOR;
            if (!is_dir($src)) continue;

            dir_copy($src, $dir . DIRECTORY_SEPARATOR . 'mp-addons' . DIRECTORY_SEPARATOR . $addon);
        }
    }

    /**
     * 小程序上传env文件处理
     * config.js 格式: "use strict";exports.envConfig={VITE_APP_BASE_URL:"",...};
     * 使用正则替换配置项的值
     * @param string $dir
     * @return void
     */
    private function weappEnvReplace(string $dir)
    {
        $env_file = $dir . DIRECTORY_SEPARATOR . 'utils' . DIRECTORY_SEPARATOR . 'config.js';

        $env = file_get_contents($env_file);

        // 替换 VITE_APP_BASE_URL
        $env = preg_replace('/VITE_APP_BASE_URL:"[^"]*"/', 'VITE_APP_BASE_URL:"' . $this->config['base_url'] . 'api/' . '"', $env);

        // 替换 VITE_IMG_DOMAIN
        $env = preg_replace('/VITE_IMG_DOMAIN:"[^"]*"/', 'VITE_IMG_DOMAIN:"' . $this->config['base_url'] . '"', $env);

        // 替换 VITE_SITE_ID
        $env = preg_replace('/VITE_SITE_ID:"[^"]*"/', 'VITE_SITE_ID:"' . $this->site_id . '"', $env);

        file_put_contents($env_file, $env);
    }

    /**
     * 获取微信小程序预览码（新接口：task/weapp/preview?task_id=）
     * @param string $taskId 云端编译任务标识（格式 weapp_{authorize_code}_{UnixNano}）
     * @return string 预览图 base64；获取失败返回空串
     */
    public function getWeappPreviewImage(string $taskId)
    {
        if ($taskId === '') return '';

        $query = [ 'task_id' => $taskId ];
        $preview_url = ( new CloudService(true) )->getUrl('task/weapp/preview?' . http_build_query($query));

        try {
            $path = runtime_path() . uniqid() . '.jpg';
            file_put_contents($path, file_get_contents($preview_url));
            return image_to_base64($path, true);
        } catch (\Exception $e) {
            return '';
        }
    }

    /**
     * 获取小程序编译日志（新接口：task/logs?task_id=）
     * @param string $taskId 云端编译任务标识
     * @return mixed
     */
    public function getWeappCompileLog(string $taskId)
    {
        $query = [
            'task_id' => $taskId
        ];
        return ( new CloudService(true) )->httpGet('task/logs?' . http_build_query($query));
    }

    /**
     * 解析云端编译状态（供任务推进与版本状态回写统一使用）
     *
     * 新接口 task/logs 返回 { main:[...], sub_process:{...} }：
     * - main 终态行 id=fail：编译失败，取 error_desc / data.reason
     * - main 终态行 id=finish：取 result.exit（success/failed）作为终态结论
     * - 进行中：取 sub_process 各步骤进度的最大值；任一 step 状态为 failed 即失败
     *
     * @param string $taskId
     * @return array [ pending, failed, percent, message ]
     */
    public function getWeappCompileStatus(string $taskId): array
    {
        if ($taskId === '') return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => '缺少云端编译任务标识', 'events' => [] ];

        $response = $this->getWeappCompileLog($taskId);
        $data = $response[ 'data' ] ?? [];
        $main = $data[ 'main' ] ?? [];
        $sub  = $data[ 'sub_process' ] ?? [];

        // 终端内容事件（与云编译一致：把 task/logs 的 main + sub_process 解析成步骤执行明细行）
        $events = $this->buildCompileEvents($response);

        $finish = null;
        $fail   = null;
        foreach ($main as $row) {
            $id = (string) ( $row[ 'id' ] ?? '' );
            if ($id === 'finish') $finish = $row;
            if ($id === 'fail')   $fail   = $row;
        }

        if ($fail !== null) {
            $reason = (string) ( $fail[ 'error_desc' ] ?? '' );
            if ($reason === '') $reason = (string) ( $fail[ 'desc' ] ?? '' );
            if ($reason === '') $reason = (string) ( $fail[ 'data' ][ 'reason' ] ?? '' );
            if ($reason === '') $reason = '云端编译失败';
            return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => $reason, 'events' => $events ];
        }

        if ($finish !== null) {
            $result = $finish[ 'result' ] ?? [];
            $exit   = (string) ( $result[ 'exit' ] ?? '' );
            if ($exit === 'failed') {
                $reason = (string) ( $result[ 'reason' ] ?? '云端编译失败' );
                return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => $reason, 'events' => $events ];
            }
            // finish 行即终态：默认视为成功
            return [ 'pending' => false, 'failed' => false, 'percent' => 100, 'message' => '', 'events' => $events ];
        }

        // 进行中：取子流程各步骤进度的较大值；任一 step 失败即失败
        $percent = 0;
        foreach ($sub as $steps) {
            if (!is_array($steps)) continue;
            foreach ($steps as $s) {
                if (!is_array($s)) continue;
                if ((string) ( $s[ 'status' ] ?? '' ) === 'failed') {
                    $reason = (string) ( $s[ 'error_desc' ] ?? '' );
                    if ($reason === '') $reason = (string) ( $s[ 'operation_name' ] ?? '云端编译失败' );
                    return [ 'pending' => false, 'failed' => true, 'percent' => 0, 'message' => $reason, 'events' => $events ];
                }
                $p = (int) ( $s[ 'progress' ] ?? 0 );
                if ($p > $percent) $percent = $p;
            }
        }

        // 排队中：sub_process.queue 携带实时排队位置（event=waiting / check，取最新一条），
        // 与云编译一致。此时编译尚未开始，整体进度改用排队推进度；
        // 排队回显由 handler 以「单行原地刷新进度条」（type=progress / key=queue）下发，避免每次轮询刷一行文字
        $queued  = false;
        $queue   = $this->parseQueueInfo($sub);
        if ($queue[ 'waiting_count' ] > 0) {
            $queued  = true;
            $percent = $this->queuePercent($queue[ 'waiting_count' ], $queue[ 'position' ], $taskId);
        }

        return [ 'pending' => true, 'failed' => false, 'percent' => min($percent, 99), 'queued' => $queued, 'waiting_count' => $queue[ 'waiting_count' ], 'position' => $queue[ 'position' ], 'message' => $queued ? '排队中' : '', 'events' => $events ];
    }

    /**
     * 解析排队信息（sub_process.queue）
     *
     * 与云编译 CoreCloudBuildService::parseQueueInfo 逻辑一致：sub_process.queue 按时间正序追加，
     * 末条即当前最新排队状态，故倒序取「最新的一条」有效排队信息（含 position / waiting_count），
     * 已出队（event=dequeued，或整段都没有排队数据）时返回 0。
     *
     * 云端排队信息返回结构（均兼容）：
     * - 事件条目：type=event，event=waiting / check（带 data.position / data.waiting_count），
     *            出队时产出 event=dequeued；
     * - 步骤条目：type=step（id=step_enqueue），位置同样在 data 里——
     *            step_enqueue 的 completed 仅代表「入队成功」，其后仍会追加 waiting 事件，
     *            故不再据此判定已出队（否则会把正在排队中的任务误判为出队，丢失实时位置）。
     *
     * @param array $subProcess task/logs 的 sub_process
     * @return array [ position, waiting_count ]
     */
    private function parseQueueInfo(array $subProcess): array
    {
        $queue = $subProcess[ 'queue' ] ?? null;
        if (!is_array($queue)) return [ 'position' => 0, 'waiting_count' => 0 ];

        $position = 0;
        $waiting  = 0;
        $dequeued = false;

        // 倒序：取最新一条有效排队信息（sub_process.queue 时间正序追加，末条即当前状态）
        for ($i = count($queue) - 1; $i >= 0; $i--) {
            $entry = is_array($queue[ $i ] ?? null) ? $queue[ $i ] : null;
            if ($entry === null) continue;

            $event = (string) ( $entry[ 'event' ] ?? '' );

            // 出队：排队结束，以最新一条为准
            if ($event === 'dequeued') {
                $dequeued = true;
                break;
            }

            // 结构一：排队事件（云端两种命名 waiting / check）携带实时位置，取最新一条即可
            if ($event === 'waiting' || $event === 'check') {
                $data     = is_array($entry[ 'data' ] ?? null) ? $entry[ 'data' ] : [];
                $position = (int) ( $data[ 'position' ] ?? 0 );
                $waiting  = (int) ( $data[ 'waiting_count' ] ?? 0 );
                break;
            }

            // 结构二（兜底）：仅步骤条目 step_enqueue 时，位置同样在 data 里；
            // 未开始(pending/waiting)的条目不携带位置，继续往前看；completed 不代表出队（见上方说明）
            if ((string) ( $entry[ 'type' ] ?? 'step' ) === 'step') {
                $status = strtolower((string) ( $entry[ 'status' ] ?? '' ));
                if (in_array($status, [ 'pending', 'waiting', '' ], true)) continue;

                $data = is_array($entry[ 'data' ] ?? null) ? $entry[ 'data' ] : [];
                if ((int) ( $data[ 'position' ] ?? 0 ) > 0 || (int) ( $data[ 'waiting_count' ] ?? 0 ) > 0) {
                    $position = (int) ( $data[ 'position' ] ?? 0 );
                    $waiting  = (int) ( $data[ 'waiting_count' ] ?? 0 );
                    break;
                }
            }
        }

        return $dequeued
            ? [ 'position' => 0, 'waiting_count' => 0 ]
            : [ 'position' => $position, 'waiting_count' => $waiting ];
    }

    /**
     * 排队推进度（0~20）：与云编译 queuePercent 一致，由小到大
     *
     * 以「进入排队时前面还有几个任务」为基准（首次观察值）：刚开始排队 = 0，
     * 前面的任务逐个完成时线性增长，轮到自己（前面 0 人）= 20（编译阶段从 50 起）。
     * 用「首次观察值」而不是「当前队列长度」做基准，避免任务变多时进度回退（由大到小）。
     *
     * @param int    $waiting  前面还有几个任务
     * @param int    $position 当前排队位置（仅用于展示，不参与计算）
     * @param string $taskId   云端编译任务标识（基准按任务隔离缓存）
     * @return int
     */
    private function queuePercent(int $waiting, int $position, string $taskId): int
    {
        $waiting = max(0, $waiting);

        $baseKey = 'weapp_queue_base_' . $taskId;
        $base    = (int) Cache::get($baseKey);

        // 基准：首次观察到的等待人数（后续只有变得更多才更新，保证进度不回退）
        if ($base <= 0 || $waiting > $base) {
            $base = max($waiting, 1);
            Cache::set($baseKey, $base, 86400);
        }

        if ($waiting <= 0) return 20;

        return max(0, min(20, (int) round(( $base - $waiting ) / $base * 20)));
    }

    /**
     * 把 task/logs 响应解析为终端内容事件（与云编译 buildSubProcessEvents 逻辑一致）
     *
     * - sub_process 各步骤：按状态发「执行中 / 完成 / 失败」一行（name 缺失时回退 operation_name）
     * - main 文本行：跳过 finish/fail 终态（由状态机处理），其余带文案的行各发一行
     * 返回事件自带 sig 供调用方去重（同一状态只发一次，避免每次轮询重复输出）
     *
     * @param array $response task/logs 原始响应
     * @return array 事件列表，每项含 sig / level / text / progress
     */
    protected function buildCompileEvents(array $response): array
    {
        $data = $response[ 'data' ] ?? [];
        $main = $data[ 'main' ] ?? [];
        $sub  = $data[ 'sub_process' ] ?? [];

        $events = [];

        // 阶段名映射：sub_process 的 key 是技术标识（如 weapp_upload），
        // 用 main 里的友好阶段名（如「微信上传」）做前缀，与云编译用 port 名一致
        $phaseNames = [];
        foreach ($main as $row) {
            $id = (string) ( $row[ 'id' ] ?? '' );
            if ($id !== '') $phaseNames[ $id ] = (string) ( $row[ 'name' ] ?? $id );
        }

        // 子流程步骤明细：与云编译 buildSubProcessEvents 同一套状态->文案映射
        foreach ($sub as $groupKey => $steps) {
            if (!is_array($steps)) continue;
            $groupKey   = is_string($groupKey) ? $groupKey : '';
            $groupLabel = $groupKey !== '' ? ( $phaseNames[ $groupKey ] ?? $groupKey ) : '';
            foreach ($steps as $s) {
                if (!is_array($s)) continue;
                // queue 的 check/dequeued 等事件型条目（type=event）无明确步骤结论，跳过
                if ((string) ( $s[ 'type' ] ?? '' ) === 'event') continue;

                $status = (string) ( $s[ 'status' ] ?? '' );
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

                $seq = (int) ( $s[ 'seq' ] ?? 0 );

                // 优先用友好步骤名；finish 等泛化名（完成/finish）改用 operation_name（如「小程序云部署完成，请扫码预览」）
                $name = (string) ( $s[ 'name' ] ?? '' );
                if ($name === '' || $name === '完成' || $name === 'finish') {
                    $name = (string) ( $s[ 'operation_name' ] ?? $name );
                }

                // finish 阶段：operation_name 已是完整结语，不再叠加「完成」后缀、也不再前缀阶段名
                if ($groupKey === 'finish') {
                    $text = $name;
                } else {
                    $text = ( $groupLabel !== '' ? '[' . $groupLabel . '] ' : '' ) . $name . $suffix;
                }

                $events[] = [
                    'sig'      => 'sub:' . $groupKey . ':' . $seq . ':' . $status,
                    'level'    => $level,
                    'text'     => $text,
                    'progress' => null
                ];

                // 失败步骤：把 error_desc（失败原因）单独输出到终端，便于定位问题
                if ($level === 'error') {
                    $errDesc = (string) ( $s[ 'error_desc' ] ?? '' );
                    if ($errDesc !== '') {
                        $events[] = [
                            'sig'      => 'sub:' . $groupKey . ':' . $seq . ':errdesc',
                            'level'    => 'error',
                            'text'     => $errDesc,
                            'progress' => null
                        ];
                    }
                }
            }
        }

        // main 文本行：终态 finish/fail 由状态机处理，其余带文案的行（如 init 的 finish_text）各发一行
        foreach ($main as $row) {
            $id = (string) ( $row[ 'id' ] ?? '' );
            if ($id === 'finish' || $id === 'fail') continue;
            $text = (string) ( $row[ 'desc' ] ?? ( $row[ 'operation_name' ] ?? '' ) );
            if ($text === '') continue;
            $events[] = [
                'sig'      => 'main:' . ( $id !== '' ? $id : md5($text) ) . ':' . $text,
                'level'    => (string) ( $row[ 'level' ] ?? 'info' ),
                'text'     => $text,
                'progress' => null
            ];
        }

        return $events;
    }

    /**
     * 取消云端小程序编译任务（新接口：POST task/cancel?task_id=）
     * @param string $taskId 云端编译任务标识
     */
    public function stopUploadAndClearLogs(string $taskId)
    {
        $query = [ 'task_id' => $taskId ];
        return ( new CloudService(true) )->httpPost('task/cancel', [ 'form_params' => $query ]);
    }

    /**
     * 获取插件定义的package目录
     * @param string $addon
     * @return string
     */
    public function geAddonPackagePath(string $addon)
    {
        return $this->addon_path . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
    }
}

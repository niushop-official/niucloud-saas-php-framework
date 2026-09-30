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

namespace app\service\core\niucloud;

use app\dict\addon\AddonDict;
use app\dict\sys\CloudBuildDict;
use app\model\addon\Addon;
use app\service\core\addon\CoreAddonBaseService;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\CoreAddonInstallService;
use app\service\core\addon\CoreAddonService;
use app\service\core\addon\WapTrait;
use core\base\BaseCoreService;
use core\exception\AddonException;
use core\exception\CloudBuildException;
use core\exception\CommonException;
use core\util\niucloud\CloudService;
use core\util\StepLogger;
use core\util\TaskLogger;
use app\dict\sys\TaskDict;
use GuzzleHttp\Exception\GuzzleException;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;

/**
 * 应用管理服务层
 */
class CoreCloudBuildService extends BaseCoreService
{
    private $cache_key = 'cloud_build_task';

    private $build_task;

    protected $root_path;

    protected $auth_code;

    protected $package_dir;

    use WapTrait;

    // 云编译相关接口（路由形式：[http方法]路由；操作名称记录在 name 字段）
    private const API_CLOUD_BUILD         = '[post]task/cloud/build';
    private const API_GET_BUILD_LOG       = '[get]task/logs';
    private const API_GET_QUEUE_POSITION  = '[get]task/queue_position';
    private const API_DOWNLOAD_BUILD      = '[get]task/download';
    private const API_CANCEL_BUILD        = '[post]task/cancel';

    /**
     * 微信小程序端端口目录（其产物结构与其它端口不同，需特殊处理）
     */
    private const MP_WEIXIN_PORT = 'mp-weixin';

    /**
     * 微信小程序端「框架产物」在下载包中的子目录：public/mp-weixin/build/mp-core
     * 需平铺部署到 public/mp-weixin 根目录（保证 utils/config.js 位于小程序源码根）
     */
    private const MP_WEIXIN_CORE_SUB_DIR = 'build' . DIRECTORY_SEPARATOR . 'mp-core';

    /**
     * 微信小程序端「插件产物」在下载包中的子目录：public/mp-weixin/mp-weixin-addons/{插件}
     * 仅同步到插件源码 addon/{插件}/dist/mp-weixin，不写入 public
     * （上传小程序时由 CoreWeappCloudService::handleUniapp 从 dist 合并为 mp-addons/{插件}）
     */
    private const MP_WEIXIN_ADDON_SUB_DIR = 'mp-weixin-addons';

    /**
     * 编译产物分片下载：单片大小（字节）
     * 单次请求只下载一片，避免大产物一次性下载被 PHP 最大执行时间中断导致 500
     */
    private const DOWNLOAD_CHUNK_SIZE = 5 * 1024 * 1024;

    /**
     * 编译产物分片下载：单片最大重试次数
     */
    private const DOWNLOAD_CHUNK_RETRY = 3;

    /**
     * 缓存任务的最大存活时长（秒）：写入缓存时的有效期
     *
     * 编译缓存此前是**永久**的：一旦进程异常中断（被杀 / 超时 / 队列重启），
     * 缓存会停留在中间态，把后续所有云编译都挡在 CLOUD_BUILD_TASK_EXIST 之外。
     * 这里给出兜底有效期（远长于一次正常编译），即使没有任何清理动作也会自然过期。
     */
    private const BUILD_TASK_CACHE_TTL = 86400;

    /**
     * 旧缓存（无统一任务标识）判定为残留的时长（秒，6 小时）
     *
     * 与任务最大执行时长（niucloud.task.max_duration）同一量级：
     * 超过它仍没被更新，只可能是中断留下的残骸。
     */
    private const BUILD_TASK_STALE_TTL = 21600;

    /**
     * 活跃判定窗口（秒）：缓存在该窗口内被写过，视为仍有进程在推进，不作为残骸清理
     */
    private const BUILD_TASK_ACTIVE_WINDOW = 300;

    // 接口路由 -> 操作名称（写入 name 字段）
    private const CLOUD_BUILD_API_NAME = [
        self::API_CLOUD_BUILD        => '发起云编译',
        self::API_GET_BUILD_LOG      => '获取编译日志',
        self::API_GET_QUEUE_POSITION => '获取排队位置',
        self::API_DOWNLOAD_BUILD     => '下载编译产物',
        self::API_CANCEL_BUILD       => '取消云编译任务',
    ];

    public function __construct()
    {
        parent::__construct();
        $this->root_path = project_path();
        $this->build_task = Cache::get($this->cache_key);
        $this->auth_code = ( new CoreNiucloudConfigService() )->getNiucloudConfig()[ 'auth_code' ] ?? '';
    }

    /**
     * 编译前环境检测
     * @return array|array[]
     */
    public function buildPreCheck()
    {
        $niucloud_dir = $this->root_path . 'niucloud' . DIRECTORY_SEPARATOR;
        $admin_dir = $this->root_path . 'admin' . DIRECTORY_SEPARATOR;
        $web_dir = $this->root_path . 'web' . DIRECTORY_SEPARATOR;
        $wap_dir = $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR;

        if (!is_dir($admin_dir)) throw new CommonException('ADMIN_DIR_NOT_EXIST');
        if (!is_dir($web_dir)) throw new CommonException('WEB_DIR_NOT_EXIST');
        if (!is_dir($wap_dir)) throw new CommonException('UNIAPP_DIR_NOT_EXIST');
        if (!class_exists('ZipArchive')) throw new CommonException('ZIP_ARCHIVE_NOT_EXIST');

        $data = [
            // 目录检测
            'dir' => [
                // 要求可读权限
                'is_readable' => [],
                // 要求可写权限
                'is_write' => []
            ]
        ];

        clearstatcache();

        // 校验niucloud/public niucloud/vendor 目录是否可读可写
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', public_path()), 'status' => is_readable(public_path()) ];
        $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $niucloud_dir . 'vendor'), 'status' => is_readable($niucloud_dir . 'vendor') ];

        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', public_path()), 'status' => is_write(public_path()) ];
        $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $niucloud_dir . 'vendor'), 'status' => is_write($niucloud_dir . 'vendor') ];

        // 校验niucloud/public下 wap web admin 目录及文件是否可读可写
        $check_res = checkDirPermissions(public_path() . 'wap');
        $check_res = array_merge2($check_res, checkDirPermissions(public_path() . 'admin'));
        $check_res = array_merge2($check_res, checkDirPermissions(public_path() . 'web'));

        if (!empty($check_res[ 'unreadable' ])) {
            foreach ($check_res[ 'unreadable' ] as $item) {
                $data[ 'dir' ][ 'is_readable' ][] = [ 'dir' => str_replace(project_path(), '', $item), 'status' => false ];
            }
        }
        if (!empty($check_res[ 'not_writable' ])) {
            foreach ($check_res[ 'not_writable' ] as $item) {
                $data[ 'dir' ][ 'is_write' ][] = [ 'dir' => str_replace(project_path(), '', $item), 'status' => false ];
            }
        }

        $check_res = array_merge(
            array_column($data[ 'dir' ][ 'is_readable' ], 'status'),
            array_column($data[ 'dir' ][ 'is_write' ], 'status')
        );

        // 是否通过校验
        $data[ 'is_pass' ] = !in_array(false, $check_res);

        return $data;
    }

    /**
     * 云编译
     * @return array
     * @throws GuzzleException
     */
    public function cloudBuild($param = [])
    {
        if (empty($this->auth_code)) {
            throw new CommonException('CLOUD_BUILD_AUTH_CODE_NOT_FOUND');
        }
        // 缓存与实际任务可能对不上（进程被杀 / 超时 / 队列重启后缓存停在中间态），
        // 发起前先按「统一任务表 + 缓存新鲜度」判定并清理残留，避免无任务也被挡住
        $this->purgeStaleBuildTask();

        if ($this->build_task) throw new CommonException('CLOUD_BUILD_TASK_EXIST');

        set_time_limit(0);

        $param['checkLocal'] = $param['checkLocal'] ?? true;

        // 全部插件
        $all_addon = array_keys((new CoreAddonService())->getInstallAddonList());

        // 排除的插件
        $exclude_addon = [];
        if ($param['scope'] == CloudBuildDict::SCOPE_PLUGIN) {
            $exclude_addon = array_values(array_diff($all_addon, $param['addon']));
        } else if ($param['scope'] == CloudBuildDict::SCOPE_FRAMEWORK) {
            $exclude_addon = $all_addon;
        }

        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
        $package_dir = $temp_dir . 'package' . DIRECTORY_SEPARATOR;
        $this->package_dir = $package_dir;
        dir_mkdir($package_dir);

        // 由 getBuildLog 在首次轮询时一次性提交 zip 并获取云端编译 task_id
        $this->build_task = [
            'task_key'   => $task_key,
            'timestamp'  => time(),
            'checkLocal' => $param['checkLocal'],
            'task_id'    => '', // 云端编译任务ID(提交后回填)
            'auth_code'  => $this->auth_code,
            'filename'   => $task_key . '.zip',
            'build_param'=> $param,
            'command'    => [],
            'status'     => 'prepared', // prepared -> queued -> running -> success/failed
            // 阶段标记（供任务步骤模型定位当前步骤）：
            // packaging(打包) -> uploading(上传) -> compiling(云端编译) -> downloading(下载产物) -> deploying(部署) -> done
            'phase'      => 'packaging',
            'phase_times'=> [ 'packaging' => [ 'start' => time(), 'end' => 0 ] ], // 各阶段真实起止时间（供步骤展示真实耗时）
            'progress'   => 0,
            'position'   => 0,
            'waiting_count' => 0,
            'chunk'      => 0,       // 当前已上传分片序号（分片上传阶段使用）
            'total_chunk'=> 0        // 总分片数（分片上传阶段使用，完成后清除）
        ];

        // 拷贝手机端文件
        if (in_array(CloudBuildDict::PORT_H5, $param['port']) || in_array(CloudBuildDict::PORT_MP_WEIXIN, $param['port'])) {
            dir_copy($this->root_path . 'uni-app', $package_dir . 'uni-app', exclude_dirs: [ '.build', '.hbuilderx', 'node_modules', 'unpackage', 'dist', '.git' ]);
            // 未参与编译的插件：必须按「插件根 + 插件名」精确删除（见 purgeExcludeAddon 注释）
            $this->purgeExcludeAddon($package_dir . 'uni-app' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon', $exclude_addon);
            // 如果有排除的插件
            if (!empty($exclude_addon)) {
                // 处理pages.json
                $this->handlePageCode($package_dir . 'uni-app' . DIRECTORY_SEPARATOR .'src' . DIRECTORY_SEPARATOR, $param['addon']);
            }

            // 只编译真正有 uni-app 前端源码的插件（纯后端插件会让整批构建命令失败）
            $uniapp_addon = $this->filterPortAddons($param['addon'], [ 'uni-app', 'src', 'addon' ]);

            if (in_array(CloudBuildDict::PORT_H5, $param['port'])) {
                $this->getPortBuildMeta(CloudBuildDict::PORT_H5, $uniapp_addon);
            }

            if (in_array(CloudBuildDict::PORT_MP_WEIXIN, $param['port'])) {
                $this->getPortBuildMeta(CloudBuildDict::PORT_MP_WEIXIN, $uniapp_addon);
            }
        }

        // 拷贝admin端文件
        if (in_array(CloudBuildDict::PORT_ADMIN, $param['port'])) {
            dir_copy($this->root_path . 'admin', $package_dir . 'admin', exclude_dirs: [ '.build', 'node_modules', 'dist', '.vscode', '.idea', '.git' ]);
            if (!empty($exclude_addon)) {
                foreach ($exclude_addon as $name) {
                    @del_target_dir($package_dir . 'admin' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon'. DIRECTORY_SEPARATOR . $name, true);
                }
            }
            $this->getPortBuildMeta(CloudBuildDict::PORT_ADMIN, $param['addon']);
        }

        // 拷贝web端文件
        if (in_array(CloudBuildDict::PORT_WEB, $param['port'])) {
            dir_copy($this->root_path . 'web', $package_dir . 'web', exclude_dirs: [ 'node_modules', '.output', '.nuxt', '.git' ]);
            // 同上：按精确路径删除未参与编译的插件，避免同名目录被误跳过
            $this->purgeExcludeAddon($package_dir . 'web' . DIRECTORY_SEPARATOR . 'addon', $exclude_addon);
            $this->getPortBuildMeta(CloudBuildDict::PORT_WEB, $param['addon']);
        }

        // 自定义端口
        if ($param['scope'] == CloudBuildDict::SCOPE_CUSTOM) {
            $this->handleCustomPort($package_dir, $param['port']);
        }

        file_put_contents(
            $this->package_dir . 'command.json',
            json_encode($this->build_task['command'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
        );

        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'build.zip';
        // 打包前清理残留文件（PHP8.3+ 对已存在的空文件执行 ZipArchive::open 会抛弃用异常）
        if (is_file($zip_file)) @unlink($zip_file);
        // 打包失败必须中断：否则会上传一个不完整的源码包，
        // 云端的表现就是编译期各种 ENOENT（无法从错误信息反推真实原因）
        if (!( new CoreAddonDevelopDownloadService('') )->compressToZip($package_dir, $zip_file)) {
            throw new AddonException('ADDON_ZIP_ERROR');
        }

        $this->build_task['zip_file'] = $zip_file;
        // 打包阶段实际结束时间（compressToZip 完成即打包完成）
        $this->build_task['phase_times']['packaging']['end'] = time();

        $this->saveBuildTask();
        $this->cloudBuildLogStep($task_key, 'prepare_package', self::API_CLOUD_BUILD, '打包源码并生成编译压缩包', [
            'scope' => $param[ 'scope' ] ?? '',
            'port'  => $param[ 'port' ] ?? [],
            'addon' => $param[ 'addon' ] ?? []
        ], [
            'task_key' => $task_key,
            'filename' => $task_key . '.zip'
        ], 'success', [ 'method' => self::API_GET_BUILD_LOG, 'params' => [] ]);
        return $this->build_task;
    }

    /**
     * 写入编译任务缓存（统一带有效期，避免永久残留）
     * @return void
     */
    private function saveBuildTask(): void
    {
        if (empty($this->build_task)) {
            Cache::set($this->cache_key, null);
            return;
        }

        // 最近更新时间：用于区分「正在推进的任务」与「中断留下的残骸」
        $this->build_task[ 'updated_at' ] = time();

        Cache::set($this->cache_key, $this->build_task, self::BUILD_TASK_CACHE_TTL);
    }

    /**
     * 进入新阶段并记录真实起止时间
     *
     * 用于「步骤展示真实耗时」：每个阶段进入时记录 start，离开时以上一阶段进入新阶段的时刻为 end，
     * 相邻阶段时间连续。阶段顺序：packaging -> uploading -> compiling -> downloading -> deploying。
     * @param string $phase
     * @return void
     */
    private function enterPhase(string $phase): void
    {
        if (empty($this->build_task)) return;

        $now = time();
        $cur = (string) ( $this->build_task[ 'phase' ] ?? '' );

        // 关闭上一阶段：以其离开时刻（即新阶段进入时刻）作为结束时间
        if ($cur !== '' && $cur !== $phase) {
            if (empty($this->build_task[ 'phase_times' ][ $cur ][ 'end' ])) {
                $this->build_task[ 'phase_times' ][ $cur ][ 'end' ] = $now;
            }
        }

        if (empty($this->build_task[ 'phase_times' ][ $phase ][ 'start' ])) {
            $this->build_task[ 'phase_times' ][ $phase ][ 'start' ] = $now;
        }

        $this->build_task[ 'phase' ] = $phase;
    }

    /**
     * 清理残留的编译任务缓存
     *
     * 判定口径（依次）：
     * 1. 缓存中的任务已是终态（success / failed）：上次任务已结束但缓存没清干净；
     * 2. 缓存里的 task_key 在统一任务表中**不存在或已终态**：任务真的没有了，缓存是残骸
     *    —— 这正是「没有任务却提示 CLOUD_BUILD_TASK_EXIST」的成因；
     * 3. 缓存里没有 task_key（改造前遗留）：按时间戳新鲜度兜底，超过 BUILD_TASK_STALE_TTL 视为残留。
     *
     * 只有「统一任务表中确实存在非终态的 cloud_build 任务」时才保留拦截。
     *
     * @return void
     */
    private function purgeStaleBuildTask(): void
    {
        if (empty($this->build_task)) return;

        // 1. 终态缓存
        if (in_array((string) ( $this->build_task[ 'status' ] ?? '' ), [ 'success', 'failed' ], true)) {
            Cache::set($this->cache_key, null);
            $this->build_task = null;
            return;
        }

        $taskKey = (string) ( $this->build_task[ 'task_key' ] ?? '' );

        // 2. 以统一任务表为准
        if ($taskKey !== '') {
            try {
                $status = Db::name('sys_task')->where([ [ 'task_key', '=', $taskKey ] ])->value('status');
            } catch (\Throwable $e) {
                // 查不到（表不可用）时保守处理：保留拦截，交由缓存有效期兜底
                return;
            }

            // 任务已被删除，或已终态：缓存是残骸
            if ($status === null || $status === '' || TaskDict::isTerminal((string) $status)) {
                // 保护窗口：缓存仍在被推进（如非任务化入口在跑）时不清理，
                // 避免把正在进行、只是没有任务记录的编译误判为残骸
                if (!$this->buildTaskActive()) {
                    Cache::set($this->cache_key, null);
                    $this->build_task = null;
                }
            }

            return;
        }

        // 3. 旧缓存：按新鲜度兜底
        $timestamp = (int) ( $this->build_task[ 'timestamp' ] ?? 0 );
        if ($timestamp <= 0 || ( time() - $timestamp ) > self::BUILD_TASK_STALE_TTL) {
            Cache::set($this->cache_key, null);
            $this->build_task = null;
        }
    }

    /**
     * 缓存中的编译任务是否仍在被推进（保护窗口内）
     *
     * 判据是「最近是否写过缓存」：云编译推进过程中每片都会回写缓存，
     * 因此短时间内有更新 = 有人正在跑；长时间无更新 = 中断留下的残骸。
     *
     * @return bool
     */
    private function buildTaskActive(): bool
    {
        $updated = (int) ( $this->build_task[ 'updated_at' ] ?? $this->build_task[ 'timestamp' ] ?? 0 );

        return $updated > 0 && ( time() - $updated ) < self::BUILD_TASK_ACTIVE_WINDOW;
    }

    private function getPortBuildMeta(string $key, array $addon = [])
    {
        $map = [
            CloudBuildDict::PORT_ADMIN => [
                'get_path' => 'admin',
                'put_path' => 'admin/dist',
                'public_path' => 'public/admin',
                'exclude_dir' => ['.core', '.addons', '.shared']
            ],
            CloudBuildDict::PORT_H5 => [
                'get_path' => 'uni-app',
                'put_path' => 'uni-app/dist/build/h5',
                'public_path' => 'public/wap',
                'exclude_dir' => ['.core', '.addons', '.shared']
            ],
            CloudBuildDict::PORT_MP_WEIXIN => [
                'get_path' => 'uni-app',
                'put_path' => 'uni-app/dist',
                'public_path' => 'public/mp-weixin',
                'exclude_dir' => []
            ],
            CloudBuildDict::PORT_WEB => [
                'get_path' => 'web',
                'put_path' => 'web/dist',
                'public_path' => 'public/web',
                'exclude_dir' => []
            ]
        ];

        $build_templates = CloudBuildDict::getPortTemplates();
        $command = preg_replace('/cd\s+\{root\}\/\S+\s*&&\s*/', '', $build_templates[$this->build_task['build_param']['scope']][$key]);
        $command = str_replace('{key}', implode(' ', $addon), $command);

        $this->buildCommand($key, $map[$key]['get_path'], $map[$key]['put_path'], $command, $map[$key]['public_path'], $map[$key]['exclude_dir']);
    }

    /**
     * @param $key
     * @param $get_path 压缩包中的文件目录
     * @param $put_path 解压后文件移动目标位置
     * @param $command 命令
     * @param $public_path 项目中的位置目录
     * @return void
     */
    /**
     * 删除未参与编译的插件目录
     *
     * 必须按「插件根目录 + 插件名」精确删除，不能把插件名放进 dir_copy 的 exclude_dirs：
     * dir_copy 对任意层级的目录名做全名匹配（in_array($file, $exclude_dirs)），
     * 未选中的插件若叫 hello_world，会把 web/addon/friend_help/pages/hello_world 一并跳过，
     * 导致上传到云端的源码缺文件，web 端编译报 ENOENT。
     *
     * @param string $addon_root 该端插件根目录
     * @param array $exclude_addon 未参与编译的插件名
     * @return void
     */
    private function purgeExcludeAddon(string $addon_root, array $exclude_addon): void
    {
        if (empty($exclude_addon) || !is_dir($addon_root)) return;
        foreach ($exclude_addon as $name) {
            if ($name === '') continue;
            $dir = rtrim($addon_root, '/\\') . DIRECTORY_SEPARATOR . $name;
            if (is_dir($dir)) {
                del_target_dir($dir, true);
            }
        }
    }

    /**
     * 只保留指定端存在源码的插件
     *
     * 纯后端插件（如 huaweicloud_obs、huaweicloud_sms 没有 uni-app 源码）若传给
     * build:h5:addon / build:mp-weixin:addon，会在该插件的 Windi CSS 环节失败并
     * process.exit，导致同一批命令里剩余插件全部拿不到编译产物。
     *
     * @param array $addon 参与本次编译的插件
     * @param array $src_segments 相对项目根的源码目录层级，如 ['uni-app','src','addon']
     * @return array
     */
    private function filterPortAddons(array $addon, array $src_segments): array
    {
        if (empty($addon)) return [];
        $src_root = rtrim($this->root_path, '/\\') . DIRECTORY_SEPARATOR . implode(DIRECTORY_SEPARATOR, $src_segments);
        $keys = [];
        foreach ($addon as $key) {
            if ($key === '') continue;
            if (is_dir($src_root . DIRECTORY_SEPARATOR . $key)) {
                $keys[] = $key;
            }
        }
        return $keys;
    }

    private function buildCommand($key, $get_path, $put_path, $command, $public_path, $exclude_dir = [])
    {
        $cmd = compact('key', 'get_path', 'put_path', 'command', 'public_path', 'exclude_dir');
        $this->build_task['command'][] = $cmd;
    }

    private function handlePageCode($compile_path, $addon_arr)
    {
        $pages = [];
        foreach ($addon_arr as $addon) {
            if (!file_exists($this->geAddonPackagePath($addon) . 'uni-app-pages.php')) continue;
            $uniapp_pages = require $this->geAddonPackagePath($addon) . 'uni-app-pages.php';
            if (empty($uniapp_pages[ 'pages' ])) continue;

            $page_begin = strtoupper($addon) . '_PAGE_BEGIN';
            $page_end = strtoupper($addon) . '_PAGE_END';

            // 对0.2.0之前的版本做处理
            $uniapp_pages[ 'pages' ] = preg_replace_callback('/(.*)(\\r\\n.*\/\/ PAGE_END.*)/s', function ($match) {
                return $match[ 1 ] . ( substr($match[ 1 ], -1) == ',' ? '' : ',' ) . $match[ 2 ];
            }, $uniapp_pages[ 'pages' ]);

            $uniapp_pages[ 'pages' ] = str_replace('PAGE_BEGIN', $page_begin, $uniapp_pages[ 'pages' ]);
            $uniapp_pages[ 'pages' ] = str_replace('PAGE_END', $page_end, $uniapp_pages[ 'pages' ]);
            $uniapp_pages[ 'pages' ] = str_replace('{{addon_name}}', $addon, $uniapp_pages[ 'pages' ]);

            $pages[] = $uniapp_pages[ 'pages' ];
        }

        $content = @file_get_contents($compile_path . "pages.json");
        $content = preg_replace_callback('/(.*\/\/ \{\{ PAGE_BEGAIN \}\})(.*)(\/\/ \{\{ PAGE_END \}\}.*)/s', function ($match) use ($pages) {
            return $match[ 1 ] . PHP_EOL . implode(PHP_EOL, $pages) . PHP_EOL . $match[ 3 ];
        }, $content);

        // 找到页面路由文件 pages.json，写入内容
        return file_put_contents($compile_path . "pages.json", $content);
    }

    /**
     * 获取自定义端口列表（供打包与前端展示共用）
     * 逻辑同 handleCustomPort：遍历站点已安装插件，读取其配置中的 port，
     * 仅保留目录真实存在的自定义端口
     * @return array 每项含 addon / port(原始配置) / name / dir(绝对目录)
     */
    private function getCustomPortList(): array
    {
        $addons = get_site_addons();
        $list = [];
        foreach ($addons as $addon) {
            $custom_port = ( new CoreAddonBaseService() )->getAddonConfig($addon)[ 'port' ] ?? [];
            if (empty($custom_port)) {
                continue;
            }
            $addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
            foreach ($custom_port as $port) {
                $name = $port[ 'name' ] ?? '';
                if (!$name) {
                    continue;
                }
                if (!is_dir($addon_path . $name)) {
                    continue;
                }
                $list[] = [
                    'addon' => $addon,
                    'port' => $port,
                    'name' => $name,
                    'dir' => $addon_path . $name
                ];
            }
        }
        return $list;
    }

    /**
     * 获取前端「自定义端口」范围下可选择的端口列表
     * @return array
     */
    public function getCustomPorts(): array
    {
        $ports = [];
        foreach ($this->getCustomPortList() as $item) {
            $addon = $item[ 'addon' ];
            $name = $item[ 'name' ];   
            $port = $item[ 'port' ];
            $ports[] = [
                'key' => $name,
                'addon' => $addon,
                'name' => $name,
                'label' => $port[ 'title' ] ?? $port[ 'label' ] ?? $name,
                'dir' => 'addon/' . $addon . '/' . $name,
                'icon' => $port[ 'icon' ] ?? 'Box',
                'color' => $port[ 'color' ] ?? '#f97316',
                // {root} 占位符由 buildCommand 接口替换为真实根目录
                'command' => 'cd {root}/addon/' . $addon . '/' . $name . ' && ' . ( $port[ 'command' ] ? str_replace(';', ' && ', $port[ 'command' ]) : 'npm run build' ),
            ];
        }
        return $ports;
    }

    private function handleCustomPort(string $package_dir, array $ports)
    {
        $all_port = array_column($this->getCustomPortList(), null, 'name');

        foreach ($ports as $name) {
            if (!isset($all_port[$name]) || empty($all_port[$name])) continue;

            $item = $all_port[$name];
            dir_copy($item[ 'dir' ], $package_dir . $item[ 'name' ]);
            $json_path = $package_dir . $item[ 'name' ] . DIRECTORY_SEPARATOR . 'info.json';
            file_put_contents($json_path, json_encode($item[ 'port' ]));

            $command = str_replace(';', ' && ', $item['command']);

            // 注意：第一个参数是端口标识（此前误传了整个配置数组，会导致 command.key 不是字符串）
            $this->buildCommand($name, $name, $name . '/' . $item['outDir'], $command, 'public/' . $name);
        }
    }

    /**
     * 获取编译任务
     * @return mixed
     */
    public function getBuildTask()
    {
        return $this->build_task;
    }

    /**
     * 云编译产物下载（解压后）目录
     *
     * @param string $cloudTaskKey 云编译任务标识；为空时取当前任务
     * @return string
     */
    public function downloadDir(string $cloudTaskKey = ''): string
    {
        $key = $cloudTaskKey !== '' ? $cloudTaskKey : (string) ( $this->build_task[ 'task_key' ] ?? '' );
        if ($key === '') return '';

        return task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $key . DIRECTORY_SEPARATOR . 'download' . DIRECTORY_SEPARATOR;
    }

    /**
     * 从云编译下载产物中提取插件各端编译产物，放到「本地编译输出目录」
     *
     * 目标目录与插件打包（CoreAddonDevelopBuildService）读取的目录保持一致：
     * - admin     => {root}/admin/dist/assets/addons/{插件}
     * - wap       => {root}/uni-app/dist/build/h5/assets/addons/{插件}
     * - mp-weixin => {root}/uni-app/dist/mp-weixin-addons/{插件}
     *
     * 与「部署」的区别：不写 public，不改动正在运行的站点，只是补齐打包所需的产物。
     *
     * @param string $compileFileDir 解压后的下载目录
     * @param array  $addonKeys 插件标识；为空时从下载包自动推导
     * @return array ['synced' => 已提取的插件, 'missing' => 未找到产物的插件]
     */
    public function extractAddonDist(string $compileFileDir, array $addonKeys = []): array
    {
        $dir = rtrim($compileFileDir, DIRECTORY_SEPARATOR);
        if ($dir === '' || !is_dir($dir)) return [ 'synced' => [], 'missing' => array_values($addonKeys) ];

        $publicBase = $dir . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR;
        $publicDirs = $this->resolveBuildPublicDirs($dir);
        $addons     = !empty($addonKeys) ? array_values($addonKeys) : $this->resolvePackageAddons($dir, $publicBase, $publicDirs);

        // 下载包端口 => 本地编译输出根目录（打包读取的目录）
        $targetMap = [
            'admin'     => $this->root_path . 'admin' . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons' . DIRECTORY_SEPARATOR,
            'wap'       => $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'build' . DIRECTORY_SEPARATOR . 'h5' . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons' . DIRECTORY_SEPARATOR,
            'mp-weixin' => $this->root_path . 'uni-app' . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'mp-weixin-addons' . DIRECTORY_SEPARATOR,
        ];

        $synced  = [];
        $missing = [];

        foreach ($addons as $addon) {
            $addon = (string) $addon;
            if ($addon === '') continue;

            $hit = false;
            foreach ($publicDirs as $rel) {
                if (!isset($targetMap[ $rel ])) continue; // web 等整站端口无按插件的产物

                $from = $this->resolveAddonCompileFrom($dir, $publicBase, $rel, $addon);
                if ($from === null) continue;

                $to = $targetMap[ $rel ] . $addon . DIRECTORY_SEPARATOR;
                if (is_dir($to)) del_target_dir($to, true);
                dir_mkdir($to);
                dir_copy($from, $to);
                $hit = true;
            }

            if ($hit) $synced[] = $addon;
            else $missing[] = $addon;
        }

        return [ 'synced' => array_values($synced), 'missing' => array_values($missing) ];
    }

    /**
     * 获取编译执行日志（轮询方式）
     * 1. 首次调用：将本地 zip 一次性提交到 /task/cloud/build，获取云端编译 task_id
     * 2. 轮询 /task/sub_process/content 获取扁平步骤流，解析进度与状态
     * 3. 全部端口编译完成：分片下载 /task/download 产物并部署（每次轮询只下一片）
     * @return array|null
     */
    public function getBuildLog()
    {
        if (!$this->build_task) return null;

        // 增量分片上传源码压缩包：每次轮询仅上传一个分片（先 file/upload，再 file/merge），
        // 最后用已上传的 filename 提交到 /task/cloud/build，避免大文件单次上传超时
        if (!empty($this->build_task[ 'zip_file' ]) && is_file($this->build_task[ 'zip_file' ])) {
            try {
                $message = $this->uploadBuildPackage();
            } catch (CloudBuildException $e) {
                return $this->buildUploadError($e->getMessage());
            }
            // 分片尚未全部上传完成，返回上传进度，等待下次轮询继续
            if (!empty($this->build_task[ 'zip_file' ]) && is_file($this->build_task[ 'zip_file' ])) {
                return $this->buildUploadProgress($message);
            }
        }

        // 进入编译日志轮询（仅记录一次）
        if (empty($this->build_task[ 'logged_build_compile' ])) {
            $this->cloudBuildLogStep($this->build_task[ 'task_key' ], 'build_compile', self::API_GET_BUILD_LOG, '云端编译进行中', [], [], 'success', [ 'method' => self::API_GET_BUILD_LOG, 'params' => [] ]);
            $this->build_task[ 'logged_build_compile' ] = true;
            $this->saveBuildTask();
        }

        $query = [ 'task_id' => $this->build_task[ 'task_id' ] ];
        // task/logs：返回 main（任务/阶段/端口主干定义）+ sub_process（各端口步骤明细）
        $response = ( new CloudService($this->build_task[ 'checkLocal' ] ?? false) )->httpGet('task/logs?' . http_build_query($query));

        if (!is_array($response)) $response = [];

        // 云端 task/logs 返回 main（主干：初始化 / 排队 / 上传 / 各端口 / 打包 / 完成）
        // 与 sub_process（每个端口一组步骤明细）
        $data = is_array($response[ 'data' ] ?? null) ? $response[ 'data' ] : [];
        $subProcess = $data[ 'sub_process' ] ?? [];
        if (!is_array($subProcess)) $subProcess = [];
        $result = $this->parseBuildLog($data);

        // 供任务步骤模型使用：保存精简的 main / sub_process 快照（只留展示所需字段，避免整包进缓存）
        $this->build_task[ 'main' ]        = $this->trimMain($data[ 'main' ] ?? []);
        $this->build_task[ 'sub_process' ] = $this->trimSubProcess($subProcess);

        // 推进本地任务进度/状态与排队信息
        $this->build_task[ 'progress' ] = $result[ 'progress' ];
        $this->build_task[ 'status' ]   = $result[ 'status' ];
        // 排队信息同步（出队后为 0）：始终覆盖，避免残留上一次的排队人数
        $this->build_task[ 'position' ]      = (int) ( $result[ 'position' ] ?? 0 );
        $this->build_task[ 'waiting_count' ] = (int) ( $result[ 'waiting_count' ] ?? 0 );
        $this->saveBuildTask();

        $items = $result[ 'items' ];

        if ($result[ 'status' ] === 'failed') {
            $this->build_task[ 'error_analysis' ] = $this->buildResultAnalysis($result[ 'failed_msg' ] ?: '云编译失败');
            // 云端已给出整体失败结论（全局条目 id=fail），本地任务随之终结：
            // 必须清理缓存中的 build_task，否则下次发起云编译会被 CLOUD_BUILD_TASK_EXIST 拦住。
            // 注意：属性 $this->build_task 仍保留，供本次响应的调用方判定 status=failed 使用
            Cache::set($this->cache_key, null);
            return [
                'code'           => 1,
                'data'           => [ $items ],
                'build_task'     => $this->build_task,
                'error_analysis' => $this->build_task[ 'error_analysis' ]
            ];
        }

        if ($result[ 'status' ] === 'success') {
            $download_items = $this->buildSuccess();
            $items = array_merge($items, $download_items);
        }

        return [
            'code'       => 1,
            'data'       => [ $items ],
            'build_task' => $this->build_task
        ];
    }

    /**
     * 增量分片上传源码压缩包：每次调用仅上传一个分片（file/upload），
     * 全部分片上传完成后调用 file/merge 合并，再用已上传的 filename 提交 /task/cloud/build 生成编译任务
     * @return string 上传进度提示（分片未传完时返回百分比提示，传完返回完成提示）
     * @throws CloudBuildException
     */
    private function uploadBuildPackage(): string
    {
        $chunk_size = 5 * 1024 * 1024; // 每个分片 5MB
        $cloud_service = new CloudService($this->build_task[ 'checkLocal' ] ?? false);

        // 初始化分片数与上传起点（仅首个分片记一次步骤）
        if (empty($this->build_task[ 'total_chunk' ])) {
            $total_chunk = (int) ceil(filesize($this->build_task[ 'zip_file' ]) / $chunk_size);
            $this->build_task[ 'total_chunk' ] = max($total_chunk, 1);
            $this->build_task[ 'chunk' ] = 0;
            // 进入上传阶段（步骤模型据此定位到「提交云编译任务」）
            $this->enterPhase('uploading');
            $this->cloudBuildLogStep($this->build_task[ 'task_key' ], 'upload_package', self::API_GET_BUILD_LOG, '分片上传源码压缩包', [
                'filename'    => $this->build_task[ 'filename' ],
                'total_chunk' => $this->build_task[ 'total_chunk' ]
            ], [], 'success', [ 'method' => self::API_GET_BUILD_LOG, 'params' => [] ]);
        }

        // 1. 上传当前分片
        $handle = fopen($this->build_task[ 'zip_file' ], 'rb');
        fseek($handle, $this->build_task[ 'chunk' ] * $chunk_size);
        $data = fread($handle, $chunk_size);
        fclose($handle);
        if ($data === false || $data === '') throw new CloudBuildException('源码压缩包读取失败');

        $response = $cloud_service->httpPost('file/upload', [
            'multipart' => [
                [
                    'name'     => 'task_id',
                    'contents' => $this->build_task[ 'task_key' ]
                ],
                [
                    'name'     => 'chunk',
                    'contents' => $this->build_task[ 'chunk' ]
                ],
                [
                    'name'     => 'file',
                    'contents' => $data,
                    'filename' => $this->build_task[ 'filename' ]
                ]
            ],
            'timeout' => 300.0
        ]);
        if (isset($response[ 'code' ]) && $response[ 'code' ] == 0) {
            throw new CloudBuildException($response[ 'msg' ] ?? '分片上传失败');
        }

        $this->build_task[ 'chunk' ] += 1;
        $this->saveBuildTask();

        // 分片未全部上传，本次调用结束，等待下次轮询继续上传
        if ($this->build_task[ 'chunk' ] < $this->build_task[ 'total_chunk' ]) {
            $percent = (int) floor($this->build_task[ 'chunk' ] / $this->build_task[ 'total_chunk' ] * 100);
            $this->build_task[ 'progress' ] = $percent;
            $this->saveBuildTask();
            return '源码上传中 ' . $percent . '%';
        }

        // 2. 所有分片上传完成，合并分片
        $response = $cloud_service->httpGet('file/merge?' . http_build_query([
                'filename' => $this->build_task[ 'filename' ],
                'task_id'  => $this->build_task[ 'task_key' ]
            ]));
        if (isset($response[ 'code' ]) && $response[ 'code' ] == 0) {
            throw new CloudBuildException($response[ 'msg' ] ?? '分片合并失败');
        }

        // 3. 用已上传的 filename 提交云端编译（不再整体上传文件）
        $this->submitBuildTask();

        return '源码上传完成,开始编译';
    }

    /**
     * 分片合并完成后，用已上传文件的 filename 提交到 /task/cloud/build 生成云端编译任务
     * POST /task/cloud/build  (multipart: authorize_code + filename)
     * @throws CloudBuildException
     */
    private function submitBuildTask()
    {
        $cloud_service = new CloudService($this->build_task[ 'checkLocal' ] ?? false);
        $response = $cloud_service->httpPost('task/cloud/build', [
            'multipart' => [
                [
                    'name'     => 'authorize_code',
                    'contents' => $this->build_task[ 'auth_code' ]
                ],
                [
                    'name'     => 'filename',
                    'contents' => $this->build_task[ 'filename' ]
                ]
            ],
            'timeout' => 600.0
        ]);

        if (!isset($response[ 'code' ]) || $response[ 'code' ] != 1) {
            throw new CloudBuildException($response[ 'msg' ] ?? '云编译任务提交失败');
        }

        $task_id = $response[ 'data' ][ 'task_id' ] ?? '';
        if (empty($task_id)) throw new CloudBuildException('云编译服务未返回任务ID');

        $this->build_task[ 'task_id' ]       = $task_id;
        $this->build_task[ 'position' ]      = $response[ 'data' ][ 'position' ] ?? 0;
        $this->build_task[ 'waiting_count' ] = $response[ 'data' ][ 'waiting_count' ] ?? 0;
        $this->build_task[ 'status' ]        = 'queued';
        // 已提交云端：进入编译日志阶段
        $this->enterPhase('compiling');
        $this->saveBuildTask();

        // 清理本地压缩包与源码目录，保留临时目录供编译产物下载使用
        @unlink($this->build_task[ 'zip_file' ]);
        @del_target_dir(dirname($this->build_task[ 'zip_file' ]) . DIRECTORY_SEPARATOR . 'package', true);
        unset($this->build_task[ 'zip_file' ], $this->build_task[ 'filename' ], $this->build_task[ 'chunk' ], $this->build_task[ 'total_chunk' ]);
        $this->saveBuildTask();

        $this->cloudBuildLogStep($this->build_task[ 'task_key' ], 'upload_complete', self::API_GET_BUILD_LOG, '源码上传完成并已提交云端编译', [
            'task_id' => $task_id
        ], [], 'success', [ 'method' => self::API_GET_BUILD_LOG, 'params' => [] ]);
    }

    /**
     * 解析 task/logs 返回结构：main（任务主干）+ sub_process（各端口步骤明细）
     *
     * main 为按执行顺序排列的主干条目，type 取值：
     * - type=task：任务级节点（id=init 任务初始化 / id=finish 完成）
     * - type=phase：阶段节点（id=queue 排队 / id=upload 上传 / id=package 打包）
     * - type=port：端口节点（id=port_{key}；port_config.key 为端口键，port_config.get_path 为源码目录）
     * status 取值：pending / in_progress / completed / failed
     *
     * sub_process 以 main 节点的 id 为键（queue / upload / port_{key} / package / finish），
     * 组内条目携带 type（step=步骤明细，event=事件）、status、progress、operation_name。
     *
     * 日志组织：取 main 中「当前推进到的节点」id → 从 sub_process[id] 取该节点的明细 →
     * 逐条输出明细的 operation_name（按 seq 排序、跳过 pending 与 event 类条目）。
     *
     * 整体结论：
     * - main 中最后一条 id=finish 且 status=completed => 编译完成，产物就绪，可以开始下载
     * - main 中任一主干条目 status=failed => 本次编译失败
     * - 其余按端口执行情况给出 running / queued
     *
     * @param array $data task/logs 的 data
     * @return array [ 'status', 'progress', 'items', 'failed_msg', 'position', 'waiting_count' ]
     */
    private function parseBuildLog(array $data): array
    {
        $main       = is_array($data[ 'main' ] ?? null) ? $data[ 'main' ] : [];
        $subProcess = is_array($data[ 'sub_process' ] ?? null) ? $data[ 'sub_process' ] : [];

        // 1. 主干节点扫描：定位失败节点（优先）与完成节点
        $failedItem = null;
        $finishItem = null;   // main 中最后一条 id=finish

        foreach ($main as $item) {
            if (!is_array($item)) continue;

            $id     = (string) ( $item[ 'id' ] ?? '' );
            $status = (string) ( $item[ 'status' ] ?? '' );

            // 完成节点：只保留最后一条，作为「可以开始下载」的唯一依据
            if ($id === 'finish') $finishItem = $item;

            // 主干节点失败即整体失败（其余端口不会再产出可用产物）
            if ($this->isBuildStatusFailed($status) && $failedItem === null) $failedItem = $item;
        }

        // 2. 当前进行中的节点：失败节点优先，否则取第一个未推进完成的节点
        $current = $failedItem ?? $this->currentMainStep($main);
        $stepId  = (string) ( $current[ 'id' ] ?? '' );

        $items = [];

        // 3. 日志项：只取「当前节点」对应的明细，逐条输出 operation_name
        //    文本带节点名前缀：不同端口可能有同名步骤（如「安装依赖」），
        //    而 Handler 侧按文本去重，没有前缀会把后续端口的同类步骤误判为已输出
        $stepName = trim((string) ( $current[ 'name' ] ?? $stepId ));

        $entries = ( $stepId !== '' && isset($subProcess[ $stepId ]) && is_array($subProcess[ $stepId ]) )
            ? $subProcess[ $stepId ] : [];

        // 排队阶段不产出静态日志行：排队是「过程态」，与上传 / 下载一样交由
        // Handler 下发 progress 事件，在终端里单行原地刷新（排到前面时文案随之变化）
        if ($stepId === 'queue') $entries = [];

        // 按 seq 排序：保证输出顺序与云端执行顺序一致
        usort($entries, function ($a, $b) {
            return (int) ( $a[ 'seq' ] ?? 0 ) <=> (int) ( $b[ 'seq' ] ?? 0 );
        });

        foreach ($entries as $entry) {
            if (!is_array($entry)) continue;
            // 事件类条目（如排队的 check / dequeued）不在这里输出：排队信息由 buildQueueEvent 单独回显
            if ((string) ( $entry[ 'type' ] ?? 'step' ) !== 'step') continue;

            $st = (string) ( $entry[ 'status' ] ?? '' );
            if ($this->isBuildStatusPending($st)) continue; // 尚未发生

            $operation = trim((string) ( $entry[ 'operation_name' ] ?? '' ));
            if ($operation === '') $operation = trim((string) ( $entry[ 'name' ] ?? '' ));
            if ($operation === '') continue;

            $failedHere = $this->isBuildStatusFailed($st);
            $errorDesc  = trim((string) ( $entry[ 'error_desc' ] ?? '' ));
            if ($errorDesc !== '' && $failedHere) {
                $operation = strpos($errorDesc, $operation) === 0 ? $errorDesc : $operation . '（' . $errorDesc . '）';
            }

            $text = $stepName !== '' ? $stepName . '：' . $operation : $operation;

            $items[] = [
                'code'    => 1,
                'msg'     => $text,
                'action'  => $text,
                'percent' => (int) ( $entry[ 'progress' ] ?? 0 ),
                'level'   => $failedHere ? 'error' : 'info'
            ];
        }

        // 4. 整体结论
        $failedMsg = '';
        if ($failedItem !== null) {
            $status = 'failed';
            $detail = trim((string) ( $failedItem[ 'error_desc' ] ?? '' ));
            if ($detail === '') $detail = trim((string) ( $failedItem[ 'name' ] ?? '' ));
            if ($detail === '') $detail = '云编译失败';

            // 失败环节（如 failed_line_name = 打包）优先展示，便于定位
            $lineName  = trim((string) ( $failedItem[ 'data' ][ 'failed_line_name' ] ?? '' ));
            $failedMsg = $lineName !== '' ? $lineName . '失败：' . $detail : $detail;

            // 失败汇总行（code=0，handler 据此判定任务以失败终结）
            $summary = '云编译失败';
            $items[] = [ 'code' => 0, 'msg' => $summary, 'action' => $summary, 'percent' => 100, 'level' => 'error' ];
        } elseif ($finishItem !== null && $this->isBuildStatusCompleted((string) ( $finishItem[ 'status' ] ?? '' ))) {
            // main 中最后一条 id=finish 完成 => 产物就绪，开始下载
            $status = 'success';
        } elseif ($this->hasMainRunning($main)) {
            $status = 'running';
        } else {
            $status = 'queued';
        }

        // 未成功前最高 99%：避免产物仍在打包阶段就显示 100%
        $progress = $this->calcMainProgress($main, $subProcess, $status);

        // 5. 排队信息：sub_process.queue 的 check 事件（出队事件 dequeued 视为排队结束）
        $queue = $this->parseQueueInfo($subProcess);

        return [
            'status'        => $status,
            'progress'      => $progress,
            'items'         => $items,
            'failed_msg'    => $failedMsg,
            'position'      => $queue[ 'position' ],
            'waiting_count' => $queue[ 'waiting_count' ],
        ];
    }

    /**
     * 云端状态：进行中
     * @param string $status
     * @return bool
     */
    private function isBuildStatusRunning(string $status): bool
    {
        return in_array(strtolower($status), [ 'running', 'in_progress', 'processing', 'started', 'executing' ], true);
    }

    /**
     * main 中是否存在「进行中」的节点
     * @param array $main
     * @return bool
     */
    private function hasMainRunning(array $main): bool
    {
        foreach ($main as $item) {
            if (!is_array($item)) continue;
            if ($this->isBuildStatusRunning((string) ( $item[ 'status' ] ?? '' ))) return true;
        }
        return false;
    }

    /**
     * 当前推进到的 main 节点
     *
     * 规则：第一个「进行中」的节点；没有进行中时取第一个未开始（pending）的节点；
     * 全部完成则取最后一个已完成的节点（finish 的明细是「等待客户端下载」）。
     *
     * @param array $main
     * @return array
     */
    private function currentMainStep(array $main): array
    {
        $pending  = [];
        $lastDone = [];

        foreach ($main as $item) {
            if (!is_array($item)) continue;

            $status = (string) ( $item[ 'status' ] ?? '' );
            if ($this->isBuildStatusRunning($status)) return $item;
            if ($this->isBuildStatusCompleted($status)) {
                $lastDone = $item;
                continue;
            }
            if ($this->isBuildStatusFailed($status)) continue;
            if (empty($pending)) $pending = $item;
        }

        return !empty($pending) ? $pending : $lastDone;
    }

    /**
     * 依据 main 推进情况计算整体进度
     *
     * 主干节点完成占比为主，叠加「当前节点」内部的步骤进度（sub_process 条目的 progress），
     * 未成功前上限 99%，避免产物仍在打包阶段就显示 100%。
     *
     * @param array  $main
     * @param array  $subProcess
     * @param string $status 整体状态
     * @return int
     */
    private function calcMainProgress(array $main, array $subProcess, string $status): int
    {
        if ($status === 'success') return 100;

        $total    = 0;
        $done     = 0;
        $inner    = 0;   // 当前节点内部进度（0-100）
        $innerSet = false;

        foreach ($main as $item) {
            if (!is_array($item)) continue;

            $id = (string) ( $item[ 'id' ] ?? '' );
            if ($id === '') continue;

            $total++;
            $itemStatus = (string) ( $item[ 'status' ] ?? '' );

            if ($this->isBuildStatusCompleted($itemStatus)) {
                $done++;
                continue;
            }
            if ($this->isBuildStatusFailed($itemStatus)) continue;

            // 第一个未完成 / 进行中的节点即当前节点
            if (!$innerSet) {
                $innerSet = true;
                $inner    = $this->stepInnerPercent(is_array($subProcess[ $id ] ?? null) ? $subProcess[ $id ] : []);
            }
        }

        if ($total === 0) return 5;

        $percent = (int) floor(( $done + $inner / 100 ) / $total * 100);

        return max(5, min(99, $percent));
    }

    /**
     * 单个 main 节点内部的完成度：取该节点明细中最大的步骤进度
     * @param array $entries sub_process 中该节点的明细
     * @return int 0-100
     */
    private function stepInnerPercent(array $entries): int
    {
        $percent = 0;

        foreach ($entries as $entry) {
            if (!is_array($entry)) continue;
            if ((string) ( $entry[ 'type' ] ?? 'step' ) !== 'step') continue;
            if ($this->isBuildStatusPending((string) ( $entry[ 'status' ] ?? '' ))) continue;

            $percent = max($percent, (int) ( $entry[ 'progress' ] ?? 0 ));
        }

        return min(100, max(0, $percent));
    }

    /**
     * 解析排队信息（sub_process.queue）
     *
     * sub_process.queue 按时间正序追加，最后一条即当前最新排队状态；
     * 因此倒序取「最新的一条」有效排队信息作为当前排队状态（含 position / waiting_count），
     * 已出队（event=dequeued，或整段都没有排队数据）时返回 0。
     *
     * 云端排队信息返回结构（均兼容，否则排队期间取不到位置，终端没有回显）：
     * - 事件条目：type=event，event=waiting / check（带 data.position / data.waiting_count），
     *            出队时产出 event=dequeued；
     * - 步骤条目：type=step（id=step_enqueue），位置同样在 data 里——
     *            注意 step_enqueue 的 completed 仅代表「入队成功」，其后仍会追加 waiting 事件，
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
            // 未开始(pending)的条目不携带位置，继续往前看；completed 不代表出队（见上方说明）
            if ((string) ( $entry[ 'type' ] ?? 'step' ) === 'step') {
                if ($this->isBuildStatusPending((string) ( $entry[ 'status' ] ?? '' ))) continue;

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
     * 云端状态：已完成
     * @param string $status
     * @return bool
     */
    private function isBuildStatusCompleted(string $status): bool
    {
        return in_array($status, [ 'completed', 'success', 'done', 'finished' ], true);
    }

    /**
     * 云端状态：失败
     * @param string $status
     * @return bool
     */
    private function isBuildStatusFailed(string $status): bool
    {
        return in_array($status, [ 'failed', 'fail', 'error' ], true);
    }

    /**
     * 云端状态：未开始
     * @param string $status
     * @return bool
     */
    private function isBuildStatusPending(string $status): bool
    {
        return in_array($status, [ 'pending', 'waiting', '' ], true);
    }

    /**
     * 精简 main：仅保留任务步骤模型需要的字段
     * @param array $main
     * @return array
     */
    private function trimMain(array $main): array
    {
        $list = [];
        foreach ($main as $item) {
            if (!is_array($item)) continue;
            $type  = (string) ( $item[ 'type' ] ?? '' );
            $steps = [];
            if ($type === 'port') {
                foreach (( $item[ 'steps' ] ?? [] ) as $step) {
                    if (!is_array($step)) continue;
                    $steps[] = [
                        'step' => (int) ( $step[ 'step' ] ?? 0 ),
                        'id'   => (string) ( $step[ 'id' ] ?? '' ),
                        'name' => (string) ( $step[ 'name' ] ?? '' ),
                    ];
                }
            }
            $list[] = [
                'seq'      => (int) ( $item[ 'seq' ] ?? 0 ),
                'id'       => (string) ( $item[ 'id' ] ?? '' ),
                'name'     => (string) ( $item[ 'name' ] ?? '' ),
                'type'     => $type,
                'status'   => (string) ( $item[ 'status' ] ?? '' ),
                'port_key' => (string) ( $item[ 'port_config' ][ 'key' ] ?? '' ),
                // sub_process 中标识端口用的是源码目录（如 h5 端口为 uni-app），需一并保留用于对齐
                'get_path' => (string) ( $item[ 'port_config' ][ 'get_path' ] ?? '' ),
                'steps'    => $steps,
                'ts_start' => (string) ( $item[ 'ts_start' ] ?? '' ),
                'ts_end'   => (string) ( $item[ 'ts_end' ] ?? '' ),
            ];
        }
        return $list;
    }

    /**
     * 精简 sub_process：仅保留 step 类型条目中展示与进度所需字段
     * @param array $subProcess
     * @return array
     */
    private function trimSubProcess(array $subProcess): array
    {
        $list = [];
        foreach ($subProcess as $bundle) {
            if (!is_array($bundle)) continue;
            $items = [];
            foreach ($bundle as $entry) {
                if (!is_array($entry)) continue;
                if ((string) ( $entry[ 'type' ] ?? 'step' ) !== 'step') continue;
                $items[] = [
                    'id'             => (string) ( $entry[ 'id' ] ?? '' ),
                    'name'           => (string) ( $entry[ 'name' ] ?? '' ),
                    'operation_name' => (string) ( $entry[ 'operation_name' ] ?? '' ),
                    'seq'            => (int) ( $entry[ 'seq' ] ?? 0 ),
                    'status'         => (string) ( $entry[ 'status' ] ?? '' ),
                    'progress'       => (int) ( $entry[ 'progress' ] ?? 0 ),
                    // 失败原因：终端需要把失败步骤的 error_desc 输出出来，精简时不能丢
                    'error_desc'     => (string) ( $entry[ 'error_desc' ] ?? '' ),
                    'get_path'       => (string) ( $entry[ 'data' ][ 'get_path' ] ?? '' ),
                    'ts_start'       => (string) ( $entry[ 'ts_start' ] ?? '' ),
                    'ts_end'         => (string) ( $entry[ 'ts_end' ] ?? '' ),
                ];
            }
            if (!empty($items)) $list[] = $items;
        }
        return $list;
    }

    /**
     * 构建分片上传进度日志
     * @param string $message
     * @return array
     */
    private function buildUploadProgress(string $message)
    {
        return [
            'code' => 1,
            'data' => [
                [
                    [
                        'code' => '1',
                        'msg' => $message,
                        'action' => $message,
                        'percent' => 0
                    ]
                ]
            ],
            'build_task' => $this->build_task
        ];
    }

    /**
     * 构建上传错误日志并清除任务
     * @param string $message
     * @return array
     */
    private function buildUploadError(string $message)
    {
        $this->clearTask();
        return [
            'code' => 1,
            'data' => [
                [
                    [
                        'code' => '0',
                        'msg' => $message,
                        'action' => $message,
                        'percent' => 0
                    ]
                ]
            ],
            'build_task' => $this->build_task
        ];
    }

    /**
     * 编译异常分析
     * @param $msg
     * @return string[]
     */
    public function buildResultAnalysis($msg) {
        return ( new CoreModuleService() )->buildResultAnalysis($msg);
    }

    /**
     * 编译完成：分片下载 result.zip 并部署到 public 目录
     *
     * 采用 HTTP Range 分片下载（GET /task/download?task_id=... + Range: bytes=start-end），
     * 由轮询驱动，每次调用只下载一个分片，避免大产物一次性下载被 PHP 最大执行时间中断导致 500：
     * 1) 首次：HEAD 带 Range 取 Content-Range 得到总大小，计算总分片数 step，初始化 index=0
     * 2) 分片未下完：下载 index 对应的一片并追加写入 download.zip，index+1，输出下载进度
     * 3) index 超出 step：校验产物 -> 解压 -> 部署 -> 清理任务
     *
     * @return array 供前端展示的日志项
     * @throws CloudBuildException
     */
    public function buildSuccess(): array
    {
        $task_key = $this->build_task[ 'task_key' ];
        $temp_dir = task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
        dir_mkdir($temp_dir);
        $zip_file = $temp_dir . 'download.zip';

        // 1. 初始化分片信息（总大小 / 总分片数 / 当前片号）
        if (!isset($this->build_task[ 'step' ])) {
            $this->initDownloadMeta();
            // 不输出「下载 0%」进度事件：产物常小于单片 5MB，下载只有两跳（0% -> 100%），
            // 0% 只会渲染出一个空进度条；这里改为普通日志行（文本不带百分比，Handler 不会识别为进度事件）
            $sizeMb = round((int) ( $this->build_task[ 'length' ] ?? 0 ) / 1024 / 1024, 2);
            return [
                [ 'code' => 1, 'level' => 'info', 'action' => '开始下载编译产物（总大小 ' . $sizeMb . ' MB，分片 ' . $this->build_task[ 'step' ] . ' 个）' ]
            ];
        }

        // 2. 仍有数据未下载：本次只下载一片，剩余留给下次轮询，保证单次请求短耗时可续跑。
        //    以已下载字节数 offset 判定是否结束（而非片号），兼容服务端区间语义差异与半包返回
        $length = max((int) $this->build_task[ 'length' ], 1);
        if ((int) ( $this->build_task[ 'offset' ] ?? 0 ) < $length) {
            $this->downloadChunk($zip_file);
            $offset  = (int) ( $this->build_task[ 'offset' ] ?? 0 );
            $percent = min((int) floor($offset / $length * 100), 100);
            return [
                [ 'code' => 1, 'level' => 'info', 'action' => '编译产物下载 ' . $percent . '%', 'percent' => $percent ]
            ];
        }

        // 3. 全部分片下载完成：校验产物非空，避免空文件进入解压
        if (!is_file($zip_file) || filesize($zip_file) === 0) {
            $this->cloudBuildLogStep($task_key, 'download_fail', self::API_DOWNLOAD_BUILD, '云端编译产物下载失败', [], [ 'error' => '产物文件为空' ], 'fail', [ 'method' => self::API_DOWNLOAD_BUILD, 'params' => [] ]);
            $this->build_task[ 'status' ] = 'failed';
            $this->saveBuildTask();
            throw new CloudBuildException('编译产物下载失败：产物文件为空，请稍后重试或检查编译服务');
        }

        $zip_size = (int) filesize($zip_file);
        $zip      = new \ZipArchive();
        if ($zip->open($zip_file) !== true) {
            $retry = (int) ( $this->build_task[ 'download_retry' ] ?? 0 );
            // 解压失败：清空分片状态重新下载（仅重试一次，避免无限循环）
            if ($retry < 1) {
                @unlink($zip_file);
                unset($this->build_task[ 'step' ], $this->build_task[ 'index' ], $this->build_task[ 'length' ], $this->build_task[ 'offset' ]);
                $this->build_task[ 'download_retry' ] = $retry + 1;
                $this->saveBuildTask();
                $this->cloudBuildLogStep($task_key, 'unzip_fail', self::API_DOWNLOAD_BUILD, '编译产物解压失败，重新下载', [], [ 'error' => '压缩包损坏（大小：' . $zip_size . ' 字节）' ], 'fail', [ 'method' => self::API_DOWNLOAD_BUILD, 'params' => [] ]);
                return [
                    [ 'code' => 1, 'level' => 'warning', 'action' => '编译产物解压失败，已重新下载', 'percent' => 100 ]
                ];
            }

            $this->cloudBuildLogStep($task_key, 'unzip_fail', self::API_DOWNLOAD_BUILD, '编译产物解压失败', [], [ 'error' => '压缩包损坏或内容异常（大小：' . $zip_size . ' 字节）' ], 'fail', [ 'method' => self::API_DOWNLOAD_BUILD, 'params' => [] ]);
            $this->build_task[ 'status' ] = 'failed';
            $this->saveBuildTask();
            throw new CloudBuildException('编译产物解压失败（产物文件损坏或内容异常，可重试重新下载）');
        }

        dir_mkdir($temp_dir . 'download');
        $zip->extractTo($temp_dir . 'download');
        $zip->close();

        $this->cloudBuildLogStep($task_key, 'download_complete', self::API_DOWNLOAD_BUILD, '编译产物下载完成并解压', [], [], 'success', [ 'method' => self::API_DOWNLOAD_BUILD, 'params' => [] ]);

        // 进入部署阶段（步骤模型据此定位到「编译产物部署」）
        $this->enterPhase('deploying');
        // 插件打包场景：只下载产物不部署，打包时直接从下载目录提取插件产物，
        // 避免云编译产物覆盖本地 public（影响正在运行的站点）
        $deploy = (bool) ( $this->build_task[ 'build_param' ][ 'deploy' ] ?? true );
        if ($deploy) {
            $this->handleCompileFile($temp_dir . 'download');
        } else {
            $this->build_task[ 'download_dir' ] = $temp_dir . 'download';
        }
        $this->saveBuildTask();

        $this->buildResultAnalysis('success');

        $this->build_task[ 'status' ] = 'success';
        // 下载 + 解压 + 部署都已完成的标记：
        // Handler 据此在「本片」就把任务收敛为成功，不必等下一片靠「缓存已清」判定，
        // 避免任务停在「执行中」（下一片迟迟未到时会一直显示进行中）
        $this->build_task[ 'deploy_finish' ] = true;
        $this->saveBuildTask();
        // 任务已完成，无需再通知云端取消
        $this->clearTask(false);

        return [
            [ 'code' => 1, 'msg' => '编译产物下载完成并部署', 'action' => '编译产物下载完成并部署', 'percent' => 100 ]
        ];
    }

    /**
     * 初始化分片下载元信息
     * HEAD /task/download 带 Range: bytes=0-，从响应头 Content-Range（bytes start-end/total）
     * 解析产物总大小，计算总分片数 step 并初始化当前片号 index
     * @return void
     * @throws CloudBuildException
     */
    private function initDownloadMeta(): void
    {
        $query         = [ 'task_id' => $this->build_task[ 'task_id' ] ];
        $cloud_service = new CloudService($this->build_task[ 'checkLocal' ] ?? false);
        $url           = 'task/download?' . http_build_query($query);

        // 优先带 Range 的 HEAD：服务端返回 Content-Range（bytes start-end/total）可得总大小
        $length = 0;
        try {
            $response = $cloud_service->request('HEAD', $url, [
                'headers'         => [ 'Range' => 'bytes=0-' ],
                'connect_timeout' => 10.0,
                'timeout'         => 30.0
            ]);
            $length = $this->parseDownloadLength($response);
        } catch (\Throwable $e) {
            $length = 0;
        }

        // 退化：部分服务端 / 网关不接受带 Range 的 HEAD，改为普通 HEAD 取 Content-Length
        if ($length <= 0) {
            try {
                $response = $cloud_service->request('HEAD', $url, [
                    'connect_timeout' => 10.0,
                    'timeout'         => 30.0
                ]);
                $length = $this->parseDownloadLength($response);
            } catch (\Throwable $e) {
                $length = 0;
            }
        }

        if ($length <= 0) {
            throw new CloudBuildException('编译产物大小获取失败，无法分片下载');
        }

        $this->build_task[ 'length' ] = $length;
        $this->build_task[ 'step' ]   = max((int) ceil($length / self::DOWNLOAD_CHUNK_SIZE), 1);
        $this->build_task[ 'index' ]  = 0;
        $this->build_task[ 'offset' ] = 0; // 已下载字节数（分片推进的权威依据）
        // 进入产物下载阶段（步骤模型据此定位到「编译任务完成」）
        $this->enterPhase('downloading');
        $this->saveBuildTask();

        $this->cloudBuildLogStep($this->build_task[ 'task_key' ], 'download_start', self::API_DOWNLOAD_BUILD, '分片下载编译产物', [
            'length'      => $length,
            'total_chunk' => $this->build_task[ 'step' ]
        ], [], 'success', [ 'method' => self::API_DOWNLOAD_BUILD, 'params' => [] ]);
    }

    /**
     * 从响应头解析产物总大小
     * 优先 Content-Range（bytes start-end/total，取 "/" 之后的总大小），退化取 Content-Length
     * @param \Psr\Http\Message\ResponseInterface $response
     * @return int
     */
    private function parseDownloadLength($response): int
    {
        if (!$response || !method_exists($response, 'getHeader')) return 0;

        $range = $response->getHeader('Content-Range');
        if (!empty($range[ 0 ]) && strpos($range[ 0 ], '/') !== false) {
            return (int) trim(explode('/', $range[ 0 ])[ 1 ]);
        }

        $content_length = $response->getHeader('Content-Length');
        if (!empty($content_length[ 0 ])) return (int) $content_length[ 0 ];

        return 0;
    }

    /**
     * 下载一个分片并写入产物文件（单次请求只处理一片，保证短耗时、可续跑、可重试）
     * @param string $zip_file 产物文件路径
     * @return void
     * @throws CloudBuildException
     */
    private function downloadChunk(string $zip_file): void
    {
        $chunk_size = self::DOWNLOAD_CHUNK_SIZE;
        $offset     = (int) ( $this->build_task[ 'offset' ] ?? 0 );
        // 结束下标多取 1 字节冗余：兼容「闭区间 bytes=start-end」与「左闭右开」两种服务端实现。
        // 关键：不按固定片长推进，而是按服务端实际返回的字节数累加 offset，
        // 保证两种区间语义下写入的字节都是连续且完整的，不会出现错位/丢字节
        $end        = $offset + $chunk_size;

        $query      = [ 'task_id' => $this->build_task[ 'task_id' ] ];
        $last_error = '';

        for ($attempt = 1; $attempt <= self::DOWNLOAD_CHUNK_RETRY; $attempt++) {
            try {
                $response = ( new CloudService($this->build_task[ 'checkLocal' ] ?? false) )->request('GET', 'task/download?' . http_build_query($query), [
                    'headers'         => [ 'Range' => "bytes={$offset}-{$end}" ],
                    'connect_timeout' => 10.0,
                    'timeout'         => 120.0
                ]);
                $body = (string) $response->getBody();
                if ($body === '') throw new CloudBuildException('分片内容为空');

                // 服务端不支持 Range：返回了整包（远大于单片预期），一次性落盘并直接结束分片流程
                if (strlen($body) > $chunk_size + 1) {
                    if (@file_put_contents($zip_file, $body) === false) {
                        throw new CloudBuildException('编译产物文件写入失败');
                    }
                    $this->build_task[ 'offset' ] = strlen($body);
                    $this->build_task[ 'index' ]  = (int) $this->build_task[ 'step' ];
                    $this->saveBuildTask();
                    return;
                }

                // 首片用 wb 截断，避免复用上次残留的半包文件；后续分片追加写入
                $fp = @fopen($zip_file, $offset === 0 ? 'wb' : 'ab');
                if ($fp === false) throw new CloudBuildException('编译产物文件写入失败');
                fwrite($fp, $body);
                fclose($fp);

                // 以实际写入字节数推进，规避区间语义差异导致的「期望 N 字节，实际 N-1 字节」
                $this->build_task[ 'offset' ] = $offset + strlen($body);
                $this->build_task[ 'index' ]  = (int) $this->build_task[ 'index' ] + 1;
                $this->saveBuildTask();
                return;
            } catch (\Throwable $e) {
                $last_error = $e->getMessage();
                if ($attempt < self::DOWNLOAD_CHUNK_RETRY) sleep(1);
            }
        }

        throw new CloudBuildException('编译产物第 ' . ( (int) $this->build_task[ 'index' ] + 1 ) . ' 个分片下载失败：' . $last_error);
    }

    /**
     * 编译产物下载到本地并解压后，将各端编译文件更新到对应的 public 位置
     * - 全部编译：云端返回整端完整产物，整目录替换；其中插件部分再走「dist 中转」
     * - 仅插件：按「插件安装」方式，将下载包中每个插件的编译前端精准落到
     *          public/{端口}/assets/addons/{插件} 目录，避免清掉其它插件产物
     * - 框架 / 自定义端口：合并覆盖对应端目录（dir_copy 不会删除目标多余文件，保留其它插件产物）
     *
     * 全部编译 / 仅插件均会先把产物同步到插件源码的 addon/{插件}/dist/{端口} 目录，
     * 再由 dist 部署到 public，保证插件源码内的 dist 与线上 public 一致
     * （后续打包 / 重装插件才能带上已编译的前端产物）。
     * @param string $compileFileDir 解压后的下载目录
     */
    private function handleCompileFile($compileFileDir)
    {
        try {
            $compileFileDir = rtrim($compileFileDir, DIRECTORY_SEPARATOR);
            // 步骤记录：文件与 task_key 均由解压目录推导
            $taskKey = basename(dirname($compileFileDir));
            $apiLabel = self::API_GET_BUILD_LOG;
            $this->cloudBuildLogStep($taskKey, 'deploy_files', $apiLabel, '部署编译产物到 public 目录', [], [], 'success', [ 'method' => $apiLabel, 'params' => [] ]);
            $publicBase = $compileFileDir . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR;
            $buildParam = $this->build_task[ 'build_param' ] ?? [];
            $scope = $buildParam[ 'scope' ] ?? '';
            $addonKeys = !empty($buildParam[ 'addon' ]) ? $buildParam[ 'addon' ] : [];

            // 解析各端编译产物在下载包中的 public 子目录
            $publicDirs = $this->resolveBuildPublicDirs($compileFileDir);

            // 部署前备份本地受保护文件（如 niucloud.ico / assets/addons/index.json），避免被云编译产物覆盖
            $protectedBackup = $this->backupProtectedFiles();

            // 1. 全部编译：云端返回整端完整产物，整目录替换（含其它插件产物一并更新）
            if ($scope === CloudBuildDict::SCOPE_ALL) {
                foreach ($publicDirs as $rel) {
                    $from = $this->resolvePortCompileFrom($publicBase, $compileFileDir, $rel);
                    if ($from === null) continue;
                    $to = public_path() . $rel;
                    if (is_dir($to)) del_target_dir($to, true);
                    dir_copy($from, $to);
                }
                // 插件部分再走一遍「dist 中转」：先同步到插件源码 addon/{插件}/dist/{端口}，
                // 再由 dist 覆盖部署到 public，保证插件源码 dist 与线上产物一致
                $this->deployAddonDist($compileFileDir, $publicBase, $publicDirs, $addonKeys);
            }
            // 2. 仅插件：按「插件安装」方式，将每个插件的编译前端精准落盘到 public 指定子目录
            else if ($scope === CloudBuildDict::SCOPE_PLUGIN && !empty($addonKeys)) {
                $this->deployPluginFrontend($compileFileDir, $publicBase, $publicDirs, $addonKeys);
            }
            // 3. 框架 / 自定义端口：合并覆盖对应端目录，保留其它插件产物
            else {
                foreach ($publicDirs as $rel) {
                    $from = $this->resolvePortCompileFrom($publicBase, $compileFileDir, $rel);
                    if ($from === null) continue;
                    dir_copy($from, public_path() . $rel);
                }
            }

            // 部署完成后还原受保护的本地文件（整目录替换时已被删除，此处重建并还原）
            $this->restoreProtectedFiles($protectedBackup);

            // 部署后若覆盖了 public 下的 admin / wap，重建其插件索引（index.json 随插件产物更新）。
            // 这两个端口的 assets/addons/index.json 是本地生成的插件清单，必须随部署重新扫描，
            // 否则新编译的插件前端产物不会进入前端加载清单（页面/插件入口丢失或陈旧）。
            if (in_array('admin', $publicDirs, true)) {
                try {
                    ( new CoreAddonInstallService('') )->rebuildPublicAdminAddonIndexJson();
                } catch (\Throwable $e) {
                    Log::write("重建 admin 插件索引失败" .$e->getMessage());
                }
            }
            if (in_array('wap', $publicDirs, true)) {
                try {
                    ( new CoreAddonInstallService('') )->rebuildPublicWapAddonIndexJson();
                } catch (\Throwable $e) {
                    Log::write("重建 wap 插件索引失败" .$e->getMessage());
                }
            }

            // 步骤记录：部署完成（最终步）
            $apiLabel = self::API_GET_BUILD_LOG;
            $this->cloudBuildLogStep($taskKey, 'deploy_complete', $apiLabel, '编译产物部署完成', [], [], 'success', [ 'method' => $apiLabel, 'params' => [] ]);

        } catch (\Exception $e) {
            $this->cloudBuildLogStep($this->build_task[ 'task_key' ], 'deploy_fail', self::API_GET_BUILD_LOG, '编译产物部署失败', [], [ 'error' => $e->getMessage() ], 'fail', [ 'method' => self::API_GET_BUILD_LOG, 'params' => [] ]);
        }
    }

    /**
     * 部署前需要保留、不被云编译产物覆盖的 public 文件相对路径（相对于 public 根目录）
     * 这些文件由本地生成/维护（如站点图标、插件索引），覆盖会导致本地配置丢失
     * @return array
     */
    private function getProtectedPublicFiles(): array
    {
        return [
            'admin/niucloud.ico',
            'admin/assets/addons/index.json',
            'wap/niucloud.ico',
            'wap/assets/addons/index.json',
        ];
    }

    /**
     * 部署前备份受保护文件的当前内容
     * @return array map<绝对路径, 文件内容>
     */
    private function backupProtectedFiles(): array
    {
        $backup = [];
        foreach ($this->getProtectedPublicFiles() as $rel) {
            $path = public_path() . $rel;
            if (is_file($path)) {
                $backup[ $path ] = file_get_contents($path);
            }
        }
        return $backup;
    }

    /**
     * 部署后将受保护文件还原，确保本地维护的文件不被覆盖
     * @param array $backup map<绝对路径, 文件内容>
     */
    private function restoreProtectedFiles(array $backup)
    {
        foreach ($backup as $path => $content) {
            $dir = dirname($path);
            if (!is_dir($dir)) dir_mkdir($dir);
            file_put_contents($path, $content);
        }
    }

    /**
     * 仅插件编译：将下载包中每个插件的编译前端，按「插件安装」路径落盘到 public 指定子目录
     * 兼容三种下载包结构：
     *  - 插件包结构：download/addon/{addon}/dist/{port}（与打包插件 CoreAddonDevelopBuildService 一致）
     *  - 小程序结构：download/public/mp-weixin/mp-weixin-addons/{addon}（仅 mp-weixin 端）
     *  - 扁平结构：  download/public/{port}/assets/addons/{addon}
     * 目标统一为：public/{port}/assets/addons/{addon}（与插件安装 CoreAddonInstallService::installDir 一致）
     * web 端为整站生成（无 assets/addons 子目录），按整端合并覆盖处理；
     * mp-weixin 端插件产物只同步到 addon/{addon}/dist/mp-weixin，不写入 public
     * （上传小程序时由 CoreWeappCloudService::handleUniapp 从 dist 合并为 mp-addons/{addon}）；
     * 若下载包中不存在任何插件产物目录，则回退为「整端合并覆盖」，避免遗漏部署
     * @param string $compileFileDir
     * @param string $publicBase
     * @param array $publicDirs
     * @param array $addonKeys
     */
    private function deployPluginFrontend(string $compileFileDir, string $publicBase, array $publicDirs, array $addonKeys)
    {
        // public 端口子目录 => 插件包 dist 子目录名（与打包 / 安装一致）
        $distMap = [
            'admin'     => 'admin',
            'wap'       => 'wap',
            'mp-weixin' => 'mp-weixin',
        ];

        $deployed = false;
        foreach ($addonKeys as $addon) {
            foreach ($publicDirs as $rel) {
                // web 端为整站生成，无 assets/addons 子目录，按整端合并覆盖处理
                if ($rel === 'web') {
                    $from = $this->resolveCompileFrom($publicBase, $compileFileDir, $rel);
                    if ($from !== null) dir_copy($from, public_path() . $rel);
                    continue;
                }

                $distName = $distMap[ $rel ] ?? $rel;
                // 来源解析：插件包结构 / mp-weixin 专用结构 / 扁平 public 结构
                $from = $this->resolveAddonCompileFrom($compileFileDir, $publicBase, $rel, $addon);
                if ($from === null) continue;

                // 微信小程序端：插件产物只同步到插件源码 dist/mp-weixin，不写入 public
                if ($rel === self::MP_WEIXIN_PORT) {
                    $distDir = $this->getAddonDistDir($addon, $distName);
                    if ($distDir !== '') {
                        if (is_dir($distDir)) del_target_dir($distDir, true);
                        dir_copy($from, $distDir);
                        $deployed = true;
                    }
                    continue;
                }

                // 先同步到插件源码的 addon/{插件}/dist/{端口} 目录，再由 dist 部署到 public
                $source  = $from;
                $distDir = $this->getAddonDistDir($addon, $distName);
                if ($distDir !== '') {
                    if (is_dir($distDir)) del_target_dir($distDir, true);
                    dir_copy($from, $distDir);
                    $source = $distDir;
                }

                $to = public_path() . $rel . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons' . DIRECTORY_SEPARATOR . $addon;
                if (is_dir($to)) del_target_dir($to, true);
                dir_copy($source, $to);
                $deployed = true;
            }
        }

        // 下载包中不存在任何插件产物目录（结构不符），回退为整端合并覆盖
        if (!$deployed) {
            foreach ($publicDirs as $rel) {
                $from = $this->resolvePortCompileFrom($publicBase, $compileFileDir, $rel);
                if ($from === null) continue;
                dir_copy($from, public_path() . $rel);
            }
        }
    }

    /**
     * 插件前端产物「dist 中转」部署：先同步到插件源码的 addon/{插件}/dist/{端口}，
     * 再由 dist 覆盖部署到 public/{端口}/assets/addons/{插件}
     *
     * 适用：全部编译（整端替换后补充处理插件部分）/ 仅插件。
     * 作用：保证插件源码内的 dist 与线上 public 一致，后续打包 / 重装插件能带上已编译前端。
     * - web 端为整站生成，没有「按插件」的编译产物，不参与 dist 中转
     * - mp-weixin 端插件产物只同步 dist，不写入 public（上传小程序时由 handleUniapp 合并）
     * - 本地不存在该插件目录（已卸载 / 非本地插件）时跳过，不产生孤儿目录
     *
     * @param string $compileFileDir 解压后的下载目录
     * @param string $publicBase     下载包内 public 根目录
     * @param array  $publicDirs     端口目录（admin/web/wap/mp-weixin）
     * @param array  $addonKeys      插件标识；为空时从下载包自动推导
     * @return array 实际完成 dist 同步的插件标识
     */
    private function deployAddonDist(string $compileFileDir, string $publicBase, array $publicDirs, array $addonKeys = []): array
    {
        // public 端口子目录 => 插件包 dist 子目录名（与插件打包 / 安装一致）
        $distMap = [ 'admin' => 'admin', 'wap' => 'wap', 'mp-weixin' => 'mp-weixin' ];

        $addons = !empty($addonKeys) ? $addonKeys : $this->resolvePackageAddons($compileFileDir, $publicBase, $publicDirs);
        $synced = [];

        foreach ($addons as $addon) {
            foreach ($publicDirs as $rel) {
                if (!isset($distMap[ $rel ])) continue; // web 等整站端口无按插件的产物

                $from = $this->resolveAddonCompileFrom($compileFileDir, $publicBase, $rel, $addon);
                if ($from === null) continue;

                $distDir = $this->getAddonDistDir($addon, $distMap[ $rel ]);
                if ($distDir === '') continue;

                // 1. 同步到插件源码的 dist/{端口}
                if (is_dir($distDir)) del_target_dir($distDir, true);
                dir_copy($from, $distDir);
                $synced[] = $addon;

                // 2. 再由 dist 部署到 public（mp-weixin 例外：其插件产物不进 public，
                //    上传小程序时由 CoreWeappCloudService::handleUniapp 从 dist 合并为 mp-addons/{插件}）
                if ($rel === self::MP_WEIXIN_PORT) continue;

                $to = public_path() . $rel . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons' . DIRECTORY_SEPARATOR . $addon;
                if (is_dir($to)) del_target_dir($to, true);
                dir_copy($distDir, $to);

                $synced[] = $addon;
            }
        }

        return array_values(array_unique($synced));
    }

    /**
     * 插件源码中某端口的 dist 目录：addon/{插件}/dist/{端口}
     * 本地不存在该插件目录时返回空串（不做同步，避免产生孤儿目录）
     * @param string $addon
     * @param string $distName
     * @return string
     */
    private function getAddonDistDir(string $addon, string $distName): string
    {
        if ($addon === '' || $distName === '') return '';
        $addon_dir = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
        if (!is_dir($addon_dir)) return '';
        return $addon_dir . 'dist' . DIRECTORY_SEPARATOR . $distName . DIRECTORY_SEPARATOR;
    }

    /**
     * 解析下载包中某个插件在指定端口下的编译产物来源目录
     * 兼容两种下载包结构：插件包结构 download/addon/{插件}/dist/{端口} 优先，
     * 其次扁平结构 public/{端口}/assets/addons/{插件}
     * @param string $compileFileDir
     * @param string $publicBase
     * @param string $rel
     * @param string $addon
     * @return string|null
     */
    private function resolveAddonCompileFrom(string $compileFileDir, string $publicBase, string $rel, string $addon): ?string
    {
        $candidates = [
            $compileFileDir . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . $rel,
            $publicBase . $rel . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons' . DIRECTORY_SEPARATOR . $addon,
        ];
        // 微信小程序端：插件产物在 public/mp-weixin/mp-weixin-addons/{插件}，无 assets/addons 结构
        if ($rel === self::MP_WEIXIN_PORT) {
            array_splice($candidates, 1, 0, [
                $publicBase . $rel . DIRECTORY_SEPARATOR . self::MP_WEIXIN_ADDON_SUB_DIR . DIRECTORY_SEPARATOR . $addon
            ]);
        }
        foreach ($candidates as $c) {
            if (is_dir($c)) return $c;
        }
        return null;
    }

    /**
     * 从下载包自动推导其中包含的插件标识（全部编译时 build_param.addon 为空，需反推）
     * 同时识别插件包结构 download/addon/* 与扁平结构 public/{端口}/assets/addons/*
     * @param string $compileFileDir
     * @param string $publicBase
     * @param array  $publicDirs
     * @return array
     */
    private function resolvePackageAddons(string $compileFileDir, string $publicBase, array $publicDirs): array
    {
        $distMap = [ 'admin' => 'admin', 'wap' => 'wap', 'mp-weixin' => 'mp-weixin' ];
        $addons  = [];

        // 插件包结构：download/addon/{插件}/dist
        $addonRoot = $compileFileDir . DIRECTORY_SEPARATOR . 'addon';
        if (is_dir($addonRoot)) {
            foreach ((array) ( @scandir($addonRoot) ?: [] ) as $name) {
                if ($name === '.' || $name === '..') continue;
                if (is_dir($addonRoot . DIRECTORY_SEPARATOR . $name . DIRECTORY_SEPARATOR . 'dist')) $addons[] = $name;
            }
        }

        // 扁平结构：public/{端口}/assets/addons/{插件}
        foreach ($publicDirs as $rel) {
            if (!isset($distMap[ $rel ])) continue;
            $dir = $publicBase . $rel . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'addons';
            if (!is_dir($dir)) continue;
            foreach ((array) ( @scandir($dir) ?: [] ) as $name) {
                if ($name === '.' || $name === '..') continue;
                if (is_dir($dir . DIRECTORY_SEPARATOR . $name)) $addons[] = $name;
            }
        }

        // 微信小程序端：public/mp-weixin/mp-weixin-addons/{插件}
        $mpDir = $publicBase . self::MP_WEIXIN_PORT . DIRECTORY_SEPARATOR . self::MP_WEIXIN_ADDON_SUB_DIR;
        if (is_dir($mpDir)) {
            foreach ((array) ( @scandir($mpDir) ?: [] ) as $name) {
                if ($name === '.' || $name === '..') continue;
                if (is_dir($mpDir . DIRECTORY_SEPARATOR . $name)) $addons[] = $name;
            }
        }

        return array_values(array_unique($addons));
    }

    /**
     * 解析各端编译产物在下载包中的 public 子目录列表
     * 优先 command.json（含各端 public_path），其次 build_param.port，最后固定端口
     * @param string $compileFileDir
     * @return array
     */
    private function resolveBuildPublicDirs(string $compileFileDir): array
    {
        $publicDirs = [];

        // 1. 优先使用构建时生成的 command.json，精确还原各端编译产物落盘位置
        $commandFile = $compileFileDir . DIRECTORY_SEPARATOR . 'command.json';
        if (is_file($commandFile)) {
            $commands = json_decode(file_get_contents($commandFile), true) ?: [];
            foreach ($commands as $item) {
                $publicPath = $item[ 'public_path' ] ?? '';
                if (!$publicPath) continue;
                // public_path 形如 public/admin，取端口子目录（admin/web/wap/mp-weixin）
                $rel = trim(str_replace('public' . DIRECTORY_SEPARATOR, '', $publicPath), DIRECTORY_SEPARATOR);
                $rel = trim($rel, DIRECTORY_SEPARATOR);
                if ($rel !== '' && !in_array($rel, $publicDirs, true)) $publicDirs[] = $rel;
            }
        }

        // 2. 回退：依据 build_param 中的端口
        if (empty($publicDirs) && !empty($this->build_task[ 'build_param' ])) {
            $ports = $this->build_task[ 'build_param' ][ 'port' ] ?? [];
            foreach ($ports as $port) {
                $rel = $this->getPortPublicDir($port);
                if (!in_array($rel, $publicDirs, true)) $publicDirs[] = $rel;
            }
        }

        // 3. 最终回退：固定端口
        if (empty($publicDirs)) {
            $publicDirs = [ 'admin', 'web', 'wap', 'mp-weixin' ];
        }

        return $publicDirs;
    }

    /**
     * 解析下载包中某端口「整端」编译产物的来源目录（对外入口，已内含 mp-weixin 特殊结构）
     * @param string $publicBase
     * @param string $compileFileDir
     * @param string $rel
     * @return string|null
     */
    private function resolvePortCompileFrom(string $publicBase, string $compileFileDir, string $rel): ?string
    {
        // 微信小程序端：框架产物在 public/mp-weixin/build/mp-core，需平铺到 public/mp-weixin 根目录
        if ($rel === self::MP_WEIXIN_PORT) {
            $core = $this->resolveMpWeixinCoreFrom($publicBase, $compileFileDir);
            if ($core !== null) return $core;
        }
        return $this->resolveCompileFrom($publicBase, $compileFileDir, $rel);
    }

    /**
     * 解析下载包中微信小程序端「框架产物」目录
     * 候选：public/mp-weixin/build/mp-core（主）、public/mp-weixin/build/mp-weixin（兼容旧结构）
     * 两者都不存在时返回 null，由调用方回退为常规的 public/mp-weixin
     * @param string $publicBase
     * @param string $compileFileDir
     * @return string|null
     */
    private function resolveMpWeixinCoreFrom(string $publicBase, string $compileFileDir): ?string
    {
        $bases = [
            $publicBase . self::MP_WEIXIN_PORT . DIRECTORY_SEPARATOR,
            $compileFileDir . DIRECTORY_SEPARATOR . self::MP_WEIXIN_PORT . DIRECTORY_SEPARATOR,
        ];
        $subs = [
            self::MP_WEIXIN_CORE_SUB_DIR,
            'build' . DIRECTORY_SEPARATOR . self::MP_WEIXIN_PORT,
        ];
        foreach ($bases as $base) {
            foreach ($subs as $sub) {
                $dir = $base . $sub;
                if (is_dir($dir)) return $dir;
            }
        }
        return null;
    }

    /**
     * 解析下载包中某端口编译产物的来源目录
     * 优先 public/{rel}，其次下载包根目录下的 {rel}（自定义端口产物可能不在 public 目录下）
     * @param string $publicBase
     * @param string $compileFileDir
     * @param string $rel
     * @return string|null
     */
    private function resolveCompileFrom(string $publicBase, string $compileFileDir, string $rel): ?string
    {
        $from = $publicBase . $rel;
        if (!is_dir($from)) {
            $from = $compileFileDir . DIRECTORY_SEPARATOR . $rel;
        }
        return is_dir($from) ? $from : null;
    }

    /**
     * 编译端口 key 对应的本地 public 子目录
     * @param string $portKey
     * @return string
     */
    private function getPortPublicDir(string $portKey): string
    {
        $map = [
            CloudBuildDict::PORT_ADMIN => 'admin',
            CloudBuildDict::PORT_H5 => 'wap',
            CloudBuildDict::PORT_MP_WEIXIN => 'mp-weixin',
            CloudBuildDict::PORT_WEB => 'web',
        ];
        return $map[ $portKey ] ?? $portKey;
    }

    /**
     * 清除任务
     * @param bool $cancelRemote 是否通知云端取消任务（任务已完成/失败时传 false，避免对已结束任务重复取消）
     * @return void
     */
    public function clearTask($cancelRemote = true)
    {
        if (!$this->build_task) return;

        if ($cancelRemote && isset($this->build_task['task_id']) && !empty($this->build_task['task_id'])
            && ( $this->build_task['status'] ?? '' ) !== 'success') {
            try {
                ( new CloudService($this->build_task['checkLocal'] ?? false) )->httpPost('task/cancel', [
                    'form_params' => [
                        'task_id' => $this->build_task['task_id']
                    ]
                ]);
            } catch (\Throwable $e) {
            }
        }

        // 只清缓存、不清目录：download.zip 与解压后的 download 目录需在任务结束后继续保留，
        // 供任务详情「相关产物」查看与下载（$temp_dir 仅作说明，不做删除）
        $temp_dir = task_runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $this->build_task[ 'task_key' ] . DIRECTORY_SEPARATOR;
        Cache::set($this->cache_key, null);
    }

    /**
     * 任务临时目录（download.zip 与解压后的 download 目录均在此，任务结束后保留不删除）
     * @param string $taskKey
     * @return string key 非法时返回空串
     */
    public function getTaskDir(string $taskKey): string
    {
        // 仅允许任务 key 字符集，避免路径穿越
        if ($taskKey === '' || !preg_match('/^[a-zA-Z0-9_-]+$/', $taskKey)) return '';

        $relative = 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR;

        // 任务目录统一落在 task_runtime_path()（HTTP 与队列一致）；
        // 兼容历史目录：一并探测 runtime 下的应用子目录
        $candidates = [ task_runtime_path() . $relative ];
        foreach ((array) glob(rtrim(task_runtime_path(), '/\\') . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR) as $subDir) {
            $candidates[] = $subDir . DIRECTORY_SEPARATOR . $relative;
        }

        foreach ($candidates as $dir) {
            if (is_dir($dir)) return $dir;
        }

        return $candidates[ 0 ];
    }

    /**
     * 获取云编译步骤记录文件(steps.jsonl)路径，直接对齐统一任务管理器的任务目录
     * （与 core\util\TaskLogger::stepsFile(TaskDict::TYPE_CLOUD_BUILD, $taskKey) 完全一致，
     *  云编译历史现已统一复用任务管理器的记录）
     * @param string $taskKey
     * @return string
     */
    private function cloudBuildStepFile(string $taskKey): string
    {
        return TaskLogger::stepsFile(TaskDict::TYPE_CLOUD_BUILD, $taskKey);
    }

    /**
     * 写入一条云编译步骤记录（容错：记录失败不影响主流程）
     * 该文件即统一任务管理器的 steps.jsonl，前端历史详情由 TaskService::getSteps 读取
     * @param string $taskKey
     * @param string $step     步骤名
     * @param string $method   调用方法
     * @param array  $params   调用参数
     * @param array  $result   调用结果
     * @param string $status   success / fail
     * @param array  $next     下一步调用{method, params}
     */
    private function cloudBuildLogStep(string $taskKey, string $step, string $method, string $desc = '', array $params = [], array $result = [], string $status = 'success', array $next = [])
    {
        $file = $this->cloudBuildStepFile($taskKey);
        if (!$file) return;
        try {
            StepLogger::append($file, [
                'type'     => 'cloud_build',
                'task_key' => $taskKey,
                'step'     => $step,
                'name'     => self::CLOUD_BUILD_API_NAME[ $method ] ?? $method,
                'desc'     => $desc,
                'method'   => $method,
                'params'   => $params,
                'result'   => $result,
                'status'   => $status,
                'next'     => $next,
            ]);
        } catch (\Throwable $e) {
            // 记录失败不影响主流程
        }
    }

    /**
     * 获取插件定义的package目录
     * @param string $addon
     * @return string
     */
    public function geAddonPackagePath(string $addon)
    {
        return root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
    }

    /**
     * 云编译任务完成后清除任务（先记录明确的完成步骤，再清理任务）
     * @return mixed
     */
    public function finishCloudBuild()
    {
        $task_key = $this->build_task[ 'task_key' ] ?? '';
        $this->cloudBuildLogStep($task_key, 'finish', self::API_DOWNLOAD_BUILD, '云编译任务已完成并清除', [], [], 'success', []);
        return $this->clearTask(false);
    }

    /**
     * 用户主动取消/清除云编译任务
     * 已提交云端编译（存在 task_id 且任务未成功）时，先调用 task/cancel 通知云端取消，再清理本地任务
     * @return mixed
     */
    public function cancelCloudBuild()
    {
        $task_key = $this->build_task[ 'task_key' ] ?? '';
        $task_id  = $this->build_task[ 'task_id' ]  ?? '';

        // 已提交云端编译：调用 task/cancel 通知云端取消（记录调用结果与失败原因）
        if (!empty($task_id)) {
            try {
                $response = ( new CloudService($this->build_task[ 'checkLocal' ] ?? false) )->httpPost('task/cancel', [
                    'form_params' => [ 'task_id' => $task_id ]
                ]);
            } catch (\Throwable $e) {
            }
        }
        $this->cloudBuildLogStep($task_key, 'cancel', self::API_CANCEL_BUILD, '用户取消云编译任务', [], [], 'cancel', []);

        // 已显式通知云端取消，清理本地任务时不再重复发起取消
        return $this->clearTask(false);
    }

    /**
     * 恢复任务状态（断点续跑/任务快照还原）
     * @param array $state
     * @return void
     */
    public function restoreTask(array $state): void
    {
        if (!empty($state)) {
            $this->build_task = $state;
            $this->saveBuildTask();
        }
    }

}

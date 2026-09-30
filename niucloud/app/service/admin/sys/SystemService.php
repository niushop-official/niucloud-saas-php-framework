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

namespace app\service\admin\sys;

use app\job\sys\CheckJob;
use app\service\admin\home\AuthSiteService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\facade\Cache;
use think\facade\Db;
use think\facade\Log;
use Throwable;

/**
 * 系统信息服务层
 * Class SystemService
 * @package app\service\admin\sys
 */
class SystemService extends BaseAdminService
{
    /**
     * 队列检测结果缓存键（检测需等待队列回执，缓存避免每次等待）
     */
    const CACHE_KEY_CHECK_JOB = 'system_check_job_result';

    /**
     * MySQL 库容量统计缓存键前缀（information_schema 查询较慢，缓存 5 分钟）
     */
    const CACHE_KEY_MYSQL_STORAGE = 'system_mysql_storage_';

    /**
     * Windows 内存信息缓存键（外部命令查询开销较大，短期缓存）
     */
    const CACHE_KEY_WINDOWS_MEMORY = 'system_windows_memory';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array
     */
    public function getInfo()
    {
        return [
            'os' => PHP_OS,
            'environment' => $_SERVER[ 'SERVER_SOFTWARE' ],
            'php_v' => PHP_VERSION,
            'version' => config('version')
        ];
    }

    /**
     * 获取域名配置
     */
    public function getUrl()
    {
        return ( new CoreSysConfigService() )->getSceneDomain($this->site_id);
    }

    /**
     * 当前站点已开启的渠道
     * H5 / PC 的访问地址与站点列表使用同一套规则
     * @return array
     */
    public function getChannel()
    {
        $map = ( new AuthSiteService() )->getSiteOpenChannelMap([ $this->site_id ]);
        return $map[ $this->site_id ] ?? [];
    }

    /**
     * 获取系统信息
     * @return array
     */
    public function getSystemInfo()
    {
        $server = [];
        $server[] = [ "name" => get_lang('dict_setting.server_system'), "server" => PHP_OS ];
        $server[] = [ "name" => get_lang('dict_setting.server_setting'), "server" => PHP_SAPI ];
        $server[] = [ "name" => get_lang('dict_setting.php_version'), "server" => PHP_VERSION ];

        //环境权限
        $system_variables = [];
        //pdo
        $pdo = extension_loaded('pdo') && extension_loaded('pdo_mysql');
        $system_variables[] = [ "name" => "pdo", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $pdo ];
        //curl
        $curl = extension_loaded('curl') && function_exists('curl_init');
        $system_variables[] = [ "name" => "curl", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $curl ];
        //openssl
        $openssl = extension_loaded('openssl');
        $system_variables[] = [ "name" => "openssl", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $openssl ];
        //gd
        $gd = extension_loaded('gd');
        $system_variables[] = [ "name" => "GD库", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $gd ];
        //fileinfo
        $fileinfo = extension_loaded('fileinfo');
        $system_variables[] = [ "name" => "fileinfo", "need" => get_lang('dict_setting.php_authority_ask'), "status" => $fileinfo ];
        //目录权限
        $root_path = str_replace("\\", DIRECTORY_SEPARATOR, dirname(__FILE__, 5));
        $root_path = str_replace("../", DIRECTORY_SEPARATOR, $root_path);


        $dirs_list = [
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'runtime' . DIRECTORY_SEPARATOR, "need" => get_lang('dict_setting.file_authority_ask'), "path_name" => "/runtime", "name" => "runtime" ],
            [ "path" => $root_path . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR, "need" => get_lang('dict_setting.file_authority_ask'), "path_name" => "/public/upload", "name" => "upload" ],
        ];
        //目录 可读 可写检测
        foreach ($dirs_list as $k => $v) {
            $is_readable = is_readable($v[ "path" ]);
            $is_write = is_write($v[ "path" ]);
            if ($is_readable && $is_write) {
                $dirs_list[ $k ][ "status" ] = true;
            } else {
                $dirs_list[ $k ][ "status" ] = false;
            }
        }
        $system_variables = array_merge($system_variables, $dirs_list);

        //获取环境版本
        $server_version = [];
        $row = (array) Db::query("select VERSION() as verson");
        $server_version[] = [ "name" => get_lang('dict_setting.php_version'), "demand" => get_lang('dict_setting.php_ask'), "server" => PHP_VERSION ];
        $server_version[] = [ "name" => get_lang('dict_setting.mysql_version'), "demand" => get_lang('dict_setting.mysql_ask'), "server" => $row[ 0 ][ 'verson' ] ];

        // 进程：队列检测需等待队列回执（约5秒），不在本接口内阻塞，
        // 由前端异步调用 sys/job 获取；此处仅回填已缓存结果，并标记是否已检测
        $job_status = Cache::get(self::CACHE_KEY_CHECK_JOB);
        $process[] = [
            "name"    => "php think workerman",
            "need"    => get_lang('dict_setting.php_authority_ask'),
            "status"  => $job_status === null ? null : (bool) $job_status,
            "checked" => $job_status !== null
        ];

        return [
            "server" => $server,
            "dirs_list" => $dirs_list,
            'system_variables' => $system_variables,
            'server_version' => $server_version,
            'process' => $process,
            'environment' => $this->getEnvironmentInfo()
        ];
    }

    /**
     * 获取运行时环境指标（供环境检测看板使用）
     * 结构：runtime / php / performance(memory,disk,cpu,processes) / database(mysql) / redis
     * 所有取值均做兼容与异常兜底，任一指标获取失败不影响整体返回
     * @return array
     */
    public function getEnvironmentInfo()
    {
        return [
            'runtime'     => [
                'os'               => PHP_OS,
                'php_version'      => PHP_VERSION,
                'sapi'             => PHP_SAPI,
                'server_time'      => date('Y-m-d H:i:s'),
                'timezone'         => date_default_timezone_get(),
                'server_software'  => $_SERVER[ 'SERVER_SOFTWARE' ] ?? '-'
            ],
            'php'         => $this->getPhpConfig(),
            'performance' => [
                'memory'       => $this->getSystemMemory(),
                'disk'         => $this->getDiskUsage(root_path()),
                'cpu_cores'    => $this->getCpuCores(),
                'load_average' => function_exists('sys_getloadavg') ? ( sys_getloadavg() ?: [] ) : [],
                'processes'    => $this->getProcessInfo()
            ],
            'database'    => $this->getMysqlStats(),
            'redis'       => $this->getRedisStats()
        ];
    }

    /**
     * PHP 关键配置
     * @return array
     */
    private function getPhpConfig()
    {
        $opcache_enabled = false;
        if (function_exists('opcache_get_status')) {
            $opcache = @opcache_get_status(false);
            $opcache_enabled = is_array($opcache) && !empty($opcache[ 'opcache_enabled' ]);
        }
        return [
            'memory_limit'        => $this->iniValue('memory_limit'),
            'upload_max_filesize' => $this->iniValue('upload_max_filesize'),
            'post_max_size'       => $this->iniValue('post_max_size'),
            'max_execution_time'  => $this->iniValue('max_execution_time'),
            'opcache_enabled'     => $opcache_enabled,
            'extensions'          => $this->getPhpExtensions()
        ];
    }

    /**
     * 项目必需/可选扩展检测
     * 必需项与安装检测(app/install/controller/Index.php)保持一致：pdo、curl、openssl、gd、fileinfo、sodium，
     * 另加 zip（插件安装/云编译依赖）；可选项不影响系统运行，仅作提示
     * @return array
     */
    private function getPhpExtensions()
    {
        $required = [
            [ 'name' => 'pdo', 'status' => extension_loaded('pdo') && extension_loaded('pdo_mysql') ],
            [ 'name' => 'curl', 'status' => extension_loaded('curl') && function_exists('curl_init') ],
            [ 'name' => 'openssl', 'status' => extension_loaded('openssl') ],
            [ 'name' => 'gd', 'status' => extension_loaded('gd') ],
            [ 'name' => 'fileinfo', 'status' => extension_loaded('fileinfo') ],
            [ 'name' => 'sodium', 'status' => extension_loaded('sodium') ],
            [ 'name' => 'zip', 'status' => extension_loaded('zip') && class_exists('ZipArchive') ],
            [ 'name' => 'mbstring', 'status' => extension_loaded('mbstring') ],
            [ 'name' => 'json', 'status' => extension_loaded('json') ]
        ];

        $optional = [
            [ 'name' => 'redis', 'status' => extension_loaded('redis') ],
            [ 'name' => 'imagick', 'status' => extension_loaded('imagick') ],
            [ 'name' => 'bcmath', 'status' => extension_loaded('bcmath') ]
        ];

        $list = [];
        foreach ($required as $item) {
            $list[] = [ 'name' => $item[ 'name' ], 'need' => get_lang('dict_setting.php_authority_ask'), 'status' => (bool) $item[ 'status' ], 'optional' => false ];
        }
        foreach ($optional as $item) {
            $list[] = [ 'name' => $item[ 'name' ], 'need' => get_lang('dict_setting.php_authority_ask'), 'status' => (bool) $item[ 'status' ], 'optional' => true ];
        }
        return $list;
    }

    /**
     * 读取 php 配置（0 值需正常展示，不能当作空）
     * @param string $key
     * @return string
     */
    private function iniValue(string $key)
    {
        $value = ini_get($key);
        return ( $value === false || $value === '' ) ? '-' : $value;
    }

    /**
     * 系统内存使用情况（跨平台：Linux /proc/meminfo、Windows wmic|PowerShell|COM、macOS sysctl+vm_stat）
     * @return array
     */
    private function getSystemMemory()
    {
        $result = [ 'total' => 0, 'used' => 0, 'available' => 0, 'usage_percent' => 0, 'total_formatted' => '-', 'used_formatted' => '-', 'available_formatted' => '-' ];
        $memory = $this->readMemoryInfo();
        if ($memory[ 'total' ] > 0) {
            $result[ 'total' ] = $memory[ 'total' ];
            $result[ 'available' ] = $memory[ 'available' ];
            $result[ 'used' ] = max($memory[ 'total' ] - $memory[ 'available' ], 0);
            $result[ 'usage_percent' ] = (int) round($result[ 'used' ] / $memory[ 'total' ] * 100);
        }
        $result[ 'total_formatted' ] = $result[ 'total' ] > 0 ? $this->formatBytes($result[ 'total' ]) : '-';
        $result[ 'used_formatted' ] = $result[ 'total' ] > 0 ? $this->formatBytes($result[ 'used' ]) : '-';
        $result[ 'available_formatted' ] = $result[ 'total' ] > 0 ? $this->formatBytes($result[ 'available' ]) : '-';
        return $result;
    }

    /**
     * 跨平台读取系统内存（字节）：Linux /proc/meminfo、Windows wmic|PowerShell|COM、macOS sysctl+vm_stat
     * @return array ['total' => int, 'available' => int]
     */
    private function readMemoryInfo()
    {
        // 1. Linux：/proc/meminfo
        try {
            if (is_readable('/proc/meminfo')) {
                $info = [];
                foreach (explode("\n", (string) file_get_contents('/proc/meminfo')) as $line) {
                    if (preg_match('/^(\w+):\s+(\d+)\s*kB/i', trim($line), $m)) {
                        $info[ $m[ 1 ] ] = (int) $m[ 2 ] * 1024;
                    }
                }
                $total = $info[ 'MemTotal' ] ?? 0;
                if ($total > 0) {
                    $available = $info[ 'MemAvailable' ] ?? ( ( $info[ 'MemFree' ] ?? 0 ) + ( $info[ 'Buffers' ] ?? 0 ) + ( $info[ 'Cached' ] ?? 0 ) );
                    return [ 'total' => $total, 'available' => $available ];
                }
            }
        } catch (Throwable $e) {
        }

        $is_windows = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';

        // 2. Windows：wmic / PowerShell / COM 查询
        if ($is_windows) {
            $windows = $this->getWindowsMemory();
            if ($windows[ 'total' ] > 0) return $windows;
        }

        // 4. macOS：sysctl 总内存 + vm_stat 可用页
        if (PHP_OS === 'Darwin' && function_exists('exec')) {
            try {
                $total = (int) trim((string) @exec('sysctl -n hw.memsize'));
                $page_size = (int) trim((string) @exec('sysctl -n hw.pagesize')) ?: 4096;
                $vm = (string) @shell_exec('vm_stat');
                $pages = 0;
                foreach ([ 'Pages free', 'Pages inactive', 'Pages speculative' ] as $key) {
                    if (preg_match('/' . preg_quote($key, '/') . ':\s*(\d+)/i', $vm, $m)) {
                        $pages += (int) $m[ 1 ];
                    }
                }
                if ($total > 0) {
                    return [ 'total' => $total, 'available' => $pages * $page_size ];
                }
            } catch (Throwable $e) {
            }
        }

        return [ 'total' => 0, 'available' => 0 ];
    }

    /**
     * Windows 内存读取：wmic（优先） -> PowerShell(Get-CimInstance) -> COM
     * wmic 在新版 Windows 已移除，故以 PowerShell 为主要可用手段；
     * 外部命令启动有开销（约 0.3~1s），结果缓存 30 秒避免拖慢接口
     * @return array ['total' => int, 'available' => int]
     */
    private function getWindowsMemory()
    {
        $cached = Cache::get(self::CACHE_KEY_WINDOWS_MEMORY);
        if (is_array($cached)) return $cached;

        $result = [ 'total' => 0, 'available' => 0 ];

        // 1. wmic（单位 KB），存在时开销最小
        if (function_exists('exec')) {
            try {
                $output = [];
                @exec('wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /Value 2>nul', $output);
                $values = [];
                foreach ((array) $output as $line) {
                    if (preg_match('/(TotalVisibleMemorySize|FreePhysicalMemory)\s*=\s*(\d+)/i', (string) $line, $m)) {
                        $values[ strtolower($m[ 1 ]) ] = (int) $m[ 2 ] * 1024;
                    }
                }
                if (!empty($values[ 'totalvisiblememorysize' ])) {
                    $result = [ 'total' => $values[ 'totalvisiblememorysize' ], 'available' => $values[ 'freephysicalmemory' ] ?? 0 ];
                }
            } catch (Throwable $e) {
            }
        }

        // 2. PowerShell：Get-CimInstance（wmic 缺失时的通用方案，输出 "总内存,可用内存"，单位 KB）
        if ($result[ 'total' ] <= 0 && function_exists('exec')) {
            try {
                $output = [];
                @exec('powershell -NoProfile -Command "$os = Get-CimInstance Win32_OperatingSystem; Write-Output ($os.TotalVisibleMemorySize.ToString() + \',\' + $os.FreePhysicalMemory.ToString())"', $output);
                foreach ((array) $output as $line) {
                    if (preg_match('/(\d+)\s*,\s*(\d+)/', (string) $line, $m)) {
                        $result = [ 'total' => (int) $m[ 1 ] * 1024, 'available' => (int) $m[ 2 ] * 1024 ];
                        break;
                    }
                }
            } catch (Throwable $e) {
            }
        }

        // 3. COM 兜底
        if ($result[ 'total' ] <= 0 && class_exists('COM')) {
            try {
                $wmi = new \COM('Winmgmts://');
                foreach ($wmi->ExecQuery('SELECT TotalVisibleMemorySize,FreePhysicalMemory FROM Win32_OperatingSystem') as $item) {
                    $total = (int) $item->TotalVisibleMemorySize * 1024;
                    if ($total > 0) {
                        $result = [ 'total' => $total, 'available' => (int) $item->FreePhysicalMemory * 1024 ];
                        break;
                    }
                }
            } catch (Throwable $e) {
            }
        }

        if ($result[ 'total' ] > 0) Cache::set(self::CACHE_KEY_WINDOWS_MEMORY, $result, 30);
        return $result;
    }

    /**
     * 磁盘使用情况
     * @param string $path
     * @return array
     */
    private function getDiskUsage(string $path)
    {
        $result = [ 'total' => 0, 'used' => 0, 'free' => 0, 'usage_percent' => 0, 'total_formatted' => '-', 'used_formatted' => '-', 'free_formatted' => '-' ];
        try {
            $total = @disk_total_space($path);
            $free = @disk_free_space($path);
            if ($total !== false && $free !== false && $total > 0) {
                $result[ 'total' ] = (float) $total;
                $result[ 'free' ] = (float) $free;
                $result[ 'used' ] = max((float) $total - (float) $free, 0);
                $result[ 'usage_percent' ] = (int) round($result[ 'used' ] / (float) $total * 100);
                $result[ 'total_formatted' ] = $this->formatBytes($result[ 'total' ]);
                $result[ 'used_formatted' ] = $this->formatBytes($result[ 'used' ]);
                $result[ 'free_formatted' ] = $this->formatBytes($result[ 'free' ]);
            }
        } catch (Throwable $e) {
        }
        return $result;
    }

    /**
     * CPU 核心数
     * @return int
     */
    private function getCpuCores()
    {
        $cores = 0;
        try {
            if (is_readable('/proc/cpuinfo')) {
                $cores = preg_match_all('/^processor\s*:/m', (string) file_get_contents('/proc/cpuinfo'));
            }
            if (empty($cores)) $cores = (int) ( getenv('NUMBER_OF_PROCESSORS') ?: 0 );
        } catch (Throwable $e) {
        }
        return (int) $cores;
    }

    /**
     * 当前接口进程信息
     * @return array
     */
    private function getProcessInfo()
    {
        // 本次请求已执行时长（PHP-FPM 下不代表进程存活时长，仅作参考）
        $start = $_SERVER[ 'REQUEST_TIME_FLOAT' ] ?? microtime(true);
        $elapsed = (int) max(microtime(true) - (float) $start, 0);

        $rss = 0;
        try {
            if (is_readable('/proc/self/status')) {
                $status = (string) file_get_contents('/proc/self/status');
                if (preg_match('/VmRSS:\s+(\d+)\s*kB/i', $status, $m)) $rss = (int) $m[ 1 ] * 1024;
            }
        } catch (Throwable $e) {
        }

        $fd_count = 0;
        try {
            if (is_dir('/proc/self/fd') && is_readable('/proc/self/fd')) {
                $fd_count = max(count(@scandir('/proc/self/fd')) - 2, 0);
            }
        } catch (Throwable $e) {
        }

        return [
            'current'     => [
                'pid'                     => getmypid(),
                'state_label'             => '运行中',
                'uptime_text'             => $this->formatDuration($elapsed),
                'memory_rss_formatted'    => $rss > 0 ? $this->formatBytes($rss) : '-',
                'memory_usage_formatted'  => $this->formatBytes(memory_get_usage(true)),
                'memory_peak_formatted'   => $this->formatBytes(memory_get_peak_usage(true))
            ],
            'connections' => [
                'status_label' => ( connection_status() === 0 ) ? '正常' : '已断开',
                'fd_count'     => $fd_count
            ],
            'request'     => [
                'method'    => $_SERVER[ 'REQUEST_METHOD' ] ?? '-',
                'path'      => $_SERVER[ 'REQUEST_URI' ] ?? '-',
                'client_ip' => $_SERVER[ 'REMOTE_ADDR' ] ?? '-'
            ]
        ];
    }

    /**
     * MySQL 运行统计
     * @return array
     */
    private function getMysqlStats()
    {
        $result = [
            'driver'    => config('database.default') ?? 'mysql',
            'version'   => '',
            'variables' => [],
            'connections' => [ 'current' => 0, 'max' => 0, 'usage_percent' => 0 ],
            'queries'   => [ 'qps' => 0, 'slow' => 0, 'uptime_seconds' => 0 ],
            'innodb'    => [ 'buffer_hit_rate' => 0 ],
            'traffic'   => [ 'received_formatted' => '-', 'sent_formatted' => '-' ],
            'storage'   => [ 'tables' => 0, 'total_size_formatted' => '-', 'data_size_formatted' => '-', 'index_size_formatted' => '-', 'avg_table_size_formatted' => '-', 'large_tables' => [] ]
        ];
        try {
            $row = Db::query("select VERSION() as version");
            $result[ 'version' ] = $row[ 0 ][ 'version' ] ?? '';

            $status = $this->mysqlStatus();
            $variables = $this->mysqlVariables();

            $max_conn = (int) ( $variables[ 'max_connections' ] ?? 0 );
            $connected = (int) ( $status[ 'Threads_connected' ] ?? 0 );
            $result[ 'connections' ] = [
                'current'       => $connected,
                'max'           => $max_conn,
                'usage_percent' => $max_conn > 0 ? (int) round($connected / $max_conn * 100) : 0
            ];

            $uptime = (int) ( $status[ 'Uptime' ] ?? 0 );
            $questions = (int) ( $status[ 'Questions' ] ?? 0 );
            $result[ 'queries' ] = [
                'qps'            => $uptime > 0 ? round($questions / $uptime, 1) : 0,
                'slow'           => (int) ( $status[ 'Slow_queries' ] ?? 0 ),
                'uptime_seconds' => $uptime
            ];

            $read_requests = (int) ( $status[ 'Innodb_buffer_pool_read_requests' ] ?? 0 );
            $reads = (int) ( $status[ 'Innodb_buffer_pool_reads' ] ?? 0 );
            $result[ 'innodb' ] = [
                'buffer_hit_rate' => $read_requests > 0 ? round(( $read_requests - $reads ) / $read_requests * 100, 1) : 0
            ];

            $result[ 'traffic' ] = [
                'received_formatted' => $this->formatBytes((int) ( $status[ 'Bytes_received' ] ?? 0 )),
                'sent_formatted'     => $this->formatBytes((int) ( $status[ 'Bytes_sent' ] ?? 0 ))
            ];

            $result[ 'variables' ] = [ 'version_comment' => $variables[ 'version_comment' ] ?? '' ];
            $result[ 'storage' ] = $this->getMysqlStorage();
        } catch (Throwable $e) {
        }
        return $result;
    }

    /**
     * MySQL 状态变量（SHOW GLOBAL STATUS）
     * @return array
     */
    private function mysqlStatus()
    {
        // 按需取值：避免返回全部状态项（数百行）带来的解析与传输开销
        $keys = [
            'Threads_connected', 'Uptime', 'Questions', 'Slow_queries',
            'Innodb_buffer_pool_read_requests', 'Innodb_buffer_pool_reads',
            'Bytes_received', 'Bytes_sent'
        ];
        return $this->mysqlKeyValues("SHOW GLOBAL STATUS WHERE Variable_name IN (" . $this->quoteList($keys) . ")");
    }

    /**
     * 查询 MySQL 变量并转为 [变量名 => 值]
     * @param string $sql
     * @return array
     */
    private function mysqlKeyValues(string $sql)
    {
        $data = [];
        foreach (Db::query($sql) as $row) {
            $data[ $row[ 'Variable_name' ] ] = $row[ 'Value' ];
        }
        return $data;
    }

    /**
     * 组装 SQL IN 列表（变量名为固定白名单，仅做转义兜底）
     * @param array $values
     * @return string
     */
    private function quoteList(array $values)
    {
        return implode(',', array_map(fn($v) => "'" . addslashes($v) . "'", $values));
    }

    /**
     * MySQL 配置变量（SHOW VARIABLES）
     * @return array
     */
    private function mysqlVariables()
    {
        // 按需取值：避免返回全部配置项（数百行）
        $keys = [ 'max_connections', 'version_comment' ];
        return $this->mysqlKeyValues("SHOW VARIABLES WHERE Variable_name IN (" . $this->quoteList($keys) . ")");
    }

    /**
     * MySQL 库容量与占用 Top 表
     * @return array
     */
    private function getMysqlStorage()
    {
        $empty = [
            'tables' => 0, 'total_size_formatted' => '-', 'data_size_formatted' => '-',
            'index_size_formatted' => '-', 'avg_table_size_formatted' => '-', 'large_tables' => []
        ];
        try {
            $db = Db::query("SELECT DATABASE() AS db_name")[ 0 ][ 'db_name' ] ?? '';
            if ($db == '') return $empty;

            // information_schema 统计在表较多时较慢，缓存 5 分钟（容量变化缓慢）
            $cached = Cache::get(self::CACHE_KEY_MYSQL_STORAGE . $db);
            if (is_array($cached)) return $cached;

            $row = Db::query("SELECT COUNT(*) AS tables_count, IFNULL(SUM(data_length),0) AS data_size, IFNULL(SUM(index_length),0) AS index_size FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?", [ $db ])[ 0 ] ?? [];
            $tables = (int) ( $row[ 'tables_count' ] ?? 0 );
            $data_size = (float) ( $row[ 'data_size' ] ?? 0 );
            $index_size = (float) ( $row[ 'index_size' ] ?? 0 );
            $total_size = $data_size + $index_size;

            $large_tables = [];
            foreach (Db::query("SELECT TABLE_NAME AS table_name, TABLE_ROWS AS table_rows, data_length, index_length, (data_length + index_length) AS total_size FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY total_size DESC LIMIT 8", [ $db ]) as $item) {
                $large_tables[] = [
                    'table_name'           => $item[ 'table_name' ],
                    'rows'                 => (int) $item[ 'table_rows' ],
                    'data_size_formatted'  => $this->formatBytes((float) $item[ 'data_length' ]),
                    'index_size_formatted' => $this->formatBytes((float) $item[ 'index_length' ]),
                    'total_size_formatted' => $this->formatBytes((float) $item[ 'total_size' ])
                ];
            }

            $result = [
                'tables'                  => $tables,
                'total_size_formatted'    => $tables > 0 ? $this->formatBytes($total_size) : '-',
                'data_size_formatted'     => $tables > 0 ? $this->formatBytes($data_size) : '-',
                'index_size_formatted'    => $tables > 0 ? $this->formatBytes($index_size) : '-',
                'avg_table_size_formatted' => $tables > 0 ? $this->formatBytes($total_size / $tables) : '-',
                'large_tables'            => $large_tables
            ];
            Cache::set(self::CACHE_KEY_MYSQL_STORAGE . $db, $result, 300);
            return $result;
        } catch (Throwable $e) {
            return $empty;
        }
    }

    /**
     * Redis 运行统计（未启用/连接失败时返回 connected=false）
     * @return array
     */
    private function getRedisStats()
    {
        $result = [
            'connected' => false,
            'error'     => '',
            'clients'   => [ 'connected' => 0, 'max' => 0 ],
            'stats'     => [ 'ops_per_sec' => 0 ],
            'keyspace'  => [ 'selected_stats' => [ 'keys' => 0 ] ],
            'memory'    => [ 'used_formatted' => '-' ]
        ];
        try {
            $handler = Cache::store('redis')->handler();
            if (!$handler instanceof \Redis) {
                $result[ 'error' ] = 'Redis 驱动不可用';
                return $result;
            }
            $handler->ping();

            $clients = $handler->info('clients') ?: [];
            $stats = $handler->info('stats') ?: [];
            $memory = $handler->info('memory') ?: [];
            $keyspace = $handler->info('keyspace') ?: [];

            $result[ 'connected' ] = true;
            $result[ 'clients' ] = [
                'connected' => (int) ( $clients[ 'connected_clients' ] ?? 0 ),
                'max'       => (int) ( $clients[ 'maxclients' ] ?? 0 )
            ];
            $result[ 'stats' ] = [ 'ops_per_sec' => (int) ( $stats[ 'instantaneous_ops_per_sec' ] ?? 0 ) ];
            $result[ 'memory' ] = [ 'used_formatted' => $memory[ 'used_memory_human' ] ?? '-' ];

            // 当前库键数：keyspace 形如 db0 = "keys=10,expires=0,avg_ttl=0"
            $db_key = 'db' . (int) ( config('cache.stores.redis.select') ?? 0 );
            $keys = 0;
            if (isset($keyspace[ $db_key ]) && preg_match('/keys=(\d+)/', (string) $keyspace[ $db_key ], $m)) {
                $keys = (int) $m[ 1 ];
            }
            $result[ 'keyspace' ] = [ 'selected_stats' => [ 'keys' => $keys ] ];
        } catch (Throwable $e) {
            $result[ 'connected' ] = false;
            $result[ 'error' ] = 'Redis 未连接：' . $e->getMessage();
        }
        return $result;
    }

    /**
     * 字节格式化
     * @param float $bytes
     * @param int $precision
     * @return string
     */
    private function formatBytes($bytes, int $precision = 2)
    {
        $bytes = (float) $bytes;
        $units = [ 'B', 'KB', 'MB', 'GB', 'TB' ];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        return ( $i === 0 ? (int) $bytes : round($bytes, $precision) ) . ' ' . $units[ $i ];
    }

    /**
     * 秒数格式化为 x天 x小时 x分
     * @param int $seconds
     * @return string
     */
    private function formatDuration(int $seconds)
    {
        if ($seconds <= 0) return '-';
        if ($seconds < 60) return $seconds . ' 秒';
        $days = floor($seconds / 86400);
        $hours = floor(( $seconds % 86400 ) / 3600);
        $minutes = floor(( $seconds % 3600 ) / 60);
        return $days . '天 ' . $hours . '小时 ' . $minutes . '分';
    }

    /**
     * 清除表缓存
     * @return string
     */
    public function schemaCache()
    {
        if (is_dir(dirname($_SERVER[ 'DOCUMENT_ROOT' ]) . '/runtime/schema')) {
            rmdirs(dirname($_SERVER[ 'DOCUMENT_ROOT' ]) . '/runtime/schema');
        }
        return 'CLEAR_MYSQL_CACHE_SUCCESS';
    }

    /**
     * 清理缓存
     */
    public function clearCache()
    {
        Cache::clear();
        return 'CACHE_CLEAR_SUCCESS';
    }

    /**
     *校验消息队列是否正常运行
     * @return bool
     */
    public function checkJob()
    {
        // 结果缓存：检测需等待队列回执（约5秒），缓存后重复调用立即返回
        // 失败结果缓存较短（20秒），便于队列启动后尽快刷新为正常
        $cached = Cache::get(self::CACHE_KEY_CHECK_JOB);
        if ($cached !== null) return (bool) $cached;

        $result = $this->doCheckJob();
        Cache::set(self::CACHE_KEY_CHECK_JOB, $result, $result ? 120 : 20);
        return $result;
    }

    /**
     * 执行一次队列检测：投递 CheckJob，等待队列消费进程写出回执文件
     *
     * 关键点：queue.state 关闭时 Dispatch 会退化为「同步立即执行」，回执文件由本次请求自身生成，
     * 并不能证明存在队列消费进程 —— 若不排除这种情况，检测结果恒为 true（队列没启动也显示正常）。
     *
     * @return bool
     */
    private function doCheckJob(): bool
    {
        // 未开启队列（同步执行模式）或未安装 redis 扩展：不存在队列消费进程，直接判定未运行
        if (!env('queue.state', false) || !extension_loaded('redis')) return false;

        $secret = uniqid('', true);
        $file   = root_path('runtime') . $secret . '.job';

        try {
            // 推送失败（redis 不可用等）：视为队列未运行
            if (!CheckJob::dispatch([ 'file' => $file ])) return false;
        } catch (Throwable $e) {
            return false;
        }

        // 轮询等待队列消费回执（最多 5 秒）：消费快时立即返回，慢时也不会像固定 sleep 那样误判
        $deadline = microtime(true) + 5;
        do {
            usleep(200000); // 200ms
            if (file_exists($file)) {
                @unlink($file);
                return true;
            }
        } while (microtime(true) < $deadline);

        return false;
    }

    /**
     * 校验计划任务是否正常运行
     * @return bool
     */
    public function checkSchedule()
    {
        $file = root_path('runtime') . '.schedule';
        if (file_exists($file)) {
            $time = file_get_contents($file);
            if (!empty($time) && abs($time - time()) < 90) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取二维码
     * @param $data
     * @return array
     */
    public function getQrcode($data)
    {
        $page = $data[ 'page' ];//'app/pages/index/diy_form';
        $qrcode_data = [];
        foreach ($data[ 'params' ] as $item) {
            $qrcode_data[] = [
                'key' => $item[ 'column_name' ],
                'value' => $item[ 'column_value' ]
            ];
        }
        $dir = 'upload/' . $this->site_id . '/' . $data[ 'folder' ] . ' ';

        try {
            // h5
            //$h5_path = qrcode('', $page, $data, $this->site_id, $dir);

            // 微信小程序
            $weapp_path = qrcode('', $page, $qrcode_data, $this->site_id, $dir, 'weapp');
            return [
                'h5_path' => '',
                'weapp_path' => $weapp_path
            ];
        } catch (AdminException $e) {
            Log::write('获取推广微信小程序二维码error' . $e->getMessage() . $e->getFile() . $e->getLine() . 'params:' . json_encode($data, 256));
            throw new AdminException($e->getMessage() . $e->getFile() . $e->getLine() . 'params:' . json_encode($data, 256));
        }
    }
}

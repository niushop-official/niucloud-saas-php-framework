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
use app\model\addon\Addon;
use app\service\core\addon\CoreAddonBaseService;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\CoreAddonService;
use app\service\core\addon\WapTrait;
use core\base\BaseCoreService;
use core\exception\CloudBuildException;
use core\exception\CommonException;
use core\util\niucloud\BaseNiucloudClient;
use core\util\niucloud\CloudService;
use GuzzleHttp\Exception\GuzzleException;
use think\facade\Cache;

/**
 * 应用管理服务层
 */
class CoreCloudBuildService extends BaseCoreService
{
    private $cache_key = 'cloud_build_task';

    private $build_task;

    protected $root_path;

    protected $auth_code;

    use WapTrait;

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
        if ($this->build_task) throw new CommonException('CLOUD_BUILD_TASK_EXIST');

        // 全部插件
        $all_addon = array_keys((new CoreAddonService())->getInstallAddonList());
        // 排除的插件
        $exclude_addon = [];
        if (isset($param['addon']) && !empty($param['addon'])) $exclude_addon = array_values(array_diff($all_addon, $param['addon']));

        $action_token = [ 'data' => [] ];

        try {
            $action_token = ( new CoreModuleService() )->getActionToken('cloudbuild', [ 'data' => [ 'product_key' => BaseNiucloudClient::PRODUCT ] ]);
        } catch (\Exception $e) {
        }

        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $task_key . DIRECTORY_SEPARATOR;
        $package_dir = $temp_dir . 'package' . DIRECTORY_SEPARATOR;
        dir_mkdir($package_dir);

        // 拷贝composer文件
        file_put_contents($package_dir . 'composer.json', file_get_contents(root_path() . 'composer.json'));
        // 拷贝手机端文件
        $wap_is_compile = ( new Addon() )->where([ [ 'compile', 'like', '%wap%' ] ])->field('id')->findOrEmpty();
        if ($wap_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'uni-app', $package_dir . 'uni-app', exclude_dirs: [ 'node_modules', 'unpackage', 'dist', '.git', ...$exclude_addon ]);
            // 如果有排除的插件
            if (!empty($exclude_addon)) {
                // 处理pages.json
                $this->handlePageCode($package_dir . 'uni-app' . DIRECTORY_SEPARATOR .'src' . DIRECTORY_SEPARATOR, $param['addon']);
                // 处理diy-group
                $this->compileDiyComponentsCode($package_dir . 'uni-app'. DIRECTORY_SEPARATOR .'src' . DIRECTORY_SEPARATOR, $exclude_addon[0]);
            }
        }
        // 拷贝admin端文件
        $admin_is_compile = ( new Addon() )->where([ [ 'compile', 'like', '%admin%' ] ])->field('id')->findOrEmpty();
        if ($admin_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'admin', $package_dir . 'admin', exclude_dirs: [ 'node_modules', 'dist', '.vscode', '.idea', '.git', ...$exclude_addon ]);
        }
        // 拷贝web端文件
        $web_is_compile = ( new Addon() )->where([ [ 'compile', 'like', '%web%' ] ])->field('id')->findOrEmpty();
        if ($web_is_compile->isEmpty()) {
            dir_copy($this->root_path . 'web', $package_dir . 'web', exclude_dirs: [ 'node_modules', '.output', '.nuxt', '.git', ...$exclude_addon ]);
        }

        $this->handleCustomPort($package_dir);

        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'build.zip';
        ( new CoreAddonDevelopDownloadService('') )->compressToZip($package_dir, $zip_file);

        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => time(),
            'token' => $action_token[ 'data' ][ 'token' ] ?? ''
        ];
        set_time_limit(0);

        $param['checkLocal'] = $param['checkLocal'] ?? true;

        $response = ( new CloudService($param['checkLocal']) )->httpPost('cloud/build?' . http_build_query($query), [
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => fopen($zip_file, 'r'),
                    'filename' => 'build.zip'
                ]
            ],
            'timeout' => 300.0
        ]);
        if (isset($response[ 'code' ]) && $response[ 'code' ] == 0) throw new CloudBuildException($response[ 'msg' ]);

        $this->build_task = [
            'task_key' => $task_key,
            'timestamp' => $query[ 'timestamp' ],
            'checkLocal' => $param['checkLocal'],
            'task_id' => $response['data']['task_id'] ?? '',
            'auth_code' => $this->auth_code
        ];
        Cache::set($this->cache_key, $this->build_task);
        return $this->build_task;
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

    private function handleCustomPort(string $package_dir)
    {
        $addons = get_site_addons();

        foreach ($addons as $addon) {
            $custom_port = ( new CoreAddonBaseService() )->getAddonConfig($addon)[ 'port' ] ?? [];
            if (!empty($custom_port)) {
                $addon_path = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR;
                foreach ($custom_port as $port) {
                    if (is_dir($addon_path . $port[ 'name' ])) {
                        dir_copy($addon_path . $port[ 'name' ], $package_dir . $port[ 'name' ]);
                        $json_path = $package_dir . $port[ 'name' ] . DIRECTORY_SEPARATOR . 'info.json';
                        file_put_contents($json_path, json_encode($port));
                    }
                }
            }
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
     * 获取编译执行日志
     * @return void
     */
    public function getBuildLog()
    {
        if (!$this->build_task) return;

        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $this->build_task[ 'timestamp' ]
        ];
        $build_log = ( new CloudService($this->build_task['checkLocal'] ?? false) )->httpGet('cloud/get_build_logs?' . http_build_query($query));

        if (isset($build_log[ 'data' ]) && isset($build_log[ 'data' ][ 0 ]) && is_array($build_log[ 'data' ][ 0 ])) {
            $last = end($build_log[ 'data' ][ 0 ]);
            foreach ($build_log[ 'data' ][ 0 ] as $item) {
                if ($item['code'] == 0) {
                    $build_log[ 'error_analysis' ] = $this->buildResultAnalysis($item[ 'msg' ]);
                    break;
                }
            }
            if ($last[ 'percent' ] == 100 && $last[ 'code' ] == 1) {
                $build_log[ 'data' ][ 0 ] = $this->buildSuccess($build_log[ 'data' ][ 0 ]);
            }
        }
        return $build_log;
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
     * 编译完成
     * @param array $log
     * @return array
     */
    public function buildSuccess(array $log)
    {
        try {
            $query = [
                'authorize_code' => $this->auth_code,
                'timestamp' => $this->build_task[ 'timestamp' ]
            ];
            $chunk_size = 1 * 1024 * 1024;
            $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $this->build_task[ 'task_key' ] . DIRECTORY_SEPARATOR;

            if (!isset($this->build_task[ 'index' ])) {
                $response = ( new CloudService($this->build_task['checkLocal'] ?? false) )->request('HEAD', 'cloud/build_download?' . http_build_query($query), [
                    'headers' => [ 'Range' => 'bytes=0-' ]
                ]);
                $length = $response->getHeader('Content-range');
                $length = (int) explode("/", $length[ 0 ])[ 1 ];
                $step = (int) ceil($length / $chunk_size);

                $this->build_task = array_merge($this->build_task, [ 'step' => $step, 'index' => 0, 'length' => $length ]);
                Cache::set($this->cache_key, $this->build_task);
            } else {
                $zip_file = $temp_dir . 'download.zip';
                $zip_resource = fopen($zip_file, 'a');

                if (( $this->build_task[ 'index' ] + 1 ) <= $this->build_task[ 'step' ]) {
                    $start = $this->build_task[ 'index' ] * $chunk_size;
                    $end = ( $this->build_task[ 'index' ] + 1 ) * $chunk_size;
                    $end = min($end, $this->build_task[ 'length' ]);

                    $response = ( new CloudService($this->build_task['checkLocal'] ?? false) )->request('GET', 'cloud/build_download?' . http_build_query($query), [
                        'headers' => [ 'Range' => "bytes={$start}-{$end}" ]
                    ]);
                    fwrite($zip_resource, $response->getBody());
                    fclose($zip_resource);

                    $this->build_task[ 'index' ] += 1;
                    Cache::set($this->cache_key, $this->build_task);

                    $log[] = [ 'code' => 1, 'action' => '编译包下载中,已下载' . round($this->build_task[ 'index' ] / $this->build_task[ 'step' ] * 100) . '%', 'percent' => '100' ];
                } else {
                    // 解压文件
                    $zip = new \ZipArchive();

                    if ($zip->open($zip_file) === true) {
                        dir_mkdir($temp_dir . 'download');
                        $zip->extractTo($temp_dir . 'download');
                        $zip->close();

                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'admin')) {
                            @del_target_dir(public_path() .'admin', true);
                        }
                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'web')) {
                            @del_target_dir(public_path() .'web', true);
                        }
                        if (is_dir($temp_dir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'wap')) {
                            @del_target_dir(public_path() .'wap', true);
                        }

                        $exclude_files = ['favicon.ico', 'niucloud.ico'];
                        dir_copy($temp_dir . 'download', root_path(), exclude_files: $exclude_files);

                        $this->buildResultAnalysis('success');

                        $this->clearTask();
                    } else {
                        // 压缩包解压失败 尝试重新下载
                        if (!isset($this->build_task[ 'retry' ])) {
                            unlink($zip_resource);
                            $this->build_task['retry'] = 1;
                            unset($this->build_task['index']);
                            Cache::set($this->cache_key, $this->build_task);
                            $log[] = [ 'code' => 1, 'msg' => '编译包解压失败,尝试重新下载', 'action' => '编译包解压失败,尝试重新下载', 'percent' => '100' ];
                        } else {
                            $log[] = [ 'code' => 0, 'msg' => '编译包解压失败', 'action' => '编译包解压', 'percent' => '100' ];
                            $this->buildResultAnalysis('编译包解压失败');
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            $log[] = [ 'code' => 0, 'msg' => $e->getMessage(), 'action' => '', 'percent' => '100' ];
            $this->clearTask();
        }
        return $log;
    }

    /**
     * 清除任务
     * @return void
     */
    public function clearTask()
    {
        if (!$this->build_task) return;

        if (isset($this->build_task['task_id']) && !empty($this->build_task['task_id'])) {
            try {
                ( new CloudService($this->build_task['checkLocal'] ?? false) )->httpPost('cloud/cancel', [
                    'json' => [
                        'task_id' => $this->build_task['task_id']
                    ]
                ]);
            } catch (\Throwable $e) {
            }
        }

        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $this->build_task[ 'task_key' ] . DIRECTORY_SEPARATOR;
        @del_target_dir($temp_dir, true);
        Cache::set($this->cache_key, null);
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
     * SSE编译完成后，PHP后台执行下载解压部署
     * @param string $taskId 任务ID
     * @param string $downloadUrl 下载链接
     * @param string $authorizeCode 授权码
     * @param string $timestamp 时间戳
     * @return array
     */
    public function startServerDownload(string $taskId, string $downloadUrl, string $authorizeCode, string $timestamp)
    {
        $taskKey = 'sse_build_' . $taskId;
        $tempDir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'cloud_build' . DIRECTORY_SEPARATOR . $taskKey . DIRECTORY_SEPARATOR;
        if (!is_dir($tempDir)) {
            mkdir($tempDir, 0755, true);
        }

        $downloadInfo = [
            'task_id' => $taskId,
            'task_key' => $taskKey,
            'download_url' => $downloadUrl,
            'authorize_code' => $authorizeCode,
            'timestamp' => $timestamp,
            'temp_dir' => $tempDir,
            'zip_file' => $tempDir . 'download.zip',
            'chunk_size' => 1 * 1024 * 1024,
            'status' => 'downloading',
            'msg' => '准备下载...'
        ];

        Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

        return ['code' => 1, 'msg' => '初始化成功', 'data' => [
            'task_key' => $taskKey,
            'cache_key' => 'cloud_build_' . $taskKey,
            'cache_exists' => Cache::has('cloud_build_' . $taskKey)
        ]];
    }

    /**
     * 获取SSE编译后续操作的进度（参考 buildSuccess 逻辑）
     * @param string $taskId 任务ID
     * @return array
     */
    public function getSseBuildLog(string $taskId)
    {
        $taskKey = 'sse_build_' . $taskId;
        $cacheKey = 'cloud_build_' . $taskKey;

        $hasBefore = Cache::has($cacheKey);
        $downloadInfo = Cache::get($cacheKey);

        if (empty($downloadInfo)) {
            return ['code' => 0, 'msg' => '任务不存在或已过期', 'status' => 'error', 'debug' => [
                'task_id' => $taskId,
                'task_key' => $taskKey,
                'cache_key' => $cacheKey,
                'cache_has_before' => $hasBefore
            ]];
        }

        $query = [
            'authorize_code' => $downloadInfo['authorize_code'],
            'timestamp' => $downloadInfo['timestamp']
        ];

        try {
            if (!isset($downloadInfo['index'])) {
                $response = ( new CloudService(true) )->request('HEAD', 'cloud/build_download?' . http_build_query($query), [
                    'headers' => ['Range' => 'bytes=0-']
                ]);
                $contentRange = $response->getHeader('Content-range');
                $length = (int) explode("/", $contentRange[0])[1];
                $chunkSize = $downloadInfo['chunk_size'];
                $step = (int) ceil($length / $chunkSize);

                $downloadInfo['index'] = 0;
                $downloadInfo['length'] = $length;
                $downloadInfo['step'] = $step;
                $downloadInfo['downloaded_bytes'] = 0;
                $downloadInfo['percent'] = 0;
                $downloadInfo['msg'] = '开始下载...';

                Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                return [
                    'code' => 1,
                    'status' => 'downloading',
                    'percent' => 0,
                    'downloaded_bytes' => 0,
                    'total_bytes' => $length,
                    'msg' => '开始下载...'
                ];
            } else {
                $zipFile = $downloadInfo['zip_file'];
                $zipResource = fopen($zipFile, 'a');

                if (($downloadInfo['index'] + 1) <= $downloadInfo['step']) {
                    $start = $downloadInfo['index'] * $downloadInfo['chunk_size'];
                    $end = ($downloadInfo['index'] + 1) * $downloadInfo['chunk_size'];
                    $end = min($end, $downloadInfo['length']);
                    $expectedBytes = $end - $start;

                    $response = ( new CloudService(true) )->request('GET', 'cloud/build_download?' . http_build_query($query), [
                        'headers' => ['Range' => "bytes={$start}-{$end}"]
                    ]);

                    $body = $response->getBody();
                    $actualBytes = strlen($body);
                    $contentRange = $response->getHeader('Content-Range');
                    $contentRangeStr = is_array($contentRange) ? ($contentRange[0] ?? '') : $contentRange;

                    if ($actualBytes != $expectedBytes) {
                        $downloadInfo['downloaded_bytes'] = filesize($zipFile);
                        $downloadInfo['msg'] = "分片{$downloadInfo['index']}大小不符: 期望{$expectedBytes}, 实际{$actualBytes}";
                        Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                        return [
                            'code' => 1,
                            'status' => 'downloading',
                            'percent' => $downloadInfo['percent'],
                            'downloaded_bytes' => $downloadInfo['downloaded_bytes'],
                            'total_bytes' => $downloadInfo['length'],
                            'msg' => $downloadInfo['msg'],
                            'debug' => [
                                'chunk_index' => $downloadInfo['index'],
                                'expected_bytes' => $expectedBytes,
                                'actual_bytes' => $actualBytes,
                                'content_range' => $contentRangeStr
                            ]
                        ];
                    }

                    fwrite($zipResource, $body);
                    fclose($zipResource);

                    $downloadInfo['index'] += 1;
                    $downloadInfo['downloaded_bytes'] = filesize($zipFile);
                    $downloadInfo['percent'] = round($downloadInfo['index'] / $downloadInfo['step'] * 100);
                    $downloadInfo['msg'] = '编译包下载中,已下载' . $downloadInfo['percent'] . '%';

                    Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                    return [
                        'code' => 1,
                        'status' => 'downloading',
                        'percent' => $downloadInfo['percent'],
                        'downloaded_bytes' => $downloadInfo['downloaded_bytes'],
                        'total_bytes' => $downloadInfo['length'],
                        'msg' => $downloadInfo['msg']
                    ];
                } else {
                    fclose($zipResource);

                    $zip = new \ZipArchive();
                    $zipOpenResult = $zip->open($zipFile);
                    if ($zipOpenResult === true) {
                        $extractDir = $downloadInfo['temp_dir'] . 'download' . DIRECTORY_SEPARATOR;
                        dir_mkdir($extractDir);

                        $zipContents = [];
                        for ($i = 0; $i < $zip->numFiles; $i++) {
                            $zipContents[] = $zip->getNameIndex($i);
                        }

                        $zip->extractTo($extractDir);
                        $zip->close();

                        $downloadInfo['msg'] = '解压成功,文件数:' . count($zipContents);
                        Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                        $tempDir = $downloadInfo['temp_dir'];

                        if (is_dir($tempDir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'admin')) {
                            @del_target_dir(public_path() . 'admin', true);
                        }
                        if (is_dir($tempDir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'web')) {
                            @del_target_dir(public_path() . 'web', true);
                        }
                        if (is_dir($tempDir . 'download' . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'wap')) {
                            @del_target_dir(public_path() . 'wap', true);
                        }

                        $excludeFiles = ['favicon.ico', 'niucloud.ico'];
                        dir_copy($tempDir . 'download', root_path(), exclude_files: $excludeFiles);

                        $this->buildResultAnalysis('success');

                        $downloadInfo['status'] = 'completed';
                        $downloadInfo['percent'] = 100;
                        $downloadInfo['msg'] = '部署完成';
                        Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                        return [
                            'code' => 1,
                            'status' => 'completed',
                            'percent' => 100,
                            'downloaded_bytes' => $downloadInfo['downloaded_bytes'],
                            'total_bytes' => $downloadInfo['length'],
                            'msg' => '部署完成'
                        ];
                    } else {
                        if (!isset($downloadInfo['retry'])) {
                            unlink($zipFile);
                            $downloadInfo['retry'] = 1;
                            unset($downloadInfo['index']);
                            Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                            return [
                                'code' => 1,
                                'status' => 'downloading',
                                'percent' => 0,
                                'downloaded_bytes' => 0,
                                'total_bytes' => $downloadInfo['length'] ?? 0,
                                'msg' => '编译包解压失败,尝试重新下载',
                                'debug' => [
                                    'zip_file' => $zipFile,
                                    'zip_size' => file_exists($zipFile) ? filesize($zipFile) : 'not exists',
                                    'zip_open_result' => $zipOpenResult,
                                    'extract_dir' => $downloadInfo['temp_dir'] . 'download' . DIRECTORY_SEPARATOR,
                                    'temp_dir' => $downloadInfo['temp_dir']
                                ]
                            ];
                        } else {
                            $downloadInfo['status'] = 'error';
                            $downloadInfo['msg'] = '编译包解压失败';
                            Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

                            return [
                                'code' => 0,
                                'status' => 'error',
                                'percent' => $downloadInfo['percent'] ?? 0,
                                'msg' => '编译包解压失败'
                            ];
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            $downloadInfo['status'] = 'error';
            $downloadInfo['msg'] = $e->getMessage();
            Cache::set('cloud_build_' . $taskKey, $downloadInfo, 7200);

            return ['code' => 0, 'msg' => $e->getMessage(), 'status' => 'error'];
        }
    }
}

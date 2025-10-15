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

use app\dict\addon\AddonDict;
use app\model\addon\Addon;
use app\service\api\diy\DiyConfigService;
use app\service\core\addon\CoreAddonDevelopDownloadService;
use app\service\core\addon\WapTrait;
use app\service\core\niucloud\CoreCloudBaseService;
use app\service\core\niucloud\CoreModuleService;
use core\exception\CommonException;
use core\util\niucloud\BaseNiucloudClient;
use core\util\niucloud\CloudService;

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
        if (strpos($this->config[ 'base_url' ], 'https://') === false) throw new CommonException('CURR_SITE_IS_NOT_OPEN_SSL');
        $this->site_id = $data[ 'site_id' ] ?? 0;

        if (empty($this->config[ 'app_id' ])) throw new CommonException('WEAPP_APPID_EMPTY');
        if (empty($this->config[ 'upload_private_key' ])) throw new CommonException('UPLOAD_KEY_EMPTY');
        if (!file_exists($this->config[ 'upload_private_key' ])) throw new CommonException('UPLOAD_KEY_NOT_EXIST');

        $action_token = ( new CoreModuleService() )->getActionToken('weappbuild', [ 'data' => [ 'product_key' => BaseNiucloudClient::PRODUCT ] ]);

        $compile_addon = ( new Addon() )->where([ [ 'compile', 'like', "%weapp%" ] ])->field('key')->findOrEmpty();
        // 上传任务key
        $task_key = uniqid();
        // 此次上传任务临时目录
        $temp_dir = runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp' . DIRECTORY_SEPARATOR . $task_key;
        // 小程序源码存放路径
        $package_dir = $temp_dir . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR;
        // uni
        $uni_dir = $package_dir . 'uni-app';

        // 如果不存在编译版小程序
        if ($compile_addon->isEmpty()) {
            dir_copy($this->root_path . 'uni-app', $uni_dir, exclude_dirs: [ 'node_modules', 'unpackage', 'dist', '.git']);
            $this->handleUniapp($uni_dir);
            // 替换env文件
            $this->weappEnvReplace($uni_dir . DIRECTORY_SEPARATOR . '.env.production');
        } else {
            $compile_dir = $this->addonPath($compile_addon->key) . 'compile' . DIRECTORY_SEPARATOR . 'weapp';
            if (!is_dir($compile_dir)) throw new CommonException('CLOUD_WEAPP_COMPILE_NOT_EXIST');
            dir_copy($compile_dir, $uni_dir);
            $this->weappCompileReplace($uni_dir);
        }
        file_put_contents($package_dir . 'private.key', file_get_contents($this->config[ 'upload_private_key' ]));

        // 将临时目录下文件生成压缩包
        $zip_file = $temp_dir . DIRECTORY_SEPARATOR . 'weapp.zip';
        ( new CoreAddonDevelopDownloadService('') )->compressToZip($package_dir, $zip_file);

        $query = [
            'compile' => $compile_addon->isEmpty() ? 0 : 1,
            'authorize_code' => $this->auth_code,
            'appid' => $this->config[ 'app_id' ],
            'version' => $data[ 'version' ] ?? '',
            'desc' => $data[ 'desc' ] ?? '',
            'do' => 1,
            'timestamp' => time(),
            'token' => $action_token[ 'data' ][ 'token' ] ?? ''
        ];
        $response = ( new CloudService(true) )->httpPost('cloud/weapp?' . http_build_query($query), [
            'multipart' => [
                [
                    'name' => 'file',
                    'contents' => fopen($zip_file, 'r'),
                    'filename' => 'weapp.zip'
                ]
            ],
        ]);

        // 删除临时文件
        del_target_dir(runtime_path() . 'backup' . DIRECTORY_SEPARATOR . 'weapp', true);

        if (isset($response[ 'code' ]) && $response[ 'code' ] == 0) throw new CommonException($response[ 'msg' ]);

        return [ 'key' => $query[ 'timestamp' ] ];
    }

    /**
     * 处理uniapp 查询出站点没有的插件进行移除
     * @param string $dir
     * @return void
     */
    private function handleUniapp(string $dir)
    {
        $site_addon = $this->config[ 'addon' ];
        $local_addon = ( new Addon() )->where([ [ 'status', '=', AddonDict::ON ] ])->column('key');

        // 移除uniapp中该站点没有的插件
        $diff_addon = array_filter(array_map(function ($key) use ($site_addon) {
            if (!in_array($key, $site_addon)) return $key;
        }, $local_addon));

        $this->handlePageCode($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $site_addon);

//        $this->handleTabbar($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $site_addon);

        if (!empty($diff_addon)) {
            foreach ($diff_addon as $addon) {
                $this->addon = $addon;

                $addon_dir = $dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'addon' . DIRECTORY_SEPARATOR . $addon;
                if (is_dir($addon_dir)) del_target_dir($addon_dir, true);

                // 编译 diy-group 自定义组件代码文件
                $this->compileDiyComponentsCode($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);

                // 编译 加载插件标题语言包
                $this->compileLocale($dir . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR, $addon);

                $manifest_json = root_path() . 'addon' . DIRECTORY_SEPARATOR . $addon . DIRECTORY_SEPARATOR . 'package' . DIRECTORY_SEPARATOR . 'manifest.json';
                if (file_exists($manifest_json)) {
                    $this->mergeManifestJson($dir . DIRECTORY_SEPARATOR, json_decode($manifest_json, true));
                }
            }
        }
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
     * 处理底部导航【暂时停止调用，存在小程序兼容性问题】
     * @param $compile_path
     * @param $addon_arr
     * @return void
     */
    public function handleTabbar($compile_path, $addon_arr = [])
    {
        $bottomList = array_column(( new DiyConfigService() )->getBottomList(), null, 'key');
        $tabbarList = [];
        if (empty($addon_arr)) {
            foreach ($bottomList as $app_item) {
                array_push($tabbarList, ...$app_item[ 'value' ][ 'list' ]);
            }
        } else {
            foreach ($addon_arr as $addon) {
                if (isset($bottomList[ $addon ])) {
                    array_push($tabbarList, ...$bottomList[ $addon ][ 'value' ][ 'list' ]);
                }
            }
        }

        $tabbarList = array_map(function ($item) {
            if (strpos($item[ 'link' ][ 'url' ], '?') !== false) {
                $item[ 'link' ][ 'url' ] = explode('?', $item[ 'link' ][ 'url' ])[0];
            }
            $link = array_filter(explode('/', $item[ 'link' ][ 'url' ]));
            $item[ 'link' ] = $item[ 'link' ][ 'url' ];
            $item[ 'component' ] = implode('-', $link);
            $item[ 'name' ] = lcfirst(implode('', array_map(function ($str) {
                return ucfirst($str);
            }, $link)));
            return $item;
        }, $tabbarList);
        $tabbarList = array_column($tabbarList, null, 'name');

        if (isset($tabbarList[ 'appPagesIndexIndex' ])) unset($tabbarList[ 'appPagesIndexIndex' ]);
        if (isset($tabbarList[ 'appPagesMemberIndex' ])) unset($tabbarList[ 'appPagesMemberIndex' ]);

        // 处理vue文件
        $tpl = str_replace('/', DIRECTORY_SEPARATOR, public_path() . 'static/tpl/tabbar.tpl');
        $content = view($tpl, [ 'tabbarList' => $tabbarList ])->getContent();
        file_put_contents(str_replace('/', DIRECTORY_SEPARATOR, $compile_path . 'app/pages/index/tabbar.vue'), $content);

        // 处理tabbar.json
        file_put_contents($compile_path . 'tabbar.json', json_encode(array_column($tabbarList, 'link'), JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }

    /**
     * 小程序上传env文件处理
     * @param string $env_file
     * @return void
     */
    private function weappEnvReplace(string $env_file)
    {
        $env = file_get_contents($env_file);
        $env = str_replace("VITE_APP_BASE_URL=''", "VITE_APP_BASE_URL='" . $this->config[ 'base_url' ] . 'api/' . "'", $env);
        $env = str_replace("VITE_IMG_DOMAIN=''", "VITE_IMG_DOMAIN='" . $this->config[ 'base_url' ] . "'", $env);
        $env = str_replace("VITE_SITE_ID = ''", "VITE_SITE_ID='" . $this->site_id . "'", $env);
        file_put_contents($env_file, $env);
    }

    /**
     * 小程序上传vendor文件处理
     * @param string $vendor_file
     * @return void
     */
    private function weappCompileReplace(string $path)
    {
        // 替换request.js
        $request_file = $path . DIRECTORY_SEPARATOR . 'utils' . DIRECTORY_SEPARATOR . 'request.js';
        $content = file_get_contents($request_file);
        $content = str_replace('{{$baseUrl}}', $this->config[ 'base_url' ] . 'api/', $content);
        $content = str_replace('{{$siteId}}', $this->site_id, $content);
        file_put_contents($request_file, $content);

        // 替换common.js
        $common_file = $path . DIRECTORY_SEPARATOR . 'utils' . DIRECTORY_SEPARATOR . 'common.js';
        $content = file_get_contents($common_file);
        $content = str_replace('{{$imgUrl}}', $this->config[ 'base_url' ], $content);
        file_put_contents($common_file, $content);
    }

    /**
     * 获取微信小程序预览码
     * @return void
     */
    public function getWeappPreviewImage()
    {
        $query = [
            'authorize_code' => $this->auth_code,
        ];
        $preview_url = ( new CloudService(true) )->getUrl('cloud/get_weapp_preview?' . http_build_query($query));

        try {
            $path = runtime_path() . uniqid() . '.jpg';
            file_put_contents($path, file_get_contents($preview_url));
            return image_to_base64($path, true);
        } catch (\Exception $e) {
            return '';
        }
    }

    /**
     * 获取小程序编译日志
     * @param string $timestamp
     * @return void
     */
    public function getWeappCompileLog(string $timestamp)
    {
        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $timestamp
        ];
        return ( new CloudService(true) )->httpGet('cloud/get_weapp_logs?' . http_build_query($query));
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

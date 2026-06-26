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
       // if (strpos($this->config[ 'base_url' ], 'https://') === false) throw new CommonException('CURR_SITE_IS_NOT_OPEN_SSL');
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

        dir_copy(public_path() . 'mp-weixin', $uni_dir);
        $this->handleUniapp($uni_dir);
        // 替换env文件
        $this->weappEnvReplace($uni_dir);

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
        $response = ( new CloudService(true) )->httpPost('cloud/weapp_v2?' . http_build_query($query), [
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

        $task_id = $response[ 'data' ][ 'task_id' ] ?? $query[ 'timestamp' ];
        return [ 'key' => $task_id ];
    }

    /**
     * @param string $dir
     * @return void
     */
    private function handleUniapp(string $dir)
    {
        $site_addon = $this->config[ 'addon' ];
        foreach ($site_addon as $addon) {
            $src = root_path() . 'addon' . DIRECTORY_SEPARATOR . $this->addon . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR . 'mp-weixin' . DIRECTORY_SEPARATOR;
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
     * @param string $taskId 任务ID (格式: authorize_code_timestamp)
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getWeappCompileLog(string $taskId)
    {
        $query = [
            'task_id' => $taskId
        ];
        return ( new CloudService(true) )->httpGet('cloud/get_weapp_logs?' . http_build_query($query));
    }

    /**
     * 中断上传并清除日志
     */
    public function stopUploadAndClearLogs(string $timestamp)
    {
        // 1. 中断上传
        $this->stopWeappUpload($timestamp);

        // 2. 删除日志（del_weapp_logs）
        return $this->delWeappLogs($timestamp);
    }

    /**
     * 中断小程序上传
     * @param string $timestamp
     * @return mixed
     */
    public function stopWeappUpload(string $timestamp)
    {
        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $timestamp
        ];
        return ( new CloudService(true) )->httpGet('cloud/stop_weapp_upload?' . http_build_query($query));
    }

    /**
     * 删除小程序上传日志
     */
    public function delWeappLogs(string $timestamp)
    {
        $query = [
            'authorize_code' => $this->auth_code,
            'timestamp' => $timestamp
        ];
        return (new CloudService(true))->httpGet('cloud/del_weapp_logs?' . http_build_query($query));
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

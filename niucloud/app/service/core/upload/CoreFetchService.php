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

namespace app\service\core\upload;

use core\exception\UploadFileException;
use Exception;

/**
 * 上传服务层
 * Class CoreFetchService
 * @package app\service\core\file
 */
class CoreFetchService extends CoreFileService
{

    public function __construct($is_attachment = false)
    {
        parent::__construct($is_attachment);
    }

    /**
     * 图片上传
     * @param string $url
     * @param int $site_id
     * @param string $file_dir
     * @param string $storage_type
     * @return array
     * @throws Exception
     */
    /**
     * 校验远程图片URL合法性，防止SSRF攻击
     * @param string $url
     * @throws UploadFileException
     */
    private function validateImageUrl(string $url): void
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        if ($scheme === null || !in_array(strtolower($scheme), ['http', 'https'])) {
            throw new UploadFileException('INVALID_IMAGE_URL_SCHEME');
        }
        $host = parse_url($url, PHP_URL_HOST);
        if (empty($host)) {
            throw new UploadFileException('INVALID_IMAGE_URL_HOST');
        }
        // 禁止内网地址
        $forbiddenHosts = [
            'localhost', '127.0.0.1', '0.0.0.0',
            '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16',
            '169.254.0.0/16', '100.64.0.0/10', '::1', '0:0:0:0:0:0:0:1'
        ];
        // 禁止解析到内网IP的域名
        $resolvedIp = gethostbyname($host);
        if ($resolvedIp === $host) {
            // DNS解析失败，检查host是否为IP
            if (filter_var($host, FILTER_VALIDATE_IP)) {
                $resolvedIp = $host;
            }
        }
        if (filter_var($resolvedIp, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            throw new UploadFileException('INVALID_IMAGE_URL_INTRANET');
        }
    }

    public function image(string $url, int $site_id, string $file_dir, $storage_type = '')
    {
        if(empty($url)) throw new UploadFileException('OSS_FILE_URL_NOT_EXIST');
        $this->validateImageUrl($url);
        $this->upload_driver = $this->driver($site_id, $storage_type);
        [$ext, $link] = explode('.', strrev($url));
        $ext = empty($ext) ? strrev($ext) : 'jpg';
        $file_path = $this->upload_driver->createFileName($link, $ext);

        $dir = $this->root_path .'/'.  $file_dir.'/'.$file_path;
        $result = $this->upload_driver->fetch($url, $dir);

        //读取上传附件的信息用于后续得校验和数据写入
        if($result){
            return [
                'url' => $this->upload_driver->getUrl($dir)
            ];
        }
        else{
            throw new UploadFileException($result);
        }

    }



}
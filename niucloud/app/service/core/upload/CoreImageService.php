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

use app\dict\sys\StorageDict;
use core\exception\UploadFileException;
use Exception;
use Throwable;

/**
 * 图片处理层
 */
class CoreImageService extends CoreFileService
{


    /**
     * @param int $site_id
     * @param string $file_path
     * @param $thumb_type  裁剪的图片规格
     * @param bool $is_throw_exception  是否要抛出错误
     * @return mixed
     * @throws Exception
     */
    public function thumb(int $site_id, string $file_path,  $thumb_type = 'all', bool $is_throw_exception = false)
    {
        //文件转url
        $file_path = path_to_url($file_path);
        $file_parse = parse_url($file_path);
        $scheme = $file_parse['scheme'] ?? '';
        $host = $file_parse['host'] ?? '';
        $file_domain = $scheme . '://' . $host;
        //判断是哪个云上传的实例（同一存储方式可能维护多套配置，优先按域名精确匹配，其次按文件名的存储方式标识兜底）
        $matched_config = $this->matchStorageConfig($site_id, $file_path, $file_domain);
        //站点配置匹配不到时，尝试匹配平台端配置（兼容平台端上传的素材）
        if(empty($matched_config) && $site_id != 0){
            $matched_config = $this->matchStorageConfig(0, $file_path, $file_domain);
        }
        if(!empty($matched_config)){
            $driver_config = $matched_config['params'] ?? [];
            $driver_config['storage_type'] = $matched_config['storage_type'];
            $this->upload_driver = $this->driverByConfig($driver_config);
        }
        //没有云上传就用本地上传
        if(empty($this->upload_driver)){
            $this->upload_driver = $this->driver($site_id, StorageDict::LOCAL);
        }
        //todo 如果是网络图片,可以将网络图片拉取到本地
        try {
            $thumb_list = $this->upload_driver->thumb($file_path, $thumb_type);
            $thumb_data = count($thumb_list) > 1 ? $thumb_list : $thumb_list[$thumb_type] ?? '';
        } catch ( Throwable $e) {
            if($is_throw_exception){
                throw new UploadFileException($e->getMessage());
            }else{
                $thumb_data = '';
            }
        }
        if (empty($thumb_data)) return $file_path;
        return $thumb_data;
    }

    /**
     * 匹配文件所属的存储配置（优先按域名精确匹配，其次按文件名的存储方式标识兜底）
     * @param int $site_id
     * @param string $file_path
     * @param string $file_domain
     * @return array|null
     */
    private function matchStorageConfig(int $site_id, string $file_path, string $file_domain)
    {
        $storage_config_list = (new CoreStorageService())->getStorageConfigList($site_id);
        if (empty($storage_config_list)) return null;
        //按域名精确匹配（同一存储方式可能有多套不同域名的配置）
        foreach ($storage_config_list as $v) {
            $item_domain = $v['params']['domain'] ?? '';
            if (!empty($item_domain) && !empty($file_domain) && rtrim($item_domain, '/') == rtrim($file_domain, '/')) {
                return $v;
            }
        }
        //按文件名的存储方式标识兜底
        foreach ($storage_config_list as $v) {
            if (str_contains($file_path, '_' . $v['storage_type'])) {
                return $v;
            }
        }
        return null;
    }

}

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
namespace core\dict;


class Config extends BaseDict
{
    public function load(array $data)
    {
        $config = $data['name'];
        $system_config = $data['data'] ?? [];

        $addons = $this->getAllLocalAddons();
        $config_files = [];

        foreach ($addons as $v) {
            $config_path = $this->getAddonAppPath($v) . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . $config . '.php';
            if (is_file($config_path)) {
                $config_files[] = $config_path;
            }
        }
        $files_data = $this->loadFiles($config_files);

        foreach ($files_data as $file_data) {
            if(!empty($file_data))
            {
                $system_config = empty($system_config) ? $file_data : array_merge2($system_config, $file_data);
            }
        }

        return $system_config;
    }
}

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


class Console extends BaseDict
{
    /**
     * 加载事件
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons = $this->getAllLocalAddons();
        $console_files = [];

        foreach ($addons as $v) {
            $console_path = $this->getAddonAppPath($v) . "/config/console.php";
            if (is_file($console_path)) {
                $console_files[] = $console_path;
            }
        }
        $files_data = $this->loadFiles($console_files);


        $console = $data;
        foreach ($files_data as $file_data) {
            if(!empty($file_data))
            {
                $console = empty($console) ? $file_data : array_merge2($console, $file_data);
            }

        }
        return $console;
    }
}

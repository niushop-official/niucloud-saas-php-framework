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


class Poster extends BaseDict
{
    /**
     * 加载海报模板配置
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data = [])
    {
        $addon = $data[ 'addon' ] ?? '';
        $type = $data[ 'type' ] ?? '';
        $schedule_files = [];
        if (empty($addon)) {
            $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
            if (is_file($system_path)) {
                $schedule_files[] = $system_path;
            }
            $addons = $this->getLocalAddons();
            foreach ($addons as $v) {
                $addon_path = $this->getAddonDictPath($v) . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }
        } else {
            $schedule_files = [];
            if ($addon == 'system') {
                $system_path = $this->getDictPath() . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($system_path)) {
                    $schedule_files[] = $system_path;
                }
            } else {
                $addon_path = $this->getAddonDictPath($addon) . 'poster' . DIRECTORY_SEPARATOR . 'template.php';
                if (is_file($addon_path)) {
                    $schedule_files[] = $addon_path;
                }
            }

        }

        $schedule_files_data = $this->loadFiles($schedule_files);
        $schedule_data_array = [];
        foreach ($schedule_files_data as $file_data) {
            $schedule_data_array = empty($schedule_data_array) ? $file_data : array_merge($schedule_data_array, $file_data);
        }

        if (!empty($type)) {
            foreach ($schedule_data_array as $k => $v) {
                if ($v[ 'type' ] != $type) {
                    unset($schedule_data_array[ $k ]);
                }
            }
            $schedule_data_array = array_values($schedule_data_array);
        }
        return $schedule_data_array;

    }

    /**
     * 获取海报组件
     * @param array $data
     * @return array|mixed
     */
    public function loadComponents(array $data = [])
    {
        $addons = $this->getLocalAddons();
        $components_files = [];
        foreach ($addons as $v) {
            $components_path = $this->getAddonDictPath($v) . "poster" . DIRECTORY_SEPARATOR . "components.php";
            if (is_file($components_path)) {
                $components_files[] = $components_path;
            }
        }
        $components_files_data = $this->loadFiles($components_files);
        $components = $data;
        foreach ($components_files_data as $file_data) {
            $components = empty($components) ? $file_data : array_merge2($components, $file_data);
        }
        return $components;

    }
}
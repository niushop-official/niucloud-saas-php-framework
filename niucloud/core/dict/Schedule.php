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

use app\service\core\addon\CoreAddonService;

class Schedule extends BaseDict
{
    /**
     * 加载计划任务调度
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data = [])
    {
        $addon = $data['addon'] ?? '';
        $schedule_files = [
        ];
        if (empty($addon)) {
            $system_path = $this->getDictPath() . 'schedule' . DIRECTORY_SEPARATOR . 'schedule.php';
            if (is_file($system_path)) {
                $schedule_files['system'][] = $system_path;
            }
            $addons = $this->getLocalAddons();
            foreach ($addons as $v) {
                $addon_path = $this->getAddonDictPath($v) . 'schedule' . DIRECTORY_SEPARATOR . 'schedule.php';
                if (is_file($addon_path)) {
                    $schedule_files[$v][] = $addon_path;
                }
            }
        } else {
            $schedule_files = [];
            if ($addon == 'system') {
                $system_path = $this->getDictPath() . 'schedule' . DIRECTORY_SEPARATOR . 'schedule.php';
                if (is_file($system_path)) {
                    $schedule_files['system'][] = $system_path;
                }
            } else {
                $addon_path = $this->getAddonDictPath($addon) . 'schedule' . DIRECTORY_SEPARATOR . 'schedule.php';
                if (is_file($addon_path)) {
                    $schedule_files[$addon][] = $addon_path;
                }
            }

        }
        $schedule_data_array = [];
        $core_addon_service = new CoreAddonService();

        foreach ($schedule_files as $addon_key => $files_v){
            // 插件名称：系统内置任务固定为“系统”，插件任务直接读取插件 info.json 的名称，无需查表
            $addon_name = '系统';
            if ($addon_key != 'system') {
                $addon_info = $core_addon_service->getAddonConfig($addon_key);
                $addon_name = $addon_info['title'] ?? $addon_key;
            }

            $schedule_files_data = $this->loadFiles($files_v);
            
            foreach ($schedule_files_data as $file_data) {
                foreach($file_data as &$fild_data_v){
                    $fild_data_v['addon'] = $addon_key;
                    $fild_data_v['addon_name'] = $addon_name;
                }
                unset($fild_data_v);
                $schedule_data_array = empty($schedule_data_array) ? $file_data : array_merge($schedule_data_array, $file_data);
            }
        }
        
        return $schedule_data_array;

    }
}
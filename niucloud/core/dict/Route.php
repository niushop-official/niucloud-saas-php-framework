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


class Route extends BaseDict
{
    /**
     * 加载路由
     * @param array $data 传入路由端口
     * @return true
     */
    public function load(array $data)
    {
        $addons = $this->getLocalAddons();

        foreach ($addons as $k => $v) {
            $route_dir = $this->getAddonAppPath($v) . DIRECTORY_SEPARATOR . $data['app_type'] . DIRECTORY_SEPARATOR . "route";
            if (!is_dir($route_dir)) continue;

            $route_files = glob($route_dir . DIRECTORY_SEPARATOR . '*.php');
            if (empty($route_files)) continue;

            sort($route_files);

            foreach ($route_files as $route_file) {
                include $route_file;
            }
        }
        return true;
    }
}
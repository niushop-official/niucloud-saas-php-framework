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


use app\service\admin\site\SiteService;

class Printer extends BaseDict
{
    /**
     * 打印模板类型
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data)
    {
        $addons = ( new SiteService() )->getAddonKeysBySiteId();
        $types_files = [];

        foreach ($addons as $v) {
            $types_path = $this->getAddonDictPath($v) . "printer" . DIRECTORY_SEPARATOR . "type.php";
            if (is_file($types_path)) {
                $types_files[] = $types_path;
            }
        }
        $types_files_data = $this->loadFiles($types_files);
        $types = $data;
        foreach ($types_files_data as $file_data) {
            $types = empty($types) ? $file_data : array_merge2($types, $file_data);
        }
        return $types;
    }
}

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

class GrowthRule extends BaseDict
{
    /**
     * 加载事件
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data = [])
    {
        $addons = $this->getLocalAddons();

        $system_change_type_file = $this->getDictPath() . "member" . DIRECTORY_SEPARATOR . "growth_rule.php";

        $core_addon_service = new CoreAddonService();

        $account_change_type_array = [];
        if (is_file($system_change_type_file)) {
            $account_change_type_datas = $this->loadFiles([$system_change_type_file]);
            foreach ($account_change_type_datas as $account_change_type_data) {
                foreach ($account_change_type_data as &$value) {
                    $value[ 'addon_name' ] = '系统';
                }
                $account_change_type_array = empty($account_change_type_array) ? $account_change_type_data : array_merge2($account_change_type_array, $account_change_type_data);
            }
        }
        foreach ($addons as $v) {
            $addon_change_type_file = $this->getAddonDictPath($v) . "member" . DIRECTORY_SEPARATOR . "growth_rule.php";
            if (is_file($addon_change_type_file)) {
                $addon_info = $core_addon_service->getInfoByKey($v);
                $account_change_type_datas = $this->loadFiles([$addon_change_type_file]);
                foreach ($account_change_type_datas as $account_change_type_data) {
                    foreach ($account_change_type_data as &$value) {
                        $value[ 'addon_name' ] = $addon_info[ 'title' ];
                    }
                    $account_change_type_array = empty($account_change_type_array) ? $account_change_type_data : array_merge2($account_change_type_array, $account_change_type_data);
                }
            }
        }

        return $account_change_type_array;
    }
}

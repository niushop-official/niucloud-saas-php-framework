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

class MemberBenefits extends BaseDict
{
    /**
     * 加载事件
     * @param array $data
     * @return array|mixed
     */
    public function load(array $data = [])
    {
        $addons = $this->getLocalAddons();
        $account_change_type_files = [];
        $system_change_type_file = $this->getDictPath() . "member" . DIRECTORY_SEPARATOR . "benefits.php";


        if (is_file($system_change_type_file)) {
            $account_change_type_files[] = $system_change_type_file;
        }
        foreach ($addons as $v) {
            $addon_change_type_file = $this->getAddonDictPath($v) . "member" . DIRECTORY_SEPARATOR . "benefits.php";
            if (is_file($addon_change_type_file)) {
                $account_change_type_files[] = $addon_change_type_file;
            }
        }

        $account_change_type_datas = $this->loadFiles($account_change_type_files);

        $account_change_type_array = [];
        foreach ($account_change_type_datas as $account_change_type_data) {
            $account_change_type_array = empty($account_change_type_array) ? $account_change_type_data : array_merge2($account_change_type_array, $account_change_type_data);
        }
        return $account_change_type_array;
    }
}

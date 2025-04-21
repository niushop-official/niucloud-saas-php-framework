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

namespace app\dict\verify;

/**
 * 核销类型
 */
class VerifyDict
{
    /**
     * 获取核销类型
     * @return array
     */
    public static function getType()
    {
        $verify_type = event("VerifyType");
        $type_list = [];
        foreach ($verify_type as $type) {
            $type_list = array_merge($type_list, $type);
        }
        return $type_list;
    }

}
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

namespace app\dict\sys;

/**
 * 导出状态
 */
class ExportDict
{

    const EXPORTING = '1';  //导出中
    const SUCCESS = '2';    //导出成功
    const FAIL = '-1';      //导出失败

    /**
     * 获取状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::EXPORTING => get_lang('dict_export.status_exporting'),
            self::SUCCESS => get_lang('dict_export.status_success'),
            self::FAIL => get_lang('dict_export.status_fail'),
        ];
    }

    /**
     * 导出数据类型
     * @return array
     */
    public static function getExportType()
    {
        $type_array = event("ExportDataType");
        $type_list = [];
        foreach ($type_array as $v)
        {
            $type_list = empty($type_list) ? $v : array_merge($type_list, $v);
        }
        return $type_list;
    }

}
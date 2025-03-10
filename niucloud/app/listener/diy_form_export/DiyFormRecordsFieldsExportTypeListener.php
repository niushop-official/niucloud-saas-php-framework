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

namespace app\listener\diy_form_export;

/**
 * 表单字段统计导出数据类型查询
 * Class DiyFormRecordsFieldsExportTypeListener
 * @package app\listener\diy_form_export
 */
class DiyFormRecordsFieldsExportTypeListener
{

    public function handle($param)
    {
        return [
            'diy_form_records_fields' => [
                'name' => '表单字段统计列表',
                'column' => [
                    'field_name' => [ 'name' => '字段', 'merge_type' => 'column' ],
                    'render_value' => [ 'name' => '选项值' ],
                    'write_count' => [ 'name' => '小计' ],
                    'write_percent' => [ 'name' => '比例' ],
                ]
            ]
        ];
    }
}
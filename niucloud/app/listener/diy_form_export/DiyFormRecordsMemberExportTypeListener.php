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
 * 表单填表人统计导出数据类型查询
 * Class DiyFormRecordsExportTypeListener
 * @package app\listener\diy_form_export
 */
class DiyFormRecordsMemberExportTypeListener
{

    public function handle($param)
    {
        return [
            'diy_form_records_member' => [
                'name' => '填表人统计列表',
                'column' => [
                    'nickname' => [ 'name' => '填表人名称' ],
                    'write_count' => [ 'name' => '总计' ]
                ]
            ]
        ];
    }
}
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

use app\model\diy_form\DiyFormFields;

/**
 * 表单填写记录导出数据类型查询
 * Class DiyFormRecordsExportTypeListener
 * @package app\listener\diy_form_export
 */
class DiyFormRecordsExportTypeListener
{

    public function handle($param)
    {
        $column = [
            'record_id' => [ 'name' => '记录编号' ],
            'create_time' => [ 'name' => '填表时间' ],
            'page_title' => [ 'name' => '表单名称' ],
            'type_name' => [ 'name' => '表单类型' ],
            'form_id' => [ 'name' => '表单编号' ],
            'nickname' => [ 'name' => '填表人名称' ],
            'mobile' => [ 'name' => '填表人手机号' ],
        ];
        if (!empty($param['where']['form_id'])) {
            $field_list = ( new DiyFormFields() )->where([
                [ 'form_id', '=', $param['where']['form_id'] ],
                [ 'site_id', '=', $param['site_id'] ]
            ])->field('field_key,field_name')->select()->toArray();
            foreach ($field_list as $key => $value) {
                $column[$value['field_key']] = [ 'name' => $value['field_name'] ];
            }
        }
        return [
            'diy_form_records' => [
                'name' => '表单填写明细',
                'column' => $column,
            ]
        ];
    }
}
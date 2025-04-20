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
use app\model\diy_form\DiyFormRecords;

/**
 * 表单填写记录导出数据源查询
 * Class DiyFormRecordsExportDataListener
 * @package app\listener\diy_form_export
 */
class DiyFormRecordsExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'diy_form_records') {
            $model = new DiyFormRecords();
            $member_where = [];
            if (!empty($param[ 'where' ][ 'keyword' ])) {
                $member_where[] = [ 'member_no|nickname|username|mobile', 'like', '%' . $param[ 'where' ][ 'keyword' ] . '%' ];
            }
            $field = 'record_id, form_id, member_id, relate_id, create_time';
            $order = "create_time desc";
            $search_model = $model->where([
                [ 'diy_form_records.site_id', '=', $param[ 'site_id' ] ],
                [ 'form_id', '=', $param[ 'where' ] [ 'form_id' ] ]
            ])->field($field)->withSearch([ 'create_time' ], $param[ 'where' ])
                ->withJoin([
                    'member' => function($query) use ($member_where) {
                        $query->where($member_where);
                    }
                ])->with([
                    // 关联填写字段列表
                    'recordsFieldList' => function($query) {
                        $query->field('id, form_id, form_field_id, record_id, member_id, field_key, field_type, field_name, field_value, update_num, update_time')->append([ 'render_value' ]);
                    },
                    'form'
                ])
                ->order($order);
            if ($param['page']['page'] > 0 && $param['page']['limit'] > 0) {
                $data = $search_model->page($param['page']['page'], $param['page']['limit'])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }

            $field_key_list = ( new DiyFormFields() )->where([
                [ 'form_id', '=', $param['where']['form_id'] ],
                [ 'site_id', '=', $param['site_id'] ]
            ])->column('field_key');

            foreach ($data as $key => $value) {
                $data[$key]['page_title'] = $value[ 'form' ]['page_title'] ?? '';
                $data[$key]['type_name'] = $value[ 'form' ]['type_name'] ?? '';
                $data[$key]['nickname'] = $value[ 'member' ]['nickname'] ?? '';
                $data[$key]['mobile'] = $value[ 'member' ]['mobile']."\t" ?? '';
                $list_key = array_column($value[ 'recordsFieldList' ], null, 'field_key');
                foreach ($field_key_list as $field_key) {
                    $data[$key][$field_key] = !empty($list_key[$field_key]) ? $list_key[$field_key]['render_value']."\t" : '';
                }
            }
        }
        return $data;
    }
}
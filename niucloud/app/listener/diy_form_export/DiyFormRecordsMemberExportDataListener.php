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

use app\model\diy_form\DiyFormRecords;

/**
 * 表单填表人统计导出数据源查询
 * Class DiyFormRecordsMemberExportDataListener
 * @package app\listener\diy_form_export
 */
class DiyFormRecordsMemberExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'diy_form_records_member') {
            $model = new DiyFormRecords();
            $field = 'form_id, diy_form_records.member_id, count(*) as write_count';
            $order = "create_time desc";
            $search_model = $model->where([ [ 'diy_form_records.site_id', '=', $param[ 'site_id' ] ] ])->withSearch([ 'form_id' ], $param[ 'where' ])
                ->withJoin(['member' => function ($query) use ($param) {
                    $query->where([ [ 'nickname|mobile', 'like', "%" . $param[ 'where' ]['keyword'] . "%" ] ]);
                }])->field($field)->group('diy_form_records.member_id')->order($order);
            if ($param['page']['page'] > 0 && $param['page']['limit'] > 0) {
                $data = $search_model->page($param['page']['page'], $param['page']['limit'])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }
            foreach ($data as $key => $value) {
                $data[$key]['nickname'] = $value[ 'member' ]['nickname'] ?? '';
            }
        }
        return $data;
    }
}
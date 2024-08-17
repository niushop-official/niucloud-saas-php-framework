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

namespace app\listener\member_export;

use app\model\member\Member;

/**
 * 会员导出数据源查询
 * Class MemberExportDataListener
 * @package app\listener\member_export
 */
class MemberExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'member') {
            $model = new Member();
            $field = 'member_id, member_no, mobile, nickname, birthday, member_level, point, balance, money, growth, commission, register_channel, status, create_time, last_visit_time';
            //查询导出数据
            $search_model = $model->where([['site_id', '=', $param['site_id']]])->withSearch(['keyword','register_type', 'create_time', 'is_del', 'member_label', 'register_channel'], $param['where'])
                ->with(['memberLevelNameBind'])->field($field)->append(['register_channel_name', 'sex_name', 'status_name']);
            if ($param['page']['page'] > 0 && $param['page']['limit'] > 0) {
                $data = $search_model->page($param['page']['page'], $param['page']['limit'])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }
            foreach ($data as $key => $value) {
                $data[$key]['mobile'] = $value['mobile']."\t";
                $data[$key]['create_time'] = !empty($value['create_time']) ? $value['create_time'] : '';
                $data[$key]['last_visit_time'] = !empty($value['last_visit_time']) ? $value['last_visit_time'] : '';
            }
        }
        return $data;
    }
}
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

namespace app\service\admin\diy_form;

use app\model\diy_form\DiyFormRecords;
use app\model\diy_form\DiyFormRecordsFields;
use core\base\BaseAdminService;

/**
 * 万能表单填写记录服务层
 * Class DiyFormRecordsService
 * @package app\service\admin\diy
 */
class DiyFormRecordsService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new DiyFormRecords();
    }

    /**
     * 获取万能表单填表人统计列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'form_id, diy_form_records.member_id, count(*) as write_count';
        $search_model = $this->model->where([ [ 'diy_form_records.site_id', '=', $this->site_id ] ])->withSearch([ 'form_id' ], $where)
            ->withJoin([ 'member' => function($query) use ($where) {
                $query->where([ [ 'nickname|mobile', 'like', "%" . $where[ 'keyword' ] . "%" ] ]);
            } ])->field($field)->group('diy_form_records.member_id');
        return $this->pageQuery($search_model);
    }

    /**
     * 获取万能表单字段统计列表
     * @param array $where
     * @return array
     */
    public function getFieldStatList(array $where = [])
    {
        $field_list = ( new DiyFormService() )->getFieldsList($where, 'field_id, field_key, field_type, field_name');
        // 一般格式存储的表单字段列表，如单行文本、多行文本、数字、手机号、邮箱、身份证号
        $simple_field_list = array_filter($field_list, function($v) { return !in_array($v[ 'field_type' ], [ 'FormRadio', 'FormCheckbox', 'FormDateScope', 'FormTimeScope', 'FormImage' ]); });
        // json格式存储的表单字段列表，如单选框、多选框、日期、日期范围、时间、时间范围
        $json_field_list = array_filter($field_list, function($v) { return in_array($v[ 'field_type' ], [ 'FormRadio', 'FormCheckbox', 'FormDateScope', 'FormTimeScope' ]); });

        // 一般格式数据类型统计
        $records_field_model = new DiyFormRecordsFields();
        foreach ($simple_field_list as $k => &$v) {
            // 按填写字段内容分组查询某个组件各字段内容填写次数
            $value_list = $records_field_model->field('form_id, field_key, field_type, field_value, count(*) as write_count')->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'field_key', '=', $v[ 'field_key' ] ],
                [ 'field_type', '=', $v[ 'field_type' ] ]
            ])->withSearch([ 'form_id' ], $where)->group('field_value')->append([ 'render_value' ])->select()->toArray();
            // 查询某个组件填写总次数
            $total_count = $records_field_model->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'field_key', '=', $v[ 'field_key' ] ],
                [ 'field_type', '=', $v[ 'field_type' ] ]
            ])->withSearch([ 'form_id' ], $where)->count();
            // 循环计算各字段内容填写占比
            if ($total_count > 0) {
                $total_percent = 100;
                foreach ($value_list as $k1 => &$v1) {
                    if ($k1 == count($value_list) - 1) {
                        $item_percent = $total_percent;
                    } else {
                        $item_percent = round($v1['write_count'] / $total_count * 100, 2);
                    }
                    $v1['write_percent'] = floatval($item_percent);
                    $total_percent = bcsub($total_percent, $item_percent, 2);
                }
            }
            $v[ 'value_list' ] = $value_list;
        }
        // json格式数据类型统计
        foreach ($json_field_list as $k => &$v) {
            // 查询某个组件填写记录
            $field_list = $records_field_model->field('form_id, field_key, field_type, field_value')->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'field_key', '=', $v[ 'field_key' ] ],
                [ 'field_type', '=', $v[ 'field_type' ] ]
            ])->withSearch([ 'form_id' ], $where)->append([ 'render_value' ])->select()->toArray();

            $total_count = 0;
            $value_list = [];
            foreach ($field_list as $k1 => &$v1) {
                if ($v1[ 'field_type' ] != 'FormCheckbox') {//非多选项组件的内容填写次数统计、总次数统计
                    $key = $v1[ 'field_key' ] . '_' . $v1[ 'render_value' ];
                    if (isset($value_list[ $key ])) {
                        $value_list[ $key ][ 'write_count' ] = $value_list[ $key ][ 'write_count' ] + 1;
                        $total_count++;
                    } else {
                        // 如果不存在，则初始化为1
                        $value_list[ $key ] = $v1;
                        $value_list[ $key ][ 'write_count' ] = 1;
                        $total_count++;
                    }
                } else {
                    $value_arr = explode(',', $v1[ 'render_value' ]);
                    foreach ($value_arr as $k2 => $v2) {//多选项组件的每个选项选择次数统计、总次数统计
                        $key = $v1[ 'field_key' ] . '_' . $v2;
                        if (isset($value_list[ $key ])) {
                            $value_list[ $key ][ 'write_count' ] = $value_list[ $key ][ 'write_count' ] + 1;
                            $total_count++;
                        } else {
                            $value_list[ $key ] = $v1;
                            $value_list[ $key ][ 'render_value' ] = $v2;
                            $value_list[ $key ][ 'write_count' ] = 1;
                            $total_count++;
                        }
                    }
                }
            }
            // 循环计算各字段内容填写占比
            if ($total_count > 0) {
                $value_list = array_values($value_list);
                $total_percent = 100;
                foreach ($value_list as $k1 => &$v1) {
                    if ($k1 == count($value_list) - 1) {
                        $item_percent = $total_percent;
                    } else {
                        $item_percent = round($v1['write_count'] / $total_count * 100, 2);
                    }
                    $v1['write_percent'] = floatval($item_percent);
                    $total_percent = bcsub($total_percent, $item_percent, 2);
                }
            }
            $v[ 'value_list' ] = $value_list;
        }
        // 合并返回一般格式数据类型统计和json格式数据类型统计
        return array_merge($simple_field_list, $json_field_list);
    }

}

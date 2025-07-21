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

namespace app\service\core\diy_form;

use app\model\diy_form\DiyFormSubmitConfig;
use app\model\diy_form\DiyFormWriteConfig;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 万能表单配置
 * Class CoreDiyFormConfigService
 * @package app\service\core\diy_form
 */
class CoreDiyFormConfigService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 添加表单填写配置
     * @param $data
     * @return mixed
     */
    public function addWriteConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }
        $save_data = [
            'site_id' => $data[ 'site_id' ],
            'form_id' => $data[ 'form_id' ], // 所属万能表单id
            'write_way' => $data[ 'write_way' ] ?? 'no_limit', // 填写方式，no_limit：不限制，scan：仅限微信扫一扫，url：仅限链接进入
            'join_member_type' => $data[ 'join_member_type' ] ?? 'all_member', // 参与会员，all_member：所有会员参与，selected_member_level：指定会员等级，selected_member_label：指定会员标签
            'level_ids' => array_map(function($item) { return (string) $item; }, $data[ 'level_ids' ] ?? []), // 会员等级id集合
            'label_ids' => array_map(function($item) { return (string) $item; }, $data[ 'label_ids' ] ?? []), // 会员标签id集合
            'member_write_type' => $data[ 'member_write_type' ] ?? 'no_limit', // 每人可填写次数，no_limit：不限制，diy：自定义
            // 每人可填写次数自定义规则
            'member_write_rule' => $data[ 'member_write_rule' ] ?? [
                    'time_value' => 1, // 时间
                    'time_unit' => 'day', // 时间单位
                    'num' => 1 // 可填写次数
                ],
            'form_write_type' => $data[ 'form_write_type' ] ?? 'no_limit', // 表单可填写数量，no_limit：不限制，diy：自定义
            // 表单可填写总数自定义规则
            'form_write_rule' => $data[ 'form_write_rule' ] ?? [
                    'time_value' => 1, // 时间
                    'time_unit' => 'day', // 时间单位
                    'num' => 1 // 可填写次数
                ],
            'time_limit_type' => $data[ 'time_limit_type' ] ?? 'no_limit', // 填写时间限制类型，no_limit：不限制， specify_time：指定开始结束时间，open_day_time：设置每日开启时间
            // 填写时间限制规则
            'time_limit_rule' => $data[ 'time_limit_rule' ] ?? [
                    'specify_time' => [], // 指定开始结束时间
                    'open_day_time' => [], // 设置每日开启时间
                ],
            'is_allow_update_content' => $data[ 'is_allow_update_content' ] ?? 0, // 是否允许修改自己填写的内容，0：否，1：是
            'write_instruction' => $data[ 'write_instruction' ] ?? '', // 表单填写须知
            'create_time' => time(),
            'update_time' => time(),
        ];

        $res = ( new DiyFormWriteConfig() )->create($save_data);
        return $res->id;
    }

    /**
     * 编辑表单填写配置
     * @param $data
     * @return bool
     */
    public function editWriteConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }

        if (empty($data[ 'id' ])) {
            throw new CommonException('缺少表单配置id');
        }

        $count = ( new DiyFormWriteConfig() )->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'id', '=', $data[ 'id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ]
        ])->count();

        if (empty($count)) {
            throw new CommonException('表单填写配置不存在');
        }

        $save_data = [
            'write_way' => $data[ 'write_way' ] ?? 'no_limit', // 填写方式，no_limit：不限制，scan：仅限微信扫一扫，url：仅限链接进入
            'join_member_type' => $data[ 'join_member_type' ] ?? 'all_member', // 参与会员，all_member：所有会员参与，selected_member_level：指定会员等级，selected_member_label：指定会员标签
            'level_ids' => array_map(function($item) { return (string) $item; }, $data[ 'level_ids' ] ?? []), // 会员等级id集合
            'label_ids' => array_map(function($item) { return (string) $item; }, $data[ 'label_ids' ] ?? []), // 会员标签id集合
            'member_write_type' => $data[ 'member_write_type' ] ?? 'no_limit', // 每人可填写次数，no_limit：不限制，diy：自定义
            // 每人可填写次数自定义规则
            'member_write_rule' => $data[ 'member_write_rule' ] ?? [
                    'time_value' => 1, // 时间
                    'time_unit' => 'day', // 时间单位
                    'num' => 1 // 可填写次数
                ],
            'form_write_type' => $data[ 'form_write_type' ] ?? 'no_limit', // 表单可填写数量，no_limit：不限制，diy：自定义// 表单可填写总数自定义规则
            'form_write_rule' => $data[ 'form_write_rule' ] ?? [
                    'time_value' => 1, // 时间
                    'time_unit' => 'day', // 时间单位
                    'num' => 1 // 可填写次数
                ],
            'time_limit_type' => $data[ 'time_limit_type' ] ?? 'no_limit', // 填写时间限制类型，no_limit：不限制， specify_time：指定开始结束时间，open_day_time：设置每日开启时间
            // 填写时间限制规则
            'time_limit_rule' => $data[ 'time_limit_rule' ] ?? [
                    'specify_time' => [], // 指定开始结束时间
                    'open_day_time' => [], // 设置每日开启时间
                ],
            'is_allow_update_content' => $data[ 'is_allow_update_content' ] ?? 0, // 是否允许修改自己填写的内容，0：否，1：是
            'write_instruction' => $data[ 'write_instruction' ] ?? '', // 表单填写须知
            'update_time' => time(),
        ];

        if (!empty($save_data[ 'time_limit_rule' ][ 'specify_time' ])) {
            $start_time = strtotime($save_data[ 'time_limit_rule' ][ 'specify_time' ][ 0 ]);
            $end_time = strtotime($save_data[ 'time_limit_rule' ][ 'specify_time' ][ 1 ]);
            $save_data[ 'time_limit_rule' ][ 'specify_time' ] = [ $start_time, $end_time ];
        }

        if (!empty($save_data[ 'time_limit_rule' ][ 'open_day_time' ])) {

            $current_timestamp = strtotime(date('Y-m-d'));

            $start_time_arr = explode(':', $save_data[ 'time_limit_rule' ][ 'open_day_time' ][ 0 ]);
            $start_time = strtotime("{$start_time_arr[ 0 ]}:{$start_time_arr[ 1 ]}") - $current_timestamp;

            $end_time_arr = explode(':', $save_data[ 'time_limit_rule' ][ 'open_day_time' ][ 1 ]);
            $end_time = strtotime("{$end_time_arr[ 0 ]}:{$end_time_arr[ 1 ]}") - $current_timestamp;

            $save_data[ 'time_limit_rule' ][ 'open_day_time' ] = [ $start_time, $end_time ];
        }

        ( new DiyFormWriteConfig() )->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'id', '=', $data[ 'id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ]
        ])->update($save_data);
        return true;
    }

    /**
     * 获取表单填写配置
     * @param $data
     * @return array
     */
    public function getWriteConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }

        $field = 'id, form_id, write_way, join_member_type, level_ids, label_ids, member_write_type, member_write_rule, form_write_type, form_write_rule, time_limit_type, time_limit_rule, is_allow_update_content, write_instruction';
        $info = ( new DiyFormWriteConfig() )->field($field)->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ]
        ])->findOrEmpty()->toArray();
        if (!empty($info)) {

            if (isset($info[ 'label_ids' ]) && !empty($info[ 'label_ids' ])) {
                $info[ 'label_ids' ] = array_map('intval', $info[ 'label_ids' ]);
            }
            if (isset($info[ 'level_ids' ]) && !empty($info[ 'level_ids' ])) {
                $info[ 'level_ids' ] = array_map('intval', $info[ 'level_ids' ]);
            }

            if (!empty($info[ 'time_limit_rule' ][ 'specify_time' ])) {
                $start_time = date('Y-m-d H:i:s', $info[ 'time_limit_rule' ][ 'specify_time' ][ 0 ]);
                $end_time = date('Y-m-d H:i:s', $info[ 'time_limit_rule' ][ 'specify_time' ][ 1 ]);
                $info[ 'time_limit_rule' ][ 'specify_time' ] = [ $start_time, $end_time ];
            }

            if (!empty($info[ 'time_limit_rule' ][ 'open_day_time' ])) {

                $start_timestamp = strtotime(date('Y-m-d', time())) + $info[ 'time_limit_rule' ][ 'open_day_time' ][ 0 ];
                $start_time = date('H:i', $start_timestamp);

                $end_timestamp = strtotime(date('Y-m-d', time())) + $info[ 'time_limit_rule' ][ 'open_day_time' ][ 1 ];
                $end_time = date('H:i', $end_timestamp);

                $info[ 'time_limit_rule' ][ 'open_day_time' ] = [ $start_time, $end_time ];
            }

        }
        return $info;
    }

    /**
     * 添加表单提交成功页配置
     * @param $data
     * @return mixed
     */
    public function addSubmitConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }
        $save_data = [
            'site_id' => $data[ 'site_id' ],
            'form_id' => $data[ 'form_id' ], // 所属万能表单id
            'submit_after_action' => $data[ 'submit_after_action' ] ?? 'text', // 填表人提交后操作，text：文字信息，voucher：核销凭证
            'tips_type' => $data[ 'tips_type' ] ?? 'default', // 提示内容类型，default：默认提示，diy：自定义提示
            'tips_text' => $data[ 'tips_text' ] ?? '', // 自定义提示内容
            'time_limit_type' => $data[ 'time_limit_type' ] ?? 'no_limit', // 核销凭证有效期限制类型，no_limit：不限制，specify_time：指定固定开始结束时间，submission_time：按提交时间设置有效期
            // 核销凭证时间限制规则，json格式 todo 结构待定
            'time_limit_rule' => $data[ 'time_limit_rule' ] ?? [],
            // 核销凭证内容，json格式 todo 结构待定
            'voucher_content_rule' => $data[ 'voucher_content_rule' ] ?? [],
            // 填写成功后续操作
            'success_after_action' => $data[ 'success_after_action' ] ?? [
                    'share' => false, // 转发填写内容
                    'finish' => true, // 完成
                    'goback' => true // 返回
                ],
            'create_time' => time(),
            'update_time' => time(),
        ];

        $res = ( new DiyFormSubmitConfig() )->create($save_data);
        return $res->id;
    }

    /**
     * 编辑表单提交成功页配置
     * @param $data
     * @return true
     */
    public function editSubmitConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }

        if (empty($data[ 'id' ])) {
            throw new CommonException('缺少表单配置id');
        }

        $count = ( new DiyFormSubmitConfig() )->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'id', '=', $data[ 'id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ]
        ])->count();

        if (empty($count)) {
            throw new CommonException('表单提交成功页配置不存在');
        }

        $save_data = [
            'site_id' => $data[ 'site_id' ],
            'form_id' => $data[ 'form_id' ], // 所属万能表单id
            'submit_after_action' => $data[ 'submit_after_action' ] ?? 'text', // 填表人提交后操作，text：文字信息，voucher：核销凭证
            'tips_type' => $data[ 'tips_type' ] ?? 'default', // 提示内容类型，default：默认提示，diy：自定义提示
            'tips_text' => $data[ 'tips_text' ] ?? '', // 自定义提示内容
            'time_limit_type' => $data[ 'time_limit_type' ] ?? 'no_limit', // 核销凭证有效期限制类型，no_limit：不限制，specify_time：指定固定开始结束时间，submission_time：按提交时间设置有效期
            // 核销凭证时间限制规则，json格式 todo 结构待定
            'time_limit_rule' => $data[ 'time_limit_rule' ] ?? [],
            // 核销凭证内容，json格式 todo 结构待定
            'voucher_content_rule' => $data[ 'voucher_content_rule' ] ?? [],
            // 填写成功后续操作
            'success_after_action' => $data[ 'success_after_action' ] ?? [
                    'share' => false, // 转发填写内容
                    'finish' => true, // 完成
                    'goback' => true  // 返回
                ],
            'update_time' => time(),
        ];

        ( new DiyFormSubmitConfig() )->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'id', '=', $data[ 'id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ],
        ])->update($save_data);

        return true;
    }

    /**
     * 获取表单提交成功页配置
     * @param $data
     * @return array
     */
    public function getSubmitConfig($data)
    {
        if (empty($data[ 'form_id' ])) {
            throw new CommonException('缺少表单id');
        }

        $field = 'id, form_id, submit_after_action, tips_type, tips_text, time_limit_type, time_limit_rule, voucher_content_rule, success_after_action';

        $info = ( new DiyFormSubmitConfig() )->field($field)->where([
            [ 'site_id', '=', $data[ 'site_id' ] ],
            [ 'form_id', '=', $data[ 'form_id' ] ]
        ])->findOrEmpty()->toArray();
        if (!empty($info)) {
            // todo 靠后完善，处理核销凭证数据结构
        }
        return $info;
    }
}

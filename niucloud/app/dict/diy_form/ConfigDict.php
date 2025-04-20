<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\diy_form;

/**
 * 万能表单提交页配置项
 */
class ConfigDict
{

    //填表人提交后操作
    const TEXT = 'text'; // 文字
    const VOUCHER = 'voucher'; // 核销凭证

    //提示内容类型
    const DEFAULT = 'default'; // 默认提示
    const DIY = 'diy'; // 自定义提示

    // 核销凭证有效期限制类型 / 填写时间限制类型
    const NO_LIMIT = 'no_limit'; // 不限制
    const SPECIFY_TIME = 'specify_time'; // 指定固定开始结束时间
    const VALIDITY_TIME = 'validity_time'; // 按提交时间设置有效期

    // 填写方式
    const WRITE_WAY_NO_LIMIT = 'no_limit'; // 不限制
    const WRITE_WAY_SCAN = 'scan'; // 仅限微信扫一扫
    const WRITE_WAY_URL = 'url'; // 仅限链接进入

    // 参与会员
    const ALL_MEMBER = 'all_member';// 所有会员参与
    const SELECTED_MEMBER_LEVEL = 'selected_member_level'; // 指定会员等级
    const SELECTED_MEMBER_LABEL = 'selected_member_label'; // 指定会员标签

    // 填写次数限制
    const WRITE_NUM_NO_LIMIT = 'no_limit'; // 不限制
    const WRITE_NUM_DIY = 'diy'; // 自定义

    // 是否允许修改自己填写的内容
    const NO = 0; // 否
    const YES = 1; // 是

}

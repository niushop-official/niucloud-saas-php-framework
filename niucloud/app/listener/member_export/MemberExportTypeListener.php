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

/**
 * 会员导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class MemberExportTypeListener
{

    public function handle()
    {
        return [
            'member' => [
                'name' => '会员列表',
                'column' => [
                    'nickname' => [ 'name' => '会员昵称'],
                    'mobile' => [ 'name' => '手机号'],
                    'member_level_name' => [ 'name' => '会员等级'],
                    'sex_name' => [ 'name' => '性别'],
                    'birthday' => [ 'name' => '生日'],
                    'point' => [ 'name' => '积分'],
                    'balance' => [ 'name' => '余额'],
                    'money' => [ 'name' => '可提现余额'],
                    'growth' => [ 'name' => '成长值'],
                    'commission' => [ 'name' => '佣金'],
                    'register_channel_name' => [ 'name' => '注册来源'],
                    'status_name' => [ 'name' => '用户状态'],
                    'create_time' => [ 'name' => '注册时间'],
                    'last_visit_time' => [ 'name' => '最后访问时间'],
                ],
            ]
        ];
    }
}
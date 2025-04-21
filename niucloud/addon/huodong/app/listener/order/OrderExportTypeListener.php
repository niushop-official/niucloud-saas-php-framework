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

namespace addon\huodng\app\listener\order;

/**
 * 订单导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class OrderExportTypeListener
{

    public function handle()
    {
        return [
            'shop_order' => [
                'name' => '活动报名记录',
                'column' => [
                    'order_no' => ['name' => '报名编号'],
                    'act_name' => ['name' => '报名活动'],
                    'nickname' => ['name' => '用户昵称'],
                    'realname' => ['name' => '真实姓名'],
                    'mobile' => ['name' => '手机号'],
                    'order_from_name' => ['name' => '订单来源'],
                    'create_time' => ['name' => '报名时间'],
                    'hx_time' => ['name' => '核销时间'],
                ]
            ]
        ];
    }
}
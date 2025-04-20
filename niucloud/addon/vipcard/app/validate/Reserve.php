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

namespace addon\vipcard\app\validate;

/**
 * 卡项验证器
 */
class Reserve extends \think\Validate
{

    protected $rule = [
        'reserve_name' => 'require',
        'reserve_date' => 'require',
        'goods_id' => 'require'
    ];

    protected $message = [
        'reserve_name.require' => 'vipcard_reserve.reserve_name_require',
        'reserve_date.require' => 'vipcard_reserve.reserve_time_require',
        'goods_id.require' => 'vipcard_reserve.goods_id_require',
    ];

    protected $scene = [
        "add" => ['reserve_name', 'reserve_date', 'goods_id'],
        "edit" => ['reserve_time', 'goods_id']
    ];

}
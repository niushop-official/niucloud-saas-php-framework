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

namespace addon\o2o\app\validate;

/**
 * 技师验证器
 */
class Technician extends \think\Validate
{

    protected $rule = [
        'member_id' => 'require',
        'name' => 'require',
        'goods_ids' => 'require',
        'age' => 'number',
        'working_age' => 'number',
        'mobile' => 'mobile',
    ];

    protected $message = [
        'member_id.require' => 'o2o_technician.member_id_require',
        'name.require' => 'o2o_technician.name_require',
        'age.number' => 'o2o_technician.age_number',
        'mobile.require' => 'o2o_technician.mobile_require',
        'goods_ids.require' => 'o2o_technician.goods_ids_require',
    ];

    protected $scene = [
        "add" => ['member_id', 'name', 'mobile', 'goods_ids'],
        "edit" => ['member_id', 'name', 'mobile', 'goods_ids']
    ];

}
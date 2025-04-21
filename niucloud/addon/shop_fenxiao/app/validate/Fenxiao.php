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

namespace addon\shop_fenxiao\app\validate;

use core\base\BaseValidate;

/**
 * 分销商验证器
 * Class Fenxiao
 * @package addon\shop_fenxiao\app\validate
 */
class Fenxiao extends BaseValidate
{

    protected $rule = [
        'member_id' => 'require|gt:0',
        'parent' => 'require',
        'fenxiao_level' => 'require|gt:0',
        'fenxiao_id' => 'require'
    ];

    protected $message = [
        'member_id.require' => [ 'common_validate.require', [ 'member_id' ] ],
        'parent.require' => [ 'common_validate.require', [ 'parent' ] ],
        'fenxiao_level.require' => [ 'common_validate.require', [ 'fenxiao_level' ] ],
    ];

    protected $scene = [
        "add" => [ 'member_id', 'fenxiao_level' ],
    ];

}

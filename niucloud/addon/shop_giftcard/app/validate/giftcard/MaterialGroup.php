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

namespace addon\shop_giftcard\app\validate\giftcard;

use core\base\BaseValidate;

/**
 * 礼品卡素材分组验证器
 * Class MaterialGroup
 * @package addon\shop_giftcard\app\validate\giftcard
 */
class MaterialGroup extends BaseValidate
{

    protected $rule = [
        'group_name' => 'require',
    ];

    protected $message = [
        'group_name.require' => [ 'common_validate.require', [ 'group_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'group_name' ],
        "edit" => [ 'group_name' ]
    ];

}

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
 * 礼品卡素材验证器
 * Class Material
 * @package addon\shop_giftcard\app\validate\giftcard
 */
class Material extends BaseValidate
{

    protected $rule = [
        'group_id' => 'require',
        'url' => 'require',
    ];

    protected $message = [
        'group_id.require' => [ 'common_validate.require', [ 'group_id' ] ],
        'url.require' => [ 'common_validate.require', [ 'url' ] ],
    ];

    protected $scene = [
        "add" => [ 'group_id', 'url' ],
        "edit" => [ 'group_id', 'url' ]
    ];

}

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
 * 礼品卡活动验证器
 * Class Giftcard
 * @package addon\shop_giftcard\app\validate\giftcard
 */
class Giftcard extends BaseValidate
{

    protected $rule = [
        'type' => 'require',
        'category_id' => 'require',
        'cover' => 'require',
        'card_name' => 'require',
        'card_right_type' => 'require',
    ];

    protected $message = [
        'type.require' => [ 'common_validate.require', [ 'type' ] ],
        'category_id.require' => [ 'common_validate.require', [ 'category_id' ] ],
        'cover.require' => [ 'common_validate.require', [ 'cover' ] ],
        'card_name.require' => [ 'common_validate.require', [ 'card_name' ] ],
        'card_right_type.require' => [ 'common_validate.require', [ 'card_right_type' ] ],
    ];

    protected $scene = [
        "add" => [ 'type', 'category_id', 'cover', 'card_name', 'card_right_type' ],
        "edit" => [ 'type', 'category_id', 'cover', 'card_name', 'card_right_type' ]
    ];

}

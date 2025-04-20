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

namespace addon\shop\app\validate\goods;

use core\base\BaseValidate;

/**
 * 商品评价验证器
 * Class Evaluate
 * @package addon\shop\app\validate\goods
 */
class Evaluate extends BaseValidate
{

    protected $rule = [
        'order_id' => 'require',
        'order_goods_id' => 'require',
        'goods_id' => 'require',
        'member_id' => 'require',
        'content' => 'require',
        'images' => 'require',
        'is_anonymous' => 'require',
        'scores' => 'require',
        'is_audit' => 'require',
        'explain_first' => 'require',
        'again_content' => 'require',
        'again_images' => 'require',
        'again_explain' => 'require',
        'again_time' => 'require',
        'again_is_audit' => 'require',
        'is_show' => 'require',
    ];

    protected $message = [
        'order_id.require' => [ 'common_validate.require', [ 'order_id' ] ],
        'order_goods_id.require' => [ 'common_validate.require', [ 'order_goods_id' ] ],
        'goods_id.require' => [ 'common_validate.require', [ 'goods_id' ] ],
        'member_id.require' => [ 'common_validate.require', [ 'member_id' ] ],
        'content.require' => [ 'common_validate.require', [ 'content' ] ],
        'images.require' => [ 'common_validate.require', [ 'images' ] ],
        'is_anonymous.require' => [ 'common_validate.require', [ 'is_anonymous' ] ],
        'scores.require' => [ 'common_validate.require', [ 'scores' ] ],
        'is_audit.require' => [ 'common_validate.require', [ 'is_audit' ] ],
        'explain_first.require' => [ 'common_validate.require', [ 'explain_first' ] ],
        'again_content.require' => [ 'common_validate.require', [ 'again_content' ] ],
        'again_images.require' => [ 'common_validate.require', [ 'again_images' ] ],
        'again_explain.require' => [ 'common_validate.require', [ 'again_explain' ] ],
        'again_time.require' => [ 'common_validate.require', [ 'again_time' ] ],
        'again_is_audit.require' => [ 'common_validate.require', [ 'again_is_audit' ] ],
        'is_show.require' => [ 'common_validate.require', [ 'is_show' ] ],
    ];

    protected $scene = [
        "add" => [ 'goods_id', 'content', 'is_anonymous', 'scores', 'is_show' ],
    ];

}

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

namespace addon\qiankun_vip_card\app\validate\card;
use core\base\BaseValidate;
/**
 * 会员卡密验证器
 * Class Card
 * @package addon\qiankun_vip_card\app\validate\card
 */
class Card extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['level_id', 'member_id', 'order_id', 'card_no', 'card_pwd', 'use_member'],
            "edit" => ['level_id', 'member_id', 'order_id', 'card_no', 'card_pwd', 'use_member']
        ];

}

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

namespace addon\ttcard\app\validate\cardmsg;
use core\base\BaseValidate;
/**
 * 消息管理验证器
 * Class Cardmsg
 * @package addon\ttcard\app\validate\cardmsg
 */
class Cardmsg extends BaseValidate
{

       protected $rule = [
            'type_status' => 'require',
            'status' => 'require',
            'form_user_id' => 'require',
            'to_user_id' => 'require',
            'card_id' => 'require',
            'title' => 'require',
            'content' => 'require'
        ];

       protected $message = [
            'type_status.require' => ['common_validate.require', ['type_status']],
            'status.require' => ['common_validate.require', ['status']],
            'form_user_id.require' => ['common_validate.require', ['form_user_id']],
            'to_user_id.require' => ['common_validate.require', ['to_user_id']],
            'card_id.require' => ['common_validate.require', ['card_id']],
            'title.require' => ['common_validate.require', ['title']],
            'content.require' => ['common_validate.require', ['content']]
        ];

       protected $scene = [
            "add" => ['type_status', 'status', 'form_user_id', 'to_user_id', 'card_id', 'title', 'content'],
            "edit" => ['type_status', 'status', 'form_user_id', 'to_user_id', 'card_id', 'title', 'content']
        ];

}

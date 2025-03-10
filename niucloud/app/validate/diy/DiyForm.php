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

namespace app\validate\diy;

use app\service\admin\diy_form\DiyFormService;
use think\Validate;

/**
 * 万能表单验证器
 * Class DiyForm
 * @package app\validate\diy
 */
class DiyForm extends Validate
{

    protected $rule = [
        'page_title' => 'require|checkPageTitleUnique',
        'title' => 'require',
        'type' => 'require',
        'value' => 'require',
    ];

    protected $message = [];

    protected $scene = [
        "add" => [ 'page_title', 'title', 'type', 'value' ],
        "edit" => [ 'page_title', 'title', 'value' ],
    ];

    public function checkPageTitleUnique($value, $rule, $data)
    {
        return ( new DiyFormService() )->checkPageTitleUnique($data) ? get_lang("validate_diy.page_title_unique") : true;
    }

}

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

use app\service\admin\diy\DiyService;
use think\Validate;

/**
 * 自定义主题配色验证器
 * Class DiyTheme
 * @package app\validate\diy
 */
class DiyTheme extends Validate
{

    protected $rule = [
        'title' => 'require|checkDiyThemeTitleUnique',
        'theme' => 'require',
    ];

    protected $message = [];

    protected $scene = [
        "add" => ['title', 'theme'],
        "edit" => ['title', 'theme'],
    ];

    public function checkDiyThemeTitleUnique($value, $rule, $data)
    {
        return ( new DiyService() )->checkDiyThemeTitleUnique($data) ? get_lang("validate_diy.theme_title_unique") : true;
    }


}
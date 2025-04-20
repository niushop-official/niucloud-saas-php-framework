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

namespace addon\shop_fenxiao\app\validate\fenxiao_level;
use core\base\BaseValidate;
/**
 * 分销等级验证器
 * Class FenxiaoLevel
 * @package addon\shop_fenxiao\app\validate\fenxiao_level
 */
class FenxiaoLevel extends BaseValidate
{

       protected $rule = [
            'level_num' => 'require',
            'level_name' => 'require',
        ];

       protected $message = [
            'level_num.require' => ['common_validate.require', ['level_num']],
            'level_name.require' => ['common_validate.require', ['level_name']],
        ];

       protected $scene = [
            "add" => ['level_num', 'level_name', 'one_rate', 'two_rate', 'upgrade_type', 'fenxiao_commission', 'fenxiao_order_num', 'fenxiao_order_money', 'order_num', 'order_money', 'child_num', 'child_fenxiao_num', 'status'],
            "edit" => ['level_num', 'level_name', 'one_rate', 'two_rate', 'upgrade_type', 'fenxiao_commission', 'fenxiao_order_num', 'fenxiao_order_money', 'order_num', 'order_money', 'child_num', 'child_fenxiao_num', 'status']
        ];

}

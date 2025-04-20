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

namespace addon\yk_recharge\app\model;

use app\dict\common\ChannelDict;
use app\model\member\Member;
use app\model\pay\Pay;
use core\base\BaseModel;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 充值订单模型
 * Class RechargeOrder
 * @package app\model\order
 */
class RechargeSetting extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'setting_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'yk_recharge_setting';

}

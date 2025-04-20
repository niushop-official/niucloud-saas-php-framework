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

namespace addon\qiankun_recovery\app\model;

use core\base\BaseModel;
use think\facade\Log;

/**
 * 充值设置模型
 * Class Config
 * @package addon\qiankun_recovery\app\model\config
 */
class Config extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'qiankun_recovery_config';

    public function recovery($order_data)
    {
        Log::info(json_encode($order_data));
    }
}

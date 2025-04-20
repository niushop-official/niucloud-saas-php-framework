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

namespace addon\shop\app\model;

use core\base\BaseModel;

/**
 * 天统计表
 * Class OrderLog
 * @package app\model\order
 */
class ShopStat extends BaseModel
{

    protected $autoWriteTimestamp = false;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_stat';

    //类型
    protected $type = [
        'date_time' => 'timestamp',
    ];

}

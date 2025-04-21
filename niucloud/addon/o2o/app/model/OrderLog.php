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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\order\OrderLogDict;
use core\base\BaseModel;

/**
 *  卡项订单
 * Class O2oGoodsCategory
 * @package app\model\o2o_goods_category
 */
class OrderLog extends BaseModel
{
    protected $type = [
        'action_time' => 'timestamp'
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_order_log';

    public function getActionAttr($value) {
        return OrderLogDict::getLogAction($value);
    }
}

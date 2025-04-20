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

namespace addon\shop\app\model\order;

use core\base\BaseModel;

/**
 * 订单优惠模型
 */
class OrderDiscounts extends BaseModel
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
    protected $name = 'shop_order_discount';

    //类型
    protected $type = [

    ];

    /**
     * @return OrderDiscounts|\think\model\relation\HasOne
     */
    public function shopOrder()
    {
        return $this->hasOne(Order::class, 'order_id', 'order_id');
    }

}

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

namespace addon\shop\app\model\manjian;


use addon\shop\app\model\order\Order;
use core\base\BaseModel;

/**
 * 满减送活动赠送记录模型
 */
class ManjianGiveRecords extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'record_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_manjian_give_records';

    protected $type = [
    ];

    // 设置json类型字段
    protected $json = [ 'coupon_json', 'goods_json', 'sku_ids' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 关联订单列表
     * @return \think\model\relation\hasOne
     */
    public function order()
    {
        return $this->hasOne(Order::class, 'order_id', 'order_id');
    }
}

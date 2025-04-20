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

namespace addon\shop\app\model\delivery;

use core\base\BaseModel;

/**
 * 物流模板模型
 * Class ShippingTemplateItem
 * @package addon\shop\app\model\delivery
 */
class ShippingTemplateItem extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'item_id';

    protected $type = [
        'sprice' => 'float',
        'xprice' => 'float'
    ];

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_delivery_shipping_template_item';

    public function getAreaIdsAttr($value, $data)
    {
        return explode(',', $value);
    }
}

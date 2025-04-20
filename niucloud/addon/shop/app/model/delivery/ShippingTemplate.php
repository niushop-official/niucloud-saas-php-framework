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

use addon\shop\app\dict\delivery\ShippingTemplateDict;
use core\base\BaseModel;

/**
 * 物流模板模型
 * Class ShippingTemplate
 * @package addon\shop\app\model\delivery
 */
class ShippingTemplate extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'template_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_delivery_shipping_template';

    public function searchTemplateNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where([ [ 'template_name', 'like', "%$value%" ] ]);
        }
    }

    /**
     * 获取计费类型
     * @param $value
     * @param $data
     * @return array|mixed|string
     */
    public function getFeeTypeNameAttr($value, $data)
    {
        if (isset($data[ 'fee_type' ])) return ShippingTemplateDict::getFeeType($data[ 'fee_type' ]);
    }
}

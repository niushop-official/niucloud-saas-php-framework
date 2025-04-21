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

namespace addon\shop\app\model\shop_address;

use core\base\BaseModel;

/**
 * 商家地址库模型
 * Class ShopAddress
 * @package addon\shop\app\model\shop_address
 */
class ShopAddress extends BaseModel
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
    protected $name = 'shop_address';

    /**
     * 搜索器:商家地址库手机号
     * @param $value
     * @param $data
     */
    public function searchMobileAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("mobile", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

    /**
     * 搜索器:商家地址库地址
     * @param $value
     * @param $data
     */
    public function searchFullAddressAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("full_address", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

}

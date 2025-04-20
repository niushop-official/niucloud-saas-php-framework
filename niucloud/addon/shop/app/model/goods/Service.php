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

namespace addon\shop\app\model\goods;

use core\base\BaseModel;

/**
 * 商品服务模型
 * Class Serve
 * @package addon\shop\app\model\goods
 */
class Service extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'service_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_service';

    /**
     * 搜索器:商品服务
     * @param $value
     * @param $data
     */
    public function searchServiceIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("service_id", $value);
        }
    }

    /**
     * 搜索器:商品服务服务名称
     * @param $value
     * @param $data
     */
    public function searchServiceNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("service_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

}

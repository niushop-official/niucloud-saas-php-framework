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
 * 配送员模型
 * Class Deliver
 * @package addon\shop\app\model\delivery
 */
class Deliver extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'deliver_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_delivery_deliver';


    /**
     * 搜索器:配送员名称
     * @param $value
     * @param $data
     */
    public function searchDeliverNameAttr($query, $value)
    {
        if ($value != '') {
            $query->where("deliver_name", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:配送员手机号
     * @param $value
     * @param $data
     */
    public function searchDeliverMobileAttr($query, $value)
    {
        if ($value != '') {
            $query->where("deliver_mobile", 'like', '%' . $value . '%');

        }
    }
}

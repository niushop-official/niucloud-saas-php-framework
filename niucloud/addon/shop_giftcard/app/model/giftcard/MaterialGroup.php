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

namespace addon\shop_giftcard\app\model\giftcard;

use core\base\BaseModel;

/**
 * 礼品卡素材分组模型
 * Class MaterialGroup
 * @package addon\shop_giftcard\app\model\giftcard
 */
class MaterialGroup extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'group_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_material_group';


    /**
     * 搜索器:礼品卡素材分组素材分组id
     * @param $value
     * @param $data
     */
    public function searchGroupIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("group_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡素材分组分组名称
     * @param $value
     * @param $data
     */
    public function searchGroupNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("group_name", 'like', '%' . $value . '%');
        }
    }

}

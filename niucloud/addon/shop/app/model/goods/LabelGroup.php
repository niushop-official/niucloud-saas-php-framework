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
 * 商品标签分组模型
 * Class LabelGroup
 * @package addon\shop\app\model\goods
 */
class LabelGroup extends BaseModel
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
    protected $name = 'shop_goods_label_group';

    /**
     * 搜索器:商品标签分组名称
     * @param $value
     * @param $data
     */
    public function searchGroupNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("group_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }
}

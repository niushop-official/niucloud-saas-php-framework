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
 * 商品标签模型
 * Class Label
 * @package addon\shop\app\model\goods
 */
class Label extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'label_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_label';

    // 设置json类型字段
    protected $json = [ 'color_json' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 搜索器:商品标签名称
     * @param $value
     * @param $data
     */
    public function searchLabelNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("label_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

    /**
     * 搜索器:商品标签分组id
     * @param $value
     * @param $data
     */
    public function searchGroupIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("group_id", "=", $value);
        }
    }

    /**
     * 关联商品标签分组
     * @return \think\model\relation\HasOne
     */
    public function group()
    {
        return $this->hasOne(LabelGroup::class, 'group_id', 'group_id');
    }

}

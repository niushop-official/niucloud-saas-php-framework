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
 * 礼品卡素材模型
 * Class Material
 * @package addon\shop_giftcard\app\model\giftcard
 */
class Material extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'material_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_material';

    /**
     * 搜索器:礼品卡素材素材id
     * @param $value
     * @param $data
     */
    public function searchMaterialIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("material_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡素材素材分组id
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
     * 搜索器:礼品卡素材图片地址
     * @param $value
     * @param $data
     */
    public function searchUrlAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("url", $value);
        }
    }

    /**
     * 关联素材分组
     * @return \think\model\relation\HasOne
     */
    public function group()
    {
        return $this->hasOne(MaterialGroup::class, 'group_id', 'group_id')
            ->joinType('left')
            ->withField('group_id, group_name');
    }

}

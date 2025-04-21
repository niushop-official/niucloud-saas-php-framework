<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\model;

use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 旅游订单模型
 * Class Scenic
 * @package addon\tourism\app\model
 */
class TourismOrderItem extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_item_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'tourism_order_item';

    /**
     * 中图生成
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getGoodsImageThumbMidAttr($value, $data)
    {
        if (!empty($data['goods_image'])) {
            return get_thumb_images($data['site_id'], $data['goods_image'], FileDict::MID);
        }
        return '';
    }
}
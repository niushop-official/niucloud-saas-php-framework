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

namespace addon\vipcard\app\model;

use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 *  卡项订单
 * Class VipcardGoodsCategory
 * @package app\model\vipcard_goods_category
 */
class OrderItem extends BaseModel
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
    protected $name = 'vipcard_order_item';

    /**
     * 小图生成
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getItemImageThumbSmallAttr($value, $data) {
        if(!empty($data['item_image'])){
            return get_thumb_images($data['site_id'], $data['item_image'], FileDict::SMALL);
        }
    }

    /**
     * 中图生成
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getItemImageThumbMidAttr($value, $data)
    {
        if (!empty($data['item_image'])) {
            return get_thumb_images($data['site_id'], $data['item_image'], FileDict::MID);
        }
        return '';
    }

}

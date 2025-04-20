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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\order\OrderItemType;
use addon\o2o\app\dict\order\RefundDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 *  卡项订单
 * Class O2oGoodsCategory
 * @package app\model\o2o_goods_category
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
    protected $name = 'o2o_order_item';

    protected $type = [
        'pay_time' => 'timestamp',
    ];

    /**
     * 退款状态字段转化
     * @param $value
     * @return mixed
     */
    public function getRefundStatusNameAttr($value, $data)
    {
        if(isset($data['refund_status']))
        {
            return RefundDict::getRefundStatus()[$data['refund_status']] ?? '';
        }
    }

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

    /**
     * 技师
     * @return \think\model\relation\HasMany
     */
    public function technicianInfo() {
        return $this->hasOne(Technician::class,'id', 'technician_id');
    }

    /**
     * 订单类型
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getItemTypeNameAttr($value, $data) {

        if(!empty($data['item_type'])){
            return OrderItemType::getStatus()[$data['item_type']]['name'];
        }
    }

    /**
     * 获取图片缩略图（中）
     */
    public function getItemImagesThumbMidAttr($value, $data)
    {
        if (isset($data[ 'item_images' ]) && $data[ 'item_images' ] != '') {
            $goods_image = explode(',', $data[ 'item_images' ]);
            $img_arr = [];
            foreach ($goods_image as $k => $v) {
                $img = get_thumb_images($data['site_id'], $v, FileDict::MID);
                if (!empty($img)) {
                    $img_arr[] = $img;
                }
            }
            return $img_arr;
        }
        return [];
    }

    /**
     * 获取图片缩略图（小）
     */
    public function getItemImagesThumbSmallAttr($value, $data)
    {
        if (isset($data[ 'item_images' ]) && $data[ 'item_images' ] != '') {
            $goods_image = explode(',', $data[ 'item_images' ]);
            $img_arr = [];
            foreach ($goods_image as $k => $v) {
                $img = get_thumb_images($data['site_id'], $v, FileDict::SMALL);
                if (!empty($img)) {
                    $img_arr[] = $img;
                }
            }
            return $img_arr;
        }
        return [];
    }

}

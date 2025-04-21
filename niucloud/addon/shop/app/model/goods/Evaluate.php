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

use addon\shop\app\dict\goods\EvaluateDict;
use addon\shop\app\model\order\OrderGoods;
use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 商品评价模型
 * Class Evaluate
 * @package addon\shop\app\model\goods
 */
class Evaluate extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'evaluate_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_goods_evaluate';

    // 设置json类型字段
    protected $json = [ 'images' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 关联商品表
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')->withField('site_id, goods_id, goods_name, goods_cover')
            ->append([ 'goods_cover_thumb_small', 'goods_cover_thumb_mid' ]);
    }

    public function orderGoods()
    {
        return $this->hasOne(OrderGoods::class, 'order_goods_id', 'order_goods_id');
    }

    /**
     * 审核状态转换
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getAuditNameAttr($value, $data)
    {
        return EvaluateDict::getStatus()[ $data[ 'is_audit' ] ] ?? '';
    }

    /**
     * 缩略图生成-小图
     * @param $value
     * @param $data
     * @return array|mixed
     * @throws \Exception
     */
    public function getImageSmallAttr($value, $data)
    {
        if (!empty($data[ 'images' ])) {
            $small_arr = [];
            foreach ($data[ 'images' ] as $k => $v) {
                $small_arr[] = get_thumb_images($data[ 'site_id' ], $v, FileDict::SMALL);
            }
            return $small_arr;
        }
        return [];
    }

    /**
     * 缩略图生成-大图
     * @param $value
     * @param $data
     * @return array|mixed
     * @throws \Exception
     */
    public function getImageBigAttr($value, $data)
    {
        if (!empty($data[ 'images' ])) {
            $small_arr = [];
            foreach ($data[ 'images' ] as $k => $v) {
                $small_arr[] = get_thumb_images($data[ 'site_id' ], $v, FileDict::BIG);
            }
            return $small_arr;
        }
        return [];
    }

    /**
     * 缩略图生成-中图
     * @param $value
     * @param $data
     * @return array|mixed
     * @throws \Exception
     */
    public function getImageMidAttr($value, $data)
    {
        if (!empty($data[ 'images' ])) {
            $small_arr = [];
            foreach ($data[ 'images' ] as $k => $v) {
                $small_arr[] = get_thumb_images($data[ 'site_id' ], $v, FileDict::MID);
            }
            return $small_arr;
        }
        return [];
    }

    /**
     * 评分搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchScoresAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("scores", "in", $value);
        }
    }

    public function searchGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_id", "=", $value);
        }
    }

    public function getMemberNameAttr($value, $data)
    {
        if (isset($data[ 'is_anonymous' ]) && $data[ 'is_anonymous' ] == 1) {
            return '匿名买家';
        }
        return $value;
    }
}

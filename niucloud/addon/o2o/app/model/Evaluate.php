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

use addon\o2o\app\dict\EvaluateDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 评价
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
    protected $name = 'o2o_technician_evaluate';

    //类型
    protected $type = [
        'create_time'     =>  'timestamp',
        'update_time'  =>  'timestamp',
    ];

    /**
     * 审核状态
     * @param $value
     * @return mixed
     */
    public function getIsAuditAttr($value, $data)
    {
        if(isset($data['is_audit']))
        {
            return EvaluateDict::getAuditStatus()[$data['is_audit']] ?? '';
        }

    }

    /**
     * 关联商品表
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')->withField('site_id, goods_id, goods_name, goods_cover, goods_image,price,buy_type,price_list')
            ->append([ 'app_logo_thumb_small', 'app_logo_thumb_mid' ]);
    }

    public function orderItem(){
        return $this->hasOne(OrderItem::class, 'order_item_id', 'order_item_id');
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
            $data[ 'images' ] = explode(',', $data[ 'images' ]);
            $small_arr = [];
            foreach ($data[ 'images' ] as $k => $v) {
                $small_arr[] = get_thumb_images($data['site_id'], $v, FileDict::SMALL);
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
            $data[ 'images' ] = explode(',', $data[ 'images' ]);
            foreach ($data[ 'images' ] as $k => $v) {
                $small_arr[] = get_thumb_images($data['site_id'], $v, FileDict::BIG);
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
            $mid_arr = [];
            foreach ($data[ 'images' ] as $k => $v) {
                $mid_arr[] = get_thumb_images($data['site_id'], $v, FileDict::MID);
            }
            return $mid_arr;
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
    /**
     * 技师搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTechnicianIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("technician_id", "=", $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    public function getMemberNameAttr($value, $data) {
        if (isset($data['is_anonymous']) && $data['is_anonymous'] == 1) {
            return '匿名买家';
        }
        return $value;
    }

}

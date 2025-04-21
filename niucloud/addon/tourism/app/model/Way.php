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

use addon\tourism\app\dict\way\WayTagDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 线路模型
 * Class Way
 * @package addon\tourism\app\model
 */
class Way extends BaseModel
{


//    use SoftDelete;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'way_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'tourism_way';

    /**
     * 定义软删除标记字段
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    /**
     * 关联商品表
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'way_id', 'way_id')->joinType('inner');
    }

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if(isset($data['way_status']))
        {
            return WayTagDict::getStatus()[$data['way_status']]['name'] ?? '';
        }

    }

    /**
     * 参团类型名称
     * @param $value
     * @return mixed
     */
    public function getGroupBuyTypeNameAttr($value, $data)
    {
        return WayTagDict::getTag()['group_buy_type'][$data['group_buy_type'] ?? ''] ?? '';
    }
    /**
     * 线路主题名称
     * @param $value
     * @return mixed
     */
    public function getWayThemeNameAttr($value, $data)
    {
        return WayTagDict::getTag()['way_theme'][$data['way_theme'] ?? ''] ?? '';
    }
    /**
     * 出游类型名称
     * @param $value
     * @return mixed
     */
    public function getTravelTypeNameAttr($value, $data)
    {
        return WayTagDict::getTag()['travel_type'][$data['travel_type'] ?? ''] ?? '';
    }
    /**
     * 交通工具名称
     * @param $value
     * @return mixed
     */
    public function getWayTrafficNameAttr($value, $data)
    {
        return WayTagDict::getTag()['way_traffic'][$data['way_traffic'] ?? ''] ?? '';
    }

    /**
     * 线路名称搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchWayNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('way_name', 'like', '%' . $value . '%');
        }
    }

    /**
     * 关键字搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchSearchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('way_name', 'like', '%' . $value . '%');
        }
    }


    /**
     * 开始城市搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStartCityAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('start_city', '=', $value);
        }
    }

    /**
     * 目的地城市搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchEndCityAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('end_city', '=', $value);
        }
    }

    /**
     * 状态搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {

        if ($value != '') {
            $query->where('status', '=', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'create_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getCoverThumbMidAttr($value, $data){
        if($data['way_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'way_cover'], FileDict::MID);
        }
        return [];
    }
}

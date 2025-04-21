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

namespace addon\shop\app\model\active;

use addon\shop\app\dict\active\ActiveDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 营销活动模型
 */
class Active extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'active_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_active';

    protected $type = [
        'start_time' => 'timestamp',
        'end_time' => 'timestamp',
        'create_time' => 'timestamp',
        'update_time' => 'timestamp',
    ];

    // 设置json类型字段
    protected $json = [ 'active_goods_info', 'active_value'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 活动商品项
     * @return \think\model\relation\HasMany
     */
    public function activeGoods()
    {
        return $this->hasMany(ActiveGoods::class, 'active_id', 'active_id');
    }

    /**
     * 活动状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getActiveStatusNameAttr($value, $data)
    {
        if (empty($data['active_status']))
        {
            return '';
        }
        return ActiveDict::getStatus()[$data['active_status']] ?? '';
    }

    /**
     * 活动类型
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getActiveTypeNameAttr($value, $data)
    {
        if (empty($data['active_type']))
        {
            return '';
        }
        return ActiveDict::getType()[$data['active_type']] ?? '';
    }

    /**
     * 活动商品类型
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getActiveGoodsTypeNameAttr($value, $data)
    {
        if (empty($data['active_goods_type']))
        {
            return '';
        }
        return ActiveDict::getGoodsType()[$data['active_goods_type']] ?? '';
    }

    /**
     * 活动类别
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getActiveClassNameAttr($value, $data)
    {
        if (empty($data['active_class']))
        {
            return '';
        }
        return ActiveDict::getClass()[$data['active_class']] ?? '';
    }

    /**
     * 搜索器:标题
     * @param $value
     * @param $data
     */
    public function searchActiveNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("active_name", 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器:活动类型
     * @param $value
     * @param $data
     */
    public function searchActiveTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("active_type", '=', $value);
        }
    }

    /**
     * 搜索器:状态
     * @param $value
     * @param $data
     */
    public function searchActiveStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("active_status", '=', $value);
        }
    }

    /**
     * 活动结束时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchEndTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('end_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['end_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['end_time', '<=', $end_time]]);
        }
    }
}

<?php

namespace addon\ly_area\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 区域代理分红记录模型
 * Class AreaReward
 * @package addon\ly_area\app\model
 */
class AreaReward extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_area_log';

    use SoftDelete;
    protected $deleteTime = 'delete_time';

    protected $type = [
        'settle_time' => 'timestamp',
    ];

    

    

    /**
     * 搜索器:区域代理分红记录用户id
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("member_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理分红记录区域代理等级
     * @param $value
     * @param $data
     */
    public function searchLevelIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理分红记录代理区域
     * @param $value
     * @param $data
     */
    public function searchAgentAreaAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("agent_area", $value);
        }
    }

    
    /**
     * 搜索器:区域代理分红记录分红状态 0:未结算 1：已结算
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("status", $value);
        }
    }
    
    /**
     * 搜索器:区域代理分红记录结算时间
     * @param $value
     * @param $data
     */
    public function searchSettleTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : $value[0];
        $end = empty($value[1]) ? 0 : $value[1];
        if ($start > 0 && $end > 0) {
             $query->where([["settle_at", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["settle_at", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["settle_at", "<=", $end]]);
        }
    }
    
    /**
     * 搜索器:区域代理分红记录创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : $value[0];
        $end = empty($value[1]) ? 0 : $value[1];
        if ($start > 0 && $end > 0) {
             $query->where([["created_at", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["created_at", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["created_at", "<=", $end]]);
        }
    }
    
    

    public function areaLevel()
    {
        return $this->hasOne(\addon\ly_area\app\model\AreaLevel::class, 'level_id', 'level_id');
    }

    public function shopOrder()
    {
        return $this->hasOne(\addon\shop\app\model\order\Order::class, 'order_id', 'order_id');
    }

    public function member()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }


    public function buyMember(){
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'buy_mid');
    }


    public function orderGoods(){
        return $this->hasOne(\addon\shop\app\model\order\OrderGoods::class, 'order_id', 'order_id');
    }


    public function areaAgent(){
        return $this->hasOne(\addon\ly_area\app\model\AreaAgent::class, 'agent_id', 'agent_id');
    }



    
}
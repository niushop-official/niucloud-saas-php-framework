<?php

namespace addon\ly_lian\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 链动2+1奖励模型
 * Class LianReward
 * @package addon\ly_lian\app\model
 */
class LianReward extends BaseModel
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
    protected $name = 'ly_lian_reward';

    

    

    /**
     * 搜索器:链动2+1奖励会员id
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
     * 搜索器:链动2+1奖励等级id
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
     * 搜索器:链动2+1奖励购买者会员ID
     * @param $value
     * @param $data
     */
    public function searchBuyMidAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("buy_mid", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1奖励订单号
     * @param $value
     * @param $data
     */
    public function searchOrderIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_id", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1奖励订单商品ID
     * @param $value
     * @param $data
     */
    public function searchOrderGoodsIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_goods_id", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1奖励奖励类型：0直推、1见点、2培育、3、平级奖、9解冻结算
     * @param $value
     * @param $data
     */
    public function searchRewardTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("reward_type", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1奖励解冻状态: -1失效、0待解冻、1已解冻
     * @param $value
     * @param $data
     */
    public function searchThawStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("thaw_status", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1奖励创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }


    public function getSettleTimeAttr($value, $data){
        if(empty($data['settle_time'])){
            return '';
        }
        return date('Y-m-d H:i:s', $data['settle_time']);
    }

    // public function getThawStatusDescAttr($value, $data){
    //     $status = [-1 => '失效', 0 => '待解冻', 1 => '已解冻'];
    //     return $status[$data['thaw_status']];
    // }


    public function lianOrderGoods()
    {
        return $this->hasOne(\addon\shop\app\model\goods\Goods::class, 'goods_id', 'order_goods_id');
    }

    public function lianOrder()
    {
        return $this->hasOne(\addon\shop\app\model\order\Order::class, 'order_id', 'order_id');
    }

    public function buyMember()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'buy_mid');
    }

    public function lianLevel()
    {
        return $this->hasOne(\addon\ly_lian\app\model\Level::class, 'level_id', 'level_id');
    }

    public function member()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }



    
}
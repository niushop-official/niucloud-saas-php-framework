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

namespace addon\shop_giftcard\app\model\order;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\card\Card;
use app\dict\common\ChannelDict;
use app\model\member\Member;
use app\model\pay\Pay;
use core\base\BaseModel;
use think\db\Query;
use think\model\relation\HasOne;

/**
 * 礼品卡订单模型
 * Class Order
 * @package addon\shop_giftcard\app\model\order
 */
class Order extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_giftcard_order';

    protected $type = [
        'validity_time' => 'timestamp',
        'pay_time' => 'timestamp',
        'close_time' => 'timestamp'
    ];

    /**
     * 订单会员
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->field('member_id,nickname');
    }

    /**
     * 订单支付
     * @return HasOne
     */
    public function pay()
    {
        return $this->hasOne(Pay::class, 'out_trade_no', 'out_trade_no');
    }

    /**
     * 关联商品主表
     * @return \think\model\relation\hasMany
     */
    public function card()
    {
        return $this->hasMany(Card::class, 'order_id', 'order_id')->append([ 'status_name' ]);
    }

    /**
     * 搜索器:订单状态
     * @param $value
     * @param $data
     */
    public function searchSearchTypeAttr($query, $value, $data)
    {
        if ($value && isset($data[ 'search_name' ]) && $data[ 'search_name' ] != '') {
            $search_name = $this->handelSpecialCharacter($data[ 'search_name' ]);
            if ($value == 'order_no') $query->where("order_no", "like", "%$search_name%");
            if ($value == 'out_trade_no') $query->where("order.out_trade_no", "like", "%$search_name%");
        }
    }

    /**
     * 搜索器:礼品卡订单订单编号
     * @param $value
     * @param $data
     */
    public function searchOrderNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("order_no", $value);
        }
    }

    /**
     * 搜索器:礼品卡订单订单来源
     * @param $value
     * @param $data
     */
    public function searchOrderFromAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("order_from", $value);
        }
    }

    /**
     * 搜索器:礼品卡订单支付流水号
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("out_trade_no", $value);
        }
    }

    /**
     * 搜索器:礼品卡订单订单状态
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
     * 连表搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchJoinStatusAttr($query, $value, $data)
    {
        if ($data[ 'status' ]) {
            $query->where("order.status", $data[ 'status' ]);
        }
    }

    /**
     * 搜索器:礼品卡订单会员id
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
     * 搜索器:关联礼品卡活动id
     * @param $value
     * @param $data
     */
    public function searchGiftcardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("giftcard_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡订单礼品卡权益类型，balance：储值余额，goods：商品
     * @param $value
     * @param $data
     */
    public function searchCardRightTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_right_type", $value);
        }
    }

    /**
     * 搜索器:礼品卡订单下单时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('order.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'order.create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'order.create_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 搜索器:礼品卡订单支付时间
     * @param $value
     * @param $data
     */
    public function searchPayTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('pay_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'pay_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'pay_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 支付时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchJoinPayTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($data[ 'pay_time' ][ 0 ]) ? 0 : strtotime($data[ 'pay_time' ][ 0 ]);
        $end_time = empty($data[ 'pay_time' ][ 1 ]) ? 0 : strtotime($data[ 'pay_time' ][ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('order.pay_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'order.pay_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'order.pay_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 获取订单状态名称
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        return OrderDict::getStatus($data[ 'status' ])[ 'name' ] ?? '';
    }

    /**
     * 获取礼品卡权益类型名称
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getCardRightTypeNameAttr($value, $data)
    {
        return GiftcardDict::getCardRightType($data[ 'card_right_type' ])[ 'name' ] ?? '';
    }

    /**
     * 来源渠道
     * @param $value
     * @param $data
     * @return mixed|string|void
     */
    public function getOrderFromNameAttr($value, $data)
    {
        if (empty($data[ 'order_from' ]))
            return '';
        return ChannelDict::getType()[ $data[ 'order_from' ] ] ?? '';
    }

}

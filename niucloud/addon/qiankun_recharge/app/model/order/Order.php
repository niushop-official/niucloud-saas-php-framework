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

namespace addon\qiankun_recharge\app\model\order;

use addon\shop\app\service\api\marketing\CouponService;
use app\dict\member\MemberAccountTypeDict;
use app\model\member\MemberLevel;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseModel;
use core\exception\CommonException;
use Exception;

use app\model\member\Member;

use addon\qiankun_recharge\app\model\options\Options;

/**
 * 充值订单模型
 * Class Order
 * @package addon\qiankun_recharge\app\model\order
 */
class Order extends BaseModel
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
    protected $name = 'qiankun_recharge_order';


    /**
     * 搜索器:充值订单ID
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("id", $value);
        }
    }

    /**
     * 搜索器:充值订单订单号
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
     * 搜索器:充值订单订单来源
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
     * 搜索器:充值订单会员
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
     * 搜索器:充值订单充值项
     * @param $value
     * @param $data
     */
    public function searchRechargeIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("recharge_id", $value);
        }
    }

    /**
     * 搜索器:充值订单状态
     * @param $value
     * @param $data
     */
    public function searchPaidAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("paid", $value);
        }
    }

    /**
     * 搜索器:充值订单支付时间
     * @param $value
     * @param $data
     */
    public function searchPayTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("pay_time", $value);
        }
    }

    /**
     * 搜索器:充值订单退款
     * @param $value
     * @param $data
     */
    public function searchRefundStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("refund_status", $value);
        }
    }

    /**
     * 搜索器:充值订单创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("create_time", $value);
        }
    }

    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name' => 'nickname']);
    }

    public function rechargeOptions()
    {
        return $this->hasOne(Options::class, 'id', 'recharge_id')->joinType('left')->withField('title,id')->bind(['recharge_id_name' => 'title']);
    }

    public function pay($pay_info)
    {
        try {
            $trade_id = $pay_info['trade_id'] ?? 0;
            $order_info = $this->where([['id', '=', $trade_id]])->findOrEmpty()->toArray();
            if (empty($order_info)) {
                throw new CommonException('ORDER_NOT_EXIST');
            }
            $order_data = [
                'pay_time' => time(),
                'paid' => 1,
                'out_trade_no' => $pay_info['out_trade_no'],//支付后的交易流水号
            ];
            $this->where([['id', '=', $trade_id]])->update($order_data);

            //发放余额
            if ($order_info['order_money'] > 0) {
                (new CoreMemberAccountService())->addLog($order_info['site_id'], $order_info['member_id'], MemberAccountTypeDict::BALANCE, $order_info['order_money'], 'recharge', '会员充值到账' . $order_info['order_money'] . '元余额', $order_info['id']);
            }
            //发放赠送余额
            if ($order_info['give_price'] > 0) {
                (new CoreMemberAccountService())->addLog($order_info['site_id'], $order_info['member_id'], MemberAccountTypeDict::BALANCE, $order_info['give_price'], 'recharge', '会员充值到账' . $order_info['give_price'] . '元余额', $order_info['id']);
            }
            //发放积分
            if ($order_info['give_integral'] > 0) {
                (new CoreMemberAccountService())->addLog($order_info['site_id'], $order_info['member_id'], MemberAccountTypeDict::POINT, $order_info['give_integral'], 'recharge', '会员充值赠送' . $order_info['give_integral'] . '积分', $order_info['id']);
            }
            //发放优惠券
            if ($order_info['give_coupon']) {
                $couponIds = explode(',', $order_info['give_coupon']);
                foreach ($couponIds as $couponId) {
                    $data = [
                        'coupon_id' => $couponId,
                        'type' => 'send',
                        'number' => 1,
                    ];
                    (new CouponService())->receive($data);
                }
            }
            //赠送等级
            if ($order_info['give_level'] > 0) {
                $levelInfo = (new MemberLevel())->findOrEmpty($order_info['give_level'])->toArray();
                if ($levelInfo) {
                    (new Member())->where('member_id', $order_info['member_id'])->update(['member_level' => $order_info['give_level']]);
                }
            }
            return true;
        } catch (Exception $e) {
            throw new CommonException($e->getMessage() . ':' . $e->getFile() . ':' . $e->getLine());
        }
    }
}

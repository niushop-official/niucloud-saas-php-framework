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

namespace addon\transfer\app\service\core;

use addon\transfer\app\model\order\Order;
use addon\transfer\app\model\log\Log as Tlog;
use addon\transfer\app\dict\order\OrderDict;
use app\dict\pay\PayDict;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;
use app\model\member\Member;
use think\facade\Log;
use app\service\core\member\CoreMemberAccountService;
use app\dict\member\MemberAccountTypeDict;

class CoreOrderService extends BaseCoreService
{


    /**
     * 订单支付
     * @param array $pay_info
     * @return true
     */
    public function pay_notify(array $pay_info)
    {
        try {
            $trade_id = $pay_info[ 'trade_id' ] ?? 0;
            $order_model = new Order();
            $order_info = $order_model->where([ [ 'order_id', '=', $trade_id ] ])->findOrEmpty()->toArray();
            if (empty($order_info))
                throw new CommonException('ORDER_NOT_EXIST');
            $order_data = [
                'pay_time'      => time(),
                'order_status'  => 2,
                'out_trade_no'  => $pay_info[ 'out_trade_no' ]//支付后的交易流水号
            ];

            $order_model->where([ [ 'order_id', '=', $trade_id ] ])->update($order_data);

            /** 余额 作者:haha1256610  2025/1/25 下午10:30  **/
            $Tlog = Tlog::where('id', $order_info['log_id'])->find();
            $Tlog->where('id', $Tlog['id'])->strict(false)->update(['status'=>2]);

            ( new CoreMemberAccountService() )->addLog($Tlog['site_id'], $Tlog['to_member_id'], MemberAccountTypeDict::POINT,$Tlog['give_money'], $Tlog['type'].'_give', $Tlog['give_text'], $order_info['order_no']);




            return true;
        } catch (Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }


    /**
     * 获取订单信息
     * @param int $order_id
     * @return array
     */
    public function orderInfo(int $order_id)
    {
        return ( new Order() )->where([
            [ 'order_id', '=', $order_id ]
        ])->field('*')->findOrEmpty()->toArray();
    }

}


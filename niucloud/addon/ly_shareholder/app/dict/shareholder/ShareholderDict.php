<?php

namespace addon\ly_shareholder\app\dict\shareholder;

class ShareholderDict
{
    //申请状态（申请中）
    //申请状态（审核通过）
    //申请状态（审核拒绝）

    //股东状态（正常）
    const NORMAL = 1;
    //股东状态（冻结）
    const FREEZE = -1;



    /**
     * 状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::NORMAL => get_lang('dict_ly_shareholder_is_open.normal'),
            self::FREEZE => get_lang('dict_ly_shareholder_is_open.freeze'),
        ];
        if ($status == '') return $list;
        return $list[$status] ?? '';
    }

    //结算周期：天/周/月
    const DAY = '0';

    const WEEK = '1';

    const MONTH = '2';

    public static function getSettleTime($time = ''){
        $list = [
            self::DAY => get_lang('dict_ly_shareholder_settle_time.day'),
            self::WEEK => get_lang('dict_ly_shareholder_settle_time.week'),
            self::MONTH => get_lang('dict_ly_shareholder_settle_time.month'),
        ];
        if(!$time) return $list;
        return $list[$time] ?? '';
    }

    //结算方式：营业额/利润
    const TURNOVER = '0'; //营业额

    const PROFIT = '1'; //利润

    public static function getSettleType($type = ''){
        $list = [
            self::TURNOVER => get_lang('dict_ly_shareholder_settle_type.turnover'),
            self::PROFIT => get_lang('dict_ly_shareholder_settle_type.profit'),
        ];
        if(!$type) return $list;
        return $list[$type] ?? '';
    }

    //提成类型 余额/佣金/积分
    const BALANCE = '0'; //余额

    const COMMISSION = '1'; //佣金

    const SCORE = '2'; //积分
    
    public static function getTakeType($type = ''){
        $list = [
            self::BALANCE => get_lang('dict_ly_shareholder_take_type.balance'),
            self::COMMISSION => get_lang('dict_ly_shareholder_take_type.commission'),
            self::SCORE => get_lang('dict_ly_shareholder_take_type.score'),
        ];
        if(!$type) return $list;
        return $list[$type] ?? '';
        
    }

    const ORDERPAY = '0'; //订单支付后

    const ORDERFINISH = '1'; //订单完成

    const ORDERREFUND = '2'; //订单退款

    public static function getSettleCondision($condision = ''){
        $list = [
            self::ORDERPAY => get_lang('dict_ly_shareholder_settle_condision.order_pay'),
            self::ORDERFINISH => get_lang('dict_ly_shareholder_settle_condision.order_finish'),
            self::ORDERREFUND => get_lang('dict_ly_shareholder_settle_condision.order_refund'),
        ];
        if(!$condision) return $list;
        return $list[$condision] ?? '';
    }
}

<?php

namespace addon\ly_area\app\dict\area;

class AreaDict
{


    //状态（正常）
    const NORMAL = 1;
    //状态（冻结）
    const FREEZE = 0;



    /**
     * 状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::NORMAL => get_lang('dict_ly_area_is_open.normal'),
            self::FREEZE => get_lang('dict_ly_area_is_open.freeze'),
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
            self::DAY => get_lang('dict_ly_area_settle_time.day'),
            self::WEEK => get_lang('dict_ly_area_settle_time.week'),
            self::MONTH => get_lang('dict_ly_area_settle_time.month'),
        ];
        if(!$time) return $list;
        return $list[$time] ?? '';
    }


    //计算方式：支付金额，商品现价，商品原价
    const ORDERMONEY = '0'; //支付金额

    const PROFIT = '1'; //利润

    const GOODSPRICE = '2'; //商品现价
    const GOODSORIGINALPRICE = '3'; //商品原价

    public static function getCountType($type = ''){
        $list = [
            self::ORDERMONEY => get_lang('dict_ly_area_count_type.order_money'),
            self::PROFIT => get_lang('dict_ly_area_count_type.profit'),
            self::GOODSPRICE => get_lang('dict_ly_area_count_type.goods_price'),
            self::GOODSORIGINALPRICE => get_lang('dict_ly_area_count_type.goods_original_price'),
        ];
        if(!$type) return $list;
        return $list[$type] ?? '';
    }




    //提成类型 余额/佣金/积分
    const BALANCE = '0'; //余额

    const COMMISSION = '1'; //佣金

    const SCORE = '2'; //积分

    const integral = '3'; //数字积分
    
    public static function getTakeType($type = ''){
        $list = [
            self::BALANCE => get_lang('dict_ly_area_take_type.balance'),
            self::COMMISSION => get_lang('dict_ly_area_take_type.commission'),
            self::SCORE => get_lang('dict_ly_area_take_type.score'),
            self::INTEGRAL => get_lang('dict_ly_area_take_type.integral'),
        ];
        if(!$type) return $list;
        return $list[$type] ?? '';
        
    }

    const ORDERPAY = '0'; //订单支付后

    const ORDERFINISH = '1'; //订单完成

    const ORDERREFUND = '2'; //订单退款

    public static function getCountWay($type = ''){
        $list = [
            self::ORDERPAY => get_lang('dict_ly_area_count_way.order_pay'),
            self::ORDERFINISH => get_lang('dict_ly_area_count_way.order_finish'),
            self::ORDERREFUND => get_lang('dict_ly_area_count_way.order_refund'),
        ];
        if(!$type) return $list;
        return $list[$type] ?? '';
    }


    const PROVINCE = '1'; //省

    const CITY = '2'; //市

    const DISTRICT = '3'; //区

    const STREET = '4'; //街道

    public static function getLevelArea($type = ''){
        $list = [
            self::PROVINCE => get_lang('dict_ly_area_Level_area.province'),
            self::CITY => get_lang('dict_ly_area_Level_area.city'),
            self::DISTRICT => get_lang('dict_ly_area_Level_area.district'),
            self::STREET => get_lang('dict_ly_area_Level_area.street'),
        ];

        if(!$type) return $list;
        return $list[$type] ?? '';
    }
}

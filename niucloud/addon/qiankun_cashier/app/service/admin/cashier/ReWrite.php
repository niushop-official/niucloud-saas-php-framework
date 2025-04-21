<?php

namespace addon\qiankun_cashier\app\service\admin\cashier;

class ReWrite
{
    public function __construct()
    {

        if (!method_exists(\addon\shop\app\model\order\Order::class, 'getMemberAttr') && function_exists('runkit7_method_add')) {
            // 重定义方法
            runkit7_method_add(
                '\addon\shop\app\model\order\Order',
                'getMemberAttr',
                function ($value) {
                    return $value ?: [
                        'nickname' => '匿名用户',
                    ];
                },
            );
        }
        // 重定义方法
        if(function_exists('runkit7_method_redefine')){
            runkit7_method_redefine(
                '\addon\shop\app\dict\delivery\DeliveryDict',
                'getType',
                '$type = ""',
                '
                    $data = [
                        \addon\shop\app\dict\delivery\DeliveryDict::EXPRESS => get_lang("dict_shop_delivery_type.express"),
                        \addon\shop\app\dict\delivery\DeliveryDict::LOCAL_DELIVERY => get_lang("dict_shop_delivery_type.local_delivery"),
                        \addon\shop\app\dict\delivery\DeliveryDict::STORE => get_lang("dict_shop_delivery_type.store"),
                        "cashier" => "收银台",
                    ];
            
                    if ($type == "") {
                        return $data;
                    }
                    return $data[$type] ?? "";
                ',
                RUNKIT7_ACC_STATIC,
            );
        }
    }
}
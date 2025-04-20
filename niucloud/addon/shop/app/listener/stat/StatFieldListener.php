<?php
declare (strict_types = 1);

namespace addon\shop\app\listener\stat;

/**
 * 统计字段定义
 */
class StatFieldListener
{
    /**
     * 统计字段
     * @param $data
     * @return array
     */
    public function handle($data)
    {
         return [
             'shopOrder' => [
                 'name' => '商城订单',
             ],
             'shopRechargeOrder' => [
                 'name' => '商城会员充值',
             ],
         ];
    }
}

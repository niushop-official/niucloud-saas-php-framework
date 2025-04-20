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

namespace addon\huodong\app\listener\verify;

use addon\huodong\app\dict\order\OrderDict;
use addon\huodong\app\model\act\Act;
use addon\huodong\app\model\order\Order;
use core\exception\CommonException;

/**
 * 核销类型注册
 */
class VerifyCreateListener
{
    /**
     * @param array $params
     * @return array|void
     */
    public function handle($params = [])
    {
        //虚拟商品
        if($params['type'] == 'huodongVerify'){
            $data = $params['data'] ?? [];
            $member_id = $params['member_id'];
            $order_no = $data['order_no'] ?? 0;

            //todo  判断订单项状态(已收货 已核销  核销已过期)
            $order_info = (new Order())->where([['order_no', '=',$order_no], ['member_id', '=', $member_id]])->findOrEmpty();

            if($order_info->isEmpty()) throw new CommonException('报名记录不存在');
            if(in_array($order_info['status'], [OrderDict::FINISH, OrderDict::CLOSE])) throw new CommonException('订单已经完成或关闭,无法核销');


            $act = (new Act())->where([['id', '=',$order_info['act_id']]])->findOrEmpty();

            $verify_count = $order_info['order_status']==3?1:01;
//            $count = 1 - $verify_count;
            $count = 1;

            return [
                'count' => $count,
                'relate_tag' => $order_no,
                'body' => $act['name'],
                'expire_time' => empty($act['endtime']) ? 0 : strtotime($act['endtime']),
                'data' => [
                    'list' => [
                        [
                            'name' => $act['name'],
                            'cover' => $act['image'],
                            'num' => 1,
                        ]
                    ],
                    'content' => [
                        'fixed' => [

                        ],
                        'diy' => [
                            [
                                'title' => '订单信息',
                                'list' => [
                                    [
                                        'title' => '订单编号',
                                        'value' => $order_info['order_no'],
                                    ],
                                    [
                                        'title' => '支付时间',
                                        'value' => date('Y-m-d H:i:s',$order_info['pay_time']),
                                    ],
                                ]
                            ],
                        ]
                    ]
                ]
            ];

        }

    }
}

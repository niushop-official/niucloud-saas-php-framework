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


use addon\huodong\app\model\order\Order;
use core\exception\CommonException;

/**
 * 核销详情
 */
class VerifyInfoListener
{
    /**
     * @param array $params
     * @return array|void
     */
    public function handle($params = [])
    {
        $info = [];
        if($params['type'] == 'huodongVerify')
        {
            $site_id = $params['site_id'];
            $order_no = $params['relate_tag'];
            $order = (new Order())->where([['order_no', '=', $order_no], ['site_id','=', $site_id], ['order_status', '=', 3]])->findOrEmpty()->toArray();

            $verify_count = !empty($order)?'1':'0';
            $info = [
                [
                    'name' => '核销次数/总次数',
                    'value' => $verify_count.'/1'
                ]
            ];
        }
        return $info;
    }
}

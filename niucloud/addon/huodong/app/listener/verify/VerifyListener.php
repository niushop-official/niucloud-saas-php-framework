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


use addon\huodong\app\service\core\CoreOrderService;
use core\exception\CommonException;

/**
 * 核销功能实现
 */
class VerifyListener
{
    /**
     * @param array $params
     * @return array|void
     */
    public function handle($params = [])
    {
        if($params['type'] == 'huodongVerify')
        {
            //执行
            $site_id = $params['site_id'];
            $param = $params['data'];//订单信息
            $order_no = $param['order_no'];
            (new CoreOrderService())->hexiao($order_no);

        }

        return ;
    }
}

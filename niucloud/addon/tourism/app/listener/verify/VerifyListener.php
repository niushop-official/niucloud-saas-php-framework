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

namespace addon\tourism\app\listener\verify;


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
        if($params['type'] == 'tourOrder')
        {
            //执行
            $site_id = $params['site_id'];
            $data = $params['data'];//订单信息
            return success();
        }

    }
}

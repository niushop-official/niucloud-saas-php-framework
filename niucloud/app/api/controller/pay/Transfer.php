<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\api\controller\pay;

use app\service\api\pay\PayService;
use core\base\BaseApiController;

/**
 * 微信服务端通信以及网页授权
 */
class Transfer extends BaseApiController
{


    /**
     *  确认收款
     * @return void
     */
    public function confirm($transfer_no)
    {

//        $data = $this->request->params([
//            ['openid', '']
//        ]);
//
//        return success('SUCCESS',(new PayService())->pay($data['type'], $data['trade_type'], $data['trade_id'], $data['return_url'], $data['quit_url'], $data['buyer_id'], $data['voucher'], $data['openid']));
    }


}

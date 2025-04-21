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

namespace addon\shop_giftcard\app\api\controller\order;

use addon\shop_giftcard\app\service\api\order\OrderCreateService;
use core\base\BaseApiController;
use think\Response;

class OrderCreate extends BaseApiController
{

    /**
     * 计算
     * @return Response
     */
    public function calculate()
    {
        $data = $this->request->params([
            [ 'order_key', [] ],
            [ 'giftcard_data', [] ], // ['giftcard_id' => '', 'num' => 1, 'material_id' => '']
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->calculate($data));
    }

    /**
     * 订单创建
     * @return Response
     */
    public function create()
    {
        $data = $this->request->params([
            [ 'order_key', [] ],
            [ 'member_remark', '' ],
        ]);
        return success('SUCCESS', ( new OrderCreateService() )->create($data));
    }

}

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

namespace addon\shop\app\service\admin\order;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\service\core\order\CoreOrderCloseService;
use core\base\BaseAdminService;

/**
 * 订单关闭服务层
 */
class OrderCloseService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 订单关闭
     * @param int $order_id
     * @return bool
     */
    public function close(int $order_id)
    {
        $data[ 'main_type' ] = OrderLogDict::STORE;
        $data[ 'main_id' ] = $this->uid;
        $data[ 'close_type' ] = OrderDict::SHOP_CLOSE;
        $data[ 'order_id' ] = $order_id;
        $data[ 'site_id' ] = $this->site_id;
        ( new CoreOrderCloseService() )->close($data);
        return true;
    }

}

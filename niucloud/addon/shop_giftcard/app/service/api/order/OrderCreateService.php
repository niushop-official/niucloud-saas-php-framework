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

namespace addon\shop_giftcard\app\service\api\order;

use addon\shop_giftcard\app\service\core\order\CoreOrderCreateService;
use addon\shop_giftcard\app\dict\order\OrderLogDict;
use addon\shop_giftcard\app\model\order\Order;
use core\base\BaseApiService;

/**
 * 订单服务层
 * Class OrderCreateService
 * @package addon\shop_giftcard\app\service\api\order
 */
class OrderCreateService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 计算
     * @param array $data
     * @return array
     */
    public function calculate(array $data)
    {
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreOrderCreateService() )->calculate($data);
    }

    /**
     * 订单创建
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        $data[ 'member_id' ] = $this->member_id;
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'order_from' ] = $this->channel;
        $data[ 'main_type' ] = OrderLogDict::MEMBER;
        $data[ 'main_id' ] = $this->member_id;
        return ( new CoreOrderCreateService() )->create($data);
    }

}

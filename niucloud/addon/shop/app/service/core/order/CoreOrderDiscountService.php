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

namespace addon\shop\app\service\core\order;

use addon\shop\app\model\order\OrderDiscounts;
use core\base\BaseCoreService;

/**
 *  订单完成服务层
 */
class CoreOrderDiscountService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderDiscounts();
    }


    /**
     * 订单优惠
     * @param array $data
     * @return true
     */
    public function addAll(array $data)
    {
        $this->model->insertAll($data);
        return true;
    }


}

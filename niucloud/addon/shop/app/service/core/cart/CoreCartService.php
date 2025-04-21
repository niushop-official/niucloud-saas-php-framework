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

namespace addon\shop\app\service\core\cart;

use addon\shop\app\model\cart\Cart;
use core\base\BaseCoreService;

/**
 * 购物车服务层
 */
class CoreCartService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Cart();
    }

    /**
     * 删除购物车(专用于订单)
     * @param $cart_ids
     * @return bool
     */
    public function deleteByCartIds($cart_ids)
    {
        $this->model->where([ [ 'id', 'in', $cart_ids ] ])->delete();
        return true;
    }

}

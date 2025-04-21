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

namespace addon\tourism\app\adminapi\controller;

use addon\tourism\app\service\admin\goods\GoodsService;
use core\base\BaseAdminController;

/**
 * 商品表控制器
 * Class TourismGoodsController
 * @package app\adminapi\controller\tourism_goods
 */
class Goods extends BaseAdminController
{

    /**
     * 设置会员价
     * @return void
     */
    public function editGoodsMemberPrice()
    {
        $data = $this->request->params([
            ["goods_ids",""],
            ["member_discount", ''],
            ["goods_type", ''],
            ["fixed_discount", ''],
        ]);
        return success('SUCCESS',(new GoodsService())->editGoodsMemberPrice($data));
    }

    /**
     * 设置会员价是否参与
     * @return void
     */
    public function editGoodsDayMemberPrice()
    {
        $data = $this->request->params([
            ["goods_ids",""],
            ["start_date", ''],
            ["end_date", ''],
            ["is_set", ''],
            ["member_price", ''],
        ]);
        return success('SUCCESS',(new GoodsService())->editGoodsDayMemberPrice($data));
    }
}

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

namespace addon\shop_fenxiao\app\adminapi\controller\fenxiao;

use addon\shop_fenxiao\app\service\admin\fenxiao\FenxiaoGoodsService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销商品
 * Class Goods
 * @package addon\shop_fenxiao\app\adminapi\controller
 */
class FenxiaoGoods extends BaseAdminController
{

    /**
     * 获取商品列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ["goods_name", ""],
            ["goods_category", ''],
            ["goods_type", ""],

        ]);
        return success((new FenxiaoGoodsService())->getPage($data));
    }

    /**
     * 分销商品详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new FenxiaoGoodsService())->getInfo($id));
    }

    /**
     * 修改商品是否分销
     * @return Response
     */
    public function modifyIsFenxiao()
    {
        $data = $this->request->params([
            ["goods_ids", ""],
            ["is_fenxiao", 0]
        ]);
        (new FenxiaoGoodsService())->modifyGoodsIsFenxiao($data['goods_ids'], $data['is_fenxiao']);
        return success('SUCCESS');
    }

    /**
     * 分销商品佣金详情
     */
    public function goodsCommission(int $id)
    {
        return success((new FenxiaoGoodsService())->getGoodsCommission($id));
    }

    /**
     * 商品分销配置
     * @param int $id
     * @return Response
     */
    public function setGoodsConfig(int $id)
    {
        $data = $this->request->params([
            ["is_fenxiao", ""],
            ["fenxiao_type", ''],
            ["fenxiao_price", ""],
            ["fenxiao_rule", ""],
            ["skuList", ""]
        ]);
        (new FenxiaoGoodsService())->editFenxiaoGoods($id, $data);
        return success('SUCCESS');
    }

}

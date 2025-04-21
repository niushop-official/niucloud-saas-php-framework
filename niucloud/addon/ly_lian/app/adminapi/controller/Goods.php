<?php

namespace addon\ly_lian\app\adminapi\controller;

use addon\ly_lian\app\model\LianGoods;
use addon\ly_lian\app\service\admin\GoodsService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 链动商品
 * Class Goods
 * @package addon\ly_lian\app\adminapi\controller
 */
class Goods extends BaseAdminController
{

    /**
     * 获取商品列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["goods_name", ""],
            ["goods_category", ''],
            ["goods_type", ""],
            ["is_lian", ""],

        ]);
        // $list = (new ShareholderGoodsService())->getShareholderGoodsIds();
        // var_dump($list);
        return success((new GoodsService())->getPage($data));
    }

    /**
     * 股东商品详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new GoodsService())->getInfo($id));
    }


    /**
     * 修改商品是否参与链动
     * @return Response
     */
    public function modifyIsLian()
    {
        $data = $this->request->params([
            ["goods_ids", ""],
            ["is_lian", 0]
        ]);
        (new GoodsService())->modifyGoodsIsLian($data['goods_ids'], $data['is_lian']);
        return success('SUCCESS');
    }


    /**
     * 链动商品奖励详情
     */
    public function goodsCommission(int $id)
    {
        return success((new GoodsService())->getGoodsCommission($id));
    }

    /**
     * 商品链动配置
     * @param int $id
     * @return Response
     */
    public function setGoodsConfig(int $id)
    {
        $data = $this->request->params([
            ["is_lian", ""],
            ["is_rule", ''],
            ["lian_price", ""],
            ["reward_set", ""],
            ["skuList", ""]
        ]);
        (new GoodsService())->editLianGoods($id, $data);
        return success('SUCCESS');
    }


}

<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\model\AreaGoods as AreaGoodsModel;
use addon\ly_area\app\service\admin\AreaGoodsService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 区域分红商品
 * Class Goods
 * @package addon\ly_area\app\adminapi\controller
 */
class AreaGoods extends BaseAdminController
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
            ["is_area", ""],

        ]);
        // $list = (new ShareholderGoodsService())->getShareholderGoodsIds();
        // var_dump($list);
        return success((new AreaGoodsService())->getPage($data));
    }

    /**
     * 区域分红商品详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new AreaGoodsService())->getInfo($id));
    }


    /**
     * 修改商品是否参与区域分红
     * @return Response
     */
    public function modifyIsArea()
    {
        $data = $this->request->params([
            ["goods_ids", ""],
            ["is_area", 0]
        ]);
        (new AreaGoodsService())->modifyGoodsIsArea($data['goods_ids'], $data['is_area']);
        return success('SUCCESS');
    }


    /**
     * 区域分红商品奖励详情
     */
    public function goodsCommission(int $id)
    {
        return success((new AreaGoodsService())->getGoodsCommission($id));
    }

    /**
     * 商品区域分红配置
     * @param int $id
     * @return Response
     */
    public function setGoodsConfig(int $id)
    {  
        $data = $this->request->params([
            ["is_area", ""],
            ["is_rule", ""],
            ["calculate_price", ""],
            ["area_rule", ""],
            ["skuList", ""]
        ]);
        (new AreaGoodsService())->editAreaGoods($id, $data);
        return success('SUCCESS');
    }


}

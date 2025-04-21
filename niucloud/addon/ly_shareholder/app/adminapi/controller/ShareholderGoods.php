<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use addon\ly_shareholder\app\service\admin\ShareholderGoodsService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 股东商品
 * Class Goods
 * @package addon\ly_shareholder\app\adminapi\controller
 */
class ShareholderGoods extends BaseAdminController
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
            ["is_shareholder", ""],

        ]);
        // $list = (new ShareholderGoodsService())->getShareholderGoodsIds();
        // var_dump($list);
        return success((new ShareholderGoodsService())->getPage($data));
    }

    /**
     * 股东商品详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new ShareholderGoodsService())->getInfo($id));
    }


    /**
     * 修改商品是否参与股东分红
     * @return Response
     */
    public function modifyIsShareholder()
    {
        $data = $this->request->params([
            ["goods_ids", ""],
            ["is_shareholder", 0]
        ]);
        (new ShareholderGoodsService())->modifyGoodsIsShareholder($data['goods_ids'], $data['is_shareholder']);
        return success('SUCCESS');
    }


    /**
     * 股东商品佣金详情
     */
    public function goodsCommission(int $id)
    {
        return success((new ShareholderGoodsService())->getGoodsCommission($id));
    }

    /**
     * 商品股东配置
     * @param int $id
     * @return Response
     */
    public function setGoodsConfig(int $id)
    {
        $data = $this->request->params([
            ["is_shareholder", ""],
        ]);
        (new ShareholderGoodsService())->editShareholderGoods($id, $data);
        return success('SUCCESS');
    }


}

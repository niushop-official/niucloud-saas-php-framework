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

namespace addon\o2o\app\service\core;

use addon\o2o\app\model\Goods;
use addon\o2o\app\model\GoodsSku;
use core\base\BaseCoreService;

/**
 * 商品销量服务层
 */
class CoreGoodsSaleNumService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 增加
     * @param $data
     * @return void
     */
    public function inc($data)
    {
        $this->model->where([['goods_id', '=', $data['goods_id']]])->inc('sale_num', $data['num'])->update();
        (new GoodsSku())->where([['sku_id', '=', $data['sku_id']]])->inc('sale_num', $data['num'])->update();
        return true;
    }

    /**
     * 减少
     * @param $data
     * @return void
     */
    public function dec($data)
    {
        $this->model->where([['goods_id', '=', $data['goods_id']]])->dec('sale_num', $data['num'])->update();
        (new GoodsSku())->where([['sku_id', '=', $data['sku_id']]])->dec('sale_num', $data['num'])->update();
        return true;
    }

}

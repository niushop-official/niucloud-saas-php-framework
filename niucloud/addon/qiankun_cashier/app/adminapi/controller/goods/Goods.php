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

namespace addon\qiankun_cashier\app\adminapi\controller\goods;

use addon\shop\app\model\goods\Category;
use addon\shop\app\service\admin\goods\GoodsService;
use addon\shop\app\service\admin\goods\VirtualGoodsService;
use core\base\BaseAdminController;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

class Goods extends BaseAdminController
{
    /**
     * @return Response
     */
    public function index()
    {
        $data = $this->request->params([
            ["goods_name", ""],
            ["goods_category", ''],
            ["status", ''],
            ["goods_category", ''],
        ]);

        // 疑似条码
        if (is_numeric($data['goods_name'])) {
            $goods = app()->make(\addon\shop\app\model\goods\Goods::class)->alias('g')
                ->join('shop_goods_sku s', 's.goods_id=g.goods_id')
                ->where('s.sku_no', $data['goods_name'])
                ->field('g.*')
                ->findOrEmpty();
            if (!$goods->isEmpty()) {
                $goods = $goods->toArray();
                if ($goods['goods_type'] == 'real') {
                    $goods['goods_detail'] = (new GoodsService())->getInit(['goods_id' => $goods['goods_id']]);
                } else {
                    $goods['goods_detail'] = (new VirtualGoodsService())->getInit(['goods_id' => $goods['goods_id']]);
                }
                if ($goods['goods_detail']['goods_info']['spec_type'] == 'multi') {
                    $selectAttr = [];
                    foreach ($goods['goods_detail']['goods_info']['sku_list'] as $sku) {
                        if ($sku['sku_no'] == $data['goods_name']) {
                            $selectAttr = $sku;
                        }
                    }
                    $goods['goodsSku'] = $selectAttr;
                    $goods['goods_cover'] = $selectAttr['sku_image'] ?? '';
                    $goods['selected_sku'] = $selectAttr['sku_spec_format'] ?? '';
                }
                $goodsList = [$goods];
            } else {
                $goodsList = [];
            }
            return success('', [
                'total' => 1,
                'clear' => 1,
                'data'  => $goodsList,
            ]);
        }
        $goodsList = app()->make(GoodsService::class)->getPage($data);
        foreach ($goodsList['data'] as &$item) {
            if ($item['goods_type'] == 'real') {
                $item['goods_detail'] = (new GoodsService())->getInit(['goods_id' => $item['goods_id']]);
            } else {
                $item['goods_detail'] = (new VirtualGoodsService())->getInit(['goods_id' => $item['goods_id']]);
            }
        }
        return success('', $goodsList);
    }

    /**
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function category()
    {
        $category = app()->make(Category::class)->getModel()->where('pid', 0)->order('sort desc, category_id desc')->select();
        return success('', $category);
    }
}

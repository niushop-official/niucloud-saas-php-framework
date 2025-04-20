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

namespace addon\shop\app\api\controller\goods;

use addon\shop\app\service\api\goods\GoodsService;
use core\base\BaseApiController;

/**
 * 商品
 * Class Goods
 * @package addon\shop\app\api\controller\goods
 */
class Goods extends BaseApiController
{

    /**
     * 获取商品列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ 'keyword', '' ], // 搜索关键词
            [ "goods_category", "" ], // 商品分类
            [ "brand_id", "" ], // 品牌id
            [ "label_ids", "" ], // 商品标签
            [ "start_price", "" ], // 价格开始区间
            [ "end_price", "" ], // 价格结束区间
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
            [ 'sort', 'desc' ], // 升序：asc，降序：desc
            [ 'coupon_id', '' ] // 优惠券id
        ]);

        return success(( new GoodsService() )->getPage($data));
    }

    /**
     * 获取商品详情
     * @return \think\Response
     */
    public function detail()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
            [ 'sku_id', 0 ],
            [ 'type', '' ], // 来源营销活动类型，discount：限时折扣，newcomer_discount：新人价
        ]);
        return success(( new GoodsService() )->getDetail($data));
    }

    /**
     * 获取商品规格信息，切换规格
     */
    public function sku()
    {
        $data = $this->request->params([
            [ 'sku_id', 0 ],
        ]);
        return success(( new GoodsService() )->getSku($data[ 'sku_id' ]));
    }

    /**
     * 获取商品列表供组件调用
     * @return \think\Response
     */
    public function components()
    {
        $data = $this->request->params([
            [ 'num', 0 ],
            [ 'goods_ids', '' ],
            [ 'goods_category', 0 ],
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
        ]);

        return success(( new GoodsService() )->getGoodsComponents($data));
    }

}

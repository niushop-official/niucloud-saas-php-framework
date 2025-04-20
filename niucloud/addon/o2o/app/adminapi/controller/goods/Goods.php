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

namespace addon\o2o\app\adminapi\controller\goods;

use core\base\BaseAdminController;
use addon\o2o\app\service\admin\goods\GoodsService;


/**
 * 服务项目控制器
 * Class Goods
 * @package addon\o2o\app\adminapi\controller\goods
 */
class Goods extends BaseAdminController
{
   /**
    * 获取服务项目列表
    * @return \think\Response
    */
    public function lists()
    {
        $data = $this->request->params([
            ["goods_name", "" ],
            [ "goods_category", "" ],
            [ "start_sale_num", "" ],
            [ "end_sale_num", "" ],
            [ "start_price", "" ],
            [ "end_price", "" ],
            [ "status", "" ],
            [ 'order', '' ],
            [ 'sort', '' ],
            [ 'create_time', [] ],
        ]);
        return success((new GoodsService())->getPage($data));
    }

    /**
     * 服务项目详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new GoodsService())->getInfo($id));
    }

    /**
     * 获取商品添加/编辑数据
     * @return \think\Response
     */
    public function init()
    {
        $data = $this->request->params([
            [ "goods_id", 0 ],
        ]);
        return success(( new GoodsService() )->getInit($data));
    }

    /**
     * 添加服务项目
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ "goods_name", "" ],
            [ "goods_image", "" ],
            [ "goods_cover", "" ],
            [ "goods_category", '' ],
            [ "status", 0 ],
            [ "sort", 0 ],
            [ "buy_type", '' ],
            [ "after_sales", 0 ],
            [ 'spec_type', '' ],// 规格类型，single：单规格，multi：多规格
            [ "price", 0 ],
            [ "market_price", 0 ],
            [ "sku_no", '' ],
            [ "sku_unit", "" ],
            [ "virtually_sale", 0 ],
            [ "sku_unit", '' ],
            [ "price_list", '' ],
            [ "goods_sku_data", '' ],
            [ "buy_info", '' ],
            [ "min_buy", 1 ],
            [ "goods_content", '' ],
            [ 'poster_id', 0 ],
            [ 'member_discount', '' ], // 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price

        ]);
        $this->validate($data, 'addon\o2o\app\validate\Goods.add');
        $id = (new GoodsService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 服务项目编辑
     * @param $id  服务项目id
     * @return \think\Response
     */
    public function edit($id)
    {
        $data = $this->request->params([
            [ "goods_name", "" ],
            [ "goods_image", "" ],
            [ "goods_cover", "" ],
            [ "goods_category", '' ],
            [ "status", 0 ],
            [ "sort", 0 ],
            [ "buy_type", '' ],
            [ "after_sales", 0 ],
            [ 'spec_type', '' ],// 规格类型，single：单规格，multi：多规格
            [ "price", 0 ],
            [ "market_price", 0 ],
            [ "sku_no", '' ],
            [ "virtually_sale", 0 ],
            [ "sku_unit", '' ],
            [ "price_list", '' ],
            [ "goods_sku_data", '' ],
            [ "buy_info", '' ],
            [ "min_buy", 1 ],
            [ "goods_content", '' ],
            [ 'poster_id', 0 ],
            [ 'member_discount', '' ], // 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price
        ]);

        $this->validate($data, 'addon\o2o\app\validate\Goods.edit');
        (new GoodsService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 编辑商品规格列表会员价格
     * @return \think\Response
     */
    public function editGoodsListMemberPrice()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
            [ 'member_discount', '' ], // 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price
            [ 'sku_list', '' ]
        ]);
        ( new GoodsService() )->editGoodsListMemberPrice($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 复制服务项目
     * @param int $id
     * @return \think\Response
     */
    public function copy(int $id)
    {
        ( new GoodsService() )->copy($id);
        return success('SUCCESS');
    }

    /**
     * 服务项目删除
     * @param $id  服务项目id
     * @return \think\Response
     */
    public function del(int $id)
    {
        (new GoodsService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取列表不分页
     */
    public function getLists()
    {
        $data = $this->request->params([
            ["goods_name",""],
            ["create_time",""],
            ["category_id", ""]
        ]);
        return success((new GoodsService())->getLists($data));
    }

    /**
     * 查询商品SKU规格列表
     * @return \think\Response
     */
    public function sku()
    {
        $data = $this->request->params([
            [ 'goods_id', '' ]
        ]);

        return success(( new GoodsService() )->getSkuList($data));
    }

    /**
     * 服务上下架
     */
    public function editStatus($id)
    {
        $data = $this->request->params([
            ["status", 0],
        ]);
        (new GoodsService())->editStatus($id, $data);
        return success('SUCCESS');
    }

    /**
     * 更新排序
     * @param int $id
     * @return \think\Response
     */
    public function editSort(int $id)
    {
        $data = $this->request->params([
            ["sort",0],
        ]);
        (new GoodsService())->editSort($id, $data);
        return success('SUCCESS');
    }

    /**
     * 商品选择分页列表
     * @return \think\Response
     */
    public function select()
    {
        $data = $this->request->params([
            [ 'goods_name', '' ], // 搜索关键词
            [ "goods_category", "" ], // 商品分类
            [ 'goods_ids', '' ], // 已选商品id集合
            [ 'verify_goods_ids', '' ], // 检测商品id集合是否存在，移除不存在的商品id，纠正数据准确性
            [ 'create_time', [] ],
        ]);

        return success(( new GoodsService() )->getSelectPage($data));
    }
}

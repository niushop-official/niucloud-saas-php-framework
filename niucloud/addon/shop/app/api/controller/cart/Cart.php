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

namespace addon\shop\app\api\controller\cart;

use addon\shop\app\service\api\cart\CartService;
use core\base\BaseApiController;

/**
 * 购物车
 * Class Cart
 * @package addon\shop\app\api\controller\cart
 */
class Cart extends BaseApiController
{

    /**
     * 添加购物车
     * @return \think\Response
     */
    public function add()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
            [ 'sku_id', 0 ],
            [ 'num', 0 ],
            [ 'market_type', 0 ],
            [ 'market_type_id', 0 ],
            [ 'status', 1 ],
            [ 'invalid_remark', '' ],
        ]);
        $this->validate($data, 'addon\shop\app\validate\cart\Cart.add');
        $id = ( ( new CartService() )->add($data) );
        return success('ADD_SUCCESS', [ 'id' => $id ]);
    }

    /**
     * 编辑购物车
     * @return \think\Response
     */
    public function edit()
    {
        $data = $this->request->params([
            [ 'id', 0 ],
            [ 'sku_id', 0 ],
            [ 'num', 0 ],
        ]);
        $this->validate($data, 'addon\shop\app\validate\cart\Cart.edit');
        ( new CartService() )->edit($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 购物车删除，支持批量
     * @return \think\Response
     */
    public function del()
    {
        $data = $this->request->params([
            [ 'ids', '' ],
        ]);
        ( new CartService() )->del($data);
        return success('DELETE_SUCCESS');
    }

    /**
     * 清空购物车
     * @return \think\Response
     */
    public function clear()
    {
        ( new CartService() )->clear();
        return success('DELETE_SUCCESS');
    }

    /**
     * 获取购物车列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([]);
        return success(( new CartService() )->getList($data));
    }

    /**
     * 获取购物车商品列表
     * @return \think\Response
     */
    public function goodsLists()
    {
        $data = $this->request->params([]);
        return success(( new CartService() )->getGoodsList($data));
    }

    /**
     * 获取购物车数量
     * @return \think\Response
     */
    public function sum()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
        ]);
        return success('SUCCESS', ( new CartService() )->getSum($data));
    }

    /**
     * 购物车计算
     */
    public function calculate()
    {
        $data = $this->request->params([
            [ 'sku_ids', [] ],
        ]);

        return success(( new CartService() )->calculate($data));
    }

}

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

namespace addon\shop_fenxiao\app\api\controller\fenxiao;

use addon\shop_fenxiao\app\service\api\fenxiao\FenxiaoGoodsService;
use core\base\BaseApiController;
use think\Response;

class Goods extends BaseApiController
{

    /**
     * 分销商商品分页列表
     * @return Response
     */
    public function getPageOfShare()
    {
        $data = $this->request->params([
            [ 'num', 0 ],
            [ 'goods_category', 0 ],
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
        ]);
        return success((new FenxiaoGoodsService())->getPageOfShare($data));
    }

    /**
     * 分销商商品分页列表
     * @return Response
     */
    public function components()
    {
        $data = $this->request->params([
            [ 'num', 0 ],
            [ 'goods_category', 0 ],
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
        ]);
        return success((new FenxiaoGoodsService())->getComponents($data));
    }
}

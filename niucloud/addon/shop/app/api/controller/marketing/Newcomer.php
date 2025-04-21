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

namespace addon\shop\app\api\controller\marketing;

use addon\shop\app\service\api\marketing\NewcomerService;
use core\base\BaseApiController;
use think\Response;

class Newcomer extends BaseApiController
{

    /**
     * 新人专享商品列表
     * @return \think\Response
     */
    public function pages()
    {
        $data = $this->request->params([
            [ 'keyword', '' ], // 搜索关键词
            [ "goods_category", "" ], // 商品分类
            [ "brand_id", "" ], // 品牌id
            [ "start_price", "" ], // 价格开始区间
            [ "end_price", "" ], // 价格结束区间
            [ 'order', '' ], // 排序方式（综合：空，销量：sale_num，价格：price）
            [ 'sort', 'desc' ], // 升序：asc，降序：desc
        ]);

        return success(( new NewcomerService() )->getGoodsPage($data));
    }

    /**
     * 新人专享组件商品列表
     * @return Response
     */
    public function componentsList()
    {
        $data = $this->request->params([
            [ 'limit', 0 ],
            [ 'sku_ids', [] ]
        ]);
        return success(( new NewcomerService() )->getComponentsList($data));
    }

    /**
     * 获取新人专享活动规则
     * @return Response
     */
    public function config()
    {
        return success(data:( new NewcomerService() )->getConfig());
    }

}

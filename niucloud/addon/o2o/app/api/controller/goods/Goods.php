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

namespace addon\o2o\app\api\controller\goods;

use addon\o2o\app\service\api\goods\GoodsService;
use core\base\BaseApiController;


/**
 * 项目控制器
 * Class Goods
 * @package addon\o2o\app\api\controller\goods
 */
class Goods extends BaseApiController
{
   /**
    * 服务项目列表
    * @return \think\Response
    */
    public function pages()
    {
        $data = $this->request->params([
             ["goods_name",""],
             ["create_time",[]],
             ["goods_category", ""],
             ["goods_ids", ""],
             ["order", ""],
             ["sort", "desc"],
        ]);
        return success((new GoodsService())->getPage($data));
    }

    /**
     * 项目详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new GoodsService())->getInfo($id));
    }

    /**
     * 项目详情
     * @param int $id
     * @return \think\Response
     */
    public function detail()
    {
        $data = $this->request->params([
            ["goods_id",""],
            ["sku_id",''],
        ]);
        return success((new GoodsService())->getDetail($data));
    }

    /**
     * 获取项目列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ["limit",""],
        ]);
        return success((new GoodsService())->getList($data));
    }

    /**
     * 获取项目列表供组件调用
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

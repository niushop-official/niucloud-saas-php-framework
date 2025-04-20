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

use addon\shop\app\service\api\goods\GoodsCategoryService;
use core\base\BaseApiController;

/**
 * 商品分类
 * Class GoodsCategory
 * @package addon\shop\app\api\controller\goods
 */
class GoodsCategory extends BaseApiController
{
    /**
     * 获取商品分类配置
     * @return \think\Response
     */
    public function getGoodsCategoryConfig()
    {
        return success(( new GoodsCategoryService() )->getGoodsCategoryConfig());
    }

    /**
     * 获取商品分类树结构
     * @return \think\Response
     */
    public function tree()
    {
        return success(( new GoodsCategoryService() )->getTree());
    }

    /**
     * 获取商品分类列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ "pid", "" ],
        ]);
        return success(( new GoodsCategoryService() )->getList($data));
    }

}

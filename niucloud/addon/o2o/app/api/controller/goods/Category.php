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

use addon\o2o\app\service\api\goods\GoodsCategoryService;
use core\base\BaseApiController;


/**
 *  商品分类控制器
 * Class Category
 * @package app\adminapi\controller\goods
 */
class Category extends BaseApiController
{
    /**
     *  商品分类详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id)
    {
        return success((new GoodsCategoryService())->getInfo($id));
    }

    /**
     * 获取分级分类
     */
    public function tree()
    {
        return success((new GoodsCategoryService())->getTree());
    }

}

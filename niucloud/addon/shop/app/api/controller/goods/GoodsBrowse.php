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

use addon\shop\app\service\api\goods\GoodsBrowseService;
use core\base\BaseApiController;
use think\Response;

/**
 * 商品足迹
 * Class GoodsCollect
 * @package addon\shop\app\api\controller\GoodsBrowse
 */
class GoodsBrowse extends BaseApiController
{
    /**
     * 获取足迹列表
     * @return Response
     */
    public function getMemberGoodsBrowseList()
    {
        $data = $this->request->params([
            [ 'date', [] ],
        ]);
        return success(( new GoodsBrowseService() )->getMemberGoodsBrowse($data));
    }

    /**
     * 增加足迹
     */
    public function addGoodsBrowse()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
        ]);
        return success(( new GoodsBrowseService() )->addGoodsBrowse($data));
    }

    /**
     * 删除足迹
     */
    public function deleteGoodsBrowse()
    {
        $data = $this->request->params([
            [ 'goods_ids', [] ],
        ]);
        return success(( new GoodsBrowseService() )->deleteGoodsBrowse($data));
    }

}

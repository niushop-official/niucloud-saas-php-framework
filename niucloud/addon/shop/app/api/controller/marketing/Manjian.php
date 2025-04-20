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

use addon\shop\app\service\api\marketing\ManjianService;
use core\base\BaseApiController;
use think\Response;

class Manjian extends BaseApiController
{

    /**
     * 获取商品满减优惠信息
     * @return Response
     */
    public function info()
    {
        $data = $this->request->params([
            [ 'goods_id', 0 ],
            [ 'sku_id', 0 ]
        ]);
        return success(( new ManjianService() )->getManjianInfo($data));
    }

}

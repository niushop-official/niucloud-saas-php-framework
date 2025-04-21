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

namespace addon\shop_fenxiao\app\api\controller\sale;

use addon\shop_fenxiao\app\service\api\sale\SaleService;
use core\base\BaseApiController;
use think\Response;


/**
 * 销售周期
 */
class Sale extends BaseApiController
{

    /**
     * 获取销售周期列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['is_settlement', '']
        ]);
        return success((new SaleService())->getPage($data));
    }

    /**
     * 最新的销售周期
     * @return Response
     */
    public function getNowSalePeriod(){
        return success((new SaleService())->getNowSalePeriod());
    }
}

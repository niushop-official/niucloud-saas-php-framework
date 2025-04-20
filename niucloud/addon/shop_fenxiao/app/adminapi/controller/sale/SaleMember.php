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

namespace addon\shop_fenxiao\app\adminapi\controller\sale;

use addon\shop_fenxiao\app\service\admin\sale\SaleMemberService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 销售周期
 */
class SaleMember extends BaseAdminController
{

    /**
     * 获取销售周期列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['is_settlement', 'all'],
            ['period_id', 0]
        ]);
        return success((new SaleMemberService())->getPage($data));
    }
}

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

use addon\shop_fenxiao\app\service\api\sale\SaleMemberService;
use core\base\BaseApiController;
use think\Response;


/**
 * 销售周期
 */
class SaleMember extends BaseApiController
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
            ['is_send', 'all'],
            ['period_id', 0]
        ]);
        return success((new SaleMemberService())->getPage($data));
    }


    /**
     * 获取销售周期详情
     * @return Response
     */
    public function detail(int $period_id)
    {
        return success((new SaleMemberService())->getDetail($period_id));
    }

    /**
     * 排行
     * @param int $period_id
     * @return Response
     */
    public function getRanking(int $period_id)
    {
        return success((new SaleMemberService())->getRanking($period_id));
    }

    /**
     * 获取佣金记录
     * @return Response
     */
    public function getCommissionData()
    {
        return success((new SaleMemberService())->getCommissionData());
    }

}

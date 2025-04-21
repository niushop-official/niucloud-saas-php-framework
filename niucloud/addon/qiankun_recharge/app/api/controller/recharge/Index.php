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

namespace addon\qiankun_recharge\app\api\controller\recharge;

use addon\qiankun_recharge\app\service\api\ConfigService;
use addon\qiankun_recharge\app\service\api\RechargeOptionsService;
use addon\qiankun_recharge\app\service\api\RechargeOrderService;
use core\base\BaseApiController;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\Response;

class Index extends BaseApiController
{
    /**
     * 获取配置
     * @return Response
     */
    public function config(): Response
    {
        $config = (new ConfigService())->getConfig();
        return success($config);
    }

    /**
     * 获取充值项列表
     * @return Response
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function package_list(): Response
    {
        $list = (new RechargeOptionsService())->getPackageList();
        return success($list);
    }

    /**
     * @return Response
     * @throws Exception
     */
    public function recharge(): Response
    {
        $data = $this->request->params([
            ['recharge_money', 0],
            ['recharge_id', 0],
        ]);
        $res = (new RechargeOrderService())->recharge($data);
        return success($res);
    }
}

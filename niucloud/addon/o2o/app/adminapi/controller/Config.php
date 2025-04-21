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

namespace addon\o2o\app\adminapi\controller;

use addon\o2o\app\service\admin\ConfigService;
use core\base\BaseAdminController;

/**
 * 订单交易设置
 * Class Config
 * @package addon\o2o\app\adminapi\controller\config
 */
class Config extends BaseAdminController
{
    /**
     * 交易设置配置
     * @return \think\Response
     */
    public function setConfig()
    {
        $data = $this->request->params([
            ["is_close",1],
            ["close_length",""],
            ["is_finish",""],
            ["finish_length",1],
            ["no_allow_refund",""],
            ["refund_length",""],
            ["is_invoice",""],
            ["invoice_type",""],
            ["invoice_content",""],
            ["is_evaluate", 1],
            ["evaluate_is_to_examine", 1],
            ["evaluate_is_show", 1]
        ]);

        (new ConfigService())->setConfig($data);
        return success('SUCCESS');
    }

    /**
     * 获取交易配置
     * @return \think\Response
     */
    public function getConfig()
    {
        return success((new ConfigService())->getConfig());
    }

    /**
     * 获取预约配置信息
     * @return Response
     */
    public function getReserveConfig()
    {
        return success((new ConfigService())->getReserveConfig());
    }

    /**
     * 设置预约配置信息
     * @return Response
     */
    public function setReserveConfig()
    {
        $data = $this->request->params([
            ['week', '1,2,3,4,5'],
            ['start', 32400],
            ['end', 79200],
            ['interval', 30],
            ['advance', 1],
        ]);
        (new ConfigService())->setReserveConfig($data);
        return success('SET_SUCCESS');
    }

}

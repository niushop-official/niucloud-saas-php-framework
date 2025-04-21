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

use addon\shop_fenxiao\app\dict\sale\SaleDict;
use addon\shop_fenxiao\app\service\admin\sale\ConfigService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 销售奖励配置
 */
class Config extends BaseAdminController
{

    /**
     * 获取配置
     * @return Response
     */
    public function getConfig()
    {
        return success((new ConfigService())->getConfig());
    }

    /**
     * 设置配置
     * @return Response
     */
    public function setConfig()
    {
        $data = $this->request->params([
            ['is_open', 0],
            ['period_type', SaleDict::MONTH],// month 月度 quarter 季度 year 年度
            ['period', ''],
            ['send_type', SaleDict::ACTIVE],//发放方式 1 手动发放 2 自动发放
            ['rules', []],//参与条件  销售额度 ['order_money': 20, 'level']
            ['condition', []],
            ['reward', []],//奖励  (阶梯奖励)
        ]);
        return success('SET_SUCCESS', data: (new ConfigService())->setConfig($data));
    }

    /**
     * 获取结算周期类型
     * @return Response
     */
    public function getPeriodType()
    {
        return success(SaleDict::getPeriodType());
    }

    /**
     * 获取发放方式
     * @return Response
     */
    public function getSendType()
    {
        return success(SaleDict::getSendType());
    }
}

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

namespace addon\shop\app\service\core\refund;

use addon\shop\app\model\order\OrderRefundLog;
use core\base\BaseCoreService;

/**
 * 订单退款服务层
 */
class CoreRefundLogService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderRefundLog();
    }

    /**
     * 添加日志
     * @param $data
     * @return true
     */
    public function add($data)
    {
        $this->model->create($data);
        return true;
    }

}

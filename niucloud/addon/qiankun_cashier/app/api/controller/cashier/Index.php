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

namespace addon\qiankun_cashier\app\api\controller\cashier;

use addon\qiankun_cashier\app\adminapi\controller\cashier\Cashier;
use core\base\BaseApiController;
use think\facade\Log;
use Yansongda\Artful\Exception\ContainerException;
use Yansongda\Artful\Exception\InvalidParamsException;
use Yansongda\Pay\Pay;

class Index extends BaseApiController
{
    /**
     * Hello World
     * @return void
     * @throws ContainerException
     * @throws InvalidParamsException
     */
    public function notify($site_id)
    {
        Log::write('收银回调参数');
        Log::write($this->request->request());
        Pay::config(app()->make(Cashier::class)->getConfig($site_id));

        $result = Pay::wechat()->callback();
        Log::write('收银台回调');
        Log::write($result);
    }
}

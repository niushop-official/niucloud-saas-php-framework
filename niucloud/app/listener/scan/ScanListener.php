<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\listener\scan;

use app\dict\notice\BindMerchantDict;
use app\dict\scan\ScanDict;
use app\model\site\SiteMerchantBind;
use app\service\api\wechat\WechatAuthService;
use app\service\core\notice\CoreNoticeBindMerchantService;
use think\facade\Log;
use Throwable;

/**
 * 支付异步回调事件
 * Class PayNotify
 * @package app\listener\pay
 */
class ScanListener
{
    public function handle(array $data)
    {
        $action = $data['action'];
        switch ($action) {
            case ScanDict::WECHAT_LOGIN:
                try {
                    $wechat_auth_service = new WechatAuthService();
                    $data['login_data'] = $wechat_auth_service->login($data['openid']);
                    $data['status'] = ScanDict::SUCCESS;
                } catch ( Throwable $e ) {
                    $data['status'] = ScanDict::FAIL;
                    $data['fail_reason'] = get_lang($e->getMessage());
                }
                unset($data['openid']);
                break;
                case ScanDict::ADMIN_MERCHANT_BIND_WECHAT://后台绑定商家通知接收者openid
                try {
                    $data['status'] = ScanDict::SUCCESS;
                    (new CoreNoticeBindMerchantService())->bindAccount($data['site_id'],$data['openid'],BindMerchantDict::WECHAT);
                    //绑定信息
                } catch ( Throwable $e ) {
                    $data['status'] = ScanDict::FAIL;
                    $data['fail_reason'] = get_lang($e->getMessage());
                }
                unset($data['openid']);
                break;
        }

        return $data;
    }
}
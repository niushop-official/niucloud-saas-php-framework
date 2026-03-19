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

namespace app\service\admin\notice;

use app\dict\notice\BindMerchantDict;
use app\dict\scan\ScanDict;
use app\model\site\SiteMerchantBind;
use app\service\core\notice\CoreNoticeBindMerchantService;
use app\service\core\scan\CoreScanService;
use app\service\core\wechat\CoreWechatServeService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\AuthException;
use think\facade\Cache;
use think\facade\Log;

/**
 * 消息管理服务层
 */
class BindMerchantService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取小程序二维码
     * @param string $url
     * @param string $scopes
     * @return array
     */
    public function getWeappQrcode()
    {
        $dir = 'upload/' . $this->site_id . '/merchant';
        try {
            $qrcode_data = [
                [
                    'key' => 'tp',
                    'value' => 'b_m'//bind_merchant
                ],
                [
                    'key' => 's',
                    'value' => $this->site_id
                ]
            ];
            $weapp_path = qrcode('', 'app/pages/setting/authorization', $qrcode_data, $this->site_id, $dir, 'weapp');
            return [
                'url' => $weapp_path
            ];
        } catch (AdminException $e) {
            Log::write('获取推广微信小程序二维码error' . $e->getMessage() . $e->getFile() . $e->getLine() . 'params:');
            throw new AdminException($e->getMessage() . $e->getFile() . $e->getLine() . 'params:');
        }
    }

    /**
     * 网页授权
     * @param string $url
     * @param string $scopes
     * @return array
     */
    public function getWechatUrl()
    {
        $key = (new  CoreScanService())->scan($this->site_id, ScanDict::ADMIN_MERCHANT_BIND_WECHAT, [], 300);
        $url = (new CoreWechatServeService())->scan($this->site_id, $key, 300)['url'] ?? '';
        return [
            'url' => $url,
        ];
    }

    public function sendBindSms($mobile)
    {
        $type = 'bind_merchant';
        $code = str_pad(random_int(1, 9999), 4, 0, STR_PAD_LEFT);// 生成4位随机数，左侧补0
        (new \app\service\core\notice\NoticeService())->send($this->site_id, 'verify_code', ['code' => $code, 'mobile' => $mobile]);
        //将验证码存入缓存
        $key = md5(uniqid('', true));
        $cache_tag_name = "admin_mobile_key" . $mobile . $type;
        $this->clearMobileCode($mobile, $type);
        Cache::tag($cache_tag_name)->set($key, ['mobile' => $mobile, 'code' => $code, 'type' => $type], 600);
        Log::write('bind_merchant--mobile:' . $mobile . ':send_bind_sms_code:' . $code);
        return [
            'key' => $key,
            'mobile' => $mobile,
        ];

    }

    public function clearMobileCode($mobile, $type)
    {
        $cache_tag_name = "admin_mobile_key" . $mobile . $type;
        Cache::tag($cache_tag_name)->clear();
    }

    /**
     * 校验手机验证码
     * @param string $mobile
     * @return true
     */
    public function checkMobileCode($params)
    {
        $mobile = $params['mobile'] ?? '';
        if (empty($mobile)) throw new AuthException('MOBILE_NEEDED');
        $mobile_key = $params['mobile_key'];
        $mobile_code = $params['mobile_code'];
        if (empty($mobile_key) || empty($mobile_code)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $cache = Cache::get($mobile_key);
        if (empty($cache)) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        $temp_mobile = $cache['mobile'];
        $temp_code = $cache['code'];
        $temp_type = $cache['type'];
        if ($temp_mobile != $mobile || $temp_code != $mobile_code) throw new AuthException('MOBILE_CAPTCHA_ERROR');
        (new CoreNoticeBindMerchantService())->bindAccount($this->site_id, $mobile, BindMerchantDict::SMS);
        $this->clearMobileCode($temp_mobile, $temp_type);
        return true;

    }

    /**
     * 绑定商户通知账户
     * @return int[]
     */
    public function merchantBindInfo()
    {
        $return = [
            'wechat_openid' => '',
            'weapp_openid' => '',
            'mobile' => '',
        ];
        $bind_info = (new SiteMerchantBind())->where('site_id', $this->site_id)->findOrEmpty();
        $bind_info = $bind_info->toArray();
        if (!empty($bind_info['wechat_openid'])) {
            $return['wechat_openid'] = $bind_info['wechat_openid'];
        }
        if (!empty($bind_info['weapp_openid'])) {
            $return['weapp_openid'] = $bind_info['weapp_openid'];
        }
        if (!empty($bind_info['mobile'])) {
            $return['mobile'] = $bind_info['mobile'];
        }
        return $return;
    }

    /**
     * 解绑商户通知账户
     * @param $data
     * @return bool
     */
    public function unBindMerchant($data)
    {
        return (new CoreNoticeBindMerchantService())->unBindAccount($this->site_id, $data);
    }


}

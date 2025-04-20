<?php

namespace addon\tk_vip\app\service\core;

use addon\tk_vip\app\dict\config\ConfigDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use think\Exception;
use think\facade\Log;

/**
 * 会员注册后进行权益发放
 */
class RealService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * @Notes:阿里云实名验证封装
     * @Interface checkReal
     * @param $name
     * @param $card
     * @return mixed
     * @throws Exception
     * @author: TK
     * @Time: 2024/11/17   下午2:19
     */
    public function checkReal($name,$card)
    {
        $app_code =$this->getRealConfig()['app_code'];
        $host = "https://zid.market.alicloudapi.com";
        $path = "/idcheck/Post";
        $method = "POST";
        $headers = [
            "Authorization:APPCODE " . $app_code,
            "Content-Type: application/x-www-form-urlencoded; charset=UTF-8"
        ];
        $bodys = http_build_query(['cardNo' =>$card, 'realName' => $name]);
        $url =$host . $path;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST,$method);
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_HTTPHEADER,$headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS,$bodys);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
            throw new Exception($err);
        } else {
            $res = json_decode( $response, true);
             if ($res['error_code'] == 0) {
                if ($res['result']['isok'] == true) {
                    return $res['result']['IdCardInfor'];
                } else {
                    throw new Exception('实名验证失败');
                }
            } else {
                 Log::write($res, '===实名认证失败===' . date('Y-m-d H:i:s'));
                 throw new Exception($res['reason']);
            }
        }
    }

    /**
     * @Notes:获取实名配置信息
     * @Interface getRealConfig
     * @return mixed
     * @throws Exception
     * @author: TK
     * @Time: 2024/11/17   下午2:18、
     */
    public function getRealConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getRealType());
        if (empty($info)) {
            throw new Exception('实名认证配置未完成');
        }
        return $info['value'];
    }
}
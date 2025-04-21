<?php

namespace addon\shop\app\service\core\delivery\electronic_sheet\sdk;


use think\facade\Cache;
use think\facade\Log;

class Kdbird
{
    private $EBusinessID; // 授权key
    private $ApiKey; // 快递鸟分配的公司编码

    private $electronic_sheet_url = 'https://api.kdniao.com/api/Eorderservice'; //电子面单

    public function __construct($config)
    {
        $this->EBusinessID = $config[ "kdniao_id" ];
        $this->ApiKey = $config[ "kdniao_api_key" ];
    }

    /**
     * 电子面单
     * 文档：https://www.yuque.com/kdnjishuzhichi/dfcrg1/xxvu6s
     * @param $requestData
     * @return array
     */
    public function electronicSheetByJson($requestData)
    {
        $jsonParam = json_encode($requestData, JSON_UNESCAPED_UNICODE);

        $data = array(
            'EBusinessID' => $this->EBusinessID,
            'RequestType' => '1007',
            'RequestData' => urlencode($jsonParam),
            'DataType' => '2',
        );

        $data[ 'DataSign' ] = $this->encrypt($jsonParam, $this->ApiKey);

        $key = $requestData[ 'cache_key' ];
        $cache = Cache::get($key);
        if (!empty($cache)) {
            return $cache;
        }

        $result = $this->sendPost($this->electronic_sheet_url, $data);
        //根据公司业务处理返回的信息......
        Log::write('电子面单返回数据 electronicSheetByJson：', $result);
        $result = json_decode($result, true);

        $res = [
            'success' => false,
            'reason' => '接口返回为空，请稍后再试',
            'result_code' => 105,
        ];

        if (!empty($result)) {

            $res[ 'success' ] = $result[ 'Success' ];
            $res[ 'result_code' ] = $result[ 'ResultCode' ] ?? -1;
            $res[ 'reason' ] = $result[ 'Reason' ];
            if ($res[ 'success' ]) {
                $res[ 'print_template' ] = $result[ 'PrintTemplate' ];
                $res[ 'order_info' ] = $result[ 'Order' ];
                $res[ 'order_no' ] = $requestData[ 'OrderCode' ]; // 记录打印的 订单号

                // 请求成功，存缓存，防止浪费请求资源
                Cache::tag('electronic_sheet_cache_kdbird')->set($key, $res);
            }
        }

        return $res;
    }

    /**
     * 电商Sign签名生成
     * @param string $data 内容
     * @param $ApiKey
     * @return string DataSign签名
     */
    public function encrypt($data, $ApiKey)
    {
        return urlencode(base64_encode(md5($data . $ApiKey)));
    }

    /**
     * post提交数据
     * @param string $url 请求Url
     * @param array $data 提交的数据
     * @return false|string
     */
    public function sendPost($url, $data)
    {
        $postdata = http_build_query($data);
        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-type:application/x-www-form-urlencoded',
                'content' => $postdata,
                'timeout' => 15 * 60 // 超时时间（单位:s）
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        return $result;
    }
}
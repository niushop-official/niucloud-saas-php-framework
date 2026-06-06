<?php

namespace core\util\niucloud;


use app\service\core\sys\CoreConfigService;
use core\exception\CommonException;
use core\util\niucloud\http\HasHttpRequests;
use GuzzleHttp\Client;

/**
 * niucloud云服务
 */
class CloudService
{
    use HasHttpRequests;

    private $baseUri = 'http://go.site.niucloud.com/';

    public $is_connected = false;

    public function __construct($checkLocal = false, $local_cloud_compile = '') {
        if (!empty($local_cloud_compile)) $this->baseUri = $local_cloud_compile;
        if ($checkLocal) $this->is_connected = $this->checkLocal($local_cloud_compile);
    }

    public function checkLocal($local_cloud_compile = '') {
        $baseUri = $this->baseUri;

        if (!empty($local_cloud_compile)){
            $baseUri = $local_cloud_compile;
        } else {
            $local_cloud_compile_config = (new CoreConfigService())->getConfig(0, 'LOCAL_CLOUD_COMPILE_CONFIG')['value'] ?? [];
            $isOpen = $local_cloud_compile_config['isOpen'] ?? 1;

            if ($isOpen){
                $baseUri = $local_cloud_compile_config['baseUri'] ?? '';
            }
        }

        $is_connected = false;
        try {
            $res = (new Client(['base_uri' => $baseUri ]))->request("GET", '', []);
            if ($res->getStatusCode() == '200' && $res->getBody()->getContents() == '欢迎使用NiuCloud编译服务!') {
                $this->baseUri = $baseUri;
                $is_connected = true;
            }
        } catch (\Throwable $e) {
        }
        return $is_connected;
    }

    public function httpPost(string $url, array $options = []) {
        return $this->toRequest($url, 'POST', $options);
    }

    public function httpGet(string $url, array $options = []) {
        return $this->toRequest($url, 'GET', $options);
    }

    public function request(string $method, string $url, array $options = []) {
        return (new Client(['base_uri' => $this->baseUri ]))->request($method, $url, $options);
    }

    public function getUrl(string $url) {
        return $this->baseUri . $url;
    }
}

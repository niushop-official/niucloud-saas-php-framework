<?php

namespace core\util\niucloud;


use core\util\niucloud\http\HasHttpRequests;
use GuzzleHttp\Client;

/**
 * niucloud云服务
 */
class CloudService
{
    use HasHttpRequests;

    private $baseUri = 'http://oss.niucloud.com/';

    public function __construct() {
        $this->baseUri = 'http://' . gethostbyname('oss.niucloud.com') . ':8000/';
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

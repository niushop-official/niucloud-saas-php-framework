<?php

namespace core\util\http;

use core\util\http\src\HasHttpRequests;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;


class HttpClient
{

    use HasHttpRequests;

    /**
     *
     * @var \think\facade\Request|\think\Request
     */
    protected $request;

    /**
     */
    public function __construct()
    {

    }

    /**
     * @param string $url
     * @param array $data
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpPost(string $url, array $data = [], array $options = [])
    {
        return $this->request($url, 'POST', array_merge([
            'json' => $data,
            'headers' => [
                'Content-Type' => 'application/json;charset=utf-8'
            ]
        ], $options));
    }

    /**
     * @param string $url
     * @param array $data
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpPut(string $url, array $data = [], array $options = [])
    {
        return $this->request($url, 'PUT', array_merge([
            'json' => $data,
            'headers' => [
                'Content-Type' => 'application/json;charset=utf-8'
            ]
        ], $options));
    }

    /**
     * @param string $url
     * @param string $method
     * @param array $options
     * @param bool $returnRaw
     *
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function request(string $url, string $method = 'GET', array $options = [], bool $returnRaw = false)
    {
        $response = $this->toRequest($url, $method, $options);
        return $response;
    }


    /**
     * @param string $url
     * @param array $query
     * @return array|object|Response|ResponseInterface
     * @throws GuzzleException
     */
    public function httpGet(string $url, array $query = [], array $options = [])
    {
        return $this->request($url, 'GET', array_merge([
            'query' => $query,
        ], $options));
    }

    /**
     * @param string $url
     * @param array $data
     * @param array $query
     * @return array|Response|object|ResponseInterface
     * @throws GuzzleException
     */
    public function httpPostJson(string $url, array $data = [], array $query = [])
    {
        return $this->request($url, 'POST', ['query' => $query, 'json' => $data]);
    }
}

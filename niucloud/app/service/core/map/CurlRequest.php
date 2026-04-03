<?php

namespace app\service\core\map;

class CurlRequest
{
    public static function httpRequest($method, $url, $postfields = NULL)
    {
        $ci = curl_init();
        curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($ci, CURLOPT_CONNECTTIMEOUT, 100);
        curl_setopt($ci, CURLOPT_TIMEOUT, 100);
        curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ci, CURLOPT_ENCODING, "");
        curl_setopt($ci, CURLOPT_HEADER, FALSE);

        switch ($method) {
            case 'POST':
                curl_setopt($ci, CURLOPT_POST, TRUE);
                if (!empty($postfields)) {
                    curl_setopt($ci, CURLOPT_POSTFIELDS, $postfields);
                }
                break;
            case 'GET':
                $url = $url . '?' . http_build_query($postfields);
                break;
        }

        curl_setopt($ci, CURLOPT_URL, $url);
        curl_setopt($ci, CURLOPT_HTTPHEADER, []);
        curl_setopt($ci, CURLINFO_HEADER_OUT, TRUE);
        //TODO 只有本地使用 外网不用设置
        curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        $response = curl_exec($ci);

        $httpCode = curl_getinfo($ci, CURLINFO_HTTP_CODE);
        $httpInfo = curl_getinfo($ci);

        curl_close($ci);
        return $response;
    }

    /**
     * GET请求
     * @param string $url
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function get(string $url, array $data = [])
    {
        return $this->httpRequest('GET', $url, $data);
    }

    /**
     * POST请求
     * @param string $url
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function post(string $url, array $data = [])
    {
        return $this->httpRequest('POST', $url, $data);
    }

    /**
     * PUT请求
     * @param string $url
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function put(string $url, array $data = [])
    {
        return $this->httpRequest('PUT', $url, $data);
    }

    /**
     * DELETE请求
     * @param string $url
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function delete(string $url, array $data = [])
    {
        return $this->httpRequest('DELETE', $url, $data);
    }
}

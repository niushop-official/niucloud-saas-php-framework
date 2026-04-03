<?php

namespace app\service\core\map;


use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;

class CoreQqMap extends BaseCoreService
{
    protected $key = '';
    protected $curlRequest;
    public function __construct($site_id = 0)
    {
        $mp_config = ( new CoreConfigService() )->getConfig($site_id, 'MAPKEY');

        if (empty($mp_config['value']['key'])){
            throw new CommonException('请检查腾讯地图配置');
        }

        $this->key = $mp_config['value']['key'] ?? '';
        $this->curlRequest = new CurlRequest();
    }

    /**
     * 通过地址字符串获取详情
     * @param $param
     * @return bool|string
     */
    public function addressToDetail($param)
    {

        $url = 'https://apis.map.qq.com/ws/geocoder/v1/';
        $query_data = [
            'key' => $this->key,
            'address' => $param['address'],
        ];

        return  $this->curlRequest->get($url, $query_data);
    }

    /**
     * 通过ip获取详情
     * @param $ip
     * @return bool|string
     */
    public function ipToDetail($param)
    {
        $url = 'https://apis.map.qq.com/ws/location/v1/ip';
        $query_data = [
            'key' => $this->key,
        ];
        if($param['ip']){
            $query_data['ip'] = $param['ip'];
        }
        return $this->curlRequest->get($url, $query_data);
    }

    /**
     * 通过经纬度获取详情
     * @param $param
     * @return bool|string
     */
    public function locationToDetail($param)
    {
        $url = 'https://apis.map.qq.com/ws/geocoder/v1/';
        $query_data = [
            'key' => $this->key,
            'location' => $param['location'],//$latitude.','.$longitude
            'get_poi' => 0,//是否返回周边POI列表：1.返回；0不返回(默认)
        ];
        return $this->curlRequest->get($url, $query_data);
    }



    /**
     * 获取规划路线
     * @param $params
     * @return array
     */
    public function getPolyline($params)
    {
        $url = 'https://apis.map.qq.com/ws/direction/v1/driving/';

        $get_data = [
            'key' => $this->key,
            'from' => $params[ 'from' ],
            'to' => $params[ 'to' ], // 是否返回周边POI列表：1.返回；0不返回(默认)
        ];

        $res = $this->curlRequest->get($url, $get_data);
        if (is_string($res)) {
            $res = json_decode($res, true);
        }

        if ($res) {
            if ($res[ 'status' ] == 0) {
                return $res['result'];
            } else {
                throw new CommonException('请检查地图配置：'.$res[ 'message' ]);
            }
        } else {
            throw new CommonException('获取规划路线失败');
        }
    }

    public function getKey(){
        return $this->key;
    }
}

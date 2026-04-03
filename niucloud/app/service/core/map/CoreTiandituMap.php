<?php

namespace app\service\core\map;

use app\service\core\map\CurlRequest;
use app\service\core\sys\CoreConfigService;
use core\base\BaseService;
use core\exception\CommonException;

class CoreTiandituMap extends BaseService
{
    protected $key = '';
    protected $curlRequest;

    public function __construct($site_id = 0)
    {
        $mp_config = ( new CoreConfigService() )->getConfig($site_id, 'MAPKEY');

        if (empty($mp_config['value']['tianditu_map_key'])){
            throw new CommonException('请检查天地图配置');
        }

        $this->key = $mp_config['value']['tianditu_map_key'] ?? '';
        $this->curlRequest = new CurlRequest();
    }

    /**
     * 通过地址字符串获取详情（地理编码）
     * @param $param
     * @return array
     */
    public function addressToDetail($param)
    {
        $url = 'https://api.tianditu.gov.cn/geocoder';
        if (empty($this->key)) throw new CommonException('配置错误');
        $query_data = [
            'tk' => $this->key,
            'ds' => json_encode(['keyWord' => $param['address']]),
        ];

        $res = json_decode($this->curlRequest->get($url, $query_data), true);
        $keyword = $res['location']['keyWord'] ?? '';
        $province = '';
        $city = '';
        $district = '';

        // 解析省市区
        $pattern = '/^(?<province>[^省]+省|.+?自治区|上海市|北京市|天津市|重庆市|澳门特别行政区|香港特别行政区|台湾省)?(?<city>[^市]+市|.+?自治州|.+?地区|.+?盟)?(?<district>[^县]+县|[^区]+区|[^市]+市|.+?旗|.+?海域|.+?岛)?/u';
        if (preg_match($pattern, $keyword, $matches)) {
            $province = $matches['province'] ?? '';
            $city = $matches['city'] ?? '';
            $district = $matches['district'] ?? '';

            // 处理直辖市：如果省份是直辖市，且城市为空，则将城市设置为与省份相同（如：北京市朝阳区 -> province: 北京市, city: 北京市, district: 朝阳区）
            $direct_cities = ['北京市', '上海市', '天津市', '重庆市'];
            if (in_array($province, $direct_cities)) {
                // 如果直辖市匹配到了province，但后面直接跟着区，导致city为空或被错误匹配到了district里
                if (empty($city)) {
                    $city = $province;
                } elseif (str_ends_with($city, '区') || str_ends_with($city, '县')) {
                    // 如果city被错误地匹配成了区县
                    $district = $city;
                    $city = $province;
                }
            }
        }
        // 将天地图数据格式统一为腾讯地图格式
        return [
            'status' => isset($res['status']) ? (int)$res['status'] : -1,
            'message' => ($res['msg'] == 'ok') ? 'success' : 'error',
            'request_id' => '',
            'result' => [
                'title' => $keyword,
                'location' => [
                    'lng' => isset($res['location']['lon']) ? (float)$res['location']['lon'] : 0,
                    'lat' => isset($res['location']['lat']) ? (float)$res['location']['lat'] : 0,
                ],
                'ad_info' => [
                    'adcode' => ''
                ],
                'address_components' => [
                    'province' => $province,
                    'city' => $city,
                    'district' => $district,
                    'street' => '',
                    'street_number' => ''
                ],
                'similarity' => '',
                'deviation' => '',
                'reliability' => '',
                'level' => '',
            ]
        ];
    }

    /**
     * 通过经纬度获取详情（逆地理编码）
     * @param $param
     * @return array
     */
    public function locationToDetail($param)
    {
        $url = 'https://api.tianditu.gov.cn/geocoder';
        $query_data = [
            'tk' => $this->key,
            'type' => 'geocode',
            'postStr' => json_encode(['lon' => $param['lon'], 'lat' => $param['lat'], 'ver' => 1]),
        ];
        $res = $this->curlRequest->get($url, $query_data);

         // 解析后的结果格式化以匹配腾讯地图
        if (is_string($res)) {
            $res = json_decode($res, true);
        }
        if ($res['status'] == 400) throw new CommonException($res['msg']);

        $t_result = $res['result'];
        $t_component = $t_result['addressComponent'] ?? [];

        $province = $t_component['province'] ?? '';
        $city = $t_component['city'] ?? '';
        $district = $t_component['county'] ?? '';

        // 直辖市处理
        $direct_cities = ['北京市', '上海市', '天津市', '重庆市'];
        if (in_array($province, $direct_cities) && empty($city)) {
            $city = $province;
        }

        $formatted_res = [
            'status' => 0,
            'message' => 'Success',
            'request_id' => '',
            'result' => [
                'location' => [
                    'lat' => isset($t_result['location']['lat']) ? (float)$t_result['location']['lat'] : 0,
                    'lng' => isset($t_result['location']['lon']) ? (float)$t_result['location']['lon'] : 0,
                ],
                'address' => $t_result['formatted_address'] ?? '',
                'address_component' => [
                    'nation' => $t_component['nation'] ?? '中国',
                    'province' => $province,
                    'city' => $city,
                    'district' => $district,
                    'street' => $t_component['road'] ?? '',
                    'street_number' => $t_component['address'] ?? ''
                ],
                'ad_info' => [
                    'nation_code' => '',
                    'adcode' => $t_component['county_code'] ?? '',
                    'phone_area_code' => '',
                    'city_code' => $t_component['city_code'] ?? '',
                    'name' => implode(',', array_filter([$t_component['nation'] ?? '中国', $province, $city, $district])),
                    'location' => [
                        'lat' => isset($t_result['location']['lat']) ? (float)$t_result['location']['lat'] : 0,
                        'lng' => isset($t_result['location']['lon']) ? (float)$t_result['location']['lon'] : 0,
                    ],
                    'nation' => $t_component['nation'] ?? '中国',
                    'province' => $province,
                    'city' => $city,
                    'district' => $district,
                    '_distance' => 0
                ],
                'address_reference' => [
                    'town' => [
                        'id' => '',
                        'title' => '',
                        'location' => [
                            'lat' => 0,
                            'lng' => 0
                        ],
                        '_distance' => 0,
                        '_dir_desc' => ''
                    ],
                    'landmark_l2' => [
                        'id' => '',
                        'title' => '',
                        'location' => [
                            'lat' => 0,
                            'lng' => 0
                        ],
                        '_distance' => 0,
                        '_dir_desc' => ''
                    ],
                    'street' => [
                        'id' => '',
                        'title' => '',
                        'location' => [
                            'lat' => 0,
                            'lng' => 0
                        ],
                        '_distance' => 0,
                        '_dir_desc' => ''
                    ],
                    'street_number' => [
                        'id' => '',
                        'title' => '',
                        'location' => [
                            'lat' => 0,
                            'lng' => 0
                        ],
                        '_distance' => 0,
                        '_dir_desc' => ''
                    ],
                    'crossroad' => [
                        'id' => '',
                        'title' => '',
                        'location' => [
                            'lat' => 0,
                            'lng' => 0
                        ],
                        '_distance' => 0,
                        '_dir_desc' => ''
                    ]
                ],
                'formatted_addresses' => [
                    'recommend' => $t_component['poi'] ?? '',
                    'rough' => $t_component['poi'] ?? '',
                    'standard_address' => $t_result['formatted_address'] ?? ''
                ]
            ]
        ];
        return $formatted_res;
    }

    public function getKey()
    {
        return $this->key;
    }

    /**
     * 获取规划路线
     * @param $params
     * @return array
     */
    public function getPolyline($params)
    {
        $url = 'http://api.tianditu.gov.cn/drive';

        $query_data = [
            'tk' => $this->key,
            'type' => 'search',
            'postStr' => json_encode($params['data'])
        ];

        $res = $this->curlRequest->get($url, $query_data);

        if (is_string($res)) {
            $xmlString = trim($res);
            // 转成 SimpleXML 对象
            $xml = simplexml_load_string($xmlString, 'SimpleXMLElement', LIBXML_NOCDATA);
            // 转 JSON 再转数组（最简单稳定）
            $json = json_encode($xml);
            $res = json_decode($json, true);
        }

        // 天地图无错误状态码是 0 或者没有报错
        if ($res && isset($res['distance']) && isset($res['routelatlon'])) {
            // 转换为腾讯地图的路线格式

            // 天地图的 routelatlon 格式："lon,lat;lon,lat;..."
            $points_str = explode(';', trim($res['routelatlon'], ';'));
            $polyline = [];

            $prev_lat = 0;
            $prev_lon = 0;

            foreach ($points_str as $idx => $point) {
                if (empty($point)) continue;
                $coords = explode(',', $point);
                if (count($coords) != 2) continue;

                // 腾讯地图的 polyline 是差分压缩格式
                // 第一点是实际坐标浮点数（不乘1000000），后面的点是与前一点的差值 * 1000000
                $lon = (float)$coords[0];
                $lat = (float)$coords[1];

                $lat_val = round($lat * 1000000);
                $lon_val = round($lon * 1000000);

                if ($idx == 0) {
                    $polyline[] = $lat;
                    $polyline[] = $lon;
                } else {
                    $polyline[] = $lat_val - $prev_lat;
                    $polyline[] = $lon_val - $prev_lon;
                }

                $prev_lat = $lat_val;
                $prev_lon = $lon_val;
            }

            // 处理 steps
            $steps = [];
            if (isset($res['simple']['item'])) {
                // 如果只有一个步骤，可能不会是数组包数组的形式，需要判断处理
                $items = isset($res['simple']['item'][0]) ? $res['simple']['item'] : [$res['simple']['item']];

                // 为了简化 polyline_idx，我们用均分或大致的起止索引
                // 由于天地图和腾讯地图的点位对应关系不同，这里我们做一个简单的映射
                // 实际业务中往往主要用到距离、耗时和完整的 polyline，不一定严格依赖每一步的 idx
                $current_idx = 0;
                foreach ($items as $item) {
                    $step_distance = (float)($item['streetDistance'] ?? 0);
                    $steps[] = [
                        "instruction" => $item['strguide'] ?? '',
                        "polyline_idx" => [0, max(0, count($polyline) / 2 - 1)], // 简化处理，实际要精确匹配需要遍历坐标点比对
                        "road_name" => $item['linkStreetName'] ?? (is_string($item['streetNames']) ? trim($item['streetNames'], ',') : ''),
                        "dir_desc" => "",
                        "distance" => $step_distance,
                        "act_desc" => "",
                        "accessorial_desc" => ""
                    ];
                }
            }

            $routes = [
                [
                    "mode" => "DRIVING",
                    "distance" => (int)($res['distance'] * 1000), // 天地图是公里，转为米
                    "duration" => (int)($res['duration'] / 60), // 天地图 duration 是秒，腾讯地图是分钟
                    "traffic_light_count" => 0,
                    "toll" => 0,
                    "restriction" => [
                        "status" => 1
                    ],
                    "polyline" => $polyline,
                    "steps" => $steps,
                    "tags" => ["大众常走"],
                    "taxi_fare" => [
                        "fare" => 0
                    ]
                ]
            ];
            return [
                'routes' => $routes
            ];
        } else {
            throw new CommonException('获取规划路线失败：' . ($res['message'] ?? '未知错误'));
        }
    }
}

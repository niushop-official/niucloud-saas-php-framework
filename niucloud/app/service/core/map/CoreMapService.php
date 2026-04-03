<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\service\core\map;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 地图服务层
 * Class CoreMapService
 * @package app\service\core\map
 */
class CoreMapService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 获取规划路线
     * @param $site_id
     * @param $params
     * @return array
     */
    public function getPolyline($site_id, $params)
    {
        $map = $this->getMapConfig($site_id);
        $map_type = $map['map_type'] ?? 'tianditu';

        if ($map_type == 'tencent') {
            $map_service = new \app\service\core\map\CoreQqMap($site_id);

            $res = $map_service->getPolyline(['from' => $params[ 'from' ], 'to' => $params[ 'to' ]]);

        } else {
            $map_service = new \app\service\core\map\CoreTiandituMap($site_id);
            $from_arr = explode(',', $params['from']);
            $to_arr = explode(',', $params['to']);

            $from = isset($from_arr[1]) ? $from_arr[1] . ',' . $from_arr[0] : $params['from'];
            $to = isset($to_arr[1]) ? $to_arr[1] . ',' . $to_arr[0] : $params['to'];

            $postStr = [
                'orig' => $from,
                'dest' => $to,
                'style' => '0' // 0: 最快路线
            ];
            $res = $map_service->getPolyline(['data' => $postStr]);
        }
        return is_string($res) ? json_decode($res, true) : $res;
    }


    /**
     * 获取地图配置
     * @return array|mixed
     */
    public function getMapConfig($site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, 'MAPKEY');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'key' => 'IZQBZ-3UHEU-WTCVD-2464U-I5N4V-ZFFU3',
                'is_open' => 1, // 是否开启定位
                'valid_time' => 5 // 定位有效期/分钟，过期后将重新获取定位信息，0为不过期
            ];
        }

        $info[ 'value' ][ 'is_open' ] = $info[ 'value' ][ 'is_open' ] ?? 1;
        $info[ 'value' ][ 'valid_time' ] = $info[ 'value' ][ 'valid_time' ] ?? 5;
        return $info[ 'value' ];
    }
}

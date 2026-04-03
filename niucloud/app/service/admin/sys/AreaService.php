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

namespace app\service\admin\sys;

use app\model\sys\SysArea;
use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 地区服务层
 * Class AreaService
 * @package app\service\admin\sys
 */
class AreaService extends BaseAdminService
{
    public static $cache_tag_name = 'area_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new SysArea();
    }

    /**
     * 获取地区信息
     * @param int $pid //上级pid
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getListByPid(int $pid = 0)
    {

        $cache_name = self::$cache_tag_name.'_pid_'.$pid;
        return cache_remember(
            $cache_name,
            function() use($pid) {
                return $this->model->where([['pid', '=', $pid]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
            },
            [self::$cache_tag_name]
        );
    }

    /**
     * 查询地区树列表
     * @param int $level //层级1,2,3
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAreaTree(int $level = 3)
    {
        $cache_name = self::$cache_tag_name.'_tree_'.$level;
        return cache_remember(
            $cache_name,
            function() use($level) {
                $list = $this->model->where([['level', '<=', $level]])->field('id, pid, name, shortname, longitude, latitude, level, sort, status')->select()->toArray();
                return list_to_tree($list);
            },
            [self::$cache_tag_name]
        );
    }

    public function getAreaByAreaCode($id) {
        $cache_name = self::$cache_tag_name.'_area_'. $id;
        return cache_remember(
            $cache_name,
            function() use($id) {
                $level = [1 => 'province', 2 => 'city', 3 => 'district'];
                $tree = [];
                $area = $this->model->where([ ['id', '=', $id] ])->field('id,level,pid,name')->findOrEmpty();

                if (!$area->isEmpty()) {
                    $tree[ $level[ $area['level'] ] ] = $area->toArray();

                    while ($area['level'] > 1) {
                        $area = $this->model->where([ ['id', '=', $area['pid'] ] ])->field('id,level,pid,name')->findOrEmpty();
                        if (!$area->isEmpty()) {
                            $tree[ $level[ $area[ 'level' ] ] ] = $area->toArray();
                        }
                    }
                }
                return $tree;
            },
            [self::$cache_tag_name]
        );
    }

    /**
     * @param string $address
     * @return int|mixed
     * 地址解析
     */
    public function getAddress(string $address){
        $map = (new ConfigService())->getMap();
        $map_type = $map['map_type'] ? $map['map_type'] : 'tianditu';
        if ($map_type == 'tencent') {
            $map_service = new \app\service\core\map\CoreQqMap($this->site_id);
            $res = $map_service->addressToDetail(['address' => $address]);
        }else{
            $map_service = new \app\service\core\map\CoreTiandituMap($this->site_id);
            $res = $map_service->addressToDetail(['address' => $address]);
        }

        return is_string($res) ? json_decode($res,true) : $res;
    }

    /**
     * @param string $location
     * @return int|mixed
     * 逆地址解析
     */
    public function getAddressInfo(string $location){
        $map = (new ConfigService())->getMap();
        $map_type = $map['map_type'] ? $map['map_type'] : 'tianditu';

        if ($map_type == 'tencent') {
            $map_service = new \app\service\core\map\CoreQqMap($this->site_id);
            $res = $map_service->locationToDetail(['location' => $location]);
        } else {
            $map_service = new \app\service\core\map\CoreTiandituMap($this->site_id);
            $loc_arr = explode(',', $location);
            $lat = $loc_arr[0] ?? '';
            $lon = $loc_arr[1] ?? '';
            $res = $map_service->locationToDetail(['lat' => $lat, 'lon' => $lon]);
        }

        return is_string($res) ? json_decode($res, true) : $res;
    }

    public function getAreaId($name, $level){
        $field = 'id';
        $info = $this->model->field($field)->where([['name', 'like', '%' . $name . '%' ], ['level', '=', $level]])->findOrEmpty()->toArray();
        return $info['id'];
    }

    /**
     * 获取地址名称
     */
    public function getAreaName($id){
        $info = $this->model->field("name")->where([['id', '=', $id ]])->findOrEmpty()->toArray();
        return $info['name'];
    }

}

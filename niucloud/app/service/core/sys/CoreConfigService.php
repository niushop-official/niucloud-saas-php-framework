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

namespace app\service\core\sys;

use app\model\sys\SysConfig;
use core\base\BaseCoreService;
use think\facade\Cache;
use think\Model;

/**
 * 配置服务层
 * Class BaseService
 * @package app\service
 */
class CoreConfigService extends BaseCoreService
{
    public static $cache_tag_name = 'sys_config';

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysConfig();
    }

    /**
     * 获取配置信息
     * @param int $site_id
     * @param string $key
     * @return array
     */
    public function getConfig(int $site_id, string $key)
    {
        $cache_name = 'site_config_cache';
        $where = array(
            [ 'config_key', '=', $key ],
            [ 'site_id', '=', $site_id ]
        );
        // 缓存清理
        $info = cache_remember(
            $cache_name . $key . "_" . $site_id,
            function() use ($where) {
                $data = $this->model->where($where)->field('id,site_id,config_key,value,status,create_time,update_time')->findOrEmpty()->toArray();
                //数据库中无数据返回-1
                if (empty($data)) {
                    return -1;
                }
                return $data;
            },
            self::$cache_tag_name . $site_id
        );
        // 检测缓存-1 返回空数据
        if ($info == -1) {
            return [];
        }
        return $info;
    }

    /**
     * 设置配置
     * @param int $site_id
     * @param string $key
     * @param array $value
     * @return SysConfig|bool|Model
     */
    public function setConfig(int $site_id, string $key, array $value)
    {
        $where = array(
            [ 'config_key', '=', $key ],
            [ 'site_id', '=', $site_id ]
        );
        $data = array(
            'site_id' => $site_id,
            'config_key' => $key,
            'value' => $value,
        );
        $info = $this->getConfig($site_id, $key);
        if (empty($info)) {
            $data[ 'create_time' ] = time();
            $res = $this->model->create($data);
        } else {
            $data[ 'update_time' ] = time();
            $res = $this->model->where($where)->save($data);
        }

        Cache::tag(self::$cache_tag_name . $site_id)->clear();
        return $res;
    }

    /**
     * 修改设置状态
     * @param int $site_id
     * @param int $status
     * @param string $key
     * @return bool
     */
    public function modifyStatus(int $site_id, int $status, string $key)
    {
        $where = array(
            [ 'config_key', '=', $key ],
            [ 'site_id', '=', $site_id ]
        );
        $data = array(
            'status' => $status,
        );
        return $this->model->where($where)->save($data);
    }

    /**
     * 返回config信息
     * @param int $site_id
     * @param string $key
     * @return array|mixed
     */
    public function getConfigValue(int $site_id, string $key)
    {
        $config_info = $this->getConfig($site_id, $key);
        if (empty($config_info)) {
            return [];
        }
        return $config_info[ 'value' ];
    }
}

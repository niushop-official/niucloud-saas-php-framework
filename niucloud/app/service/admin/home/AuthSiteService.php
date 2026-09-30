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

namespace app\service\admin\home;


use app\dict\addon\AddonDict;
use app\dict\common\ChannelDict;
use app\dict\sys\ConfigKeyDict;
use app\model\addon\Addon;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysConfig;
use app\model\sys\SysUserRole;
use app\model\sys\UserCreateSiteLimit;
use app\service\admin\auth\AuthService;
use app\service\admin\site\SiteGroupService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\ConfigService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use core\exception\HomeException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class AuthSiteService extends BaseAdminService
{
    public static $role_cache_name = 'user_site_cache';
    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取授权当前的站点信息
     */
    public function getSiteInfo($site_id){
        $this->checkSite($site_id);
        //通过用户id获取
        $field = 'site_id, site_name, front_end_name, front_end_logo, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app';
        return $this->model->where([ [ 'site_id', '=', $site_id ] ])->with(['groupName', 'addon'])->field($field)->append([ 'status_name' ])->findOrEmpty()->toArray();
    }

    /**
     * 获取授权账号下的站点列表
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getSitePage(array $where = [])
    {
        $field = 'site_id, site_name, front_end_name, front_end_logo, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app';
        $condition = [
            ['site_id', '<>', request()->defaultSiteId()],
        ];
        $order = 'create_time desc';
        if (!empty($where['sort'])){
            if($where['sort'] == 'site_id'){
                $order = "{$where['sort']} asc";
            }else{
                $order = "{$where['sort']} desc";
            }
        }
        if (!AuthService::isSuperAdmin()) $condition[] = ['site_id', 'in', $this->getSiteIds()];
        $search_model = $this->model->where($condition)
            ->withSearch([ 'create_time', 'expire_time', 'keywords', 'status', 'group_id', 'app' ], $where)
            ->with(['groupName'])->field($field)->append([ 'status_name' ])
            ->order($order);

        $theme_color = (new ConfigService())->getThemeColor();

        $list = $this->pageQuery($search_model);

        $site_ids = array_column($list['data'], 'site_id');
        // 当前站点已开启的端口渠道集合
        $channel_map = $this->getSiteOpenChannelMap($site_ids);
        // 站点应用名称集合
        $app_name_map = $this->getSiteAppNameMap($list['data']);

        foreach ($list['data'] as &$item) {
            if (is_array($item['app']) && count($item['app']) == 1) {
                $item['theme_color'] = $theme_color[ $item['app'][0] ] ?? '';
            } else {
                $item['theme_color'] = $theme_color['system'] ?? '';
            }
            $item['channels'] = $channel_map[ $item['site_id'] ] ?? [];
            $item['app_name'] = $app_name_map[ $item['site_id'] ] ?? [];
        }
        unset($item);

        return $list;
    }

    /**
     * 批量获取站点已开启的端口渠道集合
     * 判定规则：
     * - PC / H5：读取各渠道配置的 is_open，无配置默认开启（与 CorePcService / CoreH5Service 保持一致）
     * - APP：存在 app 配置记录即视为开启
     * - 微信公众号 / 微信小程序：配置存在且已授权或 app_id、app_secret 均已配置视为开启
     * - H5 / PC：额外返回访问地址 url（H5 取 wap_url，PC 取 web_url）
     * @param array $site_ids
     * @return array [site_id => [ ['key' => 渠道标识, 'name' => 渠道名称, 'url' => H5/PC 访问地址], ... ]]
     * @throws DbException
     */
    public function getSiteOpenChannelMap(array $site_ids)
    {
        $map = [];
        if (empty($site_ids)) return $map;

        // 渠道标识 => 配置键（微信公众号配置键为大写 WECHAT，其余与渠道标识一致）
        $channel_config_keys = [
            ChannelDict::PC => ChannelDict::PC,
            ChannelDict::H5 => ConfigKeyDict::H5,
            ChannelDict::APP => ConfigKeyDict::APP,
            ChannelDict::WECHAT => ConfigKeyDict::WECHAT,
            ChannelDict::WEAPP => ConfigKeyDict::WEAPP,
        ];
        $channel_names = ChannelDict::getType();

        $config_list = (new SysConfig())->whereIn('site_id', $site_ids)
            ->whereIn('config_key', array_values($channel_config_keys))
            ->field('site_id, config_key, value')->select()->toArray();
        $config_map = [];
        foreach ($config_list as $config) {
            $config_map[ $config['site_id'] ][ $config['config_key'] ] = $config['value'];
        }

        foreach ($site_ids as $site_id) {
            $site_config = $config_map[ $site_id ] ?? [];
            $channels = [];
            $scene_domain = [];
            foreach ($channel_config_keys as $channel_key => $config_key) {
                $config = $site_config[ $config_key ] ?? [];
                if (!is_array($config)) $config = [];
                if (!$this->checkChannelOpen($channel_key, $config)) continue;

                $channel = [
                    'key' => $channel_key,
                    'name' => $channel_names[ $channel_key ] ?? $channel_key,
                ];
                // H5 / PC 补充该端口的访问地址（H5 取 wap_url，PC 取 web_url），地址末尾统一以 / 结尾
                if (in_array($channel_key, [ ChannelDict::H5, ChannelDict::PC ])) {
                    if (empty($scene_domain)) $scene_domain = (new CoreSysConfigService())->getSceneDomain($site_id);
                    $url = $channel_key === ChannelDict::H5
                        ? ( $scene_domain['wap_url'] ?? '' )
                        : ( $scene_domain['web_url'] ?? '' );
                    $channel['url'] = $url === '' ? '' : rtrim($url, '/') . '/';
                }
                $channels[] = $channel;
            }
            $map[ $site_id ] = $channels;
        }
        return $map;
    }

    /**
     * 判定单个渠道是否开启
     * @param string $channel_key 渠道标识
     * @param array $config 渠道配置
     * @return bool
     */
    private function checkChannelOpen(string $channel_key, array $config)
    {
        switch ($channel_key) {
            case ChannelDict::PC:
            case ChannelDict::H5:
                // 无配置时默认开启
                return (int) ( $config['is_open'] ?? 1 ) === 1;
            case ChannelDict::APP:
                return !empty($config);
            case ChannelDict::WECHAT:
            case ChannelDict::WEAPP:
                if (empty($config)) return false;
                if ((int) ( $config['is_authorization'] ?? 0 ) === 1) return true;
                return !empty($config['app_id']) && !empty($config['app_secret']);
        }
        return false;
    }

    /**
     * 批量获取站点应用名称集合（由站点 app 集合查询 addon.title，保留站点自身应用顺序）
     * @param array $site_list 站点列表
     * @return array [site_id => [应用名称, ...]]
     * @throws DbException
     */
    public function getSiteAppNameMap(array $site_list)
    {
        $app_keys = [];
        foreach ($site_list as $site) {
            if (is_array($site['app'] ?? null)) $app_keys = array_merge($app_keys, $site['app']);
        }
        $app_keys = array_unique($app_keys);

        $title_map = [];
        if (!empty($app_keys)) {
            $title_map = (new Addon())->whereIn('key', $app_keys)->column('title', 'key');
        }

        $map = [];
        foreach ($site_list as $site) {
            $names = [];
            if (is_array($site['app'] ?? null)) {
                foreach ($site['app'] as $key) {
                    if (isset($title_map[ $key ])) $names[] = $title_map[ $key ];
                }
            }
            $map[ $site['site_id'] ] = $names;
        }
        return $map;
    }

    /**
     * 查询用户角色类表
     * @return mixed|string
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getSiteIds(){
        $cache_name = 'user_role_list_'.$this->uid;
        return cache_remember(
            $cache_name,
            function(){
                $user_role_model = new SysUserRole();
                $where = array(
                    ['uid', '=', $this->uid],
                    ['site_id', '<>', request()->defaultSiteId()],
                    ['status', '=', 1]
                );
                $list = $user_role_model->where($where)->select()->toArray();
                return array_column($list, 'site_id');
            },
            [self::$role_cache_name]
        );
    }

    /**
     * 检测站点用户是否存在
     * @return Site|array|mixed|\think\Model
     */
    public function checkSiteUserAccount()
    {
        $where = [
            ['uid', '=', $this->uid],
            ['site_id', '<>', request()->defaultSiteId()]
        ];
        return (new SysUserRole())->where($where)->findOrEmpty();
    }

    /**
     * 编辑站点信息
     * @param int $site_id
     * @param array $data
     * @return true
     */
    public function editSite(int $site_id, array $data){
        $this->checkSite($site_id);
        $this->model->where([['site_id', '=', $site_id]])->update($data);
        return true;
    }

    /**
     * 校验是否合法
     * @param $site_id
     * @return void
     */
    public function checkSite($site_id){
        $site_ids = $this->getSiteIds();
        if(!in_array($site_id, $site_ids)) throw new HomeException('USER_ROLE_NOT_HAS_SITE');//无效的站点
    }

    /**
     * 获取可选择的店铺套餐
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getSiteGroup() {
        if (AuthService::isSuperAdmin()) {
            $site_group = (new SiteGroup())->field('group_id,group_name,app,addon')->append(['app_name', 'addon_name'])->select()->toArray();
            return array_map(function ($item){
                return [
                    'group_id' => $item['group_id'],
                    'site_group' => $item
                ];
            }, $site_group);
        } else {
            return (new UserCreateSiteLimit())->where([ ['uid', '=', $this->uid] ])->with(['site_group' => function($query) {
                $query->field('group_id,group_name,app,addon');
            }])->select()->toArray();
        }
    }

    /**
     * 获取可选择的店铺应用列表
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getSiteGroupAppList() {
        if (AuthService::isSuperAdmin()) {
            $site_group = (new SiteGroup())->field('app')->select()->toArray();
        } else {
            $user_create_limit = (new UserCreateSiteLimit())->where([ ['uid', '=', $this->uid] ])->with(['site_group' => function($query) {
                $query->field('group_id,app');
            }])->select()->toArray();
            $site_group = [];
            foreach ($user_create_limit as $value){
                $site_group[] = $value[ 'site_group' ];
            }
        }
        $site_group_app_list = array_unique(array_merge(...array_column($site_group,'app')));

        $addon_list = (new Addon())->where([ ['status', '=', AddonDict::ON], ['type', '=', AddonDict::APP], ['key', 'in', $site_group_app_list] ])->append(['status_name'])->column('title, icon, key, desc, status, type, support_app', 'key');
        if (!empty($addon_list)) {
            foreach ($addon_list as &$data) {
                $data[ 'icon' ] = is_file($data[ 'icon' ]) ? image_to_base64($data[ 'icon' ]) : '';
            }
        }
        return $addon_list;
    }



    /**
     * 创建站点
     * @param array $data
     * @return array
     */
    public function createSite(array $data) {

//        throw new CommonException('演示站禁止操作');

        if (!AuthService::isSuperAdmin()) {
            $limit = (new UserCreateSiteLimit())->where([ ['uid', '=', $this->uid], ['group_id', '=', $data['group_id'] ] ])->findOrEmpty();
            if ($limit->isEmpty()) throw new CommonException('NO_PERMISSION_TO_CREATE_SITE_GROUP');

            if (SiteGroupService::getUserSiteGroupSiteNum($this->uid, $data['group_id']) > ($limit['num'] - 1)) throw new CommonException('SITE_GROUP_CREATE_SITE_EXCEEDS_LIMIT');
        } else {
            $limit = ['month' => 1];
        }

        $expire_time = date('Y-m-d H:i:s', strtotime("+ {$limit['month']} month"));

        $site_id =(new SiteService())->add([
            'site_name' => $data['site_name'],
            'uid' => $this->uid,
            'group_id' => $data['group_id'],
            'expire_time' => $expire_time,
            'desc' => $data['desc'] ?? ''
        ]);

        return [
            'site_id' => $site_id,
            'expire_time' => $expire_time
        ];
    }
}

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

namespace app\service\admin\site;

use app\dict\addon\AddonDict;
use app\dict\site\SiteDict;
use app\dict\sys\AppTypeDict;
use app\model\addon\Addon;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysMenu;
use app\model\sys\SysUserRole;
use app\service\admin\addon\AddonService;
use app\service\admin\auth\AuthService;
use app\service\admin\diy\DiyService;
use app\service\admin\generator\GenerateService;
use app\service\admin\sys\MenuService;
use app\service\admin\sys\RoleService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use app\service\api\captcha\CaptchaService;
use app\service\core\site\CoreSiteService;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use Exception;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;
use think\facade\Db;

/**
 * 站点服务层
 * Class Site
 * @package app\service\admin\site
 */
class SiteService extends BaseAdminService
{
    public static $cache_tag_name = 'site_cash';

    public function __construct()
    {
        parent::__construct();
        $this->model = new Site();
    }

    /**
     * 获取站点列表
     * @param array $where
     * @return array
     * @throws DbException
     */
    public function getPage(array $where = [])
    {

        $field = 'site_id, site_name, front_end_name, front_end_logo, front_end_icon, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app, addons, site_domain';
        $condition = [
            ['app_type', '<>', 'admin']
        ];
        $search_model = $this->model->where($condition)->withSearch(['create_time', 'expire_time', 'keywords', 'status', 'group_id', 'app', 'site_domain'], $where)->with(['groupName'])->field($field)->append(['status_name'])->order('create_time desc');
        return $this->pageQuery($search_model, function ($item) {
            $item['admin'] = (new SysUserRole())->where([['site_id', '=', $item['site_id']], ['is_admin', '=', 1]])
                ->field('uid')
                ->with(['userinfo'])
                ->findOrempty()->toArray();
        });
    }

    /**
     * 站点信息
     * @param int $site_id
     * @return array
     */
    public function getInfo(int $site_id)
    {
        $field = 'site_id, site_name, front_end_name, front_end_logo, front_end_icon, app_type, keywords, logo, icon, `desc`, status, latitude, longitude, province_id, city_id, 
        district_id, address, full_address, phone, business_hours, create_time, expire_time, group_id, app, addons, site_domain, meta_title, meta_desc, meta_keyword';
        $info = $this->model->where([['site_id', '=', $site_id]])->with(['groupName'])->field($field)->append(['status_name'])->findOrEmpty()->toArray();
        if (!empty($info)) {
            $site_addons = (new CoreSiteService())->getAddonKeysBySiteId($site_id);
            $info['site_addons'] = (new Addon())->where([['key', 'in', $site_addons]])->field('key,title,desc,icon,type')->select()->toArray();
            $info['uid'] = (new SysUserRole())->where([['site_id', '=', $site_id], ['is_admin', '=', 1]])->value('uid');
        }
        return $info;
    }

    /**
     * 添加站点(平台端添加站点，同时添加用户以及密码)
     * @param array $data
     * ['site_name' => '', 'username' => '', 'head_img' => '', 'real_name' => '', 'password' => '']
     * @return mixed
     * @throws DbException
     */
    public function add(array $data)
    {
        $site_group = (new SiteGroup())->where([['group_id', '=', $data['group_id']]])->field('app,addon')->findOrEmpty();
        if ($site_group->isEmpty()) throw new CommonException('SITE_GROUP_NOT_EXIST');

        $data['app_type'] = 'site';
        //添加站点
        $data_site = [
            'site_domain' => $data['site_domain'] ?? '',
            'site_name' => $data['site_name'],
            'app_type' => $data['app_type'],
            'group_id' => $data['group_id'],
            'create_time' => time(),
            'expire_time' => $data['expire_time'],
            'app' => $site_group['app'],
            'addons' => '',
            'status' => strtotime($data['expire_time']) > time() ? SiteDict::ON : SiteDict::EXPIRE,
            'icon' => 'static/resource/images/site/site_icon.jpg'
        ];
        Db::startTrans();
        try {
            $site = $this->model->create($data_site);
            $site_id = $site->site_id;

            if ($data['uid']) {
                (new UserRoleService())->add($data['uid'], ['role_ids' => '', 'is_admin' => 1], $site_id);
            } else {
                //添加用户
                $data_user = [
                    'username' => $data['username'],
                    'head_img' => $data['head_img'] ?? '',
                    'status' => $data['status'] ?? 1,
                    'real_name' => $data['real_name'] ?? '',
                    'password' => $data['password'],
                    'role_ids' => '',
                    'is_admin' => 1
                ];
                $data['uid'] = (new UserService())->addSiteUser($data_user, $site_id);
            }

            //添加站点成功事件
            event("AddSiteAfter", ['site_id' => $site_id, 'main_app' => $site_group['app'], 'site_addons' => $site_group['addon']]);

            // 更新微页面数据
            $diy_service = new DiyService();
            $diy_service->loadDiyData(['site_id' => $site_id, 'main_app' => $site_group['app'], 'tag' => 'add']);

            Cache::delete('user_role_list_' . $data['uid']);

            Db::commit();
            return $site_id;
        } catch (Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage() . $e->getFile() . $e->getLine());
        }
    }

    /**
     * 修改站点
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function edit(int $site_id, array $data)
    {
        $site = $this->model->where([['site_id', '=', $site_id]])->with(['site_group'])->findOrEmpty();
        if ($site->isEmpty()) throw new AdminException('SITE_NOT_EXIST');
        Db::startTrans();
        try {
            if (isset($data['group_id']) && $site['group_id'] != $data['group_id']) {
                $old_site_group = $site['site_group'];

                $site_group = (new SiteGroup())->where([['group_id', '=', $data['group_id']]])->field('app,addon')->findOrEmpty();
                $data['app'] = $site_group['app'];

                if (empty($site->initalled_addon)) {
                    $site->initalled_addon = array_merge($old_site_group['app'], $old_site_group['addon']);
                }
                //添加站点成功事件
                event("AddSiteAfter", ['site_id' => $site_id, 'main_app' => array_diff($site_group['app'], $site->initalled_addon), 'site_addons' => array_diff($site_group['addon'], $site->initalled_addon)]);

                // 更新微页面数据
                $diy_service = new DiyService();
                $diy_service->loadDiyData(['site_id' => $site_id, 'main_app' => $site_group['app'], 'tag' => 'update']);

                $data['initalled_addon'] = array_values(array_unique(array_merge($site->initalled_addon, $site_group['app'], $site_group['addon'])));
            }

            if (isset($data['expire_time']) && !empty($data['expire_time'])) {
                $data['status'] = strtotime($data['expire_time']) > time() ? SiteDict::ON : SiteDict::EXPIRE;
            }

            if (isset($data['uid'])) {
                if ($data['uid'] > 0) {
                    (new UserRoleService())->editAdmin($site_id, $data['uid']);
                } else {
                    //添加用户
                    $data_user = [
                        'username' => $data['username'],
                        'head_img' => $data['head_img'] ?? '',
                        'status' => $data['status'] ?? 1,
                        'real_name' => $data['real_name'] ?? '',
                        'password' => $data['password'],
                        'role_ids' => '',
                        'is_admin' => 1
                    ];
                    $data['uid'] = (new UserService())->add($data_user);
                    (new UserRoleService())->editAdmin($site_id, $data['uid']);
                }
            }

            $site->save($data);

            Cache::tag(self::$cache_tag_name . $site_id)->clear();
            Cache::tag(MenuService::$cache_tag_name)->clear();
            Db::commit();
            return true;
        } catch (Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage() . $e->getFile() . $e->getLine());
        }
    }

    /**
     * 删除站点
     * @param int $site_id
     * @return true
     */
    public function del(int $site_id)
    {
        (new CaptchaService())->check();

        Db::startTrans();
        try {
            $site = $this->model->where([['site_id', '=', $site_id]])->findOrEmpty()->toArray();

            // 删除站点相关数据
            $sys_models = (new GenerateService())->getModels(['addon' => 'system']);
            $addon_models = [];
            $addons = (new CoreSiteService())->getAddonKeysBySiteId($site_id);
            foreach ($addons as $addon) {
                $addon_models[] = (new GenerateService())->getModels(['addon' => $addon]);
            }
            $models = array_merge($sys_models, ...$addon_models);

            foreach ($models as $model) {

                try {
                    $name = "\\$model";
                    $class = new $name();
                    if (in_array('site_id', $class->getTableFields())) {
                        $class::destroy(function ($query) use ($site) {
                            $query->where([['site_id', '=', $site['site_id']]]);
                        });
//                        $class->where([ [ 'site_id', '=', $site[ 'site_id' ] ] ])->delete();
                    }
                } catch (\Exception $e) {
                }
            }

            //删除站点时同步删除该站点的所有管理员的关联信息
            $sys_userrole_model = new SysUserRole();
            $site_uids = $sys_userrole_model->where('site_id', $site_id)->field('site_id,uid')->select()->toArray();
            $del_res = $sys_userrole_model->where('site_id', $site_id)->field('site_id,uid')->delete();
            if ($del_res) {
                //删除成功是清除对应的缓存
                foreach ($site_uids as $item) {
                    Cache::delete('user_role_' . $item['uid'] . '_' . $site_id);
                    Cache::delete('user_role_list_' . $item['uid']);
                }
            }
            Cache::tag(self::$cache_tag_name . $site_id)->clear();
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 站点数量
     * @return int
     * @throws DbException
     */
    public function getCount(array $where = [])
    {
        return $this->model->where($where)->withSearch(['create_time', 'group_id'], $where)->count();
    }


    /**
     * 获取授权当前站点信息(用做缓存)
     * @return mixed
     */
    public function getSiteCache(int $site_id)
    {
        return (new CoreSiteService())->getSiteCache($site_id);
    }


    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @param $is_tree
     * @param $status
     * @param string $addon 所以应用名一般不建议叫all
     * @param int $is_button
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getMenuList(int $site_id, $is_tree, $status, $addon = 'all', int $is_button = 1)
    {
        $site_info = $this->getSiteCache($site_id);
        if (empty($site_info))
            return [];
        $app_type = $site_info['app_type'];

        if (AuthService::isSuperAdmin()) {
            $is_admin = 1;
        } else {
            $user_role_info = (new AuthService())->getAuthRole($this->site_id);
            if (empty($user_role_info))
                return [];
            $is_admin = $user_role_info['is_admin'];//是否是超级管理员组
        }

        if ($is_admin) {
            //获取全部菜单列表
            $all_menu_list = (new MenuService())->getAllMenuList($app_type, $status, $is_tree, $is_button);
            //根据parent_select_key字段重新整理上下级关系 并返回
            return (new MenuService())->moveChildrenToParent($all_menu_list);
        } else {
            $user_role_ids = $user_role_info['role_ids'];
            $role_service = new RoleService();
            $menu_keys = $role_service->getMenuIdsByRoleIds($this->site_id, $user_role_ids);
            //获取全部菜单列表
            $all_menu_list = (new MenuService())->getMenuListByMenuKeys($this->site_id, $menu_keys, $this->app_type, 1, is_button: $is_button);
            //根据parent_select_key字段重新整理上下级关系 并返回
            return (new MenuService())->moveChildrenToParent($all_menu_list);
        }
    }

    /**
     * 通过站点id获取站点菜单极限
     * @param int $site_id
     * @param $status
     * @return array|mixed|string|null
     */
    public function getMenuIdsBySiteId(int $site_id, $status)
    {
        $site_info = $this->getSiteCache($site_id);
        if (empty($site_info))
            return [];
        $app_type = $site_info['app_type'];
        if ($app_type == AppTypeDict::ADMIN) {
            return (new MenuService())->getAllMenuIdsByAppType($app_type, $status);
        } else {

            $addons = (new AddonService())->getAddonKeysBySiteId($site_id);
            return (new MenuService())->getMenuKeysBySystem($app_type, $addons);

        }
    }

    /**
     * 通过站点id获取菜单列表
     * @param int $site_id
     * @param $status
     * @return mixed
     */
    public function getApiList(int $site_id, $status)
    {
        $site_info = $this->getSiteCache($site_id);
        if (empty($site_info))
            return [];
        $app_type = $site_info['app_type'];
        if ($app_type == AppTypeDict::ADMIN) {
            return (new MenuService())->getAllApiList($app_type, $status);
        } else {
            $addons = (new AddonService())->getAddonKeysBySiteId($site_id);
            return (new MenuService())->getApiListBySystem($app_type, $addons);
        }
    }

    /**
     * 站点过期时间
     * @param int $site_id
     * @return array
     */
    public function getExpireTime(int $site_id)
    {
        $field = 'expire_time';
        return $this->model->where([['site_id', '=', $site_id]])->field($field)->findOrEmpty()->toArray();

    }

    /**
     * 获取站点的插件
     * @return array
     */
    public function getSiteAddons(array $where)
    {
        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId($this->site_id);
        return (new Addon())->where([['type', '=', AddonDict::ADDON], ['status', '=', AddonDict::ON], ['key', 'in', $site_addon]])->withSearch(['title'], $where)->append(['status_name'])->field('title, icon, key, desc, status, type, support_app')->select()->toArray();
    }

    /**
     * 获取站点支持的应用插件
     * @return array
     */
    public function getAddonKeysBySiteId()
    {
        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId($this->site_id);
        return $site_addon;
    }

    /**
     * @return array[]
     */
    public function showCustomer($is_sort=true)
    {
        $show_list = event('ShowCustomer', ['site_id' => $this->site_id]);
        $addon_type_list = SiteDict::getAddonChildMenu();
        $return = [];
        foreach ($show_list as $item) {
            foreach ($addon_type_list as $key => $value) {
                if (!isset($return[$key])) {
                    $return[$key] = [
                        'title' => $value['name'],
                        'sort' => $value['sort'],
                        'list' => [],
                    ];
                }
                $return[$key]['list'] = array_merge($return[$key]['list'], $item[$key] ?? []);
            }
        }

        //防止有未实现对应事件的插件额外做一次查询 未实现的直接放到 addon_tool 里面
        $keys = [];
        foreach ($return as $item) {
            foreach ($item['list'] as $value) {
                $keys[] = $value['key'];
            }
        }
        $site_addon = $this->getSiteAddons([]);
        $menu_model = (new SysMenu());
        $addon_urls = $menu_model
            ->where([['addon', 'in', array_column($site_addon, 'key')], ['addon', 'not in', $keys], ['is_show', '=', 1], ['menu_type', '=', 1]])
            ->order('id asc')
            ->group('addon')
            ->column('router_path', 'addon');
        if (!empty($site_addon)) {
            foreach ($site_addon as $k => $v) {
                if (in_array($v['key'], $keys)) {
                    continue;
                }
                $url = $addon_urls[$v['key']] ?? '';
                $return['addon_tool']['list'][] = [
                    'title' => $v['title'],
                    'desc' => $v['desc'],
                    'icon' => $v['icon'],
                    'key' => $v['key'],
                    'url' => $url ? '/' . $url : ''
                ];
            }
        }
        if($is_sort){
            usort($return, function (array $a, array $b) {
                $sortA = isset($a['sort']) ? (int)$a['sort'] : 0;
                $sortB = isset($b['sort']) ? (int)$b['sort'] : 0;
                return $sortB <=> $sortA;
            });
        }
        return $return;
    }

    /**
     * 站点初始化
     * @return bool
     */
    public function siteInit($data)
    {
        (new CaptchaService())->check();

        $site_id = $data['site_id'];
        if (empty($site_id)) throw new AdminException('SITE_NOT_EXIST');

        $site = $this->model->where([['site_id', '=', $site_id]])->with(['site_group'])->findOrEmpty()->toArray();
        if (empty($site)) throw new AdminException('SITE_NOT_EXIST');
        //todo 特殊处理  优先删除的数据
        (new CoreSiteService())->siteInitBySiteId($site_id, ['diy_page', 'sys_poster']);
        event('SiteInit', ['site_id' => $site_id, 'main_app' => $site['site_group']['app'], 'site_addons' => $site['site_group']['addon']]);

        // 更新微页面数据
        $diy_service = new DiyService();
        $diy_service->loadDiyData(['site_id' => $site_id, 'main_app' => $site['site_group']['app'], 'tag' => 'add']);

        Cache::clear();
        return true;
    }

    public function setIsAllowChangeSite($is_allow)
    {
        (new CoreConfigService())->setConfig(0, 'IS_ALLOW_CHANGE_SITE', ['is_allow' => $is_allow]);
    }

    public function getIsAllowChangeSite()
    {
        $config = (new CoreConfigService())->getConfigValue(0, 'IS_ALLOW_CHANGE_SITE');
        if (empty($config)) {
            $config = ['is_allow' => 1];
        }
        return $config;
    }

    //生成菜单数据
    public function getSpecialMenuList()
    {
        $auth_menu_list = (new AuthService())->getAuthMenuList(1);
        $auth_menu_list = array_column($auth_menu_list, null, 'menu_key');
        $auth_menu_list = $auth_menu_list['addon'];

        $list = $this->showCustomer(false);//获取对应的需要展示的key
        $addon_menu_list = SiteDict::getAddonChildMenu();
        $menu_list = [];
        foreach ($addon_menu_list as $item) {
            $menu_key_list = array_column($list[$item['key']]['list'] ?? [], 'key');
            $temp_menu = [
                'app_type'=>'site',
                'menu_name' => $item['name'],
                'menu_key' => $item['key'],
                'menu_short_name' => $item['short_name'],
                'parent_key' => 'addon',
                'menu_type' => '0',
                'icon' => 'iconfont iconzhuangxiu3',
                'api_url' => '',
                'router_path' => 'app/index',
                'view_path' => 'app/index',
                'methods' => 'get',
                'sort' => $item['sort'],
                'status' => '1',
                'is_show' => '1',
            ];
            $children = [];
            foreach ($auth_menu_list['children'] as $datum_item) {
                if (in_array($datum_item['menu_key'], $menu_key_list)) {
                    $children[] = $datum_item;
                }
            }
            $temp_menu['children'] = $children;
            $menu_list[] = $temp_menu;
        }
        usort($menu_list, function (array $a, array $b) {
            $sortA = isset($a['sort']) ? (int)$a['sort'] : 0;
            $sortB = isset($b['sort']) ? (int)$b['sort'] : 0;
            return $sortB <=> $sortA;
        });
        return [
            'parent_key' => 'addon',
            'list' => $menu_list
        ];
    }


}

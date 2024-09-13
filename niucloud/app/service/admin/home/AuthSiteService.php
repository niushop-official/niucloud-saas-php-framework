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


use app\dict\sys\AppTypeDict;
use app\dict\sys\MenuTypeDict;
use app\model\site\Site;
use app\model\site\SiteGroup;
use app\model\sys\SysMenu;
use app\model\sys\SysUserRole;
use app\model\sys\UserCreateSiteLimit;
use app\service\admin\auth\AuthService;
use app\service\admin\site\SiteGroupService;
use app\service\admin\site\SiteService;
use app\service\admin\sys\ConfigService;
use app\service\admin\sys\RoleService;
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
        if (!AuthService::isSuperAdmin()) $condition[] = ['site_id', 'in', $this->getSiteIds()];
        $search_model = $this->model->where($condition)->withSearch([ 'create_time', 'expire_time', 'keywords', 'status', 'group_id', 'app' ], $where)->with(['groupName'])->field($field)->append([ 'status_name' ])->order('create_time desc');

        $theme_color = (new ConfigService())->getThemeColor();

        return $this->pageQuery($search_model, function ($item) use ($theme_color) {
            if (is_array($item['app']) && count($item['app']) == 1) {
                $item['theme_color'] = $theme_color[ $item['app'][0] ] ?? '';
            } else {
                $item['theme_color'] = $theme_color['system'] ?? '';
            }
        });
    }

    /**
     * 查询用户角色类表
     * @param int $uid
     * @return mixed|string
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
     * 创建站点
     * @param array $data
     * @return void
     */
    public function createSite(array $data) {
        if (!AuthService::isSuperAdmin()) {
            $limit = (new UserCreateSiteLimit())->where([ ['uid', '=', $this->uid], ['group_id', '=', $data['group_id'] ] ])->findOrEmpty();
            if ($limit->isEmpty()) throw new CommonException('NO_PERMISSION_TO_CREATE_SITE_GROUP');

            if (SiteGroupService::getUserSiteGroupSiteNum($this->uid, $data['group_id']) > ($limit['num'] - 1)) throw new CommonException('SITE_GROUP_CREATE_SITE_EXCEEDS_LIMIT');
        } else {
            $limit = ['month' => 1];
        }

        (new SiteService())->add([
            'site_name' => $data['site_name'],
            'uid' => $this->uid,
            'group_id' => $data['group_id'],
            'expire_time' => date('Y-m-d H:i:s', strtotime("+ {$limit['month']} month"))
        ]);

        return true;
    }
}

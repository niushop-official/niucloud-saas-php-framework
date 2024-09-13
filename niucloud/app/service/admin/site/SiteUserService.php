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

use app\dict\sys\UserDict;
use app\model\sys\SysRole;
use app\model\sys\SysUser;
use app\model\sys\SysUserRole;
use app\model\sys\UserCreateSiteLimit;
use app\service\admin\auth\LoginService;
use app\service\admin\user\UserRoleService;
use app\service\admin\user\UserService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use Exception;
use think\facade\Cache;
use think\facade\Db;

/**
 * 站点用户服务层
 * Class BaseService
 * @package app\service
 */
class SiteUserService extends BaseAdminService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysUser();
    }

    /**
     * 管理端获取用户列表(对应站点用户列表)
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $search_model = (new SysUserRole())->order('is_admin desc,id desc')
            ->with('userinfo')->append(['status_name'])
            ->hasWhere('userinfo', function ($query) use ($where) {
                $condition = [];
                if (isset($where['username']) && $where['username'] !== '') $condition[] = ['username', 'like', "%{$this->model->handelSpecialCharacter($where['username'])}%"];
                $query->where($condition);
            })->where([ ['SysUserRole.site_id', '=', $this->site_id ]]);
        return $this->pageQuery($search_model, function ($item){
            if (!empty($item['role_ids'])) {
                $item['role_array'] = (new SysRole())->where([ ['role_id', 'in', $item['role_ids'] ] ])->column('role_name');
            } else {
                $item['role_array'] = [];
            }
        });
    }

    /**
     * 用户详情(站点用户详情)
     * @param int $uid
     * @return array
     */
    public function getInfo(int $uid)
    {
        $info = (new SysUserRole())->where([ ['uid', '=', $uid], ['site_id', '=', $this->site_id] ])
            ->with('userinfo')->append(['status_name'])
            ->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加当前站点用户
     * @param array $data
     * @return bool
     */
    public function add(array $data)
    {
        return (new UserService())->addSiteUser($data, $this->site_id);
    }

    /**
     * 编辑站点用户
     * @param int $uid
     * @param array $data
     * @return true
     */
    public function edit(int $uid, array $data)
    {
        Db::startTrans();
        try {
            (new UserService())->edit($uid, $data);

            $role_ids = $data['role_ids'] ?? [];
            //创建用户站点管理权限
            (new UserRoleService())->edit($this->site_id, $uid, $role_ids, $data['status'] ?? UserDict::ON);

            Db::commit();
            return true;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 修改字段
     * @param int $uid
     * @param string $field
     * @param $data
     * @return bool|true
     */
    public function modify(int $uid, string $field, $data)
    {
        $field_name = match ($field) {
            'password' => 'password',
            'real_name' => 'real_name',
            'head_img' => 'head_img',
        };
        return (new UserService())->edit($uid, [$field_name => $data]);
    }

    /**
     * 删除
     * @param int $uid
     * @return true
     */
    public function del(int $uid)
    {
        $where = [
            ['uid', '=', $uid],
            ['site_id', '=', $this->site_id]
        ];
        $user = (new SysUserRole())->where($where)->findOrEmpty();
        if ($user->isEmpty()) throw new CommonException('USER_NOT_EXIST');
        if ($user->is_admin) throw new CommonException("SUPER_ADMIN_NOT_ALLOW_DEL");
        $user->delete();
        LoginService::clearToken($uid);
        Cache::delete('user_role_list_' . $uid);
        return true;
    }

    /**
     * 锁定
     * @param int $uid
     * @return bool|true
     */
    public function lock(int $uid){
        (new SysUserRole())->where([ ['uid', '=', $uid], ['site_id', '=', $this->site_id] ])->update(['status' => UserDict::OFF]);
        Cache::delete('user_role_list_' . $uid);
        LoginService::clearToken($uid);
        return true;
    }

    /**
     * 解锁
     * @param int $uid
     * @return bool|true
     */
    public function unlock(int $uid){
        (new SysUserRole())->where([ ['uid', '=', $uid], ['site_id', '=', $this->site_id] ])->update(['status' => UserDict::ON]);
        Cache::delete('user_role_list_' . $uid);
        LoginService::clearToken($uid);
        return true;
    }
}

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

namespace app\service\admin\user;


use app\dict\sys\AppTypeDict;
use app\dict\sys\UserDict;
use app\model\sys\SysRole;
use app\model\sys\SysUser;
use app\model\sys\SysUserRole;
use app\model\sys\UserCreateSiteLimit;
use app\service\admin\auth\AuthService;
use app\service\admin\auth\LoginService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use core\exception\CommonException;
use Exception;
use think\db\exception\DbException;
use think\facade\Cache;
use think\facade\Db;
use think\Model;

/**
 * 用户服务层
 * Class BaseService
 * @package app\service
 */
class UserService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
       $this->model = new SysUser();
    }

    /**
     * 用户列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        AuthService::isSuperAdmin();
        $super_admin_uid = Cache::get('super_admin_uid');

        $field = 'uid,username,head_img,real_name,last_ip,last_time,login_count,status';
        $search_model = $this->model->withSearch([ 'username', 'real_name', 'last_time' ], $where)->field($field)->append([ 'status_name' ])->order('uid desc');
        return $this->pageQuery($search_model, function ($item) use ($super_admin_uid) {
            $item['site_num'] = (new SysUserRole())->where([['uid', '=', $item['uid']], ['site_id', '<>', request()->defaultSiteId() ] ])->count();
            $item['is_super_admin'] = $super_admin_uid == $item['uid'];
        });
    }


    /**
     * 用户详情
     * @param int $uid
     * @return array
     */
    public function getInfo(int $uid){
        AuthService::isSuperAdmin();
        $super_admin_uid = Cache::get('super_admin_uid');

        $where = array(
            ['uid', '=', $uid],
        );
        $field = 'uid, username, head_img, real_name, last_ip, last_time, create_time, login_count, delete_time, update_time';
        $info = $this->model->where($where)->field($field)->findOrEmpty()->toArray();

        if (!empty($info)) {
            $info['roles'] = (new SysUserRole())->where([['uid', '=', $info['uid']], ['site_id', '<>', request()->defaultSiteId() ] ])
                ->field('*')
                ->with(['site_info' => function($query) {
                    $query->field('site_id, site_name, app_type, status, expire_time');
                }])
                ->select()
                ->toArray();
            $info['is_super_admin'] = $super_admin_uid == $info['uid'];
        }

        return $info;
    }

    /**
     * 添加用户（添加用户，不添加站点）
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public function add(array $data){
        if ($this->checkUsername($data['username'])) throw new CommonException('USERNAME_REPEAT');

        Db::startTrans();
        try {
            $user_data = [
                'username' => $data['username'],
                'head_img' => $data['head_img'],
                'status' => $data['status'],
                'real_name' => $data['real_name'],
                'password' => create_password($data['password'])
            ];
            $user = $this->model->create($user_data);

            // 添加用户建站限制
            $create_site_limit = $data['create_site_limit'] ?? [];
            if (!empty($create_site_limit)) {
                $create_site_limit_save = [];
                foreach ($create_site_limit as $item) {
                    $create_site_limit_save[] = [
                        'group_id' => $item['group_id'],
                        'uid' => $user?->uid,
                        'num' => $item['num'],
                        'month' => $item['month']
                    ];
                }
                (new UserCreateSiteLimit())->saveAll($create_site_limit_save);
            }

            Db::commit();
            return $user?->uid;
        } catch (\Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 添加对应站点用户(添加站点，同时添加站点用户,用于添加站点以及站点添加站点用户)
     * @param $data
     * @param $site_id
     * @return bool
     */
    public function addSiteUser($data, $site_id)
    {
        Db::startTrans();
        try {
            if (isset($data['uid']) && !empty($data['uid'])) {
                $uid = $data['uid'];
                $user = $this->model->where([ ['uid', '=', $uid] ])->field('uid')->findOrEmpty();
                if ($user->isEmpty()) {
                    Db::commit();
                    throw new AdminException('USER_NOT_EXIST');
                }
            } else {
                //添加用户
                $uid = $this->add($data);
            }
            $role_ids = $data['role_ids'] ?? [];
            $is_admin = $data['is_admin'] ?? 0;
            //创建用户站点管理权限
            (new UserRoleService())->add($uid, ['role_ids' => $role_ids, 'is_admin' => $is_admin, 'status' => $data['status'] ], $site_id);
            Db::commit();
            return $uid;
        } catch ( Exception $e) {
            Db::rollback();
            throw new AdminException($e->getMessage());
        }
    }

    /**
     * 检测用户名是否重复
     * @param $username
     * @return bool
     * @throws DbException
     */
    public function checkUsername($username)
    {
        $count = $this->model->where([['username', '=', $username]])->count();
        if($count > 0)
        {
            return true;
        }
        else return false;
    }

    /**
     * 用户模型对象
     * @param int $uid
     * @return SysUser|array|mixed|Model
     */
    public function find(int $uid){

        $user = $this->model->findOrEmpty($uid);
        if ($user->isEmpty())
            throw new AdminException('USER_NOT_EXIST');
        return $user;
    }

    /**
     * 编辑用户
     * @param int $uid
     * @param array $data
     * @return true
     */
    public function edit(int $uid, array $data){
        $user = $this->find($uid);
        $user_data = [
        ];
        $is_off_status = false;
        if(isset($data['status'])){
            if($data['status'] == UserDict::OFF)
                $is_off_status = true;
        }
        if(isset($data['head_img'])){
            $user_data['head_img'] = $data['head_img'];
        }
        if(isset($data['real_name'])){
            $user_data['real_name'] = $data['real_name'];
        }

        $password = $data['password'] ?? '';
        $is_change_password = false;
        if(!empty($password) && !check_password($password, $user->password)){
            $user_data['password'] = create_password($password);
            $is_change_password = true;
        }
        if(empty($user_data))
            return true;
        //更新用户信息
        $user->save($user_data);
        //更新权限  禁用用户  修改密码 都会清理token
        if($is_off_status || $is_change_password){
            LoginService::clearToken($uid);
        }
        return true;
    }

    /**
     * 改变用户状态
     * @param $uid
     * @param $status
     * @return true
     */
    public function statusChange($uid, $status) {

    }

    /**
     * 删除
     * @param int $uid
     * @return true
     */
    public function del(int $uid){
        AuthService::isSuperAdmin();
        $super_admin_uid = Cache::get('super_admin_uid');
        if ($super_admin_uid == $uid) throw new CommonException("SUPER_ADMIN_NOT_ALLOW_DEL");

        $site_num = (new SysUserRole())->where([['uid', '=', $uid], ['site_id', '<>', request()->defaultSiteId() ] ])->count();
        if ($site_num) throw new CommonException("USER_NOT_ALLOW_DEL");

        $this->model->where([ ['uid', '=', $uid] ])->find()->delete();
        return true;
    }

    /**
     * 通过账号获取管理员信息
     * @param string $username
     * @return SysUser|array|mixed|Model
     */
    public function getUserInfoByUsername(string $username){
        return $this->model->where([['username', '=',$username]])->findOrEmpty();
    }

    /**
     * 获取全部用户列表（用于平台整体用户管理）
     * @param array $where
     * @return array
     */
    public function getUserAll(array $where)
    {
        $field = 'uid, username, head_img';
        return $this->model->withSearch(['username', 'realname', 'create_time'], $where)
            ->field($field)
            ->order('uid desc')
            ->select()
            ->toArray();
    }

    /**
     * 获取可选站点管理员（用于站点添加）
     * @param array $where
     * @return array
     */
    public function getUserSelect(array $where)
    {
        $field = 'SysUser.uid, username, head_img';
        $all_uid = array_column($this->getUserAll($where), 'uid');
        $all_role_uid = (new SysUserRole())->distinct(true)->order('id desc')->select()->column('uid');
        $data = $this->model->distinct(true)->hasWhere('userrole', function ($query) {
                $query->where([['is_admin', '=', 1]])->whereOr([['site_id', '=', 0]]);
            })->withSearch(['username', 'realname', 'create_time'], $where)
            ->field($field)
            ->order('SysUser.uid desc')
            ->select()
            ->toArray();
        $uids = array_diff($all_uid, $all_role_uid);
        $diff_users = $this->model->where([['uid', 'in', $uids]])->withSearch(['username', 'realname', 'create_time'], $where)
            ->field('uid, username, head_img')->order('uid desc')->select()->toArray();
        return array_merge($diff_users, $data);
    }

    /**
     * 获取用户站点创建限制
     * @param int $uid
     * @return void
     */
    public function getUserCreateSiteLimit(int $uid) {
        return (new UserCreateSiteLimit())->where([ ['uid', '=', $uid] ])->select()->toArray();
    }

    /**
     * 获取用户站点创建限制
     * @param int $uid
     * @return void
     */
    public function getUserCreateSiteLimitInfo(int $id) {
        return (new UserCreateSiteLimit())->where([ ['id', '=', $id] ])->findOrEmpty()->toArray();
    }

    /**
     * 添加用户站点创建限制
     * @param array $data
     * @return void
     */
    public function addUserCreateSiteLimit(array $data) {
        (new UserCreateSiteLimit())->where(['uid' => $data['uid'], 'group_id' => $data['group_id']])->delete();

        (new UserCreateSiteLimit())->save( [
            'uid' => $data['uid'],
            'group_id' => $data['group_id'],
            'num' => $data['num'],
            'month' => $data['month']
        ]);
        return true;
    }

    /**
     * 编辑用户站点创建限制
     * @param $id
     * @param array $data
     * @return true
     */
    public function editUserCreateSiteLimit($id, array $data) {
        (new UserCreateSiteLimit())->update( [
            'num' => $data['num'],
            'month' => $data['month']
        ], ['id' => $id ]);
        return true;
    }

    /**
     * 删除用户站点创建限制
     * @param $id
     * @return true
     */
    public function delUserCreateSiteLimit($id) {
        (new UserCreateSiteLimit())->where(['id' => $id ])->delete();
        return true;
    }
}
